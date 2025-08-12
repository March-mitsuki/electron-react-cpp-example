import fs from "fs";

function main() {
  // Copy the HTML file to the dist dir
  // If you use multiple HTML files, you need to copy them all
  fs.cpSync("src/renderer/main.html", "dist/renderer/main.html");

  // Copy addon build to dist dir. (must match the path in shim-addon plugin)
  // This make sure that no need to keep the build/ directory in the final package
  fs.cpSync("build/Release", "dist/addon", { recursive: true });

  // Copy assets dir
  fs.cpSync("assets", "dist/assets", { recursive: true });
}

main();
