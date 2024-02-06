// lit
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
// debounce
import debounce from 'debounce'
// enibook
import { BaseIt } from '../base/base.js';
import styles from './answer-form.css.js';

export abstract class AnswerForm extends BaseIt {
  /** Style propre à la classe. */
  static override styles: CSSResultGroup = [
    super.styles, 
    styles
  ];

  @query('.form') formElement!: HTMLElement
  @query('.output') outputElement!: HTMLElement
  @query('iframe') frame!: HTMLIFrameElement

  @state() protected srcDoc = '';

  /** Retours demandés (défaut: `false`). */
  @property({ type: Boolean, reflect: true, attribute: 'btn-feedback' }) 
  protected btnFeedback = false;

  @property({ type: Boolean, reflect: true }) 
  public preview = false;

  /** Réponse */
  abstract answer(): unknown;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const that = this
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target == that.formElement && that.preview) {
          const base = that.formElement.querySelector("[part='base']") as HTMLElement
          const baseHeight = base.offsetHeight
          
          this.outputElement.style.height = `${baseHeight}px`
        }
      }
    })
    
    function observer() {
      resizeObserver.observe(that.formElement as Element)
    }
    
    window.onresize = debounce(observer, 300)
    
  }


  override render(): TemplateResult {
    return html`
      <div part="base" class="answer-form">
        <div part="form" class="form" ?border=${!this.preview}>${this.renderForm()}</div>
        <div part="output" class="output" ?hidden=${!this.preview}>${this.renderOutput()}</div>
      </div>
    `;
  }

  protected abstract renderForm(): TemplateResult;

  protected renderOutput(): TemplateResult {
    return html`
      <iframe
        class="output__iframe"
        allowfullscreen
        name="output"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
        srcdoc=${this.srcDoc}
      >
      </iframe>
    `;
  }


  /** Réinitialisation du formulaire */
  abstract reset(): void;
}
