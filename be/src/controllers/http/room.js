const joi = require('joi');
const { validateJoi, control } = require('../../helpers/controller');
const RoomHelpers = require('../../helpers/room');
const PlayerHelpers = require('../../helpers/player');
const LeaderboardHelpers = require('../../helpers/leaderboard');
const constants = require('../../config/constants');
const { soc_playerJoined, soc_gameStarted, soc_playerRemoved, soc_gameEnded } = require('../../helpers/socket.js');

const roomCodeValidation = joi.string()
  .min(constants.ROOM_ID_LENGTH)
  .max(constants.ROOM_ID_LENGTH);

const playerIdValidation = joi.string()
  .min(constants.PLAYER_ID_LENGTH)
  .max(constants.PLAYER_ID_LENGTH);

exports.create = control({
  validate: (req) => {
    const bodySchema = joi.object({
      rows: joi.number().min(3),
      cols: joi.number().min(3),
      playerName: joi.string().min(3),
    });

    return validateJoi(bodySchema, req.body);
  },
  exec: async (req, res) => {
    const { rows, cols, playerName } = req.body;

    // create room
    const room = RoomHelpers.createRoom(rows, cols);

    // create player
    const player = PlayerHelpers.createPlayer({ roomCode: room.code, playerName, role: constants.PLAYER_ROLE.HOST, totalPlayers: 0 });

    room.playerIdTurn = player.id;

    // create leaderboard
    const leaderboard = LeaderboardHelpers.createLeaderboard(room.code, [player.id]);

    await Promise.all([
      RoomHelpers.setRoom(room.code, room),
      PlayerHelpers.setPlayer(player.id, JSON.stringify(player)),
      LeaderboardHelpers.setLeaderboard(leaderboard.roomCode, JSON.stringify(leaderboard)),
    ]);

    const { leaderboardWithPlayers } = await LeaderboardHelpers.getLeaderboard(room.code);

    return {
      data: {
        room,
        currentPlayerId: player.id,
        leaderboard: leaderboardWithPlayers,
      },
    };
  },
});

exports.getAll = control({
  validate: (req) => {
    const paramsSchema = joi.object({
      roomCode: roomCodeValidation.required(),
    });
    const querySchema = joi.object({
      playerId: playerIdValidation.required(),
    });

    return validateJoi(paramsSchema, req.params) && validateJoi(querySchema, req.query);
  },
  exec: async (req, res) => {
    const { roomCode } = req.params;
    const { playerId } = req.query;

    const [room, player, leaderboardData] = await Promise.all([
      RoomHelpers.getRoom(roomCode),
      PlayerHelpers.getPlayer(playerId),
      LeaderboardHelpers.getLeaderboard(roomCode),
    ]);

    const { leaderboardWithPlayers } = leaderboardData;

    return {
      data: {
        room,
        currentPlayerId: playerId,
        leaderboard: leaderboardWithPlayers,
      },
    };
  },
});

exports.join = control({
  validate: (req) => {
    const bodySchema = joi.object({
      roomCode: roomCodeValidation.required(),
      playerName: joi.string().required().min(3),
    });

    return validateJoi(bodySchema, req.body);
  },
  exec: async (req, res) => {
    const { roomCode, playerName } = req.body;

    const [room, { leaderboard }] = await Promise.all([
      RoomHelpers.getRoom(roomCode),
      LeaderboardHelpers.getLeaderboard(roomCode, false),
    ]);
    
    if (!room) {
      throw new Error('room.NOT_FOUND');
    }

    const totalPlayers = Object.keys(leaderboard.players).length;

    if (totalPlayers >= constants.MAX_PLAYERS_ALLOWED) {
      throw new Error('room.FULL');
    }

    // create player
    const player = PlayerHelpers.createPlayer({ roomCode, playerName, role: constants.PLAYER_ROLE.PLAYER, totalPlayers });

    // add player to leaderboard
    const [_player, leaderboardWithPlayers] = await Promise.all([
      PlayerHelpers.setPlayer(player.id, JSON.stringify(player)),
      LeaderboardHelpers.addPlayerToLeaderboard(roomCode, player),
    ])

    soc_playerJoined(roomCode, player);

    return {
      data: {
        room,
        currentPlayerId: player.id,
        leaderboard: leaderboardWithPlayers,
      },
    };
  },
});

exports.start = control({
  validate: (req) => {
    const paramsSchema = joi.object({
      roomCode: roomCodeValidation.required(),
    });

    return validateJoi(paramsSchema, req.params);
  },
  exec: async (req, res) => {
    const { roomCode } = req.params;
    const room = await RoomHelpers.startGame(roomCode);
    soc_gameStarted(roomCode);

    return {
      data: {
        room,
      },
    };
  },
});

exports.isValid = control({
  validate: (req) => {
    const querySchema = joi.object({
      roomCode: roomCodeValidation,
      playerId: playerIdValidation,
    });

    return validateJoi(querySchema, req.query);
  },
  exec: async (req, res) => {
    const { roomCode, playerId } = req.query;

    if(!roomCode && !playerId) {
      return {
        data: {
          room: null,
          player: null,
        }
      };
    }

    let room = false, player = false;
    const asyncActions = [];
    if (roomCode) {
      asyncActions.push(
        RoomHelpers.exists(roomCode)
        .then(data => room = data)
      );
    }

    if(playerId) {
      asyncActions.push(
        LeaderboardHelpers.getLeaderboard(roomCode, false)
          .then(data => {
            const { leaderboard } = data;
            player = Object.keys(leaderboard.players).includes(playerId);
        })
      );
    }

    await Promise.all(asyncActions);

    return {
      data: {
        room,
        player,
      },
    };
  },
});

exports.removePlayer = control({
  validate: (req) => {
    const paramsSchema = joi.object({
      roomCode: roomCodeValidation.required(),
      playerId: playerIdValidation.required(),
    });

    return validateJoi(paramsSchema, req.params);
  },
  exec: async (req, res) => {
    const { roomCode, playerId } = req.params;

    const room = await RoomHelpers.getRoom(roomCode);
    if(!room) {
      throw new Error('room.NOT_FOUND');
    }

    if(room.state !== constants.ROOM_STATE.WAITING) {
      throw new Error('room.NOT_WAITING');
    }
    
    await LeaderboardHelpers.removePlayerFromLeaderboard(roomCode, playerId);
    await PlayerHelpers.removePlayer(playerId);

    soc_playerRemoved(roomCode, playerId);

    return {
      data: {
        playerId,
      },
    };
  },
});

exports.end = control({
  validate: (req) => {
    const paramsSchema = joi.object({
      roomCode: roomCodeValidation.required(),
    });
  },
  exec: async (req, res) => {
    const { roomCode } = req.params;
    const { leaderboardWithPlayers } = await LeaderboardHelpers.getLeaderboard(roomCode);
    const playerIds = Object.keys(leaderboardWithPlayers.players);

    await Promise.all([
      RoomHelpers.deleteGame(roomCode),
      LeaderboardHelpers.deleteLeaderboard(roomCode),
      PlayerHelpers.deletePlayers(playerIds),
    ]);
    soc_gameEnded(roomCode);
    return {
      data: {
        roomCode,
      },
    };
  },
});