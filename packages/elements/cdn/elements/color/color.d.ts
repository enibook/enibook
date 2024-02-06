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
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    /** Couleur courante (défaut : `purple`) */
    color: string;
    /** Nuance de couleur (de 1 à 9, défaut : 5). */
    range: number;
    /** Taille du bouton (défaut : `small`). */
    size: 'small' | 'medium' | 'large';
    constructor();
    /** Couleur principale du thème à l'aide des primitives [`shoelace`](https://shoelace.style/tokens/color). */
    protected cssPrimaryColor(): string;
    /** Couleurs disponibles */
    get colors(): {
        name: string;
        value: string;
    }[];
    protected handleChangeRange(event: CustomEvent): void;
    protected initLocalStorage(): void;
    protected render(): TemplateResult;
    /** Modifie la couleur principale du thème. */
    protected setPrimaryColor(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'color-it': ColorIt;
    }
}
