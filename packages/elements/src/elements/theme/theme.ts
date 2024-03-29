// lit
import { type CSSResultGroup, html, type PropertyValueMap, type TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
// shoelace
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js';
// enibook
import { svgIcon } from '../../utilities/icons.js';
import { BaseIt } from '../base/base.js';
import styles from './theme.css.js';

/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
@customElement('theme-it')
export class ThemeIt extends BaseIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  @query('sl-menu') 
  protected menu!: SlMenu;

  @state() 
  protected theme!: string;

  /** Taille du bouton (défaut : `small`) */
  @property({ type: String, reflect: true }) 
  size: 'small' | 'medium' | 'large' = 'small';

  constructor() {
    super();
    this.theme = this.getTheme();
  }

  protected createListeners(): void {
    this.menu.addEventListener('sl-select', (event: CustomEvent<any>) => {
      const ev = event as CustomEvent;
      this.setTheme(ev.detail.item.value);
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.setTheme(this.theme));
    document.addEventListener('keydown', event => {
      const elements = event.composedPath() as Element[];
      if (event.key === '\\' && !elements.some(el => ['input', 'textarea'].includes(el.tagName?.toLowerCase()))) {
        event.preventDefault();
        this.setTheme(this.isDark() ? 'light' : 'dark');
      }
    });
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.setTheme(this.theme);
    this.createListeners()
  }

  /** Thème (défaut : `system`) */
  getTheme(): string {
    return localStorage.getItem('theme') || 'system';
  }

  /** Teste si le thème courant est le thème `dark`. */
  isDark(): boolean {
    if (this.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return this.theme === 'dark';
  }

  protected render(): TemplateResult {
    return html`
      <sl-dropdown class="theme" hoist>
        <sl-button size=${this.size} slot="trigger" caret>
          ${this.isDark()
            ? html`<span style="color:var(--sl-color-yellow-500)">${svgIcon('mdi-weather-night')}</span>`
            : html`<span style="color:var(--sl-color-yellow-500)">${svgIcon('mdi-white-balance-sunny')}</span>`}
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

  /** Change le thème. */
  setTheme(newTheme: string) {
    const noTransitions = Object.assign(document.createElement('style'), {
      textContent: '* { transition: none !important; }'
    });
    this.theme = newTheme;
    localStorage.setItem('theme', this.theme);
    // Update the UI
    [...this.menu.querySelectorAll('sl-menu-item')].map(
      item => (item.checked = item.getAttribute('value') === this.theme)
    );
    // Toggle the dark mode class without transitions
    document.body.appendChild(noTransitions);
    requestAnimationFrame(() => {
      document.documentElement.classList.toggle('sl-theme-dark', this.isDark());
      document.documentElement.classList.toggle('sl-theme-light', !this.isDark());
      requestAnimationFrame(() => document.body.removeChild(noTransitions));
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'theme-it': ThemeIt;
  }
}
