import { type CSSResultGroup } from "lit";
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import { PlaygroundIt } from "../playground/playground.js";
export declare class JavascriptIt extends PlaygroundIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected worker: Worker;
    constructor();
    createListener(): void;
    handleMessageWorker(message: any): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'javascript-it': JavascriptIt;
    }
}
