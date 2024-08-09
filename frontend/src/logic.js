const board = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// pawn move validation
function isValidPawnMove(from, to, piece) {
  const [fromCol, fromRow] = from;
  const [toCol, toRow] = to;
  const direction = piece === 'P' ? -1 : 1;
  const startRow = piece === 'P' ? 6 : 1;
  console.log(fromCol, fromRow, toCol, toRow);
  if (toCol === fromCol) {
    // Regular move
    if (board[toRow][toCol] === '') {
      if (toRow === fromRow + direction) { console.log('hello'); return true; }
      if (fromRow === startRow && toRow === fromRow + 2 * direction && board[fromRow + direction][fromCol] === '') {console.log('hello2'); return true;}
    }
  } else if (Math.abs(toCol - fromCol) === 1) {
    // Capture
    if (board[toRow][toCol] !== '' && isOpponentPiece(toRow, toCol, piece)) {
      return toRow === fromRow + direction;
    }
  }

  return false;
}

// valid rook move
function isValidRookMove(from, to) {
  const [fromCol, fromRow] = from;
  const [toCol, toRow] = to;

  if (fromRow !== toRow && fromCol !== toCol) return false;

  if (fromRow === toRow) {
    const step = fromCol < toCol ? 1 : -1;
    for (let col = fromCol + step; col !== toCol; col += step) {
      if (board[fromRow][col] !== '') return false;
    }
  } else {
    const step = fromRow < toRow ? 1 : -1;
    for (let row = fromRow + step; row !== toRow; row += step) {
      if (board[row][fromCol] !== '') return false;
    }
  }

  return true;
}
// valid knight move
function isValidKnightMove(from, to) {
  const [fromCol, fromRow] = from;
  const [toCol, toRow] = to;

  const rowDiff = Math.abs(fromRow - toRow);
  const colDiff = Math.abs(fromCol - toCol);

  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}
// valid bishop move
function isValidBishopMove(from, to) {
  const [fromCol, fromRow] = from;
  const [toCol, toRow] = to;

  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;

  const rowStep = fromRow < toRow ? 1 : -1;
  const colStep = fromCol < toCol ? 1 : -1;

  let row = fromRow + rowStep;
  let col = fromCol + colStep;
  while (row !== toRow && col !== toCol) {
    if (board[row][col] !== '') return false;
    row += rowStep;
    col += colStep;
  }

  return true;
}
// valid queen move
function isValidQueenMove(from, to) {
  return isValidRookMove(from, to) || isValidBishopMove(from, to);
}
// valid king move
function isValidKingMove(from, to) {
  const [fromCol, fromRow] = from;
  const [toCol, toRow] = to;

  const rowDiff = Math.abs(fromRow - toRow);
  const colDiff = Math.abs(fromCol - toCol);

  return rowDiff <= 1 && colDiff <= 1;
}
// check opponentpiece
function isOpponentPiece(row, col, piece) {
  const targetPiece = board[row][col];
  if (targetPiece === '') return false;

  return (piece === piece.toUpperCase() && targetPiece === targetPiece.toLowerCase()) ||
    (piece === piece.toLowerCase() && targetPiece === targetPiece.toUpperCase());
}
// check validity

export function isValidMove(from, to, piece) {
  switch (piece.toLowerCase()) {
    case 'p': return isValidPawnMove(from, to, piece);
    case 'r': return isValidRookMove(from, to);
    case 'n': return isValidKnightMove(from, to);
    case 'b': return isValidBishopMove(from, to);
    case 'q': return isValidQueenMove(from, to);
    case 'k': return isValidKingMove(from, to);
    default: return false;
  }
}
