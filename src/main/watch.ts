import chokidar from "chokidar";

// Only watch renderer changes
export const watcher = chokidar.watch("dist/renderer", {
  persistent: true,
});
