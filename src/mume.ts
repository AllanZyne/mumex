/**
 * The core of mumei package.
 */
import * as fs from "fs"
import * as path from "path"
import * as os from "os"
import * as less from "less"

import * as utility_ from "./utility"
import * as engine from "./markdown-engine"

let INITIALIZED = false
let CONFIG_CHANGE_CALLBACK:()=>void = null

export const utility = utility_
export const extensionConfig = utility.extensionConfig
export const MarkdownEngine = engine.MarkdownEngine

/**
 * init mume config folder at ~/.mume
 */
export async function init():Promise<void> {
  if (INITIALIZED) return 

  const homeDir = os.homedir()
  const extensionConfigDirectoryPath = path.resolve(homeDir, './.mume')
  if (!fs.existsSync(extensionConfigDirectoryPath)) {
    fs.mkdirSync(extensionConfigDirectoryPath)
  }

  extensionConfig.globalStyle = await utility.getGlobalStyles()
  extensionConfig.mermaidConfig = await utility.getMermaidConfig()
  extensionConfig.mathjaxConfig = await utility.getMathJaxConfig()
  extensionConfig.phantomjsConfig = await utility.getPhantomjsConfig()
  extensionConfig.parserConfig = await utility.getParserConfig()
  extensionConfig.config = await utility.getExtensionConfig()

  fs.watch(extensionConfigDirectoryPath, (eventType, fileName)=> {
    if (eventType === 'change' && CONFIG_CHANGE_CALLBACK) {
      if (fileName === 'style.less') { // || fileName==='mermaid_config.js' || fileName==='mathjax_config')
        utility.getGlobalStyles()
        .then((css)=> {
          extensionConfig.globalStyle = css
          CONFIG_CHANGE_CALLBACK()
        })
      } else if (fileName === 'mermaid_config.js') {
        utility.getMermaidConfig()
        .then((mermaidConfig)=> {
          extensionConfig.mermaidConfig = mermaidConfig
          CONFIG_CHANGE_CALLBACK()
        })
      } else if (fileName === 'mathjax_config.js') {
        utility.getMathJaxConfig()
        .then((mathjaxConfig)=> {
          extensionConfig.mathjaxConfig = mathjaxConfig
          CONFIG_CHANGE_CALLBACK()
        })
      } else if (fileName === 'parser.js') {
        utility.getParserConfig()
        .then((parserConfig)=> {
          extensionConfig.parserConfig = parserConfig
          CONFIG_CHANGE_CALLBACK()
        })
      }
    }
  })

  INITIALIZED = true 
  return 
}


/**
 * cb will be called when global style.less like files is changed.
 * @param cb function(error, css){}
 */

export function onDidChangeConfigFile(cb:()=>void) {
  CONFIG_CHANGE_CALLBACK = cb
}
