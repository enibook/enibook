// lit
import { html, type CSSResultGroup, type TemplateResult, type PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
// shoelace
import type SlTabGroup from "@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js";

import delay from 'delay'
// enibook
import { AnswerForm } from "../answer-form/answer-form.js";
import { CodeIt } from "../code/code.js";
import { FrameIt } from "../frame/frame.js";
import styles from "./playground.css.js"

@customElement('playground-it')
export class PlaygroundIt extends AnswerForm {
  /** Style propre à la classe. */
  static styles: CSSResultGroup = [super.styles, styles];

  protected initialCode: string = '';
  protected initialCompiledCode: string = ''
  protected initialHead: string = '';
  protected initialHeader: string = '';
  protected initialMain: string = '';
  protected initialFooter: string = '';


  @query('.playground__editor') editorElement!: CodeIt

  @query('sl-tab-panel[name="script"]') scriptEditorElement!: CodeIt

  @query('.playground__frame') frameElement!: FrameIt
  
  @query('.playground-it') baseElement!: HTMLElement

  @query('[part="tabs"]') tabsElement!: SlTabGroup

  public editor!: CodeIt

  public frame!: FrameIt

  @property({ type: Boolean, reflect: true })
  full: boolean = false

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

  /** Le fichier `html` dont le contenu est à ajouter dans la section `<main>`. */
  @property({ type: String, reflect: true, attribute: 'main-filename' }) mainFilename = '';

  /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
  @property({ type: String, reflect: true, attribute: 'head-filename' }) headFilename = '';

  /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
  @property({ type: String, reflect: true, attribute: 'header-filename' }) headerFilename = '';

  /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
  @property({ type: String, reflect: true, attribute: 'footer-filename' }) footerFilename = '';
    
  
  createEditor(): CodeIt {
    const initialCode = `<script type="enibook/src">${this.initialCode}</script>`
    const editor = new CodeIt()
    editor.classList.add('playground__editor__script')
    editor.language = this.language
    editor.readOnly = this.readOnly
    editor.lineNumbers = true
    editor.innerHTML = initialCode
    return editor
  }

  createFrame(): FrameIt {
    const initialHead = `<script type="enibook/head">${this.initialHead}</script>`
    const initialHeader = `<script type="enibook/header">${this.initialHeader}</script>`
    const initialMain = `<script type="enibook/main">${this.initialCompiledCode}</script>`
    const initialFooter = `<script type="enibook/footer">${this.initialFooter}</script>`
    const frame = new FrameIt()
    frame.classList.add('playground__frame')
    frame.border = false
    frame.innerHTML = `
      ${initialHead}
      ${initialHeader}
      ${initialMain}
      ${initialFooter}
    `
    return frame
  }

  createListener(): void {}
  

  protected async firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>) {
    this.initialHead += await this.getCode(this.headFilename, 'head');
    this.initialHeader += await this.getCode(this.headerFilename, 'header');
    this.initialFooter += await this.getCode(this.footerFilename, 'footer');
    this.initialMain += await this.getCode(this.mainFilename, 'main');
    this.initialCode += await this.getCode(this.codeFilename, 'src');
    //this.initialCompiledCode += this.compile(this.initialCode)
    this.editor = this.createEditor()
    this.frame = this.createFrame()
    this.scriptEditorElement.appendChild(this.editor)
    this.baseElement.appendChild(this.frame)
    this.createListener()
  }

  get answer(): unknown {
    throw new Error("Method not implemented.");
  }

  render(): TemplateResult {
    return html`
      <div part="base">
        <sl-tab-group part="tabs" style="border:1px solid green">
          <sl-tab slot="nav" panel="script">Script ${this.language}</sl-tab>
          <sl-tab slot="nav" panel="web">Page Web</sl-tab>

          <sl-tab-panel part="web" name="web">
            <sl-tab-group>
              <sl-tab slot="nav" panel="page">Page</sl-tab>
              <sl-tab slot="nav" panel="head">Head</sl-tab>
              <sl-tab slot="nav" panel="css">Style</sl-tab>
              <sl-tab slot="nav" panel="header">Header</sl-tab>
              <sl-tab slot="nav" panel="main">Main</sl-tab>
              <sl-tab slot="nav" panel="footer">Footer</sl-tab>

              <sl-tab-panel name="page">
                <code-it language="html" read-only>
                  <script type="enibook/src"><p>hello</p></script>
                </code-it>
              </sl-tab-panel>
              <sl-tab-panel name="head">
                <code-it language="html">
                  <script type="enibook/src">${this.initialHead}</script>
                </code-it>
              </sl-tab-panel>
              <sl-tab-panel name="header">
                <code-it language="html">
                  <script type="enibook/src">${this.initialHeader}</script>
                </code-it>
              </sl-tab-panel>
              <sl-tab-panel name="footer">
                <code-it language="html" read-only>
                  <script type="enibook/src">${this.initialCompiledCode}</script>
                </code-it>
              </sl-tab-panel>
              <sl-tab-panel name="css"></sl-tab-panel>
            </sl-tab-group>
          </sl-tab-panel>
          <sl-tab-panel part="script" name="script">
          </sl-tab-panel>
        </sl-tab-group>
        <div part="playground" class="playground-it"></div>
      </div>
    `
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }

  async updateFrame(text: string, consoleOutput: string) {
    this.frame.srcDoc = ""
    this.frame.srcDoc = this.frame.getTemplate({ 
      head: this.initialHead, 
      header: this.initialHeader, 
      main: text, 
      consoleOutput,
      footer: this.initialFooter 
    })
    await delay(200)
    this.updateFrameHeight()
  }

  updateFrameHeight() {
    const body = this.frame.frameElement.contentWindow?.document.body;
    const html = this.frame.frameElement.contentWindow?.document.documentElement;
    if (body && html) {
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      this.frame.frameElement.style.height = `${height}px`;
    }
  }

  workerScript(): TemplateResult {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-it': PlaygroundIt;
  }
}

