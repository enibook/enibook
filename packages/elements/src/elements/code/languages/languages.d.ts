import type { Extension } from "@codemirror/state";
export type LANGUAGE = {
    name: string;
    cm: Extension;
    logo: string;
    extension: string;
    mime: string;
    helpUrl: string;
};
export declare const languages: {
    [name: string]: LANGUAGE;
};
