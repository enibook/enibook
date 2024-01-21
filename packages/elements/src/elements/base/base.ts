// lit
import { CSSResultGroup, LitElement, css, unsafeCSS } from "lit";
import { state } from "lit/decorators.js";
// fscreen
import fscreen from "fscreen";
// enibook
import styles from './base.css?inline'
/**
 * Classe de base pour les éléments personnalisés EniBook
 */
export abstract class BaseIt extends LitElement {
  static override styles: CSSResultGroup = [
    unsafeCSS(styles),
    css`@unocss-placeholder`
  ]

  /**
   * Teste si l'élément est en mode plein écran.
   */
  @state() protected fullscreen = false;

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
   * Passe en mode plein écran ou sort du mode plein écran.
   *
   * On peut utiliser la touche <kbd>Esc</kbd> ou <kbd>F11</kbd> pour sortir du mode plein écran.
   */
    protected toggleFullscreen(): void {
      this.fullscreen = !this.fullscreen;
      if (!fscreen.fullscreenElement) {
        fscreen.requestFullscreen(this);
      } else {
        fscreen.exitFullscreen();
      }
    }
  
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
    notify(message: string, variant="primary", icon="it-mdi-information-variant-circle-outline", duration="3000") {
      const alert = Object.assign(document.createElement('sl-alert'), {
        variant: variant,
        closable: true,
        duration: duration,
        innerHTML: `
          <div slot="icon"><${icon}></${icon}</div>
          ${this.wrap(message)}
        `
      })
      document.body.append(alert)
      return alert.toast()
    }
  
  /**
   * Le nom courant de l'élément : à définir dans chaque sous-classe.
   */
  abstract get tagTitle(): string;

  /** 
   * Syntaxe `asciidoc` équivalente : à définir dans chaque sous-classe.
   */
  abstract toAsciidoc(): string;

  protected wrap(message: string): string {
    const div = document.createElement('div')
    div.textContent = message
    return div.innerHTML
  }

}

