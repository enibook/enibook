import { CSSResultGroup, TemplateResult } from "lit";
import { BaseIt } from "../base/base";
export declare class LoremIpsumIt extends BaseIt {
    static styles: CSSResultGroup;
    /** Nombre d'objets textuels (mots, paragraphes, phrases, items de liste) générés. */
    count: number;
    /** Type des objets textuels (mots, paragraphes, phrases, items de liste) générés. */
    type: "dlist" | "olist" | "paragraph" | "sentence" | "ulist" | "word";
    protected createTerm(): string;
    /** Texte aléatoire généré selon son type. */
    createText(type?: "dlist" | "olist" | "paragraph" | "sentence" | "ulist" | "word"): string;
    /**
     * Dictionnaire de mots.
     */
    protected get dictionary(): string[];
    /**
     * Le nom courant de l'élément : `Lorem Ipsum`.
     */
    get tagTitle(): string;
    protected randomLength(min: number, max: number): number;
    protected render(): TemplateResult;
    protected renderTemplate(): TemplateResult;
    protected renderList(tag?: string, nbListItems?: number): TemplateResult;
    protected renderParagraph(nbParagraphs?: number): TemplateResult;
    protected renderSentence(nbSentences?: number): TemplateResult;
    protected renderWord(nbWords?: number): TemplateResult;
    /**
     * Syntaxe `asciidoc` équivalente `name::target[attributes]`
     *
     * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _block_</a>
     * @examples `lorem-ipsum::paragraph[]` , `lorem-ipsum::olist[count=2]`
     */
    toAsciidoc(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        "lorem-ipsum-it": LoremIpsumIt;
    }
}
