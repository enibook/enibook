import {
  require_debounce
} from "./chunk.R37S4BYE.js";
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
  __superGet,
  __toESM
} from "./chunk.R3ZK4RPV.js";

// src/elements/frame/frame.ts
var import_debounce = __toESM(require_debounce(), 1);

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
    this.url = "https://www.enibook.org";
    this.srcDoc = "";
  }
  firstUpdated(_changedProperties) {
    var _a;
    let that = this;
    const body = (_a = that.frameElement.contentWindow) == null ? void 0 : _a.document.body;
    console.log("body", body);
    const resizeObserver = new ResizeObserver((entries) => {
      console.log("ici");
      for (const entry of entries) {
        if (entry.target == body) {
          const bodyHeight = body == null ? void 0 : body.offsetHeight;
          that.frameElement.style.height = `${body == null ? void 0 : body.scrollHeight}px`;
          console.log("height", bodyHeight);
        }
      }
    });
    function observer() {
      resizeObserver.observe(body);
    }
    window.onresize = (0, import_debounce.default)(observer, 200);
  }
  render() {
    return x`
      <div part="base" class="frame-it">
        <iframe
          class="frame"
          allowfullscreen
          name="frame"
          sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
          src=${this.url}
        >
        </iframe>
      </div>
    `;
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
