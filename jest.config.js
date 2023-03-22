module.exports = {
    transformIgnorePatterns: ['node_modules/(?!@?node-fetch)'],
    automock: false,
    moduleNameMapper: { "\.(css)": "<rootDir>/cssStub.js"}
}