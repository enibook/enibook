import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { BaseIt } from '../base/base.js';
/**
 *
 *
 */
export declare class IconIt extends BaseIt {
    static styles: CSSResultGroup;
    name: string;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult;
    get tagTitle(): string;
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'icon-it': IconIt;
    }
}
