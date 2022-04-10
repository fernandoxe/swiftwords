import { keyState, SquareI } from '../components/Board/Square';
import { ChartsProps } from '../components/Charts';
import { Word } from '../components/Game';
import { KeyStates } from '../components/Keyboard';
import { ATTEMPTS } from '../constants';
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

export const getRandomWord = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/swiftdle/random`);
    if(!response.ok) {
      throw Error(`Status ${response.status}`);
    };
    const data = await response.json();
    return data;
  } catch(error: any) {
    console.log(`Error in fetch Random. ${error.message}`);
    gtm.getRandomWordError(error.message);
    return {};
  }
};

export const getTodayWord = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/swiftdle`);
    if(!response.ok) {
      throw Error(`Status ${response.status}`);
    };
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(`Error in fetch Today. ${error.message}`);
    gtm.getRandomWordError(error.message);
    return {};
  }
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

export const getFromLocalStorage = (key: string) => {
  try {
    const savedValue = localStorage.getItem(key) || '{}';
    const value = JSON.parse(savedValue);
    return value;
  } catch (error: any) {
    return {};
  }
};

export const getLastGame = () => getFromLocalStorage('lastGame');

export const getCharts = () => {
  let savedCharts = getFromLocalStorage('stats');
  if(!savedCharts.total) { // 0 games played
    savedCharts = {
      total: 0,
      normal: 0,
      random: 0,
      currentStreak: 0,
      bestStreak: 0,
      winner: 0,
      byRow: Array(ATTEMPTS).fill(0),
    };
  }
  return savedCharts;
}

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
  localStorage.setItem('lastGame', gameJson);
};

export const saveCharts = (charts: ChartsProps, isRandom: boolean, winner: boolean, row: number) => {
  const newCharts = {
    ...charts,
    byRow: [...charts.byRow],
  };
  newCharts.total = newCharts.total + 1;
  newCharts.normal = !isRandom ? newCharts.normal + 1 : newCharts.normal;
  newCharts.random = isRandom ? newCharts.random + 1 : newCharts.random;
  newCharts.currentStreak = winner ? newCharts.currentStreak + 1 : 0;
  newCharts.bestStreak = newCharts.currentStreak > newCharts.bestStreak ? newCharts.currentStreak : newCharts.bestStreak;
  newCharts.winner = winner ? newCharts.winner + 1 : newCharts.winner;
  newCharts.byRow[row] = winner ? newCharts.byRow[row] + 1 : newCharts.byRow[row];

  const chartsJson = JSON.stringify(newCharts);

  localStorage.setItem('stats', chartsJson);

  return newCharts;
};

export const percent = (value: number, total: number) => `${total ? value*100/total : '0'}%`;
