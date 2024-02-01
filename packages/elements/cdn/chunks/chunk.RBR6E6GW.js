import {
  dedentText
} from "./chunk.RDB6EABP.js";
import {
  emit
} from "./chunk.A7AB44PI.js";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
  languages
} from "./chunk.HL4UGBSH.js";
import {
  frenchPhrases
} from "./chunk.N27W2NJJ.js";
import {
  darkTheme
} from "./chunk.4IDR2W55.js";
import {
  lightTheme
} from "./chunk.XUIWESLB.js";
import {
  crelt,
  defaultKeymap,
  getKeymap,
  gotoLine,
  highlightSelectionMatches,
  history,
  historyKeymap,
  indentLess,
  indentMore,
  indentWithTab,
  openSearchPanel,
  redo,
  searchKeymap,
  toggleBlockComment,
  toggleComment,
  undo
} from "./chunk.BOSK27HD.js";
import {
  Compartment,
  Decoration,
  EditorState,
  EditorView,
  Facet,
  RangeSetBuilder,
  StateEffect,
  StateField,
  ViewPlugin,
  WidgetType,
  bracketMatching,
  combineConfig,
  crosshairCursor,
  defaultHighlightStyle,
  drawSelection,
  dropCursor,
  foldGutter,
  foldKeymap,
  getIndentUnit,
  getPanel,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  hoverTooltip,
  indentOnInput,
  indentUnit,
  keymap,
  lineNumbers,
  placeholder,
  rectangularSelection,
  showPanel,
  syntaxHighlighting
} from "./chunk.2LOO7EOW.js";
import {
  AnswerForm
} from "./chunk.NMOEPJGB.js";
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
  __decorateClass as __decorateClass2,
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
  r,
  r2,
  t
} from "./chunk.V7SARTD6.js";
import {
  o as o2,
  svgIcon
} from "./chunk.S4JGPG5E.js";
import {
  i,
  x
} from "./chunk.BLJAKQYI.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

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
__decorateClass2([
  e(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass2([
  r()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "name", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "library", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "src", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "href", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "target", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "download", 2);
__decorateClass2([
  n()
], SlIconButton.prototype, "label", 2);
__decorateClass2([
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
__decorateClass2([
  e('[part~="base"]')
], SlAlert.prototype, "base", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlAlert.prototype, "open", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlAlert.prototype, "closable", 2);
__decorateClass2([
  n({ reflect: true })
], SlAlert.prototype, "variant", 2);
__decorateClass2([
  n({ type: Number })
], SlAlert.prototype, "duration", 2);
__decorateClass2([
  watch("open", { waitUntilFirstUpdate: true })
], SlAlert.prototype, "handleOpenChange", 1);
__decorateClass2([
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
__decorateClass2([
  n({ reflect: true })
], SlBadge.prototype, "variant", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlBadge.prototype, "pill", 2);
__decorateClass2([
  n({ type: Boolean, reflect: true })
], SlBadge.prototype, "pulse", 2);

// ../../node_modules/.pnpm/@shoelace-style+shoelace@2.12.0_@types+react@18.2.48/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DCAHTA3L.js
SlBadge.define("sl-badge");

// ../../node_modules/.pnpm/@codemirror+lint@6.4.2/node_modules/@codemirror/lint/dist/index.js
var SelectedDiagnostic = class {
  constructor(from, to, diagnostic) {
    this.from = from;
    this.to = to;
    this.diagnostic = diagnostic;
  }
};
var LintState = class _LintState {
  constructor(diagnostics, panel, selected) {
    this.diagnostics = diagnostics;
    this.panel = panel;
    this.selected = selected;
  }
  static init(diagnostics, panel, state) {
    let markedDiagnostics = diagnostics;
    let diagnosticFilter = state.facet(lintConfig).markerFilter;
    if (diagnosticFilter)
      markedDiagnostics = diagnosticFilter(markedDiagnostics);
    let ranges = Decoration.set(markedDiagnostics.map((d) => {
      return d.from == d.to || d.from == d.to - 1 && state.doc.lineAt(d.from).to == d.from ? Decoration.widget({
        widget: new DiagnosticWidget(d),
        diagnostic: d
      }).range(d.from) : Decoration.mark({
        attributes: { class: "cm-lintRange cm-lintRange-" + d.severity + (d.markClass ? " " + d.markClass : "") },
        diagnostic: d
      }).range(d.from, d.to);
    }), true);
    return new _LintState(ranges, panel, findDiagnostic(ranges));
  }
};
function findDiagnostic(diagnostics, diagnostic = null, after = 0) {
  let found = null;
  diagnostics.between(after, 1e9, (from, to, { spec }) => {
    if (diagnostic && spec.diagnostic != diagnostic)
      return;
    found = new SelectedDiagnostic(from, to, spec.diagnostic);
    return false;
  });
  return found;
}
function hideTooltip(tr, tooltip) {
  let line = tr.startState.doc.lineAt(tooltip.pos);
  return !!(tr.effects.some((e3) => e3.is(setDiagnosticsEffect)) || tr.changes.touchesRange(line.from, line.to));
}
function maybeEnableLint(state, effects) {
  return state.field(lintState, false) ? effects : effects.concat(StateEffect.appendConfig.of(lintExtensions));
}
var setDiagnosticsEffect = /* @__PURE__ */ StateEffect.define();
var togglePanel = /* @__PURE__ */ StateEffect.define();
var movePanelSelection = /* @__PURE__ */ StateEffect.define();
var lintState = /* @__PURE__ */ StateField.define({
  create() {
    return new LintState(Decoration.none, null, null);
  },
  update(value, tr) {
    if (tr.docChanged) {
      let mapped = value.diagnostics.map(tr.changes), selected = null;
      if (value.selected) {
        let selPos = tr.changes.mapPos(value.selected.from, 1);
        selected = findDiagnostic(mapped, value.selected.diagnostic, selPos) || findDiagnostic(mapped, null, selPos);
      }
      value = new LintState(mapped, value.panel, selected);
    }
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        value = LintState.init(effect.value, value.panel, tr.state);
      } else if (effect.is(togglePanel)) {
        value = new LintState(value.diagnostics, effect.value ? LintPanel.open : null, value.selected);
      } else if (effect.is(movePanelSelection)) {
        value = new LintState(value.diagnostics, value.panel, effect.value);
      }
    }
    return value;
  },
  provide: (f) => [
    showPanel.from(f, (val) => val.panel),
    EditorView.decorations.from(f, (s2) => s2.diagnostics)
  ]
});
var activeMark = /* @__PURE__ */ Decoration.mark({ class: "cm-lintRange cm-lintRange-active" });
function lintTooltip(view, pos, side) {
  let { diagnostics } = view.state.field(lintState);
  let found = [], stackStart = 2e8, stackEnd = 0;
  diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), (from, to, { spec }) => {
    if (pos >= from && pos <= to && (from == to || (pos > from || side > 0) && (pos < to || side < 0))) {
      found.push(spec.diagnostic);
      stackStart = Math.min(from, stackStart);
      stackEnd = Math.max(to, stackEnd);
    }
  });
  let diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
  if (diagnosticFilter)
    found = diagnosticFilter(found);
  if (!found.length)
    return null;
  return {
    pos: stackStart,
    end: stackEnd,
    above: view.state.doc.lineAt(stackStart).to < stackEnd,
    create() {
      return { dom: diagnosticsTooltip(view, found) };
    }
  };
}
function diagnosticsTooltip(view, diagnostics) {
  return crelt("ul", { class: "cm-tooltip-lint" }, diagnostics.map((d) => renderDiagnostic(view, d, false)));
}
var openLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    view.dispatch({ effects: maybeEnableLint(view.state, [togglePanel.of(true)]) });
  let panel = getPanel(view, LintPanel.open);
  if (panel)
    panel.dom.querySelector(".cm-panel-lint ul").focus();
  return true;
};
var closeLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    return false;
  view.dispatch({ effects: togglePanel.of(false) });
  return true;
};
var nextDiagnostic = (view) => {
  let field = view.state.field(lintState, false);
  if (!field)
    return false;
  let sel = view.state.selection.main, next = field.diagnostics.iter(sel.to + 1);
  if (!next.value) {
    next = field.diagnostics.iter(0);
    if (!next.value || next.from == sel.from && next.to == sel.to)
      return false;
  }
  view.dispatch({ selection: { anchor: next.from, head: next.to }, scrollIntoView: true });
  return true;
};
var lintKeymap = [
  { key: "Mod-Shift-m", run: openLintPanel, preventDefault: true },
  { key: "F8", run: nextDiagnostic }
];
var lintConfig = /* @__PURE__ */ Facet.define({
  combine(input) {
    return Object.assign({ sources: input.map((i2) => i2.source) }, combineConfig(input.map((i2) => i2.config), {
      delay: 750,
      markerFilter: null,
      tooltipFilter: null,
      needsRefresh: null
    }, {
      needsRefresh: (a, b) => !a ? b : !b ? a : (u) => a(u) || b(u)
    }));
  }
});
function assignKeys(actions) {
  let assigned = [];
  if (actions)
    actions:
      for (let { name } of actions) {
        for (let i2 = 0; i2 < name.length; i2++) {
          let ch = name[i2];
          if (/[a-zA-Z]/.test(ch) && !assigned.some((c) => c.toLowerCase() == ch.toLowerCase())) {
            assigned.push(ch);
            continue actions;
          }
        }
        assigned.push("");
      }
  return assigned;
}
function renderDiagnostic(view, diagnostic, inPanel) {
  var _a;
  let keys = inPanel ? assignKeys(diagnostic.actions) : [];
  return crelt("li", { class: "cm-diagnostic cm-diagnostic-" + diagnostic.severity }, crelt("span", { class: "cm-diagnosticText" }, diagnostic.renderMessage ? diagnostic.renderMessage() : diagnostic.message), (_a = diagnostic.actions) === null || _a === void 0 ? void 0 : _a.map((action, i2) => {
    let fired = false, click = (e3) => {
      e3.preventDefault();
      if (fired)
        return;
      fired = true;
      let found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
      if (found)
        action.apply(view, found.from, found.to);
    };
    let { name } = action, keyIndex = keys[i2] ? name.indexOf(keys[i2]) : -1;
    let nameElt = keyIndex < 0 ? name : [
      name.slice(0, keyIndex),
      crelt("u", name.slice(keyIndex, keyIndex + 1)),
      name.slice(keyIndex + 1)
    ];
    return crelt("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: click,
      onmousedown: click,
      "aria-label": ` Action: ${name}${keyIndex < 0 ? "" : ` (access key "${keys[i2]})"`}.`
    }, nameElt);
  }), diagnostic.source && crelt("div", { class: "cm-diagnosticSource" }, diagnostic.source));
}
var DiagnosticWidget = class extends WidgetType {
  constructor(diagnostic) {
    super();
    this.diagnostic = diagnostic;
  }
  eq(other) {
    return other.diagnostic == this.diagnostic;
  }
  toDOM() {
    return crelt("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
};
var PanelItem = class {
  constructor(view, diagnostic) {
    this.diagnostic = diagnostic;
    this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16);
    this.dom = renderDiagnostic(view, diagnostic, true);
    this.dom.id = this.id;
    this.dom.setAttribute("role", "option");
  }
};
var LintPanel = class _LintPanel {
  constructor(view) {
    this.view = view;
    this.items = [];
    let onkeydown = (event) => {
      if (event.keyCode == 27) {
        closeLintPanel(this.view);
        this.view.focus();
      } else if (event.keyCode == 38 || event.keyCode == 33) {
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      } else if (event.keyCode == 40 || event.keyCode == 34) {
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      } else if (event.keyCode == 36) {
        this.moveSelection(0);
      } else if (event.keyCode == 35) {
        this.moveSelection(this.items.length - 1);
      } else if (event.keyCode == 13) {
        this.view.focus();
      } else if (event.keyCode >= 65 && event.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic } = this.items[this.selectedIndex], keys = assignKeys(diagnostic.actions);
        for (let i2 = 0; i2 < keys.length; i2++)
          if (keys[i2].toUpperCase().charCodeAt(0) == event.keyCode) {
            let found = findDiagnostic(this.view.state.field(lintState).diagnostics, diagnostic);
            if (found)
              diagnostic.actions[i2].apply(view, found.from, found.to);
          }
      } else {
        return;
      }
      event.preventDefault();
    };
    let onclick = (event) => {
      for (let i2 = 0; i2 < this.items.length; i2++) {
        if (this.items[i2].dom.contains(event.target))
          this.moveSelection(i2);
      }
    };
    this.list = crelt("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown,
      onclick
    });
    this.dom = crelt("div", { class: "cm-panel-lint" }, this.list, crelt("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => closeLintPanel(this.view)
    }, "\xD7"));
    this.update();
  }
  get selectedIndex() {
    let selected = this.view.state.field(lintState).selected;
    if (!selected)
      return -1;
    for (let i2 = 0; i2 < this.items.length; i2++)
      if (this.items[i2].diagnostic == selected.diagnostic)
        return i2;
    return -1;
  }
  update() {
    let { diagnostics, selected } = this.view.state.field(lintState);
    let i2 = 0, needsSync = false, newSelectedItem = null;
    diagnostics.between(0, this.view.state.doc.length, (_start, _end, { spec }) => {
      let found = -1, item;
      for (let j = i2; j < this.items.length; j++)
        if (this.items[j].diagnostic == spec.diagnostic) {
          found = j;
          break;
        }
      if (found < 0) {
        item = new PanelItem(this.view, spec.diagnostic);
        this.items.splice(i2, 0, item);
        needsSync = true;
      } else {
        item = this.items[found];
        if (found > i2) {
          this.items.splice(i2, found - i2);
          needsSync = true;
        }
      }
      if (selected && item.diagnostic == selected.diagnostic) {
        if (!item.dom.hasAttribute("aria-selected")) {
          item.dom.setAttribute("aria-selected", "true");
          newSelectedItem = item;
        }
      } else if (item.dom.hasAttribute("aria-selected")) {
        item.dom.removeAttribute("aria-selected");
      }
      i2++;
    });
    while (i2 < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0)) {
      needsSync = true;
      this.items.pop();
    }
    if (this.items.length == 0) {
      this.items.push(new PanelItem(this.view, {
        from: -1,
        to: -1,
        severity: "info",
        message: this.view.state.phrase("No diagnostics")
      }));
      needsSync = true;
    }
    if (newSelectedItem) {
      this.list.setAttribute("aria-activedescendant", newSelectedItem.id);
      this.view.requestMeasure({
        key: this,
        read: () => ({ sel: newSelectedItem.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
        write: ({ sel, panel }) => {
          let scaleY = panel.height / this.list.offsetHeight;
          if (sel.top < panel.top)
            this.list.scrollTop -= (panel.top - sel.top) / scaleY;
          else if (sel.bottom > panel.bottom)
            this.list.scrollTop += (sel.bottom - panel.bottom) / scaleY;
        }
      });
    } else if (this.selectedIndex < 0) {
      this.list.removeAttribute("aria-activedescendant");
    }
    if (needsSync)
      this.sync();
  }
  sync() {
    let domPos = this.list.firstChild;
    function rm() {
      let prev = domPos;
      domPos = prev.nextSibling;
      prev.remove();
    }
    for (let item of this.items) {
      if (item.dom.parentNode == this.list) {
        while (domPos != item.dom)
          rm();
        domPos = item.dom.nextSibling;
      } else {
        this.list.insertBefore(item.dom, domPos);
      }
    }
    while (domPos)
      rm();
  }
  moveSelection(selectedIndex) {
    if (this.selectedIndex < 0)
      return;
    let field = this.view.state.field(lintState);
    let selection = findDiagnostic(field.diagnostics, this.items[selectedIndex].diagnostic);
    if (!selection)
      return;
    this.view.dispatch({
      selection: { anchor: selection.from, head: selection.to },
      scrollIntoView: true,
      effects: movePanelSelection.of(selection)
    });
  }
  static open(view) {
    return new _LintPanel(view);
  }
};
function svg(content, attrs = `viewBox="0 0 40 40"`) {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`;
}
function underline(color) {
  return svg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`, `width="6" height="3"`);
}
var baseTheme = /* @__PURE__ */ EditorView.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ underline("#d11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ underline("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ underline("#999") },
  ".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ underline("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
});
var lintExtensions = [
  lintState,
  /* @__PURE__ */ EditorView.decorations.compute([lintState], (state) => {
    let { selected, panel } = state.field(lintState);
    return !selected || !panel || selected.from == selected.to ? Decoration.none : Decoration.set([
      activeMark.range(selected.from, selected.to)
    ]);
  }),
  /* @__PURE__ */ hoverTooltip(lintTooltip, { hideOn: hideTooltip }),
  baseTheme
];

