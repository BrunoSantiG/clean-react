module.exports = {
  roots: ['src'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  }
}
