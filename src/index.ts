/**
 * ###########################
 * #####    IMPORTANT    #####
 * ###########################
 *
 * In the final package, you must include the following files and dirs:
 * - dist/
 * - package.json
 * - node_modules/
 *
 * See scripts/build and tsup-config for more information.
 */

import { initElectronApp } from "./main";

initElectronApp()
  .then(() => {
    console.log("[electron]", "electron app ok");
  })
  .catch((err) => {
    console.error("[electron]", "init err:", err);
  });
