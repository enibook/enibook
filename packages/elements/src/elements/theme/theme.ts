// lit
import { css, CSSResultGroup, html, PropertyValueMap, TemplateResult, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
// shoelace
import { SlMenu } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/button/button'
import '@shoelace-style/shoelace/dist/components/divider/divider'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item'
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label'
// enibook
import { BaseIt } from '../base/base';
import styles from './theme.css?inline'

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export class ThemeIt extends BaseIt {
  static styles: CSSResultGroup = [ 
    super.styles,
    unsafeCSS(styles),
    css`@unocss-placeholder`
  ]

  @query('sl-menu') menu!: SlMenu

  @state() theme!: string

  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'small'

  constructor() {
    super()
    this.theme = this.getTheme()
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    // Set the initial theme and sync the UI
    this.setTheme(this.theme);
    this.menu.addEventListener('sl-select', event => {
      const ev = event as CustomEvent
      this.setTheme(ev.detail.item.value)
    })
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.setTheme(this.theme))
    document.addEventListener('keydown', event => {
      const elements = event.composedPath() as Element[]
      if (
        event.key === '\\' &&
        !elements.some(el => ['input', 'textarea'].includes(el.tagName?.toLowerCase()))
      ) {
        event.preventDefault();
        this.setTheme(this.isDark() ? 'light' : 'dark');
      }
    })
  }

  getTheme(): string {
    return localStorage.getItem('theme') || 'system'
  }

  isDark(): boolean {
    if (this.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return this.theme === 'dark';
  }

  render(): TemplateResult {
    return html`
      <sl-dropdown class="theme" hoist>
        <sl-button size=${this.size} slot="trigger" caret>
          ${this.isDark() 
            ? html`<it-mdi-weather-night style="color:var(--sl-color-yellow-500)"></it-mdi-weather-night>`
            : html`<it-mdi-white-balance-sunny style="color:var(--sl-color-yellow-500)"></it-mdi-white-balance-sunny>`
          }
        </sl-button>
        <sl-menu>
          <sl-menu-item type="checkbox" value="light">Clair</sl-menu-item>
          <sl-menu-item type="checkbox" value="dark">Sombre</sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item type="checkbox" value="system">System</sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `
  }

  setTheme(newTheme: string) {
    const noTransitions = Object.assign(document.createElement('style'), {
      textContent: '* { transition: none !important; }'
    });
    this.theme = newTheme;
    localStorage.setItem('theme', this.theme);
    // Update the UI
    [...this.menu.querySelectorAll('sl-menu-item')].map(item => (item.checked = item.getAttribute('value') === this.theme));
    // Toggle the dark mode class without transitions
    document.body.appendChild(noTransitions);
    requestAnimationFrame(() => {
      document.documentElement.classList.toggle('sl-theme-dark', this.isDark());
      document.documentElement.classList.toggle('sl-theme-light', !this.isDark());
      requestAnimationFrame(() => document.body.removeChild(noTransitions));
    });
  }

  override get tagTitle(): string {
    return 'Thème'
  }

  override toAsciidoc(): string {
    throw new Error('Method not implemented.');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'theme-it': ThemeIt;
  }
}

if (customElements && !customElements.get('theme-it')) {
  customElements.define('theme-it', ThemeIt)
}

