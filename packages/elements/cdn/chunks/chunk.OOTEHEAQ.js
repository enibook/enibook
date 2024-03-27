import {
  PlaygroundIt
} from "./chunk.UWRF2NMZ.js";
import {
  t
} from "./chunk.HKVYMXOM.js";
import {
  i
} from "./chunk.FFNE7TVA.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.VPCEBHZA.js";

// src/elements/javascript/javascript.css.ts
var javascript_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }
`;

// src/elements/javascript/javascript.ts
var JavascriptIt = class extends PlaygroundIt {
  constructor() {
    super();
    this.language = "javascript";
    const url = new URL("../elements/javascript/javascript.worker.js", import.meta.url);
    this.worker = new Worker(url, { type: "module" });
  }
  createListener() {
    let that = this;
    this.addEventListener("editor-change-it", () => {
      const message = { script: that.editor.value };
      console.log("before", message);
      that.worker.postMessage(message);
    });
    that.worker.addEventListener("message", (message) => this.handleMessageWorker(message));
  }
  async handleMessageWorker(message) {
    console.log("after", message);
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
JavascriptIt.styles = [
  __superGet(JavascriptIt, JavascriptIt, "styles"),
  javascript_css_default
];
JavascriptIt = __decorateClass([
  t("javascript-it")
], JavascriptIt);

export {
  JavascriptIt
};
