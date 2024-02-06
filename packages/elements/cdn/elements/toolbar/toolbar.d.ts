import type { CSSResultGroup, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import { BaseIt } from '../base/base.js';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ToolbarIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    /** Fixation de la barre d'outils (défaut : `false`). */
    fixed: boolean;
    /** position de la barre d'outils (défaut : `top`). */
    placement: 'top' | 'bottom';
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'toolbar-it': ToolbarIt;
    }
}
