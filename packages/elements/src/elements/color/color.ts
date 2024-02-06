// lit
import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// shoelace
import type SlRange from '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
// enibook
import { svgIcon } from '../../utilities/icons.js';
import { BaseIt } from '../base/base.js';
import styles from './color.css.js';

export const colorNames: string[] = [
  'gray',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
];

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('color-it')
export class ColorIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  /** Couleur courante (défaut : `purple`) */
  @property({ type: String, reflect: true }) color: string = 'purple';

  /** Nuance de couleur (de 1 à 9, défaut : 5). */
  @property({ type: String, reflect: true }) range: number = 5;

  /** Taille du bouton (défaut : `small`). */
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'small';

  constructor() {
    super();
    this.initLocalStorage();
    this.setPrimaryColor();
  }

  /** Couleur principale du thème à l'aide des primitives [`shoelace`](https://shoelace.style/tokens/color). */
  protected cssPrimaryColor(): string {
    return `
      :root,
      .sl-theme-light,
      .sl-theme-dark {
        --sl-color-primary-50: var(--sl-color-${this.color}-50);
        --sl-color-primary-100: var(--sl-color-${this.color}-100);
        --sl-color-primary-200: var(--sl-color-${this.color}-200);
        --sl-color-primary-300: var(--sl-color-${this.color}-300);
        --sl-color-primary-400: var(--sl-color-${this.color}-400);
        --sl-color-primary-500: var(--sl-color-${this.color}-500);
        --sl-color-primary-600: var(--sl-color-${this.color}-600);
        --sl-color-primary-700: var(--sl-color-${this.color}-700);
        --sl-color-primary-800: var(--sl-color-${this.color}-800);
        --sl-color-primary-900: var(--sl-color-${this.color}-900);
        --sl-color-primary-950: var(--sl-color-${this.color}-950);
        --color-primary: var(--sl-color-primary-${this.range}00);
        --color-success: var(--sl-color-success-500);
        --color-warning: var(--sl-color-warning-500);
        --color-danger: var(--sl-color-danger-500);
        --color-neutral: var(--sl-color-neutral-500);
      }
    `;
  }

  /** Couleurs disponibles */
  public get colors(): { name: string; value: string }[] {
    return colorNames.map(color => {
      return { name: color, value: `var(--sl-color-${color}-${this.range}00);` };
    });
  }

  protected handleChangeRange(event: CustomEvent) {
    const range = event.target as SlRange;
    this.range = range.value;
    this.setPrimaryColor();
  }

  protected initLocalStorage(): void {
    const color = localStorage.getItem('color');
    const range = localStorage.getItem('range');
    if (!color) {
      localStorage.setItem('color', this.color);
    } else {
      this.color = color;
    }
    if (!range) {
      localStorage.setItem('range', `${this.range}`);
    } else {
      this.range = parseInt(range);
    }
  }

  protected render(): TemplateResult {
    return html`
      <div part="base" class="primary-color">
        <sl-dropdown hoist>
          <sl-button size=${this.size} slot="trigger" caret>
            <span style="color:var(--color-primary)">${svgIcon('mdi-palette-outline')}</span>
          </sl-button>
          <div class="primary-color__colors">
            ${this.colors.map(
              item =>
                html`
                <div class='primary-color__colors__color' @click=${() => {
                  this.color = item.name;
                  this.setPrimaryColor();
                }}>
                  <span title=${item.name} style="cursor:pointer;font-size:2em;color:${item.value}">${svgIcon('mdi-square-rounded')}
                </div>
              `
            )}
          </div>
          <div class="primary-color__ranges">
            <sl-range
              min="1"
              max="9"
              step="1"
              tooltip="top"
              .value=${this.range}
              @sl-change=${this.handleChangeRange}
            ></sl-range>
          </div>
        </sl-dropdown>
      </div>
    `;
  }

  /** Modifie la couleur principale du thème. */
  protected setPrimaryColor() {
    localStorage.color = this.color;
    localStorage.range = this.range;
    let styleElement = document.querySelector('style#colors') as HTMLElement;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'colors';
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = this.cssPrimaryColor();
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'color-it': ColorIt;
  }
}
