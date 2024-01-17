// lit
import { css, html, unsafeCSS } from 'lit';
// playground-element
import { PlaygroundIde } from 'playground-elements/playground-ide';
// enibook
import { BaseIt } from '../base/base';
import styles from './ts-playground.css?inline';
export class TsPlaygroundIt extends BaseIt {
    constructor() {
        super();
        this.initIde();
    }
    initIde() {
        this._ide = new PlaygroundIde();
        this._ide.editableFileSystem = true;
        this._ide.lineNumbers = true;
        this._ide.lineWrapping = true;
        this._ide.resizable = true;
    }
    render() {
        return html `
      ${this._ide}
      <slot></slot>
    `;
    }
    get tagTitle() {
        throw new Error('Method not implemented.');
    }
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
}
TsPlaygroundIt.styles = [
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
if (customElements && !customElements.get('ts-playground-it')) {
    customElements.define('ts-playground-it', TsPlaygroundIt);
}