// ../../node_modules/.pnpm/codemirror@6.0.1_@lezer+common@1.2.1/node_modules/codemirror/dist/index.js
var basicSetup = /* @__PURE__ */ (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
])();

// ../../node_modules/.pnpm/@replit+codemirror-indentation-markers@6.5.0_@codemirror+language@6.10.0_@codemirror+state@6.4.0_@codemirror+view@6.23.0/node_modules/@replit/codemirror-indentation-markers/dist/index.js
function getVisibleLines(view, state = view.state) {
  const lines = /* @__PURE__ */ new Set();
  for (const { from, to } of view.visibleRanges) {
    let pos = from;
    while (pos <= to) {
      const line = state.doc.lineAt(pos);
      if (!lines.has(line)) {
        lines.add(line);
      }
      pos = line.to + 1;
    }
  }
  return lines;
}
function getCurrentLine(state) {
  const currentPos = state.selection.main.head;
  return state.doc.lineAt(currentPos);
}
function numColumns(str, tabSize) {
  let col = 0;
  loop:
    for (let i2 = 0; i2 < str.length; i2++) {
      switch (str[i2]) {
        case " ": {
          col += 1;
          continue loop;
        }
        case "	": {
          col += tabSize - col % tabSize;
          continue loop;
        }
        case "\r": {
          continue loop;
        }
        default: {
          break loop;
        }
      }
    }
  return col;
}
var indentationMarkerConfig = /* @__PURE__ */ Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      highlightActiveBlock: true,
      hideFirstIndent: false,
      markerType: "fullScope",
      thickness: 1
    });
  }
});
var IndentationMap = class {
  /**
   * @param lines - The set of lines to get the indentation map for.
   * @param state - The {@link EditorState} to derive the indentation map from.
   * @param unitWidth - The width of the editor's indent unit.
   * @param markerType - The type of indentation to use (terminate at end of scope vs last line of code in scope)
   */
  constructor(lines, state, unitWidth, markerType) {
    this.lines = lines;
    this.state = state;
    this.map = /* @__PURE__ */ new Map();
    this.unitWidth = unitWidth;
    this.markerType = markerType;
    for (const line of this.lines) {
      this.add(line);
    }
    if (this.state.facet(indentationMarkerConfig).highlightActiveBlock) {
      this.findAndSetActiveLines();
    }
  }
  /**
   * Checks if the indentation map has an entry for the given line.
   *
   * @param line - The {@link Line} or line number to check for.
   */
  has(line) {
    return this.map.has(typeof line === "number" ? line : line.number);
  }
  /**
   * Returns the {@link IndentEntry} for the given line.
   *
   * Note that this function will throw an error if the line does not exist in the map.
   *
   * @param line - The {@link Line} or line number to get the entry for.
   */
  get(line) {
    const entry = this.map.get(typeof line === "number" ? line : line.number);
    if (!entry) {
      throw new Error("Line not found in indentation map");
    }
    return entry;
  }
  /**
   * Sets the {@link IndentEntry} for the given line.
   *
   * @param line - The {@link Line} to set the entry for.
   * @param col - The visual beginning whitespace width of the line.
   * @param level - The indentation level of the line.
   */
  set(line, col, level) {
    const empty = !line.text.trim().length;
    const entry = { line, col, level, empty };
    this.map.set(entry.line.number, entry);
    return entry;
  }
  /**
   * Adds a line to the indentation map.
   *
   * @param line - The {@link Line} to add to the map.
   */
  add(line) {
    if (this.has(line)) {
      return this.get(line);
    }
    if (!line.length || !line.text.trim().length) {
      if (line.number === 1) {
        return this.set(line, 0, 0);
      }
      if (line.number === this.state.doc.lines) {
        const prev2 = this.closestNonEmpty(line, -1);
        return this.set(line, 0, prev2.level);
      }
      const prev = this.closestNonEmpty(line, -1);
      const next = this.closestNonEmpty(line, 1);
      if (prev.level >= next.level && this.markerType !== "codeOnly") {
        return this.set(line, 0, prev.level);
      }
      if (prev.empty && prev.level === 0 && next.level !== 0) {
        return this.set(line, 0, 0);
      }
      if (next.level > prev.level) {
        return this.set(line, 0, prev.level + 1);
      }
      return this.set(line, 0, next.level);
    }
    const col = numColumns(line.text, this.state.tabSize);
    const level = Math.floor(col / this.unitWidth);
    return this.set(line, col, level);
  }
  /**
   * Finds the closest non-empty line, starting from the given line.
   *
   * @param from - The {@link Line} to start from.
   * @param dir - The direction to search in. Either `1` or `-1`.
   */
  closestNonEmpty(from, dir) {
    let lineNo = from.number + dir;
    while (dir === -1 ? lineNo >= 1 : lineNo <= this.state.doc.lines) {
      if (this.has(lineNo)) {
        const entry = this.get(lineNo);
        if (!entry.empty) {
          return entry;
        }
      }
      const line2 = this.state.doc.line(lineNo);
      if (line2.text.trim().length) {
        const col = numColumns(line2.text, this.state.tabSize);
        const level = Math.floor(col / this.unitWidth);
        return this.set(line2, col, level);
      }
      lineNo += dir;
    }
    const line = this.state.doc.line(dir === -1 ? 1 : this.state.doc.lines);
    return this.set(line, 0, 0);
  }
  /**
   * Finds the state's active block (via the current selection) and sets all
   * the active indent level for the lines in the block.
   */
  findAndSetActiveLines() {
    const currentLine = getCurrentLine(this.state);
    if (!this.has(currentLine)) {
      return;
    }
    let current = this.get(currentLine);
    if (this.has(current.line.number + 1)) {
      const next = this.get(current.line.number + 1);
      if (next.level > current.level) {
        current = next;
      }
    }
    if (this.has(current.line.number - 1)) {
      const prev = this.get(current.line.number - 1);
      if (prev.level > current.level) {
        current = prev;
      }
    }
    if (current.level === 0) {
      return;
    }
    current.active = current.level;
    let start;
    let end;
    for (start = current.line.number; start > 1; start--) {
      if (!this.has(start - 1)) {
        continue;
      }
      const prev = this.get(start - 1);
      if (prev.level < current.level) {
        break;
      }
      prev.active = current.level;
    }
    for (end = current.line.number; end < this.state.doc.lines; end++) {
      if (!this.has(end + 1)) {
        continue;
      }
      const next = this.get(end + 1);
      if (next.level < current.level) {
        break;
      }
      next.active = current.level;
    }
  }
};
function indentTheme(colorOptions) {
  const defaultColors = {
    light: "#F0F1F2",
    dark: "#2B3245",
    activeLight: "#E4E5E6",
    activeDark: "#3C445C"
  };
  let colors = defaultColors;
  if (colorOptions) {
    colors = Object.assign(Object.assign({}, defaultColors), colorOptions);
  }
  return EditorView.baseTheme({
    "&light": {
      "--indent-marker-bg-color": colors.light,
      "--indent-marker-active-bg-color": colors.activeLight
    },
    "&dark": {
      "--indent-marker-bg-color": colors.dark,
      "--indent-marker-active-bg-color": colors.activeDark
    },
    ".cm-line": {
      position: "relative"
    },
    // this pseudo-element is used to draw the indent markers,
    // while still allowing the line to have its own background.
    ".cm-indent-markers::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "var(--indent-markers)",
      pointerEvents: "none",
      zIndex: "-1"
    }
  });
}
function createGradient(markerCssProperty, thickness, indentWidth, startOffset, columns) {
  const gradient = `repeating-linear-gradient(to right, var(${markerCssProperty}) 0 ${thickness}px, transparent ${thickness}px ${indentWidth}ch)`;
  return `${gradient} ${startOffset * indentWidth}.5ch/calc(${indentWidth * columns}ch - 1px) no-repeat`;
}
function makeBackgroundCSS(entry, indentWidth, hideFirstIndent, thickness) {
  const { level, active } = entry;
  if (hideFirstIndent && level === 0) {
    return [];
  }
  const startAt = hideFirstIndent ? 1 : 0;
  const backgrounds = [];
  if (active !== void 0) {
    const markersBeforeActive = active - startAt - 1;
    if (markersBeforeActive > 0) {
      backgrounds.push(createGradient("--indent-marker-bg-color", thickness, indentWidth, startAt, markersBeforeActive));
    }
    backgrounds.push(createGradient("--indent-marker-active-bg-color", thickness, indentWidth, active - 1, 1));
    if (active !== level) {
      backgrounds.push(createGradient("--indent-marker-bg-color", thickness, indentWidth, active, level - active));
    }
  } else {
    backgrounds.push(createGradient("--indent-marker-bg-color", thickness, indentWidth, startAt, level - startAt));
  }
  return backgrounds.join(",");
}
var IndentMarkersClass = class {
  constructor(view) {
    this.view = view;
    this.unitWidth = getIndentUnit(view.state);
    this.currentLineNumber = getCurrentLine(view.state).number;
    this.generate(view.state);
  }
  update(update) {
    const unitWidth = getIndentUnit(update.state);
    const unitWidthChanged = unitWidth !== this.unitWidth;
    if (unitWidthChanged) {
      this.unitWidth = unitWidth;
    }
    const lineNumber = getCurrentLine(update.state).number;
    const lineNumberChanged = lineNumber !== this.currentLineNumber;
    this.currentLineNumber = lineNumber;
    const activeBlockUpdateRequired = update.state.facet(indentationMarkerConfig).highlightActiveBlock && lineNumberChanged;
    if (update.docChanged || update.viewportChanged || unitWidthChanged || activeBlockUpdateRequired) {
      this.generate(update.state);
    }
  }
  generate(state) {
    const builder = new RangeSetBuilder();
    const lines = getVisibleLines(this.view, state);
    const { hideFirstIndent, markerType, thickness } = state.facet(indentationMarkerConfig);
    const map = new IndentationMap(lines, state, this.unitWidth, markerType);
    for (const line of lines) {
      const entry = map.get(line.number);
      if (!(entry === null || entry === void 0 ? void 0 : entry.level)) {
        continue;
      }
      const backgrounds = makeBackgroundCSS(entry, this.unitWidth, hideFirstIndent, thickness);
      builder.add(line.from, line.from, Decoration.line({
        class: "cm-indent-markers",
        attributes: {
          style: `--indent-markers: ${backgrounds}`
        }
      }));
    }
    this.decorations = builder.finish();
  }
};
function indentationMarkers(config = {}) {
  return [
    indentationMarkerConfig.of(config),
    indentTheme(config.colors),
    ViewPlugin.fromClass(IndentMarkersClass, {
      decorations: (v) => v.decorations
    })
  ];
}

// src/elements/code/code.css.ts
var code_css_default = i`
:host {
  display: block;
}
:host:focus {
  border: 1px solid var(--color-primary);
}
.code-it {
  display: flex;
  flex-direction: column;
}
.code-it:hover .menu-button {
  display: block;
}
.editor {
  outline: none;
  border-radius: 0.5em;
}
.editor-base {
  position: relative;
}
.cm-editor {
  border-radius: 0.375rem;
  padding: 4px 0;
}
.dropdown__shortcuts__label {
  display: inline-flex;
  justify-content: space-between;
}
.menu-button {
  display: none;
  position: absolute;
  top: 4px;
  right: 4px;
}
.sl-toast-stack {
  left: auto;
  right: 0;
}
.output__iframe {
  object-fit: contain;
  object-position: top;
  width: 100%;
  height: 100%;
  border: none;
  min-height: 2rem;
}
`;

// src/elements/code/code.ts
var outlineNone = EditorView.theme({
  "&.cm-editor.cm-focused": { outline: "none" }
});
var eventHandler = EditorView.domEventHandlers({
  keyup(_event, view) {
    emit(view.dom, "keyup-mouseup-it");
  },
  mouseup(_event, view) {
    emit(view.dom, "keyup-mouseup-it");
  }
});
var helpKeymap = [
  {
    key: "F1",
    run(view) {
      emit(view.dom, "toggle-toolbar-it");
      return true;
    }
  },
  {
    key: "F4",
    run(view) {
      const lineKeymap = CodeIt.keymap.filter((map) => map.name === "gotoLine");
      if (lineKeymap.length === 1) {
        lineKeymap[0].run(view);
      }
      return true;
    }
  },
  indentWithTab
];
var CodeIt = class extends AnswerForm {
  constructor() {
    super(...arguments);
    // private firstUpdateOk = false
    this._language = "text";
    this._placeholder = "F1: afficher/masquer les barres d'outils et d'informations";
    this._readOnly = false;
    this._indentSize = 2;
    this._theme = "dark";
    this.message = "";
    this.extensions = [];
    this.initialDoc = "";
    this.languageConfig = new Compartment();
    this.lineNumbersConfig = new Compartment();
    this.placeholderConfig = new Compartment();
    this.readOnlyConfig = new Compartment();
    this.indentationConfig = new Compartment();
    this.themeConfig = new Compartment();
    this.cursorLine = 0;
    this.cursorColumn = 0;
    this.srcDoc = "";
    this.lineNumbers = false;
    this.preview = false;
    this.src = "";
    this.toolbar = false;
  }
  get indentSize() {
    return this._indentSize;
  }
  set indentSize(value) {
    if (value !== this._indentSize) {
      this._indentSize = value;
      if (this.theEditor) {
        this.setIndentationExtension();
      }
    }
  }
  get language() {
    return this._language;
  }
  set language(value) {
    if (value !== this._language) {
      this._language = value;
      if (this.theEditor) {
        this.setLanguageExtension();
      }
    }
  }
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    if (value !== this._placeholder) {
      this._placeholder = value;
      if (this.theEditor) {
        this.setPlaceholderExtension();
      }
    }
  }
  get readOnly() {
    return this._readOnly;
  }
  set readOnly(value) {
    if (value !== this._readOnly) {
      this._readOnly = value;
      if (this.theEditor) {
        this.setReadOnlyExtension();
      }
    }
  }
  get theme() {
    return this._theme;
  }
  set theme(value) {
    if (value !== this._theme) {
      this._theme = value;
      if (this.theEditor) {
        this.setThemeExtension();
      }
    }
  }
  get value() {
    let res = this.initialDoc;
    if (this.theEditor) {
      res = this.theEditor.state.doc.toString();
    }
    return res;
  }
  set value(value) {
    if (value !== this.value) {
      if (this.theEditor) {
        this.theEditor.dispatch({
          changes: {
            from: 0,
            to: this.theEditor.state.doc.length,
            insert: value
          }
        });
      }
    }
  }
  /**
   * La réponse de l'éditeur.
   *
   * @returns {string}
   */
  answer() {
    return this.value;
  }
  get indentString() {
    let res = "";
    for (let i2 = 0; i2 < this.indentSize; i2++) {
      res = res.concat(" ");
    }
    return res;
  }
  /**
   * Le nom courant de l'élément.
   *
   * @readonly
   * @type {string}
   */
  get tagTitle() {
    return `Editeur de code ${this.language}`;
  }
  compile(value) {
    return value;
  }
  createListeners() {
    this.addEventListener("keyup-mouseup-it", () => {
      const theState = this.theEditor.state;
      this.cursorLine = theState.doc.lineAt(theState.selection.main.head).number;
      this.cursorColumn = theState.selection.main.head - theState.doc.lineAt(theState.selection.main.head).from;
    });
    this.addEventListener("toggle-toolbar-it", () => {
      this.toolbar = !this.toolbar;
    });
    this.addEventListener("feedback-requested-it", () => {
      this.srcDoc = this.value;
    });
  }
  async fetchContent(src) {
    return await this.fetchSrc(src != null ? src : "");
  }
  async fetchSrc(src) {
    const response = await fetch(src);
    return response.text();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async firstUpdated(_changedProperties) {
    this.formLegend = `Edition de code ${this.language}`;
    this.extensions = this.getInitialExtensions();
    this.theEditor = new EditorView({
      doc: "",
      extensions: this.extensions,
      parent: this.editorContainer,
      root: this.shadowRoot
    });
    this.value = await this.getInitialDoc();
    this.setLanguageExtension();
    this.createListeners();
  }
  getHelpUrl() {
    if (this.isValidLanguage(this.language)) {
      return languages[this.language].helpUrl;
    } else {
      return `https://devdocs.io/${this.language}/`;
    }
  }
  async getInitialDoc() {
    this.initialDoc = "";
    if (this.src) {
      console.log("SRC", this.src);
      await this.fetchContent(this.src).then((response) => {
        console.log("RESP", response);
        this.initialDoc += response;
      });
      console.log("RES", this.initialDoc);
    } else {
      const innerScriptTag = this.querySelector('script[type="enibook"]');
      if (innerScriptTag) {
        const scriptDoc = dedentText(innerScriptTag.innerHTML);
        this.initialDoc += scriptDoc.replace(/&lt;(\/?script)(.*?)&gt;/g, "<$1$2>");
      }
    }
    return this.initialDoc;
  }
  getInitialExtensions() {
    const that = this;
    const res = [
      basicSetup,
      EditorState.phrases.of(frenchPhrases),
      eventHandler,
      indentationMarkers({
        highlightActiveBlock: false,
        hideFirstIndent: true
      }),
      keymap.of(helpKeymap),
      this.indentationConfig.of(indentUnit.of(this.indentString)),
      this.languageConfig.of([]),
      this.lineNumbers ? this.lineNumbersConfig.of(lineNumbers()) : this.lineNumbersConfig.of(lineNumbers({ formatNumber: () => "" })),
      EditorView.lineWrapping,
      outlineNone,
      this.placeholderConfig.of(placeholder(this.placeholder)),
      this.readOnlyConfig.of(EditorState.readOnly.of(this.readOnly)),
      this.themeConfig.of(this.theme === "dark" ? darkTheme : lightTheme),
      EditorView.updateListener.of(function() {
        that.srcDoc = that.compile(that.value);
      })
    ];
    return res;
  }
  /** Liste des langages reconnus par l'éditeur */
  get validLanguages() {
    return Object.keys(languages);
  }
  handleCopyClipboard() {
    navigator.clipboard.writeText(this.value).then(
      () => {
        this.notify("Contenu de l'\xE9diteur copi\xE9 dans le presse-papier.", "success", "it-mdi-check-circle-outline");
      },
      () => {
        this.notify("A priori, interdiction d'\xE9crire dans le presse-papier !", "warning", "it-mdi-alert-outline");
      }
    );
  }
  handleLineNumbers() {
    this.lineNumbers = !this.lineNumbers;
    this.theEditor.dispatch({
      effects: [
        this.lineNumbers ? this.lineNumbersConfig.reconfigure(lineNumbers()) : this.lineNumbersConfig.reconfigure(lineNumbers({ formatNumber: () => "" }))
      ]
    });
  }
  handleSelectCommand(event) {
    const value = event.detail.item.value;
    (0, eval)(`${value}(this.editor)`);
  }
  handleSelectLanguage(event) {
    const item = event.detail.item;
    this.languageMenuItems.forEach((anItem) => {
      anItem.checked = false;
    });
    item.checked = true;
    this.language = item.value;
    this.theEditor.dispatch({
      effects: [
        this.languageConfig.reconfigure(
          languages[this.language].cm
          /*cmLanguages[this.language]*/
        ),
        this.placeholderConfig.reconfigure(placeholder(this.placeholder))
      ]
    });
  }
  /** Teste si un langage fait partie des langages reconnus par l'éditeur. */
  isValidLanguage(language) {
    return Object.keys(languages).includes(language);
  }
  /*
    protected async loadLanguage(lang: string): Promise<LanguageSupport | undefined>{
      const desc = LanguageDescription.matchLanguageName(languages, lang, true)
      const support = await desc?.load()
      return support
    }
  */
  renderForm() {
    return x`
      <div part="base" class="code-it">
        <div part="toolbar">
          ${this.renderToolbar()}
        </div>
        <div class="editor-base">
          <div part="editor" class="editor"></div>
          <div part="menuBtn" class="menu-button">
            ${this.readOnly ? x`<sl-tooltip content="copier dans le presse-papier" hoist><sl-button variant="neutral" size="small" @click=${() => this.handleCopyClipboard()}>${svgIcon("mdi-content-copy")}</sl-button></sl-tooltip>` : x`<sl-tooltip content="activer/désactiver les barres d'outils et d'informations" hoist><sl-button variant="neutral" size="small" @click=${() => {
      this.toolbar = !this.toolbar;
    }}>${svgIcon("mdi-tools")}</sl-button></sl-tooltip>`}
            ${this.btnFeedback ? x`<sl-tooltip content="interprétation" hoist><sl-button variant="neutral" size="small" @click=${() => {
      this.emit("feedback-requested-it");
    }}>${svgIcon("mdi-play")}</sl-button></sl-tooltip>` : x``}
          </div>
        </div>
        <div part="statusbar">
          ${this.renderStatusBar()}
        </div>
      </div>
    `;
  }
  renderCommentButtons() {
    return x`
      <sl-button-group ?hidden=${this.readOnly} label="commentaires">
        <sl-tooltip content="commenter/décommenter la ligne" hoist>
          <sl-button size="small" @click=${() => {
      toggleComment(this.theEditor);
    }}><svg xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;display:inline-block" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5v14h2v2H3V3h4v2H5m15 6H7v2h13V7m0 4Z"/></svg></sl-button>
        </sl-tooltip>
        <sl-tooltip content="commenter/décommenter le bloc" hoist>
          <sl-button size="small" @click=${() => {
      toggleBlockComment(this.theEditor);
    }}>${svgIcon("mdi-format-list-group")}</sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }
  renderHistoryButtons() {
    return x`
      <sl-button-group ?hidden=${this.readOnly} label="historique">
        <sl-tooltip content="annuler toutes les modifications" hoist>
          <sl-button size="small" @click=${() => {
      this.reset();
    }}>${svgIcon("mdi-refresh")}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="annuler la dernière modification" hoist>
          <sl-button size="small" @click=${() => {
      undo(this.theEditor);
    }}>${svgIcon("mdi-undo")}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="rétablir la dernière annulation" hoist>
          <sl-button size="small" @click=${() => {
      redo(this.theEditor);
    }}>${svgIcon("mdi-redo")}</sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }
  renderIndentationButtons() {
    return x`
      <sl-button-group ?hidden=${this.readOnly} label="indentation">
        <sl-tooltip content="indenter" hoist>
          <sl-button size="small" @click=${() => {
      indentMore(this.theEditor);
    }}>${svgIcon("mdi-format-indent-increase")}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="désindenter" hoist>
          <sl-button size="small" @click=${() => {
      indentLess(this.theEditor);
    }}>${svgIcon("mdi-format-indent-decrease")}</sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }
  renderMiscButtons() {
    return x`
      <sl-button-group label="langage et raccourcis clavier">
        <sl-tooltip content="choisir un langage" hoist>
          <sl-dropdown hoist>
            <sl-button slot="trigger" size="small" caret>${this.language ? o2(languages[this.language].logo) : x`${svgIcon("mdi-help")}`}</sl-button>
            <sl-menu class="dropdown__languages" @sl-select=${this.handleSelectLanguage}>
              ${Object.keys(languages).map((language) => x`<sl-menu-item type="checkbox" value="${language}" ?checked=${this.language === language}>${language}<div slot="prefix">${o2(languages[language].logo)}</div></sl-menu-item>`)}
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
        <sl-tooltip content="raccourcis clavier" hoist>
          <sl-dropdown stay-open-on-select hoist ?hidden=${this.readOnly}>
            <sl-button slot="trigger" size="small" caret>${svgIcon("mdi-keyboard")}</sl-button>
            <sl-menu class="dropdown__shortcuts">
              <sl-menu-item disabled>Commande<div slot="suffix">Raccourci clavier</div></sl-menu-item>
              <sl-divider></sl-divider>
              ${CodeIt.keymap.map((map) => x`<sl-menu-item @click=${() => {
      map.run(this.theEditor);
    }}>${map.run.name}<div slot="suffix">${map.key}</div></sl-menu-item>`)}
              <sl-divider></sl-divider>
              <sl-menu-item disabled>Commande<div slot="suffix">Raccourci clavier</div></sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
      </sl-button-group>
      <sl-button-group label="outils">
        <sl-tooltip content="afficher/cacher les numéros de ligne" hoist>
          <sl-button size="small" @click=${() => this.handleLineNumbers()}>${svgIcon("mdi-format-list-numbered")}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="copier dans le presse-papier" hoist>
          <sl-button size="small" @click=${() => this.handleCopyClipboard()}>${svgIcon("mdi-content-copy")}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="changer de thème" hoist>
          <sl-button size="small" @click=${() => this.toggleTheme()}>${svgIcon("mdi-theme-light-dark")}</sl-button>
        </sl-tooltip>
        <sl-tooltip .content=${!this.fullscreen ? "passer en mode plein \xE9cran" : "quitter le mode plein \xE9cran"} hoist>
          <sl-button size="small" @click=${() => this.toggleFullscreen()}>
            ${!this.fullscreen ? x`${svgIcon("mdi-fullscreen")}` : x`${svgIcon("mdi-fullscreen-exit")}`}
          </sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }
  renderOutput() {
    return x`
      <iframe class="output__iframe" allowfullscreen name="output"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
        srcDoc=${this.srcDoc}
      >
      </iframe>
    `;
  }
  renderSearchButtons() {
    return x`
      <sl-button-group label="rechercher/remplacer">
        <sl-tooltip content="${this.readOnly ? "rechercher" : "rechercher/remplacer"}" hoist>
          <sl-button size="small" @click=${() => {
      openSearchPanel(this.theEditor);
    }}>${svgIcon("mdi-find-replace")}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="atteindre la ligne:colonne" hoist>
          <sl-button size="small" @click=${() => {
      gotoLine(this.theEditor);
    }}>${svgIcon("mdi-text-search")}</sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }
  renderStatusBar() {
    return x`
      <toolbar-it class="statusbar" ?hidden=${!this.toolbar}>
        <sl-button-group slot="end" label="informations">
          <sl-tooltip content="numéros de la ligne et de la colonne courantes" hoist>
            <sl-button size="small" variant="neutral">L ${this.cursorLine} - C ${this.cursorColumn}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="indentation en nombre d'espaces" hoist>
            <sl-button size="small" variant="neutral">Indent : ${this.indentSize}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="format de données Mime et lien sur une page d'aide" hoist>
            <sl-button size="small" variant="neutral" href="${this.getHelpUrl()}" target="_blank">${languages[this.language].mime}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="mode de l'éditeur : édition ou lecture seule" hoist>
            <sl-button size="small" variant="neutral">${this.readOnly ? x`lecture seule` : x`édition`}</sl-button>
          </sl-tooltip>      
        </sl-button-group>
      </toolbar-it>
    `;
  }
  renderToolbar() {
    return x`
      <toolbar-it class="toolbar" ?hidden=${!this.toolbar}>
        <div slot="start">
          ${this.renderHistoryButtons()}
          ${this.renderIndentationButtons()}
          ${this.renderCommentButtons()}
          ${this.renderSearchButtons()}
        </div>
        <div slot="end">
          ${this.renderMiscButtons()}
        </div>
      </toolbar-it>
    `;
  }
  /**
   * Réinitialiser l'éditeur.
   *
   * @memberof CodeEditIt
   */
  reset() {
    this.value = this.initialDoc;
  }
  async setLanguageExtension() {
    const langs = Object.keys(languages);
    if (langs.includes(this.language)) {
      this.theEditor.dispatch({
        effects: [
          this.languageConfig.reconfigure(languages[this.language].cm)
        ]
      });
    }
  }
  setPlaceholderExtension() {
    this.theEditor.dispatch({
      effects: [
        this.placeholderConfig.reconfigure(placeholder(this.placeholder))
      ]
    });
  }
  setReadOnlyExtension() {
    this.theEditor.dispatch({
      effects: [
        this.readOnlyConfig.reconfigure(EditorState.readOnly.of(this.readOnly))
      ]
    });
  }
  setIndentationExtension() {
    this.theEditor.dispatch({
      effects: [
        this.indentationConfig.reconfigure(indentUnit.of(this.indentString))
      ]
    });
  }
  setThemeExtension() {
    this.theEditor.dispatch({
      effects: [
        this.themeConfig.reconfigure(this.theme === "dark" ? darkTheme : lightTheme)
      ]
    });
  }
  /** Syntaxe asciidoc équivalente */
  toAsciidoc() {
    return "Editeur de code";
  }
  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    this.setThemeExtension();
  }
  updated(changedProperties) {
    if (changedProperties.has("fieldset")) {
      this.editorContainer.innerHTML = "";
      this.editorContainer.appendChild(this.theEditor.dom);
    }
  }
};
CodeIt.styles = [
  __superGet(CodeIt, CodeIt, "styles"),
  code_css_default
];
/** @ignore */
CodeIt.keymap = getKeymap();
__decorateClass([
  r()
], CodeIt.prototype, "message", 2);
__decorateClass([
  e(".editor")
], CodeIt.prototype, "editorContainer", 2);
__decorateClass([
  e(".output__iframe")
], CodeIt.prototype, "iframe", 2);
__decorateClass([
  e("sl-menu.dropdown__languages")
], CodeIt.prototype, "menuLanguages", 2);
__decorateClass([
  r2("sl-menu.dropdown__languages > sl-menu-item")
], CodeIt.prototype, "languageMenuItems", 2);
__decorateClass([
  r()
], CodeIt.prototype, "cursorLine", 2);
__decorateClass([
  r()
], CodeIt.prototype, "cursorColumn", 2);
__decorateClass([
  r()
], CodeIt.prototype, "srcDoc", 2);
__decorateClass([
  n({ type: Number, reflect: true, attribute: "indent-size" })
], CodeIt.prototype, "indentSize", 1);
__decorateClass([
  n({ type: String, reflect: true })
], CodeIt.prototype, "language", 1);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "line-numbers" })
], CodeIt.prototype, "lineNumbers", 2);
__decorateClass([
  n({ type: String, reflect: true })
], CodeIt.prototype, "placeholder", 1);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CodeIt.prototype, "preview", 2);
__decorateClass([
  n({ type: Boolean, reflect: true, attribute: "read-only" })
], CodeIt.prototype, "readOnly", 1);
__decorateClass([
  n({ type: String, reflect: true })
], CodeIt.prototype, "src", 2);
__decorateClass([
  n({ type: String, reflect: true })
], CodeIt.prototype, "theme", 1);
__decorateClass([
  n({ type: Boolean, reflect: true })
], CodeIt.prototype, "toolbar", 2);
__decorateClass([
  n({ attribute: false })
], CodeIt.prototype, "value", 1);
CodeIt = __decorateClass([
  t("code-it")
], CodeIt);

export {
  CodeIt
};
