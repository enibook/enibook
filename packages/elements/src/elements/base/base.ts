import { LitElement } from "lit";

/**
 * Classe de base pour les éléments personnalisés EniBook
 */
export abstract class BaseIt extends LitElement {
  /**
   * Emission d'un événement `CustomEvent` par l'élément.
   *
   * Par défaut, l'événement se propage dans le DOM (`bubbles: true`);
   * il traverse également la frontière du DOM fantôme (_Shadow DOM_, `composed:true`)
   * et ne peut être empêché de le faire (`cancelable: false`).
   *
   */
  protected emit(name: string, options?: CustomEventInit) {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options,
    });
    this.dispatchEvent(event);
    return event;
  }

  /**
   * Le nom courant de l'élément : à définir dans chaque sous-classe.
   */
  abstract get tagTitle(): string;

  /** 
   * Syntaxe `asciidoc` équivalente : à définir dans chaque sous-classe.
   */
  abstract toAsciidoc(): string;

}

