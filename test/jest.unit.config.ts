import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../tsconfig.json';

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '../',
  verbose: true,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: '<rootDir>/coverage/unit',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}', '!<rootDir>/src/**/*.d.ts'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).{js,ts}'],
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testResultsProcessor: 'jest-sonar-reporter',
};

export default config;
