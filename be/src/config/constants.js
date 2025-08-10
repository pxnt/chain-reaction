const Positions = {
  CORNER: 'corner',
  SIDE: 'side',
  MIDDLE: 'middle',
}

const CAPACITY = {
  [Positions.CORNER]: 2,
  [Positions.SIDE]: 3,
  [Positions.MIDDLE]: 4,
}

module.exports = {
  REDIS_GAME_EXPIRY: 5 * 60 * 60, // expiry for 5 hour
  REDIS_PLAYER_EXPIRY: 5 * 60 * 60, // expiry for 5 hour
  REDIS_LEADERBOARD_EXPIRY: 5 * 60 * 60, // expiry for 5 hour

  ROOM_ID_LENGTH: 4,
  PLAYER_ID_LENGTH: 4,

  MAX_PLAYERS_ALLOWED: 4,

  PLAYER_ROLE: {
    HOST: 'host',
    PLAYER: 'player',
  },

  ROOM_STATE: {
    WAITING: 'waiting',
    STARTED: 'started',
    ENDED: 'ended',
  },

  PLAYER_COLORS: {
    BLUE: '#0896e1',
    RED: '#ff1f20',
    GREEN: '#79f659',
    YELLOW: '#feb927',
  },

  Positions,
  CAPACITY,
}