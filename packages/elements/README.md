# Eléments EniBook

EniBook propose une bibliothèque de composants web à vocation pédagogique sous la forme d'éléments HTML personnalisés ([_custom element_](https://developer.mozilla.org/fr/docs/Web/Web_Components/Using_custom_elements)).

- Les développements sont effectués en [`typescript`](https://www.typescriptlang.org) et compilés avec [esbuild](https://esbuild.github.io) par le gestionnaire de modules [`pnpm`](https://pnpm.io) (un gestionnaire de paquets open-source et multiplateforme pour l'environnement d'exécution JavaScript [Node.js](https://nodejs.org/en)).

- Les codes source sont déposés sur [Github](https://github.com/enibook/enibook) sous [licence open source MIT](https://choosealicense.com/licenses/). La documentation du code source, mise en forme par [typedoc](https://typedoc.org), est également consultable sur [Github](https://enibook.github.io/enibook/packages/docs/api/index.html).

- Les composants sont construits à partir de la bibliothèque [Lit](https://lit.dev).

- Les métadonnées des composants sont générées par le [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org). Le manifeste des éléments personnalisés est un format de fichier texte qui décrit les éléments personnalisés d'un projet. Ce format permet aux outils et aux IDE (_Integrated Development Environment_ : environnement de développement « intégré ») de fournir des informations détaillées sur les éléments personnalisés de ce projet.

- Les interfaces utilisateurs sont développées avec la bibliothèque [Shoelace](https://shoelace.style) elle-même composée de composants web d'interface (boutons, menus...) construits avec [Lit](https://lit.dev).

- Les icônes sont issues du projet open source [iconify.design](https://iconify.design) au format [`svg`](https://developer.mozilla.org/fr/docs/Web/SVG) (_Scalable Vector Graphics_).

- Les services CDN (_Content Delivery Network_ : réseau de diffusion de contenu) sont fournis par [jsDelivr](https://www.jsdelivr.com).

- La [documentation générale](https://enibook.github.io/enibook/) est écrite en [`asciidoc`](https://asciidoc.org) et transcodée en `html` monopage avec [Asciidoctor](https://docs.asciidoctor.org) et en `html` multipage avec [asciidoctor-chunker](https://github.com/wshito/asciidoctor-chunker).

## Configuration
<details>
  <summary>Fichier <code>package.json</code></summary>

Le fichier `package.json` décrit toutes les spécificités, et en particulier toutes les dépendances, du projet EniBook.

[`package.json`](https://github.com/enibook/enibook/blob/main/packages/elements/package.json)

</details>

<details>
  <summary>Fichier <code>tsconfig.json</code></summary>

Le fichier `tsconfig.json` spécifie la configuration retenue pour `typescript` afin de compiler les différents codes sources.

[`tsconfig.json`](https://github.com/enibook/enibook/blob/main/packages/elements/tsconfig.json)

[`tsconfig.prod.json`](https://github.com/enibook/enibook/blob/main/packages/elements/tsconfig.prod.json)

</details>

<details>
  <summary>Fichier <code>typedoc.json</code></summary>

Le fichier `typedoc.json` spécifie la configuration retenue pour `typedoc` afin de générer la documentation du code source.

[`typedoc.json`](https://github.com/enibook/enibook/blob/main/packages/elements/typedoc.json)

</details>

## Génération
<details>
  <summary>Fichier <code>build.js</code></summary>

Le fichier `build.js` permet de compiler les sources, de générer l'API et la documentation.

[`build.js`](https://github.com/enibook/enibook/blob/main/packages/elements/scripts/build.js)

</details>
