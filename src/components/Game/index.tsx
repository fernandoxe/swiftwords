import { useEffect, useState } from 'react';
import { Board } from '../Board';
import { Keyboard } from '../Keyboard';
import { EMPTY_KEYSTATES, ATTEMPTS } from '../../constants';
import { keyState, SquareI } from '../Board/Square';
import { Result } from '../Result';
import {
  getCharts,
  getEmptyBoard,
  getLastGame,
  getRandomWord,
  getTodayWord,
  insertNewChar,
  insertNewRow,
  isWinner,
  saveCharts,
  saveGame,
  saveRandomCount,
} from '../../services';
import { Header } from '../Header';
import { gtm } from '../../services/gtm';
import { Loader } from '../Loader/Loader';

const rows = ATTEMPTS;

export interface Word {
  word: string;
  line: string;
  song: string;
  album: string;
}

export interface TodayWord {
  word: Word;
  date: string;
}

export const Game = () => {
  // console.log('render game');

  const [todayWord, setTodayWord] = useState({word: {word: '', line: '', song: '', album: ''}, date: ''});
  const [word, setWord] = useState(todayWord.word);
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState(0);
  const [square, setSquare] = useState(0);
  const [enterDisabled, setEnterDisabled] = useState(true);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [keyStates, setKeyStates] = useState(EMPTY_KEYSTATES);
  const [showResult, setShowResult] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);
  const [winner, setWinner] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [charts, setCharts] = useState(getCharts);
  const [board, setBoard] = useState([[{char: '', guessed: 0}]]);
  const [startPlay, setStartPlay] = useState(false);

  useEffect(() => {
    const fetchWord = async () => {
      const fetchedWord = await getTodayWord();

      if(fetchedWord.word) {
        setTodayWord(fetchedWord);
        setWord(fetchedWord.word);
        setBoard(getInitBoard(fetchedWord.word, fetchedWord.date));
        setLoading(false);
      }
    };

    fetchWord();
  }, []);

  const resetStateForRandom = () => {
    setRow(0);
    setSquare(0);
    setEnterDisabled(true);
    setDeleteDisabled(true);
    setKeyStates(EMPTY_KEYSTATES);
    setShowResult(false);
    setGameFinished(false);
    setStartPlay(false);
  };

  const getInitBoard = (initWord: Word, date: string) => {
    const lastGame = getLastGame();
    if(lastGame.board && date === lastGame.date) { // last game exists and same date
      setGameFinished(true);
      setShowResult(true);
      setShowResultButton(true);
      setWord(lastGame.word);
      setWinner(lastGame.winner);
      setKeyStates(lastGame.keyStates);
      gtm.showResult(lastGame.winner);
      gtm.startAppLastGame(lastGame.word.word, lastGame.winner);
      return lastGame.board;
    } else { // first time game or new date
      saveRandomCount(true);
      gtm.startGame(false);
      return getEmptyBoard(initWord.word.length);
    }
  };

  const getRandomBoard = async () => {
    const fetchedRandomWord = await getRandomWord();
    setWord(fetchedRandomWord);
    resetStateForRandom();
    setIsRandom(true);
    gtm.startGame(true);
    return getEmptyBoard(fetchedRandomWord.word.length);
  };
  
  const handleKeyClick = (char: string) => {
    if(!startPlay) {
      gtm.startPlay(isRandom);
      setStartPlay(true);
    }
    if(square === word.word.length || row === rows) { // leave when row or board is full
      return;
    }
    const newSquare = square + 1;
    
    if(newSquare === word.word.length) { // enable enter when row is complete
      setEnterDisabled(false);
    }
    
    const newBoard = insertNewChar(board, row, square, {char, guessed: keyState.INITIAL, border: false});
    if(newSquare + 1 <= word.word.length) { // set border to next square
      newBoard[row][square].border = false;
      newBoard[row][newSquare].border = true;
    }
    setBoard(newBoard);
    
    setDeleteDisabled(false);
    setSquare(newSquare);
  };

  const handleDeleteClick = () => {
    const newSquare = square - 1;
    if(newSquare === 0) { // disable delete when row is empty
      setDeleteDisabled(true);
    }

    const newBoard = insertNewChar(board, row, newSquare, {char: '', guessed: keyState.INITIAL, border: true});
    
    if(square !== word.word.length) {
      newBoard[row][square].border = false;
    }

    setBoard(newBoard);
    setEnterDisabled(true);
    setSquare(newSquare);
  };

  const handleEnterClick = () => {
    const fullRow: SquareI[] = board[row];
    const newKeyStates = {...keyStates};

    const coloredRow = fullRow.map((square, index) => {
      const isGuessed = square.char === word.word[index].toLowerCase(); // char guessed
      if(isGuessed) { // set state of the key to guessed
        newKeyStates[square.char] = keyState.GUESSED;
        return {char: square.char, guessed: keyState.GUESSED, border: false};
      }

      const charIndex = word.word.toLowerCase().indexOf(square.char);
      if(charIndex !== -1) { // char exists in word
        newKeyStates[square.char] = keyState.ALMOST;
        return {char: square.char, guessed: keyState.ALMOST, border: false};
      } else { // char doesn't exists in word
        newKeyStates[square.char] = keyState.ERROR;
        return {char: square.char, guessed: keyState.ERROR, border: false};
      }

    });

    setKeyStates(newKeyStates);
    setEnterDisabled(true);
    setDeleteDisabled(true);

    const newBoard = insertNewRow(board, row, coloredRow);

    gtm.sendRow(row);
    
    const newRowNumber = row + 1;
    const win = isWinner(newBoard[row], word);
    if(win || newRowNumber === rows) { // win or is final row
      setBoard(newBoard);
      !isRandom && saveGame(newBoard, word, todayWord.date, win, newKeyStates); // save game to localStorage
      setCharts(saveCharts(charts, isRandom, win, row)); // save charts to localStorage
      isRandom && saveRandomCount(); // count new random game
      setWinner(win);
      setGameFinished(true);
      gtm.endGame(isRandom, todayWord.date, word.word, win, newRowNumber);
      setTimeout(() => {
        setShowResult(true);
        setShowResultButton(true);
        gtm.showResult(win);
      }, 200);
    } else { // set border to first square in the next row
      newBoard[newRowNumber][0].border = true;
      setRow(newRowNumber);
      setSquare(0);
      setBoard(newBoard);
    }

  };

  const handleResultOpen = () => {
    gtm.clickResult(isRandom);
    gtm.showResult(winner);
    setShowResult(true);
  };

  const handleResultClose = () => {
    setShowResult(false);
  };

  const handleRandomClick = async () => {
    setLoading(true);
    setShowResultButton(false);
    const randomBoard = await getRandomBoard();
    setLoading(false);
    setBoard(randomBoard);
  };

  return (
    <>
      <div className="max-w-xl min-w-full">
        <Header
          showResultButton={showResultButton}
          charts={charts}
          onResultClick={handleResultOpen}
          />
        {!loading &&
          <>
            <Board board={board} />
            <Keyboard
              keyStates={keyStates}
              onKeyClick={handleKeyClick}
              onEnterClick={handleEnterClick}
              onDeleteClick={handleDeleteClick}
              enterDisabled={enterDisabled}
              deleteDisabled={deleteDisabled}
              keyBoardDisabled={gameFinished}
            />
            {showResult &&
              <Result
                winner={winner}
                word={word}
                date={todayWord.date}
                board={board}
                random={isRandom}
                onClose={handleResultClose}
                onRandom={handleRandomClick}
              />
            }
          </>
        }
        {loading &&
          <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[-1]">
            <Loader />
          </div>
        }
      </div>
    </>
  );
};
