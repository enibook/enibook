// lit
import { type CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
// shoelace
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js'
// enibook
import { PlaygroundIt } from "../playground/playground.js";
import styles from "./javascript.css.js"

@customElement('javascript-it')
export class JavascriptIt extends PlaygroundIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  protected worker = new Worker('./javascript-worker.js')

  constructor() {
    super()
    this.language = 'javascript'
  }

  override compile(input: string): string {
    const message = { script: input }
    this.worker.postMessage(message)
    
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'javascript-it': JavascriptIt;
  }
}

