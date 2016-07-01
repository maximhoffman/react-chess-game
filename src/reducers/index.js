import Chess from 'chess.js';
import { REDUX_ACTIONS, COLOR } from '../constants/chessboard';

const { NEW_GAME, MOVE_PIECE, LOAD_GAME } = REDUX_ACTIONS;

let game = new Chess();

function canMove(fromSquare, toSquare) {
  const legalMoves = game.moves({ verbose: true });

  if (typeof toSquare === 'undefined') {
    return legalMoves
      .filter(legalMove => legalMove.from === fromSquare).length > 0;
  }

  return legalMoves
    .filter(legalMove => legalMove.from === fromSquare &&
                         legalMove.to === toSquare).length > 0;
}

function makeRandomMove() {
  const legalMoves = game.moves();
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];

  game.move(randomMove);
}

const initialState = {
  color: COLOR.WHITE,
  fen: game.fen(),
  canMove,
};

export default function chess(state = initialState, action) {
  switch (action.type) {
    case NEW_GAME:
      game = new Chess();
      return { ...state, fen: game.fen() };

    case MOVE_PIECE:
      game.move({
        from: action.fromSquare,
        to: action.toSquare,
      });

      makeRandomMove();

      return { ...state, fen: game.fen() };

    case LOAD_GAME:
      (async() => { // eslint-disable-line
        try {
          const response = await fetch(action.url);
          const data = await response.json();
          game.load(data.saved_game);

          return { ...state, fen: game.fen() };
        } catch (e) {
          console.log('Something is going wrong');
        }
      })();

    default: // eslint-disable-line
      return state;
  }
}
