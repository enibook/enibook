import { CSSResultGroup, PropertyValueMap, TemplateResult } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip';
import { BaseIt } from '../base/base';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's internal wrapper.
 */
export declare class ToggleIt extends BaseIt {
    static styles: CSSResultGroup;
    private element;
    /** sélecteur `css` de l'élément visé */
    selector: string;
    /** taille du bouton */
    size: 'small' | 'medium' | 'large';
    /** texte du bouton quand l'élément visé est caché */
    textShow: string;
    /** texte du bouton quand l'élément visé est visible */
    textHide: string;
    /** infobulle quand l'élément visé est caché */
    tooltipShow: string;
    /** infobulle quand l'élément visé est visible */
    tooltipHide: string;
    /** garder la mise en page lorsque l'élément visé est caché */
    visibility: boolean;
    /** @ignore */
    hidden: boolean;
    protected getHidden(): boolean;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult;
    /**
     * Le nom courant de l'élément : `Bascule`.
     */
    get tagTitle(): string;
    /**
     * Syntaxe `asciidoc` équivalente :
     *
     * ```
     * name:target[attributes]
     * ```
     *
     * - `name` : `toggle-it`  (la macro `asciidoc` a le même nom que l'élément `html` correspondant);
     * - `target` : `selector`
     * - `attributes` : `size`, `text-hide`, `text-show`, `tooltip-hide`, `tooltip-show`, `visibility`.
     *
     * Voir la documentation Asciidoc sur les <a href="https://docs.asciidoctor.org/asciidoc/latest/key-concepts/#macros">macros de type _inline_</a>
     *
     * @examples
     * `toggle-it:#header[visibility]`,
     * `toggle-it:#header[text-hide="cacher l'en-tête",text-show="montrer l'en-tête",visibility]`
     */
    toAsciidoc(): string;
    protected toggleSelector(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'toggle-it': ToggleIt;
    }
}
