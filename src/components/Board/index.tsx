import { Fragment } from 'react';
import { isEmptyRow } from '../../services';
import { Row } from './Row';
import { SquareI } from './Square';

export interface BoardProps {
  board: SquareI[][];
  small?: boolean;
}

export const Board = (props: BoardProps) => {

  return (
    <div className={`${props.small ? '' : 'mb-7'}`}>
      {props.board.map((row, index) =>
        <Fragment key={index}>
          {props.small && !isEmptyRow(row) && <Row row={row} small={props.small} />}
          {!props.small && <Row row={row} />}
        </Fragment>
      )}
    </div>
  );
};
