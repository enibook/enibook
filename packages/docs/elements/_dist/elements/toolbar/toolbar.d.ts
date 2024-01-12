import type { CSSResultGroup, TemplateResult } from 'lit';
import { BaseIt } from '../base/base';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ToolbarIt extends BaseIt {
    get tagTitle(): string;
    toAsciidoc(): string;
    static styles: CSSResultGroup;
    fixed: boolean;
    placement: 'top' | 'bottom';
    render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'toolbar-it': ToolbarIt;
    }
}
