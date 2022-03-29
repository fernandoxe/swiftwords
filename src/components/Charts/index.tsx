import { percent } from '../../services';

export interface ChartsProps {
  total: number;
  normal: number;
  random: number;
  currentStreak: number;
  bestStreak: number;
  winner: number;
  byRow: number[];
}

export const Charts = (props: ChartsProps) => {
  const gamesWon = percent(props.winner, props.total);
  const wonByRow = props.byRow.map(x => ({winner: x, width: percent(x, props.total)}));

  return (
    <>
      <div className="font-bold mb-4">
        Total games: {props.total}
      </div>
      <div className="flex font-bold text-sm mb-4">
        <div className="mr-5">
          {process.env.REACT_APP_TITLE}: {props.normal}
        </div>
        <div>
          Random: {props.random}
        </div>
      </div>
      <div className="flex font-bold text-sm mb-4">
        <div className="mr-5">
          Current streak: {props.currentStreak}
        </div>
        <div>
          Best streak: {props.bestStreak}
        </div>
      </div>
      <div className="font-bold text-sm mb-1">
        Games won
      </div>
      <div className="relative flex grow border-l border-l-purple-300 mb-4">
        <div className={`h-4 bg-purple-300`} style={{width: gamesWon}}>
        </div>
        <div className="absolute right-0 mr-1 text-xs font-bold">
          {props.winner}
        </div>
      </div>
      <div className="font-bold text-sm mb-1">
        Games won by row
      </div>
      {wonByRow.map((row, index) =>
        <div key={index} className="flex items-center mb-1">
          <div className="text-sm w-3.5 leading-none">
            {index + 1}
          </div>
          <div className="relative flex grow border-l border-l-purple-300">
            <div className="h-4 bg-purple-300" style={{width: row.width}}>
            </div>
            <div className="absolute right-0 mr-1 text-xs font-bold">
              {row.winner}
            </div>
          </div>
        </div>
      )}    
    </>
  );
};
