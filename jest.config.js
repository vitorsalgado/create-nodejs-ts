'use strict'

const COVERAGE_THRESHOLD_DEFAULT = 40
const COVERAGE_THRESHOLD = process.env.COVERAGE_THRESHOLD
  ? parseInt(process.env.COVERAGE_THRESHOLD)
  : COVERAGE_THRESHOLD_DEFAULT

module.exports = {
  verbose: true,
  collectCoverage: false,
  restoreMocks: true,
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  },
  projects: ['<rootDir>'],
  collectCoverageFrom: ['**/src/*/**/*.ts', '!**/__fixtures__/**', '!**/__tests__/**'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '/node_modules/', '<rootDir>/scripts', '<rootDir>/tools'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '/node_modules/', '<rootDir>/scripts', '<rootDir>/tools'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1'
  },
  coverageThreshold: {
    global: {
      branches: COVERAGE_THRESHOLD,
      functions: COVERAGE_THRESHOLD,
      lines: COVERAGE_THRESHOLD,
      statements: COVERAGE_THRESHOLD
    }
  }
}
