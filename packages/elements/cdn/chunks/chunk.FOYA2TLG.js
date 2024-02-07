import {
  BaseIt,
  e,
  n,
  r
} from "./chunk.RU243CBN.js";
import {
  i,
  x
} from "./chunk.YQRSMW6G.js";
import {
  __commonJS,
  __decorateClass,
  __superGet,
  __toESM
} from "./chunk.R3ZK4RPV.js";

// ../../node_modules/.pnpm/debounce@2.0.0/node_modules/debounce/index.js
var require_debounce = __commonJS({
  "../../node_modules/.pnpm/debounce@2.0.0/node_modules/debounce/index.js"(exports, module) {
    function debounce2(function_, wait = 100, options = {}) {
      if (typeof function_ !== "function") {
        throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
      }
      if (wait < 0) {
        throw new RangeError("`wait` must not be negative.");
      }
      const { immediate } = typeof options === "boolean" ? { immediate: options } : options;
      let storedContext;
      let storedArguments;
      let timeoutId;
      let timestamp;
      let result;
      function later() {
        const last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
          timeoutId = setTimeout(later, wait - last);
        } else {
          timeoutId = void 0;
          if (!immediate) {
            const callContext = storedContext;
            const callArguments = storedArguments;
            storedContext = void 0;
            storedArguments = void 0;
            result = function_.apply(callContext, callArguments);
          }
        }
      }
      const debounced = function(...arguments_) {
        if (storedContext && this !== storedContext) {
          throw new Error("Debounced method called with different contexts.");
        }
        storedContext = this;
        storedArguments = arguments_;
        timestamp = Date.now();
        const callNow = immediate && !timeoutId;
        if (!timeoutId) {
          timeoutId = setTimeout(later, wait);
        }
        if (callNow) {
          const callContext = storedContext;
          const callArguments = storedArguments;
          storedContext = void 0;
          storedArguments = void 0;
          result = function_.apply(callContext, callArguments);
        }
        return result;
      };
      debounced.clear = () => {
        if (!timeoutId) {
          return;
        }
        clearTimeout(timeoutId);
        timeoutId = void 0;
      };
      debounced.flush = () => {
        if (!timeoutId) {
          return;
        }
        const callContext = storedContext;
        const callArguments = storedArguments;
        storedContext = void 0;
        storedArguments = void 0;
        result = function_.apply(callContext, callArguments);
        clearTimeout(timeoutId);
        timeoutId = void 0;
      };
      return debounced;
    }
    module.exports.debounce = debounce2;
    module.exports = debounce2;
  }
});

// src/elements/answer-form/answer-form.ts
var import_debounce = __toESM(require_debounce(), 1);

// src/elements/answer-form/answer-form.css.ts
var answer_form_css_default = i`
  :host {
    display: block;
  }
  .answer-form {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
  .answer-form > * {
    flex-grow: 1;
    flex-basis: calc((45rem - 100%) * 999);
  }
  .answer-form > :nth-last-child(n + 3),
  .answer-form > :nth-last-child(n + 3) ~ * {
    flex-basis: 100%;
  }
  .output {
    padding: 0;
    border: 1px solid var(--sl-color-neutral-200);
  }
  .output__iframe {
    object-fit: contain;
    object-position: top;
    width: 100%;
    height: 100%;
    border: none;
    overflow-y: auto
  }
`;

// src/elements/answer-form/answer-form.ts
var _AnswerForm = class _AnswerForm extends BaseIt {
  constructor() {
    super(...arguments);
    this.srcDoc = "";
    this.btnFeedback = false;
    this.preview = false;
  }
  firstUpdated(_changedProperties) {
    const that = this;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target == that.formElement && that.preview) {
          const base = that.formElement.querySelector("[part='base']");
          const baseHeight = base.offsetHeight;
          this.outputElement.style.height = `${baseHeight}px`;
        }
      }
    });
    function observer() {
      resizeObserver.observe(that.formElement);
    }
    window.onresize = (0, import_debounce.default)(observer, 300);
  }
  render() {
    return x`
      <div part="base" class="answer-form">
        <div part="form" class="form" ?border=${!this.preview}>${this.renderForm()}</div>
        <div part="output" class="output" ?hidden=${!this.preview}>${this.renderOutput()}</div>
      </div>
    `;
  }
  renderOutput() {
    return x`
      <iframe
        class="output__iframe"
        allowfullscreen
        name="output"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
        srcdoc=${this.srcDoc}
      >
      </iframe>
    `;
  }
};
/** Style propre à la classe. */
_AnswerForm.styles = [
  __superGet(_AnswerForm, _AnswerForm, "styles"),
  answer_form_css_default
];
__decorateClass([
  e(".form")
], _AnswerForm.prototype, "formElement", 2);
__decorateClass([
  e(".output")
], _AnswerForm.prototype, "outputElement", 2);
__decorateClass([
  e("iframe")
], _AnswerForm.prototype, "frame", 2);
__decorateClass([
  r()
], _AnswerForm.prototype, "srcDoc", 2);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "btn-feedback" })
], _AnswerForm.prototype, "btnFeedback", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], _AnswerForm.prototype, "preview", 2);
var AnswerForm = _AnswerForm;

export {
  AnswerForm
};
