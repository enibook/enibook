import { CSSResultGroup, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/divider/divider';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label';
import '@shoelace-style/shoelace/dist/components/range/range';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip';
import { BaseIt } from '../base/base';
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
