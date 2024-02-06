import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { BaseIt } from '../base/base.js';
/**
 *
 *
 */
export declare class IconIt extends BaseIt {
    /** Style propre à la classe */
    static styles: CSSResultGroup;
    /** Nom de l'icône (défaut: `mdi-block-helper`) */
    name: string;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'icon-it': IconIt;
    }
}
