// lit
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
// enibook
import { BaseIt } from '../base/base.js';
import styles from './answer-form.css.js';

export abstract class AnswerForm extends BaseIt {
  /** Style propre à la classe. */
  static override styles: CSSResultGroup = [
    super.styles, 
    styles
  ];

  @property({ type: Boolean, reflect: true }) 
  public preview = false;

  /** Réponse */
  abstract get answer(): unknown;

  /** Réinitialisation du formulaire */
  abstract reset(): void;
}
