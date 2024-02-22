export type OptionsTemplate = {
    head?: string;
    style?: string;
    header?: string;
    main?: string;
    footer?: string;
    lang?: string;
    theme?: string;
    title?: string;
};
export declare const defaultOptions: OptionsTemplate;
export declare function templateHTML(options?: OptionsTemplate): string;
