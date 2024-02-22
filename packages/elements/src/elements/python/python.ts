// lit
import { type CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
// brython
// import 'brython'
// shoelace
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js'
// enibook
import { PlaygroundIt } from "../playground/playground.js";
import styles from "./python.css.js"

@customElement('python-it')
export class PythonIt extends PlaygroundIt {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  constructor() {
    super()
    this.language = 'python'
    this.initialHead = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.12.0/brython.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.12.0/brython_stdlib.min.js"></script>
`
  }

  get answer(): unknown {
    throw new Error("Method not implemented.");
  }

  override compile(input: string): string {
    let output =`
<script type="text/python">
${input}
</script>
`
    return output
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'python-it': PythonIt;
  }
}

