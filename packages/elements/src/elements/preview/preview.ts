// lit
import { property, query, state } from 'lit/decorators.js'
import { css, html, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import type { CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
// shoelace
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js'
// highlight
import hjs from 'highlight.js'
// enibook
import { dedentText } from '../../utilities/dedent';
import { requestIncludeFile } from '../../utilities/request';
import { BaseIt } from '../base/base'
// import { runScript } from '../../utilities/run-script'
import styles from './preview.css?inline'

/**
 * Visualisateur de code source et de son rendu.
 *
 * @summary Visualisateur avec d'un côté le code source à interpréter
 * et de l'autre un aperçu de son interprétation.
 *
 * @csspart base - The component's base wrapper.
 *
 */
export abstract class PreviewIt extends BaseIt {
  static styles: CSSResultGroup = [ 
    unsafeCSS(styles),
    css`@unocss-placeholder`
  ]


  @query('pre.highlight') protected codeElement!: HTMLElement

  /**
   * Le code source à prévisualiser.
   *
   * @memberof PreviewIt
   */
  @state() code = ''

  /** Le fichier source dont le code est à prévisualiser */
  @property({ type: String, reflect: true }) src = ''

  /** Le langage du code source (`html` par défaut) */
  protected language = 'html'

  /** La position initiale du séparateur comprise entre 0 et 100 (en % de la largeur de l'élément, 50 par défaut) */
  @property({ type: Number, reflect: true }) position = 50

  /** Le theme (clair ou sombre) du code source */
  @property({ type: String, reflect: true }) theme: 'light' | 'dark'  = 'dark'

  protected async firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): Promise<void> {
    super.firstUpdated(_changedProperties)
    const innerScript = this.querySelector('script[type="enibook"]')
    if (this.src) {
      const file = await requestIncludeFile(this.src)
      if (file.ok) {
        this.code += file.data + '\n'
      }
    }
    if (innerScript) {
      this.code += dedentText(innerScript.innerHTML)
        .replace(/&lt;(\/?script)(.*?)&gt;/g, '<$1$2>')
    }
    this.validatePosition()
   }

   renderbis(): TemplateResult {
    this.validatePosition()
    return html`
      <div part='base' class="preview">
        <sl-split-panel position="${this.position}" snap="25% 50% 75%">
          <div slot="start" part='code' class="preview__code ${this.theme}">
            <p class="preview__code__title">Code <code>${this.language}</code></p>
            ${unsafeHTML(this.renderHighlight())}
          </div>
          <div slot="divider" class="handle">
            <it-mdi-drag-vertical></it-mdi-drag-vertical>
          </div>
          <div slot="end" part='view' class="preview__view">
            <p class="preview__view__title">Aperçu</p>
            <div class="preview__view__code">${unsafeHTML(this.renderCode())}</div>
          </div>
        </sl-split-panel>
      </div>
      <slot></slot>
    `
  }

  render(): TemplateResult {
    return html`
      <div part='base' class="preview">
        <div part='code' class="preview__code ${this.theme}">
          <p class="preview__code__title">Code <code>${this.language}</code></p>
          ${unsafeHTML(this.renderHighlight())}
        </div>
        <div part='view' class="preview__view">
          <p class="preview__view__title">Aperçu</p>
          <div class="preview__view__code">${unsafeHTML(this.renderCode())}</div>
        </div>
      </div>
      <slot></slot>
    `
  }

  protected abstract renderCode(): string;

  protected renderHighlight(): string {
    const postHightlight = hjs.highlight(this.code, { language: this.language, ignoreIllegals: true }).value
    return `<pre class="highlightjs highlight pre-wrap" style="line-height: 1.2em;"><code class="language-${this.language} hljs" data-lang="${this.language}">${postHightlight}</code></pre>`
  }

  /**
   * Le nom courant de l'élément : `Aperçu`.
   */
  override get tagTitle(): string {
    return `Aperçu ${this.language}`
  }

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
    [preview-it,${this.language},${attrs.join(',')}]
    ----
    ${this.code}
    ----
    `
    return asciidoc.replace(/^ +| +$/gm, '')
  }

/*
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updated(_changedProperties: Map<string, unknown>) {
    hjs.highlightElement(this.codeElement)
  }
*/

  protected validatePosition(): void {
    if (this.position < 0) { this.position = 0 }
    else {
      if (this.position > 100) { this.position = 100 }
    }
  }
}
