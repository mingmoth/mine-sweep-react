export const statuses = {
  ready: 'ready',
  playing: 'playing',
  won: 'won',
  lose: 'lose',
};

export const gameLevels = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

export const gameLevelSettings = {
  easy: {
    width: 9,
    height: 9,
    mines: 10,
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40,
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99,
  },
};