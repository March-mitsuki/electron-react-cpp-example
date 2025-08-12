import { defineConfig } from "tsup";
import { esbuildOptions, esbuildPlugins } from "./_shared";

export default defineConfig({
  name: "preload",
  entry: ["src/preload/index.ts"],
  target: ["node22"],
  format: ["esm"],
  outDir: "dist/preload",
  sourcemap: true,
  clean: false,
  esbuildOptions,
  esbuildPlugins,
});
