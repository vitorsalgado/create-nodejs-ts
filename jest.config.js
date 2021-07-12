'use strict'

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
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
}
