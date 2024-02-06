import type { Command } from '@codemirror/view';
/** Raccourcis clavier */
export declare function getKeymap(): {
    name: string;
    key: string;
    run: Command;
}[];
