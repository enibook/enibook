// src/elements/frame/templates/template-html.ts
var defaultOptions = {
  head: "",
  header: "",
  main: "",
  footer: "",
  lang: navigator.language,
  theme: "light",
  title: "IFrame"
};
function templateHTML(options = {}) {
  let { head, header, main, footer, lang, theme, title } = Object.assign(defaultOptions, options);
  theme = theme === "dark" ? "sl-theme-dark dark" : "sl-theme-light light";
  return `<!DOCTYPE html>
<html lang="${lang}" class="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${head}
</head>
<body>
  ${header}
  <main id="main" class="main">
    ${main}
  </main>
  ${footer}
</body>
</html>
`;
}

export {
  defaultOptions,
  templateHTML
};
