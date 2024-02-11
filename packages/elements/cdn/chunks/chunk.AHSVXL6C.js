import {
  BaseIt,
  n
} from "./chunk.ALW4DVUU.js";
import {
  i
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

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
    this.preview = false;
  }
};
/** Style propre à la classe. */
_AnswerForm.styles = [
  __superGet(_AnswerForm, _AnswerForm, "styles"),
  answer_form_css_default
];
__decorateClass([
  n({ type: Boolean, reflect: true })
], _AnswerForm.prototype, "preview", 2);
var AnswerForm = _AnswerForm;

export {
  AnswerForm
};
