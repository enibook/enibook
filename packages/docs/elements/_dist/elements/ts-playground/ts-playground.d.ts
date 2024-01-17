import { CSSResultGroup, TemplateResult } from 'lit';
import { BaseIt } from '../base/base';
export declare class TsPlaygroundIt extends BaseIt {
    static styles: CSSResultGroup;
    private _ide;
    constructor();
    initIde(): void;
    render(): TemplateResult;
    get tagTitle(): string;
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'ts-playground-it': TsPlaygroundIt;
    }
}
