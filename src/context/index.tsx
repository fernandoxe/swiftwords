import { createContext } from 'react';

export interface State {
  highContrast: boolean;
};

export interface ContextI {
  state: State,
  setState: (state: State) => void;
}

export const value: ContextI = {
  state: {
    highContrast: !!Number(window.localStorage.getItem('highContrast')),
  },
  setState: () => {},
};

export const Context = createContext(value);
