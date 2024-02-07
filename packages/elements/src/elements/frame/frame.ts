// lit
import { html, type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
// debounce
// import debounce from 'debounce'
// shoelace
import '@shoelace-style/shoelace/dist/components/resize-observer/resize-observer.js';
import type SlResizeObserver from '@shoelace-style/shoelace/dist/components/resize-observer/resize-observer.js';
// enibook
import { dedentText } from '../../utilities/dedent.js';
import { fetchContent } from '../../utilities/request.js'
import { BaseIt } from '../base/base.js';
import { templateHTML } from './templates/template-html.js';
import styles from './frame.css.js';

/** */
@customElement('frame-it')
export class FrameIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  @query('.frame-it') 
  protected baseElement!: Element

  @query('.frame') 
  protected frameElement!: HTMLIFrameElement

  @query('sl-resize-observer') 
  protected resizeObserver!: SlResizeObserver

  /** Le fichier `html` dont le contenu est à ajouter dans la section `<main>`. */
  @property({ type: String, reflect: true }) htmlMain = '';

  /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
  @property({ type: String, reflect: true }) htmlHead = '';

  /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
  @property({ type: String, reflect: true }) htmlHeader = '';

  /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
  @property({ type: String, reflect: true }) htmlFooter = '';
  
  /** URL de la page à intégrer dans la frame. */
  @property({ type: String, reflect: true }) 
  url: string = 'https://www.enibook.org'

  /** Contenu de la page à intégrer qui surcharge celui indiqué par `url`. */
  @state() 
  srcDoc: string = ''

  createListeners(): void {
    this.resizeObserver.addEventListener('sl-resize', () => {
      this.resizeFrame();
    });
  }

  protected async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
    const head = await this.getHtml('head')
    const header = await this.getHtml('header')
    const main = await this.getHtml('main');
    const footer = await this.getHtml('footer')
    if (head || header || main || footer) {
      this.srcDoc = templateHTML({ head, header, main, footer })
    }
    this.createListeners()
  }

  protected getFileName(part: string): string {
    switch (part) {
      case "head": return this.htmlHead
      case "header": return this.htmlHeader
      case "main": return this.htmlMain
      case "footer": return this.htmlFooter
      default: return ''
    }
  }

  protected async getHtml(part: string): Promise<string> {
    let html = ''
    const fileName = this.getFileName(part)
    const innerScriptTag = this.querySelector(`script[type="html/${part}"]`);
    if (fileName) {
      await fetchContent(fileName).then(response => {
        html += response;
      });
    }
    if (innerScriptTag) {
      const code = dedentText(innerScriptTag.innerHTML);
      html += code.replace(/&lt;(\/?script)(.*?)&gt;/g, '<$1$2>');
    }
    return html
  }

  protected render(): TemplateResult {
    return html`
      <sl-resize-observer>
        <div part="base" class="frame-it">
          ${this.srcDoc
            ? html`
              <iframe
                class="frame"
                allowfullscreen
                name="frame"
                sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
                srcDoc=${this.srcDoc}>
              </iframe>
              ` 
            : html`
              <iframe
                class="frame"
                allowfullscreen
                name="frame"
                sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
                src=${this.url}>
              </iframe>
              `
            }       
        </div>
      </sl-resize-observer>
    `;
  }

  protected resizeFrame() {
    const doc = this.frameElement.contentWindow
    const body = doc?.document.querySelector("body");
    const base = this.baseElement as HTMLElement
    base.style.height = `${body?.scrollHeight}px`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'frame-it': FrameIt;
  }
}

