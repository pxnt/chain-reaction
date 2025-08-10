const constants = require('../config/constants');

exports.isCornerBox = (x, y, rows, cols) => {
  return (
    (x === 0 && y === 0) || // top-left
    (x === 0 && y === cols - 1) || // top-right
    (x === rows - 1 && y === 0) || // bottom-left
    (x === rows - 1 && y === cols - 1)
  ); // bottom-right
}

exports.isSideBox = (x, y, rows, cols) => {
  return (
    !exports.isCornerBox(x, y, rows, cols) &&
    (x === 0 ||
      y === 0 ||
      x === rows - 1 ||
      y === cols - 1)
  );
}

exports.isMiddleBox = (x, y, rows, cols) => {
  return !exports.isSideBox(x, y, rows, cols);
}

exports.getPosition = (x, y, rows, cols) => {
  if (exports.isCornerBox(x, y, rows, cols)) {
    return constants.Positions.CORNER;
  } else if (exports.isSideBox(x, y, rows, cols)) {
    return constants.Positions.SIDE;
  }
  return constants.Positions.MIDDLE;
}

exports.getCellCapacity = (x, y, rows, cols) => constants.CAPACITY[exports.getPosition(x, y, rows, cols)];

exports.cellReachedCapacity = (x, y, rows, cols, count) => {
  const capacity = exports.getCellCapacity(x, y, rows, cols);
  return count >= capacity;
}
