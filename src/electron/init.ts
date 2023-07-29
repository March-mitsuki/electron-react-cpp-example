import path from "path";
import { BrowserWindow, app } from "electron";

async function initDotenv(filename: string) {
  const dotenv = await import("dotenv");
  const filePath = path.resolve(process.cwd(), filename);
  const dotenvResult = dotenv.config({
    path: filePath,
  });
  if (dotenvResult.error) {
    throw dotenvResult.error;
  } else {
    console.log("\x1b[32m" + "dotenv init successfully" + "\x1b[0m");
    console.log("[dotenv]", `loaded from: ${filePath}:`, dotenvResult.parsed);
  }
}

export const initElectronApp = async () => {
  try {
    await initDotenv(".env.local");

    await app.whenReady();

    // powerSaveBlocker.start("prevent-display-sleep");
    const mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      frame: true,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false,
      },
    });
    await mainWindow.loadFile("dist/index.html");

    mainWindow.webContents.openDevTools();
  } catch (err) {
    console.log("[init-electron-app-err]", err);
    throw new Error("init electron app error");
  }

  return;
};
