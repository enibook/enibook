import {
  e
} from "./chunk.DI2BAIG2.js";
import {
  BaseIt,
  n,
  t
} from "./chunk.VZVRWFDB.js";
import {
  r,
  x
} from "./chunk.73N5W5FM.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/toolbar/toolbar.css
var toolbar_default = {};

// src/elements/toolbar/toolbar.ts
var ToolbarIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.fixed = false;
    this.placement = "top";
  }
  get tagTitle() {
    return "Barre d'outils";
  }
  toAsciidoc() {
    throw new Error("Method not implemented.");
  }
  render() {
    const classes = {
      toolbar: true,
      toolbar__top: this.fixed && this.placement === "top",
      toolbar__bottom: this.fixed && this.placement === "bottom"
    };
    return x`
      <div part="base" class=${e(classes)}>
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
ToolbarIt.styles = [
  __superGet(ToolbarIt, ToolbarIt, "styles"),
  r(toolbar_default)
];
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
