import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  external: [
    "react",
    "react-native",
    "react-redux",
    "@reduxjs/toolkit",
    "@reduxjs/toolkit/query/react",
    "expo-camera",
    "expo-media-library",
    "expo-location",
    "expo-notifications",
    "expo-contacts",
    "expo-calendar",
    "expo-tracking-transparency",
  ],
});
