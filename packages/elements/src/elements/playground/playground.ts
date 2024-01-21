// lit
import { CSSResultGroup, PropertyValueMap, TemplateResult, css, html, svg, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, query } from 'lit/decorators.js';
// livecodes
import { createPlayground, type EmbedOptions } from 'livecodes';
// shoelace
import '@shoelace-style/shoelace/dist/components/details/details'
// enibook
import { BaseIt } from '../base/base';
import styles from './playground.css?inline'
import { dedentText } from '../../utilities/dedent';


export const logos = {
  markup: {
    asciidoc: html`<it-simple-icons-asciidoctor></it-simple-icons-asciidoctor>`,
    html: html`<it-mdi-language-html5></it-mdi-language-html5>`,
    markdown: html`<it-mdi-language-markdown></it-mdi-language-markdown>`,
  },
  style: {
    css: html`<it-mdi-language-css3></it-mdi-language-css3>`
  },
  script: {
    javascript: html`<it-mdi-language-javascript></it-mdi-language-javascript>`,
    prolog: svg`<svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><text x="2" y="15" fill="currentColor" style="font-weight:bold;font-size:inherit">?-</text></svg>`,
    python: html`<it-mdi-language-python></it-mdi-language-python>`,
    sql: html`<it-mdi-sql-query></it-mdi-sql-query>`,
    typescript: html`<it-mdi-language-typescript></it-mdi-language-typescript>`,
  }
}

export class PlaygroundIt extends BaseIt {
  static styles: CSSResultGroup = [ 
    unsafeCSS(styles),
    css`@unocss-placeholder` 
  ]

  @query('#ide-container') container!: HTMLElement

  @property({ type: String, reflect: true, attribute: 'active-editor' }) activeEditor: 'markup' | 'style' | 'script' = 'script'
  @property({ type: Boolean, reflect: true, attribute: 'line-numbers' }) lineNumbers: boolean = false
  @property({ type: Boolean, reflect: true }) lite: boolean = false
  @property({ type: String, reflect: true, attribute: 'markup-language' }) markupLanguage: 'asciidoc' | 'html' | 'markdown' = 'html'
  @property({ type: String, reflect: true }) mode:  "full" | "result" | "editor" | "codeblock" = "full"
  @property({ type: Boolean, reflect: true, attribute: 'readonly' }) readOnly: boolean = false
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'dark'
  @property({ type: String, reflect: true, attribute: 'script-language' }) scriptLanguage: 'javascript' | 'prolog' | 'python' | 'sql' | 'typescript' = 'javascript'
  @property({ type: String, reflect: true, attribute: 'style-language' }) styleLanguage: 'css' = 'css'
  @property({ type: String, reflect: true }) title: string = 'Hello'
  @property({ type: String, reflect: true }) view: 'editor' | 'result' | 'split' = 'split'

  protected getInitialContent(language: string): string {
    const slot = this.shadowRoot?.querySelector('slot')
    const scripts = slot?.assignedElements({flatten: true}).filter((elem) => elem.matches(`script[type="enibook/${language}"]`)) as HTMLElement[]
    const result = scripts?.map((script) => dedentText(script.innerText))
      .reduce((accumulator, currentValue) => accumulator.concat(accumulator,'\n',currentValue), '')
    return result
  }

  protected get options(): EmbedOptions {
    return {
      config: {
        markup: {
          language: this.markupLanguage,
          content: this.getInitialContent(this.markupLanguage),
        },
        style: {
          language: this.styleLanguage,
          content: this.getInitialContent(this.styleLanguage),
        },
        script: {
          language: this.scriptLanguage,
          content: this.getInitialContent(this.scriptLanguage),
        },
        activeEditor: this.activeEditor,
        allowLangChange: false,
        description: '',
        lineNumbers: this.lineNumbers,
        mode: this.mode,
        readonly: this.readOnly,
        scripts: [],
        stylesheets: [],
        theme: this.theme,
        title: this.title,
      },
      lite: this.lite,
      params: {
        console: "open",
      },
      view: this.view,
    }
  };
  
  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.initIde()
  }

  initIde = (async () => {
    const playground = await createPlayground(this.container, this.options)
    console.log(await playground.getConfig())
    /*
    const iframe = this.container.querySelector('iframe')
    const iframe2 = iframe?.contentWindow?.document.body.querySelector('iframe')
    console.log(iframe2?.contentWindow?.document.body.querySelector('#logo'))
    */
  })

  override render(): TemplateResult {
    return html`
      <div part="base" class="playground">
        <sl-details class="custom-icons">
          <div slot="summary">${logos.markup[this.markupLanguage]} ${logos.style['css']} ${logos.script[this.scriptLanguage]} ${unsafeHTML(this.title)}</div>
          <it-mdi-plus-box-outline slot="expand-icon"></it-mdi-plus-box-outline>
          <it-mdi-minus-box-outline slot="collapse-icon"></it-mdi-minus-box-outline>
          <div part="ide" id="ide-container" class="ide-container" data-height="500px"></div>
        </sl-details>
        <slot></slot>
      </div>
    `
  }

  override get tagTitle(): string {
    return 'Playground'
  }
  
  override toAsciidoc(): string {
    throw new Error('Method not implemented.');
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'playground-it': PlaygroundIt;
  }
}

if (customElements && !customElements.get('playground-it')) {
  customElements.define('playground-it', PlaygroundIt)
}
