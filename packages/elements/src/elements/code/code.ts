// lit
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { html } from 'lit';
import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// shoelace
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import type SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import type SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
// codemirror
import * as command from '@codemirror/commands';
import * as search from '@codemirror/search';
import { basicSetup } from 'codemirror';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, placeholder } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { indentUnit } from '@codemirror/language';
import type { Command } from '@codemirror/view';
import type { Extension, StateField } from '@codemirror/state';
// enibook
import '../toolbar/toolbar';
import { svgIcon } from '../../utilities/icons.js';
import { emit } from '../../utilities/emit.js';
import { dedentText } from '../../utilities/dedent.js';
import { AnswerForm } from '../answer-form/answer-form.js';
import { frenchPhrases } from './locales/fr.js';
import { getKeymap } from './code-keymap.js';
import { darkTheme } from './themes/dark.js';
import { lightTheme } from './themes/light.js';
import { languages } from './languages/languages.js';
import styles from './code.css.js';

const outlineNone = EditorView.theme({
  '&.cm-editor.cm-focused': { outline: 'none' }
});

const eventHandler = EditorView.domEventHandlers({
  keyup(_event, view) {
    emit(view.dom, 'keyup-mouseup-it');
  },
  mouseup(_event, view) {
    emit(view.dom, 'keyup-mouseup-it');
  }
});

const helpKeymap = [
  {
    key: 'F1',
    run(view: EditorView) {
      emit(view.dom, 'toggle-toolbar-it');
      return true;
    }
  },
  {
    key: 'F4',
    run(view: EditorView) {
      const lineKeymap = CodeIt.keymap.filter(map => map.name === 'gotoLine');
      if (lineKeymap.length === 1) {
        lineKeymap[0].run(view);
      }
      return true;
    }
  },
  command.indentWithTab
];

/**
 * Editeur de code.
 *
 * @summary Editeur de code source.
 *
 * @csspart editor - Le conteneur de l'éditeur.
 * @csspart menuButton - Le conteneur du bouton d'accessibilité aux barres d'outils et d'information.
 * @csspart statusbar - Le conteneur de la barre d'information.
 * @csspart toolbar - Le conteneur de la barre d'outils.
 */
@customElement('code-it')
export class CodeIt extends AnswerForm {
  static styles: CSSResultGroup = [super.styles, styles];

  /** @ignore */
  static keymap: { name: string; key: string; run: Command }[] = getKeymap();

  // private firstUpdateOk = false

  protected _language = 'text';
  protected _placeholder = "F1: afficher/masquer les barres d'outils et d'informations";
  protected _readOnly = false;
  protected _indentSize = 2;
  protected _theme: 'dark' | 'light' = 'dark';

  @state() protected message = '';

  protected theEditor!: EditorView;
  protected extensions: (Extension | (StateField<boolean> | Extension)[])[] = [];
  protected initialDoc = '';

  protected languageConfig = new Compartment();
  protected lineNumbersConfig = new Compartment();
  protected placeholderConfig = new Compartment();
  protected readOnlyConfig = new Compartment();
  protected indentationConfig = new Compartment();
  protected themeConfig = new Compartment();

  @query('.editor') protected editorContainer!: HTMLElement;
  @query('.output__iframe') protected iframe!: HTMLIFrameElement;
  @query('sl-menu.dropdown__languages') protected menuLanguages!: SlMenu;
  @queryAll('sl-menu.dropdown__languages > sl-menu-item') protected languageMenuItems!: SlMenuItem[];

  @state() protected cursorLine = 0;
  @state() protected cursorColumn = 0;
  @state() protected srcDoc = '';

  /**
   * Le nombre d'espaces pour une indentation (défaut: 2).
   *
   * @readonly
   * @type {number}
   * @memberof CodeEditIt
   */
  @property({ type: Number, reflect: true, attribute: 'indent-size' })
  get indentSize(): number {
    return this._indentSize;
  }
  set indentSize(value: number) {
    if (value !== this._indentSize) {
      this._indentSize = value;
      if (this.theEditor) {
        this.setIndentationExtension();
      }
    }
  }

