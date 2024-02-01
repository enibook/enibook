import {
  dictionary
} from "./chunk.I47CHKS7.js";
import {
  BaseIt,
  n,
  t
} from "./chunk.BMGR56LW.js";
import {
  i,
  x
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/lorem-ipsum/lorem-ipsum.css.ts
var lorem_ipsum_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  p:last-child {
    margin-bottom: 0;
  }
  ol,
  ul,
  dl {
    margin: 0;
  }
  dt {
    font-weight: 600;
  }
`;

// src/elements/lorem-ipsum/lorem-ipsum.ts
var LoremIpsumIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.count = 1;
    this.type = "paragraph";
  }
  createTerm() {
    const nTerms = this.randomLength(1, 3);
    const termArray = [];
    for (let i2 = 0; i2 < nTerms; i2++) {
      termArray.push(this.createText("word"));
    }
    return termArray.join(" ");
  }
  /** Texte aléatoire généré selon son type. */
  createText(type = "paragraph") {
    let text;
    let n2;
    const sentences = [];
    const array = [];
    const words = [];
    switch (type) {
      case "dlist":
      case "olist":
      case "ulist":
        n2 = this.randomLength(1, 3);
        for (let i2 = 0; i2 < n2; i2++) {
          array.push(this.createText("sentence"));
        }
        text = array.join(" ");
        break;
      case "paragraph":
        n2 = this.randomLength(2, 10);
        for (let i2 = 0; i2 < n2; i2++) {
          sentences.push(this.createText("sentence"));
        }
        text = sentences.join(" ");
        break;
      case "sentence":
        n2 = this.randomLength(5, 30);
        for (let i2 = 0; i2 < n2; i2++) {
          words.push(this.createText("word"));
        }
        words[0] = words[0].substring(0, 1).toUpperCase() + words[0].substring(1);
        text = `${words.join(" ")}.`.replace(/(\.,|,\.)/g, ".");
        break;
      case "word":
        text = this.dictionary[this.randomLength(0, this.dictionary.length - 1)];
        break;
    }
    return text;
  }
  /**
   * Dictionnaire de mots.
   */
  get dictionary() {
    return dictionary;
  }
  /**
   * Le nom courant de l'élément : `Lorem Ipsum`.
   */
  get tagTitle() {
    return "Lorem Ipsum";
  }
  randomLength(min, max) {
    if (min < 0 || max < min) {
      return this.randomLength(1, 10);
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  render() {
    if (this.count < 1) {
      this.count = 1;
    }
    return x` <div part="base" class="lorem-ipsum prose">${this.renderTemplate()}</div> `;
  }
  renderTemplate() {
    let template = x``;
    switch (this.type) {
      case "dlist":
        template = this.renderList("dl", this.count);
        break;
      case "olist":
        template = this.renderList("ol", this.count);
        break;
      case "paragraph":
        template = this.renderParagraph(this.count);
        break;
      case "sentence":
        template = this.renderSentence(this.count);
        break;
      case "ulist":
        template = this.renderList("ul", this.count);
        break;
      case "word":
        template = this.renderWord(this.count);
        break;
    }
    return template;
  }
  renderList(tag = "ul", nbListItems = 1) {
    const items = [];
    for (let i2 = 0; i2 < nbListItems; i2++) {
      items.push(this.createText("olist"));
    }
    let template = x`${items.map((item) => x`<li>${item}</li>`)}`;
    const dlTemplate = x`${items.map(
      (item) => x`<dt>${this.createTerm()}</dt>
          <dd>${item}</dd>`
    )}`;
    switch (tag) {
      case "ol":
        template = x`<ol part="olist">
          ${template}
        </ol>`;
        break;
      case "dl":
        template = x`<dl part="dlist">${dlTemplate}</dl>`;
        break;
      case "ul":
      default:
        template = x`<ul part="ulist">
          ${template}
        </ul>`;
    }
    return template;
  }
  renderParagraph(nbParagraphs = 1) {
    const paragraphs = [];
    for (let i2 = 0; i2 < nbParagraphs; i2++) {
      paragraphs.push(this.createText("paragraph"));
    }
    return x`${paragraphs.map((paragraph) => x`<p part="paragraph">${paragraph}</p>`)}`;
  }
  renderSentence(nbSentences = 1) {
    const sentences = [];
    for (let i2 = 0; i2 < nbSentences; i2++) {
      sentences.push(this.createText("sentence"));
    }
    return x`<p part="sentence">${sentences.map((sentence) => x`${sentence}<br />`)}</p>`;
  }
  renderWord(nbWords = 1) {
    const words = [];
    for (let i2 = 0; i2 < nbWords; i2++) {
      words.push(this.createText("word"));
    }
    return x`<p part="word">${words.map((word) => x`${word} `)}</p>`;
  }
  /**
   * Syntaxe `asciidoc` équivalente `name::target[attributes]`
   *
   * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _block_</a>
   * @examples `lorem-ipsum::paragraph[]` , `lorem-ipsum::olist[count=2]`
   */
  toAsciidoc() {
    const asciidoc = `
      lorem-ipsum::${this.type}[count=${this.count}]
    `;
    return asciidoc.replace(/^ +| +$/gm, "");
  }
};
LoremIpsumIt.styles = [__superGet(LoremIpsumIt, LoremIpsumIt, "styles"), lorem_ipsum_css_default];
__decorateClass([
  n({ type: Number, reflect: true })
], LoremIpsumIt.prototype, "count", 2);
__decorateClass([
  n({ type: String, reflect: true })
], LoremIpsumIt.prototype, "type", 2);
LoremIpsumIt = __decorateClass([
  t("lorem-ipsum-it")
], LoremIpsumIt);

export {
  LoremIpsumIt
};
