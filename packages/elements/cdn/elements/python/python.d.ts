import { type CSSResultGroup } from "lit";
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import { PlaygroundIt } from "../playground/playground.js";
export declare class PythonIt extends PlaygroundIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    constructor();
    get answer(): unknown;
    compile(input: string): string;
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'python-it': PythonIt;
    }
}
