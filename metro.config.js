const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ["browser", "require", "react-native"];
config.resolver.blockList = /node_modules\/react-native\/node_modules\/react-native\/.*/;

module.exports = config;
