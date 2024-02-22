import {
  FrameIt
} from "./chunk.LS4NHTQA.js";
import {
  CodeIt
} from "./chunk.SJ4RTGRS.js";
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

// src/elements/playground/playground.css.ts
var playground_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }

  .playground-it {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
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
  compile(input) {
    return input;
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
    frame.border = true;
    frame.innerHTML = `
      ${initialHead}
      ${initialHeader}
      ${initialMain}
      ${initialFooter}
    `;
    return frame;
  }
  createListener() {
    this.addEventListener("sl-resize", (event) => {
      const ev = event;
      const entries = ev.detail.entries;
      if (entries.length) {
        const height = entries[0].contentRect.height;
        this.frameElement.style.height = `${height}px`;
        this.frameElement.resizeIFrameHeight(height);
      }
    });
    this.addEventListener("editor-change-it", () => {
      this.frame.srcDoc = this.frame.getTemplate({
        head: this.initialHead,
        header: this.initialHeader,
        main: this.compile(this.editor.value),
        footer: this.initialFooter
      });
    });
  }
  async firstUpdated(_changedProperties) {
    this.initialHead += await this.getCode(this.headFilename, "head");
    this.initialHeader += await this.getCode(this.headerFilename, "header");
    this.initialFooter += await this.getCode(this.footerFilename, "footer");
    this.initialMain += await this.getCode(this.mainFilename, "main");
    this.initialCode += await this.getCode(this.codeFilename, "src");
    this.initialCompiledCode += this.compile(this.initialCode);
    console.log(this.initialCompiledCode);
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
    return x(_a || (_a = __template(['\n      <sl-tab-group>\n        <sl-tab slot="nav" panel="script">Script ', '</sl-tab>\n        <sl-tab slot="nav" panel="web">Page Web</sl-tab>\n\n        <sl-tab-panel name="web">\n          <sl-tab-group>\n            <sl-tab slot="nav" panel="page">Page</sl-tab>\n            <sl-tab slot="nav" panel="head">Head</sl-tab>\n            <sl-tab slot="nav" panel="css">Style</sl-tab>\n            <sl-tab slot="nav" panel="header">Header</sl-tab>\n            <sl-tab slot="nav" panel="main">Main</sl-tab>\n            <sl-tab slot="nav" panel="footer">Footer</sl-tab>\n\n            <sl-tab-panel name="page">\n              <code-it language="html" read-only>\n                <script type="enibook/src"><p>hello</p><\/script>\n              </code-it>\n            </sl-tab-panel>\n            <sl-tab-panel name="head">\n              <code-it language="html">\n                <script type="enibook/src">', '<\/script>\n              </code-it>\n            </sl-tab-panel>\n            <sl-tab-panel name="header">\n              <code-it language="html">\n                <script type="enibook/src">', '<\/script>\n              </code-it>\n            </sl-tab-panel>\n            <sl-tab-panel name="footer">\n              <code-it language="html" read-only>\n                <script type="enibook/src">', '<\/script>\n              </code-it>\n            </sl-tab-panel>\n            <sl-tab-panel name="css"></sl-tab-panel>\n          </sl-tab-group>\n        </sl-tab-panel>\n        <sl-tab-panel name="script">\n        </sl-tab-panel>\n      </sl-tab-group>\n      <div part="base" class="playground-it"></div>\n\n    '])), this.language, this.initialHead, this.initialHeader, this.initialCompiledCode);
  }
  reset() {
    throw new Error("Method not implemented.");
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
