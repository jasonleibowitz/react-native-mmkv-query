module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo"],
      ["@babel/preset-env", { targets: { node: "current" } }],
    ],
    plugins: [
      "expo-router/babel",
      // Option - only if you ever use process.env
      "transform-inline-environment-variables",
      // Note: This is optional, you don't *need* the compiler
      // [
      //   "@tamagui/babel-plugin",
      //   {
      //     components: ["tamagui"],
      //     config: "./tamagui.config.ts",
      //     logTimings: true,
      //   },
      // ],
      // Note: Must be listed last. This is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};
