import { defineConfig } from "tsup";
import { esbuildOptions, esbuildPlugins } from "./_shared";

export default defineConfig({
  name: "main",
  entry: ["src/index.ts"],
  target: "node22",
  format: ["esm"],
  outDir: "dist",
  sourcemap: true,
  clean: false,
  esbuildOptions,
  esbuildPlugins,
});
