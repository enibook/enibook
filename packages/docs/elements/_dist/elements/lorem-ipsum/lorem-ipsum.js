var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
// enibook
import { BaseIt } from "../base/base";
import { dictionary } from "./dictionary";
import styles from "./lorem-ipsum.css?inline";
let LoremIpsumIt = class LoremIpsumIt extends BaseIt {
    constructor() {
        super(...arguments);
        /** Nombre d'objets textuels (mots, paragraphes, phrases, items de liste) générés. */
        this.count = 1;
        /** Type des objets textuels (mots, paragraphes, phrases, items de liste) générés. */
        this.type = "paragraph";
    }
    createTerm() {
        const nTerms = this.randomLength(1, 3);
        const termArray = [];
        for (let i = 0; i < nTerms; i++) {
            termArray.push(this.createText("word"));
        }
        return termArray.join(" ");
    }
    /** Texte aléatoire généré selon son type. */
    createText(type = "paragraph") {
        let text;
        let n;
        const sentences = [];
        const array = [];
        const words = [];
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
        return html `
      <div part="base" class="lorem-ipsum prose">
        ${this.renderTemplate()}
      </div>
    `;
    }
    renderTemplate() {
        let template = html ``;
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
        for (let i = 0; i < nbListItems; i++) {
            items.push(this.createText("olist"));
        }
        let template = html `${items.map((item) => html `<li>${item}</li>`)}`;
        const dlTemplate = html `${items.map((item) => html `<dt>${this.createTerm()}</dt>
          <dd>${item}</dd>`)}`;
        switch (tag) {
            case "ol":
                template = html `<ol part="olist">
          ${template}
        </ol>`;
                break;
            case "dl":
                template = html `<dl part="dlist">${dlTemplate}</dl>`;
                break;
            case "ul":
            default:
                template = html `<ul part="ulist">
          ${template}
        </ul>`;
        }
        return template;
    }
    renderParagraph(nbParagraphs = 1) {
        const paragraphs = [];
        for (let i = 0; i < nbParagraphs; i++) {
            paragraphs.push(this.createText("paragraph"));
        }
        return html `${paragraphs.map((paragraph) => html `<p part="paragraph">${paragraph}</p>`)}`;
    }
    renderSentence(nbSentences = 1) {
        const sentences = [];
        for (let i = 0; i < nbSentences; i++) {
            sentences.push(this.createText("sentence"));
        }
        return html `<p part="sentence">
      ${sentences.map((sentence) => html `${sentence}<br />`)}
    </p>`;
    }
    renderWord(nbWords = 1) {
        const words = [];
        for (let i = 0; i < nbWords; i++) {
            words.push(this.createText("word"));
        }
        return html `<p part="word">${words.map((word) => html `${word} `)}</p>`;
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
LoremIpsumIt.styles = [
    (void 0).styles,
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    property({ type: Number, reflect: true })
], LoremIpsumIt.prototype, "count", void 0);
__decorate([
    property({ type: String, reflect: true })
], LoremIpsumIt.prototype, "type", void 0);
LoremIpsumIt = __decorate([
    customElement('lorem-ipsum-it')
], LoremIpsumIt);
export { LoremIpsumIt };
/*
if (customElements && !customElements.get('lorem-ipsum-it')) {
  customElements.define('lorem-ipsum-it', LoremIpsumIt)
}
*/
