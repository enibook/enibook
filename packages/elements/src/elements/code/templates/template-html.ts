export type OptionsTemplate = {
  head?: string;
  header?: string;
  footer?: string;
  lang?: string;
  theme?: string;
  title?: string;
}

export const defaultOptions: OptionsTemplate = {
  head: '',
  header: '',
  footer: '',
  lang: navigator.language,
  theme: 'dark',
  title: 'IFrame'
}

export function templateHTML(main:string, options: OptionsTemplate={}) {
  let {head, header, footer, lang, theme, title} = Object.assign(defaultOptions, options)
  theme = theme === 'dark' ? 'sl-theme-dark dark' : 'sl-theme-light light'
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
`
  }

