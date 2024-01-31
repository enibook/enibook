import {
  getDate,
  getTime
} from "./chunk.UJCKPGYB.js";
import {
  BaseIt,
  e,
  n,
  r as r2,
  t
} from "./chunk.VZVRWFDB.js";
import {
  svgIcon
} from "./chunk.AZTRWFZJ.js";
import {
  i,
  r,
  x
} from "./chunk.73N5W5FM.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/clock/clock.css
var clock_default = {};

// src/elements/clock/clock.ts
var ClockIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this._state = 3 /* none */;
    this._time = getTime();
    this.date = false;
    this.time = false;
    this.size = "small";
  }
  /**
   * Le nom courant de l'élément : `Horloge`.
   */
  get tagTitle() {
    return "Horloge";
  }
  firstUpdated(_changedProperties) {
    const that = this;
    setInterval(() => that.setClock(), 1e3);
  }
  handleClickButton() {
    this._state = (this._state + 1) % 4;
    switch (this._state) {
      case 0 /* time */:
        this.date = false;
        this.time = true;
        break;
      case 1 /* both */:
        this.date = true;
        this.time = true;
        break;
      case 2 /* date */:
        this.date = true;
        this.time = false;
        break;
      case 3 /* none */:
        this.date = false;
        this.time = false;
        break;
    }
  }
  render() {
    const size = ["small", "medium", "large"].includes(this.size) ? this.size : "small";
    return x`
      <sl-button part="base" size=${size} @click=${() => this.handleClickButton()}>
        <span class="clock__date">${this.date ? x`${getDate()}` : x``}</span>
        ${svgIcon("mdi-calendar-clock-outline")}
        <span class="clock__time">${this.time ? x`${this._time}` : x``}</span>
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
      "date": this.date,
      "time": this.time
    };
    const attrs = [`size=${this.size}`];
    for (const key of Object.keys(attributes)) {
      if (attributes[key]) {
        attrs.push(key);
      }
    }
    return `clock-it:[${attrs.join(",")}]`;
  }
};
ClockIt.styles = [
  __superGet(ClockIt, ClockIt, "styles"),
  r(clock_default),
  i`@unocss-placeholder`
];
__decorateClass([
  r2()
], ClockIt.prototype, "_time", 2);
__decorateClass([
  e(".clock__date")
], ClockIt.prototype, "clockElement", 2);
__decorateClass([
  e(".clock__time")
], ClockIt.prototype, "timeElement", 2);
__decorateClass([
  e(".dropdown-icon")
], ClockIt.prototype, "icon", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], ClockIt.prototype, "date", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], ClockIt.prototype, "time", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ClockIt.prototype, "size", 2);
ClockIt = __decorateClass([
  t("clock-it")
], ClockIt);

export {
  ClockIt
};
