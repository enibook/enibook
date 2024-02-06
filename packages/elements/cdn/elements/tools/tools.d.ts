import { type CSSResultGroup, type PropertyValueMap, type TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import type SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import type SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { BaseIt } from '../base/base.js';
import { ClockIt } from '../clock/clock.js';
import { ColorIt } from '../color/color.js';
import { ThemeIt } from '../theme/theme.js';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ToolsIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected menu: SlMenu;
    protected menuItemAll: SlMenuItem;
    protected containerElement: HTMLElement;
    protected clockElement: ClockIt;
    protected themeElement: ThemeIt;
    protected colorElement: ColorIt;
    /** Taille du bouton (dafaut : `small`). */
    size: 'small' | 'medium' | 'large';
    protected menuItems: SlMenuItem[];
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    protected handleSelectTool(event: CustomEvent): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'tools-it': ToolsIt;
    }
}
