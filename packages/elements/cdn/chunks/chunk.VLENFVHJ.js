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

// src/elements/python/python.css.ts
var python_css_default = i`
  :host {
    display: block;
    margin-bottom: 0.5em;
  }
`;

// src/elements/python/python.ts
var PythonIt = class extends PlaygroundIt {
  constructor() {
    super();
    this.language = "python";
    this.initialHead = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.12.0/brython.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.12.0/brython_stdlib.min.js"><\/script>
`;
  }
  get answer() {
    throw new Error("Method not implemented.");
  }
  reset() {
    throw new Error("Method not implemented.");
  }
};
/** Style propre à la classe. */
PythonIt.styles = [__superGet(PythonIt, PythonIt, "styles"), python_css_default];
PythonIt = __decorateClass([
  t("python-it")
], PythonIt);

export {
  PythonIt
};
