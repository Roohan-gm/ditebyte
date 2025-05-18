const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ensure SVG files are recognized
config.resolver.sourceExts.push("svg", "cjs"); 

// Ensure package exports are disabled if needed
config.resolver.unstable_enablePackageExports = false;

// Use the correct transformer for SVG files
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

module.exports = withNativeWind(config, { input: "./app/global.css" });