import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Square from './Square';
import { DND_TYPES, SQUARES } from '../constants/chessboard';

const squareTarget = {
  canDrop(props, monitor) {
    const fromSquare = monitor.getItem().from;
    const toSquare = props.name;

    return props.canMove(fromSquare, toSquare);
  },

  drop(props, monitor) {
    const draggedItem = monitor.getItem();
    const fromSquare = draggedItem.from;
    const toSquare = props.name;

    return props.onMove(fromSquare, toSquare);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

@DropTarget(DND_TYPES.PIECE, squareTarget, collect) // eslint-disable-line new-cap
class BoardSquare extends Component {
  static propTypes = {
    name: PropTypes.oneOf(SQUARES).isRequired,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { name, connectDropTarget, isOver } = this.props;
    const isBlack = (name.charCodeAt(0) + name.charCodeAt(1)) % 2 === 0;

    return connectDropTarget(
      <div className="react-chessboard-square">
        <Square isBlack={isBlack} isOver={isOver}>
          {this.props.children}
        </Square>
      </div>
    );
  }
}

export default BoardSquare;
