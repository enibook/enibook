var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
// codemirror
import { html as cmHtml } from "@codemirror/lang-html";
// enibook
import { CodeIt } from "../code/code";
import styles from './html.css?inline';
let HtmlIt = class HtmlIt extends CodeIt {
    constructor() {
        super();
        this._language = 'html';
    }
    getCmLang() {
        return cmHtml();
    }
    getHelpUrl() {
        return `https://devdocs.io/html/`;
    }
};
HtmlIt.styles = [
    unsafeCSS((void 0).styles),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
HtmlIt = __decorate([
    customElement('html-it')
], HtmlIt);
export { HtmlIt };
if (customElements && !customElements.get('html-it')) {
    customElements.define('html-it', HtmlIt);
}
