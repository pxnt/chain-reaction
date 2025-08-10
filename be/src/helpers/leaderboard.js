const PlayerHelpers = require('./player');
const { redis } = require('./resource');
const constants = require('../config/constants.js');

const getLeaderboardKey = (roomCode) => `Leaderboard:{${roomCode}}`;


exports.createLeaderboard = (roomCode, playerIds = []) => {
  const leaderboard = {
    roomCode,
    players: playerIds.reduce((acc, playerId) => {
      acc[playerId] = 0;
      return acc;
    }, {}),
  };

  return leaderboard;
}

exports.getLeaderboard = async (roomCode, populatePlayers = true) => {
  const response = await redis().get(getLeaderboardKey(roomCode));
  const leaderboard = JSON.parse(response);
  if (!populatePlayers) {
    return { leaderboard };
  }

  const leaderboardWithPlayers = structuredClone(leaderboard);
  const playerIds = Object.keys(leaderboard.players);
  const players = await PlayerHelpers.getPlayers(playerIds);

  players.forEach((player) => {
    leaderboardWithPlayers.players[player.id] = {
      ...player,
      score: leaderboard.players[player.id],
    };
  });

  return { leaderboard, leaderboardWithPlayers };
}

exports.addPlayerToLeaderboard = async (roomCode, player) => {
  const { leaderboard, leaderboardWithPlayers } = await exports.getLeaderboard(roomCode);

  leaderboard.players[player.id] = 0;
  leaderboardWithPlayers.players[player.id] = {
    ...player,
    score: 0,
  };

  await exports.setLeaderboard(roomCode, JSON.stringify(leaderboard));
  return leaderboardWithPlayers;
}

exports.setLeaderboard = (roomCode, payload) => {
  return redis().set(
    getLeaderboardKey(roomCode),
    payload,
    'EX',
    constants.REDIS_LEADERBOARD_EXPIRY,
  );
}

exports.removePlayerFromLeaderboard = async (roomCode, playerId) => {
  const { leaderboard } = await exports.getLeaderboard(roomCode);
  delete leaderboard.players[playerId];

  await exports.setLeaderboard(roomCode, JSON.stringify(leaderboard));

  return leaderboard;
}

exports.deleteLeaderboard = (roomCode) => {
  return redis().del(getLeaderboardKey(roomCode));
}