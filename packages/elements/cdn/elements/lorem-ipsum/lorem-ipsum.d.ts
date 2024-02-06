import { type CSSResultGroup, type TemplateResult } from 'lit';
import { BaseIt } from '../base/base.js';
export declare class LoremIpsumIt extends BaseIt {
    /** Style propre à la classe. */
    static styles: CSSResultGroup;
    /** Nombre d'objets textuels (mots, paragraphes, phrases, items de liste) générés. */
    count: number;
    /** Type des objets textuels (mots, paragraphes, phrases, items de liste) générés (défaut : `paragraph`). */
    type: 'dlist' | 'olist' | 'paragraph' | 'sentence' | 'ulist' | 'word';
    protected createTerm(): string;
    /** Texte aléatoire généré selon son type. */
    createText(type?: 'dlist' | 'olist' | 'paragraph' | 'sentence' | 'ulist' | 'word'): string;
    /** Dictionnaire de mots. */
    protected get dictionary(): string[];
    protected randomLength(min: number, max: number): number;
    protected render(): TemplateResult;
    protected renderTemplate(): TemplateResult;
    protected renderList(tag?: string, nbListItems?: number): TemplateResult;
    protected renderParagraph(nbParagraphs?: number): TemplateResult;
    protected renderSentence(nbSentences?: number): TemplateResult;
    protected renderWord(nbWords?: number): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'lorem-ipsum-it': LoremIpsumIt;
    }
}
