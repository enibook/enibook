import {
  fetchContent
} from "./chunk.KYMJOBQ5.js";
import {
  templateHTML
} from "./chunk.KBW323UF.js";
import {
  dedentText
} from "./chunk.2DSJPRN6.js";
import {
  ShoelaceElement,
  __decorateClass as __decorateClass2,
  component_styles_default,
  watch
} from "./chunk.MOWIAP3E.js";
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

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RMCOWJOW.js
var resize_observer_styles_default = i`
  ${component_styles_default}

  :host {
    display: contents;
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GU6S3A75.js
var SlResizeObserver = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.observedElements = [];
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries) => {
      this.emit("sl-resize", { detail: { entries } });
    });
    if (!this.disabled) {
      this.startObserver();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }
  handleSlotChange() {
    if (!this.disabled) {
      this.startObserver();
    }
  }
  startObserver() {
    const slot = this.shadowRoot.querySelector("slot");
    if (slot !== null) {
      const elements = slot.assignedElements({ flatten: true });
      this.observedElements.forEach((el) => this.resizeObserver.unobserve(el));
      this.observedElements = [];
      elements.forEach((el) => {
        this.resizeObserver.observe(el);
        this.observedElements.push(el);
      });
    }
  }
  stopObserver() {
    this.resizeObserver.disconnect();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  render() {
    return x` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
SlResizeObserver.styles = resize_observer_styles_default;
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlResizeObserver.prototype, "disabled", 2);
__decorateClass2([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlResizeObserver.prototype, "handleDisabledChange", 1);

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2XDCNWNM.js
SlResizeObserver.define("sl-resize-observer");

// src/elements/frame/frame.css.ts
var frame_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }

  .frame {
    object-fit: contain;
    object-position: top;
    width: 100%;
    height: 100%;
    border: 1px solid var(--sl-color-neutral-200);
    overflow-y: auto
  }
`;

// src/elements/frame/frame.ts
var FrameIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.htmlMain = "";
    this.htmlHead = "";
    this.htmlHeader = "";
    this.htmlFooter = "";
    this.url = "https://www.enibook.org";
    this.srcDoc = "";
  }
  createListeners() {
    this.resizeObserver.addEventListener("sl-resize", () => {
      this.resizeFrame();
    });
  }
  async firstUpdated(_changedProperties) {
    const head = await this.getHtml("head");
    const header = await this.getHtml("header");
    const main = await this.getHtml("main");
    const footer = await this.getHtml("footer");
    if (head || header || main || footer) {
      this.srcDoc = templateHTML({ head, header, main, footer });
    }
    this.createListeners();
  }
  getFileName(part) {
    switch (part) {
      case "head":
        return this.htmlHead;
      case "header":
        return this.htmlHeader;
      case "main":
        return this.htmlMain;
      case "footer":
        return this.htmlFooter;
      default:
        return "";
    }
  }
  async getHtml(part) {
    let html = "";
    const fileName = this.getFileName(part);
    const innerScriptTag = this.querySelector(`script[type="html/${part}"]`);
    if (fileName) {
      await fetchContent(fileName).then((response) => {
        html += response;
      });
    }
    if (innerScriptTag) {
      const code = dedentText(innerScriptTag.innerHTML);
      html += code.replace(/&lt;(\/?script)(.*?)&gt;/g, "<$1$2>");
    }
    return html;
  }
  render() {
    return x`
      <sl-resize-observer>
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
      </sl-resize-observer>
    `;
  }
  resizeFrame() {
    const doc = this.frameElement.contentWindow;
    const body = doc == null ? void 0 : doc.document.querySelector("body");
    const base = this.baseElement;
    base.style.height = `${body == null ? void 0 : body.scrollHeight}px`;
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
  e("sl-resize-observer")
], FrameIt.prototype, "resizeObserver", 2);
__decorateClass([
  n({ type: String, reflect: true })
], FrameIt.prototype, "htmlMain", 2);
__decorateClass([
  n({ type: String, reflect: true })
], FrameIt.prototype, "htmlHead", 2);
__decorateClass([
  n({ type: String, reflect: true })
], FrameIt.prototype, "htmlHeader", 2);
__decorateClass([
  n({ type: String, reflect: true })
], FrameIt.prototype, "htmlFooter", 2);
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
