import { CSSResultGroup } from "lit";
import type { LanguageSupport } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { CodeIt } from "../code/code";
export declare class HtmlIt extends CodeIt {
    static styles: CSSResultGroup;
    constructor();
    protected getCmLang(): Extension | LanguageSupport;
    protected getHelpUrl(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'html-it': HtmlIt;
    }
}
