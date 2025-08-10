const container = require('../container');
const socketio = require('socket.io');
const { Subscribe } = require('../config/socket');
const { soc_joinRoom, soc_addBall, soc_nextTurn } = require('../helpers/socket.js');

module.exports = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const socketId = socket.id;
    console.log(`Socket connected: ${socketId}`);

    socket.on(Subscribe.DISCONNECT, () => {
      console.log(`Socket disconnected: ${socketId}`);
    });

    socket.on(Subscribe.JOIN_ROOM, ({ roomCode }) => {
      soc_joinRoom(socket, roomCode);
    });

    socket.on(Subscribe.ADD_BALL, ({ roomCode, playerId, row, col }) => {
      console.log('Received ADD_BALL event', { roomCode, playerId, row, col });
      soc_addBall(socket, { roomCode, playerId, row, col });
    });

    socket.on(Subscribe.NEXT_TURN, async ({ roomCode, playerId, matrix }) => {
      await soc_nextTurn({ roomCode, playerId, matrix });
    });

  });

  console.log('Socket booted successfully');

  container.add('io', io);
}