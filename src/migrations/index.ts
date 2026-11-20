import * as migration_20261120_132408_initial from './20261120_132408_initial';

export const migrations = [
  {
    up: migration_20261120_132408_initial.up,
    down: migration_20261120_132408_initial.down,
    name: '20261120_132408_initial'
  },
];
