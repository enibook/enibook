export type OptionsTemplate = {
    head?: string;
    header?: string;
    footer?: string;
    lang?: string;
    theme?: string;
    title?: string;
};
export declare const defaultOptions: OptionsTemplate;
export declare function templateHTML(main: string, options?: OptionsTemplate): string;
