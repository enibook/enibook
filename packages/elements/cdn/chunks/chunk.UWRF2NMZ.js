import {
  FrameIt
} from "./chunk.QQGJI4IO.js";
import {
  CodeIt
} from "./chunk.FLPTFMOM.js";
import {
  AnswerForm
} from "./chunk.MJEIBEUT.js";
import {
  e,
  n,
  t
} from "./chunk.HKVYMXOM.js";
import {
  i,
  x
} from "./chunk.FFNE7TVA.js";
import {
  __decorateClass,
  __superGet,
  __template
} from "./chunk.VPCEBHZA.js";

// ../../node_modules/.pnpm/delay@6.0.0/node_modules/delay/index.js
var createAbortError = () => {
  const error = new Error("Delay aborted");
  error.name = "AbortError";
  return error;
};
var clearMethods = /* @__PURE__ */ new WeakMap();
function createDelay({ clearTimeout: defaultClear, setTimeout: defaultSet } = {}) {
  return (milliseconds, { value, signal } = {}) => {
    if (signal?.aborted) {
      return Promise.reject(createAbortError());
    }
    let timeoutId;
    let settle;
    let rejectFunction;
    const clear = defaultClear ?? clearTimeout;
    const signalListener = () => {
      clear(timeoutId);
      rejectFunction(createAbortError());
    };
    const cleanup = () => {
      if (signal) {
        signal.removeEventListener("abort", signalListener);
      }
    };
    const delayPromise = new Promise((resolve, reject) => {
      settle = () => {
        cleanup();
        resolve(value);
      };
      rejectFunction = reject;
      timeoutId = (defaultSet ?? setTimeout)(settle, milliseconds);
    });
    if (signal) {
      signal.addEventListener("abort", signalListener, { once: true });
    }
    clearMethods.set(delayPromise, () => {
      clear(timeoutId);
      timeoutId = null;
      settle();
    });
    return delayPromise;
  };
}
var delay = createDelay();
var delay_default = delay;

// src/elements/playground/playground.css.ts
var playground_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }

  [part="base"] {
    display: flex;
    flex-wrap: wrap;
  }
  [part="base"] > * {
    flex-grow: 1;
    flex-basis: calc(( 40rem - 100%) * 999);
  }
  [part="base"] > :nth-last-child(n+ 3),
  [part="base"] > :nth-last-child(n+ 3) ~ * {
  flex-basis: 100%;
}

  /*
  .playground-it {
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    gap: 0;
  }
  .playground-it > * {
    flex-grow: 1;
    flex-basis: calc((45rem - 100%) * 999);
  }
  .playground-it > :nth-last-child(n+ 3),
  .playground-it > :nth-last-child(n+ 3) ~ * {
    flex-basis: 100%;
  }
  */
