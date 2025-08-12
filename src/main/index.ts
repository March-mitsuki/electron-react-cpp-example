import path from "path";
import { BrowserWindow, app } from "electron";
import { watcher } from "./watch";

const MAIN_WINDOW_HTML = "dist/renderer/main.html";
const PRELOAD_SCRIPT = path.resolve(process.cwd(), "dist/preload/index.js");

export const initElectronApp = async () => {
  try {
    await app.whenReady();

    const mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      frame: true,
      resizable: true,
      webPreferences: {
        /**
         * Enable Node.js integration in the renderer process
         * This allows the renderer process to access Node.js APIs
         */
        nodeIntegration: true,
        /**
         * Enable Node.js integration in web workers
         * This allows web workers to access Node.js APIs
         */
        nodeIntegrationInWorker: true,
        /**
         * Disable Node.js integration in iframes
         * Allows iframes to access Node.js APIs is very DANGEROUS more than the renderer process and web workers
         * If you need to enable it, make sure that only load trusted content
         */
        nodeIntegrationInSubFrames: false,
        /**
         * Disable sandboxing
         * This is require to disabled when using Node.js integration
         */
        sandbox: false,
        /**
         * Disable context isolation
         * This makes renderer can call electron/renderer APIs via `window.require("electron")`
         *
         * Remember that even if you disable contextIsolation,
         * some APIs that are only available in electron/main
         * still cannot be used directly in the renderer process.
         * For example, desktopCapture (Electron 37.2.6).
         */
        contextIsolation: false,
        /**
         * Preload script to expose APIs to the renderer process
         * Just a placeholder here, you can remove it if you don't need it
         * or enable context isolation to get MORE security and LESS flexibility
         *
         * Notice that contextBridge API only works when context isolation is enabled
         * When context isolation is disabled, the preload script is NOT necessary
         * You can access electron/renderer APIs via `window.require("electron")` without using contextBridge
         */
        preload: PRELOAD_SCRIPT,
      },
    });
    await mainWindow.loadFile(MAIN_WINDOW_HTML);

    // Only watch renderer changes
    watcher.on("change", () => {
      mainWindow.loadFile(MAIN_WINDOW_HTML);
    });

    mainWindow.webContents.openDevTools();
  } catch (err) {
    console.log("[init-electron-app-err]", err);
    throw new Error("init electron app error");
  }

  return;
};
