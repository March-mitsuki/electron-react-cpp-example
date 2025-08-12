import { defineConfig } from "tsup";
import { esbuildOptions, esbuildPlugins } from "./_shared";

export default defineConfig({
  name: "renderer",
  entry: ["src/renderer/main.tsx"],
  format: ["iife"],
  outDir: "dist/renderer",
  sourcemap: true,
  clean: false,
  esbuildOptions,
  esbuildPlugins,
});
