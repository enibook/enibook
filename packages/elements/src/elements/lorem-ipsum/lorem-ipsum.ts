// lit
import { type CSSResultGroup, type TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
// enibook
import { BaseIt } from "../base/base.js";
import { dictionary } from "./dictionary.js";
import styles from "./lorem-ipsum.css.js";

@customElement('lorem-ipsum-it')
export class LoremIpsumIt extends BaseIt {
  static override styles: CSSResultGroup = [
    super.styles,
    styles
  ];

  /** Nombre d'objets textuels (mots, paragraphes, phrases, items de liste) générés. */
  @property({ type: Number, reflect: true }) count = 1;

  /** Type des objets textuels (mots, paragraphes, phrases, items de liste) générés. */
  @property({ type: String, reflect: true }) type:
    | "dlist"
    | "olist"
    | "paragraph"
    | "sentence"
    | "ulist"
    | "word" = "paragraph";

  protected createTerm(): string {
    const nTerms = this.randomLength(1, 3);
    const termArray: string[] = [];
    for (let i = 0; i < nTerms; i++) {
      termArray.push(this.createText("word"));
    }
    return termArray.join(" ");
  }

  /** Texte aléatoire généré selon son type. */
  createText(
    type:
      | "dlist"
      | "olist"
      | "paragraph"
      | "sentence"
      | "ulist"
      | "word" = "paragraph"
  ): string {
    let text: string;
    let n: number;
    const sentences: string[] = [];
    const array: string[] = [];
    const words: string[] = [];
    switch (type) {
      case "dlist":
      case "olist":
      case "ulist":
        n = this.randomLength(1, 3);
        for (let i = 0; i < n; i++) {
          array.push(this.createText("sentence"));
        }
        text = array.join(" ");
        break;
      case "paragraph":
        n = this.randomLength(2, 10); // au moins deux phrases dans un paragraphe
        for (let i = 0; i < n; i++) {
          sentences.push(this.createText("sentence"));
        }
        text = sentences.join(" ");
        break;
      case "sentence":
        n = this.randomLength(5, 30);
        for (let i = 0; i < n; i++) {
          words.push(this.createText("word"));
        }
        words[0] =
          words[0].substring(0, 1).toUpperCase() + words[0].substring(1);
        text = `${words.join(" ")}.`.replace(/(\.,|,\.)/g, ".");
        break;
      case "word":
        text =
          this.dictionary[this.randomLength(0, this.dictionary.length - 1)];
        break;
    }
    return text;
  }

  /**
   * Dictionnaire de mots.
   */
  protected get dictionary(): string[] {
    return dictionary;
  }

  /**
   * Le nom courant de l'élément : `Lorem Ipsum`.
   */
  get tagTitle(): string {
    return "Lorem Ipsum";
  }

  protected randomLength(min: number, max: number): number {
    if (min < 0 || max < min) {
      return this.randomLength(1, 10);
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  protected override render(): TemplateResult {
    if (this.count < 1) {
      this.count = 1;
    }
    return html`
      <div part="base" class="lorem-ipsum prose">
        ${this.renderTemplate()}
      </div>
    `;
  }

  protected renderTemplate(): TemplateResult {
    let template: TemplateResult = html``;
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

  protected renderList(tag = "ul", nbListItems = 1): TemplateResult {
    const items: string[] = [];
    for (let i = 0; i < nbListItems; i++) {
      items.push(this.createText("olist"));
    }
    let template: TemplateResult = html`${items.map(
      (item) => html`<li>${item}</li>`
    )}`;
    const dlTemplate: TemplateResult = html`${items.map(
      (item) =>
        html`<dt>${this.createTerm()}</dt>
          <dd>${item}</dd>`
    )}`;
    switch (tag) {
      case "ol":
        template = html`<ol part="olist">
          ${template}
        </ol>`;
        break;
      case "dl":
        template = html`<dl part="dlist">${dlTemplate}</dl>`;
        break;
      case "ul":
      default:
        template = html`<ul part="ulist">
          ${template}
        </ul>`;
    }
    return template;
  }

  protected renderParagraph(nbParagraphs = 1): TemplateResult {
    const paragraphs: string[] = [];
    for (let i = 0; i < nbParagraphs; i++) {
      paragraphs.push(this.createText("paragraph"));
    }
    return html`${paragraphs.map(
      (paragraph) => html`<p part="paragraph">${paragraph}</p>`
    )}`;
  }

  protected renderSentence(nbSentences = 1): TemplateResult {
    const sentences: string[] = [];
    for (let i = 0; i < nbSentences; i++) {
      sentences.push(this.createText("sentence"));
    }
    return html`<p part="sentence">
      ${sentences.map((sentence) => html`${sentence}<br />`)}
    </p>`;
  }

  protected renderWord(nbWords = 1): TemplateResult {
    const words: string[] = [];
    for (let i = 0; i < nbWords; i++) {
      words.push(this.createText("word"));
    }
    return html`<p part="word">${words.map((word) => html`${word} `)}</p>`;
  }

  /**
   * Syntaxe `asciidoc` équivalente `name::target[attributes]`
   *
   * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _block_</a>
   * @examples `lorem-ipsum::paragraph[]` , `lorem-ipsum::olist[count=2]`
   */
  toAsciidoc(): string {
    const asciidoc = `
      lorem-ipsum::${this.type}[count=${this.count}]
    `;
    return asciidoc.replace(/^ +| +$/gm, "");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lorem-ipsum-it": LoremIpsumIt;
  }
}

/*
if (customElements && !customElements.get('lorem-ipsum-it')) {
  customElements.define('lorem-ipsum-it', LoremIpsumIt)
}
*/
