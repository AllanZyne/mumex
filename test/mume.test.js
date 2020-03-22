const mume = require("../out/src/mume");

async function main() {
  await mume.init();

  const engine = new mume.MarkdownEngine({
    filePath: "./test.md",
    config: {
      previewTheme: "github-light.css",
      // revealjsTheme: "white.css"
      codeBlockTheme: "default.css",
      printBackground: true,
      enableScriptExecution: true, // <= for running code chunks
      mathRenderingOption: "MathJax",
    },
  });

  // open in browser
  // await engine.openInBrowser({ runAllCodeChunks: true });

  // // html export
  await engine.htmlExport({ offline: false, runAllCodeChunks: true });

  // // chrome (puppeteer) export
  // await engine.chromeExport({ fileType: "pdf", runAllCodeChunks: true }); // fileType = 'pdf'|'png'|'jpeg'

  // // prince export
  // await engine.princeExport({ runAllCodeChunks: true });

  // // ebook export
  // await engine.eBookExport({ fileType: "epub" }); // fileType = 'epub'|'pdf'|'mobi'|'html'

  // // pandoc export
  // await engine.pandocExport({ runAllCodeChunks: true });

  // // markdown(gfm) export
  // await engine.markdownExport({ runAllCodeChunks: true });

  return process.exit();
}

main();
