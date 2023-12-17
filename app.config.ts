import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "mmkv-native",
  slug: "mmkv-native",
  scheme: "mmkvnative",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.jasonleibowitz.mmkvnative",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.jasonleibowitz.mmkvnative",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    tsconfigPaths: true,
  },
  extra: {
    router: {
      origin: true,
    },
    eas: {
      projectId: "21bb9bf9-27df-420a-9718-3ead72e40501",
    },
    clerkPublishableKey:
      "pk_test_c2hpbmluZy1ndXBweS05LmNsZXJrLmFjY291bnRzLmRldiQ",
  },
});
