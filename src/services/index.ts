import { keyState, SquareI } from '../components/Board/Square';
import { Word } from '../components/Game';
import { KeyStates } from '../components/Keyboard';
import { ATTEMPTS, DAY_MS, FIRST_DAY } from '../constants';
import { words } from '../data';
import { gtm } from './gtm';

export const getEmptyBoard = (wordLength: number) => {
  const rows = ATTEMPTS;
  const board: SquareI[][] = Array(rows).fill({})
    .map((_row) =>
      Array(wordLength).fill({})
        .map(_square => ({char: '', guessed: keyState.INITIAL, border: false}))
    );
  board[0][0].border = true;
  return board;
};

export const getLastGame = () => {
  try {
    const savedGame = localStorage.getItem('game') || '{}';
    const lastGame = JSON.parse(savedGame);
    return lastGame;
  } catch (error: any) {
    return {};
  }
};

// interface LastGame {
//   board: SquareI[][];
//   word: string;
//   date: string, // AAAA-MM-DD
//   winner: boolean,
// }

const getBoardFromSavedGame = (board: SquareI[][]) => {
  return board.map(row => row.map(square => ({...square, border: false})));
};

export const getInitialBoard = (word: Word) => {
  const wordLength = word.word.length;
  try {
    const lastGame = JSON.parse(getLastGame());
    if(lastGame.board) {
      return getBoardFromSavedGame(lastGame);
    }
  } catch (error: any) {
    return getEmptyBoard(wordLength);
  }
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

export const getDateParsed = (date: Date) => date.toISOString().slice(0,10);

export const getDaysFromFirstDay = (date: Date) => {
  const days = Math.round(Math.abs((date.valueOf() - FIRST_DAY.valueOf()) / DAY_MS));
  return days;
};

export const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

export const getTodayWord = () => {
  const today = getToday();
  const date = getDateParsed(today);
  const daysFromFirstDay = getDaysFromFirstDay(today);
  return {
    word: words[daysFromFirstDay % words.length],
    date,
  };
};

export const canShare = () => {
  const share = !!navigator.canShare;
  !share && gtm.canShareError();
  return share;
}
export const canCopy = () => {
  const copy = !!navigator.clipboard?.writeText;
  !copy && gtm.canCopyError();
  return copy;
}

const getBoardForSave = (board: SquareI[][]) => {
  return board.map(row => row.map(square => ({char: square.char, guessed: square.guessed})));
};

export const saveGame = (board: SquareI[][], word: Word, date: string, winner: boolean, keyStates: KeyStates) => {
  const newBoard = getBoardForSave(board);
  const game = {
    board: newBoard,
    word,
    date,
    winner,
    keyStates
  };
  const gameJson = JSON.stringify(game);
  // console.log(gameJson);
  localStorage.setItem('game', gameJson);
};
