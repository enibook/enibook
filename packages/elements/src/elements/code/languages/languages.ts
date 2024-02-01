// codemirror
import { asciidoc as cmAsciidoc } from 'codemirror-asciidoc';
import { css as cmCss } from '@codemirror/lang-css';
import { html as cmHtml } from '@codemirror/lang-html';
import { javascript as cmJavascript } from '@codemirror/lang-javascript';
import { json as cmJson } from '@codemirror/lang-json';
import { markdown as cmMarkdown } from '@codemirror/lang-markdown';
import { prolog as cmProlog } from 'codemirror-lang-prolog';
import { python as cmPython } from '@codemirror/lang-python';
import { sql as cmSql } from '@codemirror/lang-sql';
import { StreamLanguage } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { icons } from '../../../utilities/icons';

export type LANGUAGE = {
  name: string;
  cm: Extension;
  logo: string;
  extension: string;
  mime: string;
  helpUrl: string;
};

export const languages: { [name: string]: LANGUAGE } = {
  asciidoc: {
    name: 'asciidoc',
    cm: StreamLanguage.define(cmAsciidoc),
    logo: `${icons['language-asciidoctor']}`,
    extension: 'adoc',
    mime: 'text/asciidoc',
    helpUrl: 'https://docs.asciidoctor.org/asciidoc/latest/syntax-quick-reference/'
  },
  css: {
    name: 'css',
    cm: cmCss(),
    logo: `${icons['mdi-language-css3']}`,
    extension: 'css',
    mime: 'text/css',
    helpUrl: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference'
  },
  html: {
    name: 'html',
    cm: cmHtml(),
    logo: `${icons['mdi-language-html5']}`,
    extension: 'html',
    mime: 'text/html',
    helpUrl: 'https://developer.mozilla.org/fr/docs/Web/HTML/Reference'
  },
  javascript: {
    name: 'javascript',
    cm: cmJavascript(),
    logo: `${icons['mdi-language-javascript']}`,
    extension: 'js',
    mime: 'text/javascript',
    helpUrl: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference'
  },
  json: {
    name: 'json',
    cm: cmJson(),
    logo: `${icons['mdi-code-json']}`,
    extension: 'json',
    mime: 'application/json',
    helpUrl: 'https://www.json.org/json-fr.html'
  },
  markdown: {
    name: 'markdown',
    cm: cmMarkdown(),
    logo: `${icons['mdi-language-markdown']}`,
    extension: 'md',
    mime: 'text/markdown',
    helpUrl: 'https://www.markdownguide.org/cheat-sheet/'
  },
  prolog: {
    name: 'prolog',
    cm: cmProlog(),
    logo: `${icons['language-prolog']}`,
    extension: 'pl',
    mime: 'text/x-prolog',
    helpUrl: 'http://tau-prolog.org/documentation#prolog'
  },
  python: {
    name: 'python',
    cm: cmPython(),
    logo: `${icons['mdi-language-python']}`,
    extension: 'py',
    mime: 'text/x-python',
    helpUrl: 'https://www.pythoncheatsheet.org/cheatsheet/dictionaries'
  },
  sql: {
    name: 'sql',
    cm: cmSql(),
    logo: `${icons['mdi-database']}`,
    extension: 'sql',
    mime: 'application/sql',
    helpUrl: 'https://sql.sh'
  },
  text: {
    name: 'text',
    cm: [],
    logo: `${icons['mdi-format-text']}`,
    extension: 'txt',
    mime: 'text/plain',
    helpUrl: ''
  },
  typescript: {
    name: 'typescript',
    cm: cmJavascript({ typescript: true }),
    logo: `${icons['mdi-language-typescript']}`,
    extension: 'ts',
    mime: 'video/mp2t', // !
    helpUrl: 'https://www.typescriptlang.org/cheatsheets'
  }
};
