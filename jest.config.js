module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.ts',
        '**/?(*.)+(spec|test).ts'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    // collectCoverage: true,
    // collectCoverageFrom: [
    //     'src/**/*.{js,ts}',
    //     '!src/**/*.d.ts'
    // ],
    // coverageReporters: ['html', 'text-summary']
};