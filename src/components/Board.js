import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { SQUARES } from '../constants/chessboard';
import { getPieces } from '../tools/fen';
import BoardSquare from './BoardSquare';
import Piece from './Piece';
import '../assets/css/board.css';

@DragDropContext(HTML5Backend) // eslint-disable-line new-cap
class Board extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fen: PropTypes.string.isRequired,
    canMove: PropTypes.func,
    onMove: PropTypes.func.isRequired,
  }

  static defaultProps = {
    dnd: true,
    canMove: () => true,
    onMove: () => {},
  }

  render() {
    const { fen, canMove, onMove } = this.props;
    const squares = [];
    const pieces = getPieces(fen);

    for (let i = 0; i < 64; i++) {
      const piece = pieces[i];
      const square = SQUARES[i];

      squares.push(
        <BoardSquare name={square} key={square} canMove={canMove} onMove={onMove} >
          {piece && <Piece square={square} name={piece} canMove={canMove(square)} />}
        </BoardSquare>
      );
    }

    return (
      <div className="react-chessboard">
        {squares}
      </div>
    );
  }
}

export default Board;
