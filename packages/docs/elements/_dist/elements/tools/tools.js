var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { css, html, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/divider/divider';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown';
import '@shoelace-style/shoelace/dist/components/input/input';
import '@shoelace-style/shoelace/dist/components/menu/menu';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip';
// enibook
import { BaseIt } from '../base/base';
// import AlarmIt from '../alarm/alarm';
// import ChronoIt from '../chrono/chrono';
// import TimerIt from '../timer/timer';
import styles from './tools.css?inline';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export class ToolsIt extends BaseIt {
    constructor() {
        super(...arguments);
        this.size = 'small';
        this.menuItems = [];
    }
    firstUpdated(_changedProperties) {
        this.menuItems = [...this.menu.querySelectorAll('sl-menu-item')];
    }
    handleSelectTool(event) {
        const selectedItem = event.detail.item;
        selectedItem.toggleAttribute('checked');
        if (selectedItem.checked) {
            switch (selectedItem.value) {
                case 'all':
                    // this.alarmElement.removeAttribute('hidden')
                    // this.chronoElement.removeAttribute('hidden')
                    // this.timerElement.removeAttribute('hidden')
                    this.clockElement.removeAttribute('hidden');
                    this.colorElement.removeAttribute('hidden');
                    this.themeElement.removeAttribute('hidden');
                    this.menuItems.forEach(item => item.checked = true);
                    break;
                // case 'alarm':
                //   this.alarmElement.removeAttribute('hidden')
                //   break
                // case 'chrono':
                //   this.chronoElement.removeAttribute('hidden')
                //   break
                case 'date':
                    this.clockElement.removeAttribute('hidden');
                    break;
                // case 'timer':
                //   this.timerElement.removeAttribute('hidden')
                //   break
                case 'theme':
                    this.themeElement.removeAttribute('hidden');
                    break;
                case 'color':
                    this.colorElement.removeAttribute('hidden');
                    break;
            }
            if (!this.menuItemAll.checked && this.menuItems.length - 1 === this.menuItems.filter(item => item.checked).length) {
                this.menuItemAll.checked = true;
            }
        }
        else {
            switch (selectedItem.value) {
                case 'all':
                    // this.alarmElement.setAttribute('hidden', '')
                    // this.chronoElement.setAttribute('hidden', '')
                    // this.timerElement.setAttribute('hidden', '')
                    this.clockElement.setAttribute('hidden', '');
                    this.colorElement.setAttribute('hidden', '');
                    this.themeElement.setAttribute('hidden', '');
                    this.menuItems.forEach(item => item.checked = false);
                    break;
                // case 'alarm':
                //   this.alarmElement.setAttribute('hidden', '')
                //   this.menuItemAll.checked = false
                //   break
                // case 'chrono' :
                //   this.chronoElement.setAttribute('hidden', '')
                //   this.menuItemAll.checked = false
                //   break
                case 'date':
                    this.clockElement.setAttribute('hidden', '');
                    this.menuItemAll.checked = false;
                    break;
                // case 'timer' :
                //   this.timerElement.setAttribute('hidden', '')
                //   this.menuItemAll.checked = false
                //   break
                case 'theme':
                    this.themeElement.setAttribute('hidden', '');
                    this.menuItemAll.checked = false;
                    break;
                case 'color':
                    this.colorElement.setAttribute('hidden', '');
                    this.menuItemAll.checked = false;
                    break;
            }
        }
    }
    render() {
        return html `
      <div part="base" class="tools">
        <div class="tools__container">
          <!--
          <alarm-it size=${this.size} hidden></alarm-it>
          <chrono-it size=${this.size} hidden></chrono-it>
          <timer-it size=${this.size} hidden></timer-it>
          -->
          <clock-it size=${this.size} time hidden></clock-it>
          <color-it size=${this.size} hidden></color-it>
          <theme-it size=${this.size} hidden></theme-it>
        </div>
        <sl-dropdown part="dropdown" stay-open-on-select hoist>
          <sl-button size=${this.size} slot="trigger" caret>
            <it-mdi-cog class="dropdown-icon"></it-mdi-cog>
          </sl-button>
          <sl-menu @sl-select=${this.handleSelectTool}>
            <sl-menu-item value="all" type="checkbox">
              Tout sélectionner
            </sl-menu-item>
            <sl-divider></sl-divider>
            <sl-menu-item value="theme" type="checkbox">
              <it-mdi-theme-light-dark slot="prefix"></it-mdi-theme-light-dark>
              Thème
            </sl-menu-item>
            <sl-menu-item value="color" type="checkbox">
              <it-mdi-palette-outline slot="prefix"></it-mdi-palette-outline>
              Couleur
            </sl-menu-item>
            <sl-divider></sl-divider>
            <sl-menu-item value="date" type="checkbox">
              <it-mdi-calendar-clock-outline slot="prefix"></it-mdi-calendar-clock-outline>
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
        return 'Outils';
    }
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
}
ToolsIt.styles = [
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    query('sl-menu')
], ToolsIt.prototype, "menu", void 0);
__decorate([
    query('sl-menu-item[value="all"]')
], ToolsIt.prototype, "menuItemAll", void 0);
__decorate([
    query('.tools__container')
], ToolsIt.prototype, "containerElement", void 0);
__decorate([
    query('.tools__container > clock-it')
], ToolsIt.prototype, "clockElement", void 0);
__decorate([
    query('.tools__container > theme-it')
], ToolsIt.prototype, "themeElement", void 0);
__decorate([
    query('.tools__container > color-it')
], ToolsIt.prototype, "colorElement", void 0);
__decorate([
    property({ type: String, reflect: true })
], ToolsIt.prototype, "size", void 0);
if (customElements && !customElements.get('tools-it')) {
    customElements.define('tools-it', ToolsIt);
}
