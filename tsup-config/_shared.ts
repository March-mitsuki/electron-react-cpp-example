import { Options } from "tsup";
import path from "path";
// import { execSync } from "child_process";

export const esbuildOptions: Options["esbuildOptions"] = (options) => {
  options.external = ["electron"];
};
export const esbuildPlugins: Options["esbuildPlugins"] = [
  {
    name: "shim-addon",
    setup(build) {
      build.onResolve({ filter: /^~\/addon$/ }, () => {
        return {
          path: path.resolve(process.cwd(), "dist/addon/addon.node"),
          external: true,
        };
      });
    },
  },
];
