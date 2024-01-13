var _a, _b;
// lit
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import { css } from 'lit';
// enibook
import { md } from '../../utilities/markdown';
import { PreviewIt } from '../preview/preview';
import { runScript } from '../../utilities/run-script';
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
export class MdPreviewIt extends (_b = PreviewIt) {
    constructor() {
        super();
        this.language = 'markdown';
    }
    renderCode() {
        const html = _a.markdown.render(this.code, {});
        return html;
    }
    /**
     * Le nom courant de l'élément : `Aperçu markdown`.
     */
    get tagTitle() {
        return 'Aperçu markdown';
    }
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
    [md-preview-it,${attrs.join(',')}]
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
_a = MdPreviewIt;
MdPreviewIt.styles = [
    Reflect.get(_b, "styles", _a),
    css `@unocss-placeholder`
];
MdPreviewIt.markdown = md;
if (customElements && !customElements.get('md-preview-it')) {
    customElements.define('md-preview-it', MdPreviewIt);
}
