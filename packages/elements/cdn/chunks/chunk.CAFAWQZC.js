import {
  animateTo,
  getAnimation,
  setDefaultAnimation,
  stopAnimations,
  waitForEvent
} from "./chunk.3MHQDE7W.js";
import {
  HasSlotController,
  LocalizeController,
  ShoelaceElement,
  SlIcon,
  __decorateClass,
  component_styles_default,
  n as n2,
  o,
  s,
  watch
} from "./chunk.UTNZY7XJ.js";
import {
  e as e2
} from "./chunk.FWRBNC3J.js";
import {
  e,
  n,
  r
} from "./chunk.V7SARTD6.js";
import {
  i,
  x
} from "./chunk.BLJAKQYI.js";

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BLP64MK.js
var icon_button_styles_default = i`
  ${component_styles_default}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HDLULROG.js
var SlIconButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? s`a` : s`button`;
    return n2`
      <${tag}
        part="base"
        class=${e2({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${o(isLink ? void 0 : this.disabled)}
        type=${o(isLink ? void 0 : "button")}
        href=${o(isLink ? this.href : void 0)}
        target=${o(isLink ? this.target : void 0)}
        download=${o(isLink ? this.download : void 0)}
        rel=${o(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o(this.name)}
          library=${o(this.library)}
          src=${o(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = icon_button_styles_default;
SlIconButton.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  r()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  n()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4GRKCE6W.js
var alert_styles_default = i`
  ${component_styles_default}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MDWWAXW6.js
var toastStack = Object.assign(document.createElement("div"), { className: "sl-toast-stack" });
var SlAlert = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "icon", "suffix");
    this.localize = new LocalizeController(this);
    this.open = false;
    this.closable = false;
    this.variant = "primary";
    this.duration = Infinity;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration);
    }
  }
  handleCloseClick() {
    this.hide();
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      if (this.duration < Infinity) {
        this.restartAutoHide();
      }
      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, "alert.show", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      clearTimeout(this.autoHideTimeout);
      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, "alert.hide", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  /** Shows the alert. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
   * calling this method again. The returned promise will resolve after the alert is hidden.
   */
  async toast() {
    return new Promise((resolve) => {
      if (toastStack.parentElement === null) {
        document.body.append(toastStack);
      }
      toastStack.appendChild(this);
      requestAnimationFrame(() => {
        this.clientWidth;
        this.show();
      });
      this.addEventListener(
        "sl-after-hide",
        () => {
          toastStack.removeChild(this);
          resolve();
          if (toastStack.querySelector("sl-alert") === null) {
            toastStack.remove();
          }
        },
        { once: true }
      );
    });
  }
  render() {
    return x`
      <div
        part="base"
        class=${e2({
      alert: true,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--has-icon": this.hasSlotController.test("icon"),
      "alert--primary": this.variant === "primary",
      "alert--success": this.variant === "success",
      "alert--neutral": this.variant === "neutral",
      "alert--warning": this.variant === "warning",
      "alert--danger": this.variant === "danger"
    })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable ? x`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlAlert.styles = alert_styles_default;
SlAlert.dependencies = { "sl-icon-button": SlIconButton };
__decorateClass([
  e('[part~="base"]')
], SlAlert.prototype, "base", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], SlAlert.prototype, "open", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], SlAlert.prototype, "closable", 2);
__decorateClass([
  n({ reflect: true })
], SlAlert.prototype, "variant", 2);
__decorateClass([
  n({ type: Number })
], SlAlert.prototype, "duration", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlAlert.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("duration")
], SlAlert.prototype, "handleDurationChange", 1);
setDefaultAnimation("alert.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("alert.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.J7TQ3TIA.js
SlAlert.define("sl-alert");

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NHDDOLWD.js
var badge_styles_default = i`
  ${component_styles_default}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Y7HKY46E.js
var SlBadge = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.pill = false;
    this.pulse = false;
  }
  render() {
    return x`
      <span
        part="base"
        class=${e2({
      badge: true,
      "badge--primary": this.variant === "primary",
      "badge--success": this.variant === "success",
      "badge--neutral": this.variant === "neutral",
      "badge--warning": this.variant === "warning",
      "badge--danger": this.variant === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }
};
SlBadge.styles = badge_styles_default;
__decorateClass([
  n({ reflect: true })
], SlBadge.prototype, "variant", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], SlBadge.prototype, "pill", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], SlBadge.prototype, "pulse", 2);

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DCAHTA3L.js
SlBadge.define("sl-badge");
