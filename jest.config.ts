import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',  // Use the ts-jest preset for TypeScript compilation
    testEnvironment: 'node',  // Set the test environment to Node.js
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',  // Use your main tsconfig for compilation
        },
    },
   // setupFiles: ['<rootDir>/jest.setup.ts'],  // Optional: Jest setup file for additional configurations like TypeDI
    moduleNameMapper: {
        "@src/(.*)": '<rootDir>/src/$1',
        "@config/(.*)": '<rootDir>/src/config/$1',
        "@dto/(.*)": '<rootDir>/src/bl/dto/$1',
        "@services/(.*)": '<rootDir>/src/bl/services/$1',
        "@repositories/(.*)": '<rootDir>/src/dal/domain/repositories/$1',
        "@entities/(.*)": '<rootDir>/src/dal/domain/entities/$1',
        "@storage/(.*)": '<rootDir>/src/dal/infra/storage/$1',
        "@pipes/(.*)": '<rootDir>/src/api/pipes/$1',
        "@routes/(.*)": '<rootDir>/src/api/routes/$1',
        "@middleware/(.*)": '<rootDir>/src/api/middleware/$1',
        "@controllers/(.*)": '<rootDir>/src/api/controllers/$1',
        "@notifications/(.*)": '<rootDir>/src/dal/data/notifications/$1',
        "@data/(.*)": '<rootDir>/src/dal/data/$1'
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],  // Ignore dist and node_modules
    collectCoverage: false,
    testTimeout: 1000,
    coverageDirectory: 'coverage',
    detectOpenHandles: true,
    coverageReporters: ['text', 'lcov'],
    verbose: true,  // Enables verbose test results
};

export default config;