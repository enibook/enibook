// lit
import { CSSResultGroup, css, unsafeCSS } from "lit";
// livecodes
import { type EmbedOptions } from 'livecodes';
// enibook
import { PlaygroundIt } from "../playground/playground";
// import styles from './asciidoc.css?inline'

export class AsciidocIt extends PlaygroundIt {
  static styles: CSSResultGroup = [ 
    unsafeCSS(super.styles),
    // unsafeCSS(styles),
    css`@unocss-placeholder`
  ]

  protected get options(): EmbedOptions {
    this.markupLanguage = 'asciidoc'
    this.styleLanguage = 'css'
    this.activeEditor = 'markup'
    return super.options
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'asciidoc-it': AsciidocIt;
  }
}

if (customElements && !customElements.get('asciidoc-it')) {
  customElements.define('asciidoc-it', AsciidocIt)
}
