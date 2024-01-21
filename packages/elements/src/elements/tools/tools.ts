// lit
import { css, CSSResultGroup, html, PropertyValueMap, TemplateResult, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/button/button'
import '@shoelace-style/shoelace/dist/components/divider/divider'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown'
import '@shoelace-style/shoelace/dist/components/input/input'
import '@shoelace-style/shoelace/dist/components/menu/menu'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item'
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip'
import type SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js'
import type SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
// enibook
import { BaseIt } from '../base/base';
import { ClockIt } from '../clock/clock';
import { ColorIt } from '../color/color';
import { ThemeIt } from '../theme/theme';

// import AlarmIt from '../alarm/alarm';
// import ChronoIt from '../chrono/chrono';
// import TimerIt from '../timer/timer';
import styles from './tools.css?inline'

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
 export class ToolsIt extends BaseIt {
  static styles: CSSResultGroup = [
    super.styles,
    unsafeCSS(styles),
    css`@unocss-placeholder`
  ]

  @query('sl-menu') menu!: SlMenu

  @query('sl-menu-item[value="all"]') menuItemAll!: SlMenuItem

  @query('.tools__container') containerElement!: HTMLElement

  // @query('.tools__container > alarm-it') alarmElement!: AlarmIt

  // @query('.tools__container > chrono-it') chronoElement!: ChronoIt

  @query('.tools__container > clock-it') clockElement!: ClockIt

  // @query('.tools__container > timer-it') timerElement!: TimerIt

  @query('.tools__container > theme-it') themeElement!: ThemeIt

  @query('.tools__container > color-it') colorElement!: ColorIt

  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'small'

  public menuItems: SlMenuItem[] = []

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.menuItems = [...this.menu.querySelectorAll('sl-menu-item')] as SlMenuItem[]
  }

  handleSelectTool(event: CustomEvent) {
    const selectedItem = event.detail.item as SlMenuItem
    selectedItem.toggleAttribute('checked')
    if (selectedItem.checked) {
      switch (selectedItem.value) {
        case 'all':
          // this.alarmElement.removeAttribute('hidden')
          // this.chronoElement.removeAttribute('hidden')
          // this.timerElement.removeAttribute('hidden')

          this.clockElement.removeAttribute('hidden')
          this.colorElement.removeAttribute('hidden')
          this.themeElement.removeAttribute('hidden')
          this.menuItems.forEach(item => item.checked = true)
          break
        // case 'alarm':
        //   this.alarmElement.removeAttribute('hidden')
        //   break
        // case 'chrono':
        //   this.chronoElement.removeAttribute('hidden')
        //   break
        case 'date':
          this.clockElement.removeAttribute('hidden')
          break
        // case 'timer':
        //   this.timerElement.removeAttribute('hidden')
        //   break
        case 'theme':
          this.themeElement.removeAttribute('hidden')
          break
        case 'color':
          this.colorElement.removeAttribute('hidden')
          break
      }
      if (!this.menuItemAll.checked && this.menuItems.length - 1 === this.menuItems.filter(item => item.checked).length) {
        this.menuItemAll.checked = true
      }
    } else {
      switch (selectedItem.value) {
        case 'all':
          // this.alarmElement.setAttribute('hidden', '')
          // this.chronoElement.setAttribute('hidden', '')
          // this.timerElement.setAttribute('hidden', '')

          this.clockElement.setAttribute('hidden', '')
          this.colorElement.setAttribute('hidden', '')
          this.themeElement.setAttribute('hidden', '')
          this.menuItems.forEach(item => item.checked = false)
          break
        // case 'alarm':
        //   this.alarmElement.setAttribute('hidden', '')
        //   this.menuItemAll.checked = false
        //   break
        // case 'chrono' :
        //   this.chronoElement.setAttribute('hidden', '')
        //   this.menuItemAll.checked = false
        //   break
        case 'date':
          this.clockElement.setAttribute('hidden', '')
          this.menuItemAll.checked = false
          break
        // case 'timer' :
        //   this.timerElement.setAttribute('hidden', '')
        //   this.menuItemAll.checked = false
        //   break
        case 'theme':
          this.themeElement.setAttribute('hidden', '')
          this.menuItemAll.checked = false
          break
        case 'color':
          this.colorElement.setAttribute('hidden', '')
          this.menuItemAll.checked = false
          break
        }
    }
  }

  render(): TemplateResult {
    return html`
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
    `
  }

  override get tagTitle(): string {
    return 'Outils'
  }

  override toAsciidoc(): string {
    throw new Error('Method not implemented.');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tools-it': ToolsIt;
  }
}

if (customElements && !customElements.get('tools-it')) {
  customElements.define('tools-it', ToolsIt)
}
