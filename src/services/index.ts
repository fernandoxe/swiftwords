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

export const isEmptyRow = (row: SquareI[]) => row.every(square => !square.char);

const getBaseEmojis = () => {
  const dark = localStorage.getItem('theme') === 'dark';
  const highContrast = localStorage.getItem('highContrast') === '1';
  const colored = {
    [keyState.ERROR.toString()]: dark ? '⬛' : '⬜',
    [keyState.ALMOST.toString()]: '🟨',
    [keyState.GUESSED.toString()]: '🟩',
  };

  if(highContrast) {
    colored[keyState.ALMOST] = '🟧';
    colored[keyState.GUESSED] = '🟦';
  }

  return colored;
};

export const getEmojisBoard = (board: SquareI[][]) => {
  const emojisBoard: string[][] = [];
  const baseEmojis = getBaseEmojis();

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const newRow = [];
    for (let j = 0; j < row.length; j++) {
      const square = row[j];
      newRow.push(baseEmojis[square.guessed]);
    }
    newRow.length && emojisBoard.push(newRow);
  }

  return emojisBoard;
};

export const getRandomWord = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}?random=1`);
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
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

export const getSimpleBoard = (board: SquareI[][]) => {
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
  const newBoard = getSimpleBoard(board);
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

export const share = async (text: string, title?: string) => {
  await navigator.share({
    text,
    title: title || process.env.REACT_APP_TITLE,
    // url: url || process.env.REACT_APP_URL,
  });
};
