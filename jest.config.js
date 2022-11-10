module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/src/tests/setupEnv.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupJestDom.ts'],
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    moduleNameMapper: {
        '^core(.*)$': '<rootDir>/src/core$1',
        '^components(.*)$': '<rootDir>/src/components$1',
        '^utils(.*)$': '<rootDir>/src/utils$1',
        '^services(.*)$': '<rootDir>/src/services$1',
        '^hoc(.*)$': '<rootDir>/src/hoc$1',
        '^reducers(.*)$': '<rootDir>/src/reducers$1',
        '^tests(.*)$': '<rootDir>/src/tests$1',
        '\\.(css|svg|png|jpg)$': 'identity-obj-proxy',
    },
};
