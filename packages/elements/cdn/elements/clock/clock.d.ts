import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import { BaseIt } from '../base/base.js';
/**
 * Horloge
 * @title Horloge
 * @summary Horloge numérique indiquant l'heure et la date courantes.
 *
 * @csspart base - le conteneur principal
 * @csspart button - le conteneur du bouton
 * @csspart menu - le conteneur du menu déroulant
 *
 * @credit [Shoelace](https://shoelace.style) pour ses éléments d'interface utilisateur.
 */
export declare class ClockIt extends BaseIt {
    static styles: CSSResultGroup;
    private _state;
    /** @ignore */
    _time: string;
    /** @ignore */
    clockElement: HTMLElement;
    /** @ignore */
    timeElement: HTMLTimeElement;
    /** @ignore */
    icon: HTMLElement;
    /** Afficher la date (défaut: `false`). */
    date: boolean;
    /** Afficher l'heure (défaut: `false`). */
    time: boolean;
    /** Taille de l'horloge */
    size: 'small' | 'medium' | 'large';
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    protected handleClickButton(): void;
    protected render(): TemplateResult;
    protected setClock(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'clock-it': ClockIt;
    }
}
