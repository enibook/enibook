import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import type { CSSResultGroup } from 'lit';
import { PreviewIt } from '../preview/preview';
/**
 * Présentation d'un code source `html` et de son rendu.
 * @title Aperçu HTML
 * @summary Cet élément présente côte à côte un code source `html` à interpréter
 * et le rendu de son interprétation par le navigateur.
 *
 * @csspart base - `div` englobant le composant.
 * @csspart code - `div` du code source.
 * @csspart handle - `div` de la poignée séparatrice.
 * @csspart preview - `div` de l'aperçu.
 */
export declare class HtmlPreviewIt extends PreviewIt {
    static styles: CSSResultGroup;
    protected renderCode(): string;
    /**
     * Le nom courant de l'élément : `Aperçu HTML`.
     */
    get tagTitle(): string;
    /**
     * Syntaxe `asciidoc` équivalente :
     *
     * ```
     * [style,attributes]
     * ----
     * code html
     * ----
     * ```
     *
     * - `style` : `html-preview-it` (le style `asciidoc` a le même nom que l'élément `html` correspondant);
     * - `attributes` : `position`.
     *
     * Voir la documentation Asciidoc sur le [style d'un bloc](https://docs.asciidoctor.org/asciidoc/latest/blocks/#block-style).
     *
     * @example
     * ```
     * [html-preview-it,position=75]
     * ----
     * <p>
     *  Voici une horloge :
     *  <clock-it date time></clock-it>
     * </p>
     * ----
     * ```
     *
     */
    toAsciidoc(): string;
    updated(changedProperties: Map<string, unknown>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'html-preview-it': HtmlPreviewIt;
    }
}
