import { type CSSResultGroup, type TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { BaseIt } from '../base/base.js';
export declare const colorNames: string[];
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ColorIt extends BaseIt {
    static styles: CSSResultGroup;
    color: string;
    range: number;
    size: 'small' | 'medium' | 'large';
    constructor();
    /** Modifie la couleur principale du thème à l'aide des primitives [`shoelace`](https://shoelace.style/tokens/color). */
    cssPrimaryColor(): string;
    get colors(): {
        name: string;
        value: string;
    }[];
    handleChangeRange(event: CustomEvent): void;
    initLocalStorage(): void;
    render(): TemplateResult;
    setPrimaryColor(): void;
    get tagTitle(): string;
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'color-it': ColorIt;
    }
}
