import {
  ShoelaceElement,
  __decorateClass,
  component_styles_default,
  watch
} from "./chunk.6W6V3YET.js";
import {
  n
} from "./chunk.VZVRWFDB.js";
import {
  i,
  x
} from "./chunk.73N5W5FM.js";

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NCZWQBRI.js
var divider_styles_default = i`
  ${component_styles_default}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.PZLXE5MF.js
var SlDivider = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass([
  n({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.E7LZNBLS.js
SlDivider.define("sl-divider");

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UG2OXVOH.js
var menu_label_styles_default = i`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K2VXHNHF.js
var SlMenuLabel = class extends ShoelaceElement {
  render() {
    return x` <slot part="base" class="menu-label"></slot> `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6FVINBPT.js
SlMenuLabel.define("sl-menu-label");
