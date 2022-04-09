import { useState } from 'react';
import { Game } from './components/Game';
import { Context, value } from './context';

export const App = () => {
  console.log('render app');
  const [state, setState] = useState(value.state);

  return (
    <Context.Provider value={{state, setState}}>
      <div className="flex justify-center">
        <Game />
      </div>
    </Context.Provider>
  );
};
