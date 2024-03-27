import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from "lit";
import type SlTabGroup from "@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js";
import { AnswerForm } from "../answer-form/answer-form.js";
import { CodeIt } from "../code/code.js";
import { FrameIt } from "../frame/frame.js";
export declare class PlaygroundIt extends AnswerForm {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected initialCode: string;
    protected initialCompiledCode: string;
    protected initialHead: string;
    protected initialHeader: string;
    protected initialMain: string;
    protected initialFooter: string;
    editorElement: CodeIt;
    scriptEditorElement: CodeIt;
    frameElement: FrameIt;
    baseElement: HTMLElement;
    tabsElement: SlTabGroup;
    editor: CodeIt;
    frame: FrameIt;
    full: boolean;
    /** Langage à éditer (défaut: `text`). */
    language: string;
    /** Mode « lecture seule » (ie. modifications interdites; défaut: `false`). */
    readOnly: boolean;
    /** Le fichier source à éditer. */
    codeFilename: string;
    /** Le fichier source du préfixe. */
    prefixFilename: string;
    /** Le fichier source du suffiwe. */
    suffixFilename: string;
    /** Le fichier `html` dont le contenu est à ajouter dans la section `<main>`. */
    mainFilename: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
    headFilename: string;
    /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
    headerFilename: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
    footerFilename: string;
    createEditor(): CodeIt;
    createFrame(): FrameIt;
    createListener(): void;
    protected firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): Promise<void>;
    get answer(): unknown;
    render(): TemplateResult;
    reset(): void;
    updateFrame(text: string, consoleOutput: string): Promise<void>;
    updateFrameHeight(): void;
    workerScript(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'playground-it': PlaygroundIt;
    }
}
