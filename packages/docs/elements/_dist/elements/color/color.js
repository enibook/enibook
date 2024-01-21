var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
// lit
import { css, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/divider/divider';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label';
import '@shoelace-style/shoelace/dist/components/range/range';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip';
// enibook
import { BaseIt } from '../base/base';
import styles from './color.css?inline';
export const colorNames = [
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
export class ColorIt extends (_b = BaseIt) {
    constructor() {
        super();
        this.color = 'purple';
        this.range = 5;
        this.size = 'small';
        this.initLocalStorage();
        this.setPrimaryColor();
    }
    /** Modifie la couleur principale du thème à l'aide des primitives [`shoelace`](https://shoelace.style/tokens/color). */
    cssPrimaryColor() {
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
    get colors() {
        return colorNames.map((color) => {
            return { name: color, value: `var(--sl-color-${color}-${this.range}00);` };
        });
    }
    handleChangeRange(event) {
        const range = event.target;
        this.range = range.value;
        this.setPrimaryColor();
    }
    initLocalStorage() {
        const color = localStorage.getItem('color');
        const range = localStorage.getItem('range');
        if (!color) {
            localStorage.setItem('color', this.color);
        }
        else {
            this.color = color;
        }
        if (!range) {
            localStorage.setItem('range', `${this.range}`);
        }
        else {
            this.range = parseInt(range);
        }
    }
    render() {
        return html `
      <div part="base" class="primary-color">
        <sl-dropdown hoist>
          <sl-button size=${this.size} slot="trigger" caret>
            <it-mdi-palette-outline style="color:var(--color-primary);"></it-mdi-palette-outline>
          </sl-button>
          <div class='primary-color__colors'>
            ${this.colors.map(item => html `
                <div class='primary-color__colors__color' @click=${() => { this.color = item.name; this.setPrimaryColor(); }}>
                  <it-mdi-square-rounded title=${item.name} style="cursor:pointer;width:1.5em;height:1.5em;color:${item.value}"></it-mdi-square-rounded>
                </div>
              `)}
          </div>
          <div class='primary-color__ranges'>
            <sl-range min="1" max="9" step="1" tooltip="top" .value=${this.range} @sl-change=${this.handleChangeRange}></sl-range>
          </div>
        </sl-dropdown>
      </div>
    `;
    }
    setPrimaryColor() {
        localStorage.color = this.color;
        localStorage.range = this.range;
        let styleElement = document.querySelector('style#colors');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'colors';
            document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = this.cssPrimaryColor();
    }
    get tagTitle() {
        return 'Couleurs';
    }
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
}
_a = ColorIt;
ColorIt.styles = [
    Reflect.get(_b, "styles", _a),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    property({ type: String, reflect: true })
], ColorIt.prototype, "color", void 0);
__decorate([
    property({ type: String, reflect: true })
], ColorIt.prototype, "range", void 0);
__decorate([
    property({ type: String, reflect: true })
], ColorIt.prototype, "size", void 0);
if (customElements && !customElements.get('color-it')) {
    customElements.define('color-it', ColorIt);
}
