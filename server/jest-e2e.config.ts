import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'node_modules',
    'jestGlobalMocks.ts',
    './src/main.rs',
    '.mock.ts',
  ],
};

export default config;
