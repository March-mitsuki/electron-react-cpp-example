import { execSync, spawn } from "child_process";
import { rmSync } from "fs";

async function main() {
  rmSync("dist", { recursive: true, force: true });

  const tasks = [
    spawn("pnpm", ["tsup", "--config", "tsup-config/renderer.ts"], {
      stdio: "inherit",
      shell: true,
    }),
    spawn("pnpm", ["tsup", "--config", "tsup-config/main.ts"], {
      stdio: "inherit",
      shell: true,
    }),
    spawn("pnpm", ["tsup", "--config", "tsup-config/preload.ts"], {
      stdio: "inherit",
      shell: true,
    }),
  ];
  await Promise.all(tasks);
  execSync("pnpm tsx scripts/cp-static.ts");
}

main();
