const constants = require('../config/constants');
const { generateRandomId } = require('./common');
const { redis } = require('./resource');

const getPlayerKey = (playerId) => `Player:{${playerId}}`;

exports.createPlayer = ({ roomCode, playerName, role = constants.PLAYER_ROLE.HOST, totalPlayers = 0 }) => {
  return {
    id: generateRandomId(),
    color: exports.getPlayerColor(totalPlayers + 1),
    name: playerName,
    roomCode,
    role,
  };
}

exports.exists = async (playerId) => {
  const response = await redis().exists(getPlayerKey(playerId));
  return response === 1;
}

exports.getPlayerColor = (playerNo = 0) => {
  const colors = Object.values(constants.PLAYER_COLORS);
  return colors[playerNo % colors.length];
}

exports.getPlayer = async (playerId) => {
  const response = await redis().get(getPlayerKey(playerId));
  return JSON.parse(response);
}

exports.getPlayers = async (playerIds = []) => {
  const response = await redis().mget(playerIds.map(getPlayerKey));
  return response.map(data => JSON.parse(data));
}

exports.setPlayer = (playerId, payload) => {
  return redis().set(
    getPlayerKey(playerId),
    payload,
    'EX',
    constants.REDIS_PLAYER_EXPIRY,
  );
}

exports.removePlayer = async (playerId) => {
  await redis().del(getPlayerKey(playerId));
}

exports.deletePlayers = async (playerIds = []) => {
  await redis().del(playerIds.map(getPlayerKey));
}