// lit
import { type CSSResultGroup, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
// fscreen
import fscreen from 'fscreen';
// enibook
import { icons } from '../../utilities/icons.js';
import { fetchContent } from '../../utilities/request.js';
import { dedentText } from '../../utilities/dedent.js';
import styles from './base.css.js';

/** Classe de base pour les éléments personnalisés EniBook */
export abstract class BaseIt extends LitElement {
  /** Style propre à la classe. */
  static override styles: CSSResultGroup = [styles];

  @state() 
  protected fullscreen = false;

  @property({ type: String, reflect: true }) 
  lang: string = navigator.language

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
      ...options
    });
    this.dispatchEvent(event);
    return event;
  }

  async getCode(filename: string, part: string): Promise<string> {
    let code = ''
    const innerScriptTag = this.querySelector(`script[type="enibook/${part}"]`);
    if (filename) {
      await fetchContent(filename).then(response => {
        code += response;
      });
    }
    if (innerScriptTag) {
      code += dedentText(innerScriptTag.innerHTML);
      code = code.replace(/&lt;(\/?script)(.*?)&gt;/g, '<$1$2>');
    }
    return code
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
   * @param {string} [icon="it-mdi-information-variant-circle-outline"] - icône associée au message.
   * @param {string} [duration="3000"] - durée d'affichage de l'alerte en millisecondes.
   * @returns
   * @memberof EnibookElement
   */
  notify(
    message: string,
    variant: string = 'primary',
    icon: string = 'mdi-information-variant-circle-outline',
    duration: string = '3000'
  ) {
    const alert = Object.assign(document.createElement('sl-alert'), {
      variant: variant,
      closable: true,
      duration: duration,
      innerHTML: `
          <div slot="icon">${icons[icon]}</div>
          ${this.wrap(message)}
        `
    });
    document.body.append(alert);
    return alert.toast();
  }

  protected wrap(message: string): string {
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML;
  }
}
