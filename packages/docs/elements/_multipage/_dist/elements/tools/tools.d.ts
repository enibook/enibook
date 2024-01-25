import { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/divider/divider';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown';
import '@shoelace-style/shoelace/dist/components/input/input';
import '@shoelace-style/shoelace/dist/components/menu/menu';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip';
import type SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import type SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { BaseIt } from '../base/base';
import { ClockIt } from '../clock/clock';
import { ColorIt } from '../color/color';
import { ThemeIt } from '../theme/theme';
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
