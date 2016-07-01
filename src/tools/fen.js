import { CHESS_PIECES } from '../constants/chessboard';

function removeRowNumbers(row) {
  return row.replace(/(\d)/g, digit => '.'.repeat(+digit));
}

function getFenArray(fen) {
  return fen.split(' ')[0].split('/').map(removeRowNumbers);
}

function getPieces(fen) {
  const pieces = [];
  getFenArray(fen).forEach(row => {
    row.split('').forEach(char => pieces.push(CHESS_PIECES[char]));
  });
  return pieces;
}

export { getPieces };
