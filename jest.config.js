module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@expo|expo|react-clone-referenced-element|@unimodules|unimodules|sentry-expo|native-base|@sentry)',
  ],
};