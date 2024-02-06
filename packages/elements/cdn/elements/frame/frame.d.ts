import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { BaseIt } from '../base/base.js';
export declare class FrameIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected baseElement: Element;
    protected frameElement: HTMLIFrameElement;
    /** URL de la page à intégrer dans la frame. */
    url: string;
    /** Contenu de la page à intégrer qui surcharge celui indiqué par `url`. */
    srcDoc: string;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'frame-it': FrameIt;
    }
}
