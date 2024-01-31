import {
  BaseIt,
  n,
  t
} from "./chunk.V7SARTD6.js";
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

// src/elements/icon/icon.css.ts
var icon_css_default = i`
:host {
  display: inline-block;
  vertical-align: middle;
}
`;

// src/elements/icon/icon.ts
var IconIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.name = "mdi-block-helper";
  }
  firstUpdated(_changedProperties) {
    if (!Object.keys(icons).includes(this.name)) {
      console.log();
      this.name = "mdi-block-helper";
    }
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
  icon_css_default
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
