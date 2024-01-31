import {
  e as e2
} from "./chunk.DI2BAIG2.js";
import {
  BaseIt,
  e,
  n
} from "./chunk.VZVRWFDB.js";
import {
  i,
  r,
  x
} from "./chunk.73N5W5FM.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/answer-form/answer-form.css?inline
var answer_form_default = {};

// src/elements/answer-form/answer-form.ts
var _AnswerForm = class _AnswerForm extends BaseIt {
  constructor() {
    super(...arguments);
    this.formLegend = "";
    this.outputLegend = "";
    this.btnFeedback = false;
    this.fieldset = false;
    this.noOutput = false;
  }
  render() {
    return x`
      <div part="base" class="answer-form">
        <div part="form" class="form">
          ${this.renderForm()}
        </div>
        <div part="output" class="output" ?hidden=${this.noOutput}>
          ${this.renderOutput()}
        </div>
      </div>
    `;
  }
  renderAnswerOutput() {
    const fieldsetClasses = {
      "form__fieldset": true,
      "rtl": this.dir === "rtl"
    };
    return x`
      <div part="output" class="answer-output">
          ${!this.fieldset ? this.renderOutput() : x`
              <fieldset class=${e2(fieldsetClasses)}>
                <legend class="output__legend">${this.outputLegend}</legend>
                ${this.renderOutput()}
              </fieldset>
              `}
      </div>
      `;
  }
};
_AnswerForm.styles = [
  __superGet(_AnswerForm, _AnswerForm, "styles"),
  r(answer_form_default),
  i`@unocss-placeholder`
];
__decorateClass([
  e("form.answer-form")
], _AnswerForm.prototype, "form", 2);
__decorateClass([
  n({ type: String, reflect: true })
], _AnswerForm.prototype, "formLegend", 2);
__decorateClass([
  n({ type: String, reflect: true })
], _AnswerForm.prototype, "outputLegend", 2);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "btn-feedback" })
], _AnswerForm.prototype, "btnFeedback", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], _AnswerForm.prototype, "fieldset", 2);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "no-output" })
], _AnswerForm.prototype, "noOutput", 2);
var AnswerForm = _AnswerForm;

export {
  AnswerForm
};