`;

// src/elements/playground/playground.ts
var _a;
var PlaygroundIt = class extends AnswerForm {
  constructor() {
    super(...arguments);
    this.initialCode = "";
    this.initialCompiledCode = "";
    this.initialHead = "";
    this.initialHeader = "";
    this.initialMain = "";
    this.initialFooter = "";
    this.full = false;
    this.language = "text";
    this.readOnly = false;
    this.codeFilename = "";
    this.prefixFilename = "";
    this.suffixFilename = "";
    this.mainFilename = "";
    this.headFilename = "";
    this.headerFilename = "";
    this.footerFilename = "";
  }
  createEditor() {
    const initialCode = `<script type="enibook/src">${this.initialCode}<\/script>`;
    const editor = new CodeIt();
    editor.classList.add("playground__editor__script");
    editor.language = this.language;
    editor.readOnly = this.readOnly;
    editor.lineNumbers = true;
    editor.innerHTML = initialCode;
    return editor;
  }
  createFrame() {
    const initialHead = `<script type="enibook/head">${this.initialHead}<\/script>`;
    const initialHeader = `<script type="enibook/header">${this.initialHeader}<\/script>`;
    const initialMain = `<script type="enibook/main">${this.initialCompiledCode}<\/script>`;
    const initialFooter = `<script type="enibook/footer">${this.initialFooter}<\/script>`;
    const frame = new FrameIt();
    frame.classList.add("playground__frame");
    frame.border = false;
    frame.innerHTML = `
      ${initialHead}
      ${initialHeader}
      ${initialMain}
      ${initialFooter}
    `;
    return frame;
  }
  createListener() {
  }
  async firstUpdated(_changedProperties) {
    this.initialHead += await this.getCode(this.headFilename, "head");
    this.initialHeader += await this.getCode(this.headerFilename, "header");
    this.initialFooter += await this.getCode(this.footerFilename, "footer");
    this.initialMain += await this.getCode(this.mainFilename, "main");
    this.initialCode += await this.getCode(this.codeFilename, "src");
    this.editor = this.createEditor();
    this.frame = this.createFrame();
    this.scriptEditorElement.appendChild(this.editor);
    this.baseElement.appendChild(this.frame);
    this.createListener();
  }
  get answer() {
    throw new Error("Method not implemented.");
  }
  render() {
    return x(_a || (_a = __template(['\n      <div part="base">\n        <sl-tab-group part="tabs" style="border:1px solid green">\n          <sl-tab slot="nav" panel="script">Script ', '</sl-tab>\n          <sl-tab slot="nav" panel="web">Page Web</sl-tab>\n\n          <sl-tab-panel part="web" name="web">\n            <sl-tab-group>\n              <sl-tab slot="nav" panel="page">Page</sl-tab>\n              <sl-tab slot="nav" panel="head">Head</sl-tab>\n              <sl-tab slot="nav" panel="css">Style</sl-tab>\n              <sl-tab slot="nav" panel="header">Header</sl-tab>\n              <sl-tab slot="nav" panel="main">Main</sl-tab>\n              <sl-tab slot="nav" panel="footer">Footer</sl-tab>\n\n              <sl-tab-panel name="page">\n                <code-it language="html" read-only>\n                  <script type="enibook/src"><p>hello</p><\/script>\n                </code-it>\n              </sl-tab-panel>\n              <sl-tab-panel name="head">\n                <code-it language="html">\n                  <script type="enibook/src">', '<\/script>\n                </code-it>\n              </sl-tab-panel>\n              <sl-tab-panel name="header">\n                <code-it language="html">\n                  <script type="enibook/src">', '<\/script>\n                </code-it>\n              </sl-tab-panel>\n              <sl-tab-panel name="footer">\n                <code-it language="html" read-only>\n                  <script type="enibook/src">', '<\/script>\n                </code-it>\n              </sl-tab-panel>\n              <sl-tab-panel name="css"></sl-tab-panel>\n            </sl-tab-group>\n          </sl-tab-panel>\n          <sl-tab-panel part="script" name="script">\n          </sl-tab-panel>\n        </sl-tab-group>\n        <div part="playground" class="playground-it"></div>\n      </div>\n    '])), this.language, this.initialHead, this.initialHeader, this.initialCompiledCode);
  }
  reset() {
    throw new Error("Method not implemented.");
  }
  async updateFrame(text, consoleOutput) {
    this.frame.srcDoc = "";
    this.frame.srcDoc = this.frame.getTemplate({
      head: this.initialHead,
      header: this.initialHeader,
      main: text,
      consoleOutput,
      footer: this.initialFooter
    });
    await delay_default(200);
    this.updateFrameHeight();
  }
  updateFrameHeight() {
    const body = this.frame.frameElement.contentWindow?.document.body;
    const html = this.frame.frameElement.contentWindow?.document.documentElement;
    if (body && html) {
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      this.frame.frameElement.style.height = `${height}px`;
    }
  }
  workerScript() {
    return x``;
  }
};
/** Style propre à la classe. */
PlaygroundIt.styles = [__superGet(PlaygroundIt, PlaygroundIt, "styles"), playground_css_default];
__decorateClass([
  e(".playground__editor")
], PlaygroundIt.prototype, "editorElement", 2);
__decorateClass([
  e('sl-tab-panel[name="script"]')
], PlaygroundIt.prototype, "scriptEditorElement", 2);
__decorateClass([
  e(".playground__frame")
], PlaygroundIt.prototype, "frameElement", 2);
__decorateClass([
  e(".playground-it")
], PlaygroundIt.prototype, "baseElement", 2);
__decorateClass([
  e('[part="tabs"]')
], PlaygroundIt.prototype, "tabsElement", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], PlaygroundIt.prototype, "full", 2);
__decorateClass([
  n({ type: String, reflect: true })
], PlaygroundIt.prototype, "language", 2);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "read-only" })
], PlaygroundIt.prototype, "readOnly", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "code-filename" })
], PlaygroundIt.prototype, "codeFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "prefix-filename" })
], PlaygroundIt.prototype, "prefixFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "suffix-filename" })
], PlaygroundIt.prototype, "suffixFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "main-filename" })
], PlaygroundIt.prototype, "mainFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "head-filename" })
], PlaygroundIt.prototype, "headFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "header-filename" })
], PlaygroundIt.prototype, "headerFilename", 2);
__decorateClass([
  n({ type: String, reflect: true, attribute: "footer-filename" })
], PlaygroundIt.prototype, "footerFilename", 2);
PlaygroundIt = __decorateClass([
  t("playground-it")
], PlaygroundIt);

export {
  PlaygroundIt
};