  /**
   * Le langage à éditer.
   *
   * @readonly
   * @type {string}
   * @memberof CodeEditIt
   */
  @property({ type: String, reflect: true })
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    if (value !== this._language) {
      this._language = value;
      if (this.theEditor) {
        this.setLanguageExtension();
      }
    }
  }

  /**
   * Numéroter les lignes de l'éditeur.
   *
   * @type {boolean}
   * @memberof CodeEditIt
   */
  @property({ type: Boolean, reflect: true, attribute: 'line-numbers' }) lineNumbers: boolean = false;

  /**
   * L'invite de l'éditeur.
   *
   * @readonly
   * @type {string}
   * @memberof CodeEditIt
   */
  @property({ type: String, reflect: true })
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    if (value !== this._placeholder) {
      this._placeholder = value;
      if (this.theEditor) {
        this.setPlaceholderExtension();
      }
    }
  }

  /** @ignore */
  @property({ type: Boolean, reflect: true }) preview: boolean = false;

  /**
   * Passe l'éditeur en mode « lecture seule » (ie. modifications interdites; défaut: false).
   *
   * @readonly
   * @type {boolean}
   * @memberof CodeEditIt
   */
  @property({ type: Boolean, reflect: true, attribute: 'read-only' })
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(value: boolean) {
    if (value !== this._readOnly) {
      this._readOnly = value;
      if (this.theEditor) {
        this.setReadOnlyExtension();
      }
    }
  }

  /**
   * Le fichier source à éditer.
   *
   * @memberof CodeEditIt
   */
  @property({ type: String, reflect: true }) src = '';

  /**
   * Le thème (clair: `light` ou sombre: `dark`) de l'éditeur (défaut: `dark`).
   *
   * @readonly
   * @type {('light' | 'dark')}
   * @memberof CodeEditIt
   */
  @property({ type: String, reflect: true })
  get theme(): 'light' | 'dark' {
    return this._theme;
  }
  set theme(value: 'light' | 'dark') {
    if (value !== this._theme) {
      this._theme = value;
      if (this.theEditor) {
        this.setThemeExtension();
      }
    }
  }

  /**
   * Affiche les barres d'outils et d'informations.
   *
   * @memberof CodeEditIt
   */
  @property({ type: Boolean, reflect: true }) toolbar = false;

  /**
   * Le contenu de l'éditeur.
   *
   * @readonly
   * @type {string}
   * @memberof CodeEditIt
   */
  @property({ attribute: false })
  get value(): string {
    let res = this.initialDoc;
    if (this.theEditor) {
      res = this.theEditor.state.doc.toString();
    }
    return res;
  }
  set value(value: string) {
    if (value !== this.value) {
      if (this.theEditor) {
        this.theEditor.dispatch({
          changes: {
            from: 0,
            to: this.theEditor.state.doc.length,
            insert: value
          }
        });
      }
    }
  }

  /**
   * La réponse de l'éditeur.
   *
   * @returns {string}
   */
  answer(): string {
    return this.value;
  }

  protected get indentString(): string {
    let res = '';
    for (let i = 0; i < this.indentSize; i++) {
      res = res.concat(' ');
    }
    return res;
  }

  /**
   * Le nom courant de l'élément.
   *
   * @readonly
   * @type {string}
   */
  get tagTitle(): string {
    return `Editeur de code ${this.language}`;
  }

  protected compile(value: string): string {
    return value;
  }

  protected createListeners() {
    this.addEventListener('keyup-mouseup-it', () => {
      const theState = this.theEditor.state;
      this.cursorLine = theState.doc.lineAt(theState.selection.main.head).number;
      this.cursorColumn = theState.selection.main.head - theState.doc.lineAt(theState.selection.main.head).from;
    });
    this.addEventListener('toggle-toolbar-it', () => {
      this.toolbar = !this.toolbar;
    });
    this.addEventListener('feedback-requested-it', () => {
      this.srcDoc = this.value;
    });
  }

  protected async fetchContent(src: string): Promise<string> {
    return await this.fetchSrc(src ?? '');
  }

  protected async fetchSrc(src: string): Promise<string> {
    const response = await fetch(src);
    return response.text();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>) {
    this.formLegend = `Edition de code ${this.language}`;
    this.extensions = this.getInitialExtensions();
    this.theEditor = new EditorView({
      doc: '',
      extensions: this.extensions,
      parent: this.editorContainer,
      root: this.shadowRoot as Document | ShadowRoot
    });
    this.value = await this.getInitialDoc();
    this.setLanguageExtension();
    this.createListeners();
  }

  protected getHelpUrl(): string {
    if (this.isValidLanguage(this.language)) {
      return languages[this.language].helpUrl;
    } else {
      return `https://devdocs.io/${this.language}/`;
    }
  }

  protected async getInitialDoc(): Promise<string> {
    this.initialDoc = '';
    if (this.src) {
      console.log('SRC', this.src);
      await this.fetchContent(this.src).then(response => {
        console.log('RESP', response);
        this.initialDoc += response;
      });
      console.log('RES', this.initialDoc);
    } else {
      const innerScriptTag = this.querySelector('script[type="enibook"]');
      if (innerScriptTag) {
        const scriptDoc = dedentText(innerScriptTag.innerHTML);
        this.initialDoc += scriptDoc.replace(/&lt;(\/?script)(.*?)&gt;/g, '<$1$2>');
      }
    }
    return this.initialDoc;
  }

  protected getInitialExtensions(): (Extension | (StateField<boolean> | Extension)[])[] {
    const that = this;
    const res: (Extension | (StateField<boolean> | Extension)[])[] = [
      basicSetup,
      EditorState.phrases.of(frenchPhrases),
      eventHandler,
      indentationMarkers({
        highlightActiveBlock: false,
        hideFirstIndent: true
      }),
      keymap.of(helpKeymap),
      this.indentationConfig.of(indentUnit.of(this.indentString)),
      this.languageConfig.of([]),
      this.lineNumbers
        ? this.lineNumbersConfig.of(lineNumbers())
        : this.lineNumbersConfig.of(lineNumbers({ formatNumber: () => '' })),
      EditorView.lineWrapping,
      outlineNone,
      this.placeholderConfig.of(placeholder(this.placeholder)),
      this.readOnlyConfig.of(EditorState.readOnly.of(this.readOnly)),
      this.themeConfig.of(this.theme === 'dark' ? darkTheme : lightTheme),
      EditorView.updateListener.of(function () {
        that.srcDoc = that.compile(that.value);
      })
    ];
    return res;
  }

  /** Liste des langages reconnus par l'éditeur */
  get validLanguages(): string[] {
    return Object.keys(languages);
  }

  protected handleCopyClipboard() {
    navigator.clipboard.writeText(this.value).then(
      () => {
        this.notify("Contenu de l'éditeur copié dans le presse-papier.", 'success', 'it-mdi-check-circle-outline');
      },
      () => {
        this.notify("A priori, interdiction d'écrire dans le presse-papier !", 'warning', 'it-mdi-alert-outline');
      }
    );
  }

  protected handleLineNumbers() {
    this.lineNumbers = !this.lineNumbers;
    this.theEditor.dispatch({
      effects: [
        this.lineNumbers
          ? this.lineNumbersConfig.reconfigure(lineNumbers())
          : this.lineNumbersConfig.reconfigure(lineNumbers({ formatNumber: () => '' }))
      ]
    });
  }

  protected handleSelectCommand(event: CustomEvent) {
    const value = event.detail.item.value as string;
    // eslint-disable-next-line no-eval
    (0, eval)(`${value}(this.editor)`);
  }

  protected handleSelectLanguage(event: CustomEvent) {
    const item = event.detail.item;
    this.languageMenuItems.forEach(anItem => {
      anItem.checked = false;
    });
    item.checked = true;
    this.language = item.value;
    this.theEditor.dispatch({
      effects: [
        this.languageConfig.reconfigure(languages[this.language].cm /*cmLanguages[this.language]*/),
        this.placeholderConfig.reconfigure(placeholder(this.placeholder))
      ]
    });
  }

  /** Teste si un langage fait partie des langages reconnus par l'éditeur. */
  isValidLanguage(language: string): boolean {
    return Object.keys(languages).includes(language);
  }

  /*
  protected async loadLanguage(lang: string): Promise<LanguageSupport | undefined>{
    const desc = LanguageDescription.matchLanguageName(languages, lang, true)
    const support = await desc?.load()
    return support
  }
*/
  protected renderForm(): TemplateResult {
    return html`
      <div part="base" class="code-it">
        <div part="toolbar">${this.renderToolbar()}</div>
        <div class="editor-base">
          <div part="editor" class="editor"></div>
          <div part="menuBtn" class="menu-button">
            ${this.readOnly
              ? html`<sl-tooltip content="copier dans le presse-papier" hoist
                  ><sl-button variant="neutral" size="small" @click=${() => this.handleCopyClipboard()}
                    >${svgIcon('mdi-content-copy')}</sl-button
                  ></sl-tooltip
                >`
              : html`<sl-tooltip content="activer/désactiver les barres d'outils et d'informations" hoist
                  ><sl-button
                    variant="neutral"
                    size="small"
                    @click=${() => {
                      this.toolbar = !this.toolbar;
                    }}
                    >${svgIcon('mdi-tools')}</sl-button
                  ></sl-tooltip
                >`}
            ${this.btnFeedback
              ? html`<sl-tooltip content="interprétation" hoist
                  ><sl-button
                    variant="neutral"
                    size="small"
                    @click=${() => {
                      this.emit('feedback-requested-it');
                    }}
                    >${svgIcon('mdi-play')}</sl-button
                  ></sl-tooltip
                >`
              : html``}
          </div>
        </div>
        <div part="statusbar">${this.renderStatusBar()}</div>
      </div>
    `;
  }

  protected renderCommentButtons(): TemplateResult {
    return html`
      <sl-button-group ?hidden=${this.readOnly} label="commentaires">
        <sl-tooltip content="commenter/décommenter la ligne" hoist>
          <sl-button
            size="small"
            @click=${() => {
              command.toggleComment(this.theEditor);
            }}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              style="vertical-align:middle;display:inline-block"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M5 5v14h2v2H3V3h4v2H5m15 6H7v2h13V7m0 4Z" /></svg
          ></sl-button>
        </sl-tooltip>
        <sl-tooltip content="commenter/décommenter le bloc" hoist>
          <sl-button
            size="small"
            @click=${() => {
              command.toggleBlockComment(this.theEditor);
            }}
            >${svgIcon('mdi-format-list-group')}</sl-button
          >
        </sl-tooltip>
      </sl-button-group>
    `;
  }

  protected renderHistoryButtons(): TemplateResult {
    return html`
      <sl-button-group ?hidden=${this.readOnly} label="historique">
        <sl-tooltip content="annuler toutes les modifications" hoist>
          <sl-button
            size="small"
            @click=${() => {
              this.reset();
            }}
            >${svgIcon('mdi-refresh')}</sl-button
          >
        </sl-tooltip>
        <sl-tooltip content="annuler la dernière modification" hoist>
          <sl-button
            size="small"
            @click=${() => {
              command.undo(this.theEditor);
            }}
            >${svgIcon('mdi-undo')}</sl-button
          >
        </sl-tooltip>
        <sl-tooltip content="rétablir la dernière annulation" hoist>
          <sl-button
            size="small"
            @click=${() => {
              command.redo(this.theEditor);
            }}
            >${svgIcon('mdi-redo')}</sl-button
          >
        </sl-tooltip>
      </sl-button-group>
    `;
  }

  protected renderIndentationButtons(): TemplateResult {
    return html`
      <sl-button-group ?hidden=${this.readOnly} label="indentation">
        <sl-tooltip content="indenter" hoist>
          <sl-button
            size="small"
            @click=${() => {
              command.indentMore(this.theEditor);
            }}
            >${svgIcon('mdi-format-indent-increase')}</sl-button
          >
        </sl-tooltip>
        <sl-tooltip content="désindenter" hoist>
          <sl-button
            size="small"
            @click=${() => {
              command.indentLess(this.theEditor);
            }}
            >${svgIcon('mdi-format-indent-decrease')}</sl-button
          >
        </sl-tooltip>
      </sl-button-group>
    `;
  }

  protected renderMiscButtons(): TemplateResult {
    return html`
      <sl-button-group label="langage et raccourcis clavier">
        <sl-tooltip content="choisir un langage" hoist>
          <sl-dropdown hoist>
            <sl-button slot="trigger" size="small" caret
              >${this.language
                ? unsafeHTML(languages[this.language].logo) /*logos[this.language]*/
                : html`${svgIcon('mdi-help')}`}</sl-button
            >
            <sl-menu class="dropdown__languages" @sl-select=${this.handleSelectLanguage}>
              ${Object.keys(languages).map(
                language =>
                  html`<sl-menu-item type="checkbox" value="${language}" ?checked=${this.language === language}
                    >${language}
                    <div slot="prefix">${unsafeHTML(languages[language].logo)}</div></sl-menu-item
                  >`
              )}
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
        <sl-tooltip content="raccourcis clavier" hoist>
          <sl-dropdown stay-open-on-select hoist ?hidden=${this.readOnly}>
            <sl-button slot="trigger" size="small" caret>${svgIcon('mdi-keyboard')}</sl-button>
            <sl-menu class="dropdown__shortcuts">
              <sl-menu-item disabled
                >Commande
                <div slot="suffix">Raccourci clavier</div></sl-menu-item
              >
              <sl-divider></sl-divider>
              ${CodeIt.keymap.map(
                map =>
                  html`<sl-menu-item
                    @click=${() => {
                      map.run(this.theEditor);
                    }}
                    >${map.run.name}
                    <div slot="suffix">${map.key}</div></sl-menu-item
                  >`
              )}
              <sl-divider></sl-divider>
              <sl-menu-item disabled
                >Commande
                <div slot="suffix">Raccourci clavier</div></sl-menu-item
              >
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
      </sl-button-group>
      <sl-button-group label="outils">
        <sl-tooltip content="afficher/cacher les numéros de ligne" hoist>
          <sl-button size="small" @click=${() => this.handleLineNumbers()}
            >${svgIcon('mdi-format-list-numbered')}</sl-button
          >
        </sl-tooltip>
        <sl-tooltip content="copier dans le presse-papier" hoist>
          <sl-button size="small" @click=${() => this.handleCopyClipboard()}>${svgIcon('mdi-content-copy')}</sl-button>
        </sl-tooltip>
        <sl-tooltip content="changer de thème" hoist>
          <sl-button size="small" @click=${() => this.toggleTheme()}>${svgIcon('mdi-theme-light-dark')}</sl-button>
        </sl-tooltip>
        <sl-tooltip .content=${!this.fullscreen ? 'passer en mode plein écran' : 'quitter le mode plein écran'} hoist>
          <sl-button size="small" @click=${() => this.toggleFullscreen()}>
            ${!this.fullscreen ? html`${svgIcon('mdi-fullscreen')}` : html`${svgIcon('mdi-fullscreen-exit')}`}
          </sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }

  protected renderOutput(): TemplateResult {
    return html`
      <iframe
        class="output__iframe"
        allowfullscreen
        name="output"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
        srcdoc=${this.srcDoc}
      >
      </iframe>
    `;
  }

  protected renderSearchButtons(): TemplateResult {
    return html`
      <sl-button-group label="rechercher/remplacer">
        <sl-tooltip content="${this.readOnly ? 'rechercher' : 'rechercher/remplacer'}" hoist>
          <sl-button
            size="small"
            @click=${() => {
              search.openSearchPanel(this.theEditor);
            }}
            >${svgIcon('mdi-find-replace')}</sl-button
          >
        </sl-tooltip>
        <sl-tooltip content="atteindre la ligne:colonne" hoist>
          <sl-button
            size="small"
            @click=${() => {
              search.gotoLine(this.theEditor);
            }}
            >${svgIcon('mdi-text-search')}</sl-button
          >
        </sl-tooltip>
      </sl-button-group>
    `;
  }

  protected renderStatusBar(): TemplateResult {
    return html`
      <toolbar-it class="statusbar" ?hidden=${!this.toolbar}>
        <sl-button-group slot="end" label="informations">
          <sl-tooltip content="numéros de la ligne et de la colonne courantes" hoist>
            <sl-button size="small" variant="neutral">L ${this.cursorLine} - C ${this.cursorColumn}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="indentation en nombre d'espaces" hoist>
            <sl-button size="small" variant="neutral">Indent : ${this.indentSize}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="format de données Mime et lien sur une page d'aide" hoist>
            <sl-button size="small" variant="neutral" href="${this.getHelpUrl()}" target="_blank"
              >${languages[this.language].mime}</sl-button
            >
          </sl-tooltip>
          <sl-tooltip content="mode de l'éditeur : édition ou lecture seule" hoist>
            <sl-button size="small" variant="neutral">${this.readOnly ? html`lecture seule` : html`édition`}</sl-button>
          </sl-tooltip>
        </sl-button-group>
      </toolbar-it>
    `;
  }

  protected renderToolbar(): TemplateResult {
    return html`
      <toolbar-it class="toolbar" ?hidden=${!this.toolbar}>
        <div slot="start">
          ${this.renderHistoryButtons()} ${this.renderIndentationButtons()} ${this.renderCommentButtons()}
          ${this.renderSearchButtons()}
        </div>
        <div slot="end">${this.renderMiscButtons()}</div>
      </toolbar-it>
    `;
  }

  /**
   * Réinitialiser l'éditeur.
   *
   * @memberof CodeEditIt
   */
  reset(): void {
    this.value = this.initialDoc;
  }

  protected async setLanguageExtension() {
    const langs = Object.keys(languages);
    if (langs.includes(this.language)) {
      this.theEditor.dispatch({
        effects: [this.languageConfig.reconfigure(languages[this.language].cm)]
      });
    }
  }

  protected setPlaceholderExtension() {
    this.theEditor.dispatch({
      effects: [this.placeholderConfig.reconfigure(placeholder(this.placeholder))]
    });
  }

  protected setReadOnlyExtension() {
    this.theEditor.dispatch({
      effects: [this.readOnlyConfig.reconfigure(EditorState.readOnly.of(this.readOnly))]
    });
  }

  protected setIndentationExtension() {
    this.theEditor.dispatch({
      effects: [this.indentationConfig.reconfigure(indentUnit.of(this.indentString))]
    });
  }

  protected setThemeExtension() {
    this.theEditor.dispatch({
      effects: [this.themeConfig.reconfigure(this.theme === 'dark' ? darkTheme : lightTheme)]
    });
  }

  /** Syntaxe asciidoc équivalente */
  toAsciidoc(): string {
    return 'Editeur de code';
  }

  protected toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.setThemeExtension();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('fieldset')) {
      this.editorContainer.innerHTML = '';
      this.editorContainer.appendChild(this.theEditor.dom);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-it': CodeIt;
  }
}

/*
if (customElements && !customElements.get('code-it')) {
  customElements.define('code-it', CodeIt)
}
*/

/*
        <!--
        <sl-tooltip .content=${!this.fullscreen ? 'passer en mode plein écran' : 'quitter le mode plein écran'} hoist>
          <sl-button size="small" @click=${() => this.toggleFullscreen()}>
            ${!this.fullscreen ? html`<it-mdi-fullscreen></it-mdi-fullscreen>` : html`<it-mdi-fullscreen-exit></it-mdi-fullscreen-exit>`}
          </sl-button>
        </sl-tooltip>
        -->
*/
