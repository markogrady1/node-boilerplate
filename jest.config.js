module.exports = {
  setupFiles: [],

  transform: { '^.+\\.js$': 'babel-jest' },

  modulePathIgnorePatterns: ['<rootDir>/config/'],

  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
  ],

  testMatch: ['<rootDir>/**/*.test.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
  ],

  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
  ],

  timers: 'fake',
  clearMocks: true,
  resetMocks: false,

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: './build/cov',
  coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
