import { KeyStates } from '../components/Keyboard';
import { words } from '../data';

export const emptyKeyStates: KeyStates = {
  q: 0,
  w: 0,
  e: 0,
  r: 0,
  t: 0,
  y: 0,
  u: 0,
  i: 0,
  o: 0,
  p: 0,

  a: 0,
  s: 0,
  d: 0,
  f: 0,
  g: 0,
  h: 0,
  j: 0,
  k: 0,
  l: 0,

  z: 0,
  x: 0,
  c: 0,
  v: 0,
  b: 0,
  n: 0,
  m: 0,
};

export const word = words[Math.floor(Math.random() * words.length)];
export const wordLength = word.word.length;
export const rows = wordLength + 1;