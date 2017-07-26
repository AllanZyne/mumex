import * as path from "path"
import * as fs from "fs"
import * as utility from "./utility"

let vega = null

async function renderVega(spec:string, baseURL):Promise<string> {
  const svgHeader = 
  '<?xml version="1.0" encoding="utf-8"?>\n' +
  '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
  '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';

  if (baseURL && baseURL[baseURL.length - 1] !== '/') {
    baseURL += '/'
  }

  var view = new vega.View(vega.parse(JSON.parse(spec)), {
      loader: vega.loader({baseURL}),
      logLevel: vega.Warn,
      renderer: 'none'
    })
    .initialize()
  
  return svgHeader + await view.toSVG()
}

/**
 * Modifed from the `vg2svg` file.  
 * @param spec The vega code.  
 */
export async function toSVG(spec:string, baseURL:string=null):Promise<string> {
  if (!vega) {
    vega = require(path.resolve(utility.extensionDirectoryPath, './dependencies/vega/vega.min.js'))
  }

  return renderVega(spec, baseURL)
}