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
    static styles: CSSResultGroup;
    menu: SlMenu;
    menuItemAll: SlMenuItem;
    containerElement: HTMLElement;
    clockElement: ClockIt;
    themeElement: ThemeIt;
    colorElement: ColorIt;
    size: 'small' | 'medium' | 'large';
    menuItems: SlMenuItem[];
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    handleSelectTool(event: CustomEvent): void;
    render(): TemplateResult;
    get tagTitle(): string;
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'tools-it': ToolsIt;
    }
}
