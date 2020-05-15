module.exports = {
  collectCoverageFrom: [
    '**/src/**/*.{js,ts,tsx}',
    '!<rootDir>/node_modules/**/*',
    '!<rootDir>/src/test/**/*',
    '!<rootDir>/src/dev-tools/**/*',
    '!<rootDir>/src/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 20,
      functions: 26,
      lines: 34,
    },
  },
}
