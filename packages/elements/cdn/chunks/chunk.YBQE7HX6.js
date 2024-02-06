import {
  require_debounce
} from "./chunk.R37S4BYE.js";
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
  __decorateClass,
  __superGet,
  __toESM
} from "./chunk.R3ZK4RPV.js";

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
