// "npx ts-jest config:init" --> cli cmd for creatig jest.config.js

import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@dto/(.*)$': '<rootDir>/src/dto/$1',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/index.ts'],
};
