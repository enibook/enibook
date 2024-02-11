import { type CSSResultGroup, LitElement } from 'lit';
/** Classe de base pour les éléments personnalisés EniBook */
export declare abstract class BaseIt extends LitElement {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected fullscreen: boolean;
    lang: string;
    /**
     * Emission d'un événement `CustomEvent` par l'élément.
     *
     * Par défaut, l'événement se propage dans le DOM (`bubbles: true`);
     * il traverse également la frontière du DOM fantôme (_Shadow DOM_, `composed:true`)
     * et ne peut être empêché de le faire (`cancelable: false`).
     *
     */
    protected emit(name: string, options?: CustomEventInit): CustomEvent<any>;
    getCode(filename: string, part: string): Promise<string>;
    /**
     * Passe en mode plein écran ou sort du mode plein écran.
     *
     * On peut utiliser la touche <kbd>Esc</kbd> ou <kbd>F11</kbd> pour sortir du mode plein écran.
     */
    protected toggleFullscreen(): void;
    /**
     * Crée une alerte qui affiche le message associé pendant une durée donnée.
     *
     * @param {string} message - le message d'alerte
     * @param {string} [variant="primary"] - apparence du message
     * @param {string} [icon="it-mdi-information-variant-circle-outline"] - icône associée au message.
     * @param {string} [duration="3000"] - durée d'affichage de l'alerte en millisecondes.
     * @returns
     * @memberof EnibookElement
     */
    notify(message: string, variant?: string, icon?: string, duration?: string): Promise<void>;
    protected wrap(message: string): string;
}
