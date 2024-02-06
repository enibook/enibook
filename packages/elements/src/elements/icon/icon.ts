// lit
import { type CSSResultGroup, html, type TemplateResult, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// enibook
import { icons, svgIcon } from '../../utilities/icons.js';
import { BaseIt } from '../base/base.js';
import styles from './icon.css.js';

/**
 *
 *
 */
@customElement('icon-it')
export class IconIt extends BaseIt {
  /** Style propre à la classe */
  static styles: CSSResultGroup = [super.styles, styles];

  /** Nom de l'icône (défaut: `mdi-block-helper`) */
  @property({ type: String, reflect: true }) name: string = 'mdi-block-helper';

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (!Object.keys(icons).includes(this.name)) {
      console.log();
      this.name = 'mdi-block-helper';
    }
  }

  protected render(): TemplateResult {
    return html`${svgIcon(this.name)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-it': IconIt;
  }
}
