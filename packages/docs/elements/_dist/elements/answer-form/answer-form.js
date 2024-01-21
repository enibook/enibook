var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
// lit
import { css, html, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
// enibook
import { BaseIt } from '../base/base';
import styles from './answer-form.css?inline';
export class AnswerForm extends (_b = BaseIt) {
    constructor() {
        super(...arguments);
        /**
         * La légende du cadre autour du composant.
         *
         * @memberof AnswerForm
         */
        this.legend = '';
        /**
         * Retours demandés.
         *
         * @memberof AnswerForm
         */
        this.btnFeedback = false;
        /**
         * Un cadre est ajouté autour de l'élément.
         *
         * @type {boolean}
         * @memberof AnswerForm
         */
        this.fieldset = false;
    }
    render() {
        const fieldsetClasses = {
            "answer-form__fieldset": true,
            "rtl": this.dir === 'rtl',
        };
        return html `
      <form part="base" class="answer-form">
        ${!this.fieldset
            ? this.renderAnswer()
            : html `
            <fieldset class=${classMap(fieldsetClasses)}>
              <legend class="answer-form__legend">${this.legend}</legend>
              ${this.renderAnswer()}
            </fieldset>
            `}
      </form>
    `;
    }
}
_a = AnswerForm;
AnswerForm.styles = [
    Reflect.get(_b, "styles", _a),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    query('form.answer-form')
], AnswerForm.prototype, "form", void 0);
__decorate([
    property({ type: String, reflect: true })
], AnswerForm.prototype, "legend", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'btn-feedback' })
], AnswerForm.prototype, "btnFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AnswerForm.prototype, "fieldset", void 0);
