import { useContext } from 'react';
import { Context } from '../../../context';

export enum keyState {
  ERROR = -1,
  INITIAL = 0,
  ALMOST = 1,
  GUESSED = 2,
};

export interface SquareI {
  char: string;
  guessed: keyState;
  border?: boolean;
}

export const Square = (props: SquareI) => {
  const { state } = useContext(Context);

  const background = props.guessed === keyState.INITIAL ?
    `bg-light-background dark:bg-dark-background ${props.border ? 'border-light-primary-700 dark:border-dark-primary-700' : 'border-light-border dark:border-dark-border'}`:
    props.guessed === keyState.ERROR ?
    'bg-light-error-300 dark:bg-dark-error-700 border-light-error-300 dark:border-dark-error-700' :
    props.guessed === keyState.ALMOST ?
    `${state.highContrast ? 'bg-light-warninghigh-400 dark:bg-dark-warninghigh-500 border-light-warninghigh-400 dark:border-dark-warninghigh-500 dark:text-dark-contrast' : 'bg-light-warning-300 dark:bg-dark-warning-500 border-light-warning-300 dark:border-dark-warning-500 dark:text-dark-contrast'}` :
    `${state.highContrast ? 'bg-light-successhigh-600 dark:bg-dark-successhigh-700 border-light-successhigh-600 dark:border-dark-successhigh-700 text-light-contrast' : 'bg-light-success-500 dark:bg-dark-success-700 border-light-success-500 dark:border-dark-success-700'}`;

  return (
    <div
      className={`flex items-center justify-center uppercase font-bold border-2 ${background} w-12 h-12 m-1 select-none`}
    >
      {props.char}
    </div>
  );
};
