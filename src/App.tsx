import { Game } from './components/Game';

export const App = () => {
  console.log('render app');

  return (
    <div className="flex justify-center">
      <Game />
    </div>
  );
};
