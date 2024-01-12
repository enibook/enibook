# Eléments EniBook

Bibliothèque de composants web à vocation pédagogique sous la forme d'éléments HTML personnalisés ([_custom element_](https://developer.mozilla.org/fr/docs/Web/Web_Components/Using_custom_elements)).


* Les développements sont effectués en [`typescript`](https://www.typescriptlang.org) et compilés avec [Vite](https://vitejs.dev). La documentation du code source est mise en forme par [typedoc](https://typedoc.org).
* Les codes source sont déposés sur [Github](https://github.com) dans le répertoire [`https://github.com/enibook/enibook`](https://github.com/enibook/enibook) sous licence open source [MIT](https://choosealicense.com/licenses/mit/).
* Les composants sont construits avec [Lit](https://lit.dev).
* Les métadonnées des composants sont générées par le [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org).
* Les interfaces utilisateurs sont développées avec [Shoelace](https://shoelace.style).
* Les icônes sont issues de [iconify.design](https://iconify.design) et gérées avec [UnoCSS](https://unocss.dev).

* Les services CDN (_Content Delivery Network_ : réseau de diffusion de contenu) sont fournis par [jsDelivr](https://www.jsdelivr.com).
* La [documentation](https://enibook.github.io/enibook/) est écrite en [`asciidoc`](https://asciidoc.org) et transcodée en `html` avec [Asciidoctor](https://docs.asciidoctor.org).


<details>
  <summary>Fichier <code>package.json</code></summary>

  ```json
  {
  "name": "elements",
  "version": "1.0.0",
  "type": "module",
  "types": "dist/enibook.d.ts",
  "jsdelivr": "./cdn/enibook-autoloader.js",
  "exports": {
    ".": {
      "types": "./dist/enibook.d.ts",
      "import": "./dist/enibook.js"
    },
    "./dist/custom-elements.json": "./dist/custom-elements.json",
    "./dist/enibook.js": "./dist/enibook.js",
    "./dist/enibook-autoloader.js": "./dist/enibook-autoloader.js",
    "./dist/elements/*": "./dist/elements/*",
    "./dist/utilities/*": "./dist/utilities/*"
  },
  "files": [
    "dist",
    "cdn"
  ],
  "description": "Bibliothèque de composants web à vocation pédagogique sous la forme d’éléments HTML personnalisés.",
  "keywords": [
    "web components",
    "custom elements",
    "components"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/enibook/enibook.git"
  },
  "scripts": {
    "api": "typedoc --options typedoc.json",
    "build": "npx tsc && vite build",
    "dev": "vite",
    "doc:adoc": "asciidoctor ./docs/elements/elements.adoc && unocss ./docs/elements/elements.html && asciidoctor-chunker docs/elements/elements.html --titlePage 'Eléments EniBook' -o docs/elements",
    "doc:gen": "asciidoctor ./docs/index.adoc && unocss -c uno.config-doc.ts ./docs/index.html",
    "docs": "pnpm run doc:api && pnpm run doc:adoc && pnpm run doc:gen",
    "preview": "vite -c vite.config.adoc.ts preview",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jacques Tisseau",
  "license": "MIT",
  "devDependencies": {
    "@custom-elements-manifest/analyzer": "^0.9.0",
    "@iconify-json/mdi": "^1.1.64",
    "@unocss/cli": "^0.58.3",
    "@unocss/preset-attributify": "^0.58.3",
    "@unocss/preset-icons": "^0.58.3",
    "@unocss/preset-tagify": "^0.58.3",
    "@unocss/preset-typography": "^0.58.3",
    "@unocss/preset-uno": "^0.58.3",
    "asciidoctor": "^3.0.2",
    "cem-plugin-jsdoc-example": "^0.0.9",
    "glob": "^10.3.10",
    "typedoc": "^0.25.7",
    "typedoc-plugin-coverage": "^2.2.0",
    "typedoc-plugin-keywords": "^1.6.0",
    "typedoc-plugin-markdown": "^3.17.1",
    "typedoc-plugin-mdn-links": "^3.1.11",
    "typedoc-plugin-merge-modules": "^5.1.0",
    "typedoc-plugin-missing-exports": "^2.1.0",
    "typedoc-theme-category-nav": "^0.0.2",
    "typedoc-theme-hierarchy": "^4.1.2",
    "typescript": "^5.3.3",
    "unocss": "^0.58.3",
    "vite": "^5.0.11",
    "vite-plugin-cem": "^0.6.0",
    "vite-plugin-cp": "^4.0.7"
  },
  "dependencies": {
    "@shoelace-style/shoelace": "^2.12.0",
    "highlight.js": "^11.9.0",
    "lit": "^3.1.1"
  },
  "customElements": "dist/custom-elements.json"
}
  ```

</details>