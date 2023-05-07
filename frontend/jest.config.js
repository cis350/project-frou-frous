module.exports = {
  // eslint-disable-next-line no-useless-escape
  transformIgnorePatterns: ['node_modules/(?!\@?axios)'],
  automock: false,
  moduleNameMapper: {
    '\\.(css)': '<rootDir>/cssStub.js',
    '\\.(jpg|jpeg|png)$': 'identity-obj-proxy',
  },
  jest: {
    testEnvironment: 'jsdom',
  },
};
