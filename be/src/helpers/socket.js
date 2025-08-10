const { Emit } = require('../config/socket.js');
const container = require('../container.js');
const { setNextPlayerTurn, addBall, sanitizeMatrix, saveMatrix } = require('./room.js');

const io = () => container.get('io');

exports.soc_playerJoined = (roomCode, player) => {
  io().to(roomCode).emit(Emit.PLAYER_JOINED, player);
};

exports.soc_joinRoom = (socket, roomCode) => {
  socket.join(roomCode);
};

exports.soc_gameStarted = (roomCode) => {
  io().to(roomCode).emit(Emit.GAME_STARTED);
}

exports.soc_addBall = async (socket, { roomCode, playerId, row, col }) => {
  await addBall(roomCode, playerId, row, col);
  socket.to(roomCode).emit(Emit.ADD_BALL, { playerId, row, col });
}

exports.soc_nextTurn = async ({ roomCode, playerId, matrix }) => {
  const sanitizedMatrix = sanitizeMatrix(matrix);

  await Promise.all([
    saveMatrix(roomCode, sanitizedMatrix),
    setNextPlayerTurn(roomCode, playerId),
  ]);
  io().to(roomCode).emit(Emit.NEXT_TURN, { playerId, matrix: sanitizedMatrix });
}

exports.soc_playerRemoved = (roomCode, playerId) => {
  io().to(roomCode).emit(Emit.PLAYER_REMOVED, { playerId });
}