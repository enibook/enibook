var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
// lit
import { css, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip';
// enibook
import { BaseIt } from '../base/base';
import styles from './toggle.css?inline';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
const HIDE = 'Cacher';
const SHOW = 'Montrer';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export class ToggleIt extends (_b = BaseIt) {
    constructor() {
        super(...arguments);
        /** sélecteur `css` de l'élément visé */
        this.selector = 'unknown';
        /** taille du bouton */
        this.size = 'small';
        /** texte du bouton quand l'élément visé est caché */
        this.textShow = "<it-mdi-show-outline></it-mdi-show-outline>";
        /** texte du bouton quand l'élément visé est visible */
        this.textHide = "<it-mdi-hide-outline></it-mdi-hide-outline>";
        /** infobulle quand l'élément visé est caché */
        this.tooltipShow = SHOW;
        /** infobulle quand l'élément visé est visible */
        this.tooltipHide = HIDE;
        /** garder la mise en page lorsque l'élément visé est caché */
        this.visibility = false;
        /** @ignore */
        this.hidden = false;
    }
    getHidden() {
        if (this.element) {
            if (this.visibility) {
                return this.element.style.visibility === 'hidden' ? true : false;
            }
            else {
                return this.element.style.display === 'none' ? true : false;
            }
        }
        return false;
    }
    firstUpdated(_changedProperties) {
        if (this.tooltipShow === SHOW) {
            this.tooltipShow += ` "${this.selector}"`;
        }
        if (this.tooltipHide === HIDE) {
            this.tooltipHide += ` "${this.selector}"`;
        }
        this.element = document.querySelector(this.selector);
        this.hidden = this.getHidden();
    }
    render() {
        return html `
      <sl-tooltip content=${this.hidden ? this.tooltipShow : this.tooltipHide}>
        <sl-button size=${this.size} @click=${() => this.toggleSelector()}>
          ${unsafeHTML(this.hidden ? this.textShow : this.textHide)}
        </sl-button>
      </sl-tooltip>
    `;
    }
    /**
     * Le nom courant de l'élément : `Bascule`.
     */
    get tagTitle() {
        return 'Bascule';
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
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
    toggleSelector() {
        if (this.element) {
            if (this.visibility) {
                this.element.style.visibility = this.element.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }
            else {
                this.element.style.display = this.element.style.display === 'none' ? '' : 'none';
            }
        }
        this.hidden = this.getHidden();
    }
}
_a = ToggleIt;
ToggleIt.styles = [
    Reflect.get(_b, "styles", _a),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    property({ type: String, reflect: true })
], ToggleIt.prototype, "selector", void 0);
__decorate([
    property({ type: String, reflect: true })
], ToggleIt.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'text-show' })
], ToggleIt.prototype, "textShow", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'text-hide' })
], ToggleIt.prototype, "textHide", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'tooltip-show' })
], ToggleIt.prototype, "tooltipShow", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'tooltip-hide' })
], ToggleIt.prototype, "tooltipHide", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ToggleIt.prototype, "visibility", void 0);
__decorate([
    state()
], ToggleIt.prototype, "hidden", void 0);
if (customElements && !customElements.get('toggle-it')) {
    customElements.define('toggle-it', ToggleIt);
}
