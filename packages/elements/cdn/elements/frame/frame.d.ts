import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { BaseIt } from '../base/base.js';
export declare class FrameIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    protected _head: string;
    protected _header: string;
    protected _main: string;
    protected _footer: string;
    protected baseElement: Element;
    protected frameElement: HTMLIFrameElement;
    /** Le fichier `html` dont le contenu est à ajouter dans la section `<main>`. */
    srcMain: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
    srcHead: string;
    /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
    srcHeader: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
    srcFooter: string;
    /** URL de la page à intégrer dans la frame. */
    url: string;
    /** Contenu de la page à intégrer qui surcharge celui indiqué par `url`. */
    srcDoc: string;
    createListeners(): void;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void>;
    protected getHtmlHead(): Promise<string>;
    protected getHtmlHeader(): Promise<string>;
    protected getHtmlFooter(): Promise<string>;
    protected getHtmlMain(): Promise<string>;
    resizeFrame(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'frame-it': FrameIt;
    }
}
