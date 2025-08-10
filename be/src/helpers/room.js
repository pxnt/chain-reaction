const constants = require('../config/constants');
const { getCellCapacity, cellReachedCapacity } = require('../utils/misc');
const { generateRandomId } = require('./common');
const { redis } = require('./resource');

const createEmptyMatrix = (rows, cols) => {
  const matrix = [];

  for (let x = 0; x < rows; x++) {
    const rowMatrix = [];

    for (let y = 0; y < cols; y++) {
      rowMatrix[y] = {
        playerId: '',
        count: 0,
        capacity: getCellCapacity(x, y, rows, cols),
      }
    }
    matrix[x] = rowMatrix;
  }

  return matrix;
}

const getRoomKey = (roomCode) => `Room:{${roomCode}}`;

exports.createRoom = (rows, cols) => {
  const matrix = createEmptyMatrix(rows, cols);
  return {
    code: generateRandomId(),
    rows,
    cols,
    state: constants.ROOM_STATE.WAITING,
    matrix,
    playerIdTurn: '',
  };
}

const parseRedisRoom = (room) => {
  return Object.entries(room).reduce((acc, [key, value]) => {
    acc[key] = JSON.parse(value);
    return acc;
  }, {});
}

exports.exists = async (roomCode) => {
  const response = await redis().exists(getRoomKey(roomCode));
  return response === 1;
}

exports.getRoom = async (roomCode) => {
  const response = await redis().hgetall(getRoomKey(roomCode));
  return parseRedisRoom(response);
}

exports.setRoom = async (roomCode, payload) => {
  const args = Object.entries(payload).reduce((acc, [key, value]) => {
    acc.push(key, JSON.stringify(value));
    return acc;
  }, []);
  
  await redis().hset(
    getRoomKey(roomCode),
    ...args,
  );
  return await redis().expire(getRoomKey(roomCode), constants.REDIS_GAME_EXPIRY);
}

exports.startGame = async (roomCode) => {
  const room = await exports.getRoom(roomCode);

  if (!room) {
    throw new Error('room.NOT_FOUND');
  }

  if(room.state !== constants.ROOM_STATE.WAITING) {
    throw new Error('room.INVALID_STATE');
  }

  room.state = constants.ROOM_STATE.STARTED;
  await exports.setRoomState(roomCode, constants.ROOM_STATE.STARTED);

  return room;
}

exports.endGame = async (roomCode) => {
  const room = await exports.getRoom(roomCode);

  if (!room) {
    throw new Error('room.NOT_FOUND');
  }

  if(room.state !== constants.ROOM_STATE.STARTED) {
    throw new Error('room.INVALID_STATE');
  }

  room.state = constants.ROOM_STATE.ENDED;
  await exports.setRoomState(roomCode, constants.ROOM_STATE.ENDED);
  
  return room;
}

exports.setNextPlayerTurn = async (roomCode, playerId) => {
  const exists = await exports.exists(roomCode);
  if (!exists) {
    return;
  }
  await redis().hset(getRoomKey(roomCode), 'playerIdTurn', JSON.stringify(playerId));
}

exports.setRoomState = async (roomCode, state) => {
  const exists = await exports.exists(roomCode);
  if (!exists) {
    return;
  }
  await redis().hset(getRoomKey(roomCode), 'state', JSON.stringify(state));
}

exports.addBall = async (roomCode, playerId, row, col) => {
  const room = await exports.getRoom(roomCode);

  const { rows, cols, matrix } = room;

  if (cellReachedCapacity(col, row, rows, cols, matrix[row][col].count + 1)) {
    matrix[row][col].count = 0;
  } else {
    matrix[row][col].count += 1;
    matrix[row][col].playerId = playerId;
  }

  return await redis().hset(getRoomKey(roomCode), 'matrix', JSON.stringify(matrix));
}