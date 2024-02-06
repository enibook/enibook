// lit
import { html, type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
// debounce
import debounce from 'debounce'
// enibook
import { BaseIt } from '../base/base.js';
import styles from './frame.css.js';


@customElement('frame-it')
export class FrameIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  @query('.frame-it') 
  protected baseElement!: Element

  @query('.frame') 
  protected frameElement!: HTMLIFrameElement

  /** URL de la page à intégrer dans la frame. */
  @property({ type: String, reflect: true }) 
  url: string = 'https://www.enibook.org'

  /** Contenu de la page à intégrer qui surcharge celui indiqué par `url`. */
  @state() 
  srcDoc: string = ''

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    let that = this
    const body = that.frameElement.contentWindow?.document.body;
    console.log('body',body)
    const resizeObserver = new ResizeObserver((entries) => {
      console.log('ici')
      for (const entry of entries) {
        if (entry.target == body) {
          const bodyHeight = body?.offsetHeight
          // that.frameElement.height = `${bodyHeight}` 
          that.frameElement.style.height = `${body?.scrollHeight}px`
          console.log('height',bodyHeight)
        }
      }
    })

    function observer() {
      resizeObserver.observe(body as Element)
    }

    window.onresize = debounce(observer, 200)
  }

  protected render(): TemplateResult {
    return html`
      <div part="base" class="frame-it">
        <iframe
          class="frame"
          allowfullscreen
          name="frame"
          sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
          src=${this.url}
        >
        </iframe>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'frame-it': FrameIt;
  }
}

