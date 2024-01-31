import {
  BaseIt,
  n,
  t
} from "./chunk.VZVRWFDB.js";
import {
  icons,
  svgIcon
} from "./chunk.AZTRWFZJ.js";
import {
  r,
  x
} from "./chunk.73N5W5FM.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/icon/icon.css?inline
var icon_default = {};

// src/elements/icon/icon.ts
var IconIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.name = "mdi-help";
  }
  firstUpdated(_changedProperties) {
    this.name = Object.keys(icons).includes(this.name) ? this.name : "mdi-help";
  }
  render() {
    return x`${svgIcon(this.name)}`;
  }
  get tagTitle() {
    return "Ic\xF4ne";
  }
  toAsciidoc() {
    throw new Error("Method not implemented.");
  }
};
IconIt.styles = [
  __superGet(IconIt, IconIt, "styles"),
  r(icon_default)
];
__decorateClass([
  n({ type: String, reflect: true })
], IconIt.prototype, "name", 2);
IconIt = __decorateClass([
  t("icon-it")
], IconIt);

export {
  IconIt
};
