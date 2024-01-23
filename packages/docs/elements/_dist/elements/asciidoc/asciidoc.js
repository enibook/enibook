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
import { asciidoc as cmAsciidoc } from "codemirror-asciidoc/lib/asciidoc.js";
import { StreamLanguage } from "@codemirror/language";
// enibook
import { CodeIt } from "../code/code";
import styles from './asciidoc.css?inline';
let AsciidocIt = class AsciidocIt extends CodeIt {
    constructor() {
        super();
        this._language = 'asciidoc';
    }
    getCmLang() {
        return StreamLanguage.define(cmAsciidoc);
    }
    getHelpUrl() {
        return `https://docs.asciidoctor.org/asciidoc/latest/`;
    }
};
AsciidocIt.styles = [
    unsafeCSS((void 0).styles),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
AsciidocIt = __decorate([
    customElement('asciidoc-it')
], AsciidocIt);
export { AsciidocIt };
if (customElements && !customElements.get('asciidoc-it')) {
    customElements.define('asciidoc-it', AsciidocIt);
}
