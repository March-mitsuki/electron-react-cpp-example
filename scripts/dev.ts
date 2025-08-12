import { execSync, spawn } from "child_process";
import { rmSync } from "fs";

async function main() {
  rmSync("dist", { recursive: true, force: true });

  let rendererOK = false;
  let mainOK = false;
  let preloadOK = false;

  const listenForBuildSuccess = (data: Buffer, name: string) => {
    const dataStr = data.toString();
    console.log(dataStr);
    if (
      typeof dataStr === "string" &&
      dataStr.includes(name) &&
      dataStr.includes("Build success")
    ) {
      if (name === "RENDERER") {
        rendererOK = true;
      } else if (name === "MAIN") {
        mainOK = true;
      } else if (name === "PRELOAD") {
        preloadOK = true;
      }
    }
  };

  // Only watch the renderer build
  const rendererBuild = spawn(
    "pnpm",
    ["tsup", "--config", "tsup-config/renderer.ts", "--watch", "src/**/*"],
    {
      stdio: "pipe",
      shell: true,
    }
  );
  const mainBuild = spawn("pnpm", ["tsup", "--config", "tsup-config/main.ts"], {
    stdio: "pipe",
    shell: true,
  });
  const preloadBuild = spawn(
    "pnpm",
    ["tsup", "--config", "tsup-config/preload.ts"],
    {
      stdio: "pipe",
      shell: true,
    }
  );

  rendererBuild.stdout?.on("data", (data) =>
    listenForBuildSuccess(data, "RENDERER")
  );
  mainBuild.stdout?.on("data", (data) => listenForBuildSuccess(data, "MAIN"));
  preloadBuild.stdout?.on("data", (data) =>
    listenForBuildSuccess(data, "PRELOAD")
  );

  const waitForBuilds = () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (rendererOK && mainOK && preloadOK) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };
  const startDev = async () => {
    console.log("Waiting for builds to complete...");
    await waitForBuilds();
    execSync("pnpm tsx scripts/cp-static.ts");
    spawn("pnpm", ["electron", "."], {
      stdio: "inherit",
      shell: true,
    });
  };

  const tasks = [rendererBuild, mainBuild, preloadBuild, startDev()];
  await Promise.all(tasks);
}

main();
