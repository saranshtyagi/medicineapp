const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
  transformer: {
    // Enable inline requires
    inlineRequires: true,
    // Add CSS transformer
    babelTransformerPath: require.resolve("react-native-css-transformer"),
  },
  resolver: {
    // Remove 'css' from assetExts if present
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "css"),
    // Add 'css' to sourceExts so Metro can parse it
    sourceExts: [...defaultConfig.resolver.sourceExts, "css"],
  },
});

// Wrap with NativeWind
module.exports = withNativeWind(config, {
  input: "./global.css", // Your Tailwind entry
});
