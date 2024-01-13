import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import type { CSSResultGroup } from 'lit';
import { PreviewIt } from '../preview/preview';
/**
 * Présentation d'un code source `markdown` et de son rendu.
 * @title Aperçu markdown
 * @summary Cet élément présente côte à côte un code source `markdown` à interpréter
 * et le rendu de son interprétation `html` par le navigateur.
 *
 * @csspart base - `div` englobant le composant.
 * @csspart code - `div` du code source.
 * @csspart handle - `div` de la poignée séparatrice.
 * @csspart preview - `div` de l'aperçu.
 */
export declare class MdPreviewIt extends PreviewIt {
    static styles: CSSResultGroup;
    private static markdown;
    constructor();
    protected renderCode(): string;
    /**
     * Le nom courant de l'élément : `Aperçu markdown`.
     */
    get tagTitle(): string;
    /**
     * Syntaxe `asciidoc` équivalente :
     *
     * ```
     * [style,attributes]
     * ----
     * code markdown
     * ----
     * ```
     *
     * - `style` : `md-preview-it` (le style `asciidoc` a le même nom que l'élément `html` correspondant);
     * - `attributes` : `position`, `src`, `theme`.
     *
     * Voir la documentation asciidoc sur le [style d'un bloc](https://docs.markdowntor.org/asciidoc/latest/blocks/#block-style).
     *
     * @example
     * ```
     * [md-preview-it,position=75]
     * ----
     * // code markdown
     * # markdown
     *
     * ## Titre de section
     * * item de liste
     * * autre item
     * * lien [pour en savoir plus...](https://docs.markdowntor.org/markdown/latest/)
     * ----
     * ```
     *
     */
    toAsciidoc(): string;
    updated(changedProperties: Map<string, unknown>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'md-preview-it': MdPreviewIt;
    }
}
