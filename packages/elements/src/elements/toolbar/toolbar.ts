// lit
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
// enibook
import { BaseIt } from '../base/base.js';
import styles from './toolbar.css.js';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('toolbar-it')
export class ToolbarIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  /** Fixation de la barre d'outils (défaut : `false`). */
  @property({ type: Boolean, reflect: true }) 
  fixed = false;

  /** position de la barre d'outils (défaut : `top`). */
  @property({ type: String, reflect: true }) 
  placement: 'top' | 'bottom' = 'top';

  protected render(): TemplateResult {
    const classes = {
      toolbar: true,
      toolbar__top: this.fixed && this.placement === 'top',
      toolbar__bottom: this.fixed && this.placement === 'bottom'
    };
    return html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'toolbar-it': ToolbarIt;
  }
}
