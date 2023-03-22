module.exports = {
    transformIgnorePatterns: ['node_modules/(?!@?axios)'],
    automock: false,
    moduleNameMapper: { "\.(css)": "<rootDir>/cssStub.js"}
}