import { useState } from 'react';
import { Board } from '../Board';
import { Keyboard } from '../Keyboard';
import { EMPTY_KEYSTATES, ATTEMPTS } from '../../constants';
import { keyState, SquareI } from '../Board/Square';
import { Result } from '../Result';
import {
  getEmojisBoard,
  getEmptyBoard,
  getLastGame,
  getRandomWord,
  getTodayWord,
  insertNewChar,
  insertNewRow,
  isWinner,
  saveGame,
} from '../../services';
import { Header } from '../Header';
import { gtm } from '../../services/gtm';

const rows = ATTEMPTS;
const todayWord = getTodayWord();

export interface Word {
  word: string;
  line: string;
  song: string;
  album: string;
}

export const Game = () => {
  console.log('render game');
  const [word, setWord] = useState(todayWord.word);
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

  const resetStateForRandom = () => {
    setRow(0);
    setSquare(0);
    setEnterDisabled(true);
    setDeleteDisabled(true);
    setKeyStates(EMPTY_KEYSTATES);
    setShowResult(false);
    setShowResultButton(false);
    setGameFinished(false);
  };
  
  const getInitBoard = (random?: boolean) => {
    console.log('init board');
    if(random) { // never when reload page
      const randomWord = getRandomWord();
      setWord(randomWord);
      resetStateForRandom();
      setIsRandom(true);
      gtm.startGame(true);
      return getEmptyBoard(randomWord.word.length);
    } else { // always when reload page
      const lastGame = getLastGame();
      if(lastGame.board && todayWord.date === lastGame.date) { // last game exists and same date
        setGameFinished(true);
        setShowResult(true);
        setShowResultButton(true);
        setWord(lastGame.word);
        setWinner(lastGame.winner);
        setKeyStates(lastGame.keyStates);
        gtm.showResult(lastGame.winner);
        gtm.startAppLastGame(lastGame.word.word, lastGame.winner);
        return lastGame.board;
      } else { // firs time game or new date
        gtm.startGame(false);
        return getEmptyBoard(word.word.length);
      }
    }
  };

  const [board, setBoard] = useState(getInitBoard);
  
  const handleKeyClick = (char: string) => {
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
      !isRandom && saveGame(newBoard, word, todayWord.date, win, newKeyStates); // save to localStorage
      setWinner(win);
      setGameFinished(true);
      gtm.endGame(isRandom, word.word, win, newRowNumber);
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

  const handleRandomClick = () => {
    setBoard(getInitBoard(true));
  };

  return (
    <div className="max-w-xl min-w-full">
      <Header
        showResultButton={showResultButton}
        onResultClick={handleResultOpen}
      />
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
          emojisBoard={getEmojisBoard(board)}
          random={isRandom}
          onClose={handleResultClose}
          onRandom={handleRandomClick}
        />
      }
    </div>
  )
};
