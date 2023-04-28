module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
