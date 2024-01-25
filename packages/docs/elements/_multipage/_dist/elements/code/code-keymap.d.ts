import type { Command } from "@codemirror/view";
export declare function getKeymap(): {
    name: string;
    key: string;
    run: Command;
}[];
