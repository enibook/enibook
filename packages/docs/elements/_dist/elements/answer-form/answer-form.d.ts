import type { CSSResultGroup, TemplateResult } from 'lit';
import { BaseIt } from '../base/base';
export declare abstract class AnswerForm extends BaseIt {
    static styles: CSSResultGroup;
    protected form: HTMLFormElement;
    /**
     * La légende du cadre autour du composant.
     *
     * @memberof AnswerForm
     */
    legend: string;
    /**
     * Retours demandés.
     *
     * @memberof AnswerForm
     */
    protected btnFeedback: boolean;
    /**
     * Un cadre est ajouté autour de l'élément.
     *
     * @type {boolean}
     * @memberof AnswerForm
     */
    fieldset: boolean;
    /**
     *
     * @ignore
     * @abstract
     * @returns {*}
     * @memberof AnswerForm
     */
    abstract answer(): unknown;
    render(): TemplateResult;
    protected abstract renderAnswer(): TemplateResult;
    /**
     *
     * @ignore
     * @abstract
     * @memberof AnswerForm
     */
    abstract reset(): void;
}
