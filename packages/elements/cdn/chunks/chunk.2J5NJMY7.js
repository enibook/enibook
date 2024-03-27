// src/elements/frame/templates/template-html.ts
var defaultOptions = {
  head: "",
  style: "",
  header: "",
  codePrefix: "",
  codeBody: "",
  codeSuffix: "",
  main: "",
  footer: "",
  consoleOutput: "",
  lang: navigator.language,
  theme: "light",
  title: "EniBook IFrame"
};
function templateHTML(options = {}) {
  let { head, style, header, codePrefix, codeBody, codeSuffix, main, footer, consoleOutput, lang, theme, title } = Object.assign(defaultOptions, options);
  theme = theme === "dark" ? "sl-theme-dark dark" : "sl-theme-light light";
  return `<!DOCTYPE html>
<html lang="${lang}" class="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-uno.global.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-icons.global.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-attributify.global.js"><\/script>
  <script>
    window.__unocss = {
      presets: [
        () => window.__unocss_runtime.presets.presetUno(),
        () => window.__unocss_runtime.presets.presetIcons({
          extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle', 'width': '1em', 'height': '1em' },
          cdn: 'https://esm.sh/'
        }),
        () => window.__unocss_runtime.presets.presetAttributify(),
      ]
    }
  <\/script>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/core.global.js"><\/script>
  <!-- user head -->
  ${head}
  <style>
    .footer > hr {background-color:lightgray;border:none;height:2px;}
    .footer > p {color:lightgray;margin-top:0;margin-bottom:4px;}
    .output {font-family:monospace;}
    .consoleOutput {}
    .stack {display: flex;flex-direction: column;justify-content: flex-start;}
    .stack > * {margin-block: 0;} 
    .stack > * + * {margin-block-start:0.5rem;}
    .stack:only-child {block-size: 100%;}
    .stack > :nth-child(2) {margin-block-end: auto;}
  </style>
  <!-- user style -->
  ${style}
</head>
<body>
  <header id="header" class="header"></header>
  <main id="main" class="main">
    <!-- user header -->
    ${header}
    <!-- begin code -->
      <!-- user prefix -->
      ${codePrefix}
      <!-- user body -->
      ${codeBody}
      ${main}
      <!-- user suffix -->
      ${codeSuffix}
    <!-- end code -->
    <!-- user footer -->
    ${footer}
  </main>
  <footer id="footer" class="footer">
    <hr>
    <p>Console</p>
    <!-- user console -->
    ${consoleOutput}
  </footer>
</body>
</html>
`;
}

export {
  defaultOptions,
  templateHTML
};
