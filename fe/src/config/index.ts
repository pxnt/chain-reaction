export enum Positions {
  CORNER = 'corner',
  SIDE = 'side',
  MIDDLE = 'middle',
};

export enum Directions {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

const Constants = {
  NO_OF_COLS: 6,
  NO_OF_ROWS: 7,

  MATRIX_SIZES: {
    '7x6': { rows: 7, cols: 6 },
    '8x7': { rows: 8, cols: 7 },
  },

  TransitionDuration: 500,

  Colors: {
    BLUE: '#0896e1',
    RED: '#ff1f20',
    GREEN: '#79f659',
    YELLOW: '#feb927',
  },

  CAPACITY: {
    [Positions.CORNER]: 2,
    [Positions.SIDE]: 3,
    [Positions.MIDDLE]: 4,
  },

  PLAYER_COLORS: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],

  ROOM_CODE_LENGTH: 4,
}

export default Constants
