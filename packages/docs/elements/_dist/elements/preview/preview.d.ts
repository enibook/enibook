import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import { BaseIt } from '../base/base';
/**
 * Visualisateur de code source et de son rendu.
 *
 * @summary Visualisateur avec d'un côté le code source à interpréter
 * et de l'autre un aperçu de son interprétation.
 *
 * @csspart base - The component's base wrapper.
 *
 */
export declare abstract class PreviewIt extends BaseIt {
    static styles: CSSResultGroup;
    protected codeElement: HTMLElement;
    /**
     * Le code source à prévisualiser.
     *
     * @memberof PreviewIt
     */
    code: string;
    /** Le fichier source dont le code est à prévisualiser */
    src: string;
    /** Le langage du code source (`html` par défaut) */
    protected language: string;
    /** La position initiale du séparateur comprise entre 0 et 100 (en % de la largeur de l'élément, 50 par défaut) */
    position: number;
    /** Le theme (clair ou sombre) du code source */
    theme: 'light' | 'dark';
    protected firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): Promise<void>;
    render(): TemplateResult;
    protected abstract renderCode(): string;
    protected renderHighlight(): string;
    /**
     * Le nom courant de l'élément : `Aperçu`.
     */
    get tagTitle(): string;
    /**
     * Syntaxe `asciidoc` équivalente :
     *
     * ```
     * [style,language,attributes]
     * ----
     * code
     * ----
     * ```
     *
     * - `style` : `preview-it` (le style `asciidoc` a le même nom que l'élément `html` correspondant);
     * - `language` : le langage du code source (`html` par défaut);
     * - `attributes` : `position`.
     *
     * Voir la documentation Asciidoc sur le [style d'un bloc](https://docs.asciidoctor.org/asciidoc/latest/blocks/#block-style).
     *
     * @example
     *
     * ```
     * [preview-it,html,position=75]
     * ----
     * <p>
     *  Voici une horloge :
     *  <clock-it hide-date></clock-it>
     * </p>
     * ----
     * ```
     *
     */
    toAsciidoc(): string;
    protected validatePosition(): void;
}
