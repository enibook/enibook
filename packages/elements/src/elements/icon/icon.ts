// lit
import { type CSSResultGroup, html, type TemplateResult, unsafeCSS, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// enibook
import { icons, svgIcon } from '../../utilities/icons.js'
import { BaseIt } from '../base/base.js';
import styles from './icon.css.js'

/**
 *
 * 
 */
@customElement('icon-it')
export class IconIt extends BaseIt {
  static styles: CSSResultGroup = [
    super.styles,
    styles
  ]

  @property({ type: String, reflect: true }) name: string = 'mdi-block-helper'

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (!Object.keys(icons).includes(this.name)) {
      console.log()
      this.name = 'mdi-block-helper'
    }
  }

  render(): TemplateResult {
    return html`${svgIcon(this.name)}`
  }

  get tagTitle(): string {
    return 'Icône';
  }

  toAsciidoc(): string {
    throw new Error('Method not implemented.');
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'icon-it': IconIt;
  }
}

