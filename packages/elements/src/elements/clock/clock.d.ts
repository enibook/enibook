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
  /** Ne pas afficher la date */
  date: boolean;
  /** Ne pas afficher l'heure */
  time: boolean;
  /** Taille de l'horloge */
  size: 'small' | 'medium' | 'large';
  /**
   * Le nom courant de l'élément : `Horloge`.
   */
  get tagTitle(): string;
  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
  protected handleClickButton(): void;
  protected render(): TemplateResult;
  protected setClock(): void;
  /**
   * Syntaxe `asciidoc` équivalente :
   *
   * ```
   * name:target[attributes]
   * ```
   *
   * - `name` : `clock-it` (la macro `asciidoc` a le même nom que l'élément `html` correspondant);
   * - `target` : la macro `clock-it` n'a pas de cible (_target_);
   * - `attributes` : `hide-date`, `hide-time`, `size`.
   *
   * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _inline_</a>
   *
   * @examples
   * `clock-it:[]`,
   * `clock-it:[date]`,
   * `clock-it:[date, size=medium]`
   */
  toAsciidoc(): string;
}
declare global {
  interface HTMLElementTagNameMap {
    'clock-it': ClockIt;
  }
}
