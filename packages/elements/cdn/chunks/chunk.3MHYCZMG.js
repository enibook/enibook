import {
  BaseIt,
  n,
  t
} from "./chunk.HKVYMXOM.js";
import {
  i,
  icons,
  svgIcon,
  x
} from "./chunk.FFNE7TVA.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.VPCEBHZA.js";

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
};
/** Style propre à la classe */
IconIt.styles = [__superGet(IconIt, IconIt, "styles"), icon_css_default];
__decorateClass([
  n({ type: String, reflect: true })
], IconIt.prototype, "name", 2);
IconIt = __decorateClass([
  t("icon-it")
], IconIt);

export {
  IconIt
};
