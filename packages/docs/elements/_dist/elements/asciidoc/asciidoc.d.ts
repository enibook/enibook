import { CSSResultGroup } from "lit";
import { type EmbedOptions } from 'livecodes';
import { PlaygroundIt } from "../playground/playground";
export declare class AsciidocIt extends PlaygroundIt {
    static styles: CSSResultGroup;
    protected get options(): EmbedOptions;
}
declare global {
    interface HTMLElementTagNameMap {
        'asciidoc-it': AsciidocIt;
    }
}
