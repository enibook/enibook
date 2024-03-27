// lit
import { type CSSResultGroup } from "lit";
import { customElement, query } from "lit/decorators.js";
// shoelace
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js'
// enibook
import { PlaygroundIt } from "../playground/playground.js";
import styles from "./typescript.css.js"

@customElement('typescript-it')
export class TypescriptIt extends PlaygroundIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [
    super.styles, 
    styles
  ];

  protected worker!: Worker
  
  @query('script[type="typescript/worker"]') scriptWorker!: HTMLScriptElement

  constructor() {
    super()
    this.language = 'typescript'
    const url = new URL('../elements/typescript/typescript.worker.js', import.meta.url)
    this.worker = new Worker(url, { type: 'module' })
  }

  createListener(): void {
    this.addEventListener('editor-change-it', () => {
      const message = { script: this.editor.value }
      this.worker.postMessage(message)
    })
    this.worker.addEventListener('message', (message) => this.handleMessageWorker(message))
  }

  async handleMessageWorker(message: any) {
    let consoleOutput = ""
    let output = ""
    if (message.data.error) {
      consoleOutput += `<span color-red>${message.data.error}</span>`
    } else {
        if (message.data.debug.length) {
          consoleOutput += '<ul id="consoleOutput" ps-2 list-none my-px font-mono text-xs>'
          for (const msg of message.data.debug as string[]) {
            consoleOutput += '<li border-b-1 border-b-solid border-gray-200 hover:bg-gray-200 p-0.5>' + msg + "</li>"
          }
          consoleOutput += '</ul>'
        }
        if (message.data.result) {
          output += `<div id="output" class="output">${message.data.result}</div>`
        }
    }
    console.log('handleMessageWorker', output, consoleOutput)
    await this.updateFrame(output, consoleOutput)
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'typescript-it': TypescriptIt;
  }
}

