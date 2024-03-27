export type OptionsTemplate = {
    head?: string;
    style?: string;
    header?: string;
    codePrefix?: string;
    codeBody?: string;
    codeSuffix?: string;
    main?: string;
    footer?: string;
    consoleOutput?: string;
    lang?: string;
    theme?: string;
    title?: string;
};
export declare const defaultOptions: OptionsTemplate;
export declare function templateHTML(options?: OptionsTemplate): string;
