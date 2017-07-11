# MUME
This library powers:

* [markdown preview enhanced for vscode](https://github.com/shd101wyy/vscode-markdown-preview-enhanced)

This documentation will be released sooooon...

```sh
npm install --save @shd101wyy/mume
```


## Example

```javascript 
// node.js 
const mume = require('@shd101wyy/mume')

// es6
// import * as mume from "@shd101wyy/mume"

async function main() {
  await mume.init()

  const engine = new mume.MarkdownEngine({
    filePath: "/Users/wangyiyi/Desktop/markdown-example/test3.md",
    config: {
      previewTheme: "github-light.css",
      codeBlockTheme: "default.css" 
    }
  })

  // open in browser
  await engine.openInBrowser({runAllCodeChunks: true})

  // html export
  await engine.htmlExport({offline: false, runAllCodeChunks: true})

  // phantomjs export 
  await engine.phantomjsExport({fileType: 'pdf', runAllCodeChunks: true}) // fileType = 'pdf'|'png'|'jpeg'

  // prince export
  await engine.princeExport({runAllCodeChunks: true})

  // ebook export 
  await engine.eBookExport({fileType: 'epub'}) // fileType=`epub`|`pdf`|`mobi`|`html`
  
  // pandoc export 
  await engine.pandocExport({runAllCodeChunks: true})

  // markdown(gfm) export 
  await engine.markdownExport({runAllCodeChunks: true})

  return process.exit()
}

main()
```

## Markdown Engine Configuration

```js
const config = {
  // Enable this option will render markdown by pandoc instead of remarkable.
  usePandocParser: false,

  // In Markdown, a single newline character doesn't cause a line break in the generated HTML. In GitHub Flavored Markdown, that is not true. Enable this config option to insert line breaks in rendered HTML for single newlines in Markdown source.
  breakOnSingleNewLine: true,

  // Enable smartypants and other sweet transforms.
  enableTypographer: false,

  // Math
  mathRenderingOption: "KaTeX",  // "KaTeX" | "MathJax" | "None"
  mathInlineDelimiters: [["$", "$"], ["\\(", "\\)"]],
  mathBlockDelimiters: [["$$", "$$"], ["\\[", "\\]"]],

  // Enable Wiki Link syntax support. More information can be found a  https://help.github.com/articles/adding-links-to-wikis/ 
  enableWikiLinkSyntax: true,
  // By default, the extension for wikilink is `.md`. For example: [[test]] will direct to file path `test.md`.
  wikiLinkFileExtension: '.md'

  // Front matter rendering option
  frontMatterRenderingOption: 'table', // 'table' | 'code block' | 'none'

  // Mermaid theme 
  mermaidTheme: 'mermaid.css', // 'mermaid.css' | 'mermaid.dark.css' | 'mermaid.forest.css'

  // Code Block theme
  codeBlockTheme: 'default.css', 
  //  "default.css",
  //  "atom-dark.css",
  //  "coy.css",
  //  "dark.css",
  //  "funky.css",
  //  "github.css",
  //  "monokai.css",
  //  "okaidia.css",
  //  "solarized-light.css",
  //  "twilight.css" 

  // Preview theme
  previewTheme: 'github-light.css',
  // "github-light.css",
  // "github-dark.css",
  // "gothic.css",
  // "newsprint.css",
  // "night.css",
  // "medium.css"
  // "none.css"

  // Accepted protocols followed by `://` for links.
  protocolsWhiteList: "http, https, atom, file",

  // When using Image Helper to copy images, by default images will be copied to root image folder path '/assets'
  imageFolderPath: '/assets',

  // Whether to print background for PDF file export or not. If set to `false`, then `github-light` preview theme will b  used.
  printBackground: false,

  // PhantomJS executable path
  phantomjs: 'phantomjs',

  // Pandoc executable path
  pandocPath: 'pandoc',

  // Pandoc markdown flavor
  pandocMarkdownFlavor: "markdown-raw_tex+tex_math_single_backslash",

  // Pandoc arguments e.g. ['--smart', '--filter=/bin/exe']. Please use long argument names.
  pandocArguments: []
}

// Init Engine
const engine = new mume.MarkdownEngine({
  filePath: '...',
  projectDirectoryPath: '...',
  config: config
})
```


## Global Configuration
Global config files are located at `~/.mume` directory

## Development
[Visual Studio Code](https://code.visualstudio.com/) is recommended.    
Clone this project, open in vscode, then `cmd+shift+b` to build.  