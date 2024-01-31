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
    static styles: CSSResultGroup;
    menu: SlMenu;
    theme: string;
    size: 'small' | 'medium' | 'large';
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    getTheme(): string;
    isDark(): boolean;
    render(): TemplateResult;
    setTheme(newTheme: string): void;
    get tagTitle(): string;
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'theme-it': ThemeIt;
    }
}
