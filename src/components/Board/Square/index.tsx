export enum keyState {
  ERROR = -1,
  INITIAL = 0,
  ALMOST = 1,
  GUESSED = 2,
};

export interface SquareI {
  char: string;
  guessed: keyState;
  border: boolean;
}

export const Square = (props: SquareI) => {
  const background = props.guessed === keyState.INITIAL ?
    '':
    props.guessed === keyState.ERROR ?
    'bg-slate-300 border-slate-300' :
    props.guessed === keyState.ALMOST ?
    'bg-yellow-300 border-yellow-300' :
    'bg-green-500 border-green-500';

  return (
    <div
      className={`flex items-center justify-center uppercase font-bold ${props.border ? 'border-4 border-purple-700' : 'border-2 border-slate-300'} ${background} w-12 h-12 m-1 select-none`}
    >
      {props.char}
    </div>
  );
};
