import { keyState, SquareI } from '../components/Board/Square';
import { Word } from '../components/Game';
import { dayMs, firstDay } from '../constants';
import { words } from '../data';

export const getEmptyBoard = (rows: number, wordLength: number) => {
  const board: SquareI[][] = Array(rows).fill({})
    .map((_row) =>
      Array(wordLength).fill({})
        .map(_square => ({char: '', guessed: keyState.INITIAL, border: false}))
    );
  board[0][0].border = true;
  return board;
};

export const copyBoard = (board: SquareI[][]) => board.map((row: SquareI[]) => row.map((o: SquareI) => ({...o})));

export const insertNewChar = (board: SquareI[][], row:number, square: number, char: SquareI) => {
  const newBoard = copyBoard(board);
  newBoard[row][square] = char;
  return newBoard;
};

export const insertNewRow = (board: SquareI[][], rowNumber: number, row: SquareI[]) => {
  const newBoard = copyBoard(board);
  newBoard[rowNumber] = row;
  return newBoard;
};

export const isWinner = (row: SquareI[], word: Word) => {
  return row.every((square, index) => square.char === word.word[index].toLowerCase());
};

export const getEmojisBoard = (board: SquareI[][]) => {
  const emojisBoard: string[][] = [];

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const newRow = [];
    for (let j = 0; j < row.length; j++) {
      const square = row[j];
      if(square.guessed === keyState.ERROR) {
        // emojisRow.push('\u2B1C');
        newRow.push('⬜');
      } else if(square.guessed === keyState.ALMOST) {
        // emojisRow.push('\u1F7E8');
        newRow.push('🟨');
      } else if(square.guessed === keyState.GUESSED) {
        // emojisRow.push('\u1F7E9');
        newRow.push('🟩');
      }
    }
    newRow.length && emojisBoard.push(newRow);
  }

  return emojisBoard;
};

export const getToday = () => new Date(new Date().setHours(0, 0, 0, 0));

export const getDaysFromFirstDay = () => {
  const today = getToday();
  const days = Math.round(Math.abs((today.valueOf() - firstDay.valueOf()) / dayMs));
  return days;
};

export const getTodayWord = () => {
  return words[Math.floor(Math.random() * words.length)];
  // const daysFromFirstDay = getDaysFromFirstDay();
  // return words[daysFromFirstDay % words.length];
};

