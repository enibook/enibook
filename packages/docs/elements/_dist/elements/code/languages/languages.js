// codemirror
import { asciidoc as cmAsciidoc } from "codemirror-asciidoc";
import { css as cmCss } from "@codemirror/lang-css";
import { html as cmHtml } from "@codemirror/lang-html";
import { javascript as cmJavascript } from "@codemirror/lang-javascript";
import { json as cmJson } from "@codemirror/lang-json";
import { markdown as cmMarkdown } from "@codemirror/lang-markdown";
import { prolog as cmProlog } from 'codemirror-lang-prolog';
import { python as cmPython } from '@codemirror/lang-python';
import { sql as cmSql } from "@codemirror/lang-sql";
import { StreamLanguage } from "@codemirror/language";
export const languages = {
    'asciidoc': {
        name: 'asciidoc',
        cm: StreamLanguage.define(cmAsciidoc),
        logo: '<it-simple-icons-asciidoctor></it-simple-icons-asciidoctor>',
        extension: 'adoc',
        mime: 'text/asciidoc',
        helpUrl: 'https://docs.asciidoctor.org/asciidoc/latest/syntax-quick-reference/'
    },
    'css': {
        name: 'css',
        cm: cmCss(),
        logo: '<it-mdi-language-css3></it-mdi-language-css3>',
        extension: 'css',
        mime: 'text/css',
        helpUrl: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference'
    },
    'html': {
        name: 'html',
        cm: cmHtml(),
        logo: '<it-mdi-language-html5></it-mdi-language-html5>',
        extension: 'html',
        mime: 'text/html',
        helpUrl: 'https://developer.mozilla.org/fr/docs/Web/HTML/Reference'
    },
    'javascript': {
        name: 'javascript',
        cm: cmJavascript(),
        logo: '<it-mdi-language-javascript></it-mdi-language-javascript>',
        extension: 'js',
        mime: 'text/javascript',
        helpUrl: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference'
    },
    'json': {
        name: 'json',
        cm: cmJson(),
        logo: '<it-mdi-code-json></it-mdi-code-json>',
        extension: 'json',
        mime: 'application/json',
        helpUrl: 'https://www.json.org/json-fr.html'
    },
    'markdown': {
        name: 'markdown',
        cm: cmMarkdown(),
        logo: '<it-mdi-language-markdown></it-mdi-language-markdown>',
        extension: 'md',
        mime: 'text/markdown',
        helpUrl: 'https://www.markdownguide.org/cheat-sheet/'
    },
    'prolog': {
        name: 'prolog',
        cm: cmProlog(),
        logo: '<svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><text x="2" y="15" fill="currentColor" style="font-weight:bold;font-size:inherit">?-</text></svg>',
        extension: 'pl',
        mime: 'text/x-prolog',
        helpUrl: 'http://tau-prolog.org/documentation#prolog'
    },
    'python': {
        name: 'python',
        cm: cmPython(),
        logo: '<it-mdi-language-python></it-mdi-language-python>',
        extension: 'py',
        mime: 'text/x-python',
        helpUrl: 'https://www.pythoncheatsheet.org/cheatsheet/dictionaries'
    },
    'sql': {
        name: 'sql',
        cm: cmSql(),
        logo: '<it-mdi-database></it-mdi-database>',
        extension: 'sql',
        mime: 'application/sql',
        helpUrl: 'https://sql.sh'
    },
    'text': {
        name: 'text',
        cm: [],
        logo: '<it-mdi-format-text></it-mdi-format-text>',
        extension: 'txt',
        mime: 'text/plain',
        helpUrl: ''
    },
    'typescript': {
        name: 'typescript',
        cm: cmJavascript({ 'typescript': true }),
        logo: '<it-mdi-language-typescript></it-mdi-language-typescript>',
        extension: 'ts',
        mime: 'video/mp2t', // !
        helpUrl: 'https://www.typescriptlang.org/cheatsheets'
    },
};
