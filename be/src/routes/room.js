const express = require('express');
const room = require('../controllers/http/room');

const roomRouter = new express.Router();

roomRouter.post('/room', room.create);
roomRouter.post('/join', room.join);

roomRouter.get('/room/:roomCode/details', room.getAll);

roomRouter.get('/room-details/is-valid', room.isValid);

roomRouter.post('/room/:roomCode/start', room.start);

roomRouter.delete('/room/:roomCode/player/:playerId', room.removePlayer);

module.exports = roomRouter;