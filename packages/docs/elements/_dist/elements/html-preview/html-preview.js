var _a, _b;
// lit
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import { css } from 'lit';
// enibook
import { PreviewIt } from '../preview/preview';
import { runScript } from '../../utilities/run-script';
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
export class HtmlPreviewIt extends (_b = PreviewIt) {
    renderCode() {
        return this.code;
    }
    /**
     * Le nom courant de l'élément : `Aperçu HTML`.
     */
    get tagTitle() {
        return 'Aperçu HTML';
    }
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
    toAsciidoc() {
        const attributes = {
        // propriétés booléennes  : attrName: this.propName
        };
        const attrs = [
            /*propriétés avec valeur : attrName=`${this.propName}`*/
            `position="${this.position}"`
        ];
        for (const key of Object.keys(attributes)) {
            if (attributes[key]) {
                attrs.push(key);
            }
        }
        const asciidoc = `
    [html-preview-it,${attrs.join(',')}]
    ----
    ${this.code}
    ----
    `;
        return asciidoc.replace(/^ +| +$/gm, '');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updated(changedProperties) {
        super.updated(changedProperties);
        const scripts = this.shadowRoot?.querySelectorAll('.preview__view__code script');
        if (scripts) {
            for (const script of scripts) {
                runScript(script);
            }
        }
    }
}
_a = HtmlPreviewIt;
HtmlPreviewIt.styles = [
    // unsafeCSS(styles),
    Reflect.get(_b, "styles", _a),
    css `@unocss-placeholder`
];
if (customElements && !customElements.get('html-preview-it')) {
    customElements.define('html-preview-it', HtmlPreviewIt);
}
