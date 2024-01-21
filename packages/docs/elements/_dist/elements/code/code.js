var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
// lit
import { property, query, queryAll, state } from 'lit/decorators.js';
import { css, html, unsafeCSS } from 'lit';
// shoelace
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
// codemirror
import * as command from '@codemirror/commands';
import * as search from '@codemirror/search';
import { basicSetup } from "codemirror";
/*
import { asciidoc as cmAsciidoc } from "codemirror-asciidoc"
import { css as cmCss } from "@codemirror/lang-css"
import { html as cmHtml } from "@codemirror/lang-html"
import { javascript as cmJavascript} from "@codemirror/lang-javascript"
import { json as cmJson } from "@codemirror/lang-json"
import { markdown as cmMarkdown } from "@codemirror/lang-markdown"
import { prolog as cmProlog } from 'codemirror-lang-prolog'
import { python as cmPython } from '@codemirror/lang-python'
import { sql as cmSql } from "@codemirror/lang-sql"
*/
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, placeholder } from "@codemirror/view";
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { indentUnit /*, LanguageDescription, StreamLanguage */ } from "@codemirror/language";
// enibook
import '../toolbar/toolbar';
import { emit } from '../../utilities/emit';
import { dedentText } from '../../utilities/dedent';
import { AnswerForm } from '../answer-form/answer-form';
import { frenchPhrases } from './locales/fr';
import { getKeymap } from './code-keymap';
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import styles from './code.css?inline';
const outlineNone = EditorView.theme({
    "&.cm-editor.cm-focused": { outline: 'none' },
});
const eventHandler = EditorView.domEventHandlers({
    keyup(_event, view) { emit(view.dom, 'keyup-mouseup-it'); },
    mouseup(_event, view) { emit(view.dom, 'keyup-mouseup-it'); },
});
const helpKeymap = [
    {
        key: "F1",
        run(view) {
            emit(view.dom, 'toggle-toolbar-it');
            return true;
        }
    },
    {
        key: "F4",
        run(view) {
            const lineKeymap = CodeIt.keymap.filter(map => map.name === 'gotoLine');
            if (lineKeymap.length === 1) {
                lineKeymap[0].run(view);
            }
            return true;
        }
    },
    command.indentWithTab
];
/*
const cmLanguages = {
  'asciidoc': StreamLanguage.define(cmAsciidoc),
  'css': cmCss(),
  'html': cmHtml(),
  'javascript': cmJavascript(),
  'json': cmJson(),
  'markdown': cmMarkdown(),
  'prolog': cmProlog(),
  'python': cmPython(),
  'sql': cmSql(),
  'text': [],
  'typescript': cmJavascript({ 'typescript': true })
}
*/
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
export class CodeIt extends (_b = AnswerForm) {
    constructor() {
        super(...arguments);
        // private firstUpdateOk = false
        this._language = 'text';
        this._placeholder = "F1: afficher/masquer les barres d'outils et d'informations";
        this._readOnly = false;
        this._indentSize = 2;
        this._theme = 'dark';
        this.message = '';
        this.extensions = [];
        this.initialDoc = '';
        this.languageConfig = new Compartment();
        this.lineNumbersConfig = new Compartment();
        this.placeholderConfig = new Compartment();
        this.readOnlyConfig = new Compartment();
        this.indentationConfig = new Compartment();
        this.themeConfig = new Compartment();
        this.cursorLine = 0;
        this.cursorColumn = 0;
        /**
         * Numéroter les lignes de l'éditeur.
         *
         * @type {string}
         * @memberof CodeEditIt
         */
        this.lineNumbers = false;
        /**
         * Le fichier source à éditer.
         *
         * @memberof CodeEditIt
         */
        this.src = '';
        /**
         * Affiche les barres d'outils et d'informations.
         *
         * @memberof CodeEditIt
         */
        this.toolbar = false;
    }
    /**
     * Le nombre d'espaces pour une indentation (défaut: 2).
     *
     * @readonly
     * @type {number}
     * @memberof CodeEditIt
     */
    get indentSize() {
        return this._indentSize;
    }
    set indentSize(value) {
        if (value !== this._indentSize) {
            this._indentSize = value;
            if (this.editor) {
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
    get language() {
        return this._language;
    }
    set language(value) {
        if (value !== this._language) {
            this._language = value;
            if (this.editor) {
                this.setLanguageExtension();
            }
        }
    }
    /**
     * L'invite de l'éditeur.
     *
     * @readonly
     * @type {string}
     * @memberof CodeEditIt
     */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        if (value !== this._placeholder) {
            this._placeholder = value;
            if (this.editor) {
                this.setPlaceholderExtension();
            }
        }
    }
    /**
     * Passe l'éditeur en mode « lecture seule » (ie. modifications interdites).
     *
     * @readonly
     * @type {boolean}
     * @memberof CodeEditIt
     */
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        if (value !== this._readOnly) {
            this._readOnly = value;
            if (this.editor) {
                this.setReadOnlyExtension();
            }
        }
    }
    /**
     * Le thème (clair: `light` ou sombre: `dark`) de l'éditeur (défaut: `dark`).
     *
     * @readonly
     * @type {('light' | 'dark')}
     * @memberof CodeEditIt
     */
    get theme() {
        return this._theme;
    }
    set theme(value) {
        if (value !== this._theme) {
            this._theme = value;
            if (this.editor) {
                this.setThemeExtension();
            }
        }
    }
    /**
     * Le contenu de l'éditeur.
     *
     * @readonly
     * @type {string}
     * @memberof CodeEditIt
     */
    get value() {
        let res = this.initialDoc;
        if (this.editor) {
            res = this.editor.state.doc.toString();
        }
        return res;
    }
    set value(value) {
        if (value !== this.value) {
            if (this.editor) {
                this.editor.dispatch({
                    changes: {
                        from: 0,
                        to: this.editor.state.doc.length,
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
     * @memberof CodeEditIt
     */
    answer() {
        return this.value;
    }
    get indentString() {
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
     * @memberof CodeEditIt
     */
    get tagTitle() {
        return `Editeur de code ${this.language}`;
    }
    createListeners() {
        this.addEventListener('keyup-mouseup-it', () => {
            const theState = this.editor.state;
            this.cursorLine = theState.doc.lineAt(theState.selection.main.head).number;
            this.cursorColumn = theState.selection.main.head - theState.doc.lineAt(theState.selection.main.head).from;
        });
        this.addEventListener('toggle-toolbar-it', () => { this.toolbar = !this.toolbar; });
    }
    async fetchContent(src) {
        return await this.fetchSrc(src ?? '');
    }
    async fetchSrc(src) {
        const response = await fetch(src);
        return response.text();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async firstUpdated(_changedProperties) {
        this.legend = `Editeur de code ${this.language}`;
        this.extensions = this.getInitialExtensions();
        this.editor = new EditorView({
            doc: "",
            extensions: this.extensions,
            parent: this.editorContainer,
            root: this.shadowRoot
        });
        this.value = await this.getInitialDoc();
        this.setLanguageExtension();
        this.createListeners();
        // this.firstUpdateOk = true
    }
    getCmLang() {
        const lang = [];
        return lang;
    }
    getHelpUrl(language) {
        if (this.language && this.language !== 'text') {
            return `https://devdocs.io/${language}/`;
        }
        else {
            return '';
        }
    }
    async getInitialDoc() {
        this.initialDoc = '';
        if (this.src) {
            console.log('SRC', this.src);
            await this.fetchContent(this.src).then(response => {
                console.log('RESP', response);
                this.initialDoc += response;
            });
            console.log('RES', this.initialDoc);
        }
        else {
            const innerScriptTag = this.querySelector('script[type="enibook"]');
            if (innerScriptTag) {
                const scriptDoc = dedentText(innerScriptTag.innerHTML);
                this.initialDoc += scriptDoc.replace(/&lt;(\/?script)(.*?)&gt;/g, '<$1$2>');
            }
        }
        return this.initialDoc;
    }
    getInitialExtensions() {
        const res = [
            basicSetup,
            EditorState.phrases.of(frenchPhrases),
            eventHandler,
            indentationMarkers({
                highlightActiveBlock: false,
                hideFirstIndent: true,
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
        ];
        return res;
    }
    handleCopyClipboard() {
        navigator.clipboard.writeText(this.value).then(() => { this.notify("Contenu de l'éditeur copié dans le presse-papier.", "success", "it-mdi-check-circle-outline"); }, () => { this.notify("A priori, interdiction d'écrire dans le presse-papier !", "warning", "it-mdi-alert-outline"); });
    }
    handleLineNumbers() {
        this.lineNumbers = !this.lineNumbers;
        this.editor.dispatch({
            effects: [
                this.lineNumbers
                    ? this.lineNumbersConfig.reconfigure(lineNumbers())
                    : this.lineNumbersConfig.reconfigure(lineNumbers({ formatNumber: () => '' }))
            ]
        });
    }
    handleSelectCommand(event) {
        const value = event.detail.item.value;
        // eslint-disable-next-line no-eval
        (0, eval)(`${value}(this.editor)`);
    }
    /*
    protected handleSelectLanguage(event: CustomEvent) {
      const item = event.detail.item
      this.languageMenuItems.forEach(anItem => { anItem.checked = false })
      item.checked = true
      this.language = item.value
      this.editor.dispatch({
        effects: [
          this.languageConfig.reconfigure(this.getCmLang()),
          this.placeholderConfig.reconfigure(placeholder(this.placeholder))
        ]
      })
    }
    */
    /*
     protected async loadLanguage(lang: string): Promise<LanguageSupport | undefined>{
       const desc = LanguageDescription.matchLanguageName(languages, lang, true)
       const support = await desc?.load()
       return support
     }
     */
    renderAnswer() {
        return html `
      <div part="base" class="code-edit">
        <div part="toolbar">
          ${this.renderToolbar()}
        </div>
        <div class="editor-base">
          <div part="editor" class="editor"></div>
          <div part="menuBtn" class="menu-button">
            <sl-tooltip content="activer/désactiver les barres d'outils et d'informations">
              <sl-button variant="neutral" size="small" @click=${() => { this.toolbar = !this.toolbar; }}><it-mdi-tools></it-mdi-tools></sl-button>
            </sl-tooltip>
            ${this.btnFeedback
            ? html `<sl-tooltip content="interprétation"><sl-button variant="neutral" size="small" @click=${() => { this.emit('feedback-requested-it'); }}><it-mdi-play></it-mdi-play></sl-button></sl-tooltip>`
            : html ``}
          </div>
        </div>
        <div part="statusbar">
          ${this.renderStatusBar()}
        </div>
      </div>
    `;
    }
    renderCommentButtons() {
        return html `
      <sl-button-group ?hidden=${this.readOnly} label="commentaires">
        <sl-tooltip content="commenter/décommenter la ligne">
          <sl-button size="small" @click=${() => { command.toggleComment(this.editor); }}><svg xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;display:inline-block" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5v14h2v2H3V3h4v2H5m15 6H7v2h13V7m0 4Z"/></svg></sl-button>
        </sl-tooltip>
        <sl-tooltip content="commenter/décommenter le bloc">
          <sl-button size="small" @click=${() => { command.toggleBlockComment(this.editor); }}><it-mdi-format-list-group></it-mdi-format-list-group></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderHistoryButtons() {
        return html `
      <sl-button-group ?hidden=${this.readOnly} label="historique">
        <sl-tooltip content="annuler toutes les modifications">
          <sl-button size="small" @click=${() => { this.reset(); }}><it-mdi-refresh></it-mdi-refresh></sl-button>
        </sl-tooltip>
        <sl-tooltip content="annuler la dernière modification">
          <sl-button size="small" @click=${() => { command.undo(this.editor); }}><it-mdi-undo></it-mdi-undo></sl-button>
        </sl-tooltip>
        <sl-tooltip content="rétablir la dernière annulation">
          <sl-button size="small" @click=${() => { command.redo(this.editor); }}><it-mdi-redo></it-mdi-redo></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderIndentationButtons() {
        return html `
      <sl-button-group ?hidden=${this.readOnly} label="indentation">
        <sl-tooltip content="indenter">
          <sl-button size="small" @click=${() => { command.indentMore(this.editor); }}><it-mdi-format-indent-increase></it-mdi-format-indent-increase></sl-button>
        </sl-tooltip>
        <sl-tooltip content="désindenter">
          <sl-button size="small" @click=${() => { command.indentLess(this.editor); }}><it-mdi-format-indent-decrease></it-mdi-format-indent-decrease></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderMiscButtons() {
        return html `
      <sl-button-group label="outils">
        <sl-tooltip content="afficher/cacher les numéros de ligne">
          <sl-button size="small" @click=${() => this.handleLineNumbers()}><it-mdi-format-list-numbered></it-mdi-format-list-numbered></sl-button>
        </sl-tooltip>
        <sl-tooltip content="raccourcis clavier">
          <sl-dropdown stay-open-on-select hoist ?hidden=${this.readOnly}>
            <sl-button slot="trigger" size="small" caret><it-mdi-keyboard></it-mdi-keyboard></sl-button>
            <sl-menu class="dropdown__shortcuts">
              <sl-menu-item disabled>Commande<div slot="suffix">Raccourci clavier</div></sl-menu-item>
              <sl-divider></sl-divider>
              ${_a.keymap.map(map => html `<sl-menu-item @click=${() => { map.run(this.editor); }}>${map.name}<div slot="suffix">${map.key}</div></sl-menu-item>`)}
              <sl-divider></sl-divider>
              <sl-menu-item disabled>Commande<div slot="suffix">Raccourci clavier</div></sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
        <sl-tooltip content="copier dans le presse-papier">
          <sl-button size="small" @click=${() => this.handleCopyClipboard()}><it-mdi-content-copy></it-mdi-content-copy></sl-button>
        </sl-tooltip>
        <sl-tooltip content="changer de thème">
          <sl-button size="small" @click=${() => this.toggleTheme()}><it-mdi-theme-light-dark></it-mdi-theme-light-dark></sl-button>
        </sl-tooltip>
        <sl-tooltip .content=${!this.fullscreen ? 'passer en mode plein écran' : 'quitter le mode plein écran'}>
          <sl-button size="small" @click=${() => this.toggleFullscreen()}>
            ${!this.fullscreen ? html `<it-mdi-fullscreen></it-mdi-fullscreen>` : html `<it-mdi-fullscreen-exit></it-mdi-fullscreen-exit>`}
          </sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderSearchButtons() {
        return html `
      <sl-button-group label="rechercher/remplacer">
        <sl-tooltip content="${this.readOnly ? 'rechercher' : 'rechercher/remplacer'}">
          <sl-button size="small" @click=${() => { search.openSearchPanel(this.editor); }}><it-mdi-find-replace></it-mdi-find-replace></sl-button>
        </sl-tooltip>
        <sl-tooltip content="atteindre la ligne:colonne">
          <sl-button size="small" @click=${() => { search.gotoLine(this.editor); }}><it-mdi-text-search></it-mdi-text-search></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderStatusBar() {
        return html `
      <toolbar-it class="statusbar" ?hidden=${!this.toolbar}>
        <sl-button-group slot="end" label="informations">
          <sl-button size="small" variant="neutral">L ${this.cursorLine} - C ${this.cursorColumn}</sl-button>
          <sl-button size="small" variant="neutral">Indentation : ${this.indentSize}</sl-button>
          <sl-button size="small" variant="neutral" href="${this.getHelpUrl(this.language)}" target="_blank">Langage : ${this.language}</sl-button>
          <sl-button size="small" variant="neutral">Mode : ${this.readOnly ? html `lecture seule` : html `édition`}</sl-button>
        </sl-button-group>
      </toolbar-it>
    `;
    }
    renderToolbar() {
        return html `
      <toolbar-it class="toolbar" ?hidden=${!this.toolbar}>
        <div slot="start">
          ${this.renderHistoryButtons()}
          ${this.renderIndentationButtons()}
          ${this.renderCommentButtons()}
          ${this.renderSearchButtons()}
        </div>
        <div slot="end">
          ${this.renderMiscButtons()}
        </div>
      </toolbar-it>
    `;
    }
    /**
     * Réinitialiser l'éditeur.
     *
     * @memberof CodeEditIt
     */
    reset() {
        this.value = this.initialDoc;
    }
    async setLanguageExtension() {
        if (this.language && this.language !== 'text') {
            this.editor.dispatch({
                effects: [
                    this.languageConfig.reconfigure(this.getCmLang()),
                ]
            });
        }
    }
    setPlaceholderExtension() {
        this.editor.dispatch({
            effects: [
                this.placeholderConfig.reconfigure(placeholder(this.placeholder))
            ]
        });
    }
    setReadOnlyExtension() {
        this.editor.dispatch({
            effects: [
                this.readOnlyConfig.reconfigure(EditorState.readOnly.of(this.readOnly))
            ]
        });
    }
    setIndentationExtension() {
        this.editor.dispatch({
            effects: [
                this.indentationConfig.reconfigure(indentUnit.of(this.indentString))
            ]
        });
    }
    setThemeExtension() {
        this.editor.dispatch({
            effects: [
                this.themeConfig.reconfigure(this.theme === 'dark' ? darkTheme : lightTheme)
            ]
        });
    }
    toAsciidoc() {
        return 'Editeur de code';
    }
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.setThemeExtension();
    }
    updated(changedProperties) {
        if (changedProperties.has('fieldset')) {
            this.editorContainer.innerHTML = '';
            this.editorContainer.appendChild(this.editor.dom);
        }
    }
}
_a = CodeIt;
CodeIt.styles = [
    Reflect.get(_b, "styles", _a),
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
/** @ignore */
CodeIt.keymap = getKeymap();
__decorate([
    state()
], CodeIt.prototype, "message", void 0);
__decorate([
    query('.editor')
], CodeIt.prototype, "editorContainer", void 0);
__decorate([
    query('sl-menu.dropdown__languages')
], CodeIt.prototype, "menuLanguages", void 0);
__decorate([
    queryAll('sl-menu.dropdown__languages > sl-menu-item')
], CodeIt.prototype, "languageMenuItems", void 0);
__decorate([
    state()
], CodeIt.prototype, "cursorLine", void 0);
__decorate([
    state()
], CodeIt.prototype, "cursorColumn", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'indent-size' })
], CodeIt.prototype, "indentSize", null);
__decorate([
    property({ type: String, reflect: true })
], CodeIt.prototype, "language", null);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'line-numbers' })
], CodeIt.prototype, "lineNumbers", void 0);
__decorate([
    property({ type: String, reflect: true })
], CodeIt.prototype, "placeholder", null);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'read-only' })
], CodeIt.prototype, "readOnly", null);
__decorate([
    property({ type: String, reflect: true })
], CodeIt.prototype, "src", void 0);
__decorate([
    property({ type: String, reflect: true })
], CodeIt.prototype, "theme", null);
__decorate([
    property({ type: Boolean, reflect: false })
], CodeIt.prototype, "toolbar", void 0);
__decorate([
    property({ attribute: false })
], CodeIt.prototype, "value", null);
if (customElements && !customElements.get('code-it')) {
    customElements.define('code-it', CodeIt);
}
