// lit
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
// enibook
import { BaseIt } from '../base/base.js';
import styles from './answer-form.css.js';

export abstract class AnswerForm extends BaseIt {
  static override styles: CSSResultGroup = [
    super.styles, 
    styles
  ];

  @query('form.answer-form')
  protected form!: HTMLFormElement;

  /**
   * La légende du cadre autour du composant.
   *
   * @memberof AnswerForm
   */
  @property({ type: String, reflect: true })
  public formLegend = '';

  @property({ type: String, reflect: true })
  public outputLegend = '';

  /**
   * Retours demandés.
   *
   * @memberof AnswerForm
   */
  @property({ type: Boolean, reflect: true, attribute: 'btn-feedback' })
  protected btnFeedback = false;

  /**
   * Un cadre est ajouté autour de l'élément.
   *
   * @type {boolean}
   * @memberof AnswerForm
   */
  @property({ type: Boolean, reflect: true })
  public fieldset = false;

  @property({ type: Boolean, reflect: true, attribute: 'no-output' })
  public noOutput = false;

  /**
   *
   * @ignore
   * @abstract
   * @returns {*}
   * @memberof AnswerForm
   */
  abstract answer(): unknown;

  override render(): TemplateResult {
    return html`
      <div part="base" class="answer-form">
        <div part="form" class="form">${this.renderForm()}</div>
        <div part="output" class="output" ?hidden=${this.noOutput}>${this.renderOutput()}</div>
      </div>
    `;
  }

  protected renderAnswerOutput(): TemplateResult {
    const fieldsetClasses = {
      form__fieldset: true,
      rtl: this.dir === 'rtl'
    };
    return html`
      <div part="output" class="answer-output">
        ${!this.fieldset
          ? this.renderOutput()
          : html`
              <fieldset class=${classMap(fieldsetClasses)}>
                <legend class="output__legend">${this.outputLegend}</legend>
                ${this.renderOutput()}
              </fieldset>
            `}
      </div>
    `;
  }

  protected abstract renderForm(): TemplateResult;

  protected abstract renderOutput(): TemplateResult;

  /**
   *
   * @ignore
   * @abstract
   * @memberof AnswerForm
   */
  abstract reset(): void;
}
