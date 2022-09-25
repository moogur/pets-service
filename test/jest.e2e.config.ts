import jestConfig from './jest.unit.config';

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...jestConfig,
  coverageDirectory: '<rootDir>/coverage/e2e',
  collectCoverageFrom: ['<rootDir>/test/e2e/**/*.{js,ts}', '!<rootDir>/test/e2e/**/*.d.ts'],
  testMatch: ['<rootDir>/test/e2e/**/*.test.e2e.ts'],
};

export default config;
