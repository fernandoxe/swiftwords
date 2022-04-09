import { Row } from './Row';
import { SquareI } from './Square';

export interface BoardProps {
  board: SquareI[][];
}

export const Board = (props: BoardProps) => {

  return (
    <div className="mb-7">
      {props.board.map((row, index) =>
        <Row key={index} row={row} />
      )}
    </div>
  );
};
