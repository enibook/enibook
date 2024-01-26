var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CodeIt_1;
// lit
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
/* import { asciidoc as cmAsciidoc } from "codemirror-asciidoc"
import { css as cmCss } from "@codemirror/lang-css"
import { html as cmHtml } from "@codemirror/lang-html"
import { javascript as cmJavascript} from "@codemirror/lang-javascript"
import { json as cmJson } from "@codemirror/lang-json"
import { markdown as cmMarkdown } from "@codemirror/lang-markdown"
import { prolog as cmProlog } from 'codemirror-lang-prolog'
import { python as cmPython } from '@codemirror/lang-python'
import { sql as cmSql } from "@codemirror/lang-sql" */
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, placeholder } from "@codemirror/view";
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { indentUnit, /*LanguageDescription, StreamLanguage */ } from "@codemirror/language";
// enibook
import '../toolbar/toolbar';
import { emit } from '../../utilities/emit';
import { dedentText } from '../../utilities/dedent';
import { AnswerForm } from '../answer-form/answer-form';
import { frenchPhrases } from './locales/fr';
import { getKeymap } from './code-keymap';
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';
import { languages } from './languages/languages';
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
const cmLanguages: { [name: string]: Extension } = {
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
/*
const logos: { [name: string]: string } = {
  '': '<it-mdi-help></it-mdi-help>',
  'asciidoc': '<it-simple-icons-asciidoctor></it-simple-icons-asciidoctor>',
  'css': '<it-mdi-language-css3></it-mdi-language-css3>',
  'html': '<it-mdi-language-html5></it-mdi-language-html5>',
  'javascript': '<it-mdi-language-javascript></it-mdi-language-javascript>',
  'json': '<it-mdi-code-json></it-mdi-code-json>',
  'markdown': '<it-mdi-language-markdown></it-mdi-language-markdown>',
  'prolog': '<svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><text x="2" y="15" fill="currentColor" style="font-weight:bold;font-size:inherit">?-</text></svg>',
  'python': '<it-mdi-language-python></it-mdi-language-python>',
  'sql': '<it-mdi-database></it-mdi-database>',
  'text': '<it-mdi-format-text></it-mdi-format-text>',
  'typescript': '<it-mdi-language-typescript></it-mdi-language-typescript>'
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
let CodeIt = CodeIt_1 = class CodeIt extends AnswerForm {
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
         * @type {boolean}
         * @memberof CodeEditIt
         */
        this.lineNumbers = false;
        /** @ignore */
        this.preview = false;
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
    get language() {
        return this._language;
    }
    set language(value) {
        if (value !== this._language) {
            this._language = value;
            if (this.theEditor) {
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
            if (this.theEditor) {
                this.setPlaceholderExtension();
            }
        }
    }
    /**
     * Passe l'éditeur en mode « lecture seule » (ie. modifications interdites; défaut: false).
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
            if (this.theEditor) {
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
            if (this.theEditor) {
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
        if (this.theEditor) {
            res = this.theEditor.state.doc.toString();
        }
        return res;
    }
    set value(value) {
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
     */
    get tagTitle() {
        return `Editeur de code ${this.language}`;
    }
    createListeners() {
        this.addEventListener('keyup-mouseup-it', () => {
            const theState = this.theEditor.state;
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
        this.formLegend = `Edition de code ${this.language}`;
        this.extensions = this.getInitialExtensions();
        this.theEditor = new EditorView({
            doc: "",
            extensions: this.extensions,
            parent: this.editorContainer,
            root: this.shadowRoot
        });
        this.value = await this.getInitialDoc();
        this.setLanguageExtension();
        this.createListeners();
    }
    getHelpUrl() {
        if (this.isValidLanguage(this.language)) {
            return languages[this.language].helpUrl;
        }
        else {
            return `https://devdocs.io/${this.language}/`;
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
    /** Liste des langages reconnus par l'éditeur */
    get validLanguages() {
        return Object.keys(languages);
    }
    handleCopyClipboard() {
        navigator.clipboard.writeText(this.value).then(() => { this.notify("Contenu de l'éditeur copié dans le presse-papier.", "success", "it-mdi-check-circle-outline"); }, () => { this.notify("A priori, interdiction d'écrire dans le presse-papier !", "warning", "it-mdi-alert-outline"); });
    }
    handleLineNumbers() {
        this.lineNumbers = !this.lineNumbers;
        this.theEditor.dispatch({
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
    handleSelectLanguage(event) {
        const item = event.detail.item;
        this.languageMenuItems.forEach(anItem => { anItem.checked = false; });
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
    isValidLanguage(language) {
        return Object.keys(languages).includes(language);
    }
    /*
      protected async loadLanguage(lang: string): Promise<LanguageSupport | undefined>{
        const desc = LanguageDescription.matchLanguageName(languages, lang, true)
        const support = await desc?.load()
        return support
      }
    */
    renderForm() {
        return html `
      <div part="base" class="code-it">
        <div part="toolbar">
          ${this.renderToolbar()}
        </div>
        <div class="editor-base">
          <div part="editor" class="editor"></div>
          <div part="menuBtn" class="menu-button">
            ${this.readOnly
            ? html `<sl-tooltip content="copier dans le presse-papier" hoist><sl-button variant="neutral" size="small" @click=${() => this.handleCopyClipboard()}><it-mdi-content-copy></it-mdi-content-copy></sl-button></sl-tooltip>`
            : html `<sl-tooltip content="activer/désactiver les barres d'outils et d'informations" hoist><sl-button variant="neutral" size="small" @click=${() => { this.toolbar = !this.toolbar; }}><it-mdi-tools></it-mdi-tools></sl-button></sl-tooltip>`}
            ${this.btnFeedback
            ? html `<sl-tooltip content="interprétation" hoist><sl-button variant="neutral" size="small" @click=${() => { this.emit('feedback-requested-it'); }}><it-mdi-play></it-mdi-play></sl-button></sl-tooltip>`
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
        <sl-tooltip content="commenter/décommenter la ligne" hoist>
          <sl-button size="small" @click=${() => { command.toggleComment(this.theEditor); }}><svg xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;display:inline-block" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5v14h2v2H3V3h4v2H5m15 6H7v2h13V7m0 4Z"/></svg></sl-button>
        </sl-tooltip>
        <sl-tooltip content="commenter/décommenter le bloc" hoist>
          <sl-button size="small" @click=${() => { command.toggleBlockComment(this.theEditor); }}><it-mdi-format-list-group></it-mdi-format-list-group></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderHistoryButtons() {
        return html `
      <sl-button-group ?hidden=${this.readOnly} label="historique">
        <sl-tooltip content="annuler toutes les modifications" hoist>
          <sl-button size="small" @click=${() => { this.reset(); }}><it-mdi-refresh></it-mdi-refresh></sl-button>
        </sl-tooltip>
        <sl-tooltip content="annuler la dernière modification" hoist>
          <sl-button size="small" @click=${() => { command.undo(this.theEditor); }}><it-mdi-undo></it-mdi-undo></sl-button>
        </sl-tooltip>
        <sl-tooltip content="rétablir la dernière annulation" hoist>
          <sl-button size="small" @click=${() => { command.redo(this.theEditor); }}><it-mdi-redo></it-mdi-redo></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderIndentationButtons() {
        return html `
      <sl-button-group ?hidden=${this.readOnly} label="indentation">
        <sl-tooltip content="indenter" hoist>
          <sl-button size="small" @click=${() => { command.indentMore(this.theEditor); }}><it-mdi-format-indent-increase></it-mdi-format-indent-increase></sl-button>
        </sl-tooltip>
        <sl-tooltip content="désindenter" hoist>
          <sl-button size="small" @click=${() => { command.indentLess(this.theEditor); }}><it-mdi-format-indent-decrease></it-mdi-format-indent-decrease></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderMiscButtons() {
        return html `
      <sl-button-group label="langage et raccourcis clavier">
        <sl-tooltip content="choisir un langage" hoist>
          <sl-dropdown hoist>
            <sl-button slot="trigger" size="small" caret>${this.language ? unsafeHTML(languages[this.language].logo) /*logos[this.language]*/ : html `<it-mdi-help></it-mdi-help>`}</sl-button>
            <sl-menu class="dropdown__languages" @sl-select=${this.handleSelectLanguage}>
              ${Object.keys(languages /*cmLanguages*/).map(language => html `<sl-menu-item type="checkbox" value="${language}" ?checked=${this.language === language}>${language}<div slot="prefix">${unsafeHTML(languages[language].logo)}</div></sl-menu-item>`)}
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
        <sl-tooltip content="raccourcis clavier" hoist>
          <sl-dropdown stay-open-on-select hoist ?hidden=${this.readOnly}>
            <sl-button slot="trigger" size="small" caret><it-mdi-keyboard></it-mdi-keyboard></sl-button>
            <sl-menu class="dropdown__shortcuts">
              <sl-menu-item disabled>Commande<div slot="suffix">Raccourci clavier</div></sl-menu-item>
              <sl-divider></sl-divider>
              ${CodeIt_1.keymap.map(map => html `<sl-menu-item @click=${() => { map.run(this.theEditor); }}>${map.run.name}<div slot="suffix">${map.key}</div></sl-menu-item>`)}
              <sl-divider></sl-divider>
              <sl-menu-item disabled>Commande<div slot="suffix">Raccourci clavier</div></sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
      </sl-button-group>
      <sl-button-group label="outils">
        <sl-tooltip content="afficher/cacher les numéros de ligne" hoist>
          <sl-button size="small" @click=${() => this.handleLineNumbers()}><it-mdi-format-list-numbered></it-mdi-format-list-numbered></sl-button>
        </sl-tooltip>
        <sl-tooltip content="copier dans le presse-papier" hoist>
          <sl-button size="small" @click=${() => this.handleCopyClipboard()}><it-mdi-content-copy></it-mdi-content-copy></sl-button>
        </sl-tooltip>
        <sl-tooltip content="changer de thème" hoist>
          <sl-button size="small" @click=${() => this.toggleTheme()}><it-mdi-theme-light-dark></it-mdi-theme-light-dark></sl-button>
        </sl-tooltip>
        <sl-tooltip .content=${!this.fullscreen ? 'passer en mode plein écran' : 'quitter le mode plein écran'} hoist>
          <sl-button size="small" @click=${() => this.toggleFullscreen()}>
            ${!this.fullscreen ? html `<it-mdi-fullscreen></it-mdi-fullscreen>` : html `<it-mdi-fullscreen-exit></it-mdi-fullscreen-exit>`}
          </sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderOutput() {
        return html `
      <iframe class="output__iframe" allowfullscreen name="output"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
        src="../elements.html"
      >
      </iframe>
    `;
    }
    renderSearchButtons() {
        return html `
      <sl-button-group label="rechercher/remplacer">
        <sl-tooltip content="${this.readOnly ? 'rechercher' : 'rechercher/remplacer'}" hoist>
          <sl-button size="small" @click=${() => { search.openSearchPanel(this.theEditor); }}><it-mdi-find-replace></it-mdi-find-replace></sl-button>
        </sl-tooltip>
        <sl-tooltip content="atteindre la ligne:colonne" hoist>
          <sl-button size="small" @click=${() => { search.gotoLine(this.theEditor); }}><it-mdi-text-search></it-mdi-text-search></sl-button>
        </sl-tooltip>
      </sl-button-group>
    `;
    }
    renderStatusBar() {
        return html `
      <toolbar-it class="statusbar" ?hidden=${!this.toolbar}>
        <sl-button-group slot="end" label="informations">
          <sl-tooltip content="numéros de la ligne et de la colonne courantes" hoist>
            <sl-button size="small" variant="neutral">L ${this.cursorLine} - C ${this.cursorColumn}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="indentation en nombre d'espaces" hoist>
            <sl-button size="small" variant="neutral">Indent : ${this.indentSize}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="format de données Mime et lien sur une page d'aide" hoist>
            <sl-button size="small" variant="neutral" href="${this.getHelpUrl()}" target="_blank">${languages[this.language].mime}</sl-button>
          </sl-tooltip>
          <sl-tooltip content="mode de l'éditeur : édition ou lecture seule" hoist>
            <sl-button size="small" variant="neutral">${this.readOnly ? html `lecture seule` : html `édition`}</sl-button>
          </sl-tooltip>      
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
        const langs = Object.keys(languages /*cmLanguages*/);
        if (langs.includes(this.language)) {
            this.theEditor.dispatch({
                effects: [
                    this.languageConfig.reconfigure(languages[this.language].cm /*cmLanguages[this.language]*/),
                ]
            });
        }
    }
    setPlaceholderExtension() {
        this.theEditor.dispatch({
            effects: [
                this.placeholderConfig.reconfigure(placeholder(this.placeholder))
            ]
        });
    }
    setReadOnlyExtension() {
        this.theEditor.dispatch({
            effects: [
                this.readOnlyConfig.reconfigure(EditorState.readOnly.of(this.readOnly))
            ]
        });
    }
    setIndentationExtension() {
        this.theEditor.dispatch({
            effects: [
                this.indentationConfig.reconfigure(indentUnit.of(this.indentString))
            ]
        });
    }
    setThemeExtension() {
        this.theEditor.dispatch({
            effects: [
                this.themeConfig.reconfigure(this.theme === 'dark' ? darkTheme : lightTheme)
            ]
        });
    }
    /** Syntaxe asciidoc équivalente */
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
            this.editorContainer.appendChild(this.theEditor.dom);
        }
    }
};
CodeIt.styles = [
    (void 0).styles,
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
    property({ type: Boolean, reflect: true })
], CodeIt.prototype, "preview", void 0);
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
    property({ type: Boolean, reflect: true })
], CodeIt.prototype, "toolbar", void 0);
__decorate([
    property({ attribute: false })
], CodeIt.prototype, "value", null);
CodeIt = CodeIt_1 = __decorate([
    customElement('code-it')
], CodeIt);
export { CodeIt };
/*
if (customElements && !customElements.get('code-it')) {
  customElements.define('code-it', CodeIt)
}
*/
