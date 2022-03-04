import { Square, SquareI } from '../Square';

export interface RowProps {
  row: SquareI[];
}

export const Row = (props: RowProps) => {
  return (
    <div className="flex justify-center">
      {props.row.map((char, index) =>
        <Square
          key={index}
          char={char.char}
          guessed={char.guessed}
          border={char.border}
        />
      )}
    </div>
  );
};
