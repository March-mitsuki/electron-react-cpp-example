import { initElectronApp } from "./electron/init";

initElectronApp()
  .then(() => {
    console.log("\x1b[32m" + "electron app ok" + "\x1b[0m");
  })
  .catch((err) => {
    console.error("[electron]", "init err:", err);
  });
