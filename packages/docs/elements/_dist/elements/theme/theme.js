var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
// lit
import { css, html, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/divider/divider';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label';
// enibook
import { BaseIt } from '../base/base';
import styles from './theme.css?inline';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export class ThemeIt extends (_b = BaseIt) {
    constructor() {
        super();
        this.size = 'small';
        this.theme = this.getTheme();
    }
    firstUpdated(_changedProperties) {
        // Set the initial theme and sync the UI
        this.setTheme(this.theme);
        this.menu.addEventListener('sl-select', event => {
            const ev = event;
            this.setTheme(ev.detail.item.value);
        });
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.setTheme(this.theme));
        document.addEventListener('keydown', event => {
            const elements = event.composedPath();
            if (event.key === '\\' &&
                !elements.some(el => ['input', 'textarea'].includes(el.tagName?.toLowerCase()))) {
                event.preventDefault();
                this.setTheme(this.isDark() ? 'light' : 'dark');
            }
        });
    }
    getTheme() {
        return localStorage.getItem('theme') || 'system';
    }
    isDark() {
        if (this.theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return this.theme === 'dark';
    }
    render() {
        return html `
      <sl-dropdown class="theme" hoist>
        <sl-button size=${this.size} slot="trigger" caret>
          ${this.isDark()
            ? html `<it-mdi-weather-night style="color:var(--sl-color-yellow-500)"></it-mdi-weather-night>`
            : html `<it-mdi-white-balance-sunny style="color:var(--sl-color-yellow-500)"></it-mdi-white-balance-sunny>`}
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
    get tagTitle() {
        return 'Thème';
    }
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
}
_a = ThemeIt;
ThemeIt.styles = [
    Reflect.get(_b, "styles", _a),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    query('sl-menu')
], ThemeIt.prototype, "menu", void 0);
__decorate([
    state()
], ThemeIt.prototype, "theme", void 0);
__decorate([
    property({ type: String, reflect: true })
], ThemeIt.prototype, "size", void 0);
if (customElements && !customElements.get('theme-it')) {
    customElements.define('theme-it', ThemeIt);
}
