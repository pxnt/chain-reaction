const { cellReachedCapacity } = require('../utils/misc');
const Directions = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

const explode = (matrix, row, col) => {
  const Movements = {
    [Directions.UP]: [-1, 0],
    [Directions.DOWN]: [1, 0],
    [Directions.LEFT]: [0, -1],
    [Directions.RIGHT]: [0, 1],
  }

  const isValidBox = (x, y) =>
    x >= 0 && y >= 0 && x < rows.value && y < cols.value

  Object.entries(Movements).forEach(([direction, [moveX, moveY]]) => {
    const targetRow = row + moveX
    const targetCol = col + moveY

    if (isValidBox(targetRow, targetCol))
      addTravellingBall(row, col, targetRow, targetCol)
  })
}

const explodeIfFull = (matrix, row, col) => {
 if(cellReachedCapacity(col, row, matrix.length, matrix[0].length, matrix[row][col].count)) {
   matrix[row][col].count = 0;
   matrix[row][col].playerId = '';
    explode()
 }
}

const addBall = (matrix, row, col, playerIdTurn) => {
  matrix[row][col].count += 1;
  matrix[row][col].playerId = playerIdTurn;
}

exports.react = (matrix, row, col, playerIdTurn) => {
  addBall(matrix, row, col, playerIdTurn);
  explodeIfFull(matrix, row, col);
}