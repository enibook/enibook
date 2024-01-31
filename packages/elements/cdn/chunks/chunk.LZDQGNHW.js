import {
  BaseIt,
  e,
  n,
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

// src/elements/tools/tools.css?inline
var tools_default = {};

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
          <sl-button size=${this.size} slot="trigger" caret>
            ${svgIcon("mdi-cog")}
          </sl-button>
          <sl-menu @sl-select=${this.handleSelectTool}>
            <sl-menu-item value="all" type="checkbox">
              Tout sélectionner
            </sl-menu-item>
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
  get tagTitle() {
    return "Outils";
  }
  toAsciidoc() {
    throw new Error("Method not implemented.");
  }
};
ToolsIt.styles = [
  __superGet(ToolsIt, ToolsIt, "styles"),
  r(tools_default),
  i`@unocss-placeholder`
];
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
