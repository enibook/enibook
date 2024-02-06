import {
  ShoelaceElement,
  __decorateClass as __decorateClass2,
  component_styles_default,
  e as e2
} from "./chunk.M2FMCOQ5.js";
import {
  BaseIt,
  e,
  n,
  r,
  t
} from "./chunk.RU243CBN.js";
import {
  i,
  x
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WISH4DLW.js
var button_group_styles_default = i`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QO26VIPE.js
var SlButtonGroup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.disableRole = false;
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.forEach((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button) {
        button.classList.add("sl-button-group__button");
        button.classList.toggle("sl-button-group__button--first", index === 0);
        button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--radio", button.tagName.toLowerCase() === "sl-radio-button");
      }
    });
  }
  render() {
    return x`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
SlButtonGroup.styles = button_group_styles_default;
__decorateClass2([
  e("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass2([
  r()
], SlButtonGroup.prototype, "disableRole", 2);
__decorateClass2([
  n()
], SlButtonGroup.prototype, "label", 2);
function findButton(el) {
  var _a;
  const selector = "sl-button, sl-radio-button";
  return (_a = el.closest(selector)) != null ? _a : el.querySelector(selector);
}

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UJYS7SGI.js
SlButtonGroup.define("sl-button-group");

// src/elements/toolbar/toolbar.css.ts
var toolbar_css_default = i`
  :host {
    display: block;
    z-index: 2000; /* < sl-drawer */
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ::slotted(*) {
    margin: 0;
  }
  .toolbar__start,
  .toolbar__center,
  .toolbar__end {
    display: flex;
  }
  .toolbar__top,
  .toolbar__bottom {
    flex-direction: row;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2000; /* < sl-drawer */
  }
  .toolbar__top {
    top: 0;
  }
  .toolbar__bottom {
    bottom: 0;
  }
  .toolbar__left,
  .toolbar__right {
    flex-direction: column;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 2000; /* < sl-drawer */
  }
  .toolbar__left .toolbar__start,
  .toolbar__right .toolbar__start,
  .toolbar__left .toolbar__center,
  .toolbar__right .toolbar__center,
  .toolbar__left .toolbar__end,
  .toolbar__right .toolbar__end {
    flex-direction: column;
    align-items: stretch;
  }
  .toolbar__left {
    left: 0;
  }
  .toolbar__right {
    right: 0;
  }
`;

// src/elements/toolbar/toolbar.ts
var ToolbarIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.fixed = false;
    this.placement = "top";
  }
  render() {
    const classes = {
      toolbar: true,
      toolbar__top: this.fixed && this.placement === "top",
      toolbar__bottom: this.fixed && this.placement === "bottom"
    };
    return x`
      <div part="base" class=${e2(classes)}>
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
};
/** Style propre à la classe. */
ToolbarIt.styles = [__superGet(ToolbarIt, ToolbarIt, "styles"), toolbar_css_default];
__decorateClass([
  n({ type: Boolean, reflect: true })
], ToolbarIt.prototype, "fixed", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ToolbarIt.prototype, "placement", 2);
ToolbarIt = __decorateClass([
  t("toolbar-it")
], ToolbarIt);

export {
  ToolbarIt
};
