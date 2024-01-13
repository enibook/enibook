import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import type { CSSResultGroup } from 'lit';
import { PreviewIt } from '../preview/preview';
/**
 * Présentation d'un code source `asciidoc` et de son rendu.
 * @title Aperçu asciidoc
 * @summary Cet élément présente côte à côte un code source `asciidoc` à interpréter
 * et le rendu de son interprétation `html` par le navigateur.
 *
 * @csspart base - `div` englobant le composant.
 * @csspart code - `div` du code source.
 * @csspart handle - `div` de la poignée séparatrice.
 * @csspart preview - `div` de l'aperçu.
 */
export declare class AdocPreviewIt extends PreviewIt {
    static styles: CSSResultGroup;
    private static asciidoctor;
    constructor();
    protected renderCode(): string;
    /**
     * Le nom courant de l'élément : `Aperçu asciidoc`.
     */
    get tagTitle(): string;
    /**
     * Syntaxe `asciidoc` équivalente :
     *
     * ```
     * [style,attributes]
     * ----
     * code
     * ----
     * ```
     *
     * - `style` : `adoc-preview-it` (le style `asciidoc` a le même nom que l'élément `html` correspondant);
     * - `attributes` : `position`.
     *
     * Voir la documentation Asciidoc sur le [style d'un bloc](https://docs.asciidoctor.org/asciidoc/latest/blocks/#block-style).
     *
     * @example
     * ```asciidoc
     * [adoc-preview-it,position=75]
     * ----
     * // code asciidoc
     * = Asciidoc
     *
     * == Titre de section
     * .Liste _asciidoc_
     * * item de liste
     * * autre item
     * * lien https://docs.asciidoctor.org/asciidoc/latest/[pour en savoir plus...]
     * ----
     * ```
     *
     */
    toAsciidoc(): string;
    updated(changedProperties: Map<string, unknown>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'adoc-preview-it': AdocPreviewIt;
    }
}
