import type { CSSResultGroup } from 'lit';
import { BaseIt } from '../base/base.js';
export declare abstract class AnswerForm extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    preview: boolean;
    /** Réponse */
    abstract get answer(): unknown;
    /** Réinitialisation du formulaire */
    abstract reset(): void;
}
