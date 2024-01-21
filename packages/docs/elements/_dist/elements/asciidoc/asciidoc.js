var _a, _b;
// lit
import { css, unsafeCSS } from "lit";
// enibook
import { PlaygroundIt } from "../playground/playground";
// import styles from './asciidoc.css?inline'
export class AsciidocIt extends (_b = PlaygroundIt) {
    get options() {
        this.markupLanguage = 'asciidoc';
        this.styleLanguage = 'css';
        this.activeEditor = 'markup';
        return super.options;
    }
    ;
}
_a = AsciidocIt;
AsciidocIt.styles = [
    unsafeCSS(Reflect.get(_b, "styles", _a)),
    // unsafeCSS(styles),
    css `@unocss-placeholder`
];
if (customElements && !customElements.get('asciidoc-it')) {
    customElements.define('asciidoc-it', AsciidocIt);
}
