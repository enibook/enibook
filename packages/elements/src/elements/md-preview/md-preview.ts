// lit
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js'
import { css } from 'lit'
import type { CSSResultGroup} from 'lit';
// enibook
import { md } from '../../utilities/markdown'
import { PreviewIt } from '../preview/preview';
import { runScript } from '../../utilities/run-script'

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
export class MdPreviewIt extends PreviewIt {
  static styles: CSSResultGroup = [ 
    super.styles,
    css`@unocss-placeholder` 
  ]

  private static markdown = md

  constructor() {
    super()
    this.language = 'markdown'
  }

  protected override renderCode(): string {
    const html = MdPreviewIt.markdown.render(this.code, {})
    return html as string
  }

  /**
   * Le nom courant de l'élément : `Aperçu markdown`.
   */
  override get tagTitle(): string {
    return 'Aperçu markdown'
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
   * <!-- code markdown -->
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
  override toAsciidoc(): string {
    const attributes: { [name: string]: boolean } = {
      // propriétés booléennes  : attrName: this.propName
    }
    const attrs: string[] = [
      /*propriétés avec valeur : attrName=`${this.propName}`*/
      `position="${this.position}"`
    ]
    for (const key of Object.keys(attributes)) {
      if (attributes[key]) {
        attrs.push(key)
      }
    }
    const asciidoc = `
    [md-preview-it,${attrs.join(',')}]
    ----
    ${this.code}
    ----
    `
    return asciidoc.replace(/^ +| +$/gm, '')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties)
    const scripts = this.shadowRoot?.querySelectorAll('.preview__view__code script')
    if (scripts) {
      for (const script of scripts) {
        runScript(script as HTMLScriptElement)
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-preview-it': MdPreviewIt;
  }
}

if (customElements && !customElements.get('md-preview-it')) {
  customElements.define('md-preview-it', MdPreviewIt)
}
