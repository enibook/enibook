import { type CSSResultGroup } from "lit";
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import { PlaygroundIt } from "../playground/playground.js";
export declare class TypescriptIt extends PlaygroundIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected worker: Worker;
    scriptWorker: HTMLScriptElement;
    constructor();
    createListener(): void;
    handleMessageWorker(message: any): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'typescript-it': TypescriptIt;
    }
}
