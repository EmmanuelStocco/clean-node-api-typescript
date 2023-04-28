module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
