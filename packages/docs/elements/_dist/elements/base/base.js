var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { LitElement, css, unsafeCSS } from "lit";
import { state } from "lit/decorators.js";
// fscreen
import fscreen from "fscreen";
// enibook
import styles from './base.css?inline';
/**
 * Classe de base pour les éléments personnalisés EniBook
 */
export class BaseIt extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Teste si l'élément est en mode plein écran.
         */
        this.fullscreen = false;
    }
    /**
     * Emission d'un événement `CustomEvent` par l'élément.
     *
     * Par défaut, l'événement se propage dans le DOM (`bubbles: true`);
     * il traverse également la frontière du DOM fantôme (_Shadow DOM_, `composed:true`)
     * et ne peut être empêché de le faire (`cancelable: false`).
     *
     */
    emit(name, options) {
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
    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        if (!fscreen.fullscreenElement) {
            fscreen.requestFullscreen(this);
        }
        else {
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
    notify(message, variant = "primary", icon = "it-mdi-information-variant-circle-outline", duration = "3000") {
        const alert = Object.assign(document.createElement('sl-alert'), {
            variant: variant,
            closable: true,
            duration: duration,
            innerHTML: `
          <div slot="icon"><${icon}></${icon}</div>
          ${this.wrap(message)}
        `
        });
        document.body.append(alert);
        return alert.toast();
    }
    wrap(message) {
        const div = document.createElement('div');
        div.textContent = message;
        return div.innerHTML;
    }
}
BaseIt.styles = [
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    state()
], BaseIt.prototype, "fullscreen", void 0);
