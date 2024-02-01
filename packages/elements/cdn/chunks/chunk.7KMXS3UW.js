import {
  BaseIt,
  n,
  r,
  t
} from "./chunk.UPR5MBMR.js";
import {
  icons,
  svgIcon
} from "./chunk.S4JGPG5E.js";
import {
  i,
  x
} from "./chunk.BLJAKQYI.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/toggle/toggle.css.ts
var toggle_css_default = i`
  :host {
    display: inline-block;
  }
`;

// src/elements/toggle/toggle.ts
var HIDE = "Cacher";
var SHOW = "Montrer";
var ToggleIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.selector = "unknown";
    this.size = "small";
    this.textShow = "mdi-show-outline";
    this.textHide = "mdi-hide-outline";
    this.tooltipShow = SHOW;
    this.tooltipHide = HIDE;
    this.visibility = false;
    this.hidden = false;
  }
  getHidden() {
    if (this.element) {
      if (this.visibility) {
        return this.element.style.visibility === "hidden" ? true : false;
      } else {
        return this.element.style.display === "none" ? true : false;
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
    const textShow = Object.keys(icons).includes(this.textShow) ? svgIcon(this.textShow) : x`${this.textShow}`;
    const textHide = Object.keys(icons).includes(this.textHide) ? svgIcon(this.textHide) : x`${this.textHide}`;
    return x`
      <sl-tooltip content=${this.hidden ? this.tooltipShow : this.tooltipHide}>
        <sl-button size=${this.size} @click=${() => this.toggleSelector()}>
          ${this.hidden ? textShow : textHide}
        </sl-button>
      </sl-tooltip>
    `;
  }
  /**
   * Le nom courant de l'élément : `Bascule`.
   */
  get tagTitle() {
    return "Bascule";
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
    throw new Error("Method not implemented.");
  }
  toggleSelector() {
    if (this.element) {
      if (this.visibility) {
        this.element.style.visibility = this.element.style.visibility === "hidden" ? "visible" : "hidden";
      } else {
        this.element.style.display = this.element.style.display === "none" ? "" : "none";
      }
    }
    this.hidden = this.getHidden();
  }
};
ToggleIt.styles = [__superGet(ToggleIt, ToggleIt, "styles"), toggle_css_default];
__decorateClass([
  n({ type: String, reflect: true })
], ToggleIt.prototype, "selector", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ToggleIt.prototype, "size", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "text-show" })
], ToggleIt.prototype, "textShow", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "text-hide" })
], ToggleIt.prototype, "textHide", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "tooltip-show" })
], ToggleIt.prototype, "tooltipShow", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "tooltip-hide" })
], ToggleIt.prototype, "tooltipHide", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], ToggleIt.prototype, "visibility", 2);
__decorateClass([
  r()
], ToggleIt.prototype, "hidden", 2);
ToggleIt = __decorateClass([
  t("toggle-it")
], ToggleIt);

export {
  ToggleIt
};