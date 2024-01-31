// lit
import { css, type CSSResultGroup, html, type PropertyValueMap, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
// enibook
import { svgIcon } from '../../utilities/icons.js';
import { BaseIt } from '../base/base.js';
import styles from './toggle.css.js'

const HIDE = 'Cacher'
const SHOW = 'Montrer'

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('toggle-it')
export class ToggleIt extends BaseIt {
  static styles: CSSResultGroup = [ 
    super.styles,
    styles
  ]

  private element!: HTMLElement

  /** sélecteur `css` de l'élément visé */
  @property({ type: String, reflect: true }) selector = 'unknown'

  /** taille du bouton */
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'small'

  /** texte du bouton quand l'élément visé est caché */
  @property({ type: String, reflect: true, attribute: 'text-show' }) textShow: string = 'mdi-show-outline'

  /** texte du bouton quand l'élément visé est visible */
  @property({ type: String, reflect: true, attribute: 'text-hide' }) textHide: string = 'mdi-hide-outline'

  /** infobulle quand l'élément visé est caché */
  @property({ type: String, reflect: true, attribute: 'tooltip-show' }) tooltipShow = SHOW

  /** infobulle quand l'élément visé est visible */
  @property({ type: String, reflect: true, attribute: 'tooltip-hide' }) tooltipHide = HIDE

  /** garder la mise en page lorsque l'élément visé est caché */
  @property({ type: Boolean, reflect: true }) visibility = false

  /** @ignore */
  @state() hidden: boolean = false

  protected getHidden(): boolean {
    if (this.element) {
      if (this.visibility) {
        return this.element.style.visibility === 'hidden' ? true : false
      } else {
        return this.element.style.display === 'none' ? true : false
      }
    }
    return false
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.tooltipShow === SHOW) {
      this.tooltipShow += ` "${this.selector}"`
    }
    if (this.tooltipHide === HIDE) {
      this.tooltipHide += ` "${this.selector}"`
    }
    this.element = document.querySelector(this.selector) as HTMLElement
    this.hidden = this.getHidden()
  }

  
  override render(): TemplateResult {
    return html`
      <sl-tooltip content=${this.hidden ? this.tooltipShow : this.tooltipHide}>
        <sl-button size=${this.size} @click=${() => this.toggleSelector()}>
          ${this.hidden ? svgIcon(this.textShow) : svgIcon(this.textHide)}
        </sl-button>
      </sl-tooltip>
    `
  }

  /**
   * Le nom courant de l'élément : `Bascule`.
   */
  override get tagTitle(): string {
    return 'Bascule'
  }

  /**
   * Syntaxe `asciidoc` équivalente :
   *
   * ```
   * name:target[attributes]   
   * ```
   *
   * - `name` : `toggle-it`  (la macro `asciidoc` a le même nom que l'élément `html` correspondant);
   * - `target` : `selector` 
   * - `attributes` : `size`, `text-hide`, `text-show`, `tooltip-hide`, `tooltip-show`, `visibility`.
   *
   * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _inline_</a>
   *
   * @examples 
   * `toggle-it:#header[visibility]`, 
   * `toggle-it:#header[text-hide="cacher l'en-tête",text-show="montrer l'en-tête",visibility]`
   */
  override toAsciidoc(): string {
    throw new Error('Method not implemented.');
  }

  protected toggleSelector(): void {
    if (this.element) {
      if (this.visibility) {
        this.element.style.visibility = this.element.style.visibility === 'hidden' ? 'visible' : 'hidden'
      } else {
        this.element.style.display = this.element.style.display === 'none' ? '' : 'none'
      }
    }
    this.hidden = this.getHidden()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'toggle-it': ToggleIt;
  }
}

/*
if (customElements && !customElements.get('toggle-it')) {
  customElements.define('toggle-it', ToggleIt)
}
*/

