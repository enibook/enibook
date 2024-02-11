import {
  FrameIt
} from "./chunk.YXPZKRXP.js";
import {
  CodeIt
} from "./chunk.UPVHHU6P.js";
import {
  AnswerForm
} from "./chunk.AHSVXL6C.js";
import {
  e,
  n,
  t
} from "./chunk.ALW4DVUU.js";
import {
  i,
  x
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

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
var PlaygroundIt = class extends AnswerForm {
  constructor() {
    super(...arguments);
    this.initialCode = "";
    this.initialCompiledCode = "";
    this.language = "text";
    this.readOnly = false;
    this.codeFilename = "";
    this.prefixFilename = "";
    this.suffixFilename = "";
  }
  compile(input) {
    let output = "";
    output += input;
    return output;
  }
  createEditor() {
    const initialCode = `<script type="code-it/src">${this.initialCode}<\/script>`;
    const editor = new CodeIt();
    editor.classList.add("playground__editor");
    editor.language = this.language;
    editor.readOnly = this.readOnly;
    editor.lineNumbers = true;
    editor.innerHTML = initialCode;
    return editor;
  }
  createFrame() {
    const initialCode = `<script type="frame-it/main">${this.initialCompiledCode}<\/script>`;
    const frame = new FrameIt();
    frame.classList.add("playground__frame");
    frame.border = true;
    frame.style.resize = "vertical";
    frame.innerHTML = initialCode;
    return frame;
  }
  createListener() {
    this.addEventListener("sl-resize", (event) => {
      const ev = event;
      const entries = ev.detail.entries;
      if (entries.length) {
        const height = entries[0].contentRect.height;
        this.editorElement.style.height = `${height}px`;
        this.frameElement.style.height = `${height}px`;
        this.frameElement.resizeIFrameHeight(height);
      }
    });
    this.addEventListener("editor-change-it", () => {
      this.frame.srcDoc = this.compile(this.editor.value);
    });
  }
  async firstUpdated(_changedProperties) {
    this.initialCode = await this.getCode(this.codeFilename, "src");
    this.initialCompiledCode = this.compile(this.initialCode);
    this.editor = this.createEditor();
    this.frame = this.createFrame();
    this.baseElement.appendChild(this.editor);
    this.baseElement.appendChild(this.frame);
    this.createListener();
  }
  get answer() {
    throw new Error("Method not implemented.");
  }
  render() {
    return x`
      <div part="base" class="playground-it"></div>
    `;
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
  e(".playground__frame")
], PlaygroundIt.prototype, "frameElement", 2);
__decorateClass([
  e(".playground-it")
], PlaygroundIt.prototype, "baseElement", 2);
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
PlaygroundIt = __decorateClass([
  t("playground-it")
], PlaygroundIt);

export {
  PlaygroundIt
};
