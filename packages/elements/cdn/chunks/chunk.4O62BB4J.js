import {
  BaseIt,
  n,
  r,
  t
} from "./chunk.RU243CBN.js";
import {
  i,
  icons,
  svgIcon,
  x
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/toggle/toggle.css.ts
var cssToggle = i`
  :host {
    display: inline-block;
  }
`;
var toggle_css_default = cssToggle;

// src/elements/toggle/toggle.ts
var HIDE = "Cacher";
var SHOW = "Montrer";
var ToggleIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.elements = [];
    this._toshow = false;
    this.selector = "unknown";
    this.size = "small";
    this.textShow = "mdi-show-outline";
    this.textHide = "mdi-hide-outline";
    this.tooltipShow = SHOW;
    this.tooltipHide = HIDE;
    this.destructuring = false;
  }
  firstUpdated(_changedProperties) {
    const that = this;
    if (this.tooltipShow === SHOW) {
      this.tooltipShow += ` \xAB ${this.selector} \xBB`;
    }
    if (this.tooltipHide === HIDE) {
      this.tooltipHide += ` \xAB ${this.selector} \xBB`;
    }
    this.elements = Array.from(document.body.querySelectorAll(this.selector)).filter((element) => !element.contains(that));
  }
  render() {
    const textShow = Object.keys(icons).includes(this.textShow) ? svgIcon(this.textShow) : x`${this.textShow}`;
    const textHide = Object.keys(icons).includes(this.textHide) ? svgIcon(this.textHide) : x`${this.textHide}`;
    return x`
      <sl-tooltip content=${this._toshow ? this.tooltipShow : this.tooltipHide} hoist>
        <sl-button size=${this.size} @click=${() => this.toggleSelector()}>
          ${this._toshow ? textShow : textHide}
        </sl-button>
      </sl-tooltip>
    `;
  }
  toggleSelector() {
    const that = this;
    for (const element of that.elements) {
      if (that._toshow) {
        element.style.visibility = "visible";
        element.style.display = "";
      } else {
        if (that.destructuring) {
          element.style.display = "none";
        } else {
          element.style.visibility = "hidden";
        }
      }
    }
    this._toshow = !this._toshow;
  }
};
/** Style propre à la classe. */
ToggleIt.styles = [__superGet(ToggleIt, ToggleIt, "styles"), toggle_css_default];
__decorateClass([
  r()
], ToggleIt.prototype, "_toshow", 2);
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
], ToggleIt.prototype, "destructuring", 2);
ToggleIt = __decorateClass([
  t("toggle-it")
], ToggleIt);

export {
  ToggleIt
};
