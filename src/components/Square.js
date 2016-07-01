import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '../assets/css/square.css';

function Square(props) {
  const { isBlack, children, isOver } = props;
  const classes = classNames({
    'react-chessboard-square--black': isBlack,
    'react-chessboard-square--white': !isBlack,
    'react-chessboard-square--over': isOver,
  });

  return (
    <div className={classes} >
      {children}
    </div>
  );
}

Square.propTypes = {
  isBlack: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default Square;
