import { type CSSResultGroup, type PropertyValueMap, type TemplateResult } from 'lit';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js';
import { BaseIt } from '../base/base.js';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ThemeIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected menu: SlMenu;
    protected theme: string;
    /** Taille du bouton (défaut : `small`) */
    size: 'small' | 'medium' | 'large';
    constructor();
    protected createListeners(): void;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /** Thème (défaut : `system`) */
    getTheme(): string;
    /** Teste si le thème courant est le thème `dark`. */
    isDark(): boolean;
    protected render(): TemplateResult;
    /** Change le thème. */
    setTheme(newTheme: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'theme-it': ThemeIt;
    }
}
