import { useState } from 'react';
import { Board } from '../Board';
import { Keyboard } from '../Keyboard';
import { emptyKeyStates } from '../../constants';
import { words } from '../../data';
import { keyState, SquareI } from '../Board/Square';
import { Result } from '../Result';

const word = words[Math.floor(Math.random() * words.length)];
const wordLength = word.word.length;
const rows = wordLength + 1;

const getEmptyBoard = () => {
  const board: SquareI[][] = Array(rows).fill({})
    .map((_row) =>
      Array(wordLength).fill({})
        .map(_square => ({char: '', guessed: keyState.INITIAL, border: false}))
    );
  board[0][0].border = true;
  return board;
};

const copyBoard = (board: SquareI[][]) => board.map((row: SquareI[]) => row.map((o: SquareI) => ({...o})));

const insertNewChar = (board: SquareI[][], row:number, square: number, char: SquareI) => {
  const newBoard = copyBoard(board);
  newBoard[row][square] = char;
  return newBoard;
};

const insertNewRow = (board: SquareI[][], rowNumber: number, row: SquareI[]) => {
  const newBoard = copyBoard(board);
  newBoard[rowNumber] = row;
  return newBoard;
};

const isWinner = (row: SquareI[]) => {
  return row.every((square, index) => square.char === word.word[index].toLowerCase());
};

export interface Word {
  word: string;
  line: string;
  song: string;
  album: string;
}

export const Game = () => {
  const [board, setBoard] = useState(getEmptyBoard());
  const [row, setRow] = useState(0);
  const [square, setSquare] = useState(0);
  const [enterDisabled, setEnterDisabled] = useState(true);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [keyStates, setKeyStates] = useState(emptyKeyStates);
  const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState(false);
  
  const handleKeyClick = (char: string) => {
    if(square === wordLength || row === rows) { // leave when row or board is full
      return;
    }
    const newSquare = square + 1;
    
    if(newSquare === wordLength) { // enable enter when row is complete
      setEnterDisabled(false);
    }
    
    const newBoard = insertNewChar(board, row, square, {char, guessed: keyState.INITIAL, border: false});
    if(newSquare + 1 <= wordLength) { // set border to next square
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
    
    if(square !== wordLength) {
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
    
    const newRowNumber = row + 1;
    const win = isWinner(newBoard[row]);
    if(win || newRowNumber === rows) { // is final row
      setBoard(newBoard);
      setTimeout(() => {
        setShowResult(true);
        setWinner(win);
      }, 200);
    } else { // set border to first square in the next row
      newBoard[newRowNumber][0].border = true;
      setRow(newRowNumber);
      setSquare(0);
      setBoard(newBoard);
    }

  };

  const handleResultClose = () => {
    setShowResult(false);
  };

  // const getEmojisBoard = (board: SquareI[][]) => {
  //   const emojisBoard: string[][] = [];
  //   console.log(board);
  //   board.map(row => {
  //     const emojisRow: string[] = [];
  //     row.map(square => {
  //       if(square.guessed === keyState.ERROR) {
  //         // emojisRow.push('\u2B1C');
  //         emojisRow.push('⬜');
  //       } else if(square.guessed === keyState.ALMOST) {
  //         // emojisRow.push('\u1F7E8');
  //         emojisRow.push('🟨');
  //       } else if(square.guessed === keyState.GUESSED) {
  //         // emojisRow.push('\u1F7E9');
  //         emojisRow.push('🟩');
  //       }
  //     });
  //     emojisBoard.push(emojisRow);
  //   });
  //   return emojisBoard;
  // };

  return (
    <>
      <Board board={board} />
      <Keyboard
        keyStates={keyStates}
        onKeyClick={handleKeyClick}
        onEnterClick={handleEnterClick}
        onDeleteClick={handleDeleteClick}
        enterDisabled={enterDisabled}
        deleteDisabled={deleteDisabled}
      />
      {showResult &&
        <Result
          winner={winner}
          word={word}
          onClose={handleResultClose}
        />
      }
    </>
  )
};
