import { type CSSResultGroup, LitElement } from "lit";
/**
 * Classe de base pour les éléments personnalisés EniBook
 */
export declare abstract class BaseIt extends LitElement {
    static styles: CSSResultGroup;
    /**
     * Teste si l'élément est en mode plein écran.
     */
    protected fullscreen: boolean;
    /**
     * Emission d'un événement `CustomEvent` par l'élément.
     *
     * Par défaut, l'événement se propage dans le DOM (`bubbles: true`);
     * il traverse également la frontière du DOM fantôme (_Shadow DOM_, `composed:true`)
     * et ne peut être empêché de le faire (`cancelable: false`).
     *
     */
    protected emit(name: string, options?: CustomEventInit): CustomEvent<any>;
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
     * @param {string} [icon="it-mdi-information-variant-circle-outline"] - icône associé au message.
     * @param {string} [duration="3000"] - durée d'affichage de l'alerte en millisecondes.
     * @returns
     * @memberof EnibookElement
     */
    notify(message: string, variant?: string, icon?: string, duration?: string): Promise<void>;
    /**
     * Le nom courant de l'élément : à définir dans chaque sous-classe.
     */
    abstract get tagTitle(): string;
    /**
     * Syntaxe `asciidoc` équivalente : à définir dans chaque sous-classe.
     */
    abstract toAsciidoc(): string;
    protected wrap(message: string): string;
}
