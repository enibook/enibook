import {
  templateHTML
} from "./chunk.CWIG22PC.js";
import {
  BaseIt,
  e,
  n,
  r,
  t
} from "./chunk.HKVYMXOM.js";
import {
  i,
  x
} from "./chunk.FFNE7TVA.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.VPCEBHZA.js";

// src/elements/frame/frame.css.ts
var frame_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 0.5rem;
  }
  .frame {
    object-fit: contain;
    object-position: top;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border: none;
    color: var(--sl-color-neutral-900);
    background-color: var(--sl-color-neutral-50);
  }
  .border {
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: 0.5em;
  }
`;

// src/elements/frame/frame.ts
var FrameIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.border = false;
    this.mainFilename = "";
    this.headFilename = "";
    this.headerFilename = "";
    this.footerFilename = "";
    this.url = "";
    this.srcDoc = "";
  }
  async firstUpdated(_changedProperties) {
    const head = await this.getCode(this.headFilename, "head");
    const header = await this.getCode(this.headerFilename, "header");
    const main = await this.getCode(this.mainFilename, "main");
    const footer = await this.getCode(this.footerFilename, "footer");
    if (head || header || main || footer) {
      this.srcDoc = this.getTemplate({ head, header, main, footer });
    }
  }
  getTemplate(options) {
    return templateHTML(options);
  }
  render() {
    return x`
      <div part="base" class="frame-it">
        ${this.srcDoc ? x`
            <iframe
              class="frame"
              allowfullscreen
              name="frame"
              sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
              srcDoc=${this.srcDoc}>
            </iframe>
            ` : x`
            <iframe
              class="frame"
              allowfullscreen
              name="frame"
              sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
              src=${this.url}>
            </iframe>
            `}       
      </div>
    `;
  }
  resizeIFrameHeight(height) {
    const win = this.frameElement.contentWindow;
    if (win) {
      this.frameElement.style.height = `${height - 2}px`;
    }
  }
};
/** Style propre à la classe. */
FrameIt.styles = [__superGet(FrameIt, FrameIt, "styles"), frame_css_default];
__decorateClass([
  e(".frame-it")
], FrameIt.prototype, "baseElement", 2);
__decorateClass([
  e(".frame")
], FrameIt.prototype, "frameElement", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], FrameIt.prototype, "border", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "main-filename" })
], FrameIt.prototype, "mainFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "head-filename" })
], FrameIt.prototype, "headFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "header-filename" })
], FrameIt.prototype, "headerFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "footer-filename" })
], FrameIt.prototype, "footerFilename", 2);
__decorateClass([
  n({ type: String, reflect: true })
], FrameIt.prototype, "url", 2);
__decorateClass([
  r()
], FrameIt.prototype, "srcDoc", 2);
FrameIt = __decorateClass([
  t("frame-it")
], FrameIt);

export {
  FrameIt
};
