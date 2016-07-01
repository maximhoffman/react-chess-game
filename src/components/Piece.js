import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { DND_TYPES } from '../constants/chessboard';
import classNames from 'classnames';
import '../assets/css/piece.css';

const pieceSource = {
  canDrag(props) {
    return props.canMove;
  },

  beginDrag(props) {
    return {
      from: props.square,
      piece: props.name,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource(DND_TYPES.PIECE, pieceSource, collect) // eslint-disable-line new-cap
class Piece extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }

  render() {
    const { connectDragSource, isDragging, name } = this.props;
    const classes = classNames({
      'react-chessboard-piece': true,
      'react-chessboard-piece--dragging': isDragging,
    });
    return connectDragSource(
      <div className={classes}>
        {name}
      </div>
    );
  }
}

export default Piece;
