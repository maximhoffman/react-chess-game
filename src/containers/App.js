import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Board from '../components/Board';
import Button from '../components/Button';
import * as chessActions from '../actions/ChessActions';
import { SAVED_GAME_URL } from '../constants/chessboard';

class App extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    chessActions: PropTypes.object.isRequired,
    chess: PropTypes.object.isRequired,
  }

  render() {
    const { fen, canMove } = this.props.chess;
    const { movePiece, loadGame } = this.props.chessActions;

    return (
      <div>
        <Board fen={fen} canMove={canMove} onMove={movePiece} />
        <Button loadGame={loadGame} url={SAVED_GAME_URL} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chess: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chessActions: bindActionCreators(chessActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
