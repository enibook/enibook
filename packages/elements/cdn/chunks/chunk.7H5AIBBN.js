import {
  PlaygroundIt
} from "./chunk.UWRF2NMZ.js";
import {
  e,
  t
} from "./chunk.HKVYMXOM.js";
import {
  i
} from "./chunk.FFNE7TVA.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.VPCEBHZA.js";

// src/elements/typescript/typescript.css.ts
var typescript_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }
`;

// src/elements/typescript/typescript.ts
var TypescriptIt = class extends PlaygroundIt {
  constructor() {
    super();
    this.language = "typescript";
    const url = new URL("../elements/typescript/typescript.worker.js", import.meta.url);
    this.worker = new Worker(url, { type: "module" });
  }
  createListener() {
    this.addEventListener("editor-change-it", () => {
      const message = { script: this.editor.value };
      this.worker.postMessage(message);
    });
    this.worker.addEventListener("message", (message) => this.handleMessageWorker(message));
  }
  async handleMessageWorker(message) {
    let consoleOutput = "";
    let output = "";
    if (message.data.error) {
      consoleOutput += `<span color-red>${message.data.error}</span>`;
    } else {
      if (message.data.debug.length) {
        consoleOutput += '<ul id="consoleOutput" ps-2 list-none my-px font-mono text-xs>';
        for (const msg of message.data.debug) {
          consoleOutput += "<li border-b-1 border-b-solid border-gray-200 hover:bg-gray-200 p-0.5>" + msg + "</li>";
        }
        consoleOutput += "</ul>";
      }
      if (message.data.result) {
        output += `<div id="output" class="output">${message.data.result}</div>`;
      }
    }
    console.log("handleMessageWorker", output, consoleOutput);
    await this.updateFrame(output, consoleOutput);
  }
};
/** Style propre à la classe. */
TypescriptIt.styles = [
  __superGet(TypescriptIt, TypescriptIt, "styles"),
  typescript_css_default
];
__decorateClass([
  e('script[type="typescript/worker"]')
], TypescriptIt.prototype, "scriptWorker", 2);
TypescriptIt = __decorateClass([
  t("typescript-it")
], TypescriptIt);

export {
  TypescriptIt
};
