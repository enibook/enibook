// lit
import { css, html, unsafeCSS } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, query } from 'lit/decorators.js'
import type { CSSResultGroup, TemplateResult} from 'lit';
// enibook
import { BaseIt } from '../base/base'
import styles from './answer-form.css?inline'

export abstract class AnswerForm extends BaseIt {
  static override styles: CSSResultGroup = [ 
    unsafeCSS(styles),
    css`@unocss-placeholder`
  ]

  @query('form.answer-form')
  protected form!: HTMLFormElement

  /**
   * La légende du cadre autour du composant.
   *
   * @memberof AnswerForm
   */
  @property({ type: String, reflect: true })
  public legend = ''

  /**
   * Retours demandés.
   *
   * @memberof AnswerForm
   */
  @property({ type: Boolean, reflect: true, attribute: 'btn-feedback' })
  protected btnFeedback = false

  /**
   * Un cadre est ajouté autour de l'élément.
   *
   * @type {boolean}
   * @memberof AnswerForm
   */
  @property({ type: Boolean, reflect: true })
  public fieldset = false

  /**
   *
   * @ignore
   * @abstract
   * @returns {*}
   * @memberof AnswerForm
   */
  abstract answer(): unknown

  override render(): TemplateResult {
    const fieldsetClasses = {
      "answer-form__fieldset": true,
      "rtl": this.dir === 'rtl',
    }
    return html`
      <form part="base" class="answer-form">
        ${!this.fieldset
          ? this.renderAnswer()
          : html`
            <fieldset class=${classMap(fieldsetClasses)}>
              <legend class="answer-form__legend">${this.legend}</legend>
              ${this.renderAnswer()}
            </fieldset>
            `
        }
      </form>
    `
  }

  protected abstract renderAnswer(): TemplateResult

  /**
   *
   * @ignore
   * @abstract
   * @memberof AnswerForm
   */
  abstract reset(): void
}
