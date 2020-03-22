/**
 * The core of mume package.
 */
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as utility_ from "./utility";

let INITIALIZED = false;
let CONFIG_CHANGE_CALLBACK: () => void = null;

export const utility = utility_;
export const configs = utility.configs;
export { MarkdownEngineConfig } from "./markdown-engine-config";
export { MarkdownEngine } from "./markdown-engine";
export { CodeChunkData } from "./code-chunk-data";

/**
 * init mume config folder at ~/.mume
 */
export async function init(): Promise<void> {
  if (INITIALIZED) {
    return;
  }

  const homeDir = os.homedir();
  const extensionConfigDirectoryPath = path.resolve(homeDir, "./.mume");
  if (!fs.existsSync(extensionConfigDirectoryPath)) {
    fs.mkdirSync(extensionConfigDirectoryPath);
  }

  configs.previewConfig = await utility.getPreviewConfig();
  configs.config = await utility.getExtensionConfig();

  fs.watch(extensionConfigDirectoryPath, (eventType, fileName) => {
    if (eventType === "change") {
      console.log("fs.watch", fileName);

      if (fileName === "style.less") {
        utility.getGlobalStyles().then((css) => {
          configs.globalStyle = css;
          if (CONFIG_CHANGE_CALLBACK) {
            CONFIG_CHANGE_CALLBACK();
          }
        });
      } else if (fileName === "config.json") {
        utility.getExtensionConfig().then((config) => {
          configs.config = config;
          if (CONFIG_CHANGE_CALLBACK) {
            CONFIG_CHANGE_CALLBACK();
          }
        });
      } else if (fileName === "preview.js") {
        utility.getPreviewConfig().then((previewConfig) => {
          configs.previewConfig = previewConfig;
          if (CONFIG_CHANGE_CALLBACK) {
            CONFIG_CHANGE_CALLBACK();
          }
        });
      }
    }
  });

  INITIALIZED = true;
  return;
}

/**
 * cb will be called when global style.less like files is changed.
 * @param cb function(error, css){}
 */

export function onDidChangeConfigFile(cb: () => void) {
  CONFIG_CHANGE_CALLBACK = cb;
}
