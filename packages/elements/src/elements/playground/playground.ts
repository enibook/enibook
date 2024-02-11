// lit
import { html, type CSSResultGroup, type TemplateResult, type PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
// shoelace

// enibook
import { AnswerForm } from "../answer-form/answer-form.js";

import { CodeIt } from "../code/code.js";
import { FrameIt } from "../frame/frame.js";
import styles from "./playground.css.js"
import { EditorView } from "@codemirror/view";

@customElement('playground-it')
export class PlaygroundIt extends AnswerForm {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  protected initialCode: string = '';
  protected initialCompiledCode: string = ''

  @query('.playground__editor') editorElement!: CodeIt

  @query('.playground__frame') frameElement!: FrameIt
  
  @query('.playground-it') baseElement!: HTMLElement

  public editor!: CodeIt

  public frame!: FrameIt

  /** Langage à éditer (défaut: `text`). */
  @property({ type: String, reflect: true })
  language: string = 'text'
  
  /** Mode « lecture seule » (ie. modifications interdites; défaut: `false`). */
  @property({ type: Boolean, reflect: true, attribute: 'read-only' })
  readOnly: boolean = false
  
  /** Le fichier source à éditer. */
  @property({ type: String, reflect: true, attribute: 'code-filename' }) codeFilename = '';

  /** Le fichier source du préfixe. */
  @property({ type: String, reflect: true, attribute: 'prefix-filename' }) prefixFilename = '';

  /** Le fichier source du suffiwe. */
  @property({ type: String, reflect: true, attribute: 'suffix-filename' }) suffixFilename = '';

  compile(input: string): string {
    let output: string = ''
    output += input
    return output
  }

  createEditor(): CodeIt {
    const initialCode = `<script type="code-it/src">${this.initialCode}</script>`
    const editor = new CodeIt()
    editor.classList.add('playground__editor')
    editor.language = this.language
    editor.readOnly = this.readOnly
    editor.lineNumbers = true
    editor.innerHTML = initialCode
    return editor
  }

  createFrame(): FrameIt {
    const initialCode = `<script type="frame-it/main">${this.initialCompiledCode}</script>`
    const frame = new FrameIt()
    frame.classList.add('playground__frame')
    frame.border = true
    frame.style.resize = 'vertical'
    frame.innerHTML = initialCode
    return frame
  }

  createListener(): void {
    this.addEventListener('sl-resize', (event) => {
      const ev = event as CustomEvent
      const entries = ev.detail.entries
      if (entries.length) {
        const height = entries[0].contentRect.height
        this.editorElement.style.height = `${height}px`
        this.frameElement.style.height = `${height}px`
        this.frameElement.resizeIFrameHeight(height)
      }
    })
    this.addEventListener('editor-change-it', () => {
      this.frame.srcDoc = this.compile(this.editor.value)
    })
  }

  protected async firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>) {
    this.initialCode = await this.getCode(this.codeFilename, 'src');
    this.initialCompiledCode = this.compile(this.initialCode)
    this.editor = this.createEditor()
    this.frame = this.createFrame()
    this.baseElement.appendChild(this.editor)
    this.baseElement.appendChild(this.frame)
    this.createListener()
  }

  get answer(): unknown {
    throw new Error("Method not implemented.");
  }

  render(): TemplateResult {
    return html`
      <div part="base" class="playground-it"></div>
    `
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-it': PlaygroundIt;
  }
}

