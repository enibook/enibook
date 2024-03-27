// lit
import { type CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
// shoelace
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js'
// enibook
import { PlaygroundIt } from "../playground/playground.js";
// import { dedentText } from '../../utilities/dedent.js'
// import jsWorker from "./javascript.worker";
import styles from "./javascript.css.js"

@customElement('javascript-it')
export class JavascriptIt extends PlaygroundIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [
    super.styles, 
    styles
  ];

  protected worker!: Worker
  
  constructor() {
    super()
    this.language = 'javascript'
    const url = new URL('../elements/javascript/javascript.worker.js', import.meta.url)
    this.worker = new Worker(url, { type: 'module' })
  }

  createListener(): void {
    let that = this
    this.addEventListener('editor-change-it', () => {
      const message = { script: that.editor.value }
      console.log('before',message)
      that.worker.postMessage(message)
    })
    that.worker.addEventListener('message', (message) => this.handleMessageWorker(message))
  }

  async handleMessageWorker(message: any) {
    console.log('after',message)
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
    'javascript-it': JavascriptIt;
  }
}

