// lit
import { type CSSResultGroup, html, type PropertyValueMap, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
// enibook
import { icons, svgIcon } from '../../utilities/icons.js';
import { BaseIt } from '../base/base.js';
import styles from './toggle.css.js';

const HIDE = 'Cacher';
const SHOW = 'Montrer';

/**
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('toggle-it')
export class ToggleIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  private elements: HTMLElement[] = [];

  @state()
  private _toshow = false

  /** Sélecteur `css` de l'élément ciblé (défaut : `unknown`). */
  @property({ type: String, reflect: true }) 
  selector = 'unknown';

  /** Taille du bouton (défaut : `small`). */
  @property({ type: String, reflect: true }) 
  size: 'small' | 'medium' | 'large' = 'small';

  /** Texte du bouton en mode « show » (défaut : `mdi-show-outline`). */
  @property({ type: String, reflect: true, attribute: 'text-show' }) 
  textShow: string = 'mdi-show-outline';

  /** Texte du bouton en mode « hide » (défaut : `mdi-hide-outline`). */
  @property({ type: String, reflect: true, attribute: 'text-hide' }) 
  textHide: string = 'mdi-hide-outline';

  /** Infobulle en mode « show » (défaut : `Montrer`). */
  @property({ type: String, reflect: true, attribute: 'tooltip-show' }) 
  tooltipShow = SHOW;

  /** Infobulle en mode « hide » (défaut : `Cacher`). */
  @property({ type: String, reflect: true, attribute: 'tooltip-hide' }) 
  tooltipHide = HIDE;

  /** Modifier la mise en page (défaut : `false`). */
  @property({ type: Boolean, reflect: true }) 
  destructuring = false;


  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const that = this
    if (this.tooltipShow === SHOW) {
      this.tooltipShow += ` « ${this.selector} »`;
    }
    if (this.tooltipHide === HIDE) {
      this.tooltipHide += ` « ${this.selector} »`;
    }
    this.elements = Array.from(document.body.querySelectorAll(this.selector)).filter(element => !element.contains(that)) as HTMLElement[];
  }

  override render(): TemplateResult {
    const textShow = Object.keys(icons).includes(this.textShow) ? svgIcon(this.textShow) : html`${this.textShow}`;
    const textHide = Object.keys(icons).includes(this.textHide) ? svgIcon(this.textHide) : html`${this.textHide}`;
    return html`
      <sl-tooltip content=${this._toshow ? this.tooltipShow : this.tooltipHide} hoist>
        <sl-button size=${this.size} @click=${() => this.toggleSelector()}>
          ${this._toshow ? textShow : textHide}
        </sl-button>
      </sl-tooltip>
    `;
  }

  protected toggleSelector(): void {
    const that = this
    for (const element of that.elements) {
      if (that._toshow) {
        element.style.visibility = 'visible'
        element.style.display = ''
      } else {
        if (that.destructuring) {
          element.style.display = 'none'
        } else {
          element.style.visibility = 'hidden'
        }
      }
    }
    this._toshow = !this._toshow
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'toggle-it': ToggleIt;
  }
}
