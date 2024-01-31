import {
  BaseIt,
  n,
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

// src/elements/color/color.css?inline
var color_default = {};

// src/elements/color/color.ts
var colorNames = [
  "gray",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose"
];
var ColorIt = class extends BaseIt {
  constructor() {
    super();
    this.color = "purple";
    this.range = 5;
    this.size = "small";
    this.initLocalStorage();
    this.setPrimaryColor();
  }
  /** Modifie la couleur principale du thème à l'aide des primitives [`shoelace`](https://shoelace.style/tokens/color). */
  cssPrimaryColor() {
    return `
      :root,
      .sl-theme-light,
      .sl-theme-dark {
        --sl-color-primary-50: var(--sl-color-${this.color}-50);
        --sl-color-primary-100: var(--sl-color-${this.color}-100);
        --sl-color-primary-200: var(--sl-color-${this.color}-200);
        --sl-color-primary-300: var(--sl-color-${this.color}-300);
        --sl-color-primary-400: var(--sl-color-${this.color}-400);
        --sl-color-primary-500: var(--sl-color-${this.color}-500);
        --sl-color-primary-600: var(--sl-color-${this.color}-600);
        --sl-color-primary-700: var(--sl-color-${this.color}-700);
        --sl-color-primary-800: var(--sl-color-${this.color}-800);
        --sl-color-primary-900: var(--sl-color-${this.color}-900);
        --sl-color-primary-950: var(--sl-color-${this.color}-950);
        --color-primary: var(--sl-color-primary-${this.range}00);
        --color-success: var(--sl-color-success-500);
        --color-warning: var(--sl-color-warning-500);
        --color-danger: var(--sl-color-danger-500);
        --color-neutral: var(--sl-color-neutral-500);
      }
    `;
  }
  get colors() {
    return colorNames.map(
      (color) => {
        return { name: color, value: `var(--sl-color-${color}-${this.range}00);` };
      }
    );
  }
  handleChangeRange(event) {
    const range = event.target;
    this.range = range.value;
    this.setPrimaryColor();
  }
  initLocalStorage() {
    const color = localStorage.getItem("color");
    const range = localStorage.getItem("range");
    if (!color) {
      localStorage.setItem("color", this.color);
    } else {
      this.color = color;
    }
    if (!range) {
      localStorage.setItem("range", `${this.range}`);
    } else {
      this.range = parseInt(range);
    }
  }
  render() {
    return x`
      <div part="base" class="primary-color">
        <sl-dropdown hoist>
          <sl-button size=${this.size} slot="trigger" caret>
            <span style="color:var(--color-primary)">${svgIcon("mdi-palette-outline")}</span>
          </sl-button>
          <div class='primary-color__colors'>
            ${this.colors.map(
      (item) => x`
                <div class='primary-color__colors__color' @click=${() => {
        this.color = item.name;
        this.setPrimaryColor();
      }}>
                  <span title=${item.name} style="cursor:pointer;width:1.5em;height:1.5em;color:${item.value}">${svgIcon("mdi-square-rounded")}
                </div>
              `
    )}
          </div>
          <div class='primary-color__ranges'>
            <sl-range min="1" max="9" step="1" tooltip="top" .value=${this.range} @sl-change=${this.handleChangeRange}></sl-range>
          </div>
        </sl-dropdown>
      </div>
    `;
  }
  setPrimaryColor() {
    localStorage.color = this.color;
    localStorage.range = this.range;
    let styleElement = document.querySelector("style#colors");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "colors";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = this.cssPrimaryColor();
  }
  get tagTitle() {
    return "Couleurs";
  }
  toAsciidoc() {
    throw new Error("Method not implemented.");
  }
};
ColorIt.styles = [
  __superGet(ColorIt, ColorIt, "styles"),
  r(color_default),
  i`@unocss-placeholder`
];
__decorateClass([
  n({ type: String, reflect: true })
], ColorIt.prototype, "color", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ColorIt.prototype, "range", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ColorIt.prototype, "size", 2);
ColorIt = __decorateClass([
  t("color-it")
], ColorIt);

export {
  colorNames,
  ColorIt
};
