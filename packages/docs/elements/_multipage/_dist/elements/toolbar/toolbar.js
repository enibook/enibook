var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { css, html, unsafeCSS } from 'lit';
// enibook
import { BaseIt } from '../base/base';
import styles from './toolbar.css?inline';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
let ToolbarIt = class ToolbarIt extends BaseIt {
    constructor() {
        super(...arguments);
        this.fixed = false;
        this.placement = 'top';
    }
    get tagTitle() {
        return 'Barre d\'outils';
    }
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
    render() {
        const classes = {
            toolbar: true,
            toolbar__top: this.fixed && this.placement === 'top',
            toolbar__bottom: this.fixed && this.placement === 'bottom',
        };
        return html `
      <div part="base" class=${classMap(classes)}>
        <div part="start" class="toolbar__start">
          <slot name="start"></slot>
        </div>
        <div part="center" class="toolbar__center">
          <slot name="center"></slot>
        </div>
        <div part="end" class="toolbar__end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
    }
};
ToolbarIt.styles = [
    (void 0).styles,
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    property({ type: Boolean, reflect: true })
], ToolbarIt.prototype, "fixed", void 0);
__decorate([
    property({ type: String, reflect: true })
], ToolbarIt.prototype, "placement", void 0);
ToolbarIt = __decorate([
    customElement('toolbar-it')
], ToolbarIt);
export { ToolbarIt };
/*
if (customElements && !customElements.get('toolbar-it')) {
  customElements.define('toolbar-it', ToolbarIt)
}
*/
