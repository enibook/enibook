import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import { BaseIt } from '../base/base.js';
export declare abstract class AnswerForm extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    formElement: HTMLElement;
    outputElement: HTMLElement;
    frame: HTMLIFrameElement;
    protected srcDoc: string;
    /** Retours demandés (défaut: `false`). */
    protected btnFeedback: boolean;
    preview: boolean;
    /** Réponse */
    abstract answer(): unknown;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult;
    protected abstract renderForm(): TemplateResult;
    protected renderOutput(): TemplateResult;
    /** Réinitialisation du formulaire */
    abstract reset(): void;
}
