const { generateRandomId } = require('./common');
const { redis } = require('./resource');
const constants = require('../config/constants');

const getLeaderboardKey = (roomCode) => `Leaderboard:{${roomCode}}`;


exports.createLeaderboard = (roomCode, players = []) => {
  const leaderboard = {
    roomCode,
    players: players.reduce((acc, player) => {
      acc[player.id] = player;
      return acc;
    }, {}),
  };

  return leaderboard;
}

exports.getLeaderboard = async (roomCode) => {
  const response = await redis().get(getLeaderboardKey(roomCode));
  return JSON.parse(response);
}

exports.addPlayerToLeaderboard = async (roomCode, playerId) => {
  const { leaderboard } = await exports.getLeaderboard(roomCode);

  leaderboard.players[playerId] = 0;

  await exports.setLeaderboard(roomCode, JSON.stringify(leaderboard));
  return leaderboard;
}

exports.setLeaderboard = (roomCode, payload) => {
  return redis().set(
    getLeaderboardKey(roomCode),
    payload,
    'EX',
    constants.REDIS_LEADERBOARD_EXPIRY,
  );
}