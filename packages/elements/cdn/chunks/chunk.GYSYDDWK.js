import {
  BaseIt,
  e,
  n,
  r as r2,
  t
} from "./chunk.VZVRWFDB.js";
import {
  svgIcon
} from "./chunk.AZTRWFZJ.js";
import {
  i,
  r,
  x
} from "./chunk.73N5W5FM.js";
import {
  __decorateClass,
  __superGet
} from "./chunk.R3ZK4RPV.js";

// src/elements/theme/theme.css?inline
var theme_default = {};

// src/elements/theme/theme.ts
var ThemeIt = class extends BaseIt {
  constructor() {
    super();
    this.size = "small";
    this.theme = this.getTheme();
  }
  firstUpdated(_changedProperties) {
    this.setTheme(this.theme);
    this.menu.addEventListener("sl-select", (event) => {
      const ev = event;
      this.setTheme(ev.detail.item.value);
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => this.setTheme(this.theme));
    document.addEventListener("keydown", (event) => {
      const elements = event.composedPath();
      if (event.key === "\\" && !elements.some((el) => {
        var _a;
        return ["input", "textarea"].includes((_a = el.tagName) == null ? void 0 : _a.toLowerCase());
      })) {
        event.preventDefault();
        this.setTheme(this.isDark() ? "light" : "dark");
      }
    });
  }
  getTheme() {
    return localStorage.getItem("theme") || "system";
  }
  isDark() {
    if (this.theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return this.theme === "dark";
  }
  render() {
    return x`
      <sl-dropdown class="theme" hoist>
        <sl-button size=${this.size} slot="trigger" caret>
          ${this.isDark() ? x`<span style="color:var(--sl-color-yellow-500)">${svgIcon("mdi-weather-night")}</span>` : x`<span style="color:var(--sl-color-yellow-500)">${svgIcon("mdi-white-balance-sunny")}</span>`}
        </sl-button>
        <sl-menu>
          <sl-menu-item type="checkbox" value="light">Clair</sl-menu-item>
          <sl-menu-item type="checkbox" value="dark">Sombre</sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item type="checkbox" value="system">System</sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `;
  }
  setTheme(newTheme) {
    const noTransitions = Object.assign(document.createElement("style"), {
      textContent: "* { transition: none !important; }"
    });
    this.theme = newTheme;
    localStorage.setItem("theme", this.theme);
    [...this.menu.querySelectorAll("sl-menu-item")].map((item) => item.checked = item.getAttribute("value") === this.theme);
    document.body.appendChild(noTransitions);
    requestAnimationFrame(() => {
      document.documentElement.classList.toggle("sl-theme-dark", this.isDark());
      document.documentElement.classList.toggle("sl-theme-light", !this.isDark());
      requestAnimationFrame(() => document.body.removeChild(noTransitions));
    });
  }
  get tagTitle() {
    return "Th\xE8me";
  }
  toAsciidoc() {
    throw new Error("Method not implemented.");
  }
};
ThemeIt.styles = [
  __superGet(ThemeIt, ThemeIt, "styles"),
  r(theme_default),
  i`@unocss-placeholder`
];
__decorateClass([
  e("sl-menu")
], ThemeIt.prototype, "menu", 2);
__decorateClass([
  r2()
], ThemeIt.prototype, "theme", 2);
__decorateClass([
  n({ type: String, reflect: true })
], ThemeIt.prototype, "size", 2);
ThemeIt = __decorateClass([
  t("theme-it")
], ThemeIt);

export {
  ThemeIt
};
