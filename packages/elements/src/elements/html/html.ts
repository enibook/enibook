// lit
import { CSSResultGroup, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
// codemirror
import { html as cmHtml } from "@codemirror/lang-html"
import type { LanguageSupport} from "@codemirror/language";
import type { Extension } from "@codemirror/state"
// enibook
import { CodeIt } from "../code/code";
import styles from './html.css?inline'

@customElement('html-it')
export class HtmlIt extends CodeIt {
  static styles: CSSResultGroup = [ 
    unsafeCSS(super.styles),
    unsafeCSS(styles),
    css`@unocss-placeholder`
  ]

  
  constructor() {
    super()
    this._language = 'html'
  }

  protected override getCmLang(): Extension | LanguageSupport {
    return cmHtml()
  }

  protected override getHelpUrl(): string {
    return `https://devdocs.io/html/`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'html-it': HtmlIt;
  }
}

if (customElements && !customElements.get('html-it')) {
  customElements.define('html-it', HtmlIt)
}
