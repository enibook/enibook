import { type CSSResultGroup, type TemplateResult, type PropertyValueMap } from 'lit';
import { BaseIt } from '../base/base.js';
import { type OptionsTemplate } from './templates/template-html.js';
/** */
export declare class FrameIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    baseElement: HTMLElement;
    frameElement: HTMLIFrameElement;
    /** Le bord de la frame */
    border: boolean;
    /** Le fichier `html` dont le contenu est à ajouter dans la section `<main>`. */
    mainFilename: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<head>` du template HTML. */
    headFilename: string;
    /** Le fichier `html` dont le contenu est à insérer au début de la section `<body>` du template HTML. */
    headerFilename: string;
    /** Le fichier `html` dont le contenu est à ajouter en fin de la section `<body>` du template HTML. */
    footerFilename: string;
    /** URL de la page à intégrer dans la frame. */
    url: string;
    /** Contenu de la page à intégrer qui surcharge celui indiqué par `url`. */
    srcDoc: string;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void>;
    getTemplate(options: OptionsTemplate): string;
    protected render(): TemplateResult;
    resizeIFrameHeight(height: number): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'frame-it': FrameIt;
    }
}
