module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  // Coverage report
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html']
};
