import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from "lit";
import { AnswerForm } from "../answer-form/answer-form.js";
import { CodeIt } from "../code/code.js";
import { FrameIt } from "../frame/frame.js";
export declare class PlaygroundIt extends AnswerForm {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected initialCode: string;
    protected initialCompiledCode: string;
    baseElement: HTMLElement;
    editor: CodeIt;
    frame: FrameIt;
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
    compile(input: string): string;
    createEditor(): CodeIt;
    createFrame(): FrameIt;
    protected firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): Promise<void>;
    get answer(): unknown;
    render(): TemplateResult;
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'playground-it': PlaygroundIt;
    }
}
