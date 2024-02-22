// lit
import { html, type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
// shoelace

// enibook
import { BaseIt } from '../base/base.js';
import { templateHTML, type OptionsTemplate } from './templates/template-html.js';
import styles from './frame.css.js';

/** */
@customElement('frame-it')
export class FrameIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  @query('.frame-it') 
  protected baseElement!: HTMLElement

  @query('.frame') 
  protected frameElement!: HTMLIFrameElement

  /** Le bord de la frame */
  @property({ type: Boolean, reflect: true }) border = false

  /** Le fichier `html` dont le contenu est à ajouter dans la section `<main>`. */
  @property({ type: String, reflect: true, attribute: 'main-filename' }) mainFilename = '';

  /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
  @property({ type: String, reflect: true, attribute: 'head-filename' }) headFilename = '';

  /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
  @property({ type: String, reflect: true, attribute: 'header-filename' }) headerFilename = '';

  /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
  @property({ type: String, reflect: true, attribute: 'footer-filename' }) footerFilename = '';
  
  /** URL de la page à intégrer dans la frame. */
  @property({ type: String, reflect: true }) 
  url: string = ''

  /** Contenu de la page à intégrer qui surcharge celui indiqué par `url`. */
  @state() 
  srcDoc: string = ''

  protected async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
    const head = await this.getCode(this.headFilename, 'head')
    const header = await this.getCode(this.headerFilename, 'header')
    const main = await this.getCode(this.mainFilename, 'main')
    const footer = await this.getCode(this.footerFilename, 'footer')
    if (head || header || main || footer) {
      this.srcDoc = this.getTemplate({ head, header, main, footer })
    }
  }
  
  getTemplate(options: OptionsTemplate): string {
    return templateHTML(options)
  }

  protected render(): TemplateResult {
    return html`
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
    `;
  }

  resizeIFrameHeight(height: number) {
    const win = this.frameElement.contentWindow
    if (win) {
      this.frameElement.style.height = `${height-2}px`
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'frame-it': FrameIt;
  }
}

