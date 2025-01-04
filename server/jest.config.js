"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    verbose: true,
    coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        'node_modules',
        'jestGlobalMocks.ts',
        '.module.ts',
        './src/main.ts',
        '.mock.ts',
    ],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map