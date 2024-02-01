// lit
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';

// enibook
import { BaseIt } from '../base/base.js';
import { getDate, getTime } from '../../utilities/date.js';
import { svgIcon } from '../../utilities/icons.js';
import styles from './clock.css.js';

enum State {
  time = 0,
  both = 1,
  date = 2,
  none = 3
}

/**
 * Horloge
 * @title Horloge
 * @summary Horloge numérique indiquant l'heure et la date courantes.
 *
 * @csspart base - le conteneur principal
 * @csspart button - le conteneur du bouton
 * @csspart menu - le conteneur du menu déroulant
 *
 * @credit [Shoelace](https://shoelace.style) pour ses éléments d'interface utilisateur.
 */
@customElement('clock-it')
export class ClockIt extends BaseIt {
  static override styles: CSSResultGroup = [super.styles, styles];

  private _state: State = State.none;

  /** @ignore */
  @state() _time: string = getTime();

  /** @ignore */
  @query('.clock__date') clockElement!: HTMLElement;

  /** @ignore */
  @query('.clock__time') timeElement!: HTMLTimeElement;

  /** @ignore */
  @query('.dropdown-icon') icon!: HTMLElement;

  /** Ne pas afficher la date */
  @property({ type: Boolean, reflect: true }) date = false;

  /** Ne pas afficher l'heure */
  @property({ type: Boolean, reflect: true }) time = false;

  /** Taille de l'horloge */
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'small';

  /**
   * Le nom courant de l'élément : `Horloge`.
   */
  get tagTitle(): string {
    return 'Horloge';
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const that = this;
    setInterval(() => that.setClock(), 1000);
    if (this.hasAttribute('time') && this.hasAttribute('date')) {
      this._state = State.both;
    } else {
      if (this.hasAttribute('time')) {
        this._state = State.time;
      } else {
        if (this.hasAttribute('date')) {
          this._state = State.date;
        } else {
          this._state = State.none;
        }
      }
    }
    // this.handleClickButton()
  }

  protected handleClickButton() {
    this._state = (this._state + 1) % 4;
    switch (this._state) {
      case State.time:
        this.date = false;
        this.time = true;
        break;
      case State.both:
        this.date = true;
        this.time = true;
        break;
      case State.date:
        this.date = true;
        this.time = false;
        break;
      case State.none:
        this.date = false;
        this.time = false;
        break;
    }
  }

  protected override render(): TemplateResult {
    const size = ['small', 'medium', 'large'].includes(this.size) ? this.size : 'small';
    return html`
      <sl-button part="base" size=${size} @click=${() => this.handleClickButton()}>
        <span class="clock__date">${this.date ? html`${getDate()}` : html``}</span>
        ${svgIcon('mdi-calendar-clock-outline')}
        <span class="clock__time">${this.time ? html`${this._time}` : html``}</span>
      </sl-button>
    `;
  }

  protected setClock(): void {
    this._time = getTime();
  }

  /**
   * Syntaxe `asciidoc` équivalente :
   *
   * ```
   * name:target[attributes]
   * ```
   *
   * - `name` : `clock-it` (la macro `asciidoc` a le même nom que l'élément `html` correspondant);
   * - `target` : la macro `clock-it` n'a pas de cible (_target_);
   * - `attributes` : `hide-date`, `hide-time`, `size`.
   *
   * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _inline_</a>
   *
   * @examples
   * `clock-it:[]`,
   * `clock-it:[date]`,
   * `clock-it:[date, size=medium]`
   */
  toAsciidoc(): string {
    const attributes: { [name: string]: boolean } = {
      date: this.date,
      time: this.time
    };
    const attrs: string[] = [`size=${this.size}`];
    for (const key of Object.keys(attributes)) {
      if (attributes[key]) {
        attrs.push(key);
      }
    }
    return `clock-it:[${attrs.join(',')}]`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'clock-it': ClockIt;
  }
}

/*
if (customElements && !customElements.get('clock-it')) {
  customElements.define('clock-it', ClockIt)
}
*/
