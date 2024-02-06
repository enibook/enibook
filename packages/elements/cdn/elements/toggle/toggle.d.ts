import { type CSSResultGroup, type PropertyValueMap, type TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { BaseIt } from '../base/base.js';
/**
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ToggleIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    private elements;
    private _toshow;
    /** Sélecteur `css` de l'élément ciblé (défaut : `unknown`). */
    selector: string;
    /** Taille du bouton (défaut : `small`). */
    size: 'small' | 'medium' | 'large';
    /** Texte du bouton en mode « show » (défaut : `mdi-show-outline`). */
    textShow: string;
    /** Texte du bouton en mode « hide » (défaut : `mdi-hide-outline`). */
    textHide: string;
    /** Infobulle en mode « show » (défaut : `Montrer`). */
    tooltipShow: string;
    /** Infobulle en mode « hide » (défaut : `Cacher`). */
    tooltipHide: string;
    /** Modifier la mise en page (défaut : `false`). */
    destructuring: boolean;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult;
    protected toggleSelector(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'toggle-it': ToggleIt;
    }
}
