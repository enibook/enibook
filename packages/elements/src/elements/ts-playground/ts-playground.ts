// lit
import { CSSResultGroup, TemplateResult, css, html, unsafeCSS } from 'lit';
// playground-element
import { PlaygroundIde } from 'playground-elements/playground-ide'
// enibook
import { BaseIt } from '../base/base';
import styles from './ts-playground.css?inline'

export class TsPlaygroundIt extends BaseIt {
  static styles: CSSResultGroup = [ 
    unsafeCSS(styles),
    css`@unocss-placeholder` 
  ]

  private _ide!: PlaygroundIde;
  
  constructor() {
    super()
    this.initIde()
  }

  initIde(): void {
    this._ide = new PlaygroundIde()
    this._ide.editableFileSystem = true
    this._ide.lineNumbers = true
    this._ide.lineWrapping = true
    this._ide.resizable = true
  }

  override render(): TemplateResult {
    return html`
      ${this._ide}
      <slot></slot>
    `
  }

  override get tagTitle(): string {
    throw new Error('Method not implemented.');
  }
  
  override toAsciidoc(): string {
    throw new Error('Method not implemented.');
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ts-playground-it': TsPlaygroundIt;
  }
}

if (customElements && !customElements.get('ts-playground-it')) {
  customElements.define('ts-playground-it', TsPlaygroundIt)
}
