// markdown-it
import markdownIt from 'markdown-it'
import markdownItAttributes from 'markdown-it-attrs'

// highlight
import hjs from 'highlight.js'

const markdownItOptions = {
  html: true,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hjs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="hljs">${hjs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) { 
        return `<pre class="hljs"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`; 
      }
    }
    return `<pre class="hljs"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
  },
  xhtmlOut: false,
}

export const md = markdownIt(markdownItOptions)
  .use(markdownItAttributes)

/*
const markdownItAbbr = require('markdown-it-abbr')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAnchorOptions = {
  permalink: false,
  slugify: function (s) { return slugify(s) }
}
const markdownItAttributes = require('markdown-it-attrs')
const markdownItSpan = require('markdown-it-bracketed-spans')
const markdownItContainer = require('markdown-it-container')
const markdownItContainerBlockOptions = {
  validate: function(params) {
    return params.trim().match(/^block\s+(.*)$/);
  },
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^block\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + md.renderInline(m[1])+ '</summary>\n';  // md.utils.escapeHtml(m[1])
    } else {
      // closing tag
      return '</details>\n';
    }
  }
}
const markdownItDefList = require('markdown-it-deflist')
const markdownItDirective = require('markdown-it-directive')
const markdownItWebComponents = require('markdown-it-directive-webcomponents')
const markdownItWebComponentsOptions = {
  components: [...htmlComponents, ...enibookComponents]
}
const markdownItEmoji = require("markdown-it-emoji")
const markdownItFootnote = require('markdown-it-footnote')
const markdownItHeader = require('markdown-it-header-sections')
const markdownItHtml5Embed = require('markdown-it-html5-embed')
const markdownItHtml5EmbedOptions = {
  html5embed: {
    useImageSyntax: true,
    useLinkSyntax: true,
    attributes: {
      'audio': 'width="320" controls class="audioplayer"',
      'video': 'width="320" height="240" class="audioplayer" controls'
    }
  }
}
const markdownItInclude = require('markdown-it-include')
const markdownItIncludeOptions = {
  bracesAreOptional: true,
  includeRe: /<!--\s*include(.+?)-->/i,
  throwError: false
}
const markdownItIns = require('markdown-it-ins')
const markdownItKbd = require('markdown-it-kbd')
const markdownItMark = require('markdown-it-mark')
// const markdownItMathjax = require('./markdown-it-mathjax')
const markdownItTable = require('markdown-it-multimd-table')
const markdownItTableOptions = {
  multiline: true,
  rowspan: true,
  headerless: true
}
const markdownItSub = require('markdown-it-sub')
const markdownItSup = require('markdown-it-sup')
const markdownItVideo = require('markdown-it-video')
const markdownItVideoOptions = {
  youtube: { width: 640, height: 390 },
  vimeo: { width: 500, height: 281 },
  vine: { width: 600, height: 600, embed: 'simple' },
  prezi: { width: 550, height: 400 }
}


  .use(markdownItAbbr)
  .use(markdownItAnchor, markdownItAnchorOptions)
  .use(markdownItAttributes)
  .use(markdownItSpan)
  .use(markdownItContainer, 'enibook')
  .use(markdownItContainer, 'warning')
  .use(markdownItContainer, 'success')
  .use(markdownItContainer, 'danger')
  .use(markdownItContainer, 'note')
  .use(markdownItContainer, 'block', markdownItContainerBlockOptions)
  .use(markdownItDefList)
  .use(markdownItDirective)
  .use(markdownItWebComponents, markdownItWebComponentsOptions)
  .use(markdownItEmoji)
  .use(markdownItFootnote)
  .use(markdownItHeader)
  .use(markdownItHtml5Embed, markdownItHtml5EmbedOptions)
  .use(markdownItInclude, markdownItIncludeOptions)
  .use(markdownItIns)
  .use(markdownItKbd)
  .use(markdownItMark)
  //.use(markdownItMathjax, { input: 'asciimath' })
  .use(markdownItTable, markdownItTableOptions)
  .use(markdownItSub)
  .use(markdownItSup)
  .use(markdownItVideo, markdownItVideoOptions)

exports.md = md
*/