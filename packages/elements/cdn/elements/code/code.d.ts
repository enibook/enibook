import type { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import type SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import type SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { Command } from '@codemirror/view';
import type { Extension, StateField } from '@codemirror/state';
import '../toolbar/toolbar';
import { AnswerForm } from '../answer-form/answer-form.js';
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
export declare class CodeIt extends AnswerForm {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    /** Raccourcis clavier */
    static keymap: {
        name: string;
        key: string;
        run: Command;
    }[];
    protected _language: string;
    protected _placeholder: string;
    protected _readOnly: boolean;
    protected _indentSize: number;
    protected _theme: 'dark' | 'light';
    protected _head: string;
    protected _header: string;
    protected _footer: string;
    protected theEditor: EditorView;
    protected extensions: (Extension | (StateField<boolean> | Extension)[])[];
    protected initialCode: string;
    protected languageConfig: Compartment;
    protected lineNumbersConfig: Compartment;
    protected placeholderConfig: Compartment;
    protected readOnlyConfig: Compartment;
    protected indentationConfig: Compartment;
    protected themeConfig: Compartment;
    protected editorContainer: HTMLElement;
    protected iframe: HTMLIFrameElement;
    protected menuLanguages: SlMenu;
    protected languageMenuItems: SlMenuItem[];
    protected cursorLine: number;
    protected cursorColumn: number;
    protected message: string;
    /** Mode bloc */
    block: boolean;
    /** Nombre d'espaces par indentation (défaut: 2). */
    get indentSize(): number;
    set indentSize(value: number);
    /** Langage à éditer (défaut: `text`). */
    get language(): string;
    set language(value: string);
    /** Numéros de lignes (défaut: `false`). */
    lineNumbers: boolean;
    /** Invite de l'éditeur. */
    get placeholder(): string;
    set placeholder(value: string);
    /** Mode « lecture seule » (ie. modifications interdites; défaut: `false`). */
    get readOnly(): boolean;
    set readOnly(value: boolean);
    /** Le fichier source à éditer. */
    src: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
    srcHead: string;
    /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
    srcHeader: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
    srcFooter: string;
    /** Le thème (clair: `light` ou sombre: `dark`) de l'éditeur (défaut: `dark`). */
    get theme(): 'light' | 'dark';
    set theme(value: 'light' | 'dark');
    /** Affiche les barres d'outils et d'informations. */
    toolbar: boolean;
    /** Le contenu de l'éditeur. */
    get value(): string;
    set value(value: string);
    /** Réponse de l'éditeur. */
    answer(): string;
    protected get indentString(): string;
    protected compile(value: string): string;
    protected createListeners(): void;
    protected fetchContent(src: string): Promise<string>;
    protected fetchSrc(src: string): Promise<string>;
    protected firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): Promise<void>;
    protected getHelpUrl(): string;
    protected getHead(): Promise<string>;
    protected getHeader(): Promise<string>;
    protected getFooter(): Promise<string>;
    protected getInitialCode(): Promise<string>;
    protected getInitialExtensions(): (Extension | (StateField<boolean> | Extension)[])[];
    /** Liste des langages reconnus par l'éditeur */
    get validLanguages(): string[];
    protected handleCopyClipboard(): void;
    protected handleLineNumbers(): void;
    protected handleSelectCommand(event: CustomEvent): void;
    protected handleSelectLanguage(event: CustomEvent): void;
    /** Teste si un langage fait partie des langages reconnus par l'éditeur. */
    isValidLanguage(language: string): boolean;
    protected renderForm(): TemplateResult;
    protected renderCommentButtons(): TemplateResult;
    protected renderFeedbackButton(): TemplateResult;
    protected renderHistoryButtons(): TemplateResult;
    protected renderIndentationButtons(): TemplateResult;
    protected renderKeymapButton(): TemplateResult;
    protected renderMiscButtons(): TemplateResult;
    protected renderSearchButtons(): TemplateResult;
    protected renderStatusBar(): TemplateResult;
    protected renderToolbar(): TemplateResult;
    protected renderToolbarsButton(): TemplateResult;
    protected renderToolsButtons(): TemplateResult;
    /** Réinitialisation de l'éditeur. */
    reset(): void;
    protected setLanguageExtension(): Promise<void>;
    protected setPlaceholderExtension(): void;
    protected setReadOnlyExtension(): void;
    protected setIndentationExtension(): void;
    protected setThemeExtension(): void;
    protected toggleTheme(): void;
    updated(changedProperties: Map<string, unknown>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'code-it': CodeIt;
    }
}
