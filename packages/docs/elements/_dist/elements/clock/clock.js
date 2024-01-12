var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { css, html, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
// enibook
import { BaseIt } from '../base/base';
import styles from './clock.css?inline';
import { getDate, getTime } from '../../utilities/date';
var State;
(function (State) {
    State[State["time"] = 0] = "time";
    State[State["both"] = 1] = "both";
    State[State["date"] = 2] = "date";
    State[State["none"] = 3] = "none";
})(State || (State = {}));
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
// @customElement('clock-it')
export class ClockIt extends BaseIt {
    constructor() {
        super(...arguments);
        this._state = State.none;
        /** @ignore */
        this._time = getTime();
        /** Ne pas afficher la date */
        this.date = false;
        /** Ne pas afficher l'heure */
        this.time = false;
        /** Taille de l'horloge */
        this.size = 'small';
    }
    /**
     * Le nom courant de l'élément : `Horloge`.
     */
    get tagTitle() {
        return 'Horloge';
    }
    firstUpdated(_changedProperties) {
        const that = this;
        setInterval(() => that.setClock(), 1000);
        // this.handleClickButton()
    }
    handleClickButton() {
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
    render() {
        const size = ['small', 'medium', 'large'].includes(this.size) ? this.size : 'small';
        return html `
      <sl-button part="base" size=${size} @click=${() => this.handleClickButton()}>
        <span class="clock__date">${this.date ? html `${getDate()}` : html ``}</span>
        <it-mdi-calendar-clock-outline></it-mdi-calendar-clock-outline>
        <span class="clock__time">${this.time ? html `${this._time}` : html ``}</span>
      </sl-button>
    `;
    }
    setClock() {
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
    toAsciidoc() {
        const attributes = {
            'date': this.date,
            'time': this.time
        };
        const attrs = [`size=${this.size}`];
        for (const key of Object.keys(attributes)) {
            if (attributes[key]) {
                attrs.push(key);
            }
        }
        return `clock-it:[${attrs.join(',')}]`;
    }
}
ClockIt.styles = [
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    state()
], ClockIt.prototype, "_time", void 0);
__decorate([
    query('.clock__date')
], ClockIt.prototype, "clockElement", void 0);
__decorate([
    query('.clock__time')
], ClockIt.prototype, "timeElement", void 0);
__decorate([
    query('.dropdown-icon')
], ClockIt.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ClockIt.prototype, "date", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ClockIt.prototype, "time", void 0);
__decorate([
    property({ type: String, reflect: true })
], ClockIt.prototype, "size", void 0);
if (customElements && !customElements.get('clock-it')) {
    customElements.define('clock-it', ClockIt);
}
