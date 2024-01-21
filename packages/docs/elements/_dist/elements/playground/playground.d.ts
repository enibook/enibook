import { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import { type EmbedOptions } from 'livecodes';
import '@shoelace-style/shoelace/dist/components/details/details';
import { BaseIt } from '../base/base';
export declare const logos: {
    markup: {
        asciidoc: TemplateResult<1>;
        html: TemplateResult<1>;
        markdown: TemplateResult<1>;
    };
    style: {
        css: TemplateResult<1>;
    };
    script: {
        javascript: TemplateResult<1>;
        prolog: TemplateResult<2>;
        python: TemplateResult<1>;
        sql: TemplateResult<1>;
        typescript: TemplateResult<1>;
    };
};
export declare class PlaygroundIt extends BaseIt {
    static styles: CSSResultGroup;
    container: HTMLElement;
    activeEditor: 'markup' | 'style' | 'script';
    lineNumbers: boolean;
    lite: boolean;
    markupLanguage: 'asciidoc' | 'html' | 'markdown';
    mode: "full" | "result" | "editor" | "codeblock";
    readOnly: boolean;
    theme: 'light' | 'dark';
    scriptLanguage: 'javascript' | 'prolog' | 'python' | 'sql' | 'typescript';
    styleLanguage: 'css';
    title: string;
    view: 'editor' | 'result' | 'split';
    protected getInitialContent(language: string): string;
    protected get options(): EmbedOptions;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    initIde: () => Promise<void>;
    render(): TemplateResult;
    get tagTitle(): string;
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'playground-it': PlaygroundIt;
    }
}
