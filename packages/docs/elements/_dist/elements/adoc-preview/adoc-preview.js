// lit
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import { css, unsafeCSS } from 'lit';
// enibook
import { AsciidoctorProcessor } from '../../utilities/asciidoc';
import { PreviewIt } from '../preview/preview';
import { runScript } from '../../utilities/run-script';
import styles from './adoc-preview.css?inline';
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
export class AdocPreviewIt extends PreviewIt {
    constructor() {
        super();
        this.language = 'asciidoc';
    }
    renderCode() {
        const html = AdocPreviewIt.asciidoctor.convert(this.code, {
            'safe': 'unsafe',
            'attributes': {
                'showtitle': true,
                'icons': 'font'
            }
        });
        return html;
    }
    /**
     * Le nom courant de l'élément : `Aperçu asciidoc`.
     */
    get tagTitle() {
        return 'Aperçu asciidoc';
    }
    /**
     * Syntaxe `asciidoc` équivalente :
     *
     * ```
     * [style,attributes]
     * ----
     * code asciidoc
     * ----
     * ```
     *
     * - `style` : `adoc-preview-it` (le style `asciidoc` a le même nom que l'élément `html` correspondant);
     * - `attributes` : `position`, `src`, `theme`.
     *
     * Voir la documentation Asciidoc sur le [style d'un bloc](https://docs.asciidoctor.org/asciidoc/latest/blocks/#block-style).
     *
     * @example
     * ```
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
    [adoc-preview-it,${attrs.join(',')}]
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
AdocPreviewIt.styles = [
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
AdocPreviewIt.asciidoctor = AsciidoctorProcessor();
if (customElements && !customElements.get('adoc-preview-it')) {
    customElements.define('adoc-preview-it', AdocPreviewIt);
}
