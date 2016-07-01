import { REDUX_ACTIONS } from '../constants/chessboard';

const { NEW_GAME, MOVE_PIECE, LOAD_GAME } = REDUX_ACTIONS;

export const newGame = () => ({ type: NEW_GAME });

export const movePiece = (fromSquare, toSquare) => ({ type: MOVE_PIECE, fromSquare, toSquare });

export const loadGame = (url) => ({ type: LOAD_GAME, url });
