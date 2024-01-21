var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// lit
import { css, html, svg, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, query } from 'lit/decorators.js';
// livecodes
import { createPlayground } from 'livecodes';
// shoelace
import '@shoelace-style/shoelace/dist/components/details/details';
// enibook
import { BaseIt } from '../base/base';
import styles from './playground.css?inline';
import { dedentText } from '../../utilities/dedent';
export const logos = {
    markup: {
        asciidoc: html `<it-simple-icons-asciidoctor></it-simple-icons-asciidoctor>`,
        html: html `<it-mdi-language-html5></it-mdi-language-html5>`,
        markdown: html `<it-mdi-language-markdown></it-mdi-language-markdown>`,
    },
    style: {
        css: html `<it-mdi-language-css3></it-mdi-language-css3>`
    },
    script: {
        javascript: html `<it-mdi-language-javascript></it-mdi-language-javascript>`,
        prolog: svg `<svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><text x="2" y="15" fill="currentColor" style="font-weight:bold;font-size:inherit">?-</text></svg>`,
        python: html `<it-mdi-language-python></it-mdi-language-python>`,
        sql: html `<it-mdi-sql-query></it-mdi-sql-query>`,
        typescript: html `<it-mdi-language-typescript></it-mdi-language-typescript>`,
    }
};
export class PlaygroundIt extends BaseIt {
    constructor() {
        super(...arguments);
        this.activeEditor = 'script';
        this.lineNumbers = false;
        this.lite = false;
        this.markupLanguage = 'html';
        this.mode = "full";
        this.readOnly = false;
        this.theme = 'dark';
        this.scriptLanguage = 'javascript';
        this.styleLanguage = 'css';
        this.title = 'Hello';
        this.view = 'split';
        this.initIde = (async () => {
            const playground = await createPlayground(this.container, this.options);
            console.log(await playground.getConfig());
            /*
            const iframe = this.container.querySelector('iframe')
            const iframe2 = iframe?.contentWindow?.document.body.querySelector('iframe')
            console.log(iframe2?.contentWindow?.document.body.querySelector('#logo'))
            */
        });
    }
    getInitialContent(language) {
        const slot = this.shadowRoot?.querySelector('slot');
        const scripts = slot?.assignedElements({ flatten: true }).filter((elem) => elem.matches(`script[type="enibook/${language}"]`));
        const result = scripts?.map((script) => dedentText(script.innerText))
            .reduce((accumulator, currentValue) => accumulator.concat(accumulator, '\n', currentValue), '');
        return result;
    }
    get options() {
        return {
            config: {
                markup: {
                    language: this.markupLanguage,
                    content: this.getInitialContent(this.markupLanguage),
                },
                style: {
                    language: this.styleLanguage,
                    content: this.getInitialContent(this.styleLanguage),
                },
                script: {
                    language: this.scriptLanguage,
                    content: this.getInitialContent(this.scriptLanguage),
                },
                activeEditor: this.activeEditor,
                allowLangChange: false,
                description: '',
                lineNumbers: this.lineNumbers,
                mode: this.mode,
                readonly: this.readOnly,
                scripts: [],
                stylesheets: [],
                theme: this.theme,
                title: this.title,
            },
            lite: this.lite,
            params: {
                console: "open",
            },
            view: this.view,
        };
    }
    ;
    firstUpdated(_changedProperties) {
        this.initIde();
    }
    render() {
        return html `
      <div part="base" class="playground">
        <sl-details class="custom-icons">
          <div slot="summary">${logos.markup[this.markupLanguage]} ${logos.style['css']} ${logos.script[this.scriptLanguage]} ${unsafeHTML(this.title)}</div>
          <it-mdi-plus-box-outline slot="expand-icon"></it-mdi-plus-box-outline>
          <it-mdi-minus-box-outline slot="collapse-icon"></it-mdi-minus-box-outline>
          <div part="ide" id="ide-container" class="ide-container" data-height="500px"></div>
        </sl-details>
        <slot></slot>
      </div>
    `;
    }
    get tagTitle() {
        return 'Playground';
    }
    toAsciidoc() {
        throw new Error('Method not implemented.');
    }
}
PlaygroundIt.styles = [
    unsafeCSS(styles),
    css `@unocss-placeholder`
];
__decorate([
    query('#ide-container')
], PlaygroundIt.prototype, "container", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'active-editor' })
], PlaygroundIt.prototype, "activeEditor", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'line-numbers' })
], PlaygroundIt.prototype, "lineNumbers", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PlaygroundIt.prototype, "lite", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'markup-language' })
], PlaygroundIt.prototype, "markupLanguage", void 0);
__decorate([
    property({ type: String, reflect: true })
], PlaygroundIt.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'readonly' })
], PlaygroundIt.prototype, "readOnly", void 0);
__decorate([
    property({ type: String, reflect: true })
], PlaygroundIt.prototype, "theme", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'script-language' })
], PlaygroundIt.prototype, "scriptLanguage", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'style-language' })
], PlaygroundIt.prototype, "styleLanguage", void 0);
__decorate([
    property({ type: String, reflect: true })
], PlaygroundIt.prototype, "title", void 0);
__decorate([
    property({ type: String, reflect: true })
], PlaygroundIt.prototype, "view", void 0);
if (customElements && !customElements.get('playground-it')) {
    customElements.define('playground-it', PlaygroundIt);
}
