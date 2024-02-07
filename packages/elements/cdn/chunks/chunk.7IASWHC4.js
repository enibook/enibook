import {
  defaultValue,
  form_control_styles_default,
  l
} from "./chunk.XIVZBJVP.js";
import {
  FormControlController,
  HasSlotController,
  LocalizeController,
  SlIcon,
  e as e2,
  o
} from "./chunk.OUIWCIOG.js";
import {
  ShoelaceElement,
  __decorateClass as __decorateClass2,
  component_styles_default,
  watch
} from "./chunk.MOWIAP3E.js";
import {
  BaseIt,
  e,
  n,
  r,
  t
} from "./chunk.RU243CBN.js";
import {
  i,
  svgIcon,
  x
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5NGT6QDY.js
var input_styles_default = i`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear:not(.input__clear--visible) {
    visibility: hidden;
  }

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JFHOPD3M.js
var SlInput = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController(this);
    this.hasFocus = false;
    this.title = "";
    this.__numberInput = Object.assign(document.createElement("input"), { type: "number" });
    this.__dateInput = Object.assign(document.createElement("input"), { type: "date" });
    this.type = "text";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
  }
  //
  // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
  // can be set before the component is rendered.
  //
  /**
   * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
   */
  get valueAsDate() {
    var _a;
    this.__dateInput.type = this.type;
    this.__dateInput.value = this.value;
    return ((_a = this.input) == null ? void 0 : _a.valueAsDate) || this.__dateInput.valueAsDate;
  }
  set valueAsDate(newValue) {
    this.__dateInput.type = this.type;
    this.__dateInput.valueAsDate = newValue;
    this.value = this.__dateInput.value;
  }
  /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
  get valueAsNumber() {
    var _a;
    this.__numberInput.value = this.value;
    return ((_a = this.input) == null ? void 0 : _a.valueAsNumber) || this.__numberInput.valueAsNumber;
  }
  set valueAsNumber(newValue) {
    this.__numberInput.valueAsNumber = newValue;
    this.value = this.__numberInput.value;
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    this.value = "";
    this.emit("sl-clear");
    this.emit("sl-input");
    this.emit("sl-change");
    this.input.focus();
    event.stopPropagation();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.formControlController.updateValidity();
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formControlController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.formControlController.updateValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start != null ? start : this.input.selectionStart;
    const selectionEnd = end != null ? end : this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
    const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
    return x`
      <div
        part="form-control"
        class=${e2({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e2({
      input: true,
      // Sizes
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      // States
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons
    })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${o(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o(this.placeholder)}
              minlength=${o(this.minlength)}
              maxlength=${o(this.maxlength)}
              min=${o(this.min)}
              max=${o(this.max)}
              step=${o(this.step)}
              .value=${l(this.value)}
              autocapitalize=${o(this.autocapitalize)}
              autocomplete=${o(this.autocomplete)}
              autocorrect=${o(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o(this.pattern)}
              enterkeyhint=${o(this.enterkeyhint)}
              inputmode=${o(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${hasClearIcon ? x`
                  <button
                    part="clear-button"
                    class=${e2({
      input__clear: true,
      "input__clear--visible": isClearIconVisible
    })}
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? x`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? x`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : x`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = input_styles_default;
SlInput.dependencies = { "sl-icon": SlIcon };
__decorateClass2([
  e(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass2([
  r()
], SlInput.prototype, "hasFocus", 2);
__decorateClass2([
  n()
], SlInput.prototype, "title", 2);
__decorateClass2([
  n({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass2([
  n()
], SlInput.prototype, "name", 2);
__decorateClass2([
  n()
], SlInput.prototype, "value", 2);
__decorateClass2([
  defaultValue()
], SlInput.prototype, "defaultValue", 2);
__decorateClass2([
  n({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass2([
  n()
], SlInput.prototype, "label", 2);
__decorateClass2([
  n({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass2([
  n({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass2([
  n()
], SlInput.prototype, "placeholder", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass2([
  n({ attribute: "password-toggle", type: Boolean })
], SlInput.prototype, "passwordToggle", 2);
__decorateClass2([
  n({ attribute: "password-visible", type: Boolean })
], SlInput.prototype, "passwordVisible", 2);
__decorateClass2([
  n({ attribute: "no-spin-buttons", type: Boolean })
], SlInput.prototype, "noSpinButtons", 2);
__decorateClass2([
  n({ reflect: true })
], SlInput.prototype, "form", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass2([
  n()
], SlInput.prototype, "pattern", 2);
__decorateClass2([
  n({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass2([
  n({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass2([
  n()
], SlInput.prototype, "min", 2);
__decorateClass2([
  n()
], SlInput.prototype, "max", 2);
__decorateClass2([
  n()
], SlInput.prototype, "step", 2);
__decorateClass2([
  n()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass2([
  n()
], SlInput.prototype, "autocorrect", 2);
__decorateClass2([
  n()
], SlInput.prototype, "autocomplete", 2);
__decorateClass2([
  n({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass2([
  n()
], SlInput.prototype, "enterkeyhint", 2);
__decorateClass2([
  n({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlInput.prototype, "spellcheck", 2);
__decorateClass2([
  n()
], SlInput.prototype, "inputmode", 2);
__decorateClass2([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass2([
  watch("step", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleStepChange", 1);
__decorateClass2([
  watch("value", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleValueChange", 1);

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.13.1_@types+react@18.2.51/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.H3ASCB7F.js
SlInput.define("sl-input");

// src/elements/tools/tools.css.ts
var tools_css_default = i`
  :host {
    display: inline-block;
  }
  .tools {
    display: inline-flex;
  }
  .tools__container {
    display: inline-flex;
    justify-content: flex-end;
    /*gap: var(--sl-spacing-small);*/
  }
`;

// src/elements/tools/tools.ts
var ToolsIt = class extends BaseIt {
  constructor() {
    super(...arguments);
    this.size = "small";
    this.menuItems = [];
  }
  firstUpdated(_changedProperties) {
    this.menuItems = [...this.menu.querySelectorAll("sl-menu-item")];
  }
  handleSelectTool(event) {
    const selectedItem = event.detail.item;
    selectedItem.toggleAttribute("checked");
    if (selectedItem.checked) {
      switch (selectedItem.value) {
        case "all":
          this.clockElement.removeAttribute("hidden");
          this.colorElement.removeAttribute("hidden");
          this.themeElement.removeAttribute("hidden");
          this.menuItems.forEach((item) => item.checked = true);
          break;
        case "date":
          this.clockElement.removeAttribute("hidden");
          break;
        case "theme":
          this.themeElement.removeAttribute("hidden");
          break;
        case "color":
          this.colorElement.removeAttribute("hidden");
          break;
      }
      if (!this.menuItemAll.checked && this.menuItems.length - 1 === this.menuItems.filter((item) => item.checked).length) {
        this.menuItemAll.checked = true;
      }
    } else {
      switch (selectedItem.value) {
        case "all":
          this.clockElement.setAttribute("hidden", "");
          this.colorElement.setAttribute("hidden", "");
          this.themeElement.setAttribute("hidden", "");
          this.menuItems.forEach((item) => item.checked = false);
          break;
        case "date":
          this.clockElement.setAttribute("hidden", "");
          this.menuItemAll.checked = false;
          break;
        case "theme":
          this.themeElement.setAttribute("hidden", "");
          this.menuItemAll.checked = false;
          break;
        case "color":
          this.colorElement.setAttribute("hidden", "");
          this.menuItemAll.checked = false;
          break;
      }
    }
  }
  render() {
    return x`
      <div part="base" class="tools">
        <div class="tools__container">
          <!--
          <alarm-it size=${this.size} hidden></alarm-it>
          <chrono-it size=${this.size} hidden></chrono-it>
          <timer-it size=${this.size} hidden></timer-it>
          -->
          <clock-it size=${this.size} date time hidden></clock-it>
          <color-it size=${this.size} hidden></color-it>
          <theme-it size=${this.size} hidden></theme-it>
        </div>
        <sl-dropdown part="dropdown" stay-open-on-select hoist>
          <sl-button size=${this.size} slot="trigger" caret> ${svgIcon("mdi-cog")} </sl-button>
          <sl-menu @sl-select=${this.handleSelectTool}>
            <sl-menu-item value="all" type="checkbox"> Tout sélectionner </sl-menu-item>
            <sl-divider></sl-divider>
            <sl-menu-item value="theme" type="checkbox">
              <span slot="prefix">${svgIcon("mdi-theme-light-dark")}</span>
              Thème
            </sl-menu-item>
            <sl-menu-item value="color" type="checkbox">
              <span slot="prefix">${svgIcon("mdi-palette-outline")}</span>
              Couleur
            </sl-menu-item>
            <sl-divider></sl-divider>
            <sl-menu-item value="date" type="checkbox">
              <span slot="prefix">${svgIcon("mdi-calendar-clock-outline")}</span>
              Date et heure
            </sl-menu-item>
            <!--
            <sl-menu-item value="chrono">
              <div slot="prefix" class="it-mdi-timer-outline"></div>
              Chronomètre
            </sl-menu-item>
            <sl-menu-item value="timer">
              <div slot="prefix" class="it-mdi-camera-timer"></div>
              Minuteur
            </sl-menu-item>
            <sl-menu-item value="alarm">
              <div slot="prefix" class="it-mdi-bell-outline"></div>
              Alarme
            </sl-menu-item>
            -->
          </sl-menu>
        </sl-dropdown>
      </div>
    `;
  }
};
/** Style propre à la classe. */
ToolsIt.styles = [__superGet(ToolsIt, ToolsIt, "styles"), tools_css_default];
__decorateClass([
  e("sl-menu")
], ToolsIt.prototype, "menu", 2);
__decorateClass([
  e('sl-menu-item[value="all"]')
], ToolsIt.prototype, "menuItemAll", 2);
__decorateClass([
  e(".tools__container")
], ToolsIt.prototype, "containerElement", 2);
__decorateClass([
  e(".tools__container > clock-it")
], ToolsIt.prototype, "clockElement", 2);
__decorateClass([
  e(".tools__container > theme-it")
], ToolsIt.prototype, "themeElement", 2);
__decorateClass([
  e(".tools__container > color-it")
], ToolsIt.prototype, "colorElement", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ToolsIt.prototype, "size", 2);
ToolsIt = __decorateClass([
  t("tools-it")
], ToolsIt);

export {
  ToolsIt
};
