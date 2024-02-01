import {
  Annotation,
  CharCategory,
  Decoration,
  DefaultBufferLength,
  Direction,
  EditorSelection,
  EditorState,
  EditorView,
  Facet,
  IterMode,
  LRLanguage,
  Language,
  LanguageDescription,
  LanguageSupport,
  MapMode,
  NodeProp,
  NodeSet,
  NodeType,
  NodeWeakMap,
  ParseContext,
  Parser,
  Prec,
  RangeSet,
  RangeValue,
  StateEffect,
  StateField,
  StreamLanguage,
  Tag,
  Text,
  Transaction,
  Tree,
  ViewPlugin,
  WidgetType,
  bracketMatchingHandle,
  codePointAt,
  codePointSize,
  combineConfig,
  continuedIndent,
  countColumn,
  defineLanguageFacet,
  delimitedIndent,
  flatIndent,
  foldInside,
  foldNodeProp,
  foldService,
  fromCodePoint,
  getTooltip,
  indentNodeProp,
  indentUnit,
  keymap,
  languageDataProp,
  logException,
  parseMixed,
  showTooltip,
  styleTags,
  sublanguageProp,
  syntaxTree,
  tags
} from "./chunk.TR6FF63A.js";
import {
  icons
} from "./chunk.YQRSMW6G.js";

// ../../node_modules/.pnpm/codemirror-asciidoc@2.0.1/node_modules/codemirror-asciidoc/lib/asciidoc.js
var HighlightRules = function() {
  var identifierRe = "[a-zA-Z\xA1-\uFFFF]+\\b";
  this.$rules = {
    "start": [
      { token: "empty", regex: /$/ },
      { token: "literal", regex: /^\.{4,}\s*$/, next: "listingBlock" },
      { token: "literal", regex: /^-{4,}\s*$/, next: "literalBlock" },
      { token: "literal", regex: /^\+{4,}\s*$/, next: "passthroughBlock" },
      { token: "keyword", regex: /^={4,}\s*$/ },
      { token: "text", regex: /^\s*$/ },
      // immediately return to the start mode without matching anything
      { token: "empty", regex: "", next: "dissallowDelimitedBlock" }
    ],
    "dissallowDelimitedBlock": [
      { include: "paragraphEnd" },
      { token: "comment", regex: "^//.+$" },
      { token: "keyword", regex: "^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s" },
      { include: "listStart" },
      { token: "literal", regex: /^\s+.+$/, next: "indentedBlock" },
      { token: "empty", regex: "", next: "text" }
    ],
    "paragraphEnd": [
      { token: "doc.comment", regex: /^\/{4,}\s*$/, next: "commentBlock" },
      { token: "tableBlock", regex: /^\s*[|!]=+\s*$/, next: "tableBlock" },
      // open block, ruler
      { token: "keyword", regex: /^(?:--|''')\s*$/, next: "start" },
      { token: "option", regex: /^\[.*\]\s*$/, next: "start" },
      { token: "pageBreak", regex: /^>{3,}$/, next: "start" },
      { token: "literal", regex: /^\.{4,}\s*$/, next: "listingBlock" },
      { token: "titleUnderline", regex: /^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/, next: "start" },
      { token: "singleLineTitle", regex: /^={1,6}\s+\S.*$/, next: "start" },
      { token: "otherBlock", regex: /^(?:\*{2,}|_{2,})\s*$/, next: "start" },
      // .optional title
      { token: "optionalTitle", regex: /^\.[^.\s].+$/, next: "start" }
    ],
    "listStart": [
      {
        token: "keyword",
        regex: /^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,
        next: "listText"
      },
      { token: "meta.tag", regex: /^.+(?::{2,4}|;;)(?: |$)/, next: "listText" },
      // continuation
      { token: "keyword", regex: /^\+\s*$/, next: "start" }
    ],
    "text": [
      {
        token: ["link", "link"],
        regex: /((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/
      },
      { token: ["link", "link"], regex: /(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/ },
      { token: "link", regex: /\b[\w\.\/\-]+@[\w\.\/\-]+\b/ },
      { include: "macros" },
      { include: "paragraphEnd" },
      { token: "literal", regex: /\+{3,}/, next: "smallPassthrough" },
      {
        token: "escape",
        regex: /\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/
      },
      { token: "escape", regex: /\\[_*'`+#]|\\{2}[_*'`+#]{2}/ },
      { token: "keyword", regex: /\s\+$/ },
      // any word
      { token: "text", regex: identifierRe },
      {
        token: ["keyword", "string", "keyword"],
        regex: /(<<[\w\d\-$]+,)(.*?)(>>|$)/
      },
      { token: "keyword", regex: /<<[\w\d\-$]+,?|>>/ },
      { token: "constant.character", regex: /\({2,3}.*?\){2,3}/ },
      // List of callouts
      { token: "support.function.list.callout", regex: /^(?:<\d+>|\d+>|>) /, next: "text" },
      // Anchor
      { token: "keyword", regex: /\[\[.+?\]\]/ },
      // bibliography
      { token: "support", regex: /^\[{3}[\w\d =\-]+\]{3}/ },
      { include: "quotes" },
      // text block end
      { token: "empty", regex: /^\s*$/, next: "start" }
    ],
    "listText": [
      { include: "listStart" },
      { include: "text" }
    ],
    "indentedBlock": [
      { token: "literal", regex: /^[\s\w].+$/, next: "indentedBlock" },
      { token: "literal", regex: "", next: "start" }
    ],
    "listingBlock": [
      { token: "literal", regex: /^\.{4,}\s*$/, next: "dissallowDelimitedBlock" },
      { token: "constant.numeric", regex: "<\\d+>" },
      { token: "literal", regex: "[^<]+" },
      { token: "literal", regex: "<" }
    ],
    "literalBlock": [
      { token: "literal", regex: /^-{4,}\s*$/, next: "dissallowDelimitedBlock" },
      { token: "constant.numeric", regex: "<\\d+>" },
      { token: "literal", regex: "[^<]+" },
      { token: "literal", regex: "<" }
    ],
    "passthroughBlock": [
      { token: "literal", regex: /^\+{4,}\s*$/, next: "dissallowDelimitedBlock" },
      { token: "literal", regex: identifierRe + "|\\d+" },
      { include: "macros" },
      { token: "literal", regex: "." }
    ],
    "smallPassthrough": [
      { token: "literal", regex: /[+]{3,}/, next: "dissallowDelimitedBlock" },
      { token: "literal", regex: /^\s*$/, next: "dissallowDelimitedBlock" },
      { token: "literal", regex: identifierRe + "|\\d+" },
      { include: "macros" }
    ],
    "commentBlock": [
      { token: "doc.comment", regex: /^\/{4,}\s*$/, next: "dissallowDelimitedBlock" },
      { token: "doc.comment", regex: "^.*$" }
    ],
    "tableBlock": [
      { token: "tableBlock", regex: /^\s*\|={3,}\s*$/, next: "dissallowDelimitedBlock" },
      { token: "tableBlock", regex: /^\s*!={3,}\s*$/, next: "innerTableBlock" },
      { token: "tableBlock", regex: /\|/ },
      { include: "text", noEscape: true }
    ],
    "innerTableBlock": [
      { token: "tableBlock", regex: /^\s*!={3,}\s*$/, next: "tableBlock" },
      { token: "tableBlock", regex: /^\s*|={3,}\s*$/, next: "dissallowDelimitedBlock" },
      { token: "tableBlock", regex: /\!/ }
    ],
    "macros": [
      { token: "macro", regex: /{[\w\-$]+}/ },
      {
        token: ["text", "string", "text", "constant.character", "text"],
        regex: /({)([\w\-$]+)(:)?(.+)?(})/
      },
      {
        token: ["text", "markup.list.macro", "keyword", "string"],
        regex: /(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/
      },
      {
        token: ["markup.list.macro", "keyword", "string"],
        regex: /([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/
      },
      { token: ["markup.list.macro", "keyword"], regex: /([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/ },
      { token: "keyword", regex: /^:.+?:(?= |$)/ }
    ],
    "quotes": [
      { token: "string.italic", regex: /__[^_\s].*?__/ },
      { token: "string.italic", regex: quoteRule("_") },
      { token: "keyword.bold", regex: /\*\*[^*\s].*?\*\*/ },
      { token: "keyword.bold", regex: quoteRule("\\*") },
      { token: "literal", regex: /\+\+[^+\s].*?\+\+/ },
      { token: "literal", regex: quoteRule("\\+") },
      { token: "literal", regex: /\$\$.+?\$\$/ },
      { token: "literal", regex: quoteRule("\\$") },
      { token: "literal", regex: /``[^`\s].*?``/ },
      { token: "literal", regex: quoteRule("`") },
      { token: "keyword", regex: /\^[^\^].*?\^/ },
      { token: "keyword", regex: quoteRule("\\^") },
      { token: "keyword", regex: /~[^~].*?~/ },
      { token: "keyword", regex: quoteRule("~") },
      { token: "keyword", regex: /##?/ },
      { token: "keyword", regex: /(?:\B|^)``|\b''/ }
    ]
  };
  function quoteRule(ch) {
    var prefix = /\w/.test(ch) ? "\\b" : "(?:\\B|^)";
    return prefix + ch + "[^" + ch + "].*?" + ch + "(?![\\w*])";
  }
  var tokenMap = {
    macro: "constant.character",
    tableBlock: "doc.comment",
    titleUnderline: "markup.heading",
    singleLineTitle: "markup.heading",
    pageBreak: "string",
    option: "string.regexp",
    otherBlock: "markup.list",
    literal: "support.function",
    optionalTitle: "constant.numeric",
    escape: "constant.language.escape",
    link: "markup.underline.list"
  };
  for (var state in this.$rules) {
    var stateRules = this.$rules[state];
    for (var i = stateRules.length; i--; ) {
      var rule = stateRules[i];
      if (rule.include || typeof rule == "string") {
        var args = [i, 1].concat(this.$rules[rule.include || rule]);
        if (rule.noEscape) {
          args = args.filter(function(x) {
            return !x.next;
          });
        }
        stateRules.splice.apply(stateRules, args);
      } else if (rule.token in tokenMap) {
        rule.token = tokenMap[rule.token];
      }
    }
  }
};
var MAX_TOKEN_COUNT = 1e3;
var Tokenizer = function(rules) {
  this.states = rules;
  this.regExps = {};
  this.matchMappings = {};
  for (var key in this.states) {
    var state = this.states[key];
    var ruleRegExps = [];
    var matchTotal = 0;
    var mapping = this.matchMappings[key] = { defaultToken: "text" };
    var flag = "g";
    var splitterRurles = [];
    for (var i = 0; i < state.length; i++) {
      var rule = state[i];
      if (rule.defaultToken)
        mapping.defaultToken = rule.defaultToken;
      if (rule.caseInsensitive)
        flag = "gi";
      if (rule.regex == null)
        continue;
      if (rule.regex instanceof RegExp)
        rule.regex = rule.regex.toString().slice(1, -1);
      var adjustedregex = rule.regex;
      var matchcount = new RegExp("(?:(" + adjustedregex + ")|(.))").exec("a").length - 2;
      if (Array.isArray(rule.token)) {
        if (rule.token.length == 1 || matchcount == 1) {
          rule.token = rule.token[0];
        } else if (matchcount - 1 != rule.token.length) {
          throw new Error("number of classes and regexp groups in '" + rule.token + "'\n'" + rule.regex + "' doesn't match\n" + (matchcount - 1) + "!=" + rule.token.length);
        } else {
          rule.tokenArray = rule.token;
          rule.token = null;
          rule.onMatch = this.$arrayTokens;
        }
      } else if (typeof rule.token == "function" && !rule.onMatch) {
        if (matchcount > 1)
          rule.onMatch = this.$applyToken;
        else
          rule.onMatch = rule.token;
      }
      if (matchcount > 1) {
        if (/\\\d/.test(rule.regex)) {
          adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function(match, digit) {
            return "\\" + (parseInt(digit, 10) + matchTotal + 1);
          });
        } else {
          matchcount = 1;
          adjustedregex = this.removeCapturingGroups(rule.regex);
        }
        if (!rule.splitRegex && typeof rule.token != "string")
          splitterRurles.push(rule);
      }
      mapping[matchTotal] = i;
      matchTotal += matchcount;
      ruleRegExps.push(adjustedregex);
      if (!rule.onMatch)
        rule.onMatch = null;
    }
    splitterRurles.forEach(function(rule2) {
      rule2.splitRegex = this.createSplitterRegexp(rule2.regex, flag);
    }, this);
    this.regExps[key] = new RegExp("(" + ruleRegExps.join(")|(") + ")|($)", flag);
  }
};
(function() {
  this.$setMaxTokenCount = function(m) {
    MAX_TOKEN_COUNT = m | 0;
  };
  this.$applyToken = function(str) {
    var values2 = this.splitRegex.exec(str).slice(1);
    var types = this.token.apply(this, values2);
    if (typeof types === "string")
      return [{ type: types, value: str }];
    var tokens2 = [];
    for (var i = 0, l = types.length; i < l; i++) {
      if (values2[i])
        tokens2[tokens2.length] = {
          type: types[i],
          value: values2[i]
        };
    }
    return tokens2;
  }, this.$arrayTokens = function(str) {
    if (!str)
      return [];
    var values2 = this.splitRegex.exec(str);
    if (!values2)
      return "text";
    var tokens2 = [];
    var types = this.tokenArray;
    for (var i = 0, l = types.length; i < l; i++) {
      if (values2[i + 1])
        tokens2[tokens2.length] = {
          type: types[i],
          value: values2[i + 1]
        };
    }
    return tokens2;
  };
  this.removeCapturingGroups = function(src) {
    var r = src.replace(
      /\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,
      function(x, y) {
        return y ? "(?:" : x;
      }
    );
    return r;
  };
  this.createSplitterRegexp = function(src, flag) {
    if (src.indexOf("(?=") != -1) {
      var stack = 0;
      var inChClass = false;
      var lastCapture = {};
      src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(m, esc, parenOpen2, parenClose, square, index) {
        if (inChClass) {
          inChClass = square != "]";
        } else if (square) {
          inChClass = true;
        } else if (parenClose) {
          if (stack == lastCapture.stack) {
            lastCapture.end = index + 1;
            lastCapture.stack = -1;
          }
          stack--;
        } else if (parenOpen2) {
          stack++;
          if (parenOpen2.length != 1) {
            lastCapture.stack = stack;
            lastCapture.start = index;
          }
        }
        return m;
      });
      if (lastCapture.end != null && /^\)*$/.test(src.substr(lastCapture.end)))
        src = src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
    }
    return new RegExp(src, (flag || "").replace("g", ""));
  };
  this.getLineTokens = function(line, startState) {
    if (startState && typeof startState != "string") {
      var stack = startState.slice(0);
      startState = stack[0];
    } else
      var stack = [];
    var currentState = startState || "start";
    var state = this.states[currentState];
    if (!state) {
      currentState = "start";
      state = this.states[currentState];
    }
    var mapping = this.matchMappings[currentState];
    var re = this.regExps[currentState];
    re.lastIndex = 0;
    var match, tokens2 = [];
    var lastIndex = 0;
    var token = { type: null, value: "" };
    while (match = re.exec(line)) {
      var type = mapping.defaultToken;
      var rule = null;
      var value = match[0];
      var index = re.lastIndex;
      if (index - value.length > lastIndex) {
        var skipped = line.substring(lastIndex, index - value.length);
        if (token.type == type) {
          token.value += skipped;
        } else {
          if (token.type)
            tokens2.push(token);
          token = { type, value: skipped };
        }
      }
      for (var i = 0; i < match.length - 2; i++) {
        if (match[i + 1] === void 0)
          continue;
        rule = state[mapping[i]];
        if (rule.onMatch)
          type = rule.onMatch(value, currentState, stack);
        else
          type = rule.token;
        if (rule.next) {
          if (typeof rule.next == "string")
            currentState = rule.next;
          else
            currentState = rule.next(currentState, stack);
          state = this.states[currentState];
          if (!state) {
            window.console && console.error && console.error(currentState, "doesn't exist");
            currentState = "start";
            state = this.states[currentState];
          }
          mapping = this.matchMappings[currentState];
          lastIndex = index;
          re = this.regExps[currentState];
          re.lastIndex = index;
        }
        break;
      }
      if (value) {
        if (typeof type == "string") {
          if ((!rule || rule.merge !== false) && token.type === type) {
            token.value += value;
          } else {
            if (token.type)
              tokens2.push(token);
            token = { type, value };
          }
        } else if (type) {
          if (token.type)
            tokens2.push(token);
          token = { type: null, value: "" };
          for (var i = 0; i < type.length; i++)
            tokens2.push(type[i]);
        }
      }
      if (lastIndex == line.length)
        break;
      lastIndex = index;
      if (tokens2.length > MAX_TOKEN_COUNT) {
        while (lastIndex < line.length) {
          if (token.type)
            tokens2.push(token);
          token = {
            value: line.substring(lastIndex, lastIndex += 2e3),
            type: "overflow"
          };
        }
        currentState = "start";
        stack = [];
        break;
      }
    }
    if (token.type)
      tokens2.push(token);
    if (stack.length > 1) {
      if (stack[0] !== currentState)
        stack.unshift(currentState);
    }
    return {
      tokens: tokens2,
      state: stack.length ? stack : currentState
    };
  };
}).call(Tokenizer.prototype);
var tokenFromAceToken = {
  empty: null,
  text: null,
  // Keyword
  keyword: "keyword",
  control: "keyword",
  operator: "operator",
  // Constants
  constant: "atom",
  numeric: "number",
  character: "atom",
  escape: "atom",
  // Variables
  variable: "variable",
  parameter: "variable-3",
  language: "variable-2",
  // Python's `self` uses that.
  // Comments
  comment: "comment",
  line: "comment",
  "double-slash": "comment",
  "double-dash": "comment",
  "number-sign": "comment",
  percentage: "comment",
  block: "comment",
  doc: "comment",
  // String
  string: "string",
  quoted: "string",
  single: "string",
  double: "string",
  triple: "string",
  unquoted: "string",
  interpolated: "string",
  regexp: "string-2",
  meta: "keyword",
  literal: "qualifier",
  support: "builtin",
  // Markup
  markup: "tag",
  underline: "link",
  link: "link",
  strong: "strong",
  heading: "header",
  em: "em",
  list: "variable-2",
  numbered: "variable-2",
  unnumbered: "variable-2",
  quote: "quote",
  raw: "variable-2",
  // Markdown's raw block uses that.
  // Invalid
  invalid: "error",
  illegal: "invalidchar",
  deprecated: "error"
};
var cmTokenFromAceTokens = function(tokens2) {
  var token = null;
  for (var i = 0; i < tokens2.length; i++) {
    if (tokenFromAceToken[tokens2[i]] !== void 0) {
      token = tokenFromAceToken[tokens2[i]];
    }
  }
  return token;
};
var consumeToken = function(stream, state) {
  var plannedToken = state.plannedTokens.shift();
  if (plannedToken === void 0) {
    return null;
  }
  stream.match(plannedToken.value);
  var tokens2 = plannedToken.type.split(".");
  return cmTokenFromAceTokens(tokens2);
};
var matchToken = function(stream, state) {
  if (state.plannedTokens.length > 0) {
    return consumeToken(stream, state);
  }
  var currentState = state.current;
  var currentLine = stream.match(/.*$/, false)[0];
  var tokenized = tokenizer.getLineTokens(currentLine, currentState);
  state.plannedTokens = tokenized.tokens;
  state.current = tokenized.state;
  return consumeToken(stream, state);
};
var aceHighlightRules = new HighlightRules();
var tokenizer = new Tokenizer(aceHighlightRules.$rules);
var asciidoc = {
  startState: function() {
    return {
      current: "start",
      // List of {value, type}, with type being an Ace token string.
      plannedTokens: []
    };
  },
  blankLine: function(state) {
    matchToken("", state);
  },
  token: matchToken
};

// ../../node_modules/.pnpm/@lezer+lr@1.4.0/node_modules/@lezer/lr/dist/index.js
var Stack = class _Stack {
  /**
  @internal
  */
  constructor(p, stack, state, reducePos, pos, score2, buffer, bufferBase, curContext, lookAhead = 0, parent) {
    this.p = p;
    this.stack = stack;
    this.state = state;
    this.reducePos = reducePos;
    this.pos = pos;
    this.score = score2;
    this.buffer = buffer;
    this.bufferBase = bufferBase;
    this.curContext = curContext;
    this.lookAhead = lookAhead;
    this.parent = parent;
  }
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(p, state, pos = 0) {
    let cx = p.parser.context;
    return new _Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(state, start) {
    this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
    this.state = state;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(action) {
    var _a;
    let depth = action >> 19, type = action & 65535;
    let { parser: parser9 } = this.p;
    let dPrec = parser9.dynamicPrecedence(type);
    if (dPrec)
      this.score += dPrec;
    if (depth == 0) {
      this.pushState(parser9.getGoto(this.state, type, true), this.reducePos);
      if (type < parser9.minRepeatTerm)
        this.storeNode(type, this.reducePos, this.reducePos, 4, true);
      this.reduceContext(type, this.reducePos);
      return;
    }
    let base = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
    let start = base ? this.stack[base - 2] : this.p.ranges[0].from, size = this.reducePos - start;
    if (size >= 2e3 && !((_a = this.p.parser.nodeSet.types[type]) === null || _a === void 0 ? void 0 : _a.isAnonymous)) {
      if (start == this.p.lastBigReductionStart) {
        this.p.bigReductionCount++;
        this.p.lastBigReductionSize = size;
      } else if (this.p.lastBigReductionSize < size) {
        this.p.bigReductionCount = 1;
        this.p.lastBigReductionStart = start;
        this.p.lastBigReductionSize = size;
      }
    }
    let bufferBase = base ? this.stack[base - 1] : 0, count2 = this.bufferBase + this.buffer.length - bufferBase;
    if (type < parser9.minRepeatTerm || action & 131072) {
      let pos = parser9.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(type, start, pos, count2 + 4, true);
    }
    if (action & 262144) {
      this.state = this.stack[base];
    } else {
      let baseStateID = this.stack[base - 3];
      this.state = parser9.getGoto(baseStateID, type, true);
    }
    while (this.stack.length > base)
      this.stack.pop();
    this.reduceContext(type, start);
  }
  // Shift a value into the buffer
  /**
  @internal
  */
  storeNode(term, start, end, size = 4, isReduce = false) {
    if (term == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let cur2 = this, top = this.buffer.length;
      if (top == 0 && cur2.parent) {
        top = cur2.bufferBase - cur2.parent.bufferBase;
        cur2 = cur2.parent;
      }
      if (top > 0 && cur2.buffer[top - 4] == 0 && cur2.buffer[top - 1] > -1) {
        if (start == end)
          return;
        if (cur2.buffer[top - 2] >= start) {
          cur2.buffer[top - 2] = end;
          return;
        }
      }
    }
    if (!isReduce || this.pos == end) {
      this.buffer.push(term, start, end, size);
    } else {
      let index = this.buffer.length;
      if (index > 0 && this.buffer[index - 4] != 0)
        while (index > 0 && this.buffer[index - 2] > end) {
          this.buffer[index] = this.buffer[index - 4];
          this.buffer[index + 1] = this.buffer[index - 3];
          this.buffer[index + 2] = this.buffer[index - 2];
          this.buffer[index + 3] = this.buffer[index - 1];
          index -= 4;
          if (size > 4)
            size -= 4;
        }
      this.buffer[index] = term;
      this.buffer[index + 1] = start;
      this.buffer[index + 2] = end;
      this.buffer[index + 3] = size;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(action, type, start, end) {
    if (action & 131072) {
      this.pushState(action & 65535, this.pos);
    } else if ((action & 262144) == 0) {
      let nextState = action, { parser: parser9 } = this.p;
      if (end > this.pos || type <= parser9.maxNode) {
        this.pos = end;
        if (!parser9.stateFlag(
          nextState,
          1
          /* StateFlag.Skipped */
        ))
          this.reducePos = end;
      }
      this.pushState(nextState, start);
      this.shiftContext(type, start);
      if (type <= parser9.maxNode)
        this.buffer.push(type, start, end, 4);
    } else {
      this.pos = end;
      this.shiftContext(type, start);
      if (type <= this.p.parser.maxNode)
        this.buffer.push(type, start, end, 4);
    }
  }
  // Apply an action
  /**
  @internal
  */
  apply(action, next, nextStart, nextEnd) {
    if (action & 65536)
      this.reduce(action);
    else
      this.shift(action, next, nextStart, nextEnd);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(value, next) {
    let index = this.p.reused.length - 1;
    if (index < 0 || this.p.reused[index] != value) {
      this.p.reused.push(value);
      index++;
    }
    let start = this.pos;
    this.reducePos = this.pos = start + value.length;
    this.pushState(next, start);
    this.buffer.push(
      index,
      start,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    );
    if (this.curContext)
      this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /**
  @internal
  */
  split() {
    let parent = this;
    let off = parent.buffer.length;
    while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
      off -= 4;
    let buffer = parent.buffer.slice(off), base = parent.bufferBase + off;
    while (parent && base == parent.bufferBase)
      parent = parent.parent;
    return new _Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base, this.curContext, this.lookAhead, parent);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(next, nextEnd) {
    let isNode = next <= this.p.parser.maxNode;
    if (isNode)
      this.storeNode(next, this.pos, nextEnd, 4);
    this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
    this.pos = this.reducePos = nextEnd;
    this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(term) {
    for (let sim = new SimulatedStack(this); ; ) {
      let action = this.p.parser.stateSlot(
        sim.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(sim.state, term);
      if (action == 0)
        return false;
      if ((action & 65536) == 0)
        return true;
      sim.reduce(action);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /**
  @internal
  */
  recoverByInsert(next) {
    if (this.stack.length >= 300)
      return [];
    let nextStates = this.p.parser.nextStates(this.state);
    if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
      let best = [];
      for (let i = 0, s; i < nextStates.length; i += 2) {
        if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next))
          best.push(nextStates[i], s);
      }
      if (this.stack.length < 120)
        for (let i = 0; best.length < 4 << 1 && i < nextStates.length; i += 2) {
          let s = nextStates[i + 1];
          if (!best.some((v, i2) => i2 & 1 && v == s))
            best.push(nextStates[i], s);
        }
      nextStates = best;
    }
    let result = [];
    for (let i = 0; i < nextStates.length && result.length < 4; i += 2) {
      let s = nextStates[i + 1];
      if (s == this.state)
        continue;
      let stack = this.split();
      stack.pushState(s, this.pos);
      stack.storeNode(0, stack.pos, stack.pos, 4, true);
      stack.shiftContext(nextStates[i], this.pos);
      stack.reducePos = this.pos;
      stack.score -= 200;
      result.push(stack);
    }
    return result;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
  forceReduce() {
    let { parser: parser9 } = this.p;
    let reduce = parser9.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if ((reduce & 65536) == 0)
      return false;
    if (!parser9.validAction(this.state, reduce)) {
      let depth = reduce >> 19, term = reduce & 65535;
      let target = this.stack.length - depth * 3;
      if (target < 0 || parser9.getGoto(this.stack[target], term, false) < 0) {
        let backup = this.findForcedReduction();
        if (backup == null)
          return false;
        reduce = backup;
      }
      this.storeNode(0, this.pos, this.pos, 4, true);
      this.score -= 100;
    }
    this.reducePos = this.pos;
    this.reduce(reduce);
    return true;
  }
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: parser9 } = this.p, seen = [];
    let explore = (state, depth) => {
      if (seen.includes(state))
        return;
      seen.push(state);
      return parser9.allActions(state, (action) => {
        if (action & (262144 | 131072))
          ;
        else if (action & 65536) {
          let rDepth = (action >> 19) - depth;
          if (rDepth > 1) {
            let term = action & 65535, target = this.stack.length - rDepth * 3;
            if (target >= 0 && parser9.getGoto(this.stack[target], term, false) >= 0)
              return rDepth << 19 | 65536 | term;
          }
        } else {
          let found = explore(action, depth + 1);
          if (found != null)
            return found;
        }
      });
    };
    return explore(this.state, 0);
  }
  /**
  @internal
  */
  forceAll() {
    while (!this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    )) {
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, true);
        break;
      }
    }
    return this;
  }
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
  get deadEnd() {
    if (this.stack.length != 3)
      return false;
    let { parser: parser9 } = this.p;
    return parser9.data[parser9.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !parser9.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, true);
    this.state = this.stack[0];
    this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(other) {
    if (this.state != other.state || this.stack.length != other.stack.length)
      return false;
    for (let i = 0; i < this.stack.length; i += 3)
      if (this.stack[i] != other.stack[i])
        return false;
    return true;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
  dialectEnabled(dialectID) {
    return this.p.parser.dialect.flags[dialectID];
  }
  shiftContext(term, start) {
    if (this.curContext)
      this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
  }
  reduceContext(term, start) {
    if (this.curContext)
      this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
  }
  /**
  @internal
  */
  emitContext() {
    let last = this.buffer.length - 1;
    if (last < 0 || this.buffer[last] != -3)
      this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
  emitLookAhead() {
    let last = this.buffer.length - 1;
    if (last < 0 || this.buffer[last] != -4)
      this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(context) {
    if (context != this.curContext.context) {
      let newCx = new StackContext(this.curContext.tracker, context);
      if (newCx.hash != this.curContext.hash)
        this.emitContext();
      this.curContext = newCx;
    }
  }
  /**
  @internal
  */
  setLookAhead(lookAhead) {
    if (lookAhead > this.lookAhead) {
      this.emitLookAhead();
      this.lookAhead = lookAhead;
    }
  }
  /**
  @internal
  */
  close() {
    if (this.curContext && this.curContext.tracker.strict)
      this.emitContext();
    if (this.lookAhead > 0)
      this.emitLookAhead();
  }
};
var StackContext = class {
  constructor(tracker, context) {
    this.tracker = tracker;
    this.context = context;
    this.hash = tracker.strict ? tracker.hash(context) : 0;
  }
};
var SimulatedStack = class {
  constructor(start) {
    this.start = start;
    this.state = start.state;
    this.stack = start.stack;
    this.base = this.stack.length;
  }
  reduce(action) {
    let term = action & 65535, depth = action >> 19;
    if (depth == 0) {
      if (this.stack == this.start.stack)
        this.stack = this.stack.slice();
      this.stack.push(this.state, 0, 0);
      this.base += 3;
    } else {
      this.base -= (depth - 1) * 3;
    }
    let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
    this.state = goto;
  }
};
var StackBufferCursor = class _StackBufferCursor {
  constructor(stack, pos, index) {
    this.stack = stack;
    this.pos = pos;
    this.index = index;
    this.buffer = stack.buffer;
    if (this.index == 0)
      this.maybeNext();
  }
  static create(stack, pos = stack.bufferBase + stack.buffer.length) {
    return new _StackBufferCursor(stack, pos, pos - stack.bufferBase);
  }
  maybeNext() {
    let next = this.stack.parent;
    if (next != null) {
      this.index = this.stack.bufferBase - next.bufferBase;
      this.stack = next;
      this.buffer = next.buffer;
    }
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4;
    this.pos -= 4;
    if (this.index == 0)
      this.maybeNext();
  }
  fork() {
    return new _StackBufferCursor(this.stack, this.pos, this.index);
  }
};
function decodeArray(input, Type3 = Uint16Array) {
  if (typeof input != "string")
    return input;
  let array = null;
  for (let pos = 0, out = 0; pos < input.length; ) {
    let value = 0;
    for (; ; ) {
      let next = input.charCodeAt(pos++), stop = false;
      if (next == 126) {
        value = 65535;
        break;
      }
      if (next >= 92)
        next--;
      if (next >= 34)
        next--;
      let digit = next - 32;
      if (digit >= 46) {
        digit -= 46;
        stop = true;
      }
      value += digit;
      if (stop)
        break;
      value *= 46;
    }
    if (array)
      array[out++] = value;
    else
      array = new Type3(value);
  }
  return array;
}
var CachedToken = class {
  constructor() {
    this.start = -1;
    this.value = -1;
    this.end = -1;
    this.extended = -1;
    this.lookAhead = 0;
    this.mask = 0;
    this.context = 0;
  }
};
var nullToken = new CachedToken();
var InputStream = class {
  /**
  @internal
  */
  constructor(input, ranges) {
    this.input = input;
    this.ranges = ranges;
    this.chunk = "";
    this.chunkOff = 0;
    this.chunk2 = "";
    this.chunk2Pos = 0;
    this.next = -1;
    this.token = nullToken;
    this.rangeIndex = 0;
    this.pos = this.chunkPos = ranges[0].from;
    this.range = ranges[0];
    this.end = ranges[ranges.length - 1].to;
    this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(offset, assoc) {
    let range = this.range, index = this.rangeIndex;
    let pos = this.pos + offset;
    while (pos < range.from) {
      if (!index)
        return null;
      let next = this.ranges[--index];
      pos -= range.from - next.to;
      range = next;
    }
    while (assoc < 0 ? pos > range.to : pos >= range.to) {
      if (index == this.ranges.length - 1)
        return null;
      let next = this.ranges[++index];
      pos += next.from - range.to;
      range = next;
    }
    return pos;
  }
  /**
  @internal
  */
  clipPos(pos) {
    if (pos >= this.range.from && pos < this.range.to)
      return pos;
    for (let range of this.ranges)
      if (range.to > pos)
        return Math.max(pos, range.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
  peek(offset) {
    let idx = this.chunkOff + offset, pos, result;
    if (idx >= 0 && idx < this.chunk.length) {
      pos = this.pos + offset;
      result = this.chunk.charCodeAt(idx);
    } else {
      let resolved = this.resolveOffset(offset, 1);
      if (resolved == null)
        return -1;
      pos = resolved;
      if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
        result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
      } else {
        let i = this.rangeIndex, range = this.range;
        while (range.to <= pos)
          range = this.ranges[++i];
        this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
        if (pos + this.chunk2.length > range.to)
          this.chunk2 = this.chunk2.slice(0, range.to - pos);
        result = this.chunk2.charCodeAt(0);
      }
    }
    if (pos >= this.token.lookAhead)
      this.token.lookAhead = pos + 1;
    return result;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(token, endOffset = 0) {
    let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
    if (end == null || end < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = token;
    this.token.end = end;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(token, endPos) {
    this.token.value = token;
    this.token.end = endPos;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk, chunkPos } = this;
      this.chunk = this.chunk2;
      this.chunkPos = this.chunk2Pos;
      this.chunk2 = chunk;
      this.chunk2Pos = chunkPos;
      this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk;
      this.chunk2Pos = this.chunkPos;
      let nextChunk = this.input.chunk(this.pos);
      let end = this.pos + nextChunk.length;
      this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
      this.chunkPos = this.pos;
      this.chunkOff = 0;
    }
  }
  readNext() {
    if (this.chunkOff >= this.chunk.length) {
      this.getChunk();
      if (this.chunkOff == this.chunk.length)
        return this.next = -1;
    }
    return this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
  advance(n = 1) {
    this.chunkOff += n;
    while (this.pos + n >= this.range.to) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      n -= this.range.to - this.pos;
      this.range = this.ranges[++this.rangeIndex];
      this.pos = this.range.from;
    }
    this.pos += n;
    if (this.pos >= this.token.lookAhead)
      this.token.lookAhead = this.pos + 1;
    return this.readNext();
  }
  setDone() {
    this.pos = this.chunkPos = this.end;
    this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
    this.chunk = "";
    return this.next = -1;
  }
  /**
  @internal
  */
  reset(pos, token) {
    if (token) {
      this.token = token;
      token.start = pos;
      token.lookAhead = pos + 1;
      token.value = token.extended = -1;
    } else {
      this.token = nullToken;
    }
    if (this.pos != pos) {
      this.pos = pos;
      if (pos == this.end) {
        this.setDone();
        return this;
      }
      while (pos < this.range.from)
        this.range = this.ranges[--this.rangeIndex];
      while (pos >= this.range.to)
        this.range = this.ranges[++this.rangeIndex];
      if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
        this.chunkOff = pos - this.chunkPos;
      } else {
        this.chunk = "";
        this.chunkOff = 0;
      }
      this.readNext();
    }
    return this;
  }
  /**
  @internal
  */
  read(from, to) {
    if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
    if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
    if (from >= this.range.from && to <= this.range.to)
      return this.input.read(from, to);
    let result = "";
    for (let r of this.ranges) {
      if (r.from >= to)
        break;
      if (r.to > from)
        result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
    }
    return result;
  }
};
var TokenGroup = class {
  constructor(data2, id2) {
    this.data = data2;
    this.id = id2;
  }
  token(input, stack) {
    let { parser: parser9 } = stack.p;
    readToken(this.data, input, stack, this.id, parser9.data, parser9.tokenPrecTable);
  }
};
TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
var LocalTokenGroup = class {
  constructor(data2, precTable, elseToken) {
    this.precTable = precTable;
    this.elseToken = elseToken;
    this.data = typeof data2 == "string" ? decodeArray(data2) : data2;
  }
  token(input, stack) {
    let start = input.pos, skipped = 0;
    for (; ; ) {
      let atEof = input.next < 0, nextPos = input.resolveOffset(1, 1);
      readToken(this.data, input, stack, 0, this.data, this.precTable);
      if (input.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (!atEof)
        skipped++;
      if (nextPos == null)
        break;
      input.reset(nextPos, input.token);
    }
    if (skipped) {
      input.reset(start, input.token);
      input.acceptToken(this.elseToken, skipped);
    }
  }
};
LocalTokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
var ExternalTokenizer = class {
  /**
  Create a tokenizer. The first argument is the function that,
  given an input stream, scans for the types of tokens it
  recognizes at the stream's position, and calls
  [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  one.
  */
  constructor(token, options = {}) {
    this.token = token;
    this.contextual = !!options.contextual;
    this.fallback = !!options.fallback;
    this.extend = !!options.extend;
  }
};
function readToken(data2, input, stack, group, precTable, precOffset) {
  let state = 0, groupMask = 1 << group, { dialect: dialect2 } = stack.p.parser;
  scan:
    for (; ; ) {
      if ((groupMask & data2[state]) == 0)
        break;
      let accEnd = data2[state + 1];
      for (let i = state + 3; i < accEnd; i += 2)
        if ((data2[i + 1] & groupMask) > 0) {
          let term = data2[i];
          if (dialect2.allows(term) && (input.token.value == -1 || input.token.value == term || overrides(term, input.token.value, precTable, precOffset))) {
            input.acceptToken(term);
            break;
          }
        }
      let next = input.next, low = 0, high = data2[state + 2];
      if (input.next < 0 && high > low && data2[accEnd + high * 3 - 3] == 65535) {
        state = data2[accEnd + high * 3 - 1];
        continue scan;
      }
      for (; low < high; ) {
        let mid = low + high >> 1;
        let index = accEnd + mid + (mid << 1);
        let from = data2[index], to = data2[index + 1] || 65536;
        if (next < from)
          high = mid;
        else if (next >= to)
          low = mid + 1;
        else {
          state = data2[index + 2];
          input.advance();
          continue scan;
        }
      }
      break;
    }
}
function findOffset(data2, start, term) {
  for (let i = start, next; (next = data2[i]) != 65535; i++)
    if (next == term)
      return i - start;
  return -1;
}
function overrides(token, prev, tableData, tableOffset) {
  let iPrev = findOffset(tableData, tableOffset, prev);
  return iPrev < 0 || findOffset(tableData, tableOffset, token) < iPrev;
}
var verbose = typeof process != "undefined" && process.env && /\bparse\b/.test(process.env.LOG);
var stackIDs = null;
function cutAt(tree, pos, side) {
  let cursor = tree.cursor(IterMode.IncludeAnonymous);
  cursor.moveTo(pos);
  for (; ; ) {
    if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
      for (; ; ) {
        if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
          return side < 0 ? Math.max(0, Math.min(
            cursor.to - 1,
            pos - 25
            /* Safety.Margin */
          )) : Math.min(tree.length, Math.max(
            cursor.from + 1,
            pos + 25
            /* Safety.Margin */
          ));
        if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
          break;
        if (!cursor.parent())
          return side < 0 ? 0 : tree.length;
      }
  }
}
var FragmentCursor = class {
  constructor(fragments, nodeSet) {
    this.fragments = fragments;
    this.nodeSet = nodeSet;
    this.i = 0;
    this.fragment = null;
    this.safeFrom = -1;
    this.safeTo = -1;
    this.trees = [];
    this.start = [];
    this.index = [];
    this.nextFragment();
  }
  nextFragment() {
    let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (fr) {
      this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
      this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
      while (this.trees.length) {
        this.trees.pop();
        this.start.pop();
        this.index.pop();
      }
      this.trees.push(fr.tree);
      this.start.push(-fr.offset);
      this.index.push(0);
      this.nextStart = this.safeFrom;
    } else {
      this.nextStart = 1e9;
    }
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(pos) {
    if (pos < this.nextStart)
      return null;
    while (this.fragment && this.safeTo <= pos)
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let last = this.trees.length - 1;
      if (last < 0) {
        this.nextFragment();
        return null;
      }
      let top = this.trees[last], index = this.index[last];
      if (index == top.children.length) {
        this.trees.pop();
        this.start.pop();
        this.index.pop();
        continue;
      }
      let next = top.children[index];
      let start = this.start[last] + top.positions[index];
      if (start > pos) {
        this.nextStart = start;
        return null;
      }
      if (next instanceof Tree) {
        if (start == pos) {
          if (start < this.safeFrom)
            return null;
          let end = start + next.length;
          if (end <= this.safeTo) {
            let lookAhead = next.prop(NodeProp.lookAhead);
            if (!lookAhead || end + lookAhead < this.fragment.to)
              return next;
          }
        }
        this.index[last]++;
        if (start + next.length >= Math.max(this.safeFrom, pos)) {
          this.trees.push(next);
          this.start.push(start);
          this.index.push(0);
        }
      } else {
        this.index[last]++;
        this.nextStart = start + next.length;
      }
    }
  }
};
var TokenCache = class {
  constructor(parser9, stream) {
    this.stream = stream;
    this.tokens = [];
    this.mainToken = null;
    this.actions = [];
    this.tokens = parser9.tokenizers.map((_) => new CachedToken());
  }
  getActions(stack) {
    let actionIndex = 0;
    let main = null;
    let { parser: parser9 } = stack.p, { tokenizers } = parser9;
    let mask = parser9.stateSlot(
      stack.state,
      3
      /* ParseState.TokenizerMask */
    );
    let context = stack.curContext ? stack.curContext.hash : 0;
    let lookAhead = 0;
    for (let i = 0; i < tokenizers.length; i++) {
      if ((1 << i & mask) == 0)
        continue;
      let tokenizer2 = tokenizers[i], token = this.tokens[i];
      if (main && !tokenizer2.fallback)
        continue;
      if (tokenizer2.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
        this.updateCachedToken(token, tokenizer2, stack);
        token.mask = mask;
        token.context = context;
      }
      if (token.lookAhead > token.end + 25)
        lookAhead = Math.max(token.lookAhead, lookAhead);
      if (token.value != 0) {
        let startIndex = actionIndex;
        if (token.extended > -1)
          actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
        actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
        if (!tokenizer2.extend) {
          main = token;
          if (actionIndex > startIndex)
            break;
        }
      }
    }
    while (this.actions.length > actionIndex)
      this.actions.pop();
    if (lookAhead)
      stack.setLookAhead(lookAhead);
    if (!main && stack.pos == this.stream.end) {
      main = new CachedToken();
      main.value = stack.p.parser.eofTerm;
      main.start = main.end = stack.pos;
      actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
    }
    this.mainToken = main;
    return this.actions;
  }
  getMainToken(stack) {
    if (this.mainToken)
      return this.mainToken;
    let main = new CachedToken(), { pos, p } = stack;
    main.start = pos;
    main.end = Math.min(pos + 1, p.stream.end);
    main.value = pos == p.stream.end ? p.parser.eofTerm : 0;
    return main;
  }
  updateCachedToken(token, tokenizer2, stack) {
    let start = this.stream.clipPos(stack.pos);
    tokenizer2.token(this.stream.reset(start, token), stack);
    if (token.value > -1) {
      let { parser: parser9 } = stack.p;
      for (let i = 0; i < parser9.specialized.length; i++)
        if (parser9.specialized[i] == token.value) {
          let result = parser9.specializers[i](this.stream.read(token.start, token.end), stack);
          if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
            if ((result & 1) == 0)
              token.value = result >> 1;
            else
              token.extended = result >> 1;
            break;
          }
        }
    } else {
      token.value = 0;
      token.end = this.stream.clipPos(start + 1);
    }
  }
  putAction(action, token, end, index) {
    for (let i = 0; i < index; i += 3)
      if (this.actions[i] == action)
        return index;
    this.actions[index++] = action;
    this.actions[index++] = token;
    this.actions[index++] = end;
    return index;
  }
  addActions(stack, token, end, index) {
    let { state } = stack, { parser: parser9 } = stack.p, { data: data2 } = parser9;
    for (let set = 0; set < 2; set++) {
      for (let i = parser9.stateSlot(
        state,
        set ? 2 : 1
        /* ParseState.Actions */
      ); ; i += 3) {
        if (data2[i] == 65535) {
          if (data2[i + 1] == 1) {
            i = pair(data2, i + 2);
          } else {
            if (index == 0 && data2[i + 1] == 2)
              index = this.putAction(pair(data2, i + 2), token, end, index);
            break;
          }
        }
        if (data2[i] == token)
          index = this.putAction(pair(data2, i + 1), token, end, index);
      }
    }
    return index;
  }
};
var Parse = class {
  constructor(parser9, input, fragments, ranges) {
    this.parser = parser9;
    this.input = input;
    this.ranges = ranges;
    this.recovering = 0;
    this.nextStackID = 9812;
    this.minStackPos = 0;
    this.reused = [];
    this.stoppedAt = null;
    this.lastBigReductionStart = -1;
    this.lastBigReductionSize = 0;
    this.bigReductionCount = 0;
    this.stream = new InputStream(input, ranges);
    this.tokens = new TokenCache(parser9, this.stream);
    this.topTerm = parser9.top[1];
    let { from } = ranges[0];
    this.stacks = [Stack.start(this, parser9.top[0], from)];
    this.fragments = fragments.length && this.stream.end - from > parser9.bufferLength * 4 ? new FragmentCursor(fragments, parser9.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let stacks = this.stacks, pos = this.minStackPos;
    let newStacks = this.stacks = [];
    let stopped, stoppedTokens;
    if (this.bigReductionCount > 300 && stacks.length == 1) {
      let [s] = stacks;
      while (s.forceReduce() && s.stack.length && s.stack[s.stack.length - 2] >= this.lastBigReductionStart) {
      }
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let i = 0; i < stacks.length; i++) {
      let stack = stacks[i];
      for (; ; ) {
        this.tokens.mainToken = null;
        if (stack.pos > pos) {
          newStacks.push(stack);
        } else if (this.advanceStack(stack, newStacks, stacks)) {
          continue;
        } else {
          if (!stopped) {
            stopped = [];
            stoppedTokens = [];
          }
          stopped.push(stack);
          let tok = this.tokens.getMainToken(stack);
          stoppedTokens.push(tok.value, tok.end);
        }
        break;
      }
    }
    if (!newStacks.length) {
      let finished = stopped && findFinished(stopped);
      if (finished) {
        if (verbose)
          console.log("Finish with " + this.stackID(finished));
        return this.stackToTree(finished);
      }
      if (this.parser.strict) {
        if (verbose && stopped)
          console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
        throw new SyntaxError("No parse at " + pos);
      }
      if (!this.recovering)
        this.recovering = 5;
    }
    if (this.recovering && stopped) {
      let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
      if (finished) {
        if (verbose)
          console.log("Force-finish " + this.stackID(finished));
        return this.stackToTree(finished.forceAll());
      }
    }
    if (this.recovering) {
      let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
      if (newStacks.length > maxRemaining) {
        newStacks.sort((a, b) => b.score - a.score);
        while (newStacks.length > maxRemaining)
          newStacks.pop();
      }
      if (newStacks.some((s) => s.reducePos > pos))
        this.recovering--;
    } else if (newStacks.length > 1) {
      outer:
        for (let i = 0; i < newStacks.length - 1; i++) {
          let stack = newStacks[i];
          for (let j = i + 1; j < newStacks.length; j++) {
            let other = newStacks[j];
            if (stack.sameState(other) || stack.buffer.length > 500 && other.buffer.length > 500) {
              if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                newStacks.splice(j--, 1);
              } else {
                newStacks.splice(i--, 1);
                continue outer;
              }
            }
          }
        }
      if (newStacks.length > 12)
        newStacks.splice(
          12,
          newStacks.length - 12
          /* Rec.MaxStackCount */
        );
    }
    this.minStackPos = newStacks[0].pos;
    for (let i = 1; i < newStacks.length; i++)
      if (newStacks[i].pos < this.minStackPos)
        this.minStackPos = newStacks[i].pos;
    return null;
  }
  stopAt(pos) {
    if (this.stoppedAt != null && this.stoppedAt < pos)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = pos;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(stack, stacks, split) {
    let start = stack.pos, { parser: parser9 } = this;
    let base = verbose ? this.stackID(stack) + " -> " : "";
    if (this.stoppedAt != null && start > this.stoppedAt)
      return stack.forceReduce() ? stack : null;
    if (this.fragments) {
      let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
      for (let cached = this.fragments.nodeAt(start); cached; ) {
        let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser9.getGoto(stack.state, cached.type.id) : -1;
        if (match > -1 && cached.length && (!strictCx || (cached.prop(NodeProp.contextHash) || 0) == cxHash)) {
          stack.useNode(cached, match);
          if (verbose)
            console.log(base + this.stackID(stack) + ` (via reuse of ${parser9.getName(cached.type.id)})`);
          return true;
        }
        if (!(cached instanceof Tree) || cached.children.length == 0 || cached.positions[0] > 0)
          break;
        let inner = cached.children[0];
        if (inner instanceof Tree && cached.positions[0] == 0)
          cached = inner;
        else
          break;
      }
    }
    let defaultReduce = parser9.stateSlot(
      stack.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (defaultReduce > 0) {
      stack.reduce(defaultReduce);
      if (verbose)
        console.log(base + this.stackID(stack) + ` (via always-reduce ${parser9.getName(
          defaultReduce & 65535
          /* Action.ValueMask */
        )})`);
      return true;
    }
    if (stack.stack.length >= 8400) {
      while (stack.stack.length > 6e3 && stack.forceReduce()) {
      }
    }
    let actions = this.tokens.getActions(stack);
    for (let i = 0; i < actions.length; ) {
      let action = actions[i++], term = actions[i++], end = actions[i++];
      let last = i == actions.length || !split;
      let localStack = last ? stack : stack.split();
      let main = this.tokens.mainToken;
      localStack.apply(action, term, main ? main.start : localStack.pos, end);
      if (verbose)
        console.log(base + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser9.getName(
          action & 65535
          /* Action.ValueMask */
        )}`} for ${parser9.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
      if (last)
        return true;
      else if (localStack.pos > start)
        stacks.push(localStack);
      else
        split.push(localStack);
    }
    return false;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(stack, newStacks) {
    let pos = stack.pos;
    for (; ; ) {
      if (!this.advanceStack(stack, null, null))
        return false;
      if (stack.pos > pos) {
        pushStackDedup(stack, newStacks);
        return true;
      }
    }
  }
  runRecovery(stacks, tokens2, newStacks) {
    let finished = null, restarted = false;
    for (let i = 0; i < stacks.length; i++) {
      let stack = stacks[i], token = tokens2[i << 1], tokenEnd = tokens2[(i << 1) + 1];
      let base = verbose ? this.stackID(stack) + " -> " : "";
      if (stack.deadEnd) {
        if (restarted)
          continue;
        restarted = true;
        stack.restart();
        if (verbose)
          console.log(base + this.stackID(stack) + " (restarted)");
        let done = this.advanceFully(stack, newStacks);
        if (done)
          continue;
      }
      let force = stack.split(), forceBase = base;
      for (let j = 0; force.forceReduce() && j < 10; j++) {
        if (verbose)
          console.log(forceBase + this.stackID(force) + " (via force-reduce)");
        let done = this.advanceFully(force, newStacks);
        if (done)
          break;
        if (verbose)
          forceBase = this.stackID(force) + " -> ";
      }
      for (let insert of stack.recoverByInsert(token)) {
        if (verbose)
          console.log(base + this.stackID(insert) + " (via recover-insert)");
        this.advanceFully(insert, newStacks);
      }
      if (this.stream.end > stack.pos) {
        if (tokenEnd == stack.pos) {
          tokenEnd++;
          token = 0;
        }
        stack.recoverByDelete(token, tokenEnd);
        if (verbose)
          console.log(base + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
        pushStackDedup(stack, newStacks);
      } else if (!finished || finished.score < stack.score) {
        finished = stack;
      }
    }
    return finished;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(stack) {
    stack.close();
    return Tree.build({
      buffer: StackBufferCursor.create(stack),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: stack.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(stack) {
    let id2 = (stackIDs || (stackIDs = /* @__PURE__ */ new WeakMap())).get(stack);
    if (!id2)
      stackIDs.set(stack, id2 = String.fromCodePoint(this.nextStackID++));
    return id2 + stack;
  }
};
function pushStackDedup(stack, newStacks) {
  for (let i = 0; i < newStacks.length; i++) {
    let other = newStacks[i];
    if (other.pos == stack.pos && other.sameState(stack)) {
      if (newStacks[i].score < stack.score)
        newStacks[i] = stack;
      return;
    }
  }
  newStacks.push(stack);
}
var Dialect = class {
  constructor(source, flags, disabled) {
    this.source = source;
    this.flags = flags;
    this.disabled = disabled;
  }
  allows(term) {
    return !this.disabled || this.disabled[term] == 0;
  }
};
var id = (x) => x;
var ContextTracker = class {
  /**
  Define a context tracker.
  */
  constructor(spec) {
    this.start = spec.start;
    this.shift = spec.shift || id;
    this.reduce = spec.reduce || id;
    this.reuse = spec.reuse || id;
    this.hash = spec.hash || (() => 0);
    this.strict = spec.strict !== false;
  }
};
var LRParser = class _LRParser extends Parser {
  /**
  @internal
  */
  constructor(spec) {
    super();
    this.wrappers = [];
    if (spec.version != 14)
      throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${14})`);
    let nodeNames = spec.nodeNames.split(" ");
    this.minRepeatTerm = nodeNames.length;
    for (let i = 0; i < spec.repeatNodeCount; i++)
      nodeNames.push("");
    let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
    let nodeProps = [];
    for (let i = 0; i < nodeNames.length; i++)
      nodeProps.push([]);
    function setProp(nodeID, prop, value) {
      nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
    }
    if (spec.nodeProps)
      for (let propSpec of spec.nodeProps) {
        let prop = propSpec[0];
        if (typeof prop == "string")
          prop = NodeProp[prop];
        for (let i = 1; i < propSpec.length; ) {
          let next = propSpec[i++];
          if (next >= 0) {
            setProp(next, prop, propSpec[i++]);
          } else {
            let value = propSpec[i + -next];
            for (let j = -next; j > 0; j--)
              setProp(propSpec[i++], prop, value);
            i++;
          }
        }
      }
    this.nodeSet = new NodeSet(nodeNames.map((name, i) => NodeType.define({
      name: i >= this.minRepeatTerm ? void 0 : name,
      id: i,
      props: nodeProps[i],
      top: topTerms.indexOf(i) > -1,
      error: i == 0,
      skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
    })));
    if (spec.propSources)
      this.nodeSet = this.nodeSet.extend(...spec.propSources);
    this.strict = false;
    this.bufferLength = DefaultBufferLength;
    let tokenArray = decodeArray(spec.tokenData);
    this.context = spec.context;
    this.specializerSpecs = spec.specialized || [];
    this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let i = 0; i < this.specializerSpecs.length; i++)
      this.specialized[i] = this.specializerSpecs[i].term;
    this.specializers = this.specializerSpecs.map(getSpecializer);
    this.states = decodeArray(spec.states, Uint32Array);
    this.data = decodeArray(spec.stateData);
    this.goto = decodeArray(spec.goto);
    this.maxTerm = spec.maxTerm;
    this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
    this.topRules = spec.topRules;
    this.dialects = spec.dialects || {};
    this.dynamicPrecedences = spec.dynamicPrecedences || null;
    this.tokenPrecTable = spec.tokenPrec;
    this.termNames = spec.termNames || null;
    this.maxNode = this.nodeSet.types.length - 1;
    this.dialect = this.parseDialect();
    this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(input, fragments, ranges) {
    let parse = new Parse(this, input, fragments, ranges);
    for (let w of this.wrappers)
      parse = w(parse, input, fragments, ranges);
    return parse;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(state, term, loose = false) {
    let table = this.goto;
    if (term >= table[0])
      return -1;
    for (let pos = table[term + 1]; ; ) {
      let groupTag = table[pos++], last = groupTag & 1;
      let target = table[pos++];
      if (last && loose)
        return target;
      for (let end = pos + (groupTag >> 1); pos < end; pos++)
        if (table[pos] == state)
          return target;
      if (last)
        return -1;
    }
  }
  /**
  Check if this state has an action for a given terminal @internal
  */
  hasAction(state, terminal) {
    let data2 = this.data;
    for (let set = 0; set < 2; set++) {
      for (let i = this.stateSlot(
        state,
        set ? 2 : 1
        /* ParseState.Actions */
      ), next; ; i += 3) {
        if ((next = data2[i]) == 65535) {
          if (data2[i + 1] == 1)
            next = data2[i = pair(data2, i + 2)];
          else if (data2[i + 1] == 2)
            return pair(data2, i + 2);
          else
            break;
        }
        if (next == terminal || next == 0)
          return pair(data2, i + 1);
      }
    }
    return 0;
  }
  /**
  @internal
  */
  stateSlot(state, slot) {
    return this.states[state * 6 + slot];
  }
  /**
  @internal
  */
  stateFlag(state, flag) {
    return (this.stateSlot(
      state,
      0
      /* ParseState.Flags */
    ) & flag) > 0;
  }
  /**
  @internal
  */
  validAction(state, action) {
    return !!this.allActions(state, (a) => a == action ? true : null);
  }
  /**
  @internal
  */
  allActions(state, action) {
    let deflt = this.stateSlot(
      state,
      4
      /* ParseState.DefaultReduce */
    );
    let result = deflt ? action(deflt) : void 0;
    for (let i = this.stateSlot(
      state,
      1
      /* ParseState.Actions */
    ); result == null; i += 3) {
      if (this.data[i] == 65535) {
        if (this.data[i + 1] == 1)
          i = pair(this.data, i + 2);
        else
          break;
      }
      result = action(pair(this.data, i + 1));
    }
    return result;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(state) {
    let result = [];
    for (let i = this.stateSlot(
      state,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535) {
        if (this.data[i + 1] == 1)
          i = pair(this.data, i + 2);
        else
          break;
      }
      if ((this.data[i + 2] & 65536 >> 16) == 0) {
        let value = this.data[i + 1];
        if (!result.some((v, i2) => i2 & 1 && v == value))
          result.push(this.data[i], value);
      }
    }
    return result;
  }
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
  configure(config2) {
    let copy = Object.assign(Object.create(_LRParser.prototype), this);
    if (config2.props)
      copy.nodeSet = this.nodeSet.extend(...config2.props);
    if (config2.top) {
      let info = this.topRules[config2.top];
      if (!info)
        throw new RangeError(`Invalid top rule name ${config2.top}`);
      copy.top = info;
    }
    if (config2.tokenizers)
      copy.tokenizers = this.tokenizers.map((t) => {
        let found = config2.tokenizers.find((r) => r.from == t);
        return found ? found.to : t;
      });
    if (config2.specializers) {
      copy.specializers = this.specializers.slice();
      copy.specializerSpecs = this.specializerSpecs.map((s, i) => {
        let found = config2.specializers.find((r) => r.from == s.external);
        if (!found)
          return s;
        let spec = Object.assign(Object.assign({}, s), { external: found.to });
        copy.specializers[i] = getSpecializer(spec);
        return spec;
      });
    }
    if (config2.contextTracker)
      copy.context = config2.contextTracker;
    if (config2.dialect)
      copy.dialect = this.parseDialect(config2.dialect);
    if (config2.strict != null)
      copy.strict = config2.strict;
    if (config2.wrap)
      copy.wrappers = copy.wrappers.concat(config2.wrap);
    if (config2.bufferLength != null)
      copy.bufferLength = config2.bufferLength;
    return copy;
  }
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(term) {
    return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(term) {
    let prec = this.dynamicPrecedences;
    return prec == null ? 0 : prec[term] || 0;
  }
  /**
  @internal
  */
  parseDialect(dialect2) {
    let values2 = Object.keys(this.dialects), flags = values2.map(() => false);
    if (dialect2)
      for (let part of dialect2.split(" ")) {
        let id2 = values2.indexOf(part);
        if (id2 >= 0)
          flags[id2] = true;
      }
    let disabled = null;
    for (let i = 0; i < values2.length; i++)
      if (!flags[i]) {
        for (let j = this.dialects[values2[i]], id2; (id2 = this.data[j++]) != 65535; )
          (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id2] = 1;
      }
    return new Dialect(dialect2, flags, disabled);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(spec) {
    return new _LRParser(spec);
  }
};
function pair(data2, off) {
  return data2[off] | data2[off + 1] << 16;
}
function findFinished(stacks) {
  let best = null;
  for (let stack of stacks) {
    let stopped = stack.p.stoppedAt;
    if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(
      stack.state,
      2
      /* StateFlag.Accepting */
    ) && (!best || best.score < stack.score))
      best = stack;
  }
  return best;
}
function getSpecializer(spec) {
  if (spec.external) {
    let mask = spec.extend ? 1 : 0;
    return (value, stack) => spec.external(value, stack) << 1 | mask;
  }
  return spec.get;
}

// ../../node_modules/.pnpm/@lezer+css@1.1.7/node_modules/@lezer/css/dist/index.js
var descendantOp = 99;
var Unit = 1;
var callee = 100;
var identifier = 101;
var VariableName = 2;
var space = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
];
var colon = 58;
var parenL = 40;
var underscore = 95;
var bracketL = 91;
var dash = 45;
var period = 46;
var hash = 35;
var percent = 37;
var ampersand = 38;
var backslash = 92;
var newline = 10;
function isAlpha(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 161;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var identifiers = new ExternalTokenizer((input, stack) => {
  for (let inside = false, dashes = 0, i = 0; ; i++) {
    let { next } = input;
    if (isAlpha(next) || next == dash || next == underscore || inside && isDigit(next)) {
      if (!inside && (next != dash || i > 0))
        inside = true;
      if (dashes === i && next == dash)
        dashes++;
      input.advance();
    } else if (next == backslash && input.peek(1) != newline) {
      input.advance();
      if (input.next > -1)
        input.advance();
      inside = true;
    } else {
      if (inside)
        input.acceptToken(next == parenL ? callee : dashes == 2 && stack.canShift(VariableName) ? VariableName : identifier);
      break;
    }
  }
});
var descendant = new ExternalTokenizer((input) => {
  if (space.includes(input.peek(-1))) {
    let { next } = input;
    if (isAlpha(next) || next == underscore || next == hash || next == period || next == bracketL || next == colon && isAlpha(input.peek(1)) || next == dash || next == ampersand)
      input.acceptToken(descendantOp);
  }
});
var unitToken = new ExternalTokenizer((input) => {
  if (!space.includes(input.peek(-1))) {
    let { next } = input;
    if (next == percent) {
      input.advance();
      input.acceptToken(Unit);
    }
    if (isAlpha(next)) {
      do {
        input.advance();
      } while (isAlpha(input.next));
      input.acceptToken(Unit);
    }
  }
});
var cssHighlighting = styleTags({
  "AtKeyword import charset namespace keyframes media supports": tags.definitionKeyword,
  "from to selector": tags.keyword,
  NamespaceName: tags.namespace,
  KeyframeName: tags.labelName,
  KeyframeRangeName: tags.operatorKeyword,
  TagName: tags.tagName,
  ClassName: tags.className,
  PseudoClassName: tags.constant(tags.className),
  IdName: tags.labelName,
  "FeatureName PropertyName": tags.propertyName,
  AttributeName: tags.attributeName,
  NumberLiteral: tags.number,
  KeywordQuery: tags.keyword,
  UnaryQueryOp: tags.operatorKeyword,
  "CallTag ValueName": tags.atom,
  VariableName: tags.variableName,
  Callee: tags.operatorKeyword,
  Unit: tags.unit,
  "UniversalSelector NestingSelector": tags.definitionOperator,
  MatchOp: tags.compareOperator,
  "ChildOp SiblingOp, LogicOp": tags.logicOperator,
  BinOp: tags.arithmeticOperator,
  Important: tags.modifier,
  Comment: tags.blockComment,
  ColorLiteral: tags.color,
  "ParenthesizedContent StringLiteral": tags.string,
  ":": tags.punctuation,
  "PseudoOp #": tags.derefOperator,
  "; ,": tags.separator,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace
});
var spec_callee = { __proto__: null, lang: 32, "nth-child": 32, "nth-last-child": 32, "nth-of-type": 32, "nth-last-of-type": 32, dir: 32, "host-context": 32, url: 60, "url-prefix": 60, domain: 60, regexp: 60, selector: 138 };
var spec_AtKeyword = { __proto__: null, "@import": 118, "@media": 142, "@charset": 146, "@namespace": 150, "@keyframes": 156, "@supports": 168 };
var spec_identifier = { __proto__: null, not: 132, only: 132 };
var parser = LRParser.deserialize({
  version: 14,
  states: ":^QYQ[OOO#_Q[OOP#fOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#kQ[O'#CfO$_QXO'#CaO$fQ[O'#ChO$qQ[O'#DTO$vQ[O'#DWOOQP'#Em'#EmO${QdO'#DgO%jQ[O'#DtO${QdO'#DvO%{Q[O'#DxO&WQ[O'#D{O&`Q[O'#ERO&nQ[O'#ETOOQS'#El'#ElOOQS'#EW'#EWQYQ[OOO&uQXO'#CdO'jQWO'#DcO'oQWO'#EsO'zQ[O'#EsQOQWOOP(UO#tO'#C_POOO)C@[)C@[OOQP'#Cg'#CgOOQP,59Q,59QO#kQ[O,59QO(aQ[O'#E[O({QWO,58{O)TQ[O,59SO$qQ[O,59oO$vQ[O,59rO(aQ[O,59uO(aQ[O,59wO(aQ[O,59xO)`Q[O'#DbOOQS,58{,58{OOQP'#Ck'#CkOOQO'#DR'#DROOQP,59S,59SO)gQWO,59SO)lQWO,59SOOQP'#DV'#DVOOQP,59o,59oOOQO'#DX'#DXO)qQ`O,59rOOQS'#Cp'#CpO${QdO'#CqO)yQvO'#CsO+ZQtO,5:ROOQO'#Cx'#CxO)lQWO'#CwO+oQWO'#CyO+tQ[O'#DOOOQS'#Ep'#EpOOQO'#Dj'#DjO+|Q[O'#DqO,[QWO'#EtO&`Q[O'#DoO,jQWO'#DrOOQO'#Eu'#EuO)OQWO,5:`O,oQpO,5:bOOQS'#Dz'#DzO,wQWO,5:dO,|Q[O,5:dOOQO'#D}'#D}O-UQWO,5:gO-ZQWO,5:mO-cQWO,5:oOOQS-E8U-E8UO${QdO,59}O-kQ[O'#E^O-xQWO,5;_O-xQWO,5;_POOO'#EV'#EVP.TO#tO,58yPOOO,58y,58yOOQP1G.l1G.lO.zQXO,5:vOOQO-E8Y-E8YOOQS1G.g1G.gOOQP1G.n1G.nO)gQWO1G.nO)lQWO1G.nOOQP1G/Z1G/ZO/XQ`O1G/^O/rQXO1G/aO0YQXO1G/cO0pQXO1G/dO1WQWO,59|O1]Q[O'#DSO1dQdO'#CoOOQP1G/^1G/^O${QdO1G/^O1kQpO,59]OOQS,59_,59_O${QdO,59aO1sQWO1G/mOOQS,59c,59cO1xQ!bO,59eOOQS'#DP'#DPOOQS'#EY'#EYO2QQ[O,59jOOQS,59j,59jO2YQWO'#DjO2eQWO,5:VO2jQWO,5:]O&`Q[O,5:XO&`Q[O'#E_O2rQWO,5;`O2}QWO,5:ZO(aQ[O,5:^OOQS1G/z1G/zOOQS1G/|1G/|OOQS1G0O1G0OO3`QWO1G0OO3eQdO'#EOOOQS1G0R1G0ROOQS1G0X1G0XOOQS1G0Z1G0ZO3pQtO1G/iOOQO,5:x,5:xO4WQ[O,5:xOOQO-E8[-E8[O4eQWO1G0yPOOO-E8T-E8TPOOO1G.e1G.eOOQP7+$Y7+$YOOQP7+$x7+$xO${QdO7+$xOOQS1G/h1G/hO4pQXO'#ErO4wQWO,59nO4|QtO'#EXO5tQdO'#EoO6OQWO,59ZO6TQpO7+$xOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%X7+%XO6]QWO1G/POOQS-E8W-E8WOOQS1G/U1G/UO${QdO1G/qOOQO1G/w1G/wOOQO1G/s1G/sO6bQWO,5:yOOQO-E8]-E8]O6pQXO1G/xOOQS7+%j7+%jO6wQYO'#CsOOQO'#EQ'#EQO7SQ`O'#EPOOQO'#EP'#EPO7_QWO'#E`O7gQdO,5:jOOQS,5:j,5:jO7rQtO'#E]O${QdO'#E]O8sQdO7+%TOOQO7+%T7+%TOOQO1G0d1G0dO9WQpO<<HdO9`QWO,5;^OOQP1G/Y1G/YOOQS-E8V-E8VO${QdO'#EZO9hQWO,5;ZOOQT1G.u1G.uOOQP<<Hd<<HdOOQS7+$k7+$kO9pQdO7+%]OOQO7+%d7+%dOOQO,5:k,5:kO3hQdO'#EaO7_QWO,5:zOOQS,5:z,5:zOOQS-E8^-E8^OOQS1G0U1G0UO9wQtO,5:wOOQS-E8Z-E8ZOOQO<<Ho<<HoOOQPAN>OAN>OO:xQdO,5:uOOQO-E8X-E8XOOQO<<Hw<<HwOOQO,5:{,5:{OOQO-E8_-E8_OOQS1G0f1G0f",
  stateData: ";[~O#ZOS#[QQ~OUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XRO#bTO~OQfOUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XeO#bTO~O#U#gP~P!ZO#[jO~O#XlO~O]qO^qOqsOtoOxrO!OtO!RvO#VuO#bnO~O!TwO~P#pO`}O#WzO#XyO~O#X!OO~O#X!QO~OQ![Ob!TOf![Oh![On!YOq!ZO#W!WO#X!SO#e!UO~Ob!^O!d!`O!g!aO#X!]O!T#hP~Oh!fOn!YO#X!eO~Oh!hO#X!hO~Ob!^O!d!`O!g!aO#X!]O~O!Y#hP~P%jO]WX]!WX^WXqWXtWXxWX!OWX!RWX!TWX#VWX#bWX~O]!mO~O!Y!nO#U#gX!S#gX~O#U#gX!S#gX~P!ZO#]!qO#^!qO#_!sO~OUYOXYO]VO^VOqXOxWO#XRO#bTO~OtoO!TwO~O`!zO#WzO#XyO~O!S#gP~P!ZOb#RO~Ob#SO~Op#TO|#UO~OP#WObgXjgX!YgX!dgX!ggX#XgXagXQgXfgXhgXngXqgXtgX!XgX#UgX#WgX#egXpgX!SgX~Ob!^Oj#XO!d!`O!g!aO#X!]O!Y#hP~Ob#[O~Op#`O#X#]O~Ob!^O!d!`O!g!aO#X#aO~Ot#eO!b#dO!T#hX!Y#hX~Ob#hO~Oj#XO!Y#jO~O!Y#kO~Oh#lOn!YO~O!T#mO~O!TwO!b#dO~O!TwO!Y#pO~O!Y#QX#U#QX!S#QX~P!ZO!Y!nO#U#ga!S#ga~O#]!qO#^!qO#_#wO~O]qO^qOqsOxrO!OtO!RvO#VuO#bnO~Ot#Oa!T#Oaa#Oa~P.`Op#yO|#zO~O]qO^qOqsOxrO#bnO~Ot}i!O}i!R}i!T}i#V}ia}i~P/aOt!Pi!O!Pi!R!Pi!T!Pi#V!Pia!Pi~P/aOt!Qi!O!Qi!R!Qi!T!Qi#V!Qia!Qi~P/aO!S#{O~Oa#fP~P(aOa#cP~P${Oa$SOj#XO~O!Y$UO~Oh$VOo$VO~Op$XO#X#]O~O]!`Xa!^X!b!^X~O]$YO~Oa$ZO!b#dO~Ot#eO!T#ha!Y#ha~O!b#dOt!ca!T!ca!Y!caa!ca~O!Y$`O~O!S$gO#X$bO#e$aO~Oj#XOt$iO!X$kO!Y!Vi#U!Vi!S!Vi~P${O!Y#Qa#U#Qa!S#Qa~P!ZO!Y!nO#U#gi!S#gi~Oa#fX~P#pOa$oO~Oj#XOQ!{Xa!{Xb!{Xf!{Xh!{Xn!{Xq!{Xt!{X#W!{X#X!{X#e!{X~Ot$qOa#cX~P${Oa$sO~Oj#XOp$tO~Oa$uO~O!b#dOt#Ra!T#Ra!Y#Ra~Oa$wO~P.`OP#WOtgX!TgX~O#e$aOt!sX!T!sX~Ot$yO!TwO~O!S$}O#X$bO#e$aO~Oj#XOQ#PXb#PXf#PXh#PXn#PXq#PXt#PX!X#PX!Y#PX#U#PX#W#PX#X#PX#e#PX!S#PX~Ot$iO!X%QO!Y!Vq#U!Vq!S!Vq~P${Oj#XOp%RO~OtoOa#fa~Ot$qOa#ca~Oa%UO~P${Oj#XOQ#Pab#Paf#Pah#Pan#Paq#Pat#Pa!X#Pa!Y#Pa#U#Pa#W#Pa#X#Pa#e#Pa!S#Pa~Oa!}at!}a~P${O#Zo#[#ej!R#e~",
  goto: "-g#jPPP#kP#nP#w$WP#w$g#wPP$mPPP$s$|$|P%`P$|P$|%z&^PPPP$|&vP&z'Q#wP'W#w'^P#wP#w#wPPP'd'y(WPP#nPP(_(_(i(_P(_P(_(_P#nP#nP#nP(l#nP(o(r(u(|#nP#nP)R)X)h)v)|*S*^*d*n*t*zPPPPPPPPPP+Q+ZP+v+yP,o,r,x-RRkQ_bOPdhw!n#skYOPdhotuvw!n#R#h#skSOPdhotuvw!n#R#h#sQmTR!tnQ{VR!xqQ!x}Q#Z!XR#x!zq![Z]!T!m#S#U#X#q#z$P$Y$i$j$q$v%Sp![Z]!T!m#S#U#X#q#z$P$Y$i$j$q$v%SU$d#m$f$yR$x$cq!XZ]!T!m#S#U#X#q#z$P$Y$i$j$q$v%Sp![Z]!T!m#S#U#X#q#z$P$Y$i$j$q$v%SQ!f^R#l!gT#^!Z#_Q|VR!yqQ!x|R#x!yQ!PWR!{rQ!RXR!|sQxUQ!wpQ#i!cQ#o!jQ#p!kQ${$eR%X$zSgPwQ!phQ#r!nR$l#sZfPhw!n#sa!b[`a!V!^!`#d#eR#b!^R!g^R!i_R#n!iS$e#m$fR%V$yV$c#m$f$yQ!rjR#v!rQdOShPwU!ldh#sR#s!nQ$P#SU$p$P$v%SQ$v$YR%S$qQ#_!ZR$W#_Q$r$PR%T$rQpUS!vp$nR$n#|Q$j#qR%P$jQ!ogS#t!o#uR#u!pQ#f!_R$^#fQ$f#mR$|$fQ$z$eR%W$z_cOPdhw!n#s^UOPdhw!n#sQ!uoQ!}tQ#OuQ#PvQ#|#RR$_#hR$Q#SQ!VZQ!d]Q#V!TQ#q!m[$O#S$P$Y$q$v%SQ$R#UQ$T#XS$h#q$jQ$m#zR%O$iR#}#RQiPR#QwQ!c[Q!kaR#Y!VU!_[a!VQ!j`Q#c!^Q#g!`Q$[#dR$]#e",
  nodeNames: "\u26A0 Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent ] [ LineNames LineName , PseudoClassName ArgList IdSelector # IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles",
  maxTerm: 117,
  nodeProps: [
    ["isolate", -2, 3, 24, ""],
    ["openedBy", 17, "(", 32, "[", 50, "{"],
    ["closedBy", 18, ")", 33, "]", 51, "}"]
  ],
  propSources: [cssHighlighting],
  skippedNodes: [0, 3, 87],
  repeatNodeCount: 11,
  tokenData: "J^~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_$}!_!`Cj!`!aC{!a!b$}!b!cDw!c!}$}!}#OFa#O#P$}#P#QFr#Q#R6d#R#T$}#T#UGT#U#c$}#c#dHf#d#o$}#o#pH{#p#q6d#q#rI^#r#sIo#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`JW<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSo`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#Z~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#Z~o`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUo`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Uo`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUo`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Uo`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUo`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Uo`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUo`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Uo`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!X[o`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYxQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYo`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYo`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYf[o`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYf[o`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYo`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYf[o`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYo`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSf[o`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QS|So`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSb^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOa~n9{UUQjWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWjW!RQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUo`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYo`#e[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYo`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUo`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUo`#e[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[o`#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSt^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWjWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VU#bQOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSo`#[~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^bBbU]QOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S^Qo`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!Y^Oy%^z;'S%^;'S;=`%o<%lO%^dCoS|SOy%^z;'S%^;'S;=`%o<%lO%^bDQU!OQOy%^z!`%^!`!aDd!a;'S%^;'S;=`%o<%lO%^bDkS!OQo`Oy%^z;'S%^;'S;=`%o<%lO%^bDzWOy%^z!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bEk[![Qo`Oy%^z}%^}!OEd!O!Q%^!Q![Ed![!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^nFfSq^Oy%^z;'S%^;'S;=`%o<%lO%^nFwSp^Oy%^z;'S%^;'S;=`%o<%lO%^bGWUOy%^z#b%^#b#cGj#c;'S%^;'S;=`%o<%lO%^bGoUo`Oy%^z#W%^#W#XHR#X;'S%^;'S;=`%o<%lO%^bHYS!bQo`Oy%^z;'S%^;'S;=`%o<%lO%^bHiUOy%^z#f%^#f#gHR#g;'S%^;'S;=`%o<%lO%^fIQS!TUOy%^z;'S%^;'S;=`%o<%lO%^nIcS!S^Oy%^z;'S%^;'S;=`%o<%lO%^fItU!RQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`JZP;=`<%l$}",
  tokenizers: [descendant, unitToken, identifiers, 1, 2, 3, 4, new LocalTokenGroup("m~RRYZ[z{a~~g~aO#^~~dP!P!Qg~lO#_~~", 28, 105)],
  topRules: { "StyleSheet": [0, 4], "Styles": [1, 86] },
  specialized: [{ term: 100, get: (value) => spec_callee[value] || -1 }, { term: 58, get: (value) => spec_AtKeyword[value] || -1 }, { term: 101, get: (value) => spec_identifier[value] || -1 }],
  tokenPrec: 1200
});

// ../../node_modules/.pnpm/@codemirror+lang-css@6.2.1_@codemirror+view@6.23.1/node_modules/@codemirror/lang-css/dist/index.js
var _properties = null;
function properties() {
  if (!_properties && typeof document == "object" && document.body) {
    let { style } = document.body, names = [], seen = /* @__PURE__ */ new Set();
    for (let prop in style)
      if (prop != "cssText" && prop != "cssFloat") {
        if (typeof style[prop] == "string") {
          if (/[A-Z]/.test(prop))
            prop = prop.replace(/[A-Z]/g, (ch) => "-" + ch.toLowerCase());
          if (!seen.has(prop)) {
            names.push(prop);
            seen.add(prop);
          }
        }
      }
    _properties = names.sort().map((name) => ({ type: "property", label: name }));
  }
  return _properties || [];
}
var pseudoClasses = /* @__PURE__ */ [
  "active",
  "after",
  "any-link",
  "autofill",
  "backdrop",
  "before",
  "checked",
  "cue",
  "default",
  "defined",
  "disabled",
  "empty",
  "enabled",
  "file-selector-button",
  "first",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "fullscreen",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "marker",
  "modal",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "part",
  "placeholder",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "selection",
  "slotted",
  "target",
  "target-text",
  "valid",
  "visited",
  "where"
].map((name) => ({ type: "class", label: name }));
var values = /* @__PURE__ */ [
  "above",
  "absolute",
  "activeborder",
  "additive",
  "activecaption",
  "after-white-space",
  "ahead",
  "alias",
  "all",
  "all-scroll",
  "alphabetic",
  "alternate",
  "always",
  "antialiased",
  "appworkspace",
  "asterisks",
  "attr",
  "auto",
  "auto-flow",
  "avoid",
  "avoid-column",
  "avoid-page",
  "avoid-region",
  "axis-pan",
  "background",
  "backwards",
  "baseline",
  "below",
  "bidi-override",
  "blink",
  "block",
  "block-axis",
  "bold",
  "bolder",
  "border",
  "border-box",
  "both",
  "bottom",
  "break",
  "break-all",
  "break-word",
  "bullets",
  "button",
  "button-bevel",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "calc",
  "capitalize",
  "caps-lock-indicator",
  "caption",
  "captiontext",
  "caret",
  "cell",
  "center",
  "checkbox",
  "circle",
  "cjk-decimal",
  "clear",
  "clip",
  "close-quote",
  "col-resize",
  "collapse",
  "color",
  "color-burn",
  "color-dodge",
  "column",
  "column-reverse",
  "compact",
  "condensed",
  "contain",
  "content",
  "contents",
  "content-box",
  "context-menu",
  "continuous",
  "copy",
  "counter",
  "counters",
  "cover",
  "crop",
  "cross",
  "crosshair",
  "currentcolor",
  "cursive",
  "cyclic",
  "darken",
  "dashed",
  "decimal",
  "decimal-leading-zero",
  "default",
  "default-button",
  "dense",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "disc",
  "discard",
  "disclosure-closed",
  "disclosure-open",
  "document",
  "dot-dash",
  "dot-dot-dash",
  "dotted",
  "double",
  "down",
  "e-resize",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "element",
  "ellipse",
  "ellipsis",
  "embed",
  "end",
  "ethiopic-abegede-gez",
  "ethiopic-halehame-aa-er",
  "ethiopic-halehame-gez",
  "ew-resize",
  "exclusion",
  "expanded",
  "extends",
  "extra-condensed",
  "extra-expanded",
  "fantasy",
  "fast",
  "fill",
  "fill-box",
  "fixed",
  "flat",
  "flex",
  "flex-end",
  "flex-start",
  "footnotes",
  "forwards",
  "from",
  "geometricPrecision",
  "graytext",
  "grid",
  "groove",
  "hand",
  "hard-light",
  "help",
  "hidden",
  "hide",
  "higher",
  "highlight",
  "highlighttext",
  "horizontal",
  "hsl",
  "hsla",
  "hue",
  "icon",
  "ignore",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infinite",
  "infobackground",
  "infotext",
  "inherit",
  "initial",
  "inline",
  "inline-axis",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "inset",
  "inside",
  "intrinsic",
  "invert",
  "italic",
  "justify",
  "keep-all",
  "landscape",
  "large",
  "larger",
  "left",
  "level",
  "lighter",
  "lighten",
  "line-through",
  "linear",
  "linear-gradient",
  "lines",
  "list-item",
  "listbox",
  "listitem",
  "local",
  "logical",
  "loud",
  "lower",
  "lower-hexadecimal",
  "lower-latin",
  "lower-norwegian",
  "lowercase",
  "ltr",
  "luminosity",
  "manipulation",
  "match",
  "matrix",
  "matrix3d",
  "medium",
  "menu",
  "menutext",
  "message-box",
  "middle",
  "min-intrinsic",
  "mix",
  "monospace",
  "move",
  "multiple",
  "multiple_mask_images",
  "multiply",
  "n-resize",
  "narrower",
  "ne-resize",
  "nesw-resize",
  "no-close-quote",
  "no-drop",
  "no-open-quote",
  "no-repeat",
  "none",
  "normal",
  "not-allowed",
  "nowrap",
  "ns-resize",
  "numbers",
  "numeric",
  "nw-resize",
  "nwse-resize",
  "oblique",
  "opacity",
  "open-quote",
  "optimizeLegibility",
  "optimizeSpeed",
  "outset",
  "outside",
  "outside-shape",
  "overlay",
  "overline",
  "padding",
  "padding-box",
  "painted",
  "page",
  "paused",
  "perspective",
  "pinch-zoom",
  "plus-darker",
  "plus-lighter",
  "pointer",
  "polygon",
  "portrait",
  "pre",
  "pre-line",
  "pre-wrap",
  "preserve-3d",
  "progress",
  "push-button",
  "radial-gradient",
  "radio",
  "read-only",
  "read-write",
  "read-write-plaintext-only",
  "rectangle",
  "region",
  "relative",
  "repeat",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeat-x",
  "repeat-y",
  "reset",
  "reverse",
  "rgb",
  "rgba",
  "ridge",
  "right",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "round",
  "row",
  "row-resize",
  "row-reverse",
  "rtl",
  "run-in",
  "running",
  "s-resize",
  "sans-serif",
  "saturation",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "screen",
  "scroll",
  "scrollbar",
  "scroll-position",
  "se-resize",
  "self-start",
  "self-end",
  "semi-condensed",
  "semi-expanded",
  "separate",
  "serif",
  "show",
  "single",
  "skew",
  "skewX",
  "skewY",
  "skip-white-space",
  "slide",
  "slider-horizontal",
  "slider-vertical",
  "sliderthumb-horizontal",
  "sliderthumb-vertical",
  "slow",
  "small",
  "small-caps",
  "small-caption",
  "smaller",
  "soft-light",
  "solid",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "space",
  "space-around",
  "space-between",
  "space-evenly",
  "spell-out",
  "square",
  "start",
  "static",
  "status-bar",
  "stretch",
  "stroke",
  "stroke-box",
  "sub",
  "subpixel-antialiased",
  "svg_masks",
  "super",
  "sw-resize",
  "symbolic",
  "symbols",
  "system-ui",
  "table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row",
  "table-row-group",
  "text",
  "text-bottom",
  "text-top",
  "textarea",
  "textfield",
  "thick",
  "thin",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "to",
  "top",
  "transform",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transparent",
  "ultra-condensed",
  "ultra-expanded",
  "underline",
  "unidirectional-pan",
  "unset",
  "up",
  "upper-latin",
  "uppercase",
  "url",
  "var",
  "vertical",
  "vertical-text",
  "view-box",
  "visible",
  "visibleFill",
  "visiblePainted",
  "visibleStroke",
  "visual",
  "w-resize",
  "wait",
  "wave",
  "wider",
  "window",
  "windowframe",
  "windowtext",
  "words",
  "wrap",
  "wrap-reverse",
  "x-large",
  "x-small",
  "xor",
  "xx-large",
  "xx-small"
].map((name) => ({ type: "keyword", label: name })).concat(/* @__PURE__ */ [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
].map((name) => ({ type: "constant", label: name })));
var tags2 = /* @__PURE__ */ [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "meter",
  "nav",
  "ol",
  "output",
  "p",
  "pre",
  "ruby",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
].map((name) => ({ type: "type", label: name }));
var identifier2 = /^(\w[\w-]*|-\w[\w-]*|)$/;
var variable = /^-(-[\w-]*)?$/;
function isVarArg(node, doc) {
  var _a;
  if (node.name == "(" || node.type.isError)
    node = node.parent || node;
  if (node.name != "ArgList")
    return false;
  let callee2 = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.firstChild;
  if ((callee2 === null || callee2 === void 0 ? void 0 : callee2.name) != "Callee")
    return false;
  return doc.sliceString(callee2.from, callee2.to) == "var";
}
var VariablesByNode = /* @__PURE__ */ new NodeWeakMap();
var declSelector = ["Declaration"];
function astTop(node) {
  for (let cur2 = node; ; ) {
    if (cur2.type.isTop)
      return cur2;
    if (!(cur2 = cur2.parent))
      return node;
  }
}
function variableNames(doc, node, isVariable) {
  if (node.to - node.from > 4096) {
    let known = VariablesByNode.get(node);
    if (known)
      return known;
    let result = [], seen = /* @__PURE__ */ new Set(), cursor = node.cursor(IterMode.IncludeAnonymous);
    if (cursor.firstChild())
      do {
        for (let option of variableNames(doc, cursor.node, isVariable))
          if (!seen.has(option.label)) {
            seen.add(option.label);
            result.push(option);
          }
      } while (cursor.nextSibling());
    VariablesByNode.set(node, result);
    return result;
  } else {
    let result = [], seen = /* @__PURE__ */ new Set();
    node.cursor().iterate((node2) => {
      var _a;
      if (isVariable(node2) && node2.matchContext(declSelector) && ((_a = node2.node.nextSibling) === null || _a === void 0 ? void 0 : _a.name) == ":") {
        let name = doc.sliceString(node2.from, node2.to);
        if (!seen.has(name)) {
          seen.add(name);
          result.push({ label: name, type: "variable" });
        }
      }
    });
    return result;
  }
}
var defineCSSCompletionSource = (isVariable) => (context) => {
  let { state, pos } = context, node = syntaxTree(state).resolveInner(pos, -1);
  let isDash = node.type.isError && node.from == node.to - 1 && state.doc.sliceString(node.from, node.to) == "-";
  if (node.name == "PropertyName" || (isDash || node.name == "TagName") && /^(Block|Styles)$/.test(node.resolve(node.to).name))
    return { from: node.from, options: properties(), validFor: identifier2 };
  if (node.name == "ValueName")
    return { from: node.from, options: values, validFor: identifier2 };
  if (node.name == "PseudoClassName")
    return { from: node.from, options: pseudoClasses, validFor: identifier2 };
  if (isVariable(node) || (context.explicit || isDash) && isVarArg(node, state.doc))
    return {
      from: isVariable(node) || isDash ? node.from : pos,
      options: variableNames(state.doc, astTop(node), isVariable),
      validFor: variable
    };
  if (node.name == "TagName") {
    for (let { parent } = node; parent; parent = parent.parent)
      if (parent.name == "Block")
        return { from: node.from, options: properties(), validFor: identifier2 };
    return { from: node.from, options: tags2, validFor: identifier2 };
  }
  if (!context.explicit)
    return null;
  let above = node.resolve(pos), before = above.childBefore(pos);
  if (before && before.name == ":" && above.name == "PseudoClassSelector")
    return { from: pos, options: pseudoClasses, validFor: identifier2 };
  if (before && before.name == ":" && above.name == "Declaration" || above.name == "ArgList")
    return { from: pos, options: values, validFor: identifier2 };
  if (above.name == "Block" || above.name == "Styles")
    return { from: pos, options: properties(), validFor: identifier2 };
  return null;
};
var cssCompletionSource = /* @__PURE__ */ defineCSSCompletionSource((n) => n.name == "VariableName");
var cssLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "css",
  parser: /* @__PURE__ */ parser.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Declaration: /* @__PURE__ */ continuedIndent()
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "Block KeyframeList": foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
});
function css() {
  return new LanguageSupport(cssLanguage, cssLanguage.data.of({ autocomplete: cssCompletionSource }));
}

// ../../node_modules/.pnpm/@lezer+html@1.3.8/node_modules/@lezer/html/dist/index.js
var scriptText = 54;
var StartCloseScriptTag = 1;
var styleText = 55;
var StartCloseStyleTag = 2;
var textareaText = 56;
var StartCloseTextareaTag = 3;
var EndTag = 4;
var SelfClosingEndTag = 5;
var StartTag = 6;
var StartScriptTag = 7;
var StartStyleTag = 8;
var StartTextareaTag = 9;
var StartSelfClosingTag = 10;
var StartCloseTag = 11;
var NoMatchStartCloseTag = 12;
var MismatchedStartCloseTag = 13;
var missingCloseTag = 57;
var IncompleteCloseTag = 14;
var commentContent$1 = 58;
var Element = 20;
var TagName = 22;
var Attribute = 23;
var AttributeName = 24;
var AttributeValue = 26;
var UnquotedAttributeValue = 27;
var ScriptText = 28;
var StyleText = 31;
var TextareaText = 34;
var OpenTag = 36;
var CloseTag = 37;
var Dialect_noMatch = 0;
var Dialect_selfClosing = 1;
var selfClosers = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  menuitem: true
};
var implicitlyClosed = {
  dd: true,
  li: true,
  optgroup: true,
  option: true,
  p: true,
  rp: true,
  rt: true,
  tbody: true,
  td: true,
  tfoot: true,
  th: true,
  tr: true
};
var closeOnOpen = {
  dd: { dd: true, dt: true },
  dt: { dd: true, dt: true },
  li: { li: true },
  option: { option: true, optgroup: true },
  optgroup: { optgroup: true },
  p: {
    address: true,
    article: true,
    aside: true,
    blockquote: true,
    dir: true,
    div: true,
    dl: true,
    fieldset: true,
    footer: true,
    form: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    header: true,
    hgroup: true,
    hr: true,
    menu: true,
    nav: true,
    ol: true,
    p: true,
    pre: true,
    section: true,
    table: true,
    ul: true
  },
  rp: { rp: true, rt: true },
  rt: { rp: true, rt: true },
  tbody: { tbody: true, tfoot: true },
  td: { td: true, th: true },
  tfoot: { tbody: true },
  th: { td: true, th: true },
  thead: { tbody: true, tfoot: true },
  tr: { tr: true }
};
function nameChar(ch) {
  return ch == 45 || ch == 46 || ch == 58 || ch >= 65 && ch <= 90 || ch == 95 || ch >= 97 && ch <= 122 || ch >= 161;
}
function isSpace(ch) {
  return ch == 9 || ch == 10 || ch == 13 || ch == 32;
}
var cachedName = null;
var cachedInput = null;
var cachedPos = 0;
function tagNameAfter(input, offset) {
  let pos = input.pos + offset;
  if (cachedPos == pos && cachedInput == input)
    return cachedName;
  let next = input.peek(offset);
  while (isSpace(next))
    next = input.peek(++offset);
  let name = "";
  for (; ; ) {
    if (!nameChar(next))
      break;
    name += String.fromCharCode(next);
    next = input.peek(++offset);
  }
  cachedInput = input;
  cachedPos = pos;
  return cachedName = name ? name.toLowerCase() : next == question || next == bang ? void 0 : null;
}
var lessThan = 60;
var greaterThan = 62;
var slash = 47;
var question = 63;
var bang = 33;
var dash2 = 45;
function ElementContext(name, parent) {
  this.name = name;
  this.parent = parent;
  this.hash = parent ? parent.hash : 0;
  for (let i = 0; i < name.length; i++)
    this.hash += (this.hash << 4) + name.charCodeAt(i) + (name.charCodeAt(i) << 8);
}
var startTagTerms = [StartTag, StartSelfClosingTag, StartScriptTag, StartStyleTag, StartTextareaTag];
var elementContext = new ContextTracker({
  start: null,
  shift(context, term, stack, input) {
    return startTagTerms.indexOf(term) > -1 ? new ElementContext(tagNameAfter(input, 1) || "", context) : context;
  },
  reduce(context, term) {
    return term == Element && context ? context.parent : context;
  },
  reuse(context, node, stack, input) {
    let type = node.type.id;
    return type == StartTag || type == OpenTag ? new ElementContext(tagNameAfter(input, 1) || "", context) : context;
  },
  hash(context) {
    return context ? context.hash : 0;
  },
  strict: false
});
var tagStart = new ExternalTokenizer((input, stack) => {
  if (input.next != lessThan) {
    if (input.next < 0 && stack.context)
      input.acceptToken(missingCloseTag);
    return;
  }
  input.advance();
  let close = input.next == slash;
  if (close)
    input.advance();
  let name = tagNameAfter(input, 0);
  if (name === void 0)
    return;
  if (!name)
    return input.acceptToken(close ? IncompleteCloseTag : StartTag);
  let parent = stack.context ? stack.context.name : null;
  if (close) {
    if (name == parent)
      return input.acceptToken(StartCloseTag);
    if (parent && implicitlyClosed[parent])
      return input.acceptToken(missingCloseTag, -2);
    if (stack.dialectEnabled(Dialect_noMatch))
      return input.acceptToken(NoMatchStartCloseTag);
    for (let cx = stack.context; cx; cx = cx.parent)
      if (cx.name == name)
        return;
    input.acceptToken(MismatchedStartCloseTag);
  } else {
    if (name == "script")
      return input.acceptToken(StartScriptTag);
    if (name == "style")
      return input.acceptToken(StartStyleTag);
    if (name == "textarea")
      return input.acceptToken(StartTextareaTag);
    if (selfClosers.hasOwnProperty(name))
      return input.acceptToken(StartSelfClosingTag);
    if (parent && closeOnOpen[parent] && closeOnOpen[parent][name])
      input.acceptToken(missingCloseTag, -1);
    else
      input.acceptToken(StartTag);
  }
}, { contextual: true });
var commentContent = new ExternalTokenizer((input) => {
  for (let dashes = 0, i = 0; ; i++) {
    if (input.next < 0) {
      if (i)
        input.acceptToken(commentContent$1);
      break;
    }
    if (input.next == dash2) {
      dashes++;
    } else if (input.next == greaterThan && dashes >= 2) {
      if (i >= 3)
        input.acceptToken(commentContent$1, -2);
      break;
    } else {
      dashes = 0;
    }
    input.advance();
  }
});
function inForeignElement(context) {
  for (; context; context = context.parent)
    if (context.name == "svg" || context.name == "math")
      return true;
  return false;
}
var endTag = new ExternalTokenizer((input, stack) => {
  if (input.next == slash && input.peek(1) == greaterThan) {
    let selfClosing = stack.dialectEnabled(Dialect_selfClosing) || inForeignElement(stack.context);
    input.acceptToken(selfClosing ? SelfClosingEndTag : EndTag, 2);
  } else if (input.next == greaterThan) {
    input.acceptToken(EndTag, 1);
  }
});
function contentTokenizer(tag, textToken, endToken) {
  let lastState = 2 + tag.length;
  return new ExternalTokenizer((input) => {
    for (let state = 0, matchedLen = 0, i = 0; ; i++) {
      if (input.next < 0) {
        if (i)
          input.acceptToken(textToken);
        break;
      }
      if (state == 0 && input.next == lessThan || state == 1 && input.next == slash || state >= 2 && state < lastState && input.next == tag.charCodeAt(state - 2)) {
        state++;
        matchedLen++;
      } else if ((state == 2 || state == lastState) && isSpace(input.next)) {
        matchedLen++;
      } else if (state == lastState && input.next == greaterThan) {
        if (i > matchedLen)
          input.acceptToken(textToken, -matchedLen);
        else
          input.acceptToken(endToken, -(matchedLen - 2));
        break;
      } else if ((input.next == 10 || input.next == 13) && i) {
        input.acceptToken(textToken, 1);
        break;
      } else {
        state = matchedLen = 0;
      }
      input.advance();
    }
  });
}
var scriptTokens = contentTokenizer("script", scriptText, StartCloseScriptTag);
var styleTokens = contentTokenizer("style", styleText, StartCloseStyleTag);
var textareaTokens = contentTokenizer("textarea", textareaText, StartCloseTextareaTag);
var htmlHighlighting = styleTags({
  "Text RawText": tags.content,
  "StartTag StartCloseTag SelfClosingEndTag EndTag": tags.angleBracket,
  TagName: tags.tagName,
  "MismatchedCloseTag/TagName": [tags.tagName, tags.invalid],
  AttributeName: tags.attributeName,
  "AttributeValue UnquotedAttributeValue": tags.attributeValue,
  Is: tags.definitionOperator,
  "EntityReference CharacterReference": tags.character,
  Comment: tags.blockComment,
  ProcessingInst: tags.processingInstruction,
  DoctypeDecl: tags.documentMeta
});
var parser2 = LRParser.deserialize({
  version: 14,
  states: ",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%WQ&rO,59fO%`Q&rO,59iO%hQ&rO,59lO%sQ&rO,59nOOOa'#D^'#D^O%{OaO'#CxO&WOaO,59[OOOb'#D_'#D_O&`ObO'#C{O&kObO,59[OOOd'#D`'#D`O&sOdO'#DOO'OOdO,59[OOO`'#Da'#DaO'WO!rO,59[O'_Q#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'dO$fO,59oOOO`,59o,59oO'lQ#|O,59qO'qQ#|O,59rOOO`-E7W-E7WO'vQ&rO'#CsOOQW'#DZ'#DZO(UQ&rO1G.wOOOa1G.w1G.wO(^Q&rO1G/QOOOb1G/Q1G/QO(fQ&rO1G/TOOOd1G/T1G/TO(nQ&rO1G/WOOO`1G/W1G/WOOO`1G/Y1G/YO(yQ&rO1G/YOOOa-E7[-E7[O)RQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)WQ#tO'#C|OOOd-E7^-E7^O)]Q#tO'#DPOOO`-E7_-E7_O)bQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O)gQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rOOO`7+$t7+$tO)rQ#|O,59eO)wQ#|O,59hO)|Q#|O,59kOOO`1G/X1G/XO*RO7[O'#CvO*dOMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O*uO7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+WOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",
  stateData: "+s~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OhyO~OS!OOhyO~OS!QOhyO~OS!SOT!TOhyO~OS!TOhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXhgXTgX~OS!fOhyO~OS!gOhyO~OS!hOhyO~OS!iOT!jOhyO~OS!jOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",
  goto: "%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{}!P!R!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!UeZ!e{}!P!R!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "\u26A0 StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 67,
  context: elementContext,
  nodeProps: [
    ["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 21, 30, 33, 36, "CloseTag"],
    ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 29, 32, 35, 37, "OpenTag"],
    ["group", -9, 14, 17, 18, 19, 20, 39, 40, 41, 42, "Entity", 16, "Entity TextContent", -3, 28, 31, 34, "TextContent Entity"],
    ["isolate", -11, 21, 29, 30, 32, 33, 35, 36, 37, 38, 41, 42, "ltr", -3, 26, 27, 39, ""]
  ],
  propSources: [htmlHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
  tokenizers: [scriptTokens, styleTokens, textareaTokens, endTag, tagStart, commentContent, 0, 1, 2, 3, 4, 5],
  topRules: { "Document": [0, 15] },
  dialects: { noMatch: 0, selfClosing: 485 },
  tokenPrec: 487
});
function getAttrs(openTag, input) {
  let attrs = /* @__PURE__ */ Object.create(null);
  for (let att of openTag.getChildren(Attribute)) {
    let name = att.getChild(AttributeName), value = att.getChild(AttributeValue) || att.getChild(UnquotedAttributeValue);
    if (name)
      attrs[input.read(name.from, name.to)] = !value ? "" : value.type.id == AttributeValue ? input.read(value.from + 1, value.to - 1) : input.read(value.from, value.to);
  }
  return attrs;
}
function findTagName(openTag, input) {
  let tagNameNode = openTag.getChild(TagName);
  return tagNameNode ? input.read(tagNameNode.from, tagNameNode.to) : " ";
}
function maybeNest(node, input, tags3) {
  let attrs;
  for (let tag of tags3) {
    if (!tag.attrs || tag.attrs(attrs || (attrs = getAttrs(node.node.parent.firstChild, input))))
      return { parser: tag.parser };
  }
  return null;
}
function configureNesting(tags3 = [], attributes = []) {
  let script = [], style = [], textarea = [], other = [];
  for (let tag of tags3) {
    let array = tag.tag == "script" ? script : tag.tag == "style" ? style : tag.tag == "textarea" ? textarea : other;
    array.push(tag);
  }
  let attrs = attributes.length ? /* @__PURE__ */ Object.create(null) : null;
  for (let attr of attributes)
    (attrs[attr.name] || (attrs[attr.name] = [])).push(attr);
  return parseMixed((node, input) => {
    let id2 = node.type.id;
    if (id2 == ScriptText)
      return maybeNest(node, input, script);
    if (id2 == StyleText)
      return maybeNest(node, input, style);
    if (id2 == TextareaText)
      return maybeNest(node, input, textarea);
    if (id2 == Element && other.length) {
      let n = node.node, open = n.firstChild, tagName = open && findTagName(open, input), attrs2;
      if (tagName)
        for (let tag of other) {
          if (tag.tag == tagName && (!tag.attrs || tag.attrs(attrs2 || (attrs2 = getAttrs(n, input))))) {
            let close = n.lastChild;
            let to = close.type.id == CloseTag ? close.from : n.to;
            if (to > open.to)
              return { parser: tag.parser, overlay: [{ from: open.to, to }] };
          }
        }
    }
    if (attrs && id2 == Attribute) {
      let n = node.node, nameNode;
      if (nameNode = n.firstChild) {
        let matches = attrs[input.read(nameNode.from, nameNode.to)];
        if (matches)
          for (let attr of matches) {
            if (attr.tagName && attr.tagName != findTagName(n.parent, input))
              continue;
            let value = n.lastChild;
            if (value.type.id == AttributeValue) {
              let from = value.from + 1;
              let last = value.lastChild, to = value.to - (last && last.isError ? 0 : 1);
              if (to > from)
                return { parser: attr.parser, overlay: [{ from, to }] };
            } else if (value.type.id == UnquotedAttributeValue) {
              return { parser: attr.parser, overlay: [{ from: value.from, to: value.to }] };
            }
          }
      }
    }
    return null;
  });
}

// ../../node_modules/.pnpm/@lezer+javascript@1.4.13/node_modules/@lezer/javascript/dist/index.js
var noSemi = 309;
var incdec = 1;
var incdecPrefix = 2;
var JSXStartTag = 3;
var insertSemi = 310;
var spaces = 312;
var newline2 = 313;
var LineComment = 4;
var BlockComment = 5;
var Dialect_jsx = 0;
var space2 = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
];
var braceR = 125;
var semicolon = 59;
var slash2 = 47;
var star = 42;
var plus = 43;
var minus = 45;
var lt = 60;
var comma = 44;
var trackNewline = new ContextTracker({
  start: false,
  shift(context, term) {
    return term == LineComment || term == BlockComment || term == spaces ? context : term == newline2;
  },
  strict: false
});
var insertSemicolon = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  if (next == braceR || next == -1 || stack.context)
    input.acceptToken(insertSemi);
}, { contextual: true, fallback: true });
var noSemicolon = new ExternalTokenizer((input, stack) => {
  let { next } = input, after;
  if (space2.indexOf(next) > -1)
    return;
  if (next == slash2 && ((after = input.peek(1)) == slash2 || after == star))
    return;
  if (next != braceR && next != semicolon && next != -1 && !stack.context)
    input.acceptToken(noSemi);
}, { contextual: true });
var incdecToken = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  if (next == plus || next == minus) {
    input.advance();
    if (next == input.next) {
      input.advance();
      let mayPostfix = !stack.context && stack.canShift(incdec);
      input.acceptToken(mayPostfix ? incdec : incdecPrefix);
    }
  }
}, { contextual: true });
function identifierChar(ch, start) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch == 95 || ch >= 192 || !start && ch >= 48 && ch <= 57;
}
var jsx = new ExternalTokenizer((input, stack) => {
  if (input.next != lt || !stack.dialectEnabled(Dialect_jsx))
    return;
  input.advance();
  if (input.next == slash2)
    return;
  let back = 0;
  while (space2.indexOf(input.next) > -1) {
    input.advance();
    back++;
  }
  if (identifierChar(input.next, true)) {
    input.advance();
    back++;
    while (identifierChar(input.next, false)) {
      input.advance();
      back++;
    }
    while (space2.indexOf(input.next) > -1) {
      input.advance();
      back++;
    }
    if (input.next == comma)
      return;
    for (let i = 0; ; i++) {
      if (i == 7) {
        if (!identifierChar(input.next, true))
          return;
        break;
      }
      if (input.next != "extends".charCodeAt(i))
        break;
      input.advance();
      back++;
    }
  }
  input.acceptToken(JSXStartTag, -back);
});
var jsHighlight = styleTags({
  "get set async static": tags.modifier,
  "for while do if else switch try catch finally return throw break continue default case": tags.controlKeyword,
  "in of await yield void typeof delete instanceof": tags.operatorKeyword,
  "let var const using function class extends": tags.definitionKeyword,
  "import export from": tags.moduleKeyword,
  "with debugger as new": tags.keyword,
  TemplateString: tags.special(tags.string),
  super: tags.atom,
  BooleanLiteral: tags.bool,
  this: tags.self,
  null: tags.null,
  Star: tags.modifier,
  VariableName: tags.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": tags.function(tags.variableName),
  VariableDefinition: tags.definition(tags.variableName),
  Label: tags.labelName,
  PropertyName: tags.propertyName,
  PrivatePropertyName: tags.special(tags.propertyName),
  "CallExpression/MemberExpression/PropertyName": tags.function(tags.propertyName),
  "FunctionDeclaration/VariableDefinition": tags.function(tags.definition(tags.variableName)),
  "ClassDeclaration/VariableDefinition": tags.definition(tags.className),
  PropertyDefinition: tags.definition(tags.propertyName),
  PrivatePropertyDefinition: tags.definition(tags.special(tags.propertyName)),
  UpdateOp: tags.updateOperator,
  "LineComment Hashbang": tags.lineComment,
  BlockComment: tags.blockComment,
  Number: tags.number,
  String: tags.string,
  Escape: tags.escape,
  ArithOp: tags.arithmeticOperator,
  LogicOp: tags.logicOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  RegExp: tags.regexp,
  Equals: tags.definitionOperator,
  Arrow: tags.function(tags.punctuation),
  ": Spread": tags.punctuation,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace,
  "InterpolationStart InterpolationEnd": tags.special(tags.brace),
  ".": tags.derefOperator,
  ", ;": tags.separator,
  "@": tags.meta,
  TypeName: tags.typeName,
  TypeDefinition: tags.definition(tags.typeName),
  "type enum interface implements namespace module declare": tags.definitionKeyword,
  "abstract global Privacy readonly override": tags.modifier,
  "is keyof unique infer": tags.operatorKeyword,
  JSXAttributeValue: tags.attributeValue,
  JSXText: tags.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": tags.angleBracket,
  "JSXIdentifier JSXNameSpacedName": tags.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": tags.attributeName,
  "JSXBuiltin/JSXIdentifier": tags.standard(tags.tagName)
});
var spec_identifier2 = { __proto__: null, export: 18, as: 23, from: 31, default: 34, async: 39, function: 40, extends: 52, this: 56, true: 64, false: 64, null: 76, void: 80, typeof: 84, super: 102, new: 136, delete: 152, yield: 161, await: 165, class: 170, public: 227, private: 227, protected: 227, readonly: 229, instanceof: 248, satisfies: 251, in: 252, const: 254, import: 286, keyof: 339, unique: 343, infer: 349, is: 385, abstract: 405, implements: 407, type: 409, let: 412, var: 414, using: 417, interface: 423, enum: 427, namespace: 433, module: 435, declare: 439, global: 443, for: 462, of: 471, while: 474, with: 478, do: 482, if: 486, else: 488, switch: 492, case: 498, try: 504, catch: 508, finally: 512, return: 516, throw: 520, break: 524, continue: 528, debugger: 532 };
var spec_word = { __proto__: null, async: 123, get: 125, set: 127, declare: 187, public: 189, private: 189, protected: 189, static: 191, abstract: 193, override: 195, readonly: 201, accessor: 203, new: 389 };
var spec_LessThan = { __proto__: null, "<": 143 };
var parser3 = LRParser.deserialize({
  version: 14,
  states: "$<UO%TQ^OOO%[Q^OOO'_Q`OOP(lOWOOO*zQ08SO'#ChO+RO!bO'#CiO+aO#tO'#CiO+oO?MpO'#D^O.QQ^O'#DdO.bQ^O'#DoO%[Q^O'#DyO0fQ^O'#EROOQ07b'#EZ'#EZO1PQWO'#EWOOQO'#El'#ElOOQO'#Ie'#IeO1XQWO'#GmO1dQWO'#EkO1iQWO'#EkO3kQ08SO'#JiO6[Q08SO'#JjO6xQWO'#FZO6}Q&jO'#FqOOQ07b'#Fc'#FcO7YO,YO'#FcO7hQ7[O'#FxO9UQWO'#FwOOQ07b'#Jj'#JjOOQ07`'#Ji'#JiO9ZQWO'#GqOOQU'#KU'#KUO9fQWO'#IRO9kQ07hO'#ISOOQU'#JW'#JWOOQU'#IW'#IWQ`Q^OOO`Q^OOO%[Q^O'#DqO9sQ^O'#D}O9zQ^O'#EPO9aQWO'#GmO:RQ7[O'#CnO:aQWO'#EjO:lQWO'#EuO:qQ7[O'#FbO;`QWO'#GmOOQO'#KV'#KVO;eQWO'#KVO;sQWO'#GuO;sQWO'#GvO;sQWO'#GxO9aQWO'#G{O<jQWO'#HOO>RQWO'#CdO>cQWO'#H[O>kQWO'#HbO>kQWO'#HdO`Q^O'#HfO>kQWO'#HhO>kQWO'#HkO>pQWO'#HqO>uQ07iO'#HwO%[Q^O'#HyO?QQ07iO'#H{O?]Q07iO'#H}O9kQ07hO'#IPO?hQ08SO'#ChO@jQ`O'#DiQOQWOOO%[Q^O'#EPOAQQWO'#ESO:RQ7[O'#EjOA]QWO'#EjOAhQpO'#FbOOQU'#Cf'#CfOOQ07`'#Dn'#DnOOQ07`'#Jm'#JmO%[Q^O'#JmOOQO'#Jq'#JqOOQO'#Ib'#IbOBhQ`O'#EcOOQ07`'#Eb'#EbOCdQ07pO'#EcOCnQ`O'#EVOOQO'#Jp'#JpODSQ`O'#JqOEaQ`O'#EVOCnQ`O'#EcPEnO!0LbO'#CaPOOO)CDu)CDuOOOO'#IX'#IXOEyO!bO,59TOOQ07b,59T,59TOOOO'#IY'#IYOFXO#tO,59TO%[Q^O'#D`OOOO'#I['#I[OFgO?MpO,59xOOQ07b,59x,59xOFuQ^O'#I]OGYQWO'#JkOI[QrO'#JkO+}Q^O'#JkOIcQWO,5:OOIyQWO'#ElOJWQWO'#JyOJcQWO'#JxOJcQWO'#JxOJkQWO,5;YOJpQWO'#JwOOQ07f,5:Z,5:ZOJwQ^O,5:ZOLxQ08SO,5:eOMiQWO,5:mONSQ07hO'#JvONZQWO'#JuO9ZQWO'#JuONoQWO'#JuONwQWO,5;XON|QWO'#JuO!#UQrO'#JjOOQ07b'#Ch'#ChO%[Q^O'#ERO!#tQpO,5:rOOQO'#Jr'#JrOOQO-E<c-E<cO9aQWO,5=XO!$[QWO,5=XO!$aQ^O,5;VO!&dQ7[O'#EgO!'}QWO,5;VO!)mQ7[O'#DsO!)tQ^O'#DxO!*OQ`O,5;`O!*WQ`O,5;`O%[Q^O,5;`OOQU'#FR'#FROOQU'#FT'#FTO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aO%[Q^O,5;aOOQU'#FX'#FXO!*fQ^O,5;rOOQ07b,5;w,5;wOOQ07b,5;x,5;xO!,iQWO,5;xOOQ07b,5;y,5;yO%[Q^O'#IiO!,qQ07hO,5<eO!&dQ7[O,5;aO!-`Q7[O,5;aO%[Q^O,5;uO!-gQ&jO'#FgO!.dQ&jO'#J}O!.OQ&jO'#J}O!.kQ&jO'#J}OOQO'#J}'#J}O!/PQ&jO,5<POOOS,5<],5<]O!/bQ^O'#FsOOOS'#Ih'#IhO7YO,YO,5;}O!/iQ&jO'#FuOOQ07b,5;},5;}O!0YQMhO'#CuOOQ07b'#Cy'#CyO!0mQWO'#CyO!0rO?MpO'#C}O!1`Q7[O,5<bO!1gQWO,5<dO!3SQ!LQO'#GSO!3aQWO'#GTO!3fQWO'#GTO!3kQ!LQO'#GXO!4jQ`O'#G]OOQO'#Gh'#GhO!(SQ7[O'#GgOOQO'#Gj'#GjO!(SQ7[O'#GiO!5]QMhO'#JdOOQ07b'#Jd'#JdO!5gQWO'#JcO!5uQWO'#JbO!5}QWO'#CtOOQ07b'#Cw'#CwOOQ07b'#DR'#DROOQ07b'#DT'#DTO1SQWO'#DVO!(SQ7[O'#FzO!(SQ7[O'#F|O!6VQWO'#GOO!6[QWO'#GPO!3fQWO'#GVO!(SQ7[O'#G[O!6aQWO'#EmO!7OQWO,5<cOOQ07`'#Cq'#CqO!7WQWO'#EnO!8QQ`O'#EoOOQ07`'#Jw'#JwO!8XQ07hO'#KWO9kQ07hO,5=]O`Q^O,5>mOOQU'#J`'#J`OOQU,5>n,5>nOOQU-E<U-E<UO!:ZQ08SO,5:]O!<wQ08SO,5:iO%[Q^O,5:iO!?bQ08SO,5:kOOQO,5@q,5@qO!@RQ7[O,5=XO!@aQ07hO'#JaO9UQWO'#JaO!@rQ07hO,59YO!@}Q`O,59YO!AVQ7[O,59YO:RQ7[O,59YO!AbQWO,5;VO!AjQWO'#HZO!BOQWO'#KZO%[Q^O,5;zO!7{Q`O,5;|O!BWQWO,5=tO!B]QWO,5=tO!BbQWO,5=tO9kQ07hO,5=tO;sQWO,5=dOOQO'#Cu'#CuO!BpQ`O,5=aO!BxQ7[O,5=bO!CTQWO,5=dO!CYQpO,5=gO!CbQWO'#KVO>pQWO'#HQO9aQWO'#HSO!CgQWO'#HSO:RQ7[O'#HUO!ClQWO'#HUOOQU,5=j,5=jO!CqQWO'#HVO!DSQWO'#CnO!DXQWO,59OO!DcQWO,59OO!FhQ^O,59OOOQU,59O,59OO!FxQ07hO,59OO%[Q^O,59OO!ITQ^O'#H^OOQU'#H_'#H_OOQU'#H`'#H`O`Q^O,5=vO!IkQWO,5=vO`Q^O,5=|O`Q^O,5>OO!IpQWO,5>QO`Q^O,5>SO!IuQWO,5>VO!IzQ^O,5>]OOQU,5>c,5>cO%[Q^O,5>cO9kQ07hO,5>eOOQU,5>g,5>gO!NUQWO,5>gOOQU,5>i,5>iO!NUQWO,5>iOOQU,5>k,5>kO!NZQ`O'#D[O%[Q^O'#JmO!NxQ`O'#JmO# gQ`O'#DjO# xQ`O'#DjO#$ZQ^O'#DjO#$bQWO'#JlO#$jQWO,5:TO#$oQWO'#EpO#$}QWO'#JzO#%VQWO,5;ZO#%[Q`O'#DjO#%iQ`O'#EUOOQ07b,5:n,5:nO%[Q^O,5:nO#%pQWO,5:nO>pQWO,5;UO!@}Q`O,5;UO!AVQ7[O,5;UO:RQ7[O,5;UO#%xQWO,5@XO#%}Q$ISO,5:rOOQO-E<`-E<`O#'TQ07pO,5:}OCnQ`O,5:qO#'_Q`O,5:qOCnQ`O,5:}O!@rQ07hO,5:qOOQ07`'#Ef'#EfOOQO,5:},5:}O%[Q^O,5:}O#'lQ07hO,5:}O#'wQ07hO,5:}O!@}Q`O,5:qOOQO,5;T,5;TO#(VQ07hO,5:}POOO'#IV'#IVP#(kO!0LbO,58{POOO,58{,58{OOOO-E<V-E<VOOQ07b1G.o1G.oOOOO-E<W-E<WO#(vQpO,59zOOOO-E<Y-E<YOOQ07b1G/d1G/dO#({QrO,5>wO+}Q^O,5>wOOQO,5>},5>}O#)VQ^O'#I]OOQO-E<Z-E<ZO#)dQWO,5@VO#)lQrO,5@VO#)sQWO,5@dOOQ07b1G/j1G/jO%[Q^O,5@eO#){QWO'#IcOOQO-E<a-E<aO#)sQWO,5@dOOQ07`1G0t1G0tOOQ07f1G/u1G/uOOQ07f1G0X1G0XO%[Q^O,5@bO#*aQ07hO,5@bO#*rQ07hO,5@bO#*yQWO,5@aO9ZQWO,5@aO#+RQWO,5@aO#+aQWO'#IfO#*yQWO,5@aOOQ07`1G0s1G0sO!*OQ`O,5:tO!*ZQ`O,5:tOOQO,5:v,5:vO#,RQWO,5:vO#,ZQ7[O1G2sO9aQWO1G2sOOQ07b1G0q1G0qO#,iQ08SO1G0qO#-nQ08QO,5;ROOQ07b'#GR'#GRO#.[Q08SO'#JdO!$aQ^O1G0qO#0dQ7[O'#JnO#0nQWO,5:_O#0sQrO'#JoO%[Q^O'#JoO#0}QWO,5:dOOQ07b'#D['#D[OOQ07b1G0z1G0zO%[Q^O1G0zOOQ07b1G1d1G1dO#1SQWO1G0zO#3kQ08SO1G0{O#3rQ08SO1G0{O#6]Q08SO1G0{O#6dQ08SO1G0{O#8nQ08SO1G0{O#9UQ08SO1G0{O#<OQ08SO1G0{O#<VQ08SO1G0{O#>jQ08SO1G0{O#>wQ08SO1G0{O#@uQ08SO1G0{O#CuQ(CYO'#ChO#EsQ(CYO1G1^O#EzQ(CYO'#JjO!,lQWO1G1dO#F[Q08SO,5?TOOQ07`-E<g-E<gO#GOQ08SO1G0{OOQ07b1G0{1G0{O#IZQ08SO1G1aO#I}Q&jO,5<TO#JVQ&jO,5<UO#J_Q&jO'#FlO#JvQWO'#FkOOQO'#KO'#KOOOQO'#Ig'#IgO#J{Q&jO1G1kOOQ07b1G1k1G1kOOOS1G1v1G1vO#K^Q(CYO'#JiO#KhQWO,5<_O!*fQ^O,5<_OOOS-E<f-E<fOOQ07b1G1i1G1iO#KmQ`O'#J}OOQ07b,5<a,5<aO#KuQ`O,5<aOOQ07b,59e,59eO!&dQ7[O'#DPOOOO'#IZ'#IZO#KzO?MpO,59iOOQ07b,59i,59iO%[Q^O1G1|O!6[QWO'#IkO#LVQ7[O,5<uOOQ07b,5<r,5<rO!(SQ7[O'#InO#LuQ7[O,5=RO!(SQ7[O'#IpO#MhQ7[O,5=TO!&dQ7[O,5=VOOQO1G2O1G2OO#MrQpO'#CqO#NVQpO,5<nO#N^QWO'#KRO9aQWO'#KRO#NlQWO,5<pO!(SQ7[O,5<oO#NqQWO'#GUO#N|QWO,5<oO$ RQpO'#GRO$ `QpO'#KSO$ jQWO'#KSO!&dQ7[O'#KSO$ oQWO,5<sO$ tQ`O'#G^O!4eQ`O'#G^O$!VQWO'#G`O$![QWO'#GbO!3fQWO'#GeO$!aQ07hO'#ImO$!lQ`O,5<wOOQ07f,5<w,5<wO$!sQ`O'#G^O$#RQ`O'#G_O$#ZQ`O'#G_O$#`Q7[O,5=RO$#pQ7[O,5=TOOQ07b,5=W,5=WO!(SQ7[O,5?}O!(SQ7[O,5?}O$$QQWO'#IrO$$]QWO,5?|O$$eQWO,59`O$%UQ7[O,59qOOQ07b,59q,59qO$%wQ7[O,5<fO$&jQ7[O,5<hO@bQWO,5<jOOQ07b,5<k,5<kO$&tQWO,5<qO$&yQ7[O,5<vO$'ZQWO'#JuO!$aQ^O1G1}O$'`QWO1G1}O9ZQWO'#JxO9ZQWO'#EpO%[Q^O'#EpO9ZQWO'#ItO$'eQ07hO,5@rOOQU1G2w1G2wOOQU1G4X1G4XOOQ07b1G/w1G/wO!,iQWO1G/wO$)jQ08SO1G0TOOQU1G2s1G2sO!&dQ7[O1G2sO%[Q^O1G2sO#,^QWO1G2sO$+nQ7[O'#EgOOQ07`,5?{,5?{O$+xQ07hO,5?{OOQU1G.t1G.tO!@rQ07hO1G.tO!@}Q`O1G.tO!AVQ7[O1G.tO$,ZQWO1G0qO$,`QWO'#ChO$,kQWO'#K[O$,sQWO,5=uO$,xQWO'#K[O$,}QWO'#K[O$-]QWO'#IzO$-kQWO,5@uO$-sQrO1G1fOOQ07b1G1h1G1hO9aQWO1G3`O@bQWO1G3`O$-zQWO1G3`O$.PQWO1G3`OOQU1G3`1G3`O!CTQWO1G3OO!&dQ7[O1G2{O$.UQWO1G2{OOQU1G2|1G2|O!&dQ7[O1G2|O$.ZQWO1G2|O$.cQ`O'#GzOOQU1G3O1G3OO!4eQ`O'#IvO!CYQpO1G3ROOQU1G3R1G3ROOQU,5=l,5=lO$.kQ7[O,5=nO9aQWO,5=nO$![QWO,5=pO9UQWO,5=pO!@}Q`O,5=pO!AVQ7[O,5=pO:RQ7[O,5=pO$.yQWO'#KYO$/UQWO,5=qOOQU1G.j1G.jO$/ZQ07hO1G.jO@bQWO1G.jO$/fQWO1G.jO9kQ07hO1G.jO$1kQrO,5@wO$1{QWO,5@wO9ZQWO,5@wO$2WQ^O,5=xO$2_QWO,5=xOOQU1G3b1G3bO`Q^O1G3bOOQU1G3h1G3hOOQU1G3j1G3jO>kQWO1G3lO$2dQ^O1G3nO$6hQ^O'#HmOOQU1G3q1G3qO$6uQWO'#HsO>pQWO'#HuOOQU1G3w1G3wO$6}Q^O1G3wO9kQ07hO1G3}OOQU1G4P1G4POOQ07`'#GY'#GYO9kQ07hO1G4RO9kQ07hO1G4TO$;UQWO,5@XO!*fQ^O,5;[O9ZQWO,5;[O>pQWO,5:UO!*fQ^O,5:UO!@}Q`O,5:UO$;ZQ(CYO,5:UOOQO,5;[,5;[O$;eQ`O'#I^O$;{QWO,5@WOOQ07b1G/o1G/oO$<TQ`O'#IdO$<_QWO,5@fOOQ07`1G0u1G0uO# xQ`O,5:UOOQO'#Ia'#IaO$<gQ`O,5:pOOQ07f,5:p,5:pO#%sQWO1G0YOOQ07b1G0Y1G0YO%[Q^O1G0YOOQ07b1G0p1G0pO>pQWO1G0pO!@}Q`O1G0pO!AVQ7[O1G0pOOQ07`1G5s1G5sO!@rQ07hO1G0]OOQO1G0i1G0iO%[Q^O1G0iO$<nQ07hO1G0iO$<yQ07hO1G0iO!@}Q`O1G0]OCnQ`O1G0]O$=XQ07hO1G0iOOQO1G0]1G0]O$=mQ08SO1G0iPOOO-E<T-E<TPOOO1G.g1G.gOOOO1G/f1G/fO$=wQpO,5<eO$>PQrO1G4cOOQO1G4i1G4iO%[Q^O,5>wO$>ZQWO1G5qO$>cQWO1G6OO$>kQrO1G6PO9ZQWO,5>}O$>uQ08SO1G5|O%[Q^O1G5|O$?VQ07hO1G5|O$?hQWO1G5{O$?hQWO1G5{O9ZQWO1G5{O$?pQWO,5?QO9ZQWO,5?QOOQO,5?Q,5?QO$@UQWO,5?QO$'ZQWO,5?QOOQO-E<d-E<dOOQO1G0`1G0`OOQO1G0b1G0bO!,lQWO1G0bOOQU7+(_7+(_O!&dQ7[O7+(_O%[Q^O7+(_O$@dQWO7+(_O$@oQ7[O7+(_O$@}Q08SO,5=RO$CYQ08SO,5=TO$EeQ08SO,5=RO$GvQ08SO,5=TO$JXQ08SO,59qO$LaQ08SO,5<fO$NlQ08SO,5<hO%!wQ08SO,5<vOOQ07b7+&]7+&]O%%YQ08SO7+&]O%%|Q7[O'#I_O%&WQWO,5@YOOQ07b1G/y1G/yO%&`Q^O'#I`O%&mQWO,5@ZO%&uQrO,5@ZOOQ07b1G0O1G0OO%'PQWO7+&fOOQ07b7+&f7+&fO%'UQ(CYO,5:eO%[Q^O7+&xO%'`Q(CYO,5:]O%'mQ(CYO,5:iO%'wQ(CYO,5:kOOQ07b7+'O7+'OOOQO1G1o1G1oOOQO1G1p1G1pO%(RQtO,5<WO!*fQ^O,5<VOOQO-E<e-E<eOOQ07b7+'V7+'VOOOS7+'b7+'bOOOS1G1y1G1yO%(^QWO1G1yOOQ07b1G1{1G1{O%(cQpO,59kOOOO-E<X-E<XOOQ07b1G/T1G/TO%(jQ08SO7+'hOOQ07b,5?V,5?VO%)^QpO,5?VOOQ07b1G2a1G2aP!&dQ7[O'#IkPOQ07b-E<i-E<iO%)|Q7[O,5?YOOQ07b-E<l-E<lO%*oQ7[O,5?[OOQ07b-E<n-E<nO%*yQpO1G2qOOQ07b1G2Y1G2YO%+QQWO'#IjO%+`QWO,5@mO%+`QWO,5@mO%+hQWO,5@mO%+sQWO,5@mOOQO1G2[1G2[O%,RQ7[O1G2ZO!(SQ7[O1G2ZO%,cQ!LQO'#IlO%,sQWO,5@nO!&dQ7[O,5@nO%,{QpO,5@nOOQ07b1G2_1G2_OOQ07`,5<x,5<xOOQ07`,5<y,5<yO$'ZQWO,5<yOC_QWO,5<yO!@}Q`O,5<xOOQO'#Ga'#GaO%-VQWO,5<zOOQ07`,5<|,5<|O$'ZQWO,5=POOQO,5?X,5?XOOQO-E<k-E<kOOQ07f1G2c1G2cO!4eQ`O,5<xO%-_QWO,5<yO$!VQWO,5<zO!4eQ`O,5<yO!(SQ7[O'#InO%.RQ7[O1G2mO!(SQ7[O'#IpO%.tQ7[O1G2oO%/OQ7[O1G5iO%/YQ7[O1G5iOOQO,5?^,5?^OOQO-E<p-E<pOOQO1G.z1G.zO!7{Q`O,59sO%[Q^O,59sO%/gQWO1G2UO!(SQ7[O1G2]O%/lQ08SO7+'iOOQ07b7+'i7+'iO!$aQ^O7+'iO%0`QWO,5;[OOQ07`,5?`,5?`OOQ07`-E<r-E<rOOQ07b7+%c7+%cO%0eQpO'#KTO#%sQWO7+(_O%0oQrO7+(_O$@gQWO7+(_O%0vQ08QO'#ChO%1ZQ08QO,5<}O%1{QWO,5<}OOQ07`1G5g1G5gOOQU7+$`7+$`O!@rQ07hO7+$`O!@}Q`O7+$`O!$aQ^O7+&]O%2QQWO'#IyO%2iQWO,5@vOOQO1G3a1G3aO9aQWO,5@vO%2iQWO,5@vO%2qQWO,5@vOOQO,5?f,5?fOOQO-E<x-E<xOOQ07b7+'Q7+'QO%2vQWO7+(zO9kQ07hO7+(zO9aQWO7+(zO@bQWO7+(zOOQU7+(j7+(jO%2{Q08QO7+(gO!&dQ7[O7+(gO%3VQpO7+(hOOQU7+(h7+(hO!&dQ7[O7+(hO%3^QWO'#KXO%3iQWO,5=fOOQO,5?b,5?bOOQO-E<t-E<tOOQU7+(m7+(mO%4xQ`O'#HTOOQU1G3Y1G3YO!&dQ7[O1G3YO%[Q^O1G3YO%5PQWO1G3YO%5[Q7[O1G3YO9kQ07hO1G3[O$![QWO1G3[O9UQWO1G3[O!@}Q`O1G3[O!AVQ7[O1G3[O%5jQWO'#IxO%6OQWO,5@tO%6WQ`O,5@tOOQ07`1G3]1G3]OOQU7+$U7+$UO@bQWO7+$UO9kQ07hO7+$UO%6cQWO7+$UO%[Q^O1G6cO%[Q^O1G6dO%6hQ07hO1G6cO%6rQ^O1G3dO%6yQWO1G3dO%7OQ^O1G3dOOQU7+(|7+(|O9kQ07hO7+)WO`Q^O7+)YOOQU'#K_'#K_OOQU'#I{'#I{O%7VQ^O,5>XOOQU,5>X,5>XO%[Q^O'#HnO%7dQWO'#HpOOQU,5>_,5>_O9ZQWO,5>_OOQU,5>a,5>aOOQU7+)c7+)cOOQU7+)i7+)iOOQU7+)m7+)mOOQU7+)o7+)oO%7iQ`O1G5sO%7}Q(CYO1G0vO%8XQWO1G0vOOQO1G/p1G/pO%8dQ(CYO1G/pO>pQWO1G/pO!*fQ^O'#DjOOQO,5>x,5>xOOQO-E<[-E<[OOQO,5?O,5?OOOQO-E<b-E<bO!@}Q`O1G/pOOQO-E<_-E<_OOQ07f1G0[1G0[OOQ07b7+%t7+%tO#%sQWO7+%tOOQ07b7+&[7+&[O>pQWO7+&[O!@}Q`O7+&[OOQO7+%w7+%wO$=mQ08SO7+&TOOQO7+&T7+&TO%[Q^O7+&TO%8nQ07hO7+&TO!@rQ07hO7+%wO!@}Q`O7+%wO%8yQ07hO7+&TO%9XQ08SO7++hO%[Q^O7++hO%9iQWO7++gO%9iQWO7++gOOQO1G4l1G4lO9ZQWO1G4lO%9qQWO1G4lOOQO7+%|7+%|O#%sQWO<<KyO%0oQrO<<KyO%:PQWO<<KyOOQU<<Ky<<KyO!&dQ7[O<<KyO%[Q^O<<KyO%:XQWO<<KyO%:dQ08SO,5?YO%<oQ08SO,5?[O%>zQ08SO1G2ZO%A]Q08SO1G2mO%ChQ08SO1G2oO%EsQ7[O,5>yOOQO-E<]-E<]O%E}QrO,5>zO%[Q^O,5>zOOQO-E<^-E<^O%FXQWO1G5uOOQ07b<<JQ<<JQO%FaQ(CYO1G0qO%HkQ(CYO1G0{O%HrQ(CYO1G0{O%JvQ(CYO1G0{O%J}Q(CYO1G0{O%LrQ(CYO1G0{O%MYQ(CYO1G0{O& mQ(CYO1G0{O& tQ(CYO1G0{O&#rQ(CYO1G0{O&$PQ(CYO1G0{O&%}Q(CYO1G0{O&&bQ08SO<<JdO&'gQ(CYO1G0{O&)]Q(CYO'#JdO&+`Q(CYO1G1aO&+mQ(CYO1G0TO!*fQ^O'#FnOOQO'#KP'#KPOOQO1G1r1G1rO&+wQWO1G1qO&+|Q(CYO,5?TOOOS7+'e7+'eOOOO1G/V1G/VOOQ07b1G4q1G4qO!(SQ7[O7+(]O&,WQWO,5?UO9aQWO,5?UOOQO-E<h-E<hO&,fQWO1G6XO&,fQWO1G6XO&,nQWO1G6XO&,yQ7[O7+'uO&-ZQpO,5?WO&-eQWO,5?WO!&dQ7[O,5?WOOQO-E<j-E<jO&-jQpO1G6YO&-tQWO1G6YOOQ07`1G2e1G2eO$'ZQWO1G2eOOQ07`1G2d1G2dO&-|QWO1G2fO!&dQ7[O1G2fOOQ07`1G2k1G2kO!@}Q`O1G2dOC_QWO1G2eO&.RQWO1G2fO&.ZQWO1G2eO&.}Q7[O,5?YOOQ07b-E<m-E<mO&/pQ7[O,5?[OOQ07b-E<o-E<oO!(SQ7[O7++TOOQ07b1G/_1G/_O&/zQWO1G/_OOQ07b7+'p7+'pO&0PQ7[O7+'wO&0aQ08SO<<KTOOQ07b<<KT<<KTO&1TQWO1G0vO!&dQ7[O'#IsO&1YQWO,5@oO!&dQ7[O1G2iOOQU<<Gz<<GzO!@rQ07hO<<GzO&1bQ08SO<<IwOOQ07b<<Iw<<IwOOQO,5?e,5?eO&2UQWO,5?eO&2ZQWO,5?eOOQO-E<w-E<wO&2iQWO1G6bO&2iQWO1G6bO9aQWO1G6bO@bQWO<<LfOOQU<<Lf<<LfO&2qQWO<<LfO9kQ07hO<<LfOOQU<<LR<<LRO%2{Q08QO<<LROOQU<<LS<<LSO%3VQpO<<LSO&2vQ`O'#IuO&3RQWO,5@sO!*fQ^O,5@sOOQU1G3Q1G3QO&3ZQ^O'#JmOOQO'#Iw'#IwO9kQ07hO'#IwO&3eQ`O,5=oOOQU,5=o,5=oO&3lQ`O'#EcO&4QQWO7+(tO&4VQWO7+(tOOQU7+(t7+(tO!&dQ7[O7+(tO%[Q^O7+(tO&4_QWO7+(tOOQU7+(v7+(vO9kQ07hO7+(vO$![QWO7+(vO9UQWO7+(vO!@}Q`O7+(vO&4jQWO,5?dOOQO-E<v-E<vOOQO'#HW'#HWO&4uQWO1G6`O9kQ07hO<<GpOOQU<<Gp<<GpO@bQWO<<GpO&4}QWO7++}O&5SQWO7+,OO%[Q^O7++}O%[Q^O7+,OOOQU7+)O7+)OO&5XQWO7+)OO&5^Q^O7+)OO&5eQWO7+)OOOQU<<Lr<<LrOOQU<<Lt<<LtOOQU-E<y-E<yOOQU1G3s1G3sO&5jQWO,5>YOOQU,5>[,5>[O&5oQWO1G3yO9ZQWO7+&bO!*fQ^O7+&bOOQO7+%[7+%[O&5tQ(CYO1G6PO>pQWO7+%[OOQ07b<<I`<<I`OOQ07b<<Iv<<IvO>pQWO<<IvOOQO<<Io<<IoO$=mQ08SO<<IoO%[Q^O<<IoOOQO<<Ic<<IcO!@rQ07hO<<IcO&6OQ07hO<<IoO&6ZQ08SO<= SO&6kQWO<= ROOQO7+*W7+*WO9ZQWO7+*WOOQUANAeANAeO&6sQWOANAeO!&dQ7[OANAeO#%sQWOANAeO%0oQrOANAeO%[Q^OANAeO&6{Q08SO7+'uO&9^Q08SO,5?YO&;iQ08SO,5?[O&=tQ08SO7+'wO&@VQrO1G4fO&@aQ(CYO7+&]O&BeQ(CYO,5=RO&DlQ(CYO,5=TO&D|Q(CYO,5=RO&E^Q(CYO,5=TO&EnQ(CYO,59qO&GqQ(CYO,5<fO&ItQ(CYO,5<hO&KwQ(CYO,5<vO&MmQ(CYO7+'hO&MzQ(CYO7+'iO&NXQWO,5<YOOQO7+']7+']O&N^Q7[O<<KwOOQO1G4p1G4pO&NeQWO1G4pO&NpQWO1G4pO' OQWO7++sO' OQWO7++sO!&dQ7[O1G4rO' WQpO1G4rO' bQWO7++tOOQ07`7+(P7+(PO$'ZQWO7+(QO' jQpO7+(QOOQ07`7+(O7+(OO$'ZQWO7+(PO' qQWO7+(QO!&dQ7[O7+(QOC_QWO7+(PO' vQ7[O<<NoOOQ07b7+$y7+$yO'!QQpO,5?_OOQO-E<q-E<qO'![Q08QO7+(TOOQUAN=fAN=fO9aQWO1G5POOQO1G5P1G5PO'!lQWO1G5PO'!qQWO7++|O'!qQWO7++|O9kQ07hOANBQO@bQWOANBQOOQUANBQANBQOOQUANAmANAmOOQUANAnANAnO'!yQWO,5?aOOQO-E<s-E<sO'#UQ(CYO1G6_O'%fQrO'#ChOOQO,5?c,5?cOOQO-E<u-E<uOOQU1G3Z1G3ZO&3ZQ^O,5<zOOQU<<L`<<L`O!&dQ7[O<<L`O&4QQWO<<L`O'%pQWO<<L`O%[Q^O<<L`OOQU<<Lb<<LbO9kQ07hO<<LbO$![QWO<<LbO9UQWO<<LbO'%xQ`O1G5OO'&TQWO7++zOOQUAN=[AN=[O9kQ07hOAN=[OOQU<= i<= iOOQU<= j<= jO'&]QWO<= iO'&bQWO<= jOOQU<<Lj<<LjO'&gQWO<<LjO'&lQ^O<<LjOOQU1G3t1G3tO>pQWO7+)eO'&sQWO<<I|O''OQ(CYO<<I|OOQO<<Hv<<HvOOQ07bAN?bAN?bOOQOAN?ZAN?ZO$=mQ08SOAN?ZOOQOAN>}AN>}O%[Q^OAN?ZOOQO<<Mr<<MrOOQUG27PG27PO!&dQ7[OG27PO#%sQWOG27PO''YQWOG27PO%0oQrOG27PO''bQ(CYO<<JdO''oQ(CYO1G2ZO')eQ(CYO,5?YO'+hQ(CYO,5?[O'-kQ(CYO1G2mO'/nQ(CYO1G2oO'1qQ(CYO<<KTO'2OQ(CYO<<IwOOQO1G1t1G1tO!(SQ7[OANAcOOQO7+*[7+*[O'2]QWO7+*[O'2hQWO<= _O'2pQpO7+*^OOQ07`<<Kl<<KlO$'ZQWO<<KlOOQ07`<<Kk<<KkO'2zQpO<<KlO$'ZQWO<<KkOOQO7+*k7+*kO9aQWO7+*kO'3RQWO<= hOOQUG27lG27lO9kQ07hOG27lO!*fQ^O1G4{O'3ZQWO7++yO&4QQWOANAzOOQUANAzANAzO!&dQ7[OANAzO'3cQWOANAzOOQUANA|ANA|O9kQ07hOANA|O$![QWOANA|OOQO'#HX'#HXOOQO7+*j7+*jOOQUG22vG22vOOQUANETANETOOQUANEUANEUOOQUANBUANBUO'3kQWOANBUOOQU<<MP<<MPO!*fQ^OAN?hOOQOG24uG24uO$=mQ08SOG24uO#%sQWOLD,kOOQULD,kLD,kO!&dQ7[OLD,kO'3pQWOLD,kO'3xQ(CYO7+'uO'5nQ(CYO,5?YO'7qQ(CYO,5?[O'9tQ(CYO7+'wO';jQ7[OG26}OOQO<<Mv<<MvOOQ07`ANAWANAWO$'ZQWOANAWOOQ07`ANAVANAVOOQO<<NV<<NVOOQULD-WLD-WO';zQ(CYO7+*gOOQUG27fG27fO&4QQWOG27fO!&dQ7[OG27fOOQUG27hG27hO9kQ07hOG27hOOQUG27pG27pO'<UQ(CYOG25SOOQOLD*aLD*aOOQU!$(!V!$(!VO#%sQWO!$(!VO!&dQ7[O!$(!VO'<`Q08SOG26}OOQ07`G26rG26rOOQULD-QLD-QO&4QQWOLD-QOOQULD-SLD-SOOQU!)9Eq!)9EqO#%sQWO!)9EqOOQU!$(!l!$(!lOOQU!.K;]!.K;]O'>qQ(CYOG26}O!*fQ^O'#DyO1PQWO'#EWO'@gQrO'#JiO!*fQ^O'#DqO'@nQ^O'#D}O'@uQrO'#ChO'C]QrO'#ChO!*fQ^O'#EPO'CmQ^O,5;VO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O,5;aO!*fQ^O'#IiO'EpQWO,5<eO'ExQ7[O,5;aO'GcQ7[O,5;aO!*fQ^O,5;uO!&dQ7[O'#GgO'ExQ7[O'#GgO!&dQ7[O'#GiO'ExQ7[O'#GiO1SQWO'#DVO1SQWO'#DVO!&dQ7[O'#FzO'ExQ7[O'#FzO!&dQ7[O'#F|O'ExQ7[O'#F|O!&dQ7[O'#G[O'ExQ7[O'#G[O!*fQ^O,5:iO!*fQ^O,5@eO'CmQ^O1G0qO'GjQ(CYO'#ChO!*fQ^O1G1|O!&dQ7[O'#InO'ExQ7[O'#InO!&dQ7[O'#IpO'ExQ7[O'#IpO!&dQ7[O,5<oO'ExQ7[O,5<oO'CmQ^O1G1}O!*fQ^O7+&xO!&dQ7[O1G2ZO'ExQ7[O1G2ZO!&dQ7[O'#InO'ExQ7[O'#InO!&dQ7[O'#IpO'ExQ7[O'#IpO!&dQ7[O1G2]O'ExQ7[O1G2]O'CmQ^O7+'iO'CmQ^O7+&]O!&dQ7[OANAcO'ExQ7[OANAcO'GtQWO'#EkO'GyQWO'#EkO'HRQWO'#FZO'HWQWO'#EuO'H]QWO'#JyO'HhQWO'#JwO'HsQWO,5;VO'HxQ7[O,5<bO'IPQWO'#GTO'IUQWO'#GTO'IZQWO,5<cO'IcQWO,5;VO'IkQ(CYO1G1^O'IrQWO,5<oO'IwQWO,5<oO'I|QWO,5<qO'JRQWO,5<qO'JWQWO1G1}O'J]QWO1G0qO'JbQ7[O<<KwO'JiQ7[O<<KwO7hQ7[O'#FxO9UQWO'#FwOA]QWO'#EjO!*fQ^O,5;rO!3fQWO'#GTO!3fQWO'#GTO!3fQWO'#GVO!3fQWO'#GVO!(SQ7[O7+(]O!(SQ7[O7+(]O%*yQpO1G2qO%*yQpO1G2qO!&dQ7[O,5=VO!&dQ7[O,5=V",
  stateData: "'Km~O'tOS'uOSSOS'vRQ~OPYOQYORfOX!VO`qOczOdyOlkOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO![XO!fuO!kZO!nYO!oYO!pYO!rvO!twO!wxO!{]O#s!PO$T|O%b}O%d!QO%f!OO%g!OO%h!OO%k!RO%m!SO%p!TO%q!TO%s!UO&P!WO&V!XO&X!YO&Z!ZO&]![O&`!]O&f!^O&l!_O&n!`O&p!aO&r!bO&t!cO'{SO'}TO(QUO(XVO(g[O(tiO~OVtO~P`OPYOQYORfOc!jOd!iOlkOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO![!eO!fuO!kZO!nYO!oYO!pYO!rvO!t!gO!w!hO$T!kO'{!dO'}TO(QUO(XVO(g[O(tiO~O`!vOo!nO!P!oO!_!xO!`!uO!a!uO!{:dO#P!pO#Q!pO#R!wO#S!pO#T!pO#W!yO#X!yO'|!lO'}TO(QUO([!mO(g!sO~O'v!zO~OP[XZ[X`[Xn[X|[X}[X!P[X!Y[X!h[X!i[X!k[X!o[X#[[X#geX#j[X#k[X#l[X#m[X#n[X#o[X#p[X#q[X#r[X#t[X#v[X#x[X#y[X$O[X'r[X(X[X(h[X(o[X(p[X~O!d$|X~P(qO^!|O'}#OO(O!|O(P#OO~O^#PO(P#OO(Q#OO(R#PO~Ot#RO!R#SO(Y#SO(Z#UO~OPYOQYORfOc!jOd!iOlkOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO![!eO!fuO!kZO!nYO!oYO!pYO!rvO!t!gO!w!hO$T!kO'{:hO'}TO(QUO(XVO(g[O(tiO~O!X#YO!Y#VO!V(_P!V(lP~P+}O!Z#bO~P`OPYOQYORfOc!jOd!iOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO![!eO!fuO!kZO!nYO!oYO!pYO!rvO!t!gO!w!hO$T!kO'}TO(QUO(XVO(g[O(tiO~Ol#lO!X#hO!{]O#e#kO#f#hO'{:iO!j(iP~P.iO!k#nO'{#mO~O!w#rO!{]O%b#sO~O#g#tO~O!d#uO#g#tO~OP$]OZ$dOn$QO|#yO}#zO!P#{O!Y$aO!h$SO!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO#o$SO#p$SO#q$cO#r$SO#t$TO#v$VO#x$XO#y$YO(XVO(h$ZO(o#|O(p#}O~O`(]X'r(]X'p(]X!j(]X!V(]X![(]X%c(]X!d(]X~P1qO#[$eO$O$eOP(^XZ(^Xn(^X|(^X}(^X!P(^X!Y(^X!h(^X!k(^X!o(^X#j(^X#k(^X#l(^X#m(^X#n(^X#o(^X#p(^X#q(^X#r(^X#t(^X#v(^X#x(^X#y(^X(X(^X(h(^X(o(^X(p(^X![(^X%c(^X~O`(^X!i(^X'r(^X'p(^X!V(^X!j(^Xr(^X!d(^X~P4XO#[$eO~O$Y$gO$[$fO$c$lO~ORfO![$mO$f$nO$h$pO~Og%VOl%WOn$tOo$sOp$sOv%XOx%YOz%ZO!P${O![$|O!f%`O!k$xO#f%aO$T%^O$o%[O$q%]O$t%_O'{$rO'}TO(QUO(X$uO(o$}O(p%POf(UP~O!k%bO~O!P%eO![%fO'{%dO~O!d%jO~O`%kO'r%kO~O'|!lO~P%[O%h%rO~P%[Og%VO!k%bO'{%dO'|!lO~Od%yO!k%bO'{%dO~O#r$SO~O|&OO![%{O!k%}O%d&RO'{%dO'|!lO'}TO(QUO_(}P~O!w#rO~O%m&TO!P(yX![(yX'{(yX~O'{&UO~O!t&ZO#s!PO%d!QO%f!OO%g!OO%h!OO%k!RO%m!SO%p!TO%q!TO~Oc&`Od&_O!w&]O%b&^O%u&[O~P;xOc&cOdyO![&bO!t&ZO!wxO!{]O#s!PO%b}O%f!OO%g!OO%h!OO%k!RO%m!SO%p!TO%q!TO%s!UO~Oa&fO#[&iO%d&dO'|!lO~P<}O!k&jO!t&nO~O!k#nO~O![XO~O`%kO'q&vO'r%kO~O`%kO'q&yO'r%kO~O`%kO'q&{O'r%kO~O'p[X!V[Xr[X!j[X&T[X![[X%c[X!d[X~P(qO!_'YO!`'RO!a'RO'|!lO'}TO(QUO~Oo'PO!P'OO!X'SO([&}O!Z(`P!Z(nP~P@UOj']O!['ZO'{%dO~Od'bO!k%bO'{%dO~O|&OO!k%}O~Oo!nO!P!oO!{:dO#P!pO#Q!pO#S!pO#T!pO'|!lO'}TO(QUO([!mO(g!sO~O!_'hO!`'gO!a'gO#R!pO#W'iO#X'iO~PApO`%kOg%VO!d#uO!k%bO'r%kO(h'kO~O!o'oO#['mO~PCOOo!nO!P!oO'}TO(QUO([!mO(g!sO~O![XOo(eX!P(eX!_(eX!`(eX!a(eX!{(eX#P(eX#Q(eX#R(eX#S(eX#T(eX#W(eX#X(eX'|(eX'}(eX(Q(eX([(eX(g(eX~O!`'gO!a'gO'|!lO~PCnO'w'sO'x'sO'y'uO~O^!|O'}'wO(O!|O(P'wO~O^#PO(P'wO(Q'wO(R#PO~Ot#RO!R#SO(Y#SO(Z'{O~O!X'}O!V'PX!V'VX!Y'PX!Y'VX~P+}O!Y(PO!V(_X~OP$]OZ$dOn$QO|#yO}#zO!P#{O!Y(PO!h$SO!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO#o$SO#p$SO#q$cO#r$SO#t$TO#v$VO#x$XO#y$YO(XVO(h$ZO(o#|O(p#}O~O!V(_X~PGbO!V(UO~O!V(kX!Y(kX!d(kX!j(kX(h(kX~O#[(kX#g#`X!Z(kX~PIhO#[(VO!V(mX!Y(mX~O!Y(WO!V(lX~O!V(ZO~O#[$eO~PIhO!Z([O~P`O|#yO}#zO!P#{O!i#wO!k#xO(XVOP!maZ!man!ma!Y!ma!h!ma!o!ma#j!ma#k!ma#l!ma#m!ma#n!ma#o!ma#p!ma#q!ma#r!ma#t!ma#v!ma#x!ma#y!ma(h!ma(o!ma(p!ma~O`!ma'r!ma'p!ma!V!ma!j!mar!ma![!ma%c!ma!d!ma~PKOO!j(]O~O!d#uO#[(^O(h'kO!Y(jX`(jX'r(jX~O!j(jX~PMnO!P%eO![%fO!{]O#e(cO#f(bO'{%dO~O!Y(dO!j(iX~O!j(fO~O!P%eO![%fO#f(bO'{%dO~OP(^XZ(^Xn(^X|(^X}(^X!P(^X!Y(^X!h(^X!i(^X!k(^X!o(^X#j(^X#k(^X#l(^X#m(^X#n(^X#o(^X#p(^X#q(^X#r(^X#t(^X#v(^X#x(^X#y(^X(X(^X(h(^X(o(^X(p(^X~O!d#uO!j(^X~P! [O|(gO}(hO!i#wO!k#xO!{!za!P!za~O!w!za%b!za![!za#e!za#f!za'{!za~P!#`O!w(lO~OPYOQYORfOc!jOd!iOlkOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO![XO!fuO!kZO!nYO!oYO!pYO!rvO!t!gO!w!hO$T!kO'{!dO'}TO(QUO(XVO(g[O(tiO~Og%VOl%WOn$tOo$sOp$sOv%XOx%YOz;QO!P${O![$|O!f<`O!k$xO#f;WO$T%^O$o;SO$q;UO$t%_O'{(pO'}TO(QUO(X$uO(o$}O(p%PO~O#g(rO~Og%VOl%WOn$tOo$sOp$sOv%XOx%YOz%ZO!P${O![$|O!f%`O!k$xO#f%aO$T%^O$o%[O$q%]O$t%_O'{(pO'}TO(QUO(X$uO(o$}O(p%PO~Of(bP~P!(SO!X(vO!j(cP~P%[O([(xO(g[O~O!P(zO!k#xO([(xO(g[O~OP:cOQ:cORfOc<[Od!iOlkOn:cOokOpkOvkOx:cOz:cO!PWO!TkO!UkO![!eO!f:fO!kZO!n:cO!o:cO!p:cO!r:gO!t:jO!w!hO$T!kO'{)YO'}TO(QUO(XVO(g[O(t<YO~O})]O!k#xO~O!Y$aO`$ma'r$ma'p$ma!j$ma!V$ma![$ma%c$ma!d$ma~O#s)aO~P!&dO|)dO!d)cO![$ZX$W$ZX$Y$ZX$[$ZX$c$ZX~O!d)cO![(qX$W(qX$Y(qX$[(qX$c(qX~O|)dO~P!.OO|)dO![(qX$W(qX$Y(qX$[(qX$c(qX~O![)fO$W)jO$Y)eO$[)eO$c)kO~O!X)nO~P!*fO$Y$gO$[$fO$c)rO~Oj$uX|$uX!P$uX!i$uX(o$uX(p$uX~OfiXf$uXjiX!YiX#[iX~P!/tOo)tO~Ot)uO(Y)vO(Z)xO~Oj*RO|)zO!P){O(o$}O(p%PO~Of)yO~P!0}Of*SO~Og%VOl%WOn$tOo$sOp$sOv%XOx%YOz;QO!P${O![$|O!f<`O!k$xO#f;WO$T%^O$o;SO$q;UO$t%_O'}TO(QUO(X$uO(o$}O(p%PO~O!X*WO'{*TO!j(uP~P!1lO#g*YO~O!k*ZO~O!X*`O'{*]O!V(vP~P!1lOn*lO!P*dO!_*jO!`*cO!a*cO!k*ZO#W*kO%Y*fO'|!lO([!mO~O!Z*iO~P!3xO!i#wOj(WX|(WX!P(WX(o(WX(p(WX!Y(WX#[(WX~Of(WX#|(WX~P!4qOj*qO#[*pOf(VX!Y(VX~O!Y*rOf(UX~O'{&UOf(UP~O!k*yO~O'{(pO~Ol*}O!P%eO!X#hO![%fO!{]O#e#kO#f#hO'{%dO!j(iP~O!d#uO#g+OO~O!P%eO!X+QO!Y(WO![%fO'{%dO!V(lP~Oo'VO!P+SO!X+RO'}TO(QUO([(xO~O!Z(nP~P!7lO!Y+TO`(zX'r(zX~OP$]OZ$dOn$QO|#yO}#zO!P#{O!h$SO!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO#o$SO#p$SO#q$cO#r$SO#t$TO#v$VO#x$XO#y$YO(XVO(h$ZO(o#|O(p#}O~O`!ea!Y!ea'r!ea'p!ea!V!ea!j!ear!ea![!ea%c!ea!d!ea~P!8dO|#yO}#zO!P#{O!i#wO!k#xO(XVOP!qaZ!qan!qa!Y!qa!h!qa!o!qa#j!qa#k!qa#l!qa#m!qa#n!qa#o!qa#p!qa#q!qa#r!qa#t!qa#v!qa#x!qa#y!qa(h!qa(o!qa(p!qa~O`!qa'r!qa'p!qa!V!qa!j!qar!qa![!qa%c!qa!d!qa~P!:}O|#yO}#zO!P#{O!i#wO!k#xO(XVOP!saZ!san!sa!Y!sa!h!sa!o!sa#j!sa#k!sa#l!sa#m!sa#n!sa#o!sa#p!sa#q!sa#r!sa#t!sa#v!sa#x!sa#y!sa(h!sa(o!sa(p!sa~O`!sa'r!sa'p!sa!V!sa!j!sar!sa![!sa%c!sa!d!sa~P!=hOg%VOj+^O!['ZO%c+]O~O!d+`O`(TX![(TX'r(TX!Y(TX~O`%kO![XO'r%kO~Og%VO!k%bO~Og%VO!k%bO'{%dO~O!d#uO#g(rO~Oa+kO%d+lO'{+hO'}TO(QUO!Z)OP~O!Y+mO_(}X~OZ+qO~O_+rO~O![%{O'{%dO'|!lO_(}P~Og%VO#[+wO~Og%VOj+zO![$|O~O![+|O~O|,OO![XO~O%h%rO~O!w,TO~Od,YO~Oa,ZO'{#mO'}TO(QUO!Z(|P~Od%yO~O%d!QO'{&UO~P<}OZ,`O_,_O~OPYOQYORfOczOdyOlkOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO!fuO!kZO!nYO!oYO!pYO!rvO!wxO!{]O%b}O'}TO(QUO(XVO(g[O(tiO~O![!eO!t!gO$T!kO'{!dO~P!DkO_,_O`%kO'r%kO~OPYOQYORfOc!jOd!iOlkOnYOokOpkOvkOxYOzYO!PWO!TkO!UkO![!eO!fuO!kZO!nYO!oYO!pYO!rvO!w!hO$T!kO'{!dO'}TO(QUO(XVO(g[O(tiO~O`,eO!twO#s!OO%f!OO%g!OO%h!OO~P!GTO!k&jO~O&V,kO~O![,mO~O&h,oO&j,pOP&eaQ&eaR&eaX&ea`&eac&ead&eal&ean&eao&eap&eav&eax&eaz&ea!P&ea!T&ea!U&ea![&ea!f&ea!k&ea!n&ea!o&ea!p&ea!r&ea!t&ea!w&ea!{&ea#s&ea$T&ea%b&ea%d&ea%f&ea%g&ea%h&ea%k&ea%m&ea%p&ea%q&ea%s&ea&P&ea&V&ea&X&ea&Z&ea&]&ea&`&ea&f&ea&l&ea&n&ea&p&ea&r&ea&t&ea'p&ea'{&ea'}&ea(Q&ea(X&ea(g&ea(t&ea!Z&ea&^&eaa&ea&c&ea~O'{,uO~Og!bX!Y!OX!Y!bX!Z!OX!Z!bX!d!OX!d!bX!k!bX#[!OX~O!d,zO#[,yOg(aX!Y#dX!Y(aX!Z#dX!Z(aX!d(aX!k(aX~Og%VO!d,|O!k%bO!Y!^X!Z!^X~Oo!nO!P!oO'}TO(QUO([!mO~OP:cOQ:cORfOc<[Od!iOlkOn:cOokOpkOvkOx:cOz:cO!PWO!TkO!UkO![!eO!f:fO!kZO!n:cO!o:cO!p:cO!r:gO!t:jO!w!hO$T!kO'}TO(QUO(XVO(g[O(t<YO~O'{;]O~P#!ZO!Y-QO!Z(`X~O!Z-SO~O!d,zO#[,yO!Y#dX!Z#dX~O!Y-TO!Z(nX~O!Z-VO~O!`-WO!a-WO'|!lO~P# xO!Z-ZO~P'_Oj-^O!['ZO~O!V-cO~Oo!za!_!za!`!za!a!za#P!za#Q!za#R!za#S!za#T!za#W!za#X!za'|!za'}!za(Q!za([!za(g!za~P!#`O!o-hO#[-fO~PCOO!`-jO!a-jO'|!lO~PCnO`%kO#[-fO'r%kO~O`%kO!d#uO#[-fO'r%kO~O`%kO!d#uO!o-hO#[-fO'r%kO(h'kO~O'w'sO'x'sO'y-oO~Or-pO~O!V'Pa!Y'Pa~P!8dO!X-tO!V'PX!Y'PX~P%[O!Y(PO!V(_a~O!V(_a~PGbO!Y(WO!V(la~O!P%eO!X-xO![%fO'{%dO!V'VX!Y'VX~O#[-zO!Y(ja!j(ja`(ja'r(ja~O!d#uO~P#*aO!Y(dO!j(ia~O!P%eO![%fO#f.OO'{%dO~Ol.TO!P%eO!X.QO![%fO!{]O#e.SO#f.QO'{%dO!Y'YX!j'YX~O}.XO!k#xO~Og%VOj.[O!['ZO%c.ZO~O`#_i!Y#_i'r#_i'p#_i!V#_i!j#_ir#_i![#_i%c#_i!d#_i~P!8dOj<fO|)zO!P){O(o$}O(p%PO~O#g#Za`#Za#[#Za'r#Za!Y#Za!j#Za![#Za!V#Za~P#-]O#g(WXP(WXZ(WX`(WXn(WX}(WX!h(WX!k(WX!o(WX#j(WX#k(WX#l(WX#m(WX#n(WX#o(WX#p(WX#q(WX#r(WX#t(WX#v(WX#x(WX#y(WX'r(WX(X(WX(h(WX!j(WX!V(WX'p(WXr(WX![(WX%c(WX!d(WX~P!4qO!Y.iOf(bX~P!0}Of.kO~O!Y.lO!j(cX~P!8dO!j.oO~O!V.qO~OP$]O|#yO}#zO!P#{O!i#wO!k#xO!o$]O(XVOZ#ii`#iin#ii!Y#ii!h#ii#k#ii#l#ii#m#ii#n#ii#o#ii#p#ii#q#ii#r#ii#t#ii#v#ii#x#ii#y#ii'r#ii(h#ii(o#ii(p#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~O#j#ii~P#1XO#j$OO~P#1XOP$]O|#yO}#zO!P#{O!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO(XVOZ#ii`#ii!Y#ii!h#ii#n#ii#o#ii#p#ii#q#ii#r#ii#t#ii#v#ii#x#ii#y#ii'r#ii(h#ii(o#ii(p#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~On#ii~P#3yOn$QO~P#3yOP$]On$QO|#yO}#zO!P#{O!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO(XVO`#ii!Y#ii#t#ii#v#ii#x#ii#y#ii'r#ii(h#ii(o#ii(p#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~OZ#ii!h#ii#o#ii#p#ii#q#ii#r#ii~P#6kOZ$dO!h$SO#o$SO#p$SO#q$cO#r$SO~P#6kOP$]OZ$dOn$QO|#yO}#zO!P#{O!h$SO!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO#o$SO#p$SO#q$cO#r$SO#t$TO(XVO(p#}O`#ii!Y#ii#x#ii#y#ii'r#ii(h#ii(o#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~O#v$VO~P#9lO#v#ii~P#9lOP$]OZ$dOn$QO|#yO}#zO!P#{O!h$SO!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO#o$SO#p$SO#q$cO#r$SO#t$TO(XVO`#ii!Y#ii#x#ii#y#ii'r#ii(h#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~O#v#ii(o#ii(p#ii~P#<^O#v$VO(o#|O(p#}O~P#<^OP$]OZ$dOn$QO|#yO}#zO!P#{O!h$SO!i#wO!k#xO!o$]O#j$OO#k$PO#l$PO#m$PO#n$RO#o$SO#p$SO#q$cO#r$SO#t$TO#v$VO#x$XO(XVO(o#|O(p#}O~O`#ii!Y#ii#y#ii'r#ii(h#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~P#?UOP[XZ[Xn[X|[X}[X!P[X!h[X!i[X!k[X!o[X#[[X#geX#j[X#k[X#l[X#m[X#n[X#o[X#p[X#q[X#r[X#t[X#v[X#x[X#y[X$O[X(X[X(h[X(o[X(p[X!Y[X!Z[X~O#|[X~P#AoOP$]OZ:zOn:nO|#yO}#zO!P#{O!h:pO!i#wO!k#xO!o$]O#j:lO#k:mO#l:mO#m:mO#n:oO#o:pO#p:pO#q:yO#r:pO#t:qO#v:sO#x:uO#y:vO(XVO(h$ZO(o#|O(p#}O~O#|.sO~P#C|O#[:{O$O:{O#|(^X!Z(^X~P! [O`']a!Y']a'r']a'p']a!j']a!V']ar']a![']a%c']a!d']a~P!8dOP#iiZ#ii`#iin#ii}#ii!Y#ii!h#ii!i#ii!k#ii!o#ii#j#ii#k#ii#l#ii#m#ii#n#ii#o#ii#p#ii#q#ii#r#ii#t#ii#v#ii#x#ii#y#ii'r#ii(X#ii(h#ii'p#ii!V#ii!j#iir#ii![#ii%c#ii!d#ii~P#-]O`#}i!Y#}i'r#}i'p#}i!V#}i!j#}ir#}i![#}i%c#}i!d#}i~P!8dO$Y.xO$[.xO~O$Y.yO$[.yO~O!d)cO#[.zO![$`X$W$`X$Y$`X$[$`X$c$`X~O!X.{O~O![)fO$W.}O$Y)eO$[)eO$c/OO~O!Y:wO!Z(]X~P#C|O!Z/PO~O!d)cO$c(qX~O$c/RO~Ot)uO(Y)vO(Z/UO~O!V/YO~P!&dO(o$}Oj%Za|%Za!P%Za(p%Za!Y%Za#[%Za~Of%Za#|%Za~P#L^O(p%POj%]a|%]a!P%]a(o%]a!Y%]a#[%]a~Of%]a#|%]a~P#MPO!YeX!deX!jeX!j$uX(heX~P!/tO!j/bO~P#-]O!Y/cO!d#uO(h'kO!j(uX~O!j/hO~O!X*WO'{%dO!j(uP~O#g/jO~O!V$uX!Y$uX!d$|X~P!/tO!Y/kO!V(vX~P#-]O!d/mO~O!V/oO~Og%VOn/sO!d#uO!k%bO(h'kO~O'{/uO~O!d+`O~O`%kO!Y/yO'r%kO~O!Z/{O~P!3xO!`/|O!a/|O'|!lO([!mO~O!P0OO([!mO~O#W0PO~Of%Za!Y%Za#[%Za#|%Za~P!0}Of%]a!Y%]a#[%]a#|%]a~P!0}O'{&UOf'fX!Y'fX~O!Y*rOf(Ua~Of0YO~O|0ZO}0ZO!P0[Ojya(oya(pya!Yya#[ya~Ofya#|ya~P$$jO|)zO!P){Oj$na(o$na(p$na!Y$na#[$na~Of$na#|$na~P$%`O|)zO!P){Oj$pa(o$pa(p$pa!Y$pa#[$pa~Of$pa#|$pa~P$&RO#g0^O~Of%Oa!Y%Oa#[%Oa#|%Oa~P!0}O!d#uO~O#g0aO~O!Y+TO`(za'r(za~O|#yO}#zO!P#{O!i#wO!k#xO(XVOP!qiZ!qin!qi!Y!qi!h!qi!o!qi#j!qi#k!qi#l!qi#m!qi#n!qi#o!qi#p!qi#q!qi#r!qi#t!qi#v!qi#x!qi#y!qi(h!qi(o!qi(p!qi~O`!qi'r!qi'p!qi!V!qi!j!qir!qi![!qi%c!qi!d!qi~P$'pOg%VOn$tOo$sOp$sOv%XOx%YOz;QO!P${O![$|O!f<`O!k$xO#f;WO$T%^O$o;SO$q;UO$t%_O'}TO(QUO(X$uO(o$}O(p%PO~Ol0kO'{0jO~P$*ZO!d+`O`(Ta![(Ta'r(Ta!Y(Ta~O#g0qO~OZ[X!YeX!ZeX~O!Y0rO!Z)OX~O!Z0tO~OZ0uO~Oa0wO'{+hO'}TO(QUO~O![%{O'{%dO_'nX!Y'nX~O!Y+mO_(}a~O!j0zO~P!8dOZ0}O~O_1OO~O#[1RO~Oj1UO![$|O~O([(xO!Z({P~Og%VOj1_O![1[O%c1^O~OZ1iO!Y1gO!Z(|X~O!Z1jO~O_1lO`%kO'r%kO~O'{#mO'}TO(QUO~O#[$eO$O$eOP(^XZ(^Xn(^X|(^X}(^X!P(^X!Y(^X!h(^X!k(^X!o(^X#j(^X#k(^X#l(^X#m(^X#n(^X#o(^X#p(^X#q(^X#t(^X#v(^X#x(^X#y(^X(X(^X(h(^X(o(^X(p(^X~O#r1oO&T1pO`(^X!i(^X~P$/qO#[$eO#r1oO&T1pO~O`1rO~P%[O`1tO~O&^1wOP&[iQ&[iR&[iX&[i`&[ic&[id&[il&[in&[io&[ip&[iv&[ix&[iz&[i!P&[i!T&[i!U&[i![&[i!f&[i!k&[i!n&[i!o&[i!p&[i!r&[i!t&[i!w&[i!{&[i#s&[i$T&[i%b&[i%d&[i%f&[i%g&[i%h&[i%k&[i%m&[i%p&[i%q&[i%s&[i&P&[i&V&[i&X&[i&Z&[i&]&[i&`&[i&f&[i&l&[i&n&[i&p&[i&r&[i&t&[i'p&[i'{&[i'}&[i(Q&[i(X&[i(g&[i(t&[i!Z&[ia&[i&c&[i~Oa1}O!Z1{O&c1|O~P`O![XO!k2PO~O&j,pOP&eiQ&eiR&eiX&ei`&eic&eid&eil&ein&eio&eip&eiv&eix&eiz&ei!P&ei!T&ei!U&ei![&ei!f&ei!k&ei!n&ei!o&ei!p&ei!r&ei!t&ei!w&ei!{&ei#s&ei$T&ei%b&ei%d&ei%f&ei%g&ei%h&ei%k&ei%m&ei%p&ei%q&ei%s&ei&P&ei&V&ei&X&ei&Z&ei&]&ei&`&ei&f&ei&l&ei&n&ei&p&ei&r&ei&t&ei'p&ei'{&ei'}&ei(Q&ei(X&ei(g&ei(t&ei!Z&ei&^&eia&ei&c&ei~O!V2VO~O!Y!^a!Z!^a~P#C|Oo!nO!P!oO!X2]O([!mO!Y'QX!Z'QX~P@UO!Y-QO!Z(`a~O!Y'WX!Z'WX~P!7lO!Y-TO!Z(na~O!Z2dO~P'_O`%kO#[2mO'r%kO~O`%kO!d#uO#[2mO'r%kO~O`%kO!d#uO!o2qO#[2mO'r%kO(h'kO~O`%kO'r%kO~P!8dO!Y$aOr$ma~O!V'Pi!Y'Pi~P!8dO!Y(PO!V(_i~O!Y(WO!V(li~O!V(mi!Y(mi~P!8dO!Y(ji!j(ji`(ji'r(ji~P!8dO#[2sO!Y(ji!j(ji`(ji'r(ji~O!Y(dO!j(ii~O!P%eO![%fO!{]O#e2xO#f2wO'{%dO~O!P%eO![%fO#f2wO'{%dO~Oj3PO!['ZO%c3OO~Og%VOj3PO!['ZO%c3OO~O#g%ZaP%ZaZ%Za`%Zan%Za}%Za!h%Za!i%Za!k%Za!o%Za#j%Za#k%Za#l%Za#m%Za#n%Za#o%Za#p%Za#q%Za#r%Za#t%Za#v%Za#x%Za#y%Za'r%Za(X%Za(h%Za!j%Za!V%Za'p%Zar%Za![%Za%c%Za!d%Za~P#L^O#g%]aP%]aZ%]a`%]an%]a}%]a!h%]a!i%]a!k%]a!o%]a#j%]a#k%]a#l%]a#m%]a#n%]a#o%]a#p%]a#q%]a#r%]a#t%]a#v%]a#x%]a#y%]a'r%]a(X%]a(h%]a!j%]a!V%]a'p%]ar%]a![%]a%c%]a!d%]a~P#MPO#g%ZaP%ZaZ%Za`%Zan%Za}%Za!Y%Za!h%Za!i%Za!k%Za!o%Za#j%Za#k%Za#l%Za#m%Za#n%Za#o%Za#p%Za#q%Za#r%Za#t%Za#v%Za#x%Za#y%Za'r%Za(X%Za(h%Za!j%Za!V%Za'p%Za#[%Zar%Za![%Za%c%Za!d%Za~P#-]O#g%]aP%]aZ%]a`%]an%]a}%]a!Y%]a!h%]a!i%]a!k%]a!o%]a#j%]a#k%]a#l%]a#m%]a#n%]a#o%]a#p%]a#q%]a#r%]a#t%]a#v%]a#x%]a#y%]a'r%]a(X%]a(h%]a!j%]a!V%]a'p%]a#[%]ar%]a![%]a%c%]a!d%]a~P#-]O#gyaPyaZya`yanya!hya!iya!kya!oya#jya#kya#lya#mya#nya#oya#pya#qya#rya#tya#vya#xya#yya'rya(Xya(hya!jya!Vya'pyarya![ya%cya!dya~P$$jO#g$naP$naZ$na`$nan$na}$na!h$na!i$na!k$na!o$na#j$na#k$na#l$na#m$na#n$na#o$na#p$na#q$na#r$na#t$na#v$na#x$na#y$na'r$na(X$na(h$na!j$na!V$na'p$nar$na![$na%c$na!d$na~P$%`O#g$paP$paZ$pa`$pan$pa}$pa!h$pa!i$pa!k$pa!o$pa#j$pa#k$pa#l$pa#m$pa#n$pa#o$pa#p$pa#q$pa#r$pa#t$pa#v$pa#x$pa#y$pa'r$pa(X$pa(h$pa!j$pa!V$pa'p$par$pa![$pa%c$pa!d$pa~P$&RO#g%OaP%OaZ%Oa`%Oan%Oa}%Oa!Y%Oa!h%Oa!i%Oa!k%Oa!o%Oa#j%Oa#k%Oa#l%Oa#m%Oa#n%Oa#o%Oa#p%Oa#q%Oa#r%Oa#t%Oa#v%Oa#x%Oa#y%Oa'r%Oa(X%Oa(h%Oa!j%Oa!V%Oa'p%Oa#[%Oar%Oa![%Oa%c%Oa!d%Oa~P#-]O`#_q!Y#_q'r#_q'p#_q!V#_q!j#_qr#_q![#_q%c#_q!d#_q~P!8dOf'RX!Y'RX~P!(SO!Y.iOf(ba~O!X3ZO!Y'SX!j'SX~P%[O!Y.lO!j(ca~O!Y.lO!j(ca~P!8dO!V3^O~O#|!ma!Z!ma~PKOO#|!ea!Y!ea!Z!ea~P#C|O#|!qa!Z!qa~P!:}O#|!sa!Z!sa~P!=hORfO![3pO$a3qO~O!Z3uO~Or3vO~P#-]O`$jq!Y$jq'r$jq'p$jq!V$jq!j$jqr$jq![$jq%c$jq!d$jq~P!8dO!V3wO~P#-]O|)zO!P){O(p%POj'ba(o'ba!Y'ba#['ba~Of'ba#|'ba~P%)eO|)zO!P){Oj'da(o'da(p'da!Y'da#['da~Of'da#|'da~P%*WO(h$ZO~P#-]O!X3zO'{%dO!Y'^X!j'^X~O!Y/cO!j(ua~O!Y/cO!d#uO!j(ua~O!Y/cO!d#uO(h'kO!j(ua~Of$wi!Y$wi#[$wi#|$wi~P!0}O!X4SO'{*]O!V'`X!Y'`X~P!1lO!Y/kO!V(va~O!Y/kO!V(va~P#-]O!d#uO#r4[O~On4_O!d#uO(h'kO~O(o$}Oj%Zi|%Zi!P%Zi(p%Zi!Y%Zi#[%Zi~Of%Zi#|%Zi~P%-jO(p%POj%]i|%]i!P%]i(o%]i!Y%]i#[%]i~Of%]i#|%]i~P%.]Of(Vi!Y(Vi~P!0}O#[4fOf(Vi!Y(Vi~P!0}O!j4iO~O`$kq!Y$kq'r$kq'p$kq!V$kq!j$kqr$kq![$kq%c$kq!d$kq~P!8dO!V4mO~O!Y4nO![(wX~P#-]O!i#wO~P4XO`$uX![$uX%W[X'r$uX!Y$uX~P!/tO%W4pO`kXjkX|kX!PkX![kX'rkX(okX(pkX!YkX~O%W4pO~Oa4vO%d4wO'{+hO'}TO(QUO!Y'mX!Z'mX~O!Y0rO!Z)Oa~OZ4{O~O_4|O~O`%kO'r%kO~P#-]O![$|O~P#-]O!Y5UO#[5WO!Z({X~O!Z5XO~Oo!nO!P5YO!_!xO!`!uO!a!uO!{:dO#P!pO#Q!pO#R!pO#S!pO#T!pO#W5_O#X!yO'|!lO'}TO(QUO([!mO(g!sO~O!Z5^O~P%3nOj5dO![1[O%c5cO~Og%VOj5dO![1[O%c5cO~Oa5kO'{#mO'}TO(QUO!Y'lX!Z'lX~O!Y1gO!Z(|a~O'}TO(QUO([5mO~O_5qO~O#r5tO&T5uO~PMnO!j5vO~P%[O`5xO~O`5xO~P%[Oa1}O!Z5}O&c1|O~P`O!d6PO~O!d6ROg(ai!Y(ai!Z(ai!d(ai!k(ai~O!Y#di!Z#di~P#C|O#[6SO!Y#di!Z#di~O!Y!^i!Z!^i~P#C|O`%kO#[6]O'r%kO~O`%kO!d#uO#[6]O'r%kO~O!Y(jq!j(jq`(jq'r(jq~P!8dO!Y(dO!j(iq~O!P%eO![%fO#f6dO'{%dO~O!['ZO%c6gO~Oj6jO!['ZO%c6gO~O#g'baP'baZ'ba`'ban'ba}'ba!h'ba!i'ba!k'ba!o'ba#j'ba#k'ba#l'ba#m'ba#n'ba#o'ba#p'ba#q'ba#r'ba#t'ba#v'ba#x'ba#y'ba'r'ba(X'ba(h'ba!j'ba!V'ba'p'bar'ba!['ba%c'ba!d'ba~P%)eO#g'daP'daZ'da`'dan'da}'da!h'da!i'da!k'da!o'da#j'da#k'da#l'da#m'da#n'da#o'da#p'da#q'da#r'da#t'da#v'da#x'da#y'da'r'da(X'da(h'da!j'da!V'da'p'dar'da!['da%c'da!d'da~P%*WO#g$wiP$wiZ$wi`$win$wi}$wi!Y$wi!h$wi!i$wi!k$wi!o$wi#j$wi#k$wi#l$wi#m$wi#n$wi#o$wi#p$wi#q$wi#r$wi#t$wi#v$wi#x$wi#y$wi'r$wi(X$wi(h$wi!j$wi!V$wi'p$wi#[$wir$wi![$wi%c$wi!d$wi~P#-]O#g%ZiP%ZiZ%Zi`%Zin%Zi}%Zi!h%Zi!i%Zi!k%Zi!o%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#p%Zi#q%Zi#r%Zi#t%Zi#v%Zi#x%Zi#y%Zi'r%Zi(X%Zi(h%Zi!j%Zi!V%Zi'p%Zir%Zi![%Zi%c%Zi!d%Zi~P%-jO#g%]iP%]iZ%]i`%]in%]i}%]i!h%]i!i%]i!k%]i!o%]i#j%]i#k%]i#l%]i#m%]i#n%]i#o%]i#p%]i#q%]i#r%]i#t%]i#v%]i#x%]i#y%]i'r%]i(X%]i(h%]i!j%]i!V%]i'p%]ir%]i![%]i%c%]i!d%]i~P%.]Of'Ra!Y'Ra~P!0}O!Y'Sa!j'Sa~P!8dO!Y.lO!j(ci~O#|#_i!Y#_i!Z#_i~P#C|OP$]O|#yO}#zO!P#{O!i#wO!k#xO!o$]O(XVOZ#iin#ii!h#ii#k#ii#l#ii#m#ii#n#ii#o#ii#p#ii#q#ii#r#ii#t#ii#v#ii#x#ii#y#ii#|#ii(h#ii(o#ii(p#ii!Y#ii!Z#ii~O#j#ii~P%FnO#j:lO~P%FnOP$]O|#yO}#zO!P#{O!i#wO!k#xO!o$]O#j:lO#k:mO#l:mO#m:mO(XVOZ#ii!h#ii#n#ii#o#ii#p#ii#q#ii#r#ii#t#ii#v#ii#x#ii#y#ii#|#ii(h#ii(o#ii(p#ii!Y#ii!Z#ii~On#ii~P%HyOn:nO~P%HyOP$]On:nO|#yO}#zO!P#{O!i#wO!k#xO!o$]O#j:lO#k:mO#l:mO#m:mO#n:oO(XVO#t#ii#v#ii#x#ii#y#ii#|#ii(h#ii(o#ii(p#ii!Y#ii!Z#ii~OZ#ii!h#ii#o#ii#p#ii#q#ii#r#ii~P%KUOZ:zO!h:pO#o:pO#p:pO#q:yO#r:pO~P%KUOP$]OZ:zOn:nO|#yO}#zO!P#{O!h:pO!i#wO!k#xO!o$]O#j:lO#k:mO#l:mO#m:mO#n:oO#o:pO#p:pO#q:yO#r:pO#t:qO(XVO(p#}O#x#ii#y#ii#|#ii(h#ii(o#ii!Y#ii!Z#ii~O#v:sO~P%MpO#v#ii~P%MpOP$]OZ:zOn:nO|#yO}#zO!P#{O!h:pO!i#wO!k#xO!o$]O#j:lO#k:mO#l:mO#m:mO#n:oO#o:pO#p:pO#q:yO#r:pO#t:qO(XVO#x#ii#y#ii#|#ii(h#ii!Y#ii!Z#ii~O#v#ii(o#ii(p#ii~P& {O#v:sO(o#|O(p#}O~P& {OP$]OZ:zOn:nO|#yO}#zO!P#{O!h:pO!i#wO!k#xO!o$]O#j:lO#k:mO#l:mO#m:mO#n:oO#o:pO#p:pO#q:yO#r:pO#t:qO#v:sO#x:uO(XVO(o#|O(p#}O~O#y#ii#|#ii(h#ii!Y#ii!Z#ii~P&$^O`#zy!Y#zy'r#zy'p#zy!V#zy!j#zyr#zy![#zy%c#zy!d#zy~P!8dOj<gO|)zO!P){O(o$}O(p%PO~OP#iiZ#iin#ii}#ii!h#ii!i#ii!k#ii!o#ii#j#ii#k#ii#l#ii#m#ii#n#ii#o#ii#p#ii#q#ii#r#ii#t#ii#v#ii#x#ii#y#ii#|#ii(X#ii(h#ii!Y#ii!Z#ii~P&'UO!i#wOP(WXZ(WXj(WXn(WX|(WX}(WX!P(WX!h(WX!k(WX!o(WX#j(WX#k(WX#l(WX#m(WX#n(WX#o(WX#p(WX#q(WX#r(WX#t(WX#v(WX#x(WX#y(WX#|(WX(X(WX(h(WX(o(WX(p(WX!Y(WX!Z(WX~O#|#}i!Y#}i!Z#}i~P#C|O#|!qi!Z!qi~P$'pO!Z6|O~O!Y']a!Z']a~P#C|O!d#uO(h'kO!Y'^a!j'^a~O!Y/cO!j(ui~O!Y/cO!d#uO!j(ui~Of$wq!Y$wq#[$wq#|$wq~P!0}O!V'`a!Y'`a~P#-]O!d7TO~O!Y/kO!V(vi~P#-]O!Y/kO!V(vi~O!V7XO~O!d#uO#r7^O~On7_O!d#uO(h'kO~O|)zO!P){O(p%POj'ca(o'ca!Y'ca#['ca~Of'ca#|'ca~P&.fO|)zO!P){Oj'ea(o'ea(p'ea!Y'ea#['ea~Of'ea#|'ea~P&/XO!V7aO~Of$yq!Y$yq#[$yq#|$yq~P!0}O`$ky!Y$ky'r$ky'p$ky!V$ky!j$kyr$ky![$ky%c$ky!d$ky~P!8dO!d6RO~O!Y4nO![(wa~O`#_y!Y#_y'r#_y'p#_y!V#_y!j#_yr#_y![#_y%c#_y!d#_y~P!8dOZ7fO~Oa7hO'{+hO'}TO(QUO~O!Y0rO!Z)Oi~O_7lO~O([(xO!Y'iX!Z'iX~O!Y5UO!Z({a~OlkO'{7sO~P.iO!Z7vO~P%3nOo!nO!P7wO'}TO(QUO([!mO(g!sO~O![1[O~O![1[O%c7yO~Oj7|O![1[O%c7yO~OZ8RO!Y'la!Z'la~O!Y1gO!Z(|i~O!j8VO~O!j8WO~O!j8ZO~O!j8ZO~P%[O`8]O~O!d8^O~O!j8_O~O!Y(mi!Z(mi~P#C|O`%kO#[8gO'r%kO~O!Y(jy!j(jy`(jy'r(jy~P!8dO!Y(dO!j(iy~O!['ZO%c8jO~O#g$wqP$wqZ$wq`$wqn$wq}$wq!Y$wq!h$wq!i$wq!k$wq!o$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#p$wq#q$wq#r$wq#t$wq#v$wq#x$wq#y$wq'r$wq(X$wq(h$wq!j$wq!V$wq'p$wq#[$wqr$wq![$wq%c$wq!d$wq~P#-]O#g'caP'caZ'ca`'can'ca}'ca!h'ca!i'ca!k'ca!o'ca#j'ca#k'ca#l'ca#m'ca#n'ca#o'ca#p'ca#q'ca#r'ca#t'ca#v'ca#x'ca#y'ca'r'ca(X'ca(h'ca!j'ca!V'ca'p'car'ca!['ca%c'ca!d'ca~P&.fO#g'eaP'eaZ'ea`'ean'ea}'ea!h'ea!i'ea!k'ea!o'ea#j'ea#k'ea#l'ea#m'ea#n'ea#o'ea#p'ea#q'ea#r'ea#t'ea#v'ea#x'ea#y'ea'r'ea(X'ea(h'ea!j'ea!V'ea'p'ear'ea!['ea%c'ea!d'ea~P&/XO#g$yqP$yqZ$yq`$yqn$yq}$yq!Y$yq!h$yq!i$yq!k$yq!o$yq#j$yq#k$yq#l$yq#m$yq#n$yq#o$yq#p$yq#q$yq#r$yq#t$yq#v$yq#x$yq#y$yq'r$yq(X$yq(h$yq!j$yq!V$yq'p$yq#[$yqr$yq![$yq%c$yq!d$yq~P#-]O!Y'Si!j'Si~P!8dO#|#_q!Y#_q!Z#_q~P#C|O(o$}OP%ZaZ%Zan%Za}%Za!h%Za!i%Za!k%Za!o%Za#j%Za#k%Za#l%Za#m%Za#n%Za#o%Za#p%Za#q%Za#r%Za#t%Za#v%Za#x%Za#y%Za#|%Za(X%Za(h%Za!Y%Za!Z%Za~Oj%Za|%Za!P%Za(p%Za~P&@nO(p%POP%]aZ%]an%]a}%]a!h%]a!i%]a!k%]a!o%]a#j%]a#k%]a#l%]a#m%]a#n%]a#o%]a#p%]a#q%]a#r%]a#t%]a#v%]a#x%]a#y%]a#|%]a(X%]a(h%]a!Y%]a!Z%]a~Oj%]a|%]a!P%]a(o%]a~P&BuOj<gO|)zO!P){O(p%PO~P&@nOj<gO|)zO!P){O(o$}O~P&BuO|0ZO}0ZO!P0[OPyaZyajyanya!hya!iya!kya!oya#jya#kya#lya#mya#nya#oya#pya#qya#rya#tya#vya#xya#yya#|ya(Xya(hya(oya(pya!Yya!Zya~O|)zO!P){OP$naZ$naj$nan$na}$na!h$na!i$na!k$na!o$na#j$na#k$na#l$na#m$na#n$na#o$na#p$na#q$na#r$na#t$na#v$na#x$na#y$na#|$na(X$na(h$na(o$na(p$na!Y$na!Z$na~O|)zO!P){OP$paZ$paj$pan$pa}$pa!h$pa!i$pa!k$pa!o$pa#j$pa#k$pa#l$pa#m$pa#n$pa#o$pa#p$pa#q$pa#r$pa#t$pa#v$pa#x$pa#y$pa#|$pa(X$pa(h$pa(o$pa(p$pa!Y$pa!Z$pa~OP%OaZ%Oan%Oa}%Oa!h%Oa!i%Oa!k%Oa!o%Oa#j%Oa#k%Oa#l%Oa#m%Oa#n%Oa#o%Oa#p%Oa#q%Oa#r%Oa#t%Oa#v%Oa#x%Oa#y%Oa#|%Oa(X%Oa(h%Oa!Y%Oa!Z%Oa~P&'UO#|$jq!Y$jq!Z$jq~P#C|O#|$kq!Y$kq!Z$kq~P#C|O!Z8vO~O#|8wO~P!0}O!d#uO!Y'^i!j'^i~O!d#uO(h'kO!Y'^i!j'^i~O!Y/cO!j(uq~O!V'`i!Y'`i~P#-]O!Y/kO!V(vq~O!V8}O~P#-]O!V8}O~Of(Vy!Y(Vy~P!0}O!Y'ga!['ga~P#-]O`%Vq![%Vq'r%Vq!Y%Vq~P#-]OZ9SO~O!Y0rO!Z)Oq~O#[9WO!Y'ia!Z'ia~O!Y5UO!Z({i~P#C|OP[XZ[Xn[X|[X}[X!P[X!V[X!Y[X!h[X!i[X!k[X!o[X#[[X#geX#j[X#k[X#l[X#m[X#n[X#o[X#p[X#q[X#r[X#t[X#v[X#x[X#y[X$O[X(X[X(h[X(o[X(p[X~O!d%TX#r%TX~P'#`O![1[O%c9[O~O'}TO(QUO([9aO~O!Y1gO!Z(|q~O!j9dO~O!j9eO~O!j9fO~O!j9fO~P%[O#[9iO!Y#dy!Z#dy~O!Y#dy!Z#dy~P#C|O!['ZO%c9nO~O#|#zy!Y#zy!Z#zy~P#C|OP$wiZ$win$wi}$wi!h$wi!i$wi!k$wi!o$wi#j$wi#k$wi#l$wi#m$wi#n$wi#o$wi#p$wi#q$wi#r$wi#t$wi#v$wi#x$wi#y$wi#|$wi(X$wi(h$wi!Y$wi!Z$wi~P&'UO|)zO!P){O(p%POP'baZ'baj'ban'ba}'ba!h'ba!i'ba!k'ba!o'ba#j'ba#k'ba#l'ba#m'ba#n'ba#o'ba#p'ba#q'ba#r'ba#t'ba#v'ba#x'ba#y'ba#|'ba(X'ba(h'ba(o'ba!Y'ba!Z'ba~O|)zO!P){OP'daZ'daj'dan'da}'da!h'da!i'da!k'da!o'da#j'da#k'da#l'da#m'da#n'da#o'da#p'da#q'da#r'da#t'da#v'da#x'da#y'da#|'da(X'da(h'da(o'da(p'da!Y'da!Z'da~O(o$}OP%ZiZ%Zij%Zin%Zi|%Zi}%Zi!P%Zi!h%Zi!i%Zi!k%Zi!o%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#p%Zi#q%Zi#r%Zi#t%Zi#v%Zi#x%Zi#y%Zi#|%Zi(X%Zi(h%Zi(p%Zi!Y%Zi!Z%Zi~O(p%POP%]iZ%]ij%]in%]i|%]i}%]i!P%]i!h%]i!i%]i!k%]i!o%]i#j%]i#k%]i#l%]i#m%]i#n%]i#o%]i#p%]i#q%]i#r%]i#t%]i#v%]i#x%]i#y%]i#|%]i(X%]i(h%]i(o%]i!Y%]i!Z%]i~O#|$ky!Y$ky!Z$ky~P#C|O#|#_y!Y#_y!Z#_y~P#C|O!d#uO!Y'^q!j'^q~O!Y/cO!j(uy~O!V'`q!Y'`q~P#-]O!V9wO~P#-]O!Y0rO!Z)Oy~O!Y5UO!Z({q~O![1[O%c:OO~O!j:RO~O!['ZO%c:WO~OP$wqZ$wqn$wq}$wq!h$wq!i$wq!k$wq!o$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#p$wq#q$wq#r$wq#t$wq#v$wq#x$wq#y$wq#|$wq(X$wq(h$wq!Y$wq!Z$wq~P&'UO|)zO!P){O(p%POP'caZ'caj'can'ca}'ca!h'ca!i'ca!k'ca!o'ca#j'ca#k'ca#l'ca#m'ca#n'ca#o'ca#p'ca#q'ca#r'ca#t'ca#v'ca#x'ca#y'ca#|'ca(X'ca(h'ca(o'ca!Y'ca!Z'ca~O|)zO!P){OP'eaZ'eaj'ean'ea}'ea!h'ea!i'ea!k'ea!o'ea#j'ea#k'ea#l'ea#m'ea#n'ea#o'ea#p'ea#q'ea#r'ea#t'ea#v'ea#x'ea#y'ea#|'ea(X'ea(h'ea(o'ea(p'ea!Y'ea!Z'ea~OP$yqZ$yqn$yq}$yq!h$yq!i$yq!k$yq!o$yq#j$yq#k$yq#l$yq#m$yq#n$yq#o$yq#p$yq#q$yq#r$yq#t$yq#v$yq#x$yq#y$yq#|$yq(X$yq(h$yq!Y$yq!Z$yq~P&'UOf%_!Z!Y%_!Z#[%_!Z#|%_!Z~P!0}O!Y'iq!Z'iq~P#C|O!Y#d!Z!Z#d!Z~P#C|O#g%_!ZP%_!ZZ%_!Z`%_!Zn%_!Z}%_!Z!Y%_!Z!h%_!Z!i%_!Z!k%_!Z!o%_!Z#j%_!Z#k%_!Z#l%_!Z#m%_!Z#n%_!Z#o%_!Z#p%_!Z#q%_!Z#r%_!Z#t%_!Z#v%_!Z#x%_!Z#y%_!Z'r%_!Z(X%_!Z(h%_!Z!j%_!Z!V%_!Z'p%_!Z#[%_!Zr%_!Z![%_!Z%c%_!Z!d%_!Z~P#-]OP%_!ZZ%_!Zn%_!Z}%_!Z!h%_!Z!i%_!Z!k%_!Z!o%_!Z#j%_!Z#k%_!Z#l%_!Z#m%_!Z#n%_!Z#o%_!Z#p%_!Z#q%_!Z#r%_!Z#t%_!Z#v%_!Z#x%_!Z#y%_!Z#|%_!Z(X%_!Z(h%_!Z!Y%_!Z!Z%_!Z~P&'UOr(]X~P1qO'|!lO~P!*fO!VeX!YeX#[eX~P'#`OP[XZ[Xn[X|[X}[X!P[X!Y[X!YeX!h[X!i[X!k[X!o[X#[[X#[eX#geX#j[X#k[X#l[X#m[X#n[X#o[X#p[X#q[X#r[X#t[X#v[X#x[X#y[X$O[X(X[X(h[X(o[X(p[X~O!deX!j[X!jeX(heX~P'ASOP:cOQ:cORfOc<[Od!iOlkOn:cOokOpkOvkOx:cOz:cO!PWO!TkO!UkO![XO!f:fO!kZO!n:cO!o:cO!p:cO!r:gO!t:jO!w!hO$T!kO'{)YO'}TO(QUO(XVO(g[O(t<YO~O!Y:wO!Z$ma~Og%VOl%WOn$tOo$sOp$sOv%XOx%YOz;RO!P${O![$|O!f<aO!k$xO#f;XO$T%^O$o;TO$q;VO$t%_O'{(pO'}TO(QUO(X$uO(o$}O(p%PO~O#s)aO~P'ExO!Z[X!ZeX~P'ASO#g:kO~O!d#uO#g:kO~O#[:{O~O#r:pO~O#[;ZO!Y(mX!Z(mX~O#[:{O!Y(kX!Z(kX~O#g;[O~Of;^O~P!0}O#g;cO~O#g;dO~O!d#uO#g;eO~O!d#uO#g;[O~O#|;fO~P#C|O#g;gO~O#g;hO~O#g;mO~O#g;nO~O#g;oO~O#g;pO~O#|;qO~P!0}O#|;rO~P!0}O!i#P#Q#S#T#W#e#f#q(t$o$q$t%W%b%c%d%k%m%p%q%s%u~'vS#k!U't'|#lo#j#mn|'u$Y'u'{$[([~",
  goto: "$2p)SPPPPP)TPP)WP)iP*x.|PPPP5pPP6WPP<S?gP?zP?zPPP?zPAxP?zP?zP?zPA|PPBRPBlPGdPPPGhPPPPGhJiPPPJoKjPGhPMxPPPP!!WGhPPPGhPGhP!$fGhP!'z!(|!)VP!)y!)}!)yPPPPP!-Y!(|PP!-v!.pP!1dGhGh!1i!4s!9Y!9Y!=OPPP!=VGhPPPPPPPPPPP!@dP!AqPPGh!CSPGhPGhGhGhGhPGh!DfP!GnP!JrP!Jv!KQ!KU!KUP!GkP!KY!KYP!N^P!NbGhGh!Nh##k?zP?zP?z?zP#$v?z?z#'O?z#)k?z#+m?z?z#,[#.f#.f#.j#.r#.f#.zP#.fP?z#/d?z#3R?z?z5pPPP#6vPPP#7a#7aP#7aP#7w#7aPP#7}P#7tP#7t#8b#7t#8|#9S5m)W#9V)WP#9^#9^#9^P)WP)WP)WP)WPP)WP#9d#9gP#9g)WP#9kP#9nP)WP)WP)WP)WP)WP)W)WPP#9t#9z#:V#:]#:c#:i#:o#:}#;T#;Z#;e#;k#;u#<U#<[#<|#=`#=f#=l#=z#>a#@O#@^#@d#Ax#BW#Cr#DQ#DW#D^#Dd#Dn#Dt#Dz#EU#Eh#EnPPPPPPPPPP#EtPPPPPPP#Fi#Ip#KP#KW#K`PPPP$!d$%Z$+r$+u$+x$,q$,t$,w$-O$-WPP$-^$-b$.Y$/X$/]$/qPP$/u$/{$0PP$0S$0W$0Z$1P$1h$2P$2T$2W$2Z$2a$2d$2h$2lR!{RoqOXst!Z#c%j&m&o&p&r,h,m1w1zY!uQ'Z-Y1[5]Q%pvQ%xyQ&P|Q&e!VS'R!e-QQ'a!iS'g!r!xS*c$|*hQ+f%yQ+s&RQ,X&_Q-W'YQ-b'bQ-j'hQ/|*jQ1f,YR;Y:g%OdOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&m&o&p&r&v'O']'m'}(P(V(^(r(v(z)y+O+S,e,h,m-^-f-t-z.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3Z5Y5d5t5u5x6]7w7|8]8gS#p]:d!r)[$[$m'S)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]Q*u%ZQ+k%{Q,Z&bQ,b&jQ.c;QQ0h+^Q0l+`Q0w+lQ1n,`Q2{.[Q4v0rQ5k1gQ6i3PQ6u;RQ7h4wR8m6j&|kOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]t!nQ!r!u!x!y'R'Y'Z'g'h'i-Q-W-Y-j1[5]5_$v$si#u#w$c$d$x${%O%Q%[%]%a)u){)}*P*R*Y*`*p*q+]+`+w+z.Z.i/Z/j/k/m0Q0S0^1R1U1^3O3x4S4[4f4n4p5c6g7T7^7y8j8w9[9n:O:W:y:z:|:};O;P;S;T;U;V;W;X;_;`;a;b;c;d;g;h;i;j;k;l;m;n;q;r<Y<b<c<f<gQ&S|Q'P!eS'V%f-TQ+k%{Q,Z&bQ0]*yQ0w+lQ0|+rQ1m,_Q1n,`Q4v0rQ5P1OQ5k1gQ5n1iQ5o1lQ7h4wQ7k4|Q8U5qQ9V7lR9b8RrnOXst!V!Z#c%j&d&m&o&p&r,h,m1w1zR,]&f&v^OPXYstuvwz!Z!`!g!j!o#R#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m%j%p%}&f&i&j&m&o&p&r&v'O']'m(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<[<][#[WZ#V#Y'S'}!S%gm#g#h#k%b%e(W(b(c(d+Q+R+T,d,z-x.O.P.Q.S2P2w2x6R6dQ%sxQ%wyS%||&RQ&Y!TQ'^!hQ'`!iQ(k#rS*V$x*ZS+e%x%yQ+i%{Q,S&]Q,W&_S-a'a'bQ.^(lQ/g*WQ0p+fQ0v+lQ0x+mQ0{+qQ1a,TS1e,X,YQ2i-bQ3y/cQ4u0rQ4y0uQ5O0}Q5j1fQ7Q3zQ7g4wQ7j4{Q9R7fR9y9S!O$zi#w%O%Q%[%]%a)}*P*Y*p*q.i/j0Q0S0^3x4f8w<Y<b<c!S%uy!i!t%w%x%y'Q'`'a'b'f'p*b+e+f,}-a-b-i/t0p2b2i2p4^Q+_%sQ+x&VQ+{&WQ,V&_Q.](kQ1`,SU1d,W,X,YQ3Q.^Q5e1aS5i1e1fQ8Q5j#W<^#u$c$d$x${)u){*R*`+]+`+w+z.Z/Z/k/m1R1U1^3O4S4[4n4p5c6g7T7^7y8j9[9n:O:W:|;O;S;U;W;_;a;c;g;i;k;m;q<f<go<_:y:z:};P;T;V;X;`;b;d;h;j;l;n;rW%Ti%V*r<YS&V!Q&dQ&W!RQ&X!SR+v&T$w%Si#u#w$c$d$x${%O%Q%[%]%a)u){)}*P*R*Y*`*p*q+]+`+w+z.Z.i/Z/j/k/m0Q0S0^1R1U1^3O3x4S4[4f4n4p5c6g7T7^7y8j8w9[9n:O:W:y:z:|:};O;P;S;T;U;V;W;X;_;`;a;b;c;d;g;h;i;j;k;l;m;n;q;r<Y<b<c<f<gT)v$u)wV*v%Z;Q;RU'V!e%f-TS(y#y#zQ+p&OS.V(g(hQ1V+|Q4g0ZR7p5U&|kOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]$i$`c#X#d%n%o%q'|(S(n(u(})O)P)Q)R)S)T)U)V)W)X)Z)^)b)l+Z+o-O-m-r-w-y.h.n.r.t.u.v/V0_2W2Z2k2r3Y3_3`3a3b3c3d3e3f3g3h3i3j3k3n3o3t4k4s6U6[6a6o6p6y6z7r8a8e8n8t8u9k9{:S:e<PT#SV#T&}kOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]Q'T!eR2^-Qv!nQ!e!r!u!x!y'R'Y'Z'g'h'i-Q-W-Y-j1[5]5_S*b$|*hS/t*c*jQ/}*kQ1X,OQ4^/|R4a0PnqOXst!Z#c%j&m&o&p&r,h,m1w1zQ&t!^Q'q!wS(m#t:kQ+c%vQ,Q&YQ,R&[Q-_'_Q-l'jS.g(r;[S0`+O;eQ0n+dQ1Z,PQ2O,oQ2Q,pQ2Y,{Q2g-`Q2j-dS4l0a;oQ4q0oS4t0q;pQ6T2[Q6X2hQ6^2oQ7e4rQ8b6VQ8c6YQ8f6_R9h8_$d$_c#X#d%o%q'|(S(n(u(})O)P)Q)R)S)T)U)V)W)X)Z)^)b)l+Z+o-O-m-r-w-y.h.n.r.u.v/V0_2W2Z2k2r3Y3_3`3a3b3c3d3e3f3g3h3i3j3k3n3o3t4k4s6U6[6a6o6p6y6z7r8a8e8n8t8u9k9{:S:e<PS(j#o'dU*o%R(q3mS+Y%n.tQ2|0hQ6f2{Q8l6iR9o8m$d$^c#X#d%o%q'|(S(n(u(})O)P)Q)R)S)T)U)V)W)X)Z)^)b)l+Z+o-O-m-r-w-y.h.n.r.u.v/V0_2W2Z2k2r3Y3_3`3a3b3c3d3e3f3g3h3i3j3k3n3o3t4k4s6U6[6a6o6p6y6z7r8a8e8n8t8u9k9{:S:e<PS(i#o'dS({#z$_S+X%n.tS.W(h(jQ.w)]Q0e+YR2y.X&|kOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]S#p]:dQ&o!XQ&p!YQ&r![Q&s!]R1v,kQ'[!hQ+[%sQ-]'^S.Y(k+_Q2e-[W2}.].^0g0iQ6W2fU6e2z2|3QS8i6f6hS9m8k8lS:U9l9oQ:^:VR:a:_U!vQ'Z-YT5Z1[5]!Q_OXZ`st!V!Z#c#g%b%j&d&f&m&o&p&r(d,h,m.P1w1z]!pQ!r'Z-Y1[5]T#p]:d%Y{OPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&j&m&o&p&r&v'O']'m'}(P(V(^(r(v(z)y+O+S+^,e,h,m-^-f-t-z.[.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3P3Z5Y5d5t5u5x6]6j7w7|8]8gS(y#y#zS.V(g(h!s;v$[$m'S)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]Y!tQ'Z-Y1[5]Q'f!rS'p!u!xS'r!y5_S-i'g'hQ-k'iR2p-jQ'o!tS(`#f1qS-h'f'rQ/f*VQ/r*bQ2q-kQ4O/gS4X/s/}Q7P3yS7[4_4aQ8y7QR9Q7_Q#vbQ'n!tS(_#f1qS(a#l*}Q+P%cQ+a%tQ+g%zU-g'f'o'rQ-{(`Q/e*VQ/q*bQ/w*eQ0m+bQ1b,US2n-h-kQ2v.TS3}/f/gS4W/r/}Q4Z/vQ4]/xQ5g1cQ6`2qQ7O3yQ7S4OS7W4X4aQ7]4`Q8O5hS8x7P7QQ8|7XQ9O7[Q9_8PQ9u8yQ9v8}Q9x9QQ:Q9`Q:Y9wQ;y;tQ<U;}R<V<OV!vQ'Z-Y%YaOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&j&m&o&p&r&v'O']'m'}(P(V(^(r(v(z)y+O+S+^,e,h,m-^-f-t-z.[.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3P3Z5Y5d5t5u5x6]6j7w7|8]8gS#vz!j!r;s$[$m'S)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]R;y<[%YbOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&j&m&o&p&r&v'O']'m'}(P(V(^(r(v(z)y+O+S+^,e,h,m-^-f-t-z.[.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3P3Z5Y5d5t5u5x6]6j7w7|8]8gQ%cj!S%ty!i!t%w%x%y'Q'`'a'b'f'p*b+e+f,}-a-b-i/t0p2b2i2p4^S%zz!jQ+b%uQ,U&_W1c,V,W,X,YU5h1d1e1fS8P5i5jQ9`8Q!r;t$[$m'S)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]Q;}<ZR<O<[$|eOPXYstuvw!Z!`!g!o#R#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&m&o&p&r&v'O']'m(P(V(^(r(v(z)y+O+S+^,e,h,m-^-f-t-z.[.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3P3Z5Y5d5t5u5x6]6j7w7|8]8gY#aWZ#V#Y'}!S%gm#g#h#k%b%e(W(b(c(d+Q+R+T,d,z-x.O.P.Q.S2P2w2x6R6dQ,c&j!p;u$[$m)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]R;x'SS'W!e%fR2`-T%OdOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&m&o&p&r&v'O']'m'}(P(V(^(r(v(z)y+O+S,e,h,m-^-f-t-z.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3Z5Y5d5t5u5x6]7w7|8]8g!r)[$[$m'S)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]Q,b&jQ0h+^Q2{.[Q6i3PR8m6j!b$Uc#X%n'|(S(n(u)W)X)^)b+o-m-r-w-y.h.n/V0_2k2r3Y3k4k4s6[6a6o8e9k:e!P:r)Z)l-O.t2W2Z3_3i3j3n3t6U6p6y6z7r8a8n8t8u9{:S<P!f$Wc#X%n'|(S(n(u)T)U)W)X)^)b+o-m-r-w-y.h.n/V0_2k2r3Y3k4k4s6[6a6o8e9k:e!T:t)Z)l-O.t2W2Z3_3f3g3i3j3n3t6U6p6y6z7r8a8n8t8u9{:S<P!^$[c#X%n'|(S(n(u)^)b+o-m-r-w-y.h.n/V0_2k2r3Y3k4k4s6[6a6o8e9k:eQ3x/az<])Z)l-O.t2W2Z3_3n3t6U6p6y6z7r8a8n8t8u9{:S<PQ<b<dR<c<e&|kOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]S$nh$oR3q.z'TgOPWXYZhstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m$o%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.z.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]T$jf$pQ$hfS)e$k)iR)q$pT$if$pT)g$k)i'ThOPWXYZhstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$[$a$e$m$o%j%p%}&f&i&j&m&o&p&r&v'O'S']'m'}(P(V(^(r(v(z)n)y+O+S+^,e,h,m,y,|-^-f-t-z.[.l.s.z.{0[0a0q1_1o1p1r1t1w1z1|2]2m2s3P3Z3p5W5Y5d5t5u5x6S6]6j7w7|8]8g9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]T$nh$oQ$qhR)p$o%YjOPWXYZstuvw!Z!`!g!o#R#V#Y#c#n#t#x#{$O$P$Q$R$S$T$U$V$W$X$Y$a$e%j%p%}&f&i&j&m&o&p&r&v'O']'m'}(P(V(^(r(v(z)y+O+S+^,e,h,m-^-f-t-z.[.l.s0[0a0q1_1o1p1r1t1w1z1|2m2s3P3Z5Y5d5t5u5x6]6j7w7|8]8g!s<Z$[$m'S)n,y,|.{2]3p5W6S9W9i:c:f:g:j:k:l:m:n:o:p:q:r:s:t:u:v:w:{;Y;Z;[;^;e;f;o;p<]#clOPXZst!Z!`!o#R#c#n#{$m%j&f&i&j&m&o&p&r&v'O'](z)n+S+^,e,h,m-^.[.{0[1_1o1p1r1t1w1z1|3P3p5Y5d5t5u5x6j7w7|8]!O%Ri#w%O%Q%[%]%a)}*P*Y*p*q.i/j0Q0S0^3x4f8w<Y<b<c#W(q#u$c$d$x${)u){*R*`+]+`+w+z.Z/Z/k/m1R1U1^3O4S4[4n4p5c6g7T7^7y8j9[9n:O:W:|;O;S;U;W;_;a;c;g;i;k;m;q<f<gQ*z%_Q/W)zo3m:y:z:};P;T;V;X;`;b;d;h;j;l;n;r!O$yi#w%O%Q%[%]%a)}*P*Y*p*q.i/j0Q0S0^3x4f8w<Y<b<cQ*[$zS*e$|*hQ*{%`Q/x*f#W;{#u$c$d$x${)u){*R*`+]+`+w+z.Z/Z/k/m1R1U1^3O4S4[4n4p5c6g7T7^7y8j9[9n:O:W:|;O;S;U;W;_;a;c;g;i;k;m;q<f<gn;|:y:z:};P;T;V;X;`;b;d;h;j;l;n;rQ<Q<^Q<R<_Q<S<`R<T<a!O%Ri#w%O%Q%[%]%a)}*P*Y*p*q.i/j0Q0S0^3x4f8w<Y<b<c#W(q#u$c$d$x${)u){*R*`+]+`+w+z.Z/Z/k/m1R1U1^3O4S4[4n4p5c6g7T7^7y8j9[9n:O:W:|;O;S;U;W;_;a;c;g;i;k;m;q<f<go3m:y:z:};P;T;V;X;`;b;d;h;j;l;n;rnoOXst!Z#c%j&m&o&p&r,h,m1w1zQ*_${Q,v&yQ,w&{R4R/k$v%Si#u#w$c$d$x${%O%Q%[%]%a)u){)}*P*R*Y*`*p*q+]+`+w+z.Z.i/Z/j/k/m0Q0S0^1R1U1^3O3x4S4[4f4n4p5c6g7T7^7y8j8w9[9n:O:W:y:z:|:};O;P;S;T;U;V;W;X;_;`;a;b;c;d;g;h;i;j;k;l;m;n;q;r<Y<b<c<f<gQ+y&WQ1T+{Q5S1SR7o5TT*g$|*hS*g$|*hT5[1[5]S/v*d5YT4`0O7wQ+a%tQ/w*eQ0m+bQ1b,UQ5g1cQ8O5hQ9_8PR:Q9`!O%Oi#w%O%Q%[%]%a)}*P*Y*p*q.i/j0Q0S0^3x4f8w<Y<b<cr)}$v(s*O*n*|/i0U0V3W4P4j6}7`9t;z<W<XS0Q*m0R#W:|#u$c$d$x${)u){*R*`+]+`+w+z.Z/Z/k/m1R1U1^3O4S4[4n4p5c6g7T7^7y8j9[9n:O:W:|;O;S;U;W;_;a;c;g;i;k;m;q<f<gn:}:y:z:};P;T;V;X;`;b;d;h;j;l;n;r!^;_(o)`*U*^._.b.f/S/X/a/n0f1Q1S3T4Q4U5R5T6k6n7U7Y7b7d8{9P:X<d<e`;`3l6q6t6x8o9p9s:bS;i.a3UT;j6s8r!O%Qi#w%O%Q%[%]%a)}*P*Y*p*q.i/j0Q0S0^3x4f8w<Y<b<cv*P$v(s*Q*m*|/]/i0U0V3W4P4b4j6}7`9t;z<W<XS0S*n0T#W;O#u$c$d$x${)u){*R*`+]+`+w+z.Z/Z/k/m1R1U1^3O4S4[4n4p5c6g7T7^7y8j9[9n:O:W:|;O;S;U;W;_;a;c;g;i;k;m;q<f<gn;P:y:z:};P;T;V;X;`;b;d;h;j;l;n;r!b;a(o)`*U*^.`.a.f/S/X/a/n0f1Q1S3R3T4Q4U5R5T6k6l6n7U7Y7b7d8{9P:X<d<ed;b3l6r6s6x8o8p9p9q9s:bS;k.b3VT;l6t8srnOXst!V!Z#c%j&d&m&o&p&r,h,m1w1zQ&a!UR,e&jrnOXst!V!Z#c%j&d&m&o&p&r,h,m1w1zR&a!UQ+}&XR1P+vsnOXst!V!Z#c%j&d&m&o&p&r,h,m1w1zQ1],SS5b1`1aU7x5`5a5eS9Z7z7{S9|9Y9]Q:Z9}R:`:[Q&h!VR,^&dR5n1iS%||&RR0x+mQ&m!WR,h&nR,n&sT1x,m1zR,r&tQ,q&tR2R,rQ't!zR-n'tSsOtQ#cXT%ms#cQ!}TR'v!}Q#QUR'x#QQ)w$uR/T)wQ#TVR'z#TQ#WWU(Q#W(R-uQ(R#XR-u(SQ-R'TR2_-RQ.j(sR3X.jQ.m(uS3[.m3]R3].nQ-Y'ZR2c-YY!rQ'Z-Y1[5]R'e!rS#^W%eU(X#^(Y-vQ(Y#_R-v(TQ-U'WR2a-Ut`OXst!V!Z#c%j&d&f&m&o&p&r,h,m1w1zS#gZ%bU#q`#g.PR.P(dQ(e#iQ-|(aW.U(e-|2t6bQ2t-}R6b2uQ)i$kR.|)iQ$ohR)o$oQ$bcU)_$b-q:xQ-q:eR:x)lQ/d*VW3{/d3|7R8zU3|/e/f/gS7R3}4OR8z7S$X)|$v(o(s)`*U*^*m*n*w*x*|.a.b.d.e.f/S/X/]/_/a/i/n0U0V0f1Q1S3R3S3T3W3l4P4Q4U4b4d4j5R5T6k6l6m6n6s6t6v6w6x6}7U7Y7`7b7d8o8p8q8{9P9p9q9r9s9t:X:b;z<W<X<d<eQ/l*^U4T/l4V7VQ4V/nR7V4UQ*h$|R/z*hr*O$v(s*m*n*|/i0U0V3W4P4j6}7`9t;z<W<X!^._(o)`*U*^.a.b.f/S/X/a/n0f1Q1S3T4Q4U5R5T6k6n7U7Y7b7d8{9P:X<d<eU/^*O._6qa6q3l6s6t6x8o9p9s:bQ0R*mQ3U.aU4c0R3U8rR8r6sv*Q$v(s*m*n*|/]/i0U0V3W4P4b4j6}7`9t;z<W<X!b.`(o)`*U*^.a.b.f/S/X/a/n0f1Q1S3R3T4Q4U5R5T6k6l6n7U7Y7b7d8{9P:X<d<eU/`*Q.`6re6r3l6s6t6x8o8p9p9q9s:bQ0T*nQ3V.bU4e0T3V8sR8s6tQ*s%UR0X*sQ4o0fR7c4oQ+U%hR0d+UQ5V1VS7q5V9XR9X7rQ,P&YR1Y,PQ5]1[R7u5]Q1h,ZS5l1h8SR8S5nQ0s+iW4x0s4z7i9TQ4z0vQ7i4yR9T7jQ+n%|R0y+nQ1z,mR5|1zYrOXst#cQ&q!ZQ+W%jQ,g&mQ,i&oQ,j&pQ,l&rQ1u,hS1x,m1zR5{1wQ%lpQ&u!_Q&x!aQ&z!bQ&|!cQ'l!tQ+V%iQ+c%vQ+u&SQ,]&hQ,t&wW-e'f'n'o'rQ-l'jQ/y*gQ0n+dS1k,^,aQ2S,sQ2T,vQ2U,wQ2j-dW2l-g-h-k-mQ4q0oQ4}0|Q5Q1QQ5f1bQ5p1mQ5z1vU6Z2k2n2qQ6^2oQ7e4rQ7m5PQ7n5RQ7t5[Q7}5gQ8T5oS8d6[6`Q8f6_Q9U7kQ9^8OQ9c8UQ9j8eQ9z9VQ:P9_Q:T9kR:]:QQ%vyQ'_!iQ'j!tU+d%w%x%yQ,{'QU-`'`'a'bS-d'f'pQ/p*bS0o+e+fQ2[,}S2h-a-bQ2o-iQ4Y/tQ4r0pQ6V2bQ6Y2iQ6_2pR7Z4^S$wi<YR*t%VU%Ui%V<YR0W*rQ$viS(o#u+`Q(s#wS)`$c$dQ*U$xQ*^${Q*m%OQ*n%QQ*w%[Q*x%]Q*|%aQ.a:|Q.b;OQ.d;SQ.e;UQ.f;WQ/S)uS/X){/ZQ/])}Q/_*PQ/a*RQ/i*YQ/n*`Q0U*pQ0V*qh0f+].Z1^3O5c6g7y8j9[9n:O:WQ1Q+wQ1S+zQ3R;_Q3S;aQ3T;cQ3W.iS3l:y:zQ4P/jQ4Q/kQ4U/mQ4b0QQ4d0SQ4j0^Q5R1RQ5T1UQ6k;gQ6l;iQ6m;kQ6n;mQ6s:}Q6t;PQ6v;TQ6w;VQ6x;XQ6}3xQ7U4SQ7Y4[Q7`4fQ7b4nQ7d4pQ8o;dQ8p;`Q8q;bQ8{7TQ9P7^Q9p;hQ9q;jQ9r;lQ9s;nQ9t8wQ:X;qQ:b;rQ;z<YQ<W<bQ<X<cQ<d<fR<e<gnpOXst!Z#c%j&m&o&p&r,h,m1w1zQ!fPS#eZ#nQ&w!`U'c!o5Y7wQ'y#RQ(|#{Q)m$mS,a&f&iQ,f&jQ,s&vQ,x'OQ-[']Q.p(zQ/Q)nQ0b+SQ0i+^Q1s,eQ2f-^Q2|.[Q3s.{Q4h0[Q5a1_Q5r1oQ5s1pQ5w1rQ5y1tQ6O1|Q6f3PQ6{3pQ7{5dQ8X5tQ8Y5uQ8[5xQ8l6jQ9]7|R9g8]#WcOPXZst!Z!`!o#c#n#{%j&f&i&j&m&o&p&r&v'O'](z+S+^,e,h,m-^.[0[1_1o1p1r1t1w1z1|3P5Y5d5t5u5x6j7w7|8]Q#XWQ#dYQ%nuQ%ovS%qw!gS'|#V(PQ(S#YQ(n#tQ(u#xQ(}$OQ)O$PQ)P$QQ)Q$RQ)R$SQ)S$TQ)T$UQ)U$VQ)V$WQ)W$XQ)X$YQ)Z$[Q)^$aQ)b$eW)l$m)n.{3pQ+Z%pQ+o%}S-O'S2]Q-m'mS-r'}-tQ-w(VQ-y(^Q.h(rQ.n(vQ.r:cQ.t:fQ.u:gQ.v:jQ/V)yQ0_+OQ2W,yQ2Z,|Q2k-fQ2r-zQ3Y.lQ3_:kQ3`:lQ3a:mQ3b:nQ3c:oQ3d:pQ3e:qQ3f:rQ3g:sQ3h:tQ3i:uQ3j:vQ3k.sQ3n:{Q3o;YQ3t:wQ4k0aQ4s0qQ6U;ZQ6[2mQ6a2sQ6o3ZQ6p;[Q6y;^Q6z;eQ7r5WQ8a6SQ8e6]Q8n;fQ8t;oQ8u;pQ9k8gQ9{9WQ:S9iQ:e#RR<P<]R#ZWR'U!eY!tQ'Z-Y1[5]S'Q!e-QQ'f!rS'p!u!xS'r!y5_S,}'R'YS-i'g'hQ-k'iQ2b-WR2p-jR(t#wR(w#xQ!fQT-X'Z-Y]!qQ!r'Z-Y1[5]Q#o]R'd:dT#jZ%bS#iZ%bS%hm,dU(a#g#h#kS-}(b(cQ.R(dQ0c+TQ2u.OU2v.P.Q.SS6c2w2xR8h6d`#]W#V#Y%e'}(W+Q-xr#fZm#g#h#k%b(b(c(d+T.O.P.Q.S2w2x6dQ1q,dQ2X,zQ6Q2PQ8`6RT;w'S+RT#`W%eS#_W%eS(O#V(WS(T#Y+QS-P'S+RT-s'}-xT'X!e%fQ$kfR)s$pT)h$k)iR3r.zT*X$x*ZR*a${Q0g+]Q2z.ZQ5`1^Q6h3OQ7z5cQ8k6gQ9Y7yQ9l8jQ9}9[Q:V9nQ:[:OR:_:WnqOXst!Z#c%j&m&o&p&r,h,m1w1zQ&g!VR,]&dtmOXst!U!V!Z#c%j&d&m&o&p&r,h,m1w1zR,d&jT%im,dR1W+|R,[&bQ&Q|R+t&RR+j%{T&k!W&nT&l!W&nT1y,m1z",
  nodeNames: "\u26A0 ArithOp ArithOp JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 371,
  context: trackNewline,
  nodeProps: [
    ["isolate", -8, 4, 5, 13, 33, 35, 48, 50, 52, ""],
    ["group", -26, 8, 16, 18, 65, 201, 205, 209, 210, 212, 215, 218, 228, 230, 236, 238, 240, 242, 245, 251, 257, 259, 261, 263, 265, 267, 268, "Statement", -32, 12, 13, 28, 31, 32, 38, 48, 51, 52, 54, 59, 67, 75, 79, 81, 83, 84, 106, 107, 116, 117, 134, 137, 139, 140, 141, 142, 144, 145, 164, 165, 167, "Expression", -23, 27, 29, 33, 37, 39, 41, 168, 170, 172, 173, 175, 176, 177, 179, 180, 181, 183, 184, 185, 195, 197, 199, 200, "Type", -3, 87, 99, 105, "ClassItem"],
    ["openedBy", 22, "<", 34, "InterpolationStart", 53, "[", 57, "{", 72, "(", 157, "JSXStartCloseTag"],
    ["closedBy", 23, ">", 36, "InterpolationEnd", 47, "]", 58, "}", 73, ")", 162, "JSXEndTag"]
  ],
  propSources: [jsHighlight],
  skippedNodes: [0, 4, 5, 271],
  repeatNodeCount: 37,
  tokenData: "$Fj(CSR!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#8g!R![#:v![!]#Gv!]!^#IS!^!_#J^!_!`#Ns!`!a$#_!a!b$(l!b!c$,k!c!}Er!}#O$-u#O#P$/P#P#Q$4h#Q#R$5r#R#SEr#S#T$7P#T#o$8Z#o#p$<k#p#q$=a#q#r$>q#r#s$?}#s$f%Z$f$g+g$g#BYEr#BY#BZ$AX#BZ$ISEr$IS$I_$AX$I_$I|Er$I|$I}$Dd$I}$JO$Dd$JO$JTEr$JT$JU$AX$JU$KVEr$KV$KW$AX$KW&FUEr&FU&FV$AX&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$AX?HUOEr(n%d_$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$f&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$f&j(R!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(R!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$f&j(OpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(OpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Op(R!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z(CS+rq$f&j(Op(R!b't(;dOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z(CS.ST(P#S$f&j'u(;dO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c(CS.n_$f&j(Op(R!b'u(;dOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`/x`$f&j!o$Ip(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S1V`#t$Id$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S2d_#t$Id$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/|3l_'}$(n$f&j(R!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$f&j(R!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$f&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$a`$f&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$a``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$a`$f&j(R!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(R!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$a`(R!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k#%|:hh$f&j(Op(R!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__VS$f&j(Op(R!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]VS$f&j(R!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXVS$f&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSVSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWVS(R!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]VS$f&j(OpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWVS(OpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYVS(Op(R!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S#%|C}i$f&j(g!L^(Op(R!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr#%|EoP;=`<%lCr(CSFRk$f&j(Op(R!b$Y#t'{&;d([!LYOY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$f&j(Op(R!b$Y#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv(CSJPP;=`<%lEr%#SJ_`$f&j(Op(R!b#l$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SKl_$f&j$O$Id(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&COLva(p&;`$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SNW`$f&j#x$Id(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/|! c_(Q$)`$f&j(OpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$f&j(OpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$f&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$a`$f&j(OpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(OpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$a`(OpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b(*Q!'t_!k(!b$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'l!)O_!jM|$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h!*[b$f&j(Op(R!b'|#)d#m$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S!+o`$f&j(Op(R!b#j$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&-O!,|`$f&j(Op(R!bn&%`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&C[!.Z_!Y&;l$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!/ec$f&j(Op(R!b|'<nOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!0ya$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!2Z_!XMt$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!3eg$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!5Vg$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!6wc$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!8_c$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!9uf$f&j(Op(R!b#k$IdOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Kpxz!;Zz{#,f{!P!;Z!P!Q#-{!Q!^!;Z!^!_#'Z!_!`#5k!`!a#7Q!a!}!;Z!}#O#*}#O#P!Dj#P#o!;Z#o#p#'Z#p;'S!;Z;'S;=`#,`<%lO!;Z(r!;fb$f&j(Op(R!b!USOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Kpx!P!;Z!P!Q#%Z!Q!^!;Z!^!_#'Z!_!}!;Z!}#O#*}#O#P!Dj#P#o!;Z#o#p#'Z#p;'S!;Z;'S;=`#,`<%lO!;Z(Q!<w`$f&j(R!b!USOY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eb!Q!^!<n!^!_!GY!_!}!<n!}#O!Ja#O#P!Dj#P#o!<n#o#p!GY#p;'S!<n;'S;=`!Kj<%lO!<n&n!>Q^$f&j!USOY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@Y!_!}!=y!}#O!Bw#O#P!Dj#P#o!=y#o#p!@Y#p;'S!=y;'S;=`!E[<%lO!=y&n!?Ta$f&j!USO!^&c!_#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&cS!@_X!USOY!@YZ!P!@Y!P!Q!@z!Q!}!@Y!}#O!Ac#O#P!Bb#P;'S!@Y;'S;=`!Bq<%lO!@YS!APU!US#Z#[!@z#]#^!@z#a#b!@z#g#h!@z#i#j!@z#m#n!@zS!AfVOY!AcZ#O!Ac#O#P!A{#P#Q!@Y#Q;'S!Ac;'S;=`!B[<%lO!AcS!BOSOY!AcZ;'S!Ac;'S;=`!B[<%lO!AcS!B_P;=`<%l!AcS!BeSOY!@YZ;'S!@Y;'S;=`!Bq<%lO!@YS!BtP;=`<%l!@Y&n!B|[$f&jOY!BwYZ&cZ!^!Bw!^!_!Ac!_#O!Bw#O#P!Cr#P#Q!=y#Q#o!Bw#o#p!Ac#p;'S!Bw;'S;=`!Dd<%lO!Bw&n!CwX$f&jOY!BwYZ&cZ!^!Bw!^!_!Ac!_#o!Bw#o#p!Ac#p;'S!Bw;'S;=`!Dd<%lO!Bw&n!DgP;=`<%l!Bw&n!DoX$f&jOY!=yYZ&cZ!^!=y!^!_!@Y!_#o!=y#o#p!@Y#p;'S!=y;'S;=`!E[<%lO!=y&n!E_P;=`<%l!=y(Q!Eki$f&j(R!b!USOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#Z&}#Z#[!Eb#[#]&}#]#^!Eb#^#a&}#a#b!Eb#b#g&}#g#h!Eb#h#i&}#i#j!Eb#j#m&}#m#n!Eb#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!f!GaZ(R!b!USOY!GYZw!GYwx!@Yx!P!GY!P!Q!HS!Q!}!GY!}#O!Ic#O#P!Bb#P;'S!GY;'S;=`!JZ<%lO!GY!f!HZb(R!b!USOY'}Zw'}x#O'}#P#Z'}#Z#[!HS#[#]'}#]#^!HS#^#a'}#a#b!HS#b#g'}#g#h!HS#h#i'}#i#j!HS#j#m'}#m#n!HS#n;'S'};'S;=`(f<%lO'}!f!IhX(R!bOY!IcZw!Icwx!Acx#O!Ic#O#P!A{#P#Q!GY#Q;'S!Ic;'S;=`!JT<%lO!Ic!f!JWP;=`<%l!Ic!f!J^P;=`<%l!GY(Q!Jh^$f&j(R!bOY!JaYZ&cZw!Jawx!Bwx!^!Ja!^!_!Ic!_#O!Ja#O#P!Cr#P#Q!<n#Q#o!Ja#o#p!Ic#p;'S!Ja;'S;=`!Kd<%lO!Ja(Q!KgP;=`<%l!Ja(Q!KmP;=`<%l!<n'`!Ky`$f&j(Op!USOY!KpYZ&cZr!Kprs!=ys!P!Kp!P!Q!L{!Q!^!Kp!^!_!Ns!_!}!Kp!}#O##z#O#P!Dj#P#o!Kp#o#p!Ns#p;'S!Kp;'S;=`#%T<%lO!Kp'`!MUi$f&j(Op!USOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#Z(r#Z#[!L{#[#](r#]#^!L{#^#a(r#a#b!L{#b#g(r#g#h!L{#h#i(r#i#j!L{#j#m(r#m#n!L{#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rt!NzZ(Op!USOY!NsZr!Nsrs!@Ys!P!Ns!P!Q# m!Q!}!Ns!}#O#!|#O#P!Bb#P;'S!Ns;'S;=`##t<%lO!Nst# tb(Op!USOY)rZr)rs#O)r#P#Z)r#Z#[# m#[#])r#]#^# m#^#a)r#a#b# m#b#g)r#g#h# m#h#i)r#i#j# m#j#m)r#m#n# m#n;'S)r;'S;=`*Z<%lO)rt##RX(OpOY#!|Zr#!|rs!Acs#O#!|#O#P!A{#P#Q!Ns#Q;'S#!|;'S;=`##n<%lO#!|t##qP;=`<%l#!|t##wP;=`<%l!Ns'`#$R^$f&j(OpOY##zYZ&cZr##zrs!Bws!^##z!^!_#!|!_#O##z#O#P!Cr#P#Q!Kp#Q#o##z#o#p#!|#p;'S##z;'S;=`#$}<%lO##z'`#%QP;=`<%l##z'`#%WP;=`<%l!Kp(r#%fk$f&j(Op(R!b!USOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#Z%Z#Z#[#%Z#[#]%Z#]#^#%Z#^#a%Z#a#b#%Z#b#g%Z#g#h#%Z#h#i%Z#i#j#%Z#j#m%Z#m#n#%Z#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#W#'d](Op(R!b!USOY#'ZZr#'Zrs!GYsw#'Zwx!Nsx!P#'Z!P!Q#(]!Q!}#'Z!}#O#)w#O#P!Bb#P;'S#'Z;'S;=`#*w<%lO#'Z#W#(fe(Op(R!b!USOY*gZr*grs'}sw*gwx)rx#O*g#P#Z*g#Z#[#(]#[#]*g#]#^#(]#^#a*g#a#b#(]#b#g*g#g#h#(]#h#i*g#i#j#(]#j#m*g#m#n#(]#n;'S*g;'S;=`+Z<%lO*g#W#*OZ(Op(R!bOY#)wZr#)wrs!Icsw#)wwx#!|x#O#)w#O#P!A{#P#Q#'Z#Q;'S#)w;'S;=`#*q<%lO#)w#W#*tP;=`<%l#)w#W#*zP;=`<%l#'Z(r#+W`$f&j(Op(R!bOY#*}YZ&cZr#*}rs!Jasw#*}wx##zx!^#*}!^!_#)w!_#O#*}#O#P!Cr#P#Q!;Z#Q#o#*}#o#p#)w#p;'S#*};'S;=`#,Y<%lO#*}(r#,]P;=`<%l#*}(r#,cP;=`<%l!;Z(CS#,sb$f&j(Op(R!b'v(;d!USOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Kpx!P!;Z!P!Q#%Z!Q!^!;Z!^!_#'Z!_!}!;Z!}#O#*}#O#P!Dj#P#o!;Z#o#p#'Z#p;'S!;Z;'S;=`#,`<%lO!;Z(CS#.W_$f&j(Op(R!bS(;dOY#-{YZ&cZr#-{rs#/Vsw#-{wx#2gx!^#-{!^!_#4f!_#O#-{#O#P#0X#P#o#-{#o#p#4f#p;'S#-{;'S;=`#5e<%lO#-{(Bb#/`]$f&j(R!bS(;dOY#/VYZ&cZw#/Vwx#0Xx!^#/V!^!_#1j!_#O#/V#O#P#0X#P#o#/V#o#p#1j#p;'S#/V;'S;=`#2a<%lO#/V(AO#0`X$f&jS(;dOY#0XYZ&cZ!^#0X!^!_#0{!_#o#0X#o#p#0{#p;'S#0X;'S;=`#1d<%lO#0X(;d#1QSS(;dOY#0{Z;'S#0{;'S;=`#1^<%lO#0{(;d#1aP;=`<%l#0{(AO#1gP;=`<%l#0X(<v#1qW(R!bS(;dOY#1jZw#1jwx#0{x#O#1j#O#P#0{#P;'S#1j;'S;=`#2Z<%lO#1j(<v#2^P;=`<%l#1j(Bb#2dP;=`<%l#/V(Ap#2p]$f&j(OpS(;dOY#2gYZ&cZr#2grs#0Xs!^#2g!^!_#3i!_#O#2g#O#P#0X#P#o#2g#o#p#3i#p;'S#2g;'S;=`#4`<%lO#2g(<U#3pW(OpS(;dOY#3iZr#3irs#0{s#O#3i#O#P#0{#P;'S#3i;'S;=`#4Y<%lO#3i(<U#4]P;=`<%l#3i(Ap#4cP;=`<%l#2g(=h#4oY(Op(R!bS(;dOY#4fZr#4frs#1jsw#4fwx#3ix#O#4f#O#P#0{#P;'S#4f;'S;=`#5_<%lO#4f(=h#5bP;=`<%l#4f(CS#5hP;=`<%l#-{%#W#5xb$f&j$O$Id(Op(R!b!USOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Kpx!P!;Z!P!Q#%Z!Q!^!;Z!^!_#'Z!_!}!;Z!}#O#*}#O#P!Dj#P#o!;Z#o#p#'Z#p;'S!;Z;'S;=`#,`<%lO!;Z+h#7_b$W#t$f&j(Op(R!b!USOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Kpx!P!;Z!P!Q#%Z!Q!^!;Z!^!_#'Z!_!}!;Z!}#O#*}#O#P!Dj#P#o!;Z#o#p#'Z#p;'S!;Z;'S;=`#,`<%lO!;Z$/l#8rp$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#:v![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#:v#S#U%Z#U#V#>Q#V#X%Z#X#Y!4|#Y#b%Z#b#c#<v#c#d#AY#d#l%Z#l#m#D[#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#;Rk$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#:v![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#:v#S#X%Z#X#Y!4|#Y#b%Z#b#c#<v#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#=R_$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#>Zd$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#?i!R!S#?i!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#?i#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#?tf$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#?i!R!S#?i!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#?i#S#b%Z#b#c#<v#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#Acc$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#Bn!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#Bn#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#Bye$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#Bn!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#Bn#S#b%Z#b#c#<v#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#Deg$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#E|![!^%Z!^!_*g!_!c%Z!c!i#E|!i#O%Z#O#P&c#P#R%Z#R#S#E|#S#T%Z#T#Z#E|#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#FXi$f&j(Op(R!bo$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#E|![!^%Z!^!_*g!_!c%Z!c!i#E|!i#O%Z#O#P&c#P#R%Z#R#S#E|#S#T%Z#T#Z#E|#Z#b%Z#b#c#<v#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#HT_!d$b$f&j#|%<f(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#I__`l$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(@^#Jk^g!*v!h'.r(Op(R!b(tSOY*gZr*grs'}sw*gwx)rx!P*g!P!Q#Kg!Q!^*g!^!_#L]!_!`#M}!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#KpX$h&j(Op(R!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#LfZ#n$Id(Op(R!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#MX!`#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#MbX$O$Id(Op(R!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#NWX#o$Id(Op(R!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Gh$ Oa#[%?x$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$!T!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#W$!`_#g$Ih$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh$#nafBf#o$Id$c#|$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$$s!`!a$%}!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$%O_#o$Id$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$&Ya#n$Id$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$'_!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$'j`#n$Id$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h$(wc(h$Ip$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P$*S!P!^%Z!^!_*g!_!a%Z!a!b$+^!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+`$*__}'#p$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$+i`$f&j#y$Id(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&^$,v_!{!Ln$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(@^$.Q_!P(8n$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/UZ$f&jO!^$/w!^!_$0_!_#i$/w#i#j$0d#j#l$/w#l#m$2V#m#o$/w#o#p$0_#p;'S$/w;'S;=`$4b<%lO$/w(n$0OT^#S$f&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0dO^#S(n$0i[$f&jO!Q&c!Q![$1_![!^&c!_!c&c!c!i$1_!i#T&c#T#Z$1_#Z#o&c#o#p$3u#p;'S&c;'S;=`&w<%lO&c(n$1dZ$f&jO!Q&c!Q![$2V![!^&c!_!c&c!c!i$2V!i#T&c#T#Z$2V#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2[Z$f&jO!Q&c!Q![$2}![!^&c!_!c&c!c!i$2}!i#T&c#T#Z$2}#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3SZ$f&jO!Q&c!Q![$/w![!^&c!_!c&c!c!i$/w!i#T&c#T#Z$/w#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$3xR!Q![$4R!c!i$4R#T#Z$4R#S$4US!Q![$4R!c!i$4R#T#Z$4R#q#r$0_(n$4eP;=`<%l$/w!2r$4s_!V!+S$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$5}`#v$Id$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&,v$7[_$f&j(Op(R!b(X&%WOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$8jk$f&j(Op(R!b'{&;d$[#t([!LYOY%ZYZ&cZr%Zrs&}st%Ztu$8Zuw%Zwx(rx}%Z}!O$:_!O!Q%Z!Q![$8Z![!^%Z!^!_*g!_!c%Z!c!}$8Z!}#O%Z#O#P&c#P#R%Z#R#S$8Z#S#T%Z#T#o$8Z#o#p*g#p$g%Z$g;'S$8Z;'S;=`$<e<%lO$8Z+d$:jk$f&j(Op(R!b$[#tOY%ZYZ&cZr%Zrs&}st%Ztu$:_uw%Zwx(rx}%Z}!O$:_!O!Q%Z!Q![$:_![!^%Z!^!_*g!_!c%Z!c!}$:_!}#O%Z#O#P&c#P#R%Z#R#S$:_#S#T%Z#T#o$:_#o#p*g#p$g%Z$g;'S$:_;'S;=`$<_<%lO$:_+d$<bP;=`<%l$:_(CS$<hP;=`<%l$8Z!5p$<tX![!3l(Op(R!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g&CO$=la(o&;`$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+^#q;'S%Z;'S;=`+a<%lO%Z%#`$?O_!Z$I`r`$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(r$@Y_!pS$f&j(Op(R!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$Aj|$f&j(Op(R!b't(;d$Y#t'{&;d([!LYOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$AX#BZ$ISEr$IS$I_$AX$I_$JTEr$JT$JU$AX$JU$KVEr$KV$KW$AX$KW&FUEr&FU&FV$AX&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$AX?HUOEr(CS$Duk$f&j(Op(R!b'u(;d$Y#t'{&;d([!LYOY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [noSemicolon, incdecToken, jsx, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, insertSemicolon, new LocalTokenGroup("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOt~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!R~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(Z~~", 141, 332), new LocalTokenGroup("j~RQYZXz{^~^O'x~~aP!P!Qd~iO'y~~", 25, 315)],
  topRules: { "Script": [0, 6], "SingleExpression": [1, 269], "SingleClassItem": [2, 270] },
  dialects: { jsx: 0, ts: 14614 },
  dynamicPrecedences: { "69": 1, "79": 1, "81": 1, "165": 1, "193": 1 },
  specialized: [{ term: 319, get: (value) => spec_identifier2[value] || -1 }, { term: 334, get: (value) => spec_word[value] || -1 }, { term: 70, get: (value) => spec_LessThan[value] || -1 }],
  tokenPrec: 14638
});

// ../../node_modules/.pnpm/@codemirror+autocomplete@6.12.0_@codemirror+language@6.10.0_@codemirror+state@6.4.0_@codemirr_6qt7hqnzq6dliprn7xw2ox5pvi/node_modules/@codemirror/autocomplete/dist/index.js
var CompletionContext = class {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(state, pos, explicit) {
    this.state = state;
    this.pos = pos;
    this.explicit = explicit;
    this.abortListeners = [];
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(types) {
    let token = syntaxTree(this.state).resolveInner(this.pos, -1);
    while (token && types.indexOf(token.name) < 0)
      token = token.parent;
    return token ? {
      from: token.from,
      to: this.pos,
      text: this.state.sliceDoc(token.from, this.pos),
      type: token.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(expr) {
    let line = this.state.doc.lineAt(this.pos);
    let start = Math.max(line.from, this.pos - 250);
    let str = line.text.slice(start - line.from, this.pos - line.from);
    let found = str.search(ensureAnchor(expr, false));
    return found < 0 ? null : { from: start + found, to: this.pos, text: str.slice(found) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  */
  addEventListener(type, listener) {
    if (type == "abort" && this.abortListeners)
      this.abortListeners.push(listener);
  }
};
function toSet(chars) {
  let flat = Object.keys(chars).join("");
  let words = /\w/.test(flat);
  if (words)
    flat = flat.replace(/\w/g, "");
  return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
}
function prefixMatch(options) {
  let first = /* @__PURE__ */ Object.create(null), rest = /* @__PURE__ */ Object.create(null);
  for (let { label } of options) {
    first[label[0]] = true;
    for (let i = 1; i < label.length; i++)
      rest[label[i]] = true;
  }
  let source = toSet(first) + toSet(rest) + "*$";
  return [new RegExp("^" + source), new RegExp(source)];
}
function completeFromList(list) {
  let options = list.map((o) => typeof o == "string" ? { label: o } : o);
  let [validFor, match] = options.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
  return (context) => {
    let token = context.matchBefore(match);
    return token || context.explicit ? { from: token ? token.from : context.pos, options, validFor } : null;
  };
}
function ifNotIn(nodes, source) {
  return (context) => {
    for (let pos = syntaxTree(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent) {
      if (nodes.indexOf(pos.name) > -1)
        return null;
      if (pos.type.isTop)
        break;
    }
    return source(context);
  };
}
var Option = class {
  constructor(completion, source, match, score2) {
    this.completion = completion;
    this.source = source;
    this.match = match;
    this.score = score2;
  }
};
function cur(state) {
  return state.selection.main.from;
}
function ensureAnchor(expr, start) {
  var _a;
  let { source } = expr;
  let addStart = start && source[0] != "^", addEnd = source[source.length - 1] != "$";
  if (!addStart && !addEnd)
    return expr;
  return new RegExp(`${addStart ? "^" : ""}(?:${source})${addEnd ? "$" : ""}`, (_a = expr.flags) !== null && _a !== void 0 ? _a : expr.ignoreCase ? "i" : "");
}
var pickedCompletion = /* @__PURE__ */ Annotation.define();
function insertCompletionText(state, text, from, to) {
  let { main } = state.selection, fromOff = from - main.from, toOff = to - main.from;
  return Object.assign(Object.assign({}, state.changeByRange((range) => {
    if (range != main && from != to && state.sliceDoc(range.from + fromOff, range.from + toOff) != state.sliceDoc(from, to))
      return { range };
    return {
      changes: { from: range.from + fromOff, to: to == main.from ? range.to : range.from + toOff, insert: text },
      range: EditorSelection.cursor(range.from + fromOff + text.length)
    };
  })), { scrollIntoView: true, userEvent: "input.complete" });
}
var SourceCache = /* @__PURE__ */ new WeakMap();
function asSource(source) {
  if (!Array.isArray(source))
    return source;
  let known = SourceCache.get(source);
  if (!known)
    SourceCache.set(source, known = completeFromList(source));
  return known;
}
var startCompletionEffect = /* @__PURE__ */ StateEffect.define();
var closeCompletionEffect = /* @__PURE__ */ StateEffect.define();
var FuzzyMatcher = class {
  constructor(pattern) {
    this.pattern = pattern;
    this.chars = [];
    this.folded = [];
    this.any = [];
    this.precise = [];
    this.byWord = [];
    this.score = 0;
    this.matched = [];
    for (let p = 0; p < pattern.length; ) {
      let char = codePointAt(pattern, p), size = codePointSize(char);
      this.chars.push(char);
      let part = pattern.slice(p, p + size), upper = part.toUpperCase();
      this.folded.push(codePointAt(upper == part ? part.toLowerCase() : upper, 0));
      p += size;
    }
    this.astral = pattern.length != this.chars.length;
  }
  ret(score2, matched) {
    this.score = score2;
    this.matched = matched;
    return true;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(word) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (word.length < this.pattern.length)
      return false;
    let { chars, folded, any, precise, byWord } = this;
    if (chars.length == 1) {
      let first = codePointAt(word, 0), firstSize = codePointSize(first);
      let score2 = firstSize == word.length ? 0 : -100;
      if (first == chars[0])
        ;
      else if (first == folded[0])
        score2 += -200;
      else
        return false;
      return this.ret(score2, [0, firstSize]);
    }
    let direct = word.indexOf(this.pattern);
    if (direct == 0)
      return this.ret(word.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let len = chars.length, anyTo = 0;
    if (direct < 0) {
      for (let i = 0, e = Math.min(word.length, 200); i < e && anyTo < len; ) {
        let next = codePointAt(word, i);
        if (next == chars[anyTo] || next == folded[anyTo])
          any[anyTo++] = i;
        i += codePointSize(next);
      }
      if (anyTo < len)
        return false;
    }
    let preciseTo = 0;
    let byWordTo = 0, byWordFolded = false;
    let adjacentTo = 0, adjacentStart = -1, adjacentEnd = -1;
    let hasLower = /[a-z]/.test(word), wordAdjacent = true;
    for (let i = 0, e = Math.min(word.length, 200), prevType = 0; i < e && byWordTo < len; ) {
      let next = codePointAt(word, i);
      if (direct < 0) {
        if (preciseTo < len && next == chars[preciseTo])
          precise[preciseTo++] = i;
        if (adjacentTo < len) {
          if (next == chars[adjacentTo] || next == folded[adjacentTo]) {
            if (adjacentTo == 0)
              adjacentStart = i;
            adjacentEnd = i + 1;
            adjacentTo++;
          } else {
            adjacentTo = 0;
          }
        }
      }
      let ch, type = next < 255 ? next >= 48 && next <= 57 || next >= 97 && next <= 122 ? 2 : next >= 65 && next <= 90 ? 1 : 0 : (ch = fromCodePoint(next)) != ch.toLowerCase() ? 1 : ch != ch.toUpperCase() ? 2 : 0;
      if (!i || type == 1 && hasLower || prevType == 0 && type != 0) {
        if (chars[byWordTo] == next || folded[byWordTo] == next && (byWordFolded = true))
          byWord[byWordTo++] = i;
        else if (byWord.length)
          wordAdjacent = false;
      }
      prevType = type;
      i += codePointSize(next);
    }
    if (byWordTo == len && byWord[0] == 0 && wordAdjacent)
      return this.result(-100 + (byWordFolded ? -200 : 0), byWord, word);
    if (adjacentTo == len && adjacentStart == 0)
      return this.ret(-200 - word.length + (adjacentEnd == word.length ? 0 : -100), [0, adjacentEnd]);
    if (direct > -1)
      return this.ret(-700 - word.length, [direct, direct + this.pattern.length]);
    if (adjacentTo == len)
      return this.ret(-200 + -700 - word.length, [adjacentStart, adjacentEnd]);
    if (byWordTo == len)
      return this.result(-100 + (byWordFolded ? -200 : 0) + -700 + (wordAdjacent ? 0 : -1100), byWord, word);
    return chars.length == 2 ? false : this.result((any[0] ? -700 : 0) + -200 + -1100, any, word);
  }
  result(score2, positions, word) {
    let result = [], i = 0;
    for (let pos of positions) {
      let to = pos + (this.astral ? codePointSize(codePointAt(word, pos)) : 1);
      if (i && result[i - 1] == pos)
        result[i - 1] = to;
      else {
        result[i++] = pos;
        result[i++] = to;
      }
    }
    return this.ret(score2 - word.length, result);
  }
};
var completionConfig = /* @__PURE__ */ Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      activateOnTyping: true,
      activateOnTypingDelay: 100,
      selectOnOpen: true,
      override: null,
      closeOnBlur: true,
      maxRenderedOptions: 100,
      defaultKeymap: true,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: false,
      icons: true,
      addToOptions: [],
      positionInfo: defaultPositionInfo,
      compareCompletions: (a, b) => a.label.localeCompare(b.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (a, b) => a && b,
      closeOnBlur: (a, b) => a && b,
      icons: (a, b) => a && b,
      tooltipClass: (a, b) => (c) => joinClass(a(c), b(c)),
      optionClass: (a, b) => (c) => joinClass(a(c), b(c)),
      addToOptions: (a, b) => a.concat(b)
    });
  }
});
function joinClass(a, b) {
  return a ? b ? a + " " + b : a : b;
}
function defaultPositionInfo(view, list, option, info, space6, tooltip) {
  let rtl = view.textDirection == Direction.RTL, left = rtl, narrow = false;
  let side = "top", offset, maxWidth;
  let spaceLeft = list.left - space6.left, spaceRight = space6.right - list.right;
  let infoWidth = info.right - info.left, infoHeight = info.bottom - info.top;
  if (left && spaceLeft < Math.min(infoWidth, spaceRight))
    left = false;
  else if (!left && spaceRight < Math.min(infoWidth, spaceLeft))
    left = true;
  if (infoWidth <= (left ? spaceLeft : spaceRight)) {
    offset = Math.max(space6.top, Math.min(option.top, space6.bottom - infoHeight)) - list.top;
    maxWidth = Math.min(400, left ? spaceLeft : spaceRight);
  } else {
    narrow = true;
    maxWidth = Math.min(
      400,
      (rtl ? list.right : space6.right - list.left) - 30
      /* Info.Margin */
    );
    let spaceBelow = space6.bottom - list.bottom;
    if (spaceBelow >= infoHeight || spaceBelow > list.top) {
      offset = option.bottom - list.top;
    } else {
      side = "bottom";
      offset = list.bottom - option.top;
    }
  }
  let scaleY = (list.bottom - list.top) / tooltip.offsetHeight;
  let scaleX = (list.right - list.left) / tooltip.offsetWidth;
  return {
    style: `${side}: ${offset / scaleY}px; max-width: ${maxWidth / scaleX}px`,
    class: "cm-completionInfo-" + (narrow ? rtl ? "left-narrow" : "right-narrow" : left ? "left" : "right")
  };
}
function optionContent(config2) {
  let content = config2.addToOptions.slice();
  if (config2.icons)
    content.push({
      render(completion) {
        let icon = document.createElement("div");
        icon.classList.add("cm-completionIcon");
        if (completion.type)
          icon.classList.add(...completion.type.split(/\s+/g).map((cls) => "cm-completionIcon-" + cls));
        icon.setAttribute("aria-hidden", "true");
        return icon;
      },
      position: 20
    });
  content.push({
    render(completion, _s, _v, match) {
      let labelElt = document.createElement("span");
      labelElt.className = "cm-completionLabel";
      let label = completion.displayLabel || completion.label, off = 0;
      for (let j = 0; j < match.length; ) {
        let from = match[j++], to = match[j++];
        if (from > off)
          labelElt.appendChild(document.createTextNode(label.slice(off, from)));
        let span = labelElt.appendChild(document.createElement("span"));
        span.appendChild(document.createTextNode(label.slice(from, to)));
        span.className = "cm-completionMatchedText";
        off = to;
      }
      if (off < label.length)
        labelElt.appendChild(document.createTextNode(label.slice(off)));
      return labelElt;
    },
    position: 50
  }, {
    render(completion) {
      if (!completion.detail)
        return null;
      let detailElt = document.createElement("span");
      detailElt.className = "cm-completionDetail";
      detailElt.textContent = completion.detail;
      return detailElt;
    },
    position: 80
  });
  return content.sort((a, b) => a.position - b.position).map((a) => a.render);
}
function rangeAroundSelected(total, selected, max) {
  if (total <= max)
    return { from: 0, to: total };
  if (selected < 0)
    selected = 0;
  if (selected <= total >> 1) {
    let off2 = Math.floor(selected / max);
    return { from: off2 * max, to: (off2 + 1) * max };
  }
  let off = Math.floor((total - selected) / max);
  return { from: total - (off + 1) * max, to: total - off * max };
}
var CompletionTooltip = class {
  constructor(view, stateField, applyCompletion2) {
    this.view = view;
    this.stateField = stateField;
    this.applyCompletion = applyCompletion2;
    this.info = null;
    this.infoDestroy = null;
    this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (pos) => this.placeInfo(pos),
      key: this
    };
    this.space = null;
    this.currentClass = "";
    let cState = view.state.field(stateField);
    let { options, selected } = cState.open;
    let config2 = view.state.facet(completionConfig);
    this.optionContent = optionContent(config2);
    this.optionClass = config2.optionClass;
    this.tooltipClass = config2.tooltipClass;
    this.range = rangeAroundSelected(options.length, selected, config2.maxRenderedOptions);
    this.dom = document.createElement("div");
    this.dom.className = "cm-tooltip-autocomplete";
    this.updateTooltipClass(view.state);
    this.dom.addEventListener("mousedown", (e) => {
      let { options: options2 } = view.state.field(stateField).open;
      for (let dom = e.target, match; dom && dom != this.dom; dom = dom.parentNode) {
        if (dom.nodeName == "LI" && (match = /-(\d+)$/.exec(dom.id)) && +match[1] < options2.length) {
          this.applyCompletion(view, options2[+match[1]]);
          e.preventDefault();
          return;
        }
      }
    });
    this.dom.addEventListener("focusout", (e) => {
      let state = view.state.field(this.stateField, false);
      if (state && state.tooltip && view.state.facet(completionConfig).closeOnBlur && e.relatedTarget != view.contentDOM)
        view.dispatch({ effects: closeCompletionEffect.of(null) });
    });
    this.showOptions(options, cState.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(options, id2) {
    if (this.list)
      this.list.remove();
    this.list = this.dom.appendChild(this.createListBox(options, id2, this.range));
    this.list.addEventListener("scroll", () => {
      if (this.info)
        this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(update) {
    var _a;
    let cState = update.state.field(this.stateField);
    let prevState = update.startState.field(this.stateField);
    this.updateTooltipClass(update.state);
    if (cState != prevState) {
      let { options, selected, disabled } = cState.open;
      if (!prevState.open || prevState.open.options != options) {
        this.range = rangeAroundSelected(options.length, selected, update.state.facet(completionConfig).maxRenderedOptions);
        this.showOptions(options, cState.id);
      }
      this.updateSel();
      if (disabled != ((_a = prevState.open) === null || _a === void 0 ? void 0 : _a.disabled))
        this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!disabled);
    }
  }
  updateTooltipClass(state) {
    let cls = this.tooltipClass(state);
    if (cls != this.currentClass) {
      for (let c of this.currentClass.split(" "))
        if (c)
          this.dom.classList.remove(c);
      for (let c of cls.split(" "))
        if (c)
          this.dom.classList.add(c);
      this.currentClass = cls;
    }
  }
  positioned(space6) {
    this.space = space6;
    if (this.info)
      this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let cState = this.view.state.field(this.stateField), open = cState.open;
    if (open.selected > -1 && open.selected < this.range.from || open.selected >= this.range.to) {
      this.range = rangeAroundSelected(open.options.length, open.selected, this.view.state.facet(completionConfig).maxRenderedOptions);
      this.showOptions(open.options, cState.id);
    }
    if (this.updateSelectedOption(open.selected)) {
      this.destroyInfo();
      let { completion } = open.options[open.selected];
      let { info } = completion;
      if (!info)
        return;
      let infoResult = typeof info === "string" ? document.createTextNode(info) : info(completion);
      if (!infoResult)
        return;
      if ("then" in infoResult) {
        infoResult.then((obj) => {
          if (obj && this.view.state.field(this.stateField, false) == cState)
            this.addInfoPane(obj, completion);
        }).catch((e) => logException(this.view.state, e, "completion info"));
      } else {
        this.addInfoPane(infoResult, completion);
      }
    }
  }
  addInfoPane(content, completion) {
    this.destroyInfo();
    let wrap = this.info = document.createElement("div");
    wrap.className = "cm-tooltip cm-completionInfo";
    if (content.nodeType != null) {
      wrap.appendChild(content);
      this.infoDestroy = null;
    } else {
      let { dom, destroy } = content;
      wrap.appendChild(dom);
      this.infoDestroy = destroy || null;
    }
    this.dom.appendChild(wrap);
    this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(selected) {
    let set = null;
    for (let opt = this.list.firstChild, i = this.range.from; opt; opt = opt.nextSibling, i++) {
      if (opt.nodeName != "LI" || !opt.id) {
        i--;
      } else if (i == selected) {
        if (!opt.hasAttribute("aria-selected")) {
          opt.setAttribute("aria-selected", "true");
          set = opt;
        }
      } else {
        if (opt.hasAttribute("aria-selected"))
          opt.removeAttribute("aria-selected");
      }
    }
    if (set)
      scrollIntoView(this.list, set);
    return set;
  }
  measureInfo() {
    let sel = this.dom.querySelector("[aria-selected]");
    if (!sel || !this.info)
      return null;
    let listRect = this.dom.getBoundingClientRect();
    let infoRect = this.info.getBoundingClientRect();
    let selRect = sel.getBoundingClientRect();
    let space6 = this.space;
    if (!space6) {
      let win = this.dom.ownerDocument.defaultView || window;
      space6 = { left: 0, top: 0, right: win.innerWidth, bottom: win.innerHeight };
    }
    if (selRect.top > Math.min(space6.bottom, listRect.bottom) - 10 || selRect.bottom < Math.max(space6.top, listRect.top) + 10)
      return null;
    return this.view.state.facet(completionConfig).positionInfo(this.view, listRect, selRect, infoRect, space6, this.dom);
  }
  placeInfo(pos) {
    if (this.info) {
      if (pos) {
        if (pos.style)
          this.info.style.cssText = pos.style;
        this.info.className = "cm-tooltip cm-completionInfo " + (pos.class || "");
      } else {
        this.info.style.cssText = "top: -1e6px";
      }
    }
  }
  createListBox(options, id2, range) {
    const ul = document.createElement("ul");
    ul.id = id2;
    ul.setAttribute("role", "listbox");
    ul.setAttribute("aria-expanded", "true");
    ul.setAttribute("aria-label", this.view.state.phrase("Completions"));
    let curSection = null;
    for (let i = range.from; i < range.to; i++) {
      let { completion, match } = options[i], { section } = completion;
      if (section) {
        let name = typeof section == "string" ? section : section.name;
        if (name != curSection && (i > range.from || range.from == 0)) {
          curSection = name;
          if (typeof section != "string" && section.header) {
            ul.appendChild(section.header(section));
          } else {
            let header = ul.appendChild(document.createElement("completion-section"));
            header.textContent = name;
          }
        }
      }
      const li = ul.appendChild(document.createElement("li"));
      li.id = id2 + "-" + i;
      li.setAttribute("role", "option");
      let cls = this.optionClass(completion);
      if (cls)
        li.className = cls;
      for (let source of this.optionContent) {
        let node = source(completion, this.view.state, this.view, match);
        if (node)
          li.appendChild(node);
      }
    }
    if (range.from)
      ul.classList.add("cm-completionListIncompleteTop");
    if (range.to < options.length)
      ul.classList.add("cm-completionListIncompleteBottom");
    return ul;
  }
  destroyInfo() {
    if (this.info) {
      if (this.infoDestroy)
        this.infoDestroy();
      this.info.remove();
      this.info = null;
    }
  }
  destroy() {
    this.destroyInfo();
  }
};
function completionTooltip(stateField, applyCompletion2) {
  return (view) => new CompletionTooltip(view, stateField, applyCompletion2);
}
function scrollIntoView(container, element) {
  let parent = container.getBoundingClientRect();
  let self = element.getBoundingClientRect();
  let scaleY = parent.height / container.offsetHeight;
  if (self.top < parent.top)
    container.scrollTop -= (parent.top - self.top) / scaleY;
  else if (self.bottom > parent.bottom)
    container.scrollTop += (self.bottom - parent.bottom) / scaleY;
}
function score(option) {
  return (option.boost || 0) * 100 + (option.apply ? 10 : 0) + (option.info ? 5 : 0) + (option.type ? 1 : 0);
}
function sortOptions(active, state) {
  let options = [];
  let sections = null;
  let addOption = (option) => {
    options.push(option);
    let { section } = option.completion;
    if (section) {
      if (!sections)
        sections = [];
      let name = typeof section == "string" ? section : section.name;
      if (!sections.some((s) => s.name == name))
        sections.push(typeof section == "string" ? { name } : section);
    }
  };
  for (let a of active)
    if (a.hasResult()) {
      let getMatch = a.result.getMatch;
      if (a.result.filter === false) {
        for (let option of a.result.options) {
          addOption(new Option(option, a.source, getMatch ? getMatch(option) : [], 1e9 - options.length));
        }
      } else {
        let matcher = new FuzzyMatcher(state.sliceDoc(a.from, a.to));
        for (let option of a.result.options)
          if (matcher.match(option.label)) {
            let matched = !option.displayLabel ? matcher.matched : getMatch ? getMatch(option, matcher.matched) : [];
            addOption(new Option(option, a.source, matched, matcher.score + (option.boost || 0)));
          }
      }
    }
  if (sections) {
    let sectionOrder = /* @__PURE__ */ Object.create(null), pos = 0;
    let cmp = (a, b) => {
      var _a, _b;
      return ((_a = a.rank) !== null && _a !== void 0 ? _a : 1e9) - ((_b = b.rank) !== null && _b !== void 0 ? _b : 1e9) || (a.name < b.name ? -1 : 1);
    };
    for (let s of sections.sort(cmp)) {
      pos -= 1e5;
      sectionOrder[s.name] = pos;
    }
    for (let option of options) {
      let { section } = option.completion;
      if (section)
        option.score += sectionOrder[typeof section == "string" ? section : section.name];
    }
  }
  let result = [], prev = null;
  let compare = state.facet(completionConfig).compareCompletions;
  for (let opt of options.sort((a, b) => b.score - a.score || compare(a.completion, b.completion))) {
    let cur2 = opt.completion;
    if (!prev || prev.label != cur2.label || prev.detail != cur2.detail || prev.type != null && cur2.type != null && prev.type != cur2.type || prev.apply != cur2.apply || prev.boost != cur2.boost)
      result.push(opt);
    else if (score(opt.completion) > score(prev))
      result[result.length - 1] = opt;
    prev = opt.completion;
  }
  return result;
}
var CompletionDialog = class _CompletionDialog {
  constructor(options, attrs, tooltip, timestamp, selected, disabled) {
    this.options = options;
    this.attrs = attrs;
    this.tooltip = tooltip;
    this.timestamp = timestamp;
    this.selected = selected;
    this.disabled = disabled;
  }
  setSelected(selected, id2) {
    return selected == this.selected || selected >= this.options.length ? this : new _CompletionDialog(this.options, makeAttrs(id2, selected), this.tooltip, this.timestamp, selected, this.disabled);
  }
  static build(active, state, id2, prev, conf) {
    let options = sortOptions(active, state);
    if (!options.length) {
      return prev && active.some(
        (a) => a.state == 1
        /* State.Pending */
      ) ? new _CompletionDialog(prev.options, prev.attrs, prev.tooltip, prev.timestamp, prev.selected, true) : null;
    }
    let selected = state.facet(completionConfig).selectOnOpen ? 0 : -1;
    if (prev && prev.selected != selected && prev.selected != -1) {
      let selectedValue = prev.options[prev.selected].completion;
      for (let i = 0; i < options.length; i++)
        if (options[i].completion == selectedValue) {
          selected = i;
          break;
        }
    }
    return new _CompletionDialog(options, makeAttrs(id2, selected), {
      pos: active.reduce((a, b) => b.hasResult() ? Math.min(a, b.from) : a, 1e8),
      create: createTooltip,
      above: conf.aboveCursor
    }, prev ? prev.timestamp : Date.now(), selected, false);
  }
  map(changes) {
    return new _CompletionDialog(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: changes.mapPos(this.tooltip.pos) }), this.timestamp, this.selected, this.disabled);
  }
};
var CompletionState = class _CompletionState {
  constructor(active, id2, open) {
    this.active = active;
    this.id = id2;
    this.open = open;
  }
  static start() {
    return new _CompletionState(none, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(tr) {
    let { state } = tr, conf = state.facet(completionConfig);
    let sources = conf.override || state.languageDataAt("autocomplete", cur(state)).map(asSource);
    let active = sources.map((source) => {
      let value = this.active.find((s) => s.source == source) || new ActiveSource(
        source,
        this.active.some(
          (a) => a.state != 0
          /* State.Inactive */
        ) ? 1 : 0
        /* State.Inactive */
      );
      return value.update(tr, conf);
    });
    if (active.length == this.active.length && active.every((a, i) => a == this.active[i]))
      active = this.active;
    let open = this.open;
    if (open && tr.docChanged)
      open = open.map(tr.changes);
    if (tr.selection || active.some((a) => a.hasResult() && tr.changes.touchesRange(a.from, a.to)) || !sameResults(active, this.active))
      open = CompletionDialog.build(active, state, this.id, open, conf);
    else if (open && open.disabled && !active.some(
      (a) => a.state == 1
      /* State.Pending */
    ))
      open = null;
    if (!open && active.every(
      (a) => a.state != 1
      /* State.Pending */
    ) && active.some((a) => a.hasResult()))
      active = active.map((a) => a.hasResult() ? new ActiveSource(
        a.source,
        0
        /* State.Inactive */
      ) : a);
    for (let effect of tr.effects)
      if (effect.is(setSelectedEffect))
        open = open && open.setSelected(effect.value, this.id);
    return active == this.active && open == this.open ? this : new _CompletionState(active, this.id, open);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : baseAttrs;
  }
};
function sameResults(a, b) {
  if (a == b)
    return true;
  for (let iA = 0, iB = 0; ; ) {
    while (iA < a.length && !a[iA].hasResult)
      iA++;
    while (iB < b.length && !b[iB].hasResult)
      iB++;
    let endA = iA == a.length, endB = iB == b.length;
    if (endA || endB)
      return endA == endB;
    if (a[iA++].result != b[iB++].result)
      return false;
  }
}
var baseAttrs = {
  "aria-autocomplete": "list"
};
function makeAttrs(id2, selected) {
  let result = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": id2
  };
  if (selected > -1)
    result["aria-activedescendant"] = id2 + "-" + selected;
  return result;
}
var none = [];
function getUserEvent(tr) {
  return tr.isUserEvent("input.type") ? "input" : tr.isUserEvent("delete.backward") ? "delete" : null;
}
var ActiveSource = class _ActiveSource {
  constructor(source, state, explicitPos = -1) {
    this.source = source;
    this.state = state;
    this.explicitPos = explicitPos;
  }
  hasResult() {
    return false;
  }
  update(tr, conf) {
    let event = getUserEvent(tr), value = this;
    if (event)
      value = value.handleUserEvent(tr, event, conf);
    else if (tr.docChanged)
      value = value.handleChange(tr);
    else if (tr.selection && value.state != 0)
      value = new _ActiveSource(
        value.source,
        0
        /* State.Inactive */
      );
    for (let effect of tr.effects) {
      if (effect.is(startCompletionEffect))
        value = new _ActiveSource(value.source, 1, effect.value ? cur(tr.state) : -1);
      else if (effect.is(closeCompletionEffect))
        value = new _ActiveSource(
          value.source,
          0
          /* State.Inactive */
        );
      else if (effect.is(setActiveEffect)) {
        for (let active of effect.value)
          if (active.source == value.source)
            value = active;
      }
    }
    return value;
  }
  handleUserEvent(tr, type, conf) {
    return type == "delete" || !conf.activateOnTyping ? this.map(tr.changes) : new _ActiveSource(
      this.source,
      1
      /* State.Pending */
    );
  }
  handleChange(tr) {
    return tr.changes.touchesRange(cur(tr.startState)) ? new _ActiveSource(
      this.source,
      0
      /* State.Inactive */
    ) : this.map(tr.changes);
  }
  map(changes) {
    return changes.empty || this.explicitPos < 0 ? this : new _ActiveSource(this.source, this.state, changes.mapPos(this.explicitPos));
  }
};
var ActiveResult = class _ActiveResult extends ActiveSource {
  constructor(source, explicitPos, result, from, to) {
    super(source, 2, explicitPos);
    this.result = result;
    this.from = from;
    this.to = to;
  }
  hasResult() {
    return true;
  }
  handleUserEvent(tr, type, conf) {
    var _a;
    let from = tr.changes.mapPos(this.from), to = tr.changes.mapPos(this.to, 1);
    let pos = cur(tr.state);
    if ((this.explicitPos < 0 ? pos <= from : pos < this.from) || pos > to || type == "delete" && cur(tr.startState) == this.from)
      return new ActiveSource(
        this.source,
        type == "input" && conf.activateOnTyping ? 1 : 0
        /* State.Inactive */
      );
    let explicitPos = this.explicitPos < 0 ? -1 : tr.changes.mapPos(this.explicitPos), updated;
    if (checkValid(this.result.validFor, tr.state, from, to))
      return new _ActiveResult(this.source, explicitPos, this.result, from, to);
    if (this.result.update && (updated = this.result.update(this.result, from, to, new CompletionContext(tr.state, pos, explicitPos >= 0))))
      return new _ActiveResult(this.source, explicitPos, updated, updated.from, (_a = updated.to) !== null && _a !== void 0 ? _a : cur(tr.state));
    return new ActiveSource(this.source, 1, explicitPos);
  }
  handleChange(tr) {
    return tr.changes.touchesRange(this.from, this.to) ? new ActiveSource(
      this.source,
      0
      /* State.Inactive */
    ) : this.map(tr.changes);
  }
  map(mapping) {
    return mapping.empty ? this : new _ActiveResult(this.source, this.explicitPos < 0 ? -1 : mapping.mapPos(this.explicitPos), this.result, mapping.mapPos(this.from), mapping.mapPos(this.to, 1));
  }
};
function checkValid(validFor, state, from, to) {
  if (!validFor)
    return false;
  let text = state.sliceDoc(from, to);
  return typeof validFor == "function" ? validFor(text, from, to, state) : ensureAnchor(validFor, true).test(text);
}
var setActiveEffect = /* @__PURE__ */ StateEffect.define({
  map(sources, mapping) {
    return sources.map((s) => s.map(mapping));
  }
});
var setSelectedEffect = /* @__PURE__ */ StateEffect.define();
var completionState = /* @__PURE__ */ StateField.define({
  create() {
    return CompletionState.start();
  },
  update(value, tr) {
    return value.update(tr);
  },
  provide: (f) => [
    showTooltip.from(f, (val) => val.tooltip),
    EditorView.contentAttributes.from(f, (state) => state.attrs)
  ]
});
function applyCompletion(view, option) {
  const apply = option.completion.apply || option.completion.label;
  let result = view.state.field(completionState).active.find((a) => a.source == option.source);
  if (!(result instanceof ActiveResult))
    return false;
  if (typeof apply == "string")
    view.dispatch(Object.assign(Object.assign({}, insertCompletionText(view.state, apply, result.from, result.to)), { annotations: pickedCompletion.of(option.completion) }));
  else
    apply(view, option.completion, result.from, result.to);
  return true;
}
var createTooltip = /* @__PURE__ */ completionTooltip(completionState, applyCompletion);
function moveCompletionSelection(forward, by = "option") {
  return (view) => {
    let cState = view.state.field(completionState, false);
    if (!cState || !cState.open || cState.open.disabled || Date.now() - cState.open.timestamp < view.state.facet(completionConfig).interactionDelay)
      return false;
    let step = 1, tooltip;
    if (by == "page" && (tooltip = getTooltip(view, cState.open.tooltip)))
      step = Math.max(2, Math.floor(tooltip.dom.offsetHeight / tooltip.dom.querySelector("li").offsetHeight) - 1);
    let { length } = cState.open.options;
    let selected = cState.open.selected > -1 ? cState.open.selected + step * (forward ? 1 : -1) : forward ? 0 : length - 1;
    if (selected < 0)
      selected = by == "page" ? 0 : length - 1;
    else if (selected >= length)
      selected = by == "page" ? length - 1 : 0;
    view.dispatch({ effects: setSelectedEffect.of(selected) });
    return true;
  };
}
var acceptCompletion = (view) => {
  let cState = view.state.field(completionState, false);
  if (view.state.readOnly || !cState || !cState.open || cState.open.selected < 0 || cState.open.disabled || Date.now() - cState.open.timestamp < view.state.facet(completionConfig).interactionDelay)
    return false;
  return applyCompletion(view, cState.open.options[cState.open.selected]);
};
var startCompletion = (view) => {
  let cState = view.state.field(completionState, false);
  if (!cState)
    return false;
  view.dispatch({ effects: startCompletionEffect.of(true) });
  return true;
};
var closeCompletion = (view) => {
  let cState = view.state.field(completionState, false);
  if (!cState || !cState.active.some(
    (a) => a.state != 0
    /* State.Inactive */
  ))
    return false;
  view.dispatch({ effects: closeCompletionEffect.of(null) });
  return true;
};
var RunningQuery = class {
  constructor(active, context) {
    this.active = active;
    this.context = context;
    this.time = Date.now();
    this.updates = [];
    this.done = void 0;
  }
};
var MaxUpdateCount = 50;
var MinAbortTime = 1e3;
var completionPlugin = /* @__PURE__ */ ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.debounceUpdate = -1;
    this.running = [];
    this.debounceAccept = -1;
    this.pendingStart = false;
    this.composing = 0;
    for (let active of view.state.field(completionState).active)
      if (active.state == 1)
        this.startQuery(active);
  }
  update(update) {
    let cState = update.state.field(completionState);
    if (!update.selectionSet && !update.docChanged && update.startState.field(completionState) == cState)
      return;
    let doesReset = update.transactions.some((tr) => {
      return (tr.selection || tr.docChanged) && !getUserEvent(tr);
    });
    for (let i = 0; i < this.running.length; i++) {
      let query = this.running[i];
      if (doesReset || query.updates.length + update.transactions.length > MaxUpdateCount && Date.now() - query.time > MinAbortTime) {
        for (let handler of query.context.abortListeners) {
          try {
            handler();
          } catch (e) {
            logException(this.view.state, e);
          }
        }
        query.context.abortListeners = null;
        this.running.splice(i--, 1);
      } else {
        query.updates.push(...update.transactions);
      }
    }
    if (this.debounceUpdate > -1)
      clearTimeout(this.debounceUpdate);
    if (update.transactions.some((tr) => tr.effects.some((e) => e.is(startCompletionEffect))))
      this.pendingStart = true;
    let delay = this.pendingStart ? 50 : update.state.facet(completionConfig).activateOnTypingDelay;
    this.debounceUpdate = cState.active.some((a) => a.state == 1 && !this.running.some((q) => q.active.source == a.source)) ? setTimeout(() => this.startUpdate(), delay) : -1;
    if (this.composing != 0)
      for (let tr of update.transactions) {
        if (getUserEvent(tr) == "input")
          this.composing = 2;
        else if (this.composing == 2 && tr.selection)
          this.composing = 3;
      }
  }
  startUpdate() {
    this.debounceUpdate = -1;
    this.pendingStart = false;
    let { state } = this.view, cState = state.field(completionState);
    for (let active of cState.active) {
      if (active.state == 1 && !this.running.some((r) => r.active.source == active.source))
        this.startQuery(active);
    }
  }
  startQuery(active) {
    let { state } = this.view, pos = cur(state);
    let context = new CompletionContext(state, pos, active.explicitPos == pos);
    let pending = new RunningQuery(active, context);
    this.running.push(pending);
    Promise.resolve(active.source(context)).then((result) => {
      if (!pending.context.aborted) {
        pending.done = result || null;
        this.scheduleAccept();
      }
    }, (err) => {
      this.view.dispatch({ effects: closeCompletionEffect.of(null) });
      logException(this.view.state, err);
    });
  }
  scheduleAccept() {
    if (this.running.every((q) => q.done !== void 0))
      this.accept();
    else if (this.debounceAccept < 0)
      this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(completionConfig).updateSyncTime);
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var _a;
    if (this.debounceAccept > -1)
      clearTimeout(this.debounceAccept);
    this.debounceAccept = -1;
    let updated = [];
    let conf = this.view.state.facet(completionConfig);
    for (let i = 0; i < this.running.length; i++) {
      let query = this.running[i];
      if (query.done === void 0)
        continue;
      this.running.splice(i--, 1);
      if (query.done) {
        let active = new ActiveResult(query.active.source, query.active.explicitPos, query.done, query.done.from, (_a = query.done.to) !== null && _a !== void 0 ? _a : cur(query.updates.length ? query.updates[0].startState : this.view.state));
        for (let tr of query.updates)
          active = active.update(tr, conf);
        if (active.hasResult()) {
          updated.push(active);
          continue;
        }
      }
      let current = this.view.state.field(completionState).active.find((a) => a.source == query.active.source);
      if (current && current.state == 1) {
        if (query.done == null) {
          let active = new ActiveSource(
            query.active.source,
            0
            /* State.Inactive */
          );
          for (let tr of query.updates)
            active = active.update(tr, conf);
          if (active.state != 1)
            updated.push(active);
        } else {
          this.startQuery(current);
        }
      }
    }
    if (updated.length)
      this.view.dispatch({ effects: setActiveEffect.of(updated) });
  }
}, {
  eventHandlers: {
    blur(event) {
      let state = this.view.state.field(completionState, false);
      if (state && state.tooltip && this.view.state.facet(completionConfig).closeOnBlur) {
        let dialog = state.open && getTooltip(this.view, state.open.tooltip);
        if (!dialog || !dialog.dom.contains(event.relatedTarget))
          setTimeout(() => this.view.dispatch({ effects: closeCompletionEffect.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      if (this.composing == 3) {
        setTimeout(() => this.view.dispatch({ effects: startCompletionEffect.of(false) }), 20);
      }
      this.composing = 0;
    }
  }
});
var baseTheme = /* @__PURE__ */ EditorView.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"\xB7\xB7\xB7"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: `${400}px`,
    boxSizing: "border-box"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: `${30}px` },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: `${30}px` },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'\u0192'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'\u25CB'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'\u25CC'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'\u{1D465}'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'\u{1D436}'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'\u{1D461}'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'\u222A'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'\u25A1'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'\u{1F511}\uFE0E'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'\u25A2'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
var FieldPos = class {
  constructor(field, line, from, to) {
    this.field = field;
    this.line = line;
    this.from = from;
    this.to = to;
  }
};
var FieldRange = class _FieldRange {
  constructor(field, from, to) {
    this.field = field;
    this.from = from;
    this.to = to;
  }
  map(changes) {
    let from = changes.mapPos(this.from, -1, MapMode.TrackDel);
    let to = changes.mapPos(this.to, 1, MapMode.TrackDel);
    return from == null || to == null ? null : new _FieldRange(this.field, from, to);
  }
};
var Snippet = class _Snippet {
  constructor(lines, fieldPositions) {
    this.lines = lines;
    this.fieldPositions = fieldPositions;
  }
  instantiate(state, pos) {
    let text = [], lineStart = [pos];
    let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
    for (let line of this.lines) {
      if (text.length) {
        let indent2 = baseIndent, tabs = /^\t*/.exec(line)[0].length;
        for (let i = 0; i < tabs; i++)
          indent2 += state.facet(indentUnit);
        lineStart.push(pos + indent2.length - tabs);
        line = indent2 + line.slice(tabs);
      }
      text.push(line);
      pos += line.length + 1;
    }
    let ranges = this.fieldPositions.map((pos2) => new FieldRange(pos2.field, lineStart[pos2.line] + pos2.from, lineStart[pos2.line] + pos2.to));
    return { text, ranges };
  }
  static parse(template) {
    let fields = [];
    let lines = [], positions = [], m;
    for (let line of template.split(/\r\n?|\n/)) {
      while (m = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(line)) {
        let seq = m[1] ? +m[1] : null, name = m[2] || m[3] || "", found = -1;
        for (let i = 0; i < fields.length; i++) {
          if (seq != null ? fields[i].seq == seq : name ? fields[i].name == name : false)
            found = i;
        }
        if (found < 0) {
          let i = 0;
          while (i < fields.length && (seq == null || fields[i].seq != null && fields[i].seq < seq))
            i++;
          fields.splice(i, 0, { seq, name });
          found = i;
          for (let pos of positions)
            if (pos.field >= found)
              pos.field++;
        }
        positions.push(new FieldPos(found, lines.length, m.index, m.index + name.length));
        line = line.slice(0, m.index) + name + line.slice(m.index + m[0].length);
      }
      for (let esc; esc = /\\([{}])/.exec(line); ) {
        line = line.slice(0, esc.index) + esc[1] + line.slice(esc.index + esc[0].length);
        for (let pos of positions)
          if (pos.line == lines.length && pos.from > esc.index) {
            pos.from--;
            pos.to--;
          }
      }
      lines.push(line);
    }
    return new _Snippet(lines, positions);
  }
};
var fieldMarker = /* @__PURE__ */ Decoration.widget({ widget: /* @__PURE__ */ new class extends WidgetType {
  toDOM() {
    let span = document.createElement("span");
    span.className = "cm-snippetFieldPosition";
    return span;
  }
  ignoreEvent() {
    return false;
  }
}() });
var fieldRange = /* @__PURE__ */ Decoration.mark({ class: "cm-snippetField" });
var ActiveSnippet = class _ActiveSnippet {
  constructor(ranges, active) {
    this.ranges = ranges;
    this.active = active;
    this.deco = Decoration.set(ranges.map((r) => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)));
  }
  map(changes) {
    let ranges = [];
    for (let r of this.ranges) {
      let mapped = r.map(changes);
      if (!mapped)
        return null;
      ranges.push(mapped);
    }
    return new _ActiveSnippet(ranges, this.active);
  }
  selectionInsideField(sel) {
    return sel.ranges.every((range) => this.ranges.some((r) => r.field == this.active && r.from <= range.from && r.to >= range.to));
  }
};
var setActive = /* @__PURE__ */ StateEffect.define({
  map(value, changes) {
    return value && value.map(changes);
  }
});
var moveToField = /* @__PURE__ */ StateEffect.define();
var snippetState = /* @__PURE__ */ StateField.define({
  create() {
    return null;
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setActive))
        return effect.value;
      if (effect.is(moveToField) && value)
        return new ActiveSnippet(value.ranges, effect.value);
    }
    if (value && tr.docChanged)
      value = value.map(tr.changes);
    if (value && tr.selection && !value.selectionInsideField(tr.selection))
      value = null;
    return value;
  },
  provide: (f) => EditorView.decorations.from(f, (val) => val ? val.deco : Decoration.none)
});
function fieldSelection(ranges, field) {
  return EditorSelection.create(ranges.filter((r) => r.field == field).map((r) => EditorSelection.range(r.from, r.to)));
}
function snippet(template) {
  let snippet2 = Snippet.parse(template);
  return (editor, completion, from, to) => {
    let { text, ranges } = snippet2.instantiate(editor.state, from);
    let spec = {
      changes: { from, to, insert: Text.of(text) },
      scrollIntoView: true,
      annotations: completion ? [pickedCompletion.of(completion), Transaction.userEvent.of("input.complete")] : void 0
    };
    if (ranges.length)
      spec.selection = fieldSelection(ranges, 0);
    if (ranges.some((r) => r.field > 0)) {
      let active = new ActiveSnippet(ranges, 0);
      let effects = spec.effects = [setActive.of(active)];
      if (editor.state.field(snippetState, false) === void 0)
        effects.push(StateEffect.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme]));
    }
    editor.dispatch(editor.state.update(spec));
  };
}
function moveField(dir) {
  return ({ state, dispatch }) => {
    let active = state.field(snippetState, false);
    if (!active || dir < 0 && active.active == 0)
      return false;
    let next = active.active + dir, last = dir > 0 && !active.ranges.some((r) => r.field == next + dir);
    dispatch(state.update({
      selection: fieldSelection(active.ranges, next),
      effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next)),
      scrollIntoView: true
    }));
    return true;
  };
}
var clearSnippet = ({ state, dispatch }) => {
  let active = state.field(snippetState, false);
  if (!active)
    return false;
  dispatch(state.update({ effects: setActive.of(null) }));
  return true;
};
var nextSnippetField = /* @__PURE__ */ moveField(1);
var prevSnippetField = /* @__PURE__ */ moveField(-1);
var defaultSnippetKeymap = [
  { key: "Tab", run: nextSnippetField, shift: prevSnippetField },
  { key: "Escape", run: clearSnippet }
];
var snippetKeymap = /* @__PURE__ */ Facet.define({
  combine(maps) {
    return maps.length ? maps[0] : defaultSnippetKeymap;
  }
});
var addSnippetKeymap = /* @__PURE__ */ Prec.highest(/* @__PURE__ */ keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
function snippetCompletion(template, completion) {
  return Object.assign(Object.assign({}, completion), { apply: snippet(template) });
}
var snippetPointerHandler = /* @__PURE__ */ EditorView.domEventHandlers({
  mousedown(event, view) {
    let active = view.state.field(snippetState, false), pos;
    if (!active || (pos = view.posAtCoords({ x: event.clientX, y: event.clientY })) == null)
      return false;
    let match = active.ranges.find((r) => r.from <= pos && r.to >= pos);
    if (!match || match.field == active.active)
      return false;
    view.dispatch({
      selection: fieldSelection(active.ranges, match.field),
      effects: setActive.of(active.ranges.some((r) => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null),
      scrollIntoView: true
    });
    return true;
  }
});
var defaults = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
};
var closeBracketEffect = /* @__PURE__ */ StateEffect.define({
  map(value, mapping) {
    let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter);
    return mapped == null ? void 0 : mapped;
  }
});
var closedBracket = /* @__PURE__ */ new class extends RangeValue {
}();
closedBracket.startSide = 1;
closedBracket.endSide = -1;
var bracketState = /* @__PURE__ */ StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(value, tr) {
    value = value.map(tr.changes);
    if (tr.selection) {
      let line = tr.state.doc.lineAt(tr.selection.main.head);
      value = value.update({ filter: (from) => from >= line.from && from <= line.to });
    }
    for (let effect of tr.effects)
      if (effect.is(closeBracketEffect))
        value = value.update({ add: [closedBracket.range(effect.value, effect.value + 1)] });
    return value;
  }
});
function closeBrackets() {
  return [inputHandler, bracketState];
}
var definedClosing = "()[]{}<>";
function closing(ch) {
  for (let i = 0; i < definedClosing.length; i += 2)
    if (definedClosing.charCodeAt(i) == ch)
      return definedClosing.charAt(i + 1);
  return fromCodePoint(ch < 128 ? ch : ch + 1);
}
function config(state, pos) {
  return state.languageDataAt("closeBrackets", pos)[0] || defaults;
}
var android = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent);
var inputHandler = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, insert) => {
  if ((android ? view.composing : view.compositionStarted) || view.state.readOnly)
    return false;
  let sel = view.state.selection.main;
  if (insert.length > 2 || insert.length == 2 && codePointSize(codePointAt(insert, 0)) == 1 || from != sel.from || to != sel.to)
    return false;
  let tr = insertBracket(view.state, insert);
  if (!tr)
    return false;
  view.dispatch(tr);
  return true;
});
var deleteBracketPair = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let conf = config(state, state.selection.main.head);
  let tokens2 = conf.brackets || defaults.brackets;
  let dont = null, changes = state.changeByRange((range) => {
    if (range.empty) {
      let before = prevChar(state.doc, range.head);
      for (let token of tokens2) {
        if (token == before && nextChar(state.doc, range.head) == closing(codePointAt(token, 0)))
          return {
            changes: { from: range.head - token.length, to: range.head + token.length },
            range: EditorSelection.cursor(range.head - token.length)
          };
      }
    }
    return { range: dont = range };
  });
  if (!dont)
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: "delete.backward" }));
  return !dont;
};
var closeBracketsKeymap = [
  { key: "Backspace", run: deleteBracketPair }
];
function insertBracket(state, bracket) {
  let conf = config(state, state.selection.main.head);
  let tokens2 = conf.brackets || defaults.brackets;
  for (let tok of tokens2) {
    let closed = closing(codePointAt(tok, 0));
    if (bracket == tok)
      return closed == tok ? handleSame(state, tok, tokens2.indexOf(tok + tok + tok) > -1, conf) : handleOpen(state, tok, closed, conf.before || defaults.before);
    if (bracket == closed && closedBracketAt(state, state.selection.main.from))
      return handleClose(state, tok, closed);
  }
  return null;
}
function closedBracketAt(state, pos) {
  let found = false;
  state.field(bracketState).between(0, state.doc.length, (from) => {
    if (from == pos)
      found = true;
  });
  return found;
}
function nextChar(doc, pos) {
  let next = doc.sliceString(pos, pos + 2);
  return next.slice(0, codePointSize(codePointAt(next, 0)));
}
function prevChar(doc, pos) {
  let prev = doc.sliceString(pos - 2, pos);
  return codePointSize(codePointAt(prev, 0)) == prev.length ? prev : prev.slice(1);
}
function handleOpen(state, open, close, closeBefore) {
  let dont = null, changes = state.changeByRange((range) => {
    if (!range.empty)
      return {
        changes: [{ insert: open, from: range.from }, { insert: close, from: range.to }],
        effects: closeBracketEffect.of(range.to + open.length),
        range: EditorSelection.range(range.anchor + open.length, range.head + open.length)
      };
    let next = nextChar(state.doc, range.head);
    if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1)
      return {
        changes: { insert: open + close, from: range.head },
        effects: closeBracketEffect.of(range.head + open.length),
        range: EditorSelection.cursor(range.head + open.length)
      };
    return { range: dont = range };
  });
  return dont ? null : state.update(changes, {
    scrollIntoView: true,
    userEvent: "input.type"
  });
}
function handleClose(state, _open, close) {
  let dont = null, changes = state.changeByRange((range) => {
    if (range.empty && nextChar(state.doc, range.head) == close)
      return {
        changes: { from: range.head, to: range.head + close.length, insert: close },
        range: EditorSelection.cursor(range.head + close.length)
      };
    return dont = { range };
  });
  return dont ? null : state.update(changes, {
    scrollIntoView: true,
    userEvent: "input.type"
  });
}
function handleSame(state, token, allowTriple, config2) {
  let stringPrefixes = config2.stringPrefixes || defaults.stringPrefixes;
  let dont = null, changes = state.changeByRange((range) => {
    if (!range.empty)
      return {
        changes: [{ insert: token, from: range.from }, { insert: token, from: range.to }],
        effects: closeBracketEffect.of(range.to + token.length),
        range: EditorSelection.range(range.anchor + token.length, range.head + token.length)
      };
    let pos = range.head, next = nextChar(state.doc, pos), start;
    if (next == token) {
      if (nodeStart(state, pos)) {
        return {
          changes: { insert: token + token, from: pos },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
      } else if (closedBracketAt(state, pos)) {
        let isTriple = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token;
        let content = isTriple ? token + token + token : token;
        return {
          changes: { from: pos, to: pos + content.length, insert: content },
          range: EditorSelection.cursor(pos + content.length)
        };
      }
    } else if (allowTriple && state.sliceDoc(pos - 2 * token.length, pos) == token + token && (start = canStartStringAt(state, pos - 2 * token.length, stringPrefixes)) > -1 && nodeStart(state, start)) {
      return {
        changes: { insert: token + token + token + token, from: pos },
        effects: closeBracketEffect.of(pos + token.length),
        range: EditorSelection.cursor(pos + token.length)
      };
    } else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
      if (canStartStringAt(state, pos, stringPrefixes) > -1 && !probablyInString(state, pos, token, stringPrefixes))
        return {
          changes: { insert: token + token, from: pos },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
    }
    return { range: dont = range };
  });
  return dont ? null : state.update(changes, {
    scrollIntoView: true,
    userEvent: "input.type"
  });
}
function nodeStart(state, pos) {
  let tree = syntaxTree(state).resolveInner(pos + 1);
  return tree.parent && tree.from == pos;
}
function probablyInString(state, pos, quoteToken, prefixes) {
  let node = syntaxTree(state).resolveInner(pos, -1);
  let maxPrefix = prefixes.reduce((m, p) => Math.max(m, p.length), 0);
  for (let i = 0; i < 5; i++) {
    let start = state.sliceDoc(node.from, Math.min(node.to, node.from + quoteToken.length + maxPrefix));
    let quotePos = start.indexOf(quoteToken);
    if (!quotePos || quotePos > -1 && prefixes.indexOf(start.slice(0, quotePos)) > -1) {
      let first = node.firstChild;
      while (first && first.from == node.from && first.to - first.from > quoteToken.length + quotePos) {
        if (state.sliceDoc(first.to - quoteToken.length, first.to) == quoteToken)
          return false;
        first = first.firstChild;
      }
      return true;
    }
    let parent = node.to == pos && node.parent;
    if (!parent)
      break;
    node = parent;
  }
  return false;
}
function canStartStringAt(state, pos, prefixes) {
  let charCat = state.charCategorizer(pos);
  if (charCat(state.sliceDoc(pos - 1, pos)) != CharCategory.Word)
    return pos;
  for (let prefix of prefixes) {
    let start = pos - prefix.length;
    if (state.sliceDoc(start, pos) == prefix && charCat(state.sliceDoc(start - 1, start)) != CharCategory.Word)
      return start;
  }
  return -1;
}
function autocompletion(config2 = {}) {
  return [
    completionState,
    completionConfig.of(config2),
    completionPlugin,
    completionKeymapExt,
    baseTheme
  ];
}
var completionKeymap = [
  { key: "Ctrl-Space", run: startCompletion },
  { key: "Escape", run: closeCompletion },
  { key: "ArrowDown", run: /* @__PURE__ */ moveCompletionSelection(true) },
  { key: "ArrowUp", run: /* @__PURE__ */ moveCompletionSelection(false) },
  { key: "PageDown", run: /* @__PURE__ */ moveCompletionSelection(true, "page") },
  { key: "PageUp", run: /* @__PURE__ */ moveCompletionSelection(false, "page") },
  { key: "Enter", run: acceptCompletion }
];
var completionKeymapExt = /* @__PURE__ */ Prec.highest(/* @__PURE__ */ keymap.computeN([completionConfig], (state) => state.facet(completionConfig).defaultKeymap ? [completionKeymap] : []));

// ../../node_modules/.pnpm/@codemirror+lang-javascript@6.2.1/node_modules/@codemirror/lang-javascript/dist/index.js
var snippets = [
  /* @__PURE__ */ snippetCompletion("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if (${}) {\n	${}\n} else {\n	${}\n}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
];
var typescriptSnippets = /* @__PURE__ */ snippets.concat([
  /* @__PURE__ */ snippetCompletion("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]);
var cache = /* @__PURE__ */ new NodeWeakMap();
var ScopeNodes = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function defID(type) {
  return (node, def) => {
    let id2 = node.node.getChild("VariableDefinition");
    if (id2)
      def(id2, type);
    return true;
  };
}
var functionContext = ["FunctionDeclaration"];
var gatherCompletions = {
  FunctionDeclaration: /* @__PURE__ */ defID("function"),
  ClassDeclaration: /* @__PURE__ */ defID("class"),
  ClassExpression: () => true,
  EnumDeclaration: /* @__PURE__ */ defID("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ defID("type"),
  NamespaceDeclaration: /* @__PURE__ */ defID("namespace"),
  VariableDefinition(node, def) {
    if (!node.matchContext(functionContext))
      def(node, "variable");
  },
  TypeDefinition(node, def) {
    def(node, "type");
  },
  __proto__: null
};
function getScope(doc, node) {
  let cached = cache.get(node);
  if (cached)
    return cached;
  let completions = [], top = true;
  function def(node2, type) {
    let name = doc.sliceString(node2.from, node2.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
    if (top) {
      top = false;
    } else if (node2.name) {
      let gather = gatherCompletions[node2.name];
      if (gather && gather(node2, def) || ScopeNodes.has(node2.name))
        return false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope(doc, node2.node))
        completions.push(c);
      return false;
    }
  });
  cache.set(node, completions);
  return completions;
}
var Identifier = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/;
var dontComplete = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  ".",
  "?."
];
function localCompletionSource(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete.indexOf(inner.name) > -1)
    return null;
  let isWord = inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to));
  if (!isWord && !context.explicit)
    return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name))
      options = options.concat(getScope(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier
  };
}
var javascriptLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "javascript",
  parser: /* @__PURE__ */ parser3.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        IfStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: flatIndent,
        SwitchBody: (context) => {
          let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
          return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
        },
        Block: /* @__PURE__ */ delimitedIndent({ closing: "}" }),
        ArrowFunction: (cx) => cx.baseIndent + cx.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ continuedIndent({ except: /^{/ }),
        JSXElement(context) {
          let closed = /^\s*<\//.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        JSXEscape(context) {
          let closed = /\s*\}/.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(context) {
          return context.column(context.node.from) + context.unit;
        }
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": foldInside,
        BlockComment(tree) {
          return { from: tree.from + 2, to: tree.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
});
var jsxSublanguage = {
  test: (node) => /^JSX/.test(node.name),
  facet: /* @__PURE__ */ defineLanguageFacet({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
};
var typescriptLanguage = /* @__PURE__ */ javascriptLanguage.configure({ dialect: "ts" }, "typescript");
var jsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ sublanguageProp.add((n) => n.isTop ? [jsxSublanguage] : void 0)]
});
var tsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ sublanguageProp.add((n) => n.isTop ? [jsxSublanguage] : void 0)]
}, "typescript");
var kwCompletion = (name) => ({ label: name, type: "keyword" });
var keywords = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(kwCompletion);
var typescriptKeywords = /* @__PURE__ */ keywords.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(kwCompletion));
function javascript(config2 = {}) {
  let lang = config2.jsx ? config2.typescript ? tsxLanguage : jsxLanguage : config2.typescript ? typescriptLanguage : javascriptLanguage;
  let completions = config2.typescript ? typescriptSnippets.concat(typescriptKeywords) : snippets.concat(keywords);
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(completions))
    }),
    javascriptLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    config2.jsx ? autoCloseTags : []
  ]);
}
function findOpenTag(node) {
  for (; ; ) {
    if (node.name == "JSXOpenTag" || node.name == "JSXSelfClosingTag" || node.name == "JSXFragmentTag")
      return node;
    if (node.name == "JSXEscape" || !node.parent)
      return null;
    node = node.parent;
  }
}
function elementName(doc, tree, max = doc.length) {
  for (let ch = tree === null || tree === void 0 ? void 0 : tree.firstChild; ch; ch = ch.nextSibling) {
    if (ch.name == "JSXIdentifier" || ch.name == "JSXBuiltin" || ch.name == "JSXNamespacedName" || ch.name == "JSXMemberExpression")
      return doc.sliceString(ch.from, Math.min(ch.to, max));
  }
  return "";
}
var android2 = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent);
var autoCloseTags = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, text, defaultInsert) => {
  if ((android2 ? view.composing : view.compositionStarted) || view.state.readOnly || from != to || text != ">" && text != "/" || !javascriptLanguage.isActiveAt(view.state, from, -1))
    return false;
  let base = defaultInsert(), { state } = base;
  let closeTags = state.changeByRange((range) => {
    var _a;
    let { head } = range, around = syntaxTree(state).resolveInner(head - 1, -1), name;
    if (around.name == "JSXStartTag")
      around = around.parent;
    if (state.doc.sliceString(head - 1, head) != text || around.name == "JSXAttributeValue" && around.to > head)
      ;
    else if (text == ">" && around.name == "JSXFragmentTag") {
      return { range, changes: { from: head, insert: `</>` } };
    } else if (text == "/" && around.name == "JSXStartCloseTag") {
      let empty = around.parent, base2 = empty.parent;
      if (base2 && empty.from == head - 2 && ((name = elementName(state.doc, base2.firstChild, head)) || ((_a = base2.firstChild) === null || _a === void 0 ? void 0 : _a.name) == "JSXFragmentTag")) {
        let insert = `${name}>`;
        return { range: EditorSelection.cursor(head + insert.length, -1), changes: { from: head, insert } };
      }
    } else if (text == ">") {
      let openTag = findOpenTag(around);
      if (openTag && !/^\/?>|^<\//.test(state.doc.sliceString(head, head + 2)) && (name = elementName(state.doc, openTag, head)))
        return { range, changes: { from: head, insert: `</${name}>` } };
    }
    return { range };
  });
  if (closeTags.changes.empty)
    return false;
  view.dispatch([
    base,
    state.update(closeTags, { userEvent: "input.complete", scrollIntoView: true })
  ]);
  return true;
});

// ../../node_modules/.pnpm/@codemirror+lang-html@6.4.8/node_modules/@codemirror/lang-html/dist/index.js
var Targets = ["_blank", "_self", "_top", "_parent"];
var Charsets = ["ascii", "utf-8", "utf-16", "latin1", "latin1"];
var Methods = ["get", "post", "put", "delete"];
var Encs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
var Bool = ["true", "false"];
var S = {};
var Tags = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: Targets,
      hreflang: null
    }
  },
  abbr: S,
  address: S,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ["default", "rect", "circle", "poly"]
    }
  },
  article: S,
  aside: S,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["none", "metadata", "auto"],
      autoplay: ["autoplay"],
      loop: ["loop"],
      controls: ["controls"]
    }
  },
  b: S,
  base: { attrs: { href: null, target: Targets } },
  bdi: S,
  bdo: S,
  blockquote: { attrs: { cite: null } },
  body: S,
  br: S,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ["novalidate"],
      formtarget: Targets,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: S,
  center: S,
  cite: S,
  code: S,
  col: { attrs: { span: null } },
  colgroup: { attrs: { span: null } },
  command: {
    attrs: {
      type: ["command", "checkbox", "radio"],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ["disabled"],
      checked: ["checked"]
    }
  },
  data: { attrs: { value: null } },
  datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
  datalist: { attrs: { data: null } },
  dd: S,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: S,
  div: S,
  dl: S,
  dt: S,
  em: S,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: S,
  figure: S,
  footer: S,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": Charsets,
      autocomplete: ["on", "off"],
      enctype: Encs,
      method: Methods,
      novalidate: ["novalidate"],
      target: Targets
    }
  },
  h1: S,
  h2: S,
  h3: S,
  h4: S,
  h5: S,
  h6: S,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: S,
  hgroup: S,
  hr: S,
  html: {
    attrs: { manifest: null }
  },
  i: S,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
      seamless: ["seamless"]
    }
  },
  img: {
    attrs: {
      alt: null,
      src: null,
      ismap: null,
      usemap: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"]
    }
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ["audio/*", "video/*", "image/*"],
      autocomplete: ["on", "off"],
      autofocus: ["autofocus"],
      checked: ["checked"],
      disabled: ["disabled"],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ["novalidate"],
      formtarget: Targets,
      multiple: ["multiple"],
      readonly: ["readonly"],
      required: ["required"],
      type: [
        "hidden",
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "datetime",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "range",
        "color",
        "checkbox",
        "radio",
        "file",
        "submit",
        "image",
        "reset",
        "button"
      ]
    }
  },
  ins: { attrs: { cite: null, datetime: null } },
  kbd: S,
  keygen: {
    attrs: {
      challenge: null,
      form: null,
      name: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      keytype: ["RSA"]
    }
  },
  label: { attrs: { for: null, form: null } },
  legend: S,
  li: { attrs: { value: null } },
  link: {
    attrs: {
      href: null,
      type: null,
      hreflang: null,
      media: null,
      sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
    }
  },
  map: { attrs: { name: null } },
  mark: S,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: Charsets,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: S,
  noscript: S,
  object: {
    attrs: {
      data: null,
      type: null,
      name: null,
      usemap: null,
      form: null,
      width: null,
      height: null,
      typemustmatch: ["typemustmatch"]
    }
  },
  ol: {
    attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
    children: ["li", "script", "template", "ul", "ol"]
  },
  optgroup: { attrs: { disabled: ["disabled"], label: null } },
  option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
  output: { attrs: { for: null, form: null, name: null } },
  p: S,
  param: { attrs: { name: null, value: null } },
  pre: S,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: S,
  rt: S,
  ruby: S,
  samp: S,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: Charsets
    }
  },
  section: S,
  select: {
    attrs: {
      form: null,
      name: null,
      size: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      multiple: ["multiple"]
    }
  },
  slot: { attrs: { name: null } },
  small: S,
  source: { attrs: { src: null, type: null, media: null } },
  span: S,
  strong: S,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: S,
  summary: S,
  sup: S,
  table: S,
  tbody: S,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
  template: S,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      readonly: ["readonly"],
      required: ["required"],
      wrap: ["soft", "hard"]
    }
  },
  tfoot: S,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: S,
  time: { attrs: { datetime: null } },
  title: S,
  tr: S,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: S,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["auto", "metadata", "none"],
      autoplay: ["autoplay"],
      mediagroup: ["movie"],
      muted: ["muted"],
      controls: ["controls"]
    }
  },
  wbr: S
};
var GlobalAttrs = {
  accesskey: null,
  class: null,
  contenteditable: Bool,
  contextmenu: null,
  dir: ["ltr", "rtl", "auto"],
  draggable: ["true", "false", "auto"],
  dropzone: ["copy", "move", "link", "string:", "file:"],
  hidden: ["hidden"],
  id: null,
  inert: ["inert"],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ["itemscope"],
  itemtype: null,
  lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
  spellcheck: Bool,
  autocorrect: Bool,
  autocapitalize: Bool,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": Bool,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": Bool,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": Bool,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": Bool,
  "aria-hidden": Bool,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": Bool,
  "aria-multiselectable": Bool,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": Bool,
  "aria-relevant": null,
  "aria-required": Bool,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
};
var eventAttributes = /* @__PURE__ */ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
for (let a of eventAttributes)
  GlobalAttrs[a] = null;
var Schema = class {
  constructor(extraTags, extraAttrs) {
    this.tags = Object.assign(Object.assign({}, Tags), extraTags);
    this.globalAttrs = Object.assign(Object.assign({}, GlobalAttrs), extraAttrs);
    this.allTags = Object.keys(this.tags);
    this.globalAttrNames = Object.keys(this.globalAttrs);
  }
};
Schema.default = /* @__PURE__ */ new Schema();
function elementName2(doc, tree, max = doc.length) {
  if (!tree)
    return "";
  let tag = tree.firstChild;
  let name = tag && tag.getChild("TagName");
  return name ? doc.sliceString(name.from, Math.min(name.to, max)) : "";
}
function findParentElement(tree, skip = false) {
  for (; tree; tree = tree.parent)
    if (tree.name == "Element") {
      if (skip)
        skip = false;
      else
        return tree;
    }
  return null;
}
function allowedChildren(doc, tree, schema) {
  let parentInfo = schema.tags[elementName2(doc, findParentElement(tree))];
  return (parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.children) || schema.allTags;
}
function openTags(doc, tree) {
  let open = [];
  for (let parent = findParentElement(tree); parent && !parent.type.isTop; parent = findParentElement(parent.parent)) {
    let tagName = elementName2(doc, parent);
    if (tagName && parent.lastChild.name == "CloseTag")
      break;
    if (tagName && open.indexOf(tagName) < 0 && (tree.name == "EndTag" || tree.from >= parent.firstChild.to))
      open.push(tagName);
  }
  return open;
}
var identifier3 = /^[:\-\.\w\u00b7-\uffff]*$/;
function completeTag(state, schema, tree, from, to) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
  let parent = findParentElement(tree, true);
  return {
    from,
    to,
    options: allowedChildren(state.doc, parent, schema).map((tagName) => ({ label: tagName, type: "type" })).concat(openTags(state.doc, tree).map((tag, i) => ({
      label: "/" + tag,
      apply: "/" + tag + end,
      type: "type",
      boost: 99 - i
    }))),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function completeCloseTag(state, tree, from, to) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
  return {
    from,
    to,
    options: openTags(state.doc, tree).map((tag, i) => ({ label: tag, apply: tag + end, type: "type", boost: 99 - i })),
    validFor: identifier3
  };
}
function completeStartTag(state, schema, tree, pos) {
  let options = [], level = 0;
  for (let tagName of allowedChildren(state.doc, tree, schema))
    options.push({ label: "<" + tagName, type: "type" });
  for (let open of openTags(state.doc, tree))
    options.push({ label: "</" + open + ">", type: "type", boost: 99 - level++ });
  return { from: pos, to: pos, options, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function completeAttrName(state, schema, tree, from, to) {
  let elt2 = findParentElement(tree), info = elt2 ? schema.tags[elementName2(state.doc, elt2)] : null;
  let localAttrs = info && info.attrs ? Object.keys(info.attrs) : [];
  let names = info && info.globalAttrs === false ? localAttrs : localAttrs.length ? localAttrs.concat(schema.globalAttrNames) : schema.globalAttrNames;
  return {
    from,
    to,
    options: names.map((attrName) => ({ label: attrName, type: "property" })),
    validFor: identifier3
  };
}
function completeAttrValue(state, schema, tree, from, to) {
  var _a;
  let nameNode = (_a = tree.parent) === null || _a === void 0 ? void 0 : _a.getChild("AttributeName");
  let options = [], token = void 0;
  if (nameNode) {
    let attrName = state.sliceDoc(nameNode.from, nameNode.to);
    let attrs = schema.globalAttrs[attrName];
    if (!attrs) {
      let elt2 = findParentElement(tree), info = elt2 ? schema.tags[elementName2(state.doc, elt2)] : null;
      attrs = (info === null || info === void 0 ? void 0 : info.attrs) && info.attrs[attrName];
    }
    if (attrs) {
      let base = state.sliceDoc(from, to).toLowerCase(), quoteStart = '"', quoteEnd = '"';
      if (/^['"]/.test(base)) {
        token = base[0] == '"' ? /^[^"]*$/ : /^[^']*$/;
        quoteStart = "";
        quoteEnd = state.sliceDoc(to, to + 1) == base[0] ? "" : base[0];
        base = base.slice(1);
        from++;
      } else {
        token = /^[^\s<>='"]*$/;
      }
      for (let value of attrs)
        options.push({ label: value, apply: quoteStart + value + quoteEnd, type: "constant" });
    }
  }
  return { from, to, options, validFor: token };
}
function htmlCompletionFor(schema, context) {
  let { state, pos } = context, tree = syntaxTree(state).resolveInner(pos, -1), around = tree.resolve(pos);
  for (let scan = pos, before; around == tree && (before = tree.childBefore(scan)); ) {
    let last = before.lastChild;
    if (!last || !last.type.isError || last.from < last.to)
      break;
    around = tree = before;
    scan = last.from;
  }
  if (tree.name == "TagName") {
    return tree.parent && /CloseTag$/.test(tree.parent.name) ? completeCloseTag(state, tree, tree.from, pos) : completeTag(state, schema, tree, tree.from, pos);
  } else if (tree.name == "StartTag") {
    return completeTag(state, schema, tree, pos, pos);
  } else if (tree.name == "StartCloseTag" || tree.name == "IncompleteCloseTag") {
    return completeCloseTag(state, tree, pos, pos);
  } else if (tree.name == "OpenTag" || tree.name == "SelfClosingTag" || tree.name == "AttributeName") {
    return completeAttrName(state, schema, tree, tree.name == "AttributeName" ? tree.from : pos, pos);
  } else if (tree.name == "Is" || tree.name == "AttributeValue" || tree.name == "UnquotedAttributeValue") {
    return completeAttrValue(state, schema, tree, tree.name == "Is" ? pos : tree.from, pos);
  } else if (context.explicit && (around.name == "Element" || around.name == "Text" || around.name == "Document")) {
    return completeStartTag(state, schema, tree, pos);
  } else {
    return null;
  }
}
function htmlCompletionSource(context) {
  return htmlCompletionFor(Schema.default, context);
}
function htmlCompletionSourceWith(config2) {
  let { extraTags, extraGlobalAttributes: extraAttrs } = config2;
  let schema = extraAttrs || extraTags ? new Schema(extraTags, extraAttrs) : Schema.default;
  return (context) => htmlCompletionFor(schema, context);
}
var jsonParser = /* @__PURE__ */ javascriptLanguage.parser.configure({ top: "SingleExpression" });
var defaultNesting = [
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/typescript" || attrs.lang == "ts",
    parser: typescriptLanguage.parser
  },
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/babel" || attrs.type == "text/jsx",
    parser: jsxLanguage.parser
  },
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/typescript-jsx",
    parser: tsxLanguage.parser
  },
  {
    tag: "script",
    attrs(attrs) {
      return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(attrs.type);
    },
    parser: jsonParser
  },
  {
    tag: "script",
    attrs(attrs) {
      return !attrs.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(attrs.type);
    },
    parser: javascriptLanguage.parser
  },
  {
    tag: "style",
    attrs(attrs) {
      return (!attrs.lang || attrs.lang == "css") && (!attrs.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(attrs.type));
    },
    parser: cssLanguage.parser
  }
];
var defaultAttrs = /* @__PURE__ */ [
  {
    name: "style",
    parser: /* @__PURE__ */ cssLanguage.parser.configure({ top: "Styles" })
  }
].concat(/* @__PURE__ */ eventAttributes.map((name) => ({ name, parser: javascriptLanguage.parser })));
var htmlPlain = /* @__PURE__ */ LRLanguage.define({
  name: "html",
  parser: /* @__PURE__ */ parser2.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Element(context) {
          let after = /^(\s*)(<\/)?/.exec(context.textAfter);
          if (context.node.to <= context.pos + after[0].length)
            return context.continue();
          return context.lineIndent(context.node.from) + (after[2] ? 0 : context.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(context) {
          return context.column(context.node.from) + context.unit;
        },
        Document(context) {
          if (context.pos + /\s*/.exec(context.textAfter)[0].length < context.node.to)
            return context.continue();
          let endElt = null, close;
          for (let cur2 = context.node; ; ) {
            let last = cur2.lastChild;
            if (!last || last.name != "Element" || last.to != cur2.to)
              break;
            endElt = cur2 = last;
          }
          if (endElt && !((close = endElt.lastChild) && (close.name == "CloseTag" || close.name == "SelfClosingTag")))
            return context.lineIndent(endElt.from) + context.unit;
          return null;
        }
      }),
      /* @__PURE__ */ foldNodeProp.add({
        Element(node) {
          let first = node.firstChild, last = node.lastChild;
          if (!first || first.name != "OpenTag")
            return null;
          return { from: first.to, to: last.name == "CloseTag" ? last.from : node.to };
        }
      }),
      /* @__PURE__ */ bracketMatchingHandle.add({
        "OpenTag CloseTag": (node) => node.getChild("TagName")
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-._"
  }
});
var htmlLanguage = /* @__PURE__ */ htmlPlain.configure({
  wrap: /* @__PURE__ */ configureNesting(defaultNesting, defaultAttrs)
});
function html(config2 = {}) {
  let dialect2 = "", wrap;
  if (config2.matchClosingTags === false)
    dialect2 = "noMatch";
  if (config2.selfClosingTags === true)
    dialect2 = (dialect2 ? dialect2 + " " : "") + "selfClosing";
  if (config2.nestedLanguages && config2.nestedLanguages.length || config2.nestedAttributes && config2.nestedAttributes.length)
    wrap = configureNesting((config2.nestedLanguages || []).concat(defaultNesting), (config2.nestedAttributes || []).concat(defaultAttrs));
  let lang = wrap ? htmlPlain.configure({ wrap, dialect: dialect2 }) : dialect2 ? htmlLanguage.configure({ dialect: dialect2 }) : htmlLanguage;
  return new LanguageSupport(lang, [
    htmlLanguage.data.of({ autocomplete: htmlCompletionSourceWith(config2) }),
    config2.autoCloseTags !== false ? autoCloseTags2 : [],
    javascript().support,
    css().support
  ]);
}
var selfClosers2 = /* @__PURE__ */ new Set(/* @__PURE__ */ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
var autoCloseTags2 = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, text, insertTransaction) => {
  if (view.composing || view.state.readOnly || from != to || text != ">" && text != "/" || !htmlLanguage.isActiveAt(view.state, from, -1))
    return false;
  let base = insertTransaction(), { state } = base;
  let closeTags = state.changeByRange((range) => {
    var _a, _b, _c;
    let didType = state.doc.sliceString(range.from - 1, range.to) == text;
    let { head } = range, around = syntaxTree(state).resolveInner(head - 1, -1), name;
    if (around.name == "TagName" || around.name == "StartTag")
      around = around.parent;
    if (didType && text == ">" && around.name == "OpenTag") {
      if (((_b = (_a = around.parent) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.name) != "CloseTag" && (name = elementName2(state.doc, around.parent, head)) && !selfClosers2.has(name)) {
        let to2 = head + (state.doc.sliceString(head, head + 1) === ">" ? 1 : 0);
        let insert = `</${name}>`;
        return { range, changes: { from: head, to: to2, insert } };
      }
    } else if (didType && text == "/" && around.name == "IncompleteCloseTag") {
      let base2 = around.parent;
      if (around.from == head - 2 && ((_c = base2.lastChild) === null || _c === void 0 ? void 0 : _c.name) != "CloseTag" && (name = elementName2(state.doc, base2, head)) && !selfClosers2.has(name)) {
        let to2 = head + (state.doc.sliceString(head, head + 1) === ">" ? 1 : 0);
        let insert = `${name}>`;
        return {
          range: EditorSelection.cursor(head + insert.length, -1),
          changes: { from: head, to: to2, insert }
        };
      }
    }
    return { range };
  });
  if (closeTags.changes.empty)
    return false;
  view.dispatch([
    base,
    state.update(closeTags, {
      userEvent: "input.complete",
      scrollIntoView: true
    })
  ]);
  return true;
});

// ../../node_modules/.pnpm/@lezer+json@1.0.2/node_modules/@lezer/json/dist/index.js
var jsonHighlighting = styleTags({
  String: tags.string,
  Number: tags.number,
  "True False": tags.bool,
  PropertyName: tags.propertyName,
  Null: tags.null,
  ",": tags.separator,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace
});
var parser4 = LRParser.deserialize({
  version: 14,
  states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",
  stateData: "#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",
  goto: "!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
  nodeNames: "\u26A0 JsonText True False Null Number String } { Object Property PropertyName ] [ Array",
  maxTerm: 25,
  nodeProps: [
    ["isolate", -2, 6, 11, ""],
    ["openedBy", 7, "{", 12, "["],
    ["closedBy", 8, "}", 13, "]"]
  ],
  propSources: [jsonHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 2,
  tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oc~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Oe~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zOh~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yOg~~'OO]~~'TO[~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
  tokenizers: [0],
  topRules: { "JsonText": [0, 1] },
  tokenPrec: 0
});

// ../../node_modules/.pnpm/@codemirror+lang-json@6.0.1/node_modules/@codemirror/lang-json/dist/index.js
var jsonLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "json",
  parser: /* @__PURE__ */ parser4.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Object: /* @__PURE__ */ continuedIndent({ except: /^\s*\}/ }),
        Array: /* @__PURE__ */ continuedIndent({ except: /^\s*\]/ })
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "Object Array": foldInside
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["[", "{", '"'] },
    indentOnInput: /^\s*[\}\]]$/
  }
});
function json() {
  return new LanguageSupport(jsonLanguage);
}

// ../../node_modules/.pnpm/@lezer+markdown@1.2.0/node_modules/@lezer/markdown/dist/index.js
var CompositeBlock = class _CompositeBlock {
  static create(type, value, from, parentHash, end) {
    let hash3 = parentHash + (parentHash << 8) + type + (value << 4) | 0;
    return new _CompositeBlock(type, value, from, hash3, end, [], []);
  }
  constructor(type, value, from, hash3, end, children, positions) {
    this.type = type;
    this.value = value;
    this.from = from;
    this.hash = hash3;
    this.end = end;
    this.children = children;
    this.positions = positions;
    this.hashProp = [[NodeProp.contextHash, hash3]];
  }
  addChild(child, pos) {
    if (child.prop(NodeProp.contextHash) != this.hash)
      child = new Tree(child.type, child.children, child.positions, child.length, this.hashProp);
    this.children.push(child);
    this.positions.push(pos);
  }
  toTree(nodeSet, end = this.end) {
    let last = this.children.length - 1;
    if (last >= 0)
      end = Math.max(end, this.positions[last] + this.children[last].length + this.from);
    return new Tree(nodeSet.types[this.type], this.children, this.positions, end - this.from).balance({
      makeTree: (children, positions, length) => new Tree(NodeType.none, children, positions, length, this.hashProp)
    });
  }
};
var Type;
(function(Type3) {
  Type3[Type3["Document"] = 1] = "Document";
  Type3[Type3["CodeBlock"] = 2] = "CodeBlock";
  Type3[Type3["FencedCode"] = 3] = "FencedCode";
  Type3[Type3["Blockquote"] = 4] = "Blockquote";
  Type3[Type3["HorizontalRule"] = 5] = "HorizontalRule";
  Type3[Type3["BulletList"] = 6] = "BulletList";
  Type3[Type3["OrderedList"] = 7] = "OrderedList";
  Type3[Type3["ListItem"] = 8] = "ListItem";
  Type3[Type3["ATXHeading1"] = 9] = "ATXHeading1";
  Type3[Type3["ATXHeading2"] = 10] = "ATXHeading2";
  Type3[Type3["ATXHeading3"] = 11] = "ATXHeading3";
  Type3[Type3["ATXHeading4"] = 12] = "ATXHeading4";
  Type3[Type3["ATXHeading5"] = 13] = "ATXHeading5";
  Type3[Type3["ATXHeading6"] = 14] = "ATXHeading6";
  Type3[Type3["SetextHeading1"] = 15] = "SetextHeading1";
  Type3[Type3["SetextHeading2"] = 16] = "SetextHeading2";
  Type3[Type3["HTMLBlock"] = 17] = "HTMLBlock";
  Type3[Type3["LinkReference"] = 18] = "LinkReference";
  Type3[Type3["Paragraph"] = 19] = "Paragraph";
  Type3[Type3["CommentBlock"] = 20] = "CommentBlock";
  Type3[Type3["ProcessingInstructionBlock"] = 21] = "ProcessingInstructionBlock";
  Type3[Type3["Escape"] = 22] = "Escape";
  Type3[Type3["Entity"] = 23] = "Entity";
  Type3[Type3["HardBreak"] = 24] = "HardBreak";
  Type3[Type3["Emphasis"] = 25] = "Emphasis";
  Type3[Type3["StrongEmphasis"] = 26] = "StrongEmphasis";
  Type3[Type3["Link"] = 27] = "Link";
  Type3[Type3["Image"] = 28] = "Image";
  Type3[Type3["InlineCode"] = 29] = "InlineCode";
  Type3[Type3["HTMLTag"] = 30] = "HTMLTag";
  Type3[Type3["Comment"] = 31] = "Comment";
  Type3[Type3["ProcessingInstruction"] = 32] = "ProcessingInstruction";
  Type3[Type3["Autolink"] = 33] = "Autolink";
  Type3[Type3["HeaderMark"] = 34] = "HeaderMark";
  Type3[Type3["QuoteMark"] = 35] = "QuoteMark";
  Type3[Type3["ListMark"] = 36] = "ListMark";
  Type3[Type3["LinkMark"] = 37] = "LinkMark";
  Type3[Type3["EmphasisMark"] = 38] = "EmphasisMark";
  Type3[Type3["CodeMark"] = 39] = "CodeMark";
  Type3[Type3["CodeText"] = 40] = "CodeText";
  Type3[Type3["CodeInfo"] = 41] = "CodeInfo";
  Type3[Type3["LinkTitle"] = 42] = "LinkTitle";
  Type3[Type3["LinkLabel"] = 43] = "LinkLabel";
  Type3[Type3["URL"] = 44] = "URL";
})(Type || (Type = {}));
var LeafBlock = class {
  /// @internal
  constructor(start, content) {
    this.start = start;
    this.content = content;
    this.marks = [];
    this.parsers = [];
  }
};
var Line = class {
  constructor() {
    this.text = "";
    this.baseIndent = 0;
    this.basePos = 0;
    this.depth = 0;
    this.markers = [];
    this.pos = 0;
    this.indent = 0;
    this.next = -1;
  }
  /// @internal
  forward() {
    if (this.basePos > this.pos)
      this.forwardInner();
  }
  /// @internal
  forwardInner() {
    let newPos = this.skipSpace(this.basePos);
    this.indent = this.countIndent(newPos, this.pos, this.indent);
    this.pos = newPos;
    this.next = newPos == this.text.length ? -1 : this.text.charCodeAt(newPos);
  }
  /// Skip whitespace after the given position, return the position of
  /// the next non-space character or the end of the line if there's
  /// only space after `from`.
  skipSpace(from) {
    return skipSpace(this.text, from);
  }
  /// @internal
  reset(text) {
    this.text = text;
    this.baseIndent = this.basePos = this.pos = this.indent = 0;
    this.forwardInner();
    this.depth = 1;
    while (this.markers.length)
      this.markers.pop();
  }
  /// Move the line's base position forward to the given position.
  /// This should only be called by composite [block
  /// parsers](#BlockParser.parse) or [markup skipping
  /// functions](#NodeSpec.composite).
  moveBase(to) {
    this.basePos = to;
    this.baseIndent = this.countIndent(to, this.pos, this.indent);
  }
  /// Move the line's base position forward to the given _column_.
  moveBaseColumn(indent2) {
    this.baseIndent = indent2;
    this.basePos = this.findColumn(indent2);
  }
  /// Store a composite-block-level marker. Should be called from
  /// [markup skipping functions](#NodeSpec.composite) when they
  /// consume any non-whitespace characters.
  addMarker(elt2) {
    this.markers.push(elt2);
  }
  /// Find the column position at `to`, optionally starting at a given
  /// position and column.
  countIndent(to, from = 0, indent2 = 0) {
    for (let i = from; i < to; i++)
      indent2 += this.text.charCodeAt(i) == 9 ? 4 - indent2 % 4 : 1;
    return indent2;
  }
  /// Find the position corresponding to the given column.
  findColumn(goal) {
    let i = 0;
    for (let indent2 = 0; i < this.text.length && indent2 < goal; i++)
      indent2 += this.text.charCodeAt(i) == 9 ? 4 - indent2 % 4 : 1;
    return i;
  }
  /// @internal
  scrub() {
    if (!this.baseIndent)
      return this.text;
    let result = "";
    for (let i = 0; i < this.basePos; i++)
      result += " ";
    return result + this.text.slice(this.basePos);
  }
};
function skipForList(bl, cx, line) {
  if (line.pos == line.text.length || bl != cx.block && line.indent >= cx.stack[line.depth + 1].value + line.baseIndent)
    return true;
  if (line.indent >= line.baseIndent + 4)
    return false;
  let size = (bl.type == Type.OrderedList ? isOrderedList : isBulletList)(line, cx, false);
  return size > 0 && (bl.type != Type.BulletList || isHorizontalRule(line, cx, false) < 0) && line.text.charCodeAt(line.pos + size - 1) == bl.value;
}
var DefaultSkipMarkup = {
  [Type.Blockquote](bl, cx, line) {
    if (line.next != 62)
      return false;
    line.markers.push(elt(Type.QuoteMark, cx.lineStart + line.pos, cx.lineStart + line.pos + 1));
    line.moveBase(line.pos + (space3(line.text.charCodeAt(line.pos + 1)) ? 2 : 1));
    bl.end = cx.lineStart + line.text.length;
    return true;
  },
  [Type.ListItem](bl, _cx, line) {
    if (line.indent < line.baseIndent + bl.value && line.next > -1)
      return false;
    line.moveBaseColumn(line.baseIndent + bl.value);
    return true;
  },
  [Type.OrderedList]: skipForList,
  [Type.BulletList]: skipForList,
  [Type.Document]() {
    return true;
  }
};
function space3(ch) {
  return ch == 32 || ch == 9 || ch == 10 || ch == 13;
}
function skipSpace(line, i = 0) {
  while (i < line.length && space3(line.charCodeAt(i)))
    i++;
  return i;
}
function skipSpaceBack(line, i, to) {
  while (i > to && space3(line.charCodeAt(i - 1)))
    i--;
  return i;
}
function isFencedCode(line) {
  if (line.next != 96 && line.next != 126)
    return -1;
  let pos = line.pos + 1;
  while (pos < line.text.length && line.text.charCodeAt(pos) == line.next)
    pos++;
  if (pos < line.pos + 3)
    return -1;
  if (line.next == 96) {
    for (let i = pos; i < line.text.length; i++)
      if (line.text.charCodeAt(i) == 96)
        return -1;
  }
  return pos;
}
function isBlockquote(line) {
  return line.next != 62 ? -1 : line.text.charCodeAt(line.pos + 1) == 32 ? 2 : 1;
}
function isHorizontalRule(line, cx, breaking) {
  if (line.next != 42 && line.next != 45 && line.next != 95)
    return -1;
  let count2 = 1;
  for (let pos = line.pos + 1; pos < line.text.length; pos++) {
    let ch = line.text.charCodeAt(pos);
    if (ch == line.next)
      count2++;
    else if (!space3(ch))
      return -1;
  }
  if (breaking && line.next == 45 && isSetextUnderline(line) > -1 && line.depth == cx.stack.length)
    return -1;
  return count2 < 3 ? -1 : 1;
}
function inList(cx, type) {
  for (let i = cx.stack.length - 1; i >= 0; i--)
    if (cx.stack[i].type == type)
      return true;
  return false;
}
function isBulletList(line, cx, breaking) {
  return (line.next == 45 || line.next == 43 || line.next == 42) && (line.pos == line.text.length - 1 || space3(line.text.charCodeAt(line.pos + 1))) && (!breaking || inList(cx, Type.BulletList) || line.skipSpace(line.pos + 2) < line.text.length) ? 1 : -1;
}
function isOrderedList(line, cx, breaking) {
  let pos = line.pos, next = line.next;
  for (; ; ) {
    if (next >= 48 && next <= 57)
      pos++;
    else
      break;
    if (pos == line.text.length)
      return -1;
    next = line.text.charCodeAt(pos);
  }
  if (pos == line.pos || pos > line.pos + 9 || next != 46 && next != 41 || pos < line.text.length - 1 && !space3(line.text.charCodeAt(pos + 1)) || breaking && !inList(cx, Type.OrderedList) && (line.skipSpace(pos + 1) == line.text.length || pos > line.pos + 1 || line.next != 49))
    return -1;
  return pos + 1 - line.pos;
}
function isAtxHeading(line) {
  if (line.next != 35)
    return -1;
  let pos = line.pos + 1;
  while (pos < line.text.length && line.text.charCodeAt(pos) == 35)
    pos++;
  if (pos < line.text.length && line.text.charCodeAt(pos) != 32)
    return -1;
  let size = pos - line.pos;
  return size > 6 ? -1 : size;
}
function isSetextUnderline(line) {
  if (line.next != 45 && line.next != 61 || line.indent >= line.baseIndent + 4)
    return -1;
  let pos = line.pos + 1;
  while (pos < line.text.length && line.text.charCodeAt(pos) == line.next)
    pos++;
  let end = pos;
  while (pos < line.text.length && space3(line.text.charCodeAt(pos)))
    pos++;
  return pos == line.text.length ? end : -1;
}
var EmptyLine = /^[ \t]*$/;
var CommentEnd = /-->/;
var ProcessingEnd = /\?>/;
var HTMLBlockStyle = [
  [/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
  [/^\s*<!--/, CommentEnd],
  [/^\s*<\?/, ProcessingEnd],
  [/^\s*<![A-Z]/, />/],
  [/^\s*<!\[CDATA\[/, /\]\]>/],
  [/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, EmptyLine],
  [/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, EmptyLine]
];
function isHTMLBlock(line, _cx, breaking) {
  if (line.next != 60)
    return -1;
  let rest = line.text.slice(line.pos);
  for (let i = 0, e = HTMLBlockStyle.length - (breaking ? 1 : 0); i < e; i++)
    if (HTMLBlockStyle[i][0].test(rest))
      return i;
  return -1;
}
function getListIndent(line, pos) {
  let indentAfter = line.countIndent(pos, line.pos, line.indent);
  let indented = line.countIndent(line.skipSpace(pos), pos, indentAfter);
  return indented >= indentAfter + 5 ? indentAfter + 1 : indented;
}
function addCodeText(marks, from, to) {
  let last = marks.length - 1;
  if (last >= 0 && marks[last].to == from && marks[last].type == Type.CodeText)
    marks[last].to = to;
  else
    marks.push(elt(Type.CodeText, from, to));
}
var DefaultBlockParsers = {
  LinkReference: void 0,
  IndentedCode(cx, line) {
    let base = line.baseIndent + 4;
    if (line.indent < base)
      return false;
    let start = line.findColumn(base);
    let from = cx.lineStart + start, to = cx.lineStart + line.text.length;
    let marks = [], pendingMarks = [];
    addCodeText(marks, from, to);
    while (cx.nextLine() && line.depth >= cx.stack.length) {
      if (line.pos == line.text.length) {
        addCodeText(pendingMarks, cx.lineStart - 1, cx.lineStart);
        for (let m of line.markers)
          pendingMarks.push(m);
      } else if (line.indent < base) {
        break;
      } else {
        if (pendingMarks.length) {
          for (let m of pendingMarks) {
            if (m.type == Type.CodeText)
              addCodeText(marks, m.from, m.to);
            else
              marks.push(m);
          }
          pendingMarks = [];
        }
        addCodeText(marks, cx.lineStart - 1, cx.lineStart);
        for (let m of line.markers)
          marks.push(m);
        to = cx.lineStart + line.text.length;
        let codeStart = cx.lineStart + line.findColumn(line.baseIndent + 4);
        if (codeStart < to)
          addCodeText(marks, codeStart, to);
      }
    }
    if (pendingMarks.length) {
      pendingMarks = pendingMarks.filter((m) => m.type != Type.CodeText);
      if (pendingMarks.length)
        line.markers = pendingMarks.concat(line.markers);
    }
    cx.addNode(cx.buffer.writeElements(marks, -from).finish(Type.CodeBlock, to - from), from);
    return true;
  },
  FencedCode(cx, line) {
    let fenceEnd = isFencedCode(line);
    if (fenceEnd < 0)
      return false;
    let from = cx.lineStart + line.pos, ch = line.next, len = fenceEnd - line.pos;
    let infoFrom = line.skipSpace(fenceEnd), infoTo = skipSpaceBack(line.text, line.text.length, infoFrom);
    let marks = [elt(Type.CodeMark, from, from + len)];
    if (infoFrom < infoTo)
      marks.push(elt(Type.CodeInfo, cx.lineStart + infoFrom, cx.lineStart + infoTo));
    for (let first = true; cx.nextLine() && line.depth >= cx.stack.length; first = false) {
      let i = line.pos;
      if (line.indent - line.baseIndent < 4)
        while (i < line.text.length && line.text.charCodeAt(i) == ch)
          i++;
      if (i - line.pos >= len && line.skipSpace(i) == line.text.length) {
        for (let m of line.markers)
          marks.push(m);
        marks.push(elt(Type.CodeMark, cx.lineStart + line.pos, cx.lineStart + i));
        cx.nextLine();
        break;
      } else {
        if (!first)
          addCodeText(marks, cx.lineStart - 1, cx.lineStart);
        for (let m of line.markers)
          marks.push(m);
        let textStart = cx.lineStart + line.basePos, textEnd = cx.lineStart + line.text.length;
        if (textStart < textEnd)
          addCodeText(marks, textStart, textEnd);
      }
    }
    cx.addNode(cx.buffer.writeElements(marks, -from).finish(Type.FencedCode, cx.prevLineEnd() - from), from);
    return true;
  },
  Blockquote(cx, line) {
    let size = isBlockquote(line);
    if (size < 0)
      return false;
    cx.startContext(Type.Blockquote, line.pos);
    cx.addNode(Type.QuoteMark, cx.lineStart + line.pos, cx.lineStart + line.pos + 1);
    line.moveBase(line.pos + size);
    return null;
  },
  HorizontalRule(cx, line) {
    if (isHorizontalRule(line, cx, false) < 0)
      return false;
    let from = cx.lineStart + line.pos;
    cx.nextLine();
    cx.addNode(Type.HorizontalRule, from);
    return true;
  },
  BulletList(cx, line) {
    let size = isBulletList(line, cx, false);
    if (size < 0)
      return false;
    if (cx.block.type != Type.BulletList)
      cx.startContext(Type.BulletList, line.basePos, line.next);
    let newBase = getListIndent(line, line.pos + 1);
    cx.startContext(Type.ListItem, line.basePos, newBase - line.baseIndent);
    cx.addNode(Type.ListMark, cx.lineStart + line.pos, cx.lineStart + line.pos + size);
    line.moveBaseColumn(newBase);
    return null;
  },
  OrderedList(cx, line) {
    let size = isOrderedList(line, cx, false);
    if (size < 0)
      return false;
    if (cx.block.type != Type.OrderedList)
      cx.startContext(Type.OrderedList, line.basePos, line.text.charCodeAt(line.pos + size - 1));
    let newBase = getListIndent(line, line.pos + size);
    cx.startContext(Type.ListItem, line.basePos, newBase - line.baseIndent);
    cx.addNode(Type.ListMark, cx.lineStart + line.pos, cx.lineStart + line.pos + size);
    line.moveBaseColumn(newBase);
    return null;
  },
  ATXHeading(cx, line) {
    let size = isAtxHeading(line);
    if (size < 0)
      return false;
    let off = line.pos, from = cx.lineStart + off;
    let endOfSpace = skipSpaceBack(line.text, line.text.length, off), after = endOfSpace;
    while (after > off && line.text.charCodeAt(after - 1) == line.next)
      after--;
    if (after == endOfSpace || after == off || !space3(line.text.charCodeAt(after - 1)))
      after = line.text.length;
    let buf = cx.buffer.write(Type.HeaderMark, 0, size).writeElements(cx.parser.parseInline(line.text.slice(off + size + 1, after), from + size + 1), -from);
    if (after < line.text.length)
      buf.write(Type.HeaderMark, after - off, endOfSpace - off);
    let node = buf.finish(Type.ATXHeading1 - 1 + size, line.text.length - off);
    cx.nextLine();
    cx.addNode(node, from);
    return true;
  },
  HTMLBlock(cx, line) {
    let type = isHTMLBlock(line, cx, false);
    if (type < 0)
      return false;
    let from = cx.lineStart + line.pos, end = HTMLBlockStyle[type][1];
    let marks = [], trailing = end != EmptyLine;
    while (!end.test(line.text) && cx.nextLine()) {
      if (line.depth < cx.stack.length) {
        trailing = false;
        break;
      }
      for (let m of line.markers)
        marks.push(m);
    }
    if (trailing)
      cx.nextLine();
    let nodeType = end == CommentEnd ? Type.CommentBlock : end == ProcessingEnd ? Type.ProcessingInstructionBlock : Type.HTMLBlock;
    let to = cx.prevLineEnd();
    cx.addNode(cx.buffer.writeElements(marks, -from).finish(nodeType, to - from), from);
    return true;
  },
  SetextHeading: void 0
  // Specifies relative precedence for block-continue function
};
var LinkReferenceParser = class {
  constructor(leaf) {
    this.stage = 0;
    this.elts = [];
    this.pos = 0;
    this.start = leaf.start;
    this.advance(leaf.content);
  }
  nextLine(cx, line, leaf) {
    if (this.stage == -1)
      return false;
    let content = leaf.content + "\n" + line.scrub();
    let finish = this.advance(content);
    if (finish > -1 && finish < content.length)
      return this.complete(cx, leaf, finish);
    return false;
  }
  finish(cx, leaf) {
    if ((this.stage == 2 || this.stage == 3) && skipSpace(leaf.content, this.pos) == leaf.content.length)
      return this.complete(cx, leaf, leaf.content.length);
    return false;
  }
  complete(cx, leaf, len) {
    cx.addLeafElement(leaf, elt(Type.LinkReference, this.start, this.start + len, this.elts));
    return true;
  }
  nextStage(elt2) {
    if (elt2) {
      this.pos = elt2.to - this.start;
      this.elts.push(elt2);
      this.stage++;
      return true;
    }
    if (elt2 === false)
      this.stage = -1;
    return false;
  }
  advance(content) {
    for (; ; ) {
      if (this.stage == -1) {
        return -1;
      } else if (this.stage == 0) {
        if (!this.nextStage(parseLinkLabel(content, this.pos, this.start, true)))
          return -1;
        if (content.charCodeAt(this.pos) != 58)
          return this.stage = -1;
        this.elts.push(elt(Type.LinkMark, this.pos + this.start, this.pos + this.start + 1));
        this.pos++;
      } else if (this.stage == 1) {
        if (!this.nextStage(parseURL(content, skipSpace(content, this.pos), this.start)))
          return -1;
      } else if (this.stage == 2) {
        let skip = skipSpace(content, this.pos), end = 0;
        if (skip > this.pos) {
          let title = parseLinkTitle(content, skip, this.start);
          if (title) {
            let titleEnd = lineEnd(content, title.to - this.start);
            if (titleEnd > 0) {
              this.nextStage(title);
              end = titleEnd;
            }
          }
        }
        if (!end)
          end = lineEnd(content, this.pos);
        return end > 0 && end < content.length ? end : -1;
      } else {
        return lineEnd(content, this.pos);
      }
    }
  }
};
function lineEnd(text, pos) {
  for (; pos < text.length; pos++) {
    let next = text.charCodeAt(pos);
    if (next == 10)
      break;
    if (!space3(next))
      return -1;
  }
  return pos;
}
var SetextHeadingParser = class {
  nextLine(cx, line, leaf) {
    let underline = line.depth < cx.stack.length ? -1 : isSetextUnderline(line);
    let next = line.next;
    if (underline < 0)
      return false;
    let underlineMark = elt(Type.HeaderMark, cx.lineStart + line.pos, cx.lineStart + underline);
    cx.nextLine();
    cx.addLeafElement(leaf, elt(next == 61 ? Type.SetextHeading1 : Type.SetextHeading2, leaf.start, cx.prevLineEnd(), [
      ...cx.parser.parseInline(leaf.content, leaf.start),
      underlineMark
    ]));
    return true;
  }
  finish() {
    return false;
  }
};
var DefaultLeafBlocks = {
  LinkReference(_, leaf) {
    return leaf.content.charCodeAt(0) == 91 ? new LinkReferenceParser(leaf) : null;
  },
  SetextHeading() {
    return new SetextHeadingParser();
  }
};
var DefaultEndLeaf = [
  (_, line) => isAtxHeading(line) >= 0,
  (_, line) => isFencedCode(line) >= 0,
  (_, line) => isBlockquote(line) >= 0,
  (p, line) => isBulletList(line, p, true) >= 0,
  (p, line) => isOrderedList(line, p, true) >= 0,
  (p, line) => isHorizontalRule(line, p, true) >= 0,
  (p, line) => isHTMLBlock(line, p, true) >= 0
];
var scanLineResult = { text: "", end: 0 };
var BlockContext = class {
  /// @internal
  constructor(parser9, input, fragments, ranges) {
    this.parser = parser9;
    this.input = input;
    this.ranges = ranges;
    this.line = new Line();
    this.atEnd = false;
    this.reusePlaceholders = /* @__PURE__ */ new Map();
    this.stoppedAt = null;
    this.rangeI = 0;
    this.to = ranges[ranges.length - 1].to;
    this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = ranges[0].from;
    this.block = CompositeBlock.create(Type.Document, 0, this.lineStart, 0, 0);
    this.stack = [this.block];
    this.fragments = fragments.length ? new FragmentCursor2(fragments, input) : null;
    this.readLine();
  }
  get parsedPos() {
    return this.absoluteLineStart;
  }
  advance() {
    if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt)
      return this.finish();
    let { line } = this;
    for (; ; ) {
      for (let markI = 0; ; ) {
        let next = line.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
        while (markI < line.markers.length && (!next || line.markers[markI].from < next.end)) {
          let mark = line.markers[markI++];
          this.addNode(mark.type, mark.from, mark.to);
        }
        if (!next)
          break;
        this.finishContext();
      }
      if (line.pos < line.text.length)
        break;
      if (!this.nextLine())
        return this.finish();
    }
    if (this.fragments && this.reuseFragment(line.basePos))
      return null;
    start:
      for (; ; ) {
        for (let type of this.parser.blockParsers)
          if (type) {
            let result = type(this, line);
            if (result != false) {
              if (result == true)
                return null;
              line.forward();
              continue start;
            }
          }
        break;
      }
    let leaf = new LeafBlock(this.lineStart + line.pos, line.text.slice(line.pos));
    for (let parse of this.parser.leafBlockParsers)
      if (parse) {
        let parser9 = parse(this, leaf);
        if (parser9)
          leaf.parsers.push(parser9);
      }
    lines:
      while (this.nextLine()) {
        if (line.pos == line.text.length)
          break;
        if (line.indent < line.baseIndent + 4) {
          for (let stop of this.parser.endLeafBlock)
            if (stop(this, line, leaf))
              break lines;
        }
        for (let parser9 of leaf.parsers)
          if (parser9.nextLine(this, line, leaf))
            return null;
        leaf.content += "\n" + line.scrub();
        for (let m of line.markers)
          leaf.marks.push(m);
      }
    this.finishLeaf(leaf);
    return null;
  }
  stopAt(pos) {
    if (this.stoppedAt != null && this.stoppedAt < pos)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = pos;
  }
  reuseFragment(start) {
    if (!this.fragments.moveTo(this.absoluteLineStart + start, this.absoluteLineStart) || !this.fragments.matches(this.block.hash))
      return false;
    let taken = this.fragments.takeNodes(this);
    if (!taken)
      return false;
    this.absoluteLineStart += taken;
    this.lineStart = toRelative(this.absoluteLineStart, this.ranges);
    this.moveRangeI();
    if (this.absoluteLineStart < this.to) {
      this.lineStart++;
      this.absoluteLineStart++;
      this.readLine();
    } else {
      this.atEnd = true;
      this.readLine();
    }
    return true;
  }
  /// The number of parent blocks surrounding the current block.
  get depth() {
    return this.stack.length;
  }
  /// Get the type of the parent block at the given depth. When no
  /// depth is passed, return the type of the innermost parent.
  parentType(depth = this.depth - 1) {
    return this.parser.nodeSet.types[this.stack[depth].type];
  }
  /// Move to the next input line. This should only be called by
  /// (non-composite) [block parsers](#BlockParser.parse) that consume
  /// the line directly, or leaf block parser
  /// [`nextLine`](#LeafBlockParser.nextLine) methods when they
  /// consume the current line (and return true).
  nextLine() {
    this.lineStart += this.line.text.length;
    if (this.absoluteLineEnd >= this.to) {
      this.absoluteLineStart = this.absoluteLineEnd;
      this.atEnd = true;
      this.readLine();
      return false;
    } else {
      this.lineStart++;
      this.absoluteLineStart = this.absoluteLineEnd + 1;
      this.moveRangeI();
      this.readLine();
      return true;
    }
  }
  moveRangeI() {
    while (this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to) {
      this.rangeI++;
      this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from);
    }
  }
  /// @internal
  scanLine(start) {
    let r = scanLineResult;
    r.end = start;
    if (start >= this.to) {
      r.text = "";
    } else {
      r.text = this.lineChunkAt(start);
      r.end += r.text.length;
      if (this.ranges.length > 1) {
        let textOffset = this.absoluteLineStart, rangeI = this.rangeI;
        while (this.ranges[rangeI].to < r.end) {
          rangeI++;
          let nextFrom = this.ranges[rangeI].from;
          let after = this.lineChunkAt(nextFrom);
          r.end = nextFrom + after.length;
          r.text = r.text.slice(0, this.ranges[rangeI - 1].to - textOffset) + after;
          textOffset = r.end - r.text.length;
        }
      }
    }
    return r;
  }
  /// @internal
  readLine() {
    let { line } = this, { text, end } = this.scanLine(this.absoluteLineStart);
    this.absoluteLineEnd = end;
    line.reset(text);
    for (; line.depth < this.stack.length; line.depth++) {
      let cx = this.stack[line.depth], handler = this.parser.skipContextMarkup[cx.type];
      if (!handler)
        throw new Error("Unhandled block context " + Type[cx.type]);
      if (!handler(cx, this, line))
        break;
      line.forward();
    }
  }
  lineChunkAt(pos) {
    let next = this.input.chunk(pos), text;
    if (!this.input.lineChunks) {
      let eol2 = next.indexOf("\n");
      text = eol2 < 0 ? next : next.slice(0, eol2);
    } else {
      text = next == "\n" ? "" : next;
    }
    return pos + text.length > this.to ? text.slice(0, this.to - pos) : text;
  }
  /// The end position of the previous line.
  prevLineEnd() {
    return this.atEnd ? this.lineStart : this.lineStart - 1;
  }
  /// @internal
  startContext(type, start, value = 0) {
    this.block = CompositeBlock.create(type, value, this.lineStart + start, this.block.hash, this.lineStart + this.line.text.length);
    this.stack.push(this.block);
  }
  /// Start a composite block. Should only be called from [block
  /// parser functions](#BlockParser.parse) that return null.
  startComposite(type, start, value = 0) {
    this.startContext(this.parser.getNodeType(type), start, value);
  }
  /// @internal
  addNode(block, from, to) {
    if (typeof block == "number")
      block = new Tree(this.parser.nodeSet.types[block], none2, none2, (to !== null && to !== void 0 ? to : this.prevLineEnd()) - from);
    this.block.addChild(block, from - this.block.from);
  }
  /// Add a block element. Can be called by [block
  /// parsers](#BlockParser.parse).
  addElement(elt2) {
    this.block.addChild(elt2.toTree(this.parser.nodeSet), elt2.from - this.block.from);
  }
  /// Add a block element from a [leaf parser](#LeafBlockParser). This
  /// makes sure any extra composite block markup (such as blockquote
  /// markers) inside the block are also added to the syntax tree.
  addLeafElement(leaf, elt2) {
    this.addNode(this.buffer.writeElements(injectMarks(elt2.children, leaf.marks), -elt2.from).finish(elt2.type, elt2.to - elt2.from), elt2.from);
  }
  /// @internal
  finishContext() {
    let cx = this.stack.pop();
    let top = this.stack[this.stack.length - 1];
    top.addChild(cx.toTree(this.parser.nodeSet), cx.from - top.from);
    this.block = top;
  }
  finish() {
    while (this.stack.length > 1)
      this.finishContext();
    return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart));
  }
  addGaps(tree) {
    return this.ranges.length > 1 ? injectGaps(this.ranges, 0, tree.topNode, this.ranges[0].from, this.reusePlaceholders) : tree;
  }
  /// @internal
  finishLeaf(leaf) {
    for (let parser9 of leaf.parsers)
      if (parser9.finish(this, leaf))
        return;
    let inline = injectMarks(this.parser.parseInline(leaf.content, leaf.start), leaf.marks);
    this.addNode(this.buffer.writeElements(inline, -leaf.start).finish(Type.Paragraph, leaf.content.length), leaf.start);
  }
  elt(type, from, to, children) {
    if (typeof type == "string")
      return elt(this.parser.getNodeType(type), from, to, children);
    return new TreeElement(type, from);
  }
  /// @internal
  get buffer() {
    return new Buffer(this.parser.nodeSet);
  }
};
function injectGaps(ranges, rangeI, tree, offset, dummies) {
  let rangeEnd = ranges[rangeI].to;
  let children = [], positions = [], start = tree.from + offset;
  function movePastNext(upto, inclusive) {
    while (inclusive ? upto >= rangeEnd : upto > rangeEnd) {
      let size = ranges[rangeI + 1].from - rangeEnd;
      offset += size;
      upto += size;
      rangeI++;
      rangeEnd = ranges[rangeI].to;
    }
  }
  for (let ch = tree.firstChild; ch; ch = ch.nextSibling) {
    movePastNext(ch.from + offset, true);
    let from = ch.from + offset, node, reuse = dummies.get(ch.tree);
    if (reuse) {
      node = reuse;
    } else if (ch.to + offset > rangeEnd) {
      node = injectGaps(ranges, rangeI, ch, offset, dummies);
      movePastNext(ch.to + offset, false);
    } else {
      node = ch.toTree();
    }
    children.push(node);
    positions.push(from - start);
  }
  movePastNext(tree.to + offset, false);
  return new Tree(tree.type, children, positions, tree.to + offset - start, tree.tree ? tree.tree.propValues : void 0);
}
var MarkdownParser = class _MarkdownParser extends Parser {
  /// @internal
  constructor(nodeSet, blockParsers, leafBlockParsers, blockNames, endLeafBlock, skipContextMarkup, inlineParsers, inlineNames, wrappers) {
    super();
    this.nodeSet = nodeSet;
    this.blockParsers = blockParsers;
    this.leafBlockParsers = leafBlockParsers;
    this.blockNames = blockNames;
    this.endLeafBlock = endLeafBlock;
    this.skipContextMarkup = skipContextMarkup;
    this.inlineParsers = inlineParsers;
    this.inlineNames = inlineNames;
    this.wrappers = wrappers;
    this.nodeTypes = /* @__PURE__ */ Object.create(null);
    for (let t of nodeSet.types)
      this.nodeTypes[t.name] = t.id;
  }
  createParse(input, fragments, ranges) {
    let parse = new BlockContext(this, input, fragments, ranges);
    for (let w of this.wrappers)
      parse = w(parse, input, fragments, ranges);
    return parse;
  }
  /// Reconfigure the parser.
  configure(spec) {
    let config2 = resolveConfig(spec);
    if (!config2)
      return this;
    let { nodeSet, skipContextMarkup } = this;
    let blockParsers = this.blockParsers.slice(), leafBlockParsers = this.leafBlockParsers.slice(), blockNames = this.blockNames.slice(), inlineParsers = this.inlineParsers.slice(), inlineNames = this.inlineNames.slice(), endLeafBlock = this.endLeafBlock.slice(), wrappers = this.wrappers;
    if (nonEmpty(config2.defineNodes)) {
      skipContextMarkup = Object.assign({}, skipContextMarkup);
      let nodeTypes2 = nodeSet.types.slice(), styles;
      for (let s of config2.defineNodes) {
        let { name, block, composite, style } = typeof s == "string" ? { name: s } : s;
        if (nodeTypes2.some((t) => t.name == name))
          continue;
        if (composite)
          skipContextMarkup[nodeTypes2.length] = (bl, cx, line) => composite(cx, line, bl.value);
        let id2 = nodeTypes2.length;
        let group = composite ? ["Block", "BlockContext"] : !block ? void 0 : id2 >= Type.ATXHeading1 && id2 <= Type.SetextHeading2 ? ["Block", "LeafBlock", "Heading"] : ["Block", "LeafBlock"];
        nodeTypes2.push(NodeType.define({
          id: id2,
          name,
          props: group && [[NodeProp.group, group]]
        }));
        if (style) {
          if (!styles)
            styles = {};
          if (Array.isArray(style) || style instanceof Tag)
            styles[name] = style;
          else
            Object.assign(styles, style);
        }
      }
      nodeSet = new NodeSet(nodeTypes2);
      if (styles)
        nodeSet = nodeSet.extend(styleTags(styles));
    }
    if (nonEmpty(config2.props))
      nodeSet = nodeSet.extend(...config2.props);
    if (nonEmpty(config2.remove)) {
      for (let rm of config2.remove) {
        let block = this.blockNames.indexOf(rm), inline = this.inlineNames.indexOf(rm);
        if (block > -1)
          blockParsers[block] = leafBlockParsers[block] = void 0;
        if (inline > -1)
          inlineParsers[inline] = void 0;
      }
    }
    if (nonEmpty(config2.parseBlock)) {
      for (let spec2 of config2.parseBlock) {
        let found = blockNames.indexOf(spec2.name);
        if (found > -1) {
          blockParsers[found] = spec2.parse;
          leafBlockParsers[found] = spec2.leaf;
        } else {
          let pos = spec2.before ? findName(blockNames, spec2.before) : spec2.after ? findName(blockNames, spec2.after) + 1 : blockNames.length - 1;
          blockParsers.splice(pos, 0, spec2.parse);
          leafBlockParsers.splice(pos, 0, spec2.leaf);
          blockNames.splice(pos, 0, spec2.name);
        }
        if (spec2.endLeaf)
          endLeafBlock.push(spec2.endLeaf);
      }
    }
    if (nonEmpty(config2.parseInline)) {
      for (let spec2 of config2.parseInline) {
        let found = inlineNames.indexOf(spec2.name);
        if (found > -1) {
          inlineParsers[found] = spec2.parse;
        } else {
          let pos = spec2.before ? findName(inlineNames, spec2.before) : spec2.after ? findName(inlineNames, spec2.after) + 1 : inlineNames.length - 1;
          inlineParsers.splice(pos, 0, spec2.parse);
          inlineNames.splice(pos, 0, spec2.name);
        }
      }
    }
    if (config2.wrap)
      wrappers = wrappers.concat(config2.wrap);
    return new _MarkdownParser(nodeSet, blockParsers, leafBlockParsers, blockNames, endLeafBlock, skipContextMarkup, inlineParsers, inlineNames, wrappers);
  }
  /// @internal
  getNodeType(name) {
    let found = this.nodeTypes[name];
    if (found == null)
      throw new RangeError(`Unknown node type '${name}'`);
    return found;
  }
  /// Parse the given piece of inline text at the given offset,
  /// returning an array of [`Element`](#Element) objects representing
  /// the inline content.
  parseInline(text, offset) {
    let cx = new InlineContext(this, text, offset);
    outer:
      for (let pos = offset; pos < cx.end; ) {
        let next = cx.char(pos);
        for (let token of this.inlineParsers)
          if (token) {
            let result = token(cx, next, pos);
            if (result >= 0) {
              pos = result;
              continue outer;
            }
          }
        pos++;
      }
    return cx.resolveMarkers(0);
  }
};
function nonEmpty(a) {
  return a != null && a.length > 0;
}
function resolveConfig(spec) {
  if (!Array.isArray(spec))
    return spec;
  if (spec.length == 0)
    return null;
  let conf = resolveConfig(spec[0]);
  if (spec.length == 1)
    return conf;
  let rest = resolveConfig(spec.slice(1));
  if (!rest || !conf)
    return conf || rest;
  let conc = (a, b) => (a || none2).concat(b || none2);
  let wrapA = conf.wrap, wrapB = rest.wrap;
  return {
    props: conc(conf.props, rest.props),
    defineNodes: conc(conf.defineNodes, rest.defineNodes),
    parseBlock: conc(conf.parseBlock, rest.parseBlock),
    parseInline: conc(conf.parseInline, rest.parseInline),
    remove: conc(conf.remove, rest.remove),
    wrap: !wrapA ? wrapB : !wrapB ? wrapA : (inner, input, fragments, ranges) => wrapA(wrapB(inner, input, fragments, ranges), input, fragments, ranges)
  };
}
function findName(names, name) {
  let found = names.indexOf(name);
  if (found < 0)
    throw new RangeError(`Position specified relative to unknown parser ${name}`);
  return found;
}
var nodeTypes = [NodeType.none];
for (let i = 1, name; name = Type[i]; i++) {
  nodeTypes[i] = NodeType.define({
    id: i,
    name,
    props: i >= Type.Escape ? [] : [[NodeProp.group, i in DefaultSkipMarkup ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]],
    top: name == "Document"
  });
}
var none2 = [];
var Buffer = class {
  constructor(nodeSet) {
    this.nodeSet = nodeSet;
    this.content = [];
    this.nodes = [];
  }
  write(type, from, to, children = 0) {
    this.content.push(type, from, to, 4 + children * 4);
    return this;
  }
  writeElements(elts, offset = 0) {
    for (let e of elts)
      e.writeTo(this, offset);
    return this;
  }
  finish(type, length) {
    return Tree.build({
      buffer: this.content,
      nodeSet: this.nodeSet,
      reused: this.nodes,
      topID: type,
      length
    });
  }
};
var Element2 = class {
  /// @internal
  constructor(type, from, to, children = none2) {
    this.type = type;
    this.from = from;
    this.to = to;
    this.children = children;
  }
  /// @internal
  writeTo(buf, offset) {
    let startOff = buf.content.length;
    buf.writeElements(this.children, offset);
    buf.content.push(this.type, this.from + offset, this.to + offset, buf.content.length + 4 - startOff);
  }
  /// @internal
  toTree(nodeSet) {
    return new Buffer(nodeSet).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
  }
};
var TreeElement = class {
  constructor(tree, from) {
    this.tree = tree;
    this.from = from;
  }
  get to() {
    return this.from + this.tree.length;
  }
  get type() {
    return this.tree.type.id;
  }
  get children() {
    return none2;
  }
  writeTo(buf, offset) {
    buf.nodes.push(this.tree);
    buf.content.push(buf.nodes.length - 1, this.from + offset, this.to + offset, -1);
  }
  toTree() {
    return this.tree;
  }
};
function elt(type, from, to, children) {
  return new Element2(type, from, to, children);
}
var EmphasisUnderscore = { resolve: "Emphasis", mark: "EmphasisMark" };
var EmphasisAsterisk = { resolve: "Emphasis", mark: "EmphasisMark" };
var LinkStart = {};
var ImageStart = {};
var InlineDelimiter = class {
  constructor(type, from, to, side) {
    this.type = type;
    this.from = from;
    this.to = to;
    this.side = side;
  }
};
var Escapable = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var Punctuation = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try {
  Punctuation = new RegExp("[\\p{Pc}|\\p{Pd}|\\p{Pe}|\\p{Pf}|\\p{Pi}|\\p{Po}|\\p{Ps}]", "u");
} catch (_) {
}
var DefaultInline = {
  Escape(cx, next, start) {
    if (next != 92 || start == cx.end - 1)
      return -1;
    let escaped = cx.char(start + 1);
    for (let i = 0; i < Escapable.length; i++)
      if (Escapable.charCodeAt(i) == escaped)
        return cx.append(elt(Type.Escape, start, start + 2));
    return -1;
  },
  Entity(cx, next, start) {
    if (next != 38)
      return -1;
    let m = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(cx.slice(start + 1, start + 31));
    return m ? cx.append(elt(Type.Entity, start, start + 1 + m[0].length)) : -1;
  },
  InlineCode(cx, next, start) {
    if (next != 96 || start && cx.char(start - 1) == 96)
      return -1;
    let pos = start + 1;
    while (pos < cx.end && cx.char(pos) == 96)
      pos++;
    let size = pos - start, curSize = 0;
    for (; pos < cx.end; pos++) {
      if (cx.char(pos) == 96) {
        curSize++;
        if (curSize == size && cx.char(pos + 1) != 96)
          return cx.append(elt(Type.InlineCode, start, pos + 1, [
            elt(Type.CodeMark, start, start + size),
            elt(Type.CodeMark, pos + 1 - size, pos + 1)
          ]));
      } else {
        curSize = 0;
      }
    }
    return -1;
  },
  HTMLTag(cx, next, start) {
    if (next != 60 || start == cx.end - 1)
      return -1;
    let after = cx.slice(start + 1, cx.end);
    let url = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(after);
    if (url) {
      return cx.append(elt(Type.Autolink, start, start + 1 + url[0].length, [
        elt(Type.LinkMark, start, start + 1),
        // url[0] includes the closing bracket, so exclude it from this slice
        elt(Type.URL, start + 1, start + url[0].length),
        elt(Type.LinkMark, start + url[0].length, start + 1 + url[0].length)
      ]));
    }
    let comment = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(after);
    if (comment)
      return cx.append(elt(Type.Comment, start, start + 1 + comment[0].length));
    let procInst = /^\?[^]*?\?>/.exec(after);
    if (procInst)
      return cx.append(elt(Type.ProcessingInstruction, start, start + 1 + procInst[0].length));
    let m = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(after);
    if (!m)
      return -1;
    return cx.append(elt(Type.HTMLTag, start, start + 1 + m[0].length));
  },
  Emphasis(cx, next, start) {
    if (next != 95 && next != 42)
      return -1;
    let pos = start + 1;
    while (cx.char(pos) == next)
      pos++;
    let before = cx.slice(start - 1, start), after = cx.slice(pos, pos + 1);
    let pBefore = Punctuation.test(before), pAfter = Punctuation.test(after);
    let sBefore = /\s|^$/.test(before), sAfter = /\s|^$/.test(after);
    let leftFlanking = !sAfter && (!pAfter || sBefore || pBefore);
    let rightFlanking = !sBefore && (!pBefore || sAfter || pAfter);
    let canOpen = leftFlanking && (next == 42 || !rightFlanking || pBefore);
    let canClose = rightFlanking && (next == 42 || !leftFlanking || pAfter);
    return cx.append(new InlineDelimiter(next == 95 ? EmphasisUnderscore : EmphasisAsterisk, start, pos, (canOpen ? 1 : 0) | (canClose ? 2 : 0)));
  },
  HardBreak(cx, next, start) {
    if (next == 92 && cx.char(start + 1) == 10)
      return cx.append(elt(Type.HardBreak, start, start + 2));
    if (next == 32) {
      let pos = start + 1;
      while (cx.char(pos) == 32)
        pos++;
      if (cx.char(pos) == 10 && pos >= start + 2)
        return cx.append(elt(Type.HardBreak, start, pos + 1));
    }
    return -1;
  },
  Link(cx, next, start) {
    return next == 91 ? cx.append(new InlineDelimiter(
      LinkStart,
      start,
      start + 1,
      1
      /* Mark.Open */
    )) : -1;
  },
  Image(cx, next, start) {
    return next == 33 && cx.char(start + 1) == 91 ? cx.append(new InlineDelimiter(
      ImageStart,
      start,
      start + 2,
      1
      /* Mark.Open */
    )) : -1;
  },
  LinkEnd(cx, next, start) {
    if (next != 93)
      return -1;
    for (let i = cx.parts.length - 1; i >= 0; i--) {
      let part = cx.parts[i];
      if (part instanceof InlineDelimiter && (part.type == LinkStart || part.type == ImageStart)) {
        if (!part.side || cx.skipSpace(part.to) == start && !/[(\[]/.test(cx.slice(start + 1, start + 2))) {
          cx.parts[i] = null;
          return -1;
        }
        let content = cx.takeContent(i);
        let link = cx.parts[i] = finishLink(cx, content, part.type == LinkStart ? Type.Link : Type.Image, part.from, start + 1);
        if (part.type == LinkStart)
          for (let j = 0; j < i; j++) {
            let p = cx.parts[j];
            if (p instanceof InlineDelimiter && p.type == LinkStart)
              p.side = 0;
          }
        return link.to;
      }
    }
    return -1;
  }
};
function finishLink(cx, content, type, start, startPos) {
  let { text } = cx, next = cx.char(startPos), endPos = startPos;
  content.unshift(elt(Type.LinkMark, start, start + (type == Type.Image ? 2 : 1)));
  content.push(elt(Type.LinkMark, startPos - 1, startPos));
  if (next == 40) {
    let pos = cx.skipSpace(startPos + 1);
    let dest = parseURL(text, pos - cx.offset, cx.offset), title;
    if (dest) {
      pos = cx.skipSpace(dest.to);
      if (pos != dest.to) {
        title = parseLinkTitle(text, pos - cx.offset, cx.offset);
        if (title)
          pos = cx.skipSpace(title.to);
      }
    }
    if (cx.char(pos) == 41) {
      content.push(elt(Type.LinkMark, startPos, startPos + 1));
      endPos = pos + 1;
      if (dest)
        content.push(dest);
      if (title)
        content.push(title);
      content.push(elt(Type.LinkMark, pos, endPos));
    }
  } else if (next == 91) {
    let label = parseLinkLabel(text, startPos - cx.offset, cx.offset, false);
    if (label) {
      content.push(label);
      endPos = label.to;
    }
  }
  return elt(type, start, endPos, content);
}
function parseURL(text, start, offset) {
  let next = text.charCodeAt(start);
  if (next == 60) {
    for (let pos = start + 1; pos < text.length; pos++) {
      let ch = text.charCodeAt(pos);
      if (ch == 62)
        return elt(Type.URL, start + offset, pos + 1 + offset);
      if (ch == 60 || ch == 10)
        return false;
    }
    return null;
  } else {
    let depth = 0, pos = start;
    for (let escaped = false; pos < text.length; pos++) {
      let ch = text.charCodeAt(pos);
      if (space3(ch)) {
        break;
      } else if (escaped) {
        escaped = false;
      } else if (ch == 40) {
        depth++;
      } else if (ch == 41) {
        if (!depth)
          break;
        depth--;
      } else if (ch == 92) {
        escaped = true;
      }
    }
    return pos > start ? elt(Type.URL, start + offset, pos + offset) : pos == text.length ? null : false;
  }
}
function parseLinkTitle(text, start, offset) {
  let next = text.charCodeAt(start);
  if (next != 39 && next != 34 && next != 40)
    return false;
  let end = next == 40 ? 41 : next;
  for (let pos = start + 1, escaped = false; pos < text.length; pos++) {
    let ch = text.charCodeAt(pos);
    if (escaped)
      escaped = false;
    else if (ch == end)
      return elt(Type.LinkTitle, start + offset, pos + 1 + offset);
    else if (ch == 92)
      escaped = true;
  }
  return null;
}
function parseLinkLabel(text, start, offset, requireNonWS) {
  for (let escaped = false, pos = start + 1, end = Math.min(text.length, pos + 999); pos < end; pos++) {
    let ch = text.charCodeAt(pos);
    if (escaped)
      escaped = false;
    else if (ch == 93)
      return requireNonWS ? false : elt(Type.LinkLabel, start + offset, pos + 1 + offset);
    else {
      if (requireNonWS && !space3(ch))
        requireNonWS = false;
      if (ch == 91)
        return false;
      else if (ch == 92)
        escaped = true;
    }
  }
  return null;
}
var InlineContext = class {
  /// @internal
  constructor(parser9, text, offset) {
    this.parser = parser9;
    this.text = text;
    this.offset = offset;
    this.parts = [];
  }
  /// Get the character code at the given (document-relative)
  /// position.
  char(pos) {
    return pos >= this.end ? -1 : this.text.charCodeAt(pos - this.offset);
  }
  /// The position of the end of this inline section.
  get end() {
    return this.offset + this.text.length;
  }
  /// Get a substring of this inline section. Again uses
  /// document-relative positions.
  slice(from, to) {
    return this.text.slice(from - this.offset, to - this.offset);
  }
  /// @internal
  append(elt2) {
    this.parts.push(elt2);
    return elt2.to;
  }
  /// Add a [delimiter](#DelimiterType) at this given position. `open`
  /// and `close` indicate whether this delimiter is opening, closing,
  /// or both. Returns the end of the delimiter, for convenient
  /// returning from [parse functions](#InlineParser.parse).
  addDelimiter(type, from, to, open, close) {
    return this.append(new InlineDelimiter(type, from, to, (open ? 1 : 0) | (close ? 2 : 0)));
  }
  /// Add an inline element. Returns the end of the element.
  addElement(elt2) {
    return this.append(elt2);
  }
  /// Resolve markers between this.parts.length and from, wrapping matched markers in the
  /// appropriate node and updating the content of this.parts. @internal
  resolveMarkers(from) {
    for (let i = from; i < this.parts.length; i++) {
      let close = this.parts[i];
      if (!(close instanceof InlineDelimiter && close.type.resolve && close.side & 2))
        continue;
      let emp = close.type == EmphasisUnderscore || close.type == EmphasisAsterisk;
      let closeSize = close.to - close.from;
      let open, j = i - 1;
      for (; j >= from; j--) {
        let part = this.parts[j];
        if (part instanceof InlineDelimiter && part.side & 1 && part.type == close.type && // Ignore emphasis delimiters where the character count doesn't match
        !(emp && (close.side & 1 || part.side & 2) && (part.to - part.from + closeSize) % 3 == 0 && ((part.to - part.from) % 3 || closeSize % 3))) {
          open = part;
          break;
        }
      }
      if (!open)
        continue;
      let type = close.type.resolve, content = [];
      let start = open.from, end = close.to;
      if (emp) {
        let size = Math.min(2, open.to - open.from, closeSize);
        start = open.to - size;
        end = close.from + size;
        type = size == 1 ? "Emphasis" : "StrongEmphasis";
      }
      if (open.type.mark)
        content.push(this.elt(open.type.mark, start, open.to));
      for (let k = j + 1; k < i; k++) {
        if (this.parts[k] instanceof Element2)
          content.push(this.parts[k]);
        this.parts[k] = null;
      }
      if (close.type.mark)
        content.push(this.elt(close.type.mark, close.from, end));
      let element = this.elt(type, start, end, content);
      this.parts[j] = emp && open.from != start ? new InlineDelimiter(open.type, open.from, start, open.side) : null;
      let keep = this.parts[i] = emp && close.to != end ? new InlineDelimiter(close.type, end, close.to, close.side) : null;
      if (keep)
        this.parts.splice(i, 0, element);
      else
        this.parts[i] = element;
    }
    let result = [];
    for (let i = from; i < this.parts.length; i++) {
      let part = this.parts[i];
      if (part instanceof Element2)
        result.push(part);
    }
    return result;
  }
  /// Find an opening delimiter of the given type. Returns `null` if
  /// no delimiter is found, or an index that can be passed to
  /// [`takeContent`](#InlineContext.takeContent) otherwise.
  findOpeningDelimiter(type) {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      let part = this.parts[i];
      if (part instanceof InlineDelimiter && part.type == type)
        return i;
    }
    return null;
  }
  /// Remove all inline elements and delimiters starting from the
  /// given index (which you should get from
  /// [`findOpeningDelimiter`](#InlineContext.findOpeningDelimiter),
  /// resolve delimiters inside of them, and return them as an array
  /// of elements.
  takeContent(startIndex) {
    let content = this.resolveMarkers(startIndex);
    this.parts.length = startIndex;
    return content;
  }
  /// Skip space after the given (document) position, returning either
  /// the position of the next non-space character or the end of the
  /// section.
  skipSpace(from) {
    return skipSpace(this.text, from - this.offset) + this.offset;
  }
  elt(type, from, to, children) {
    if (typeof type == "string")
      return elt(this.parser.getNodeType(type), from, to, children);
    return new TreeElement(type, from);
  }
};
function injectMarks(elements, marks) {
  if (!marks.length)
    return elements;
  if (!elements.length)
    return marks;
  let elts = elements.slice(), eI = 0;
  for (let mark of marks) {
    while (eI < elts.length && elts[eI].to < mark.to)
      eI++;
    if (eI < elts.length && elts[eI].from < mark.from) {
      let e = elts[eI];
      if (e instanceof Element2)
        elts[eI] = new Element2(e.type, e.from, e.to, injectMarks(e.children, [mark]));
    } else {
      elts.splice(eI++, 0, mark);
    }
  }
  return elts;
}
var NotLast = [Type.CodeBlock, Type.ListItem, Type.OrderedList, Type.BulletList];
var FragmentCursor2 = class {
  constructor(fragments, input) {
    this.fragments = fragments;
    this.input = input;
    this.i = 0;
    this.fragment = null;
    this.fragmentEnd = -1;
    this.cursor = null;
    if (fragments.length)
      this.fragment = fragments[this.i++];
  }
  nextFragment() {
    this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null;
    this.cursor = null;
    this.fragmentEnd = -1;
  }
  moveTo(pos, lineStart) {
    while (this.fragment && this.fragment.to <= pos)
      this.nextFragment();
    if (!this.fragment || this.fragment.from > (pos ? pos - 1 : 0))
      return false;
    if (this.fragmentEnd < 0) {
      let end = this.fragment.to;
      while (end > 0 && this.input.read(end - 1, end) != "\n")
        end--;
      this.fragmentEnd = end ? end - 1 : 0;
    }
    let c = this.cursor;
    if (!c) {
      c = this.cursor = this.fragment.tree.cursor();
      c.firstChild();
    }
    let rPos = pos + this.fragment.offset;
    while (c.to <= rPos)
      if (!c.parent())
        return false;
    for (; ; ) {
      if (c.from >= rPos)
        return this.fragment.from <= lineStart;
      if (!c.childAfter(rPos))
        return false;
    }
  }
  matches(hash3) {
    let tree = this.cursor.tree;
    return tree && tree.prop(NodeProp.contextHash) == hash3;
  }
  takeNodes(cx) {
    let cur2 = this.cursor, off = this.fragment.offset, fragEnd = this.fragmentEnd - (this.fragment.openEnd ? 1 : 0);
    let start = cx.absoluteLineStart, end = start, blockI = cx.block.children.length;
    let prevEnd = end, prevI = blockI;
    for (; ; ) {
      if (cur2.to - off > fragEnd) {
        if (cur2.type.isAnonymous && cur2.firstChild())
          continue;
        break;
      }
      let pos = toRelative(cur2.from - off, cx.ranges);
      if (cur2.to - off <= cx.ranges[cx.rangeI].to) {
        cx.addNode(cur2.tree, pos);
      } else {
        let dummy = new Tree(cx.parser.nodeSet.types[Type.Paragraph], [], [], 0, cx.block.hashProp);
        cx.reusePlaceholders.set(dummy, cur2.tree);
        cx.addNode(dummy, pos);
      }
      if (cur2.type.is("Block")) {
        if (NotLast.indexOf(cur2.type.id) < 0) {
          end = cur2.to - off;
          blockI = cx.block.children.length;
        } else {
          end = prevEnd;
          blockI = prevI;
          prevEnd = cur2.to - off;
          prevI = cx.block.children.length;
        }
      }
      if (!cur2.nextSibling())
        break;
    }
    while (cx.block.children.length > blockI) {
      cx.block.children.pop();
      cx.block.positions.pop();
    }
    return end - start;
  }
};
function toRelative(abs, ranges) {
  let pos = abs;
  for (let i = 1; i < ranges.length; i++) {
    let gapFrom = ranges[i - 1].to, gapTo = ranges[i].from;
    if (gapFrom < abs)
      pos -= gapTo - gapFrom;
  }
  return pos;
}
var markdownHighlighting = styleTags({
  "Blockquote/...": tags.quote,
  HorizontalRule: tags.contentSeparator,
  "ATXHeading1/... SetextHeading1/...": tags.heading1,
  "ATXHeading2/... SetextHeading2/...": tags.heading2,
  "ATXHeading3/...": tags.heading3,
  "ATXHeading4/...": tags.heading4,
  "ATXHeading5/...": tags.heading5,
  "ATXHeading6/...": tags.heading6,
  "Comment CommentBlock": tags.comment,
  Escape: tags.escape,
  Entity: tags.character,
  "Emphasis/...": tags.emphasis,
  "StrongEmphasis/...": tags.strong,
  "Link/... Image/...": tags.link,
  "OrderedList/... BulletList/...": tags.list,
  "BlockQuote/...": tags.quote,
  "InlineCode CodeText": tags.monospace,
  "URL Autolink": tags.url,
  "HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": tags.processingInstruction,
  "CodeInfo LinkLabel": tags.labelName,
  LinkTitle: tags.string,
  Paragraph: tags.content
});
var parser5 = new MarkdownParser(new NodeSet(nodeTypes).extend(markdownHighlighting), Object.keys(DefaultBlockParsers).map((n) => DefaultBlockParsers[n]), Object.keys(DefaultBlockParsers).map((n) => DefaultLeafBlocks[n]), Object.keys(DefaultBlockParsers), DefaultEndLeaf, DefaultSkipMarkup, Object.keys(DefaultInline).map((n) => DefaultInline[n]), Object.keys(DefaultInline), []);
function leftOverSpace(node, from, to) {
  let ranges = [];
  for (let n = node.firstChild, pos = from; ; n = n.nextSibling) {
    let nextPos = n ? n.from : to;
    if (nextPos > pos)
      ranges.push({ from: pos, to: nextPos });
    if (!n)
      break;
    pos = n.to;
  }
  return ranges;
}
function parseCode(config2) {
  let { codeParser, htmlParser } = config2;
  let wrap = parseMixed((node, input) => {
    let id2 = node.type.id;
    if (codeParser && (id2 == Type.CodeBlock || id2 == Type.FencedCode)) {
      let info = "";
      if (id2 == Type.FencedCode) {
        let infoNode = node.node.getChild(Type.CodeInfo);
        if (infoNode)
          info = input.read(infoNode.from, infoNode.to);
      }
      let parser9 = codeParser(info);
      if (parser9)
        return { parser: parser9, overlay: (node2) => node2.type.id == Type.CodeText };
    } else if (htmlParser && (id2 == Type.HTMLBlock || id2 == Type.HTMLTag)) {
      return { parser: htmlParser, overlay: leftOverSpace(node.node, node.from, node.to) };
    }
    return null;
  });
  return { wrap };
}
var StrikethroughDelim = { resolve: "Strikethrough", mark: "StrikethroughMark" };
var Strikethrough = {
  defineNodes: [{
    name: "Strikethrough",
    style: { "Strikethrough/...": tags.strikethrough }
  }, {
    name: "StrikethroughMark",
    style: tags.processingInstruction
  }],
  parseInline: [{
    name: "Strikethrough",
    parse(cx, next, pos) {
      if (next != 126 || cx.char(pos + 1) != 126 || cx.char(pos + 2) == 126)
        return -1;
      let before = cx.slice(pos - 1, pos), after = cx.slice(pos + 2, pos + 3);
      let sBefore = /\s|^$/.test(before), sAfter = /\s|^$/.test(after);
      let pBefore = Punctuation.test(before), pAfter = Punctuation.test(after);
      return cx.addDelimiter(StrikethroughDelim, pos, pos + 2, !sAfter && (!pAfter || sBefore || pBefore), !sBefore && (!pBefore || sAfter || pAfter));
    },
    after: "Emphasis"
  }]
};
function parseRow(cx, line, startI = 0, elts, offset = 0) {
  let count2 = 0, first = true, cellStart = -1, cellEnd = -1, esc = false;
  let parseCell = () => {
    elts.push(cx.elt("TableCell", offset + cellStart, offset + cellEnd, cx.parser.parseInline(line.slice(cellStart, cellEnd), offset + cellStart)));
  };
  for (let i = startI; i < line.length; i++) {
    let next = line.charCodeAt(i);
    if (next == 124 && !esc) {
      if (!first || cellStart > -1)
        count2++;
      first = false;
      if (elts) {
        if (cellStart > -1)
          parseCell();
        elts.push(cx.elt("TableDelimiter", i + offset, i + offset + 1));
      }
      cellStart = cellEnd = -1;
    } else if (esc || next != 32 && next != 9) {
      if (cellStart < 0)
        cellStart = i;
      cellEnd = i + 1;
    }
    esc = !esc && next == 92;
  }
  if (cellStart > -1) {
    count2++;
    if (elts)
      parseCell();
  }
  return count2;
}
function hasPipe(str, start) {
  for (let i = start; i < str.length; i++) {
    let next = str.charCodeAt(i);
    if (next == 124)
      return true;
    if (next == 92)
      i++;
  }
  return false;
}
var delimiterLine = /^\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/;
var TableParser = class {
  constructor() {
    this.rows = null;
  }
  nextLine(cx, line, leaf) {
    if (this.rows == null) {
      this.rows = false;
      let lineText;
      if ((line.next == 45 || line.next == 58 || line.next == 124) && delimiterLine.test(lineText = line.text.slice(line.pos))) {
        let firstRow = [], firstCount = parseRow(cx, leaf.content, 0, firstRow, leaf.start);
        if (firstCount == parseRow(cx, lineText, line.pos))
          this.rows = [
            cx.elt("TableHeader", leaf.start, leaf.start + leaf.content.length, firstRow),
            cx.elt("TableDelimiter", cx.lineStart + line.pos, cx.lineStart + line.text.length)
          ];
      }
    } else if (this.rows) {
      let content = [];
      parseRow(cx, line.text, line.pos, content, cx.lineStart);
      this.rows.push(cx.elt("TableRow", cx.lineStart + line.pos, cx.lineStart + line.text.length, content));
    }
    return false;
  }
  finish(cx, leaf) {
    if (!this.rows)
      return false;
    cx.addLeafElement(leaf, cx.elt("Table", leaf.start, leaf.start + leaf.content.length, this.rows));
    return true;
  }
};
var Table = {
  defineNodes: [
    { name: "Table", block: true },
    { name: "TableHeader", style: { "TableHeader/...": tags.heading } },
    "TableRow",
    { name: "TableCell", style: tags.content },
    { name: "TableDelimiter", style: tags.processingInstruction }
  ],
  parseBlock: [{
    name: "Table",
    leaf(_, leaf) {
      return hasPipe(leaf.content, 0) ? new TableParser() : null;
    },
    endLeaf(cx, line, leaf) {
      if (leaf.parsers.some((p) => p instanceof TableParser) || !hasPipe(line.text, line.basePos))
        return false;
      let next = cx.scanLine(cx.absoluteLineEnd + 1).text;
      return delimiterLine.test(next) && parseRow(cx, line.text, line.basePos) == parseRow(cx, next, line.basePos);
    },
    before: "SetextHeading"
  }]
};
var TaskParser = class {
  nextLine() {
    return false;
  }
  finish(cx, leaf) {
    cx.addLeafElement(leaf, cx.elt("Task", leaf.start, leaf.start + leaf.content.length, [
      cx.elt("TaskMarker", leaf.start, leaf.start + 3),
      ...cx.parser.parseInline(leaf.content.slice(3), leaf.start + 3)
    ]));
    return true;
  }
};
var TaskList = {
  defineNodes: [
    { name: "Task", block: true, style: tags.list },
    { name: "TaskMarker", style: tags.atom }
  ],
  parseBlock: [{
    name: "TaskList",
    leaf(cx, leaf) {
      return /^\[[ xX]\][ \t]/.test(leaf.content) && cx.parentType().name == "ListItem" ? new TaskParser() : null;
    },
    after: "SetextHeading"
  }]
};
var autolinkRE = /(www\.)|(https?:\/\/)|([\w.+-]+@)|(mailto:|xmpp:)/gy;
var urlRE = /[\w-]+(\.[\w-]+)+(\/[^\s<]*)?/gy;
var lastTwoDomainWords = /[\w-]+\.[\w-]+($|\/)/;
var emailRE = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy;
var xmppResourceRE = /\/[a-zA-Z\d@.]+/gy;
function count(str, from, to, ch) {
  let result = 0;
  for (let i = from; i < to; i++)
    if (str[i] == ch)
      result++;
  return result;
}
function autolinkURLEnd(text, from) {
  urlRE.lastIndex = from;
  let m = urlRE.exec(text);
  if (!m || lastTwoDomainWords.exec(m[0])[0].indexOf("_") > -1)
    return -1;
  let end = from + m[0].length;
  for (; ; ) {
    let last = text[end - 1], m2;
    if (/[?!.,:*_~]/.test(last) || last == ")" && count(text, from, end, ")") > count(text, from, end, "("))
      end--;
    else if (last == ";" && (m2 = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(text.slice(from, end))))
      end = from + m2.index;
    else
      break;
  }
  return end;
}
function autolinkEmailEnd(text, from) {
  emailRE.lastIndex = from;
  let m = emailRE.exec(text);
  if (!m)
    return -1;
  let last = m[0][m[0].length - 1];
  return last == "_" || last == "-" ? -1 : from + m[0].length - (last == "." ? 1 : 0);
}
var Autolink = {
  parseInline: [{
    name: "Autolink",
    parse(cx, next, absPos) {
      let pos = absPos - cx.offset;
      autolinkRE.lastIndex = pos;
      let m = autolinkRE.exec(cx.text), end = -1;
      if (!m)
        return -1;
      if (m[1] || m[2]) {
        end = autolinkURLEnd(cx.text, pos + m[0].length);
      } else if (m[3]) {
        end = autolinkEmailEnd(cx.text, pos);
      } else {
        end = autolinkEmailEnd(cx.text, pos + m[0].length);
        if (end > -1 && m[0] == "xmpp:") {
          xmppResourceRE.lastIndex = end;
          m = xmppResourceRE.exec(cx.text);
          if (m)
            end = m.index + m[0].length;
        }
      }
      if (end < 0)
        return -1;
      cx.addElement(cx.elt("URL", absPos, end + cx.offset));
      return end + cx.offset;
    }
  }]
};
var GFM = [Table, TaskList, Strikethrough, Autolink];
function parseSubSuper(ch, node, mark) {
  return (cx, next, pos) => {
    if (next != ch || cx.char(pos + 1) == ch)
      return -1;
    let elts = [cx.elt(mark, pos, pos + 1)];
    for (let i = pos + 1; i < cx.end; i++) {
      let next2 = cx.char(i);
      if (next2 == ch)
        return cx.addElement(cx.elt(node, pos, i + 1, elts.concat(cx.elt(mark, i, i + 1))));
      if (next2 == 92)
        elts.push(cx.elt("Escape", i, i++ + 2));
      if (space3(next2))
        break;
    }
    return -1;
  };
}
var Superscript = {
  defineNodes: [
    { name: "Superscript", style: tags.special(tags.content) },
    { name: "SuperscriptMark", style: tags.processingInstruction }
  ],
  parseInline: [{
    name: "Superscript",
    parse: parseSubSuper(94, "Superscript", "SuperscriptMark")
  }]
};
var Subscript = {
  defineNodes: [
    { name: "Subscript", style: tags.special(tags.content) },
    { name: "SubscriptMark", style: tags.processingInstruction }
  ],
  parseInline: [{
    name: "Subscript",
    parse: parseSubSuper(126, "Subscript", "SubscriptMark")
  }]
};
var Emoji = {
  defineNodes: [{ name: "Emoji", style: tags.character }],
  parseInline: [{
    name: "Emoji",
    parse(cx, next, pos) {
      let match;
      if (next != 58 || !(match = /^[a-zA-Z_0-9]+:/.exec(cx.slice(pos + 1, cx.end))))
        return -1;
      return cx.addElement(cx.elt("Emoji", pos, pos + 1 + match[0].length));
    }
  }]
};

// ../../node_modules/.pnpm/@codemirror+lang-markdown@6.2.4/node_modules/@codemirror/lang-markdown/dist/index.js
var data = /* @__PURE__ */ defineLanguageFacet({ commentTokens: { block: { open: "<!--", close: "-->" } } });
var headingProp = /* @__PURE__ */ new NodeProp();
var commonmark = /* @__PURE__ */ parser5.configure({
  props: [
    /* @__PURE__ */ foldNodeProp.add((type) => {
      return !type.is("Block") || type.is("Document") || isHeading(type) != null ? void 0 : (tree, state) => ({ from: state.doc.lineAt(tree.from).to, to: tree.to });
    }),
    /* @__PURE__ */ headingProp.add(isHeading),
    /* @__PURE__ */ indentNodeProp.add({
      Document: () => null
    }),
    /* @__PURE__ */ languageDataProp.add({
      Document: data
    })
  ]
});
function isHeading(type) {
  let match = /^(?:ATX|Setext)Heading(\d)$/.exec(type.name);
  return match ? +match[1] : void 0;
}
function findSectionEnd(headerNode, level) {
  let last = headerNode;
  for (; ; ) {
    let next = last.nextSibling, heading;
    if (!next || (heading = isHeading(next.type)) != null && heading <= level)
      break;
    last = next;
  }
  return last.to;
}
var headerIndent = /* @__PURE__ */ foldService.of((state, start, end) => {
  for (let node = syntaxTree(state).resolveInner(end, -1); node; node = node.parent) {
    if (node.from < start)
      break;
    let heading = node.type.prop(headingProp);
    if (heading == null)
      continue;
    let upto = findSectionEnd(node, heading);
    if (upto > end)
      return { from: end, to: upto };
  }
  return null;
});
function mkLang(parser9) {
  return new Language(data, parser9, [headerIndent], "markdown");
}
var commonmarkLanguage = /* @__PURE__ */ mkLang(commonmark);
var extended = /* @__PURE__ */ commonmark.configure([GFM, Subscript, Superscript, Emoji, {
  props: [
    /* @__PURE__ */ foldNodeProp.add({
      Table: (tree, state) => ({ from: state.doc.lineAt(tree.from).to, to: tree.to })
    })
  ]
}]);
var markdownLanguage = /* @__PURE__ */ mkLang(extended);
function getCodeParser(languages2, defaultLanguage) {
  return (info) => {
    if (info && languages2) {
      let found = null;
      info = /\S*/.exec(info)[0];
      if (typeof languages2 == "function")
        found = languages2(info);
      else
        found = LanguageDescription.matchLanguageName(languages2, info, true);
      if (found instanceof LanguageDescription)
        return found.support ? found.support.language.parser : ParseContext.getSkippingParser(found.load());
      else if (found)
        return found.parser;
    }
    return defaultLanguage ? defaultLanguage.parser : null;
  };
}
var Context = class {
  constructor(node, from, to, spaceBefore, spaceAfter, type, item) {
    this.node = node;
    this.from = from;
    this.to = to;
    this.spaceBefore = spaceBefore;
    this.spaceAfter = spaceAfter;
    this.type = type;
    this.item = item;
  }
  blank(maxWidth, trailing = true) {
    let result = this.spaceBefore + (this.node.name == "Blockquote" ? ">" : "");
    if (maxWidth != null) {
      while (result.length < maxWidth)
        result += " ";
      return result;
    } else {
      for (let i = this.to - this.from - result.length - this.spaceAfter.length; i > 0; i--)
        result += " ";
      return result + (trailing ? this.spaceAfter : "");
    }
  }
  marker(doc, add) {
    let number = this.node.name == "OrderedList" ? String(+itemNumber(this.item, doc)[2] + add) : "";
    return this.spaceBefore + number + this.type + this.spaceAfter;
  }
};
function getContext(node, doc) {
  let nodes = [];
  for (let cur2 = node; cur2 && cur2.name != "Document"; cur2 = cur2.parent) {
    if (cur2.name == "ListItem" || cur2.name == "Blockquote" || cur2.name == "FencedCode")
      nodes.push(cur2);
  }
  let context = [];
  for (let i = nodes.length - 1; i >= 0; i--) {
    let node2 = nodes[i], match;
    let line = doc.lineAt(node2.from), startPos = node2.from - line.from;
    if (node2.name == "FencedCode") {
      context.push(new Context(node2, startPos, startPos, "", "", "", null));
    } else if (node2.name == "Blockquote" && (match = /^ *>( ?)/.exec(line.text.slice(startPos)))) {
      context.push(new Context(node2, startPos, startPos + match[0].length, "", match[1], ">", null));
    } else if (node2.name == "ListItem" && node2.parent.name == "OrderedList" && (match = /^( *)\d+([.)])( *)/.exec(line.text.slice(startPos)))) {
      let after = match[3], len = match[0].length;
      if (after.length >= 4) {
        after = after.slice(0, after.length - 4);
        len -= 4;
      }
      context.push(new Context(node2.parent, startPos, startPos + len, match[1], after, match[2], node2));
    } else if (node2.name == "ListItem" && node2.parent.name == "BulletList" && (match = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(line.text.slice(startPos)))) {
      let after = match[4], len = match[0].length;
      if (after.length > 4) {
        after = after.slice(0, after.length - 4);
        len -= 4;
      }
      let type = match[2];
      if (match[3])
        type += match[3].replace(/[xX]/, " ");
      context.push(new Context(node2.parent, startPos, startPos + len, match[1], after, type, node2));
    }
  }
  return context;
}
function itemNumber(item, doc) {
  return /^(\s*)(\d+)(?=[.)])/.exec(doc.sliceString(item.from, item.from + 10));
}
function renumberList(after, doc, changes, offset = 0) {
  for (let prev = -1, node = after; ; ) {
    if (node.name == "ListItem") {
      let m = itemNumber(node, doc);
      let number = +m[2];
      if (prev >= 0) {
        if (number != prev + 1)
          return;
        changes.push({ from: node.from + m[1].length, to: node.from + m[0].length, insert: String(prev + 2 + offset) });
      }
      prev = number;
    }
    let next = node.nextSibling;
    if (!next)
      break;
    node = next;
  }
}
function normalizeIndent(content, state) {
  let blank = /^[ \t]*/.exec(content)[0].length;
  if (!blank || state.facet(indentUnit) != "	")
    return content;
  let col = countColumn(content, 4, blank);
  let space6 = "";
  for (let i = col; i > 0; ) {
    if (i >= 4) {
      space6 += "	";
      i -= 4;
    } else {
      space6 += " ";
      i--;
    }
  }
  return space6 + content.slice(blank);
}
var insertNewlineContinueMarkup = ({ state, dispatch }) => {
  let tree = syntaxTree(state), { doc } = state;
  let dont = null, changes = state.changeByRange((range) => {
    if (!range.empty || !markdownLanguage.isActiveAt(state, range.from))
      return dont = { range };
    let pos = range.from, line = doc.lineAt(pos);
    let context = getContext(tree.resolveInner(pos, -1), doc);
    while (context.length && context[context.length - 1].from > pos - line.from)
      context.pop();
    if (!context.length)
      return dont = { range };
    let inner = context[context.length - 1];
    if (inner.to - inner.spaceAfter.length > pos - line.from)
      return dont = { range };
    let emptyLine = pos >= inner.to - inner.spaceAfter.length && !/\S/.test(line.text.slice(inner.to));
    if (inner.item && emptyLine) {
      let first = inner.node.firstChild, second = inner.node.getChild("ListItem", "ListItem");
      if (first.to >= pos || second && second.to < pos || line.from > 0 && !/[^\s>]/.test(doc.lineAt(line.from - 1).text)) {
        let next = context.length > 1 ? context[context.length - 2] : null;
        let delTo, insert2 = "";
        if (next && next.item) {
          delTo = line.from + next.from;
          insert2 = next.marker(doc, 1);
        } else {
          delTo = line.from + (next ? next.to : 0);
        }
        let changes3 = [{ from: delTo, to: pos, insert: insert2 }];
        if (inner.node.name == "OrderedList")
          renumberList(inner.item, doc, changes3, -2);
        if (next && next.node.name == "OrderedList")
          renumberList(next.item, doc, changes3);
        return { range: EditorSelection.cursor(delTo + insert2.length), changes: changes3 };
      } else {
        let insert2 = blankLine(context, state, line);
        return {
          range: EditorSelection.cursor(pos + insert2.length + 1),
          changes: { from: line.from, insert: insert2 + state.lineBreak }
        };
      }
    }
    if (inner.node.name == "Blockquote" && emptyLine && line.from) {
      let prevLine = doc.lineAt(line.from - 1), quoted = />\s*$/.exec(prevLine.text);
      if (quoted && quoted.index == inner.from) {
        let changes3 = state.changes([
          { from: prevLine.from + quoted.index, to: prevLine.to },
          { from: line.from + inner.from, to: line.to }
        ]);
        return { range: range.map(changes3), changes: changes3 };
      }
    }
    let changes2 = [];
    if (inner.node.name == "OrderedList")
      renumberList(inner.item, doc, changes2);
    let continued = inner.item && inner.item.from < line.from;
    let insert = "";
    if (!continued || /^[\s\d.)\-+*>]*/.exec(line.text)[0].length >= inner.to) {
      for (let i = 0, e = context.length - 1; i <= e; i++) {
        insert += i == e && !continued ? context[i].marker(doc, 1) : context[i].blank(i < e ? countColumn(line.text, 4, context[i + 1].from) - insert.length : null);
      }
    }
    let from = pos;
    while (from > line.from && /\s/.test(line.text.charAt(from - line.from - 1)))
      from--;
    insert = normalizeIndent(insert, state);
    if (nonTightList(inner.node, state.doc))
      insert = blankLine(context, state, line) + state.lineBreak + insert;
    changes2.push({ from, to: pos, insert: state.lineBreak + insert });
    return { range: EditorSelection.cursor(from + insert.length + 1), changes: changes2 };
  });
  if (dont)
    return false;
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
  return true;
};
function isMark(node) {
  return node.name == "QuoteMark" || node.name == "ListMark";
}
function nonTightList(node, doc) {
  if (node.name != "OrderedList" && node.name != "BulletList")
    return false;
  let first = node.firstChild, second = node.getChild("ListItem", "ListItem");
  if (!second)
    return false;
  let line1 = doc.lineAt(first.to), line2 = doc.lineAt(second.from);
  let empty = /^[\s>]*$/.test(line1.text);
  return line1.number + (empty ? 0 : 1) < line2.number;
}
function blankLine(context, state, line) {
  let insert = "";
  for (let i = 0, e = context.length - 2; i <= e; i++) {
    insert += context[i].blank(i < e ? countColumn(line.text, 4, context[i + 1].from) - insert.length : null, i < e);
  }
  return normalizeIndent(insert, state);
}
function contextNodeForDelete(tree, pos) {
  let node = tree.resolveInner(pos, -1), scan = pos;
  if (isMark(node)) {
    scan = node.from;
    node = node.parent;
  }
  for (let prev; prev = node.childBefore(scan); ) {
    if (isMark(prev)) {
      scan = prev.from;
    } else if (prev.name == "OrderedList" || prev.name == "BulletList") {
      node = prev.lastChild;
      scan = node.to;
    } else {
      break;
    }
  }
  return node;
}
var deleteMarkupBackward = ({ state, dispatch }) => {
  let tree = syntaxTree(state);
  let dont = null, changes = state.changeByRange((range) => {
    let pos = range.from, { doc } = state;
    if (range.empty && markdownLanguage.isActiveAt(state, range.from)) {
      let line = doc.lineAt(pos);
      let context = getContext(contextNodeForDelete(tree, pos), doc);
      if (context.length) {
        let inner = context[context.length - 1];
        let spaceEnd = inner.to - inner.spaceAfter.length + (inner.spaceAfter ? 1 : 0);
        if (pos - line.from > spaceEnd && !/\S/.test(line.text.slice(spaceEnd, pos - line.from)))
          return {
            range: EditorSelection.cursor(line.from + spaceEnd),
            changes: { from: line.from + spaceEnd, to: pos }
          };
        if (pos - line.from == spaceEnd && // Only apply this if we're on the line that has the
        // construct's syntax, or there's only indentation in the
        // target range
        (!inner.item || line.from <= inner.item.from || !/\S/.test(line.text.slice(0, inner.to)))) {
          let start = line.from + inner.from;
          if (inner.item && inner.node.from < inner.item.from && /\S/.test(line.text.slice(inner.from, inner.to))) {
            let insert = inner.blank(countColumn(line.text, 4, inner.to) - countColumn(line.text, 4, inner.from));
            if (start == line.from)
              insert = normalizeIndent(insert, state);
            return {
              range: EditorSelection.cursor(start + insert.length),
              changes: { from: start, to: line.from + inner.to, insert }
            };
          }
          if (start < pos)
            return { range: EditorSelection.cursor(start), changes: { from: start, to: pos } };
        }
      }
    }
    return dont = { range };
  });
  if (dont)
    return false;
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "delete" }));
  return true;
};
var markdownKeymap = [
  { key: "Enter", run: insertNewlineContinueMarkup },
  { key: "Backspace", run: deleteMarkupBackward }
];
var htmlNoMatch = /* @__PURE__ */ html({ matchClosingTags: false });
function markdown(config2 = {}) {
  let { codeLanguages, defaultCodeLanguage, addKeymap = true, base: { parser: parser9 } = commonmarkLanguage, completeHTMLTags = true } = config2;
  if (!(parser9 instanceof MarkdownParser))
    throw new RangeError("Base parser provided to `markdown` should be a Markdown parser");
  let extensions = config2.extensions ? [config2.extensions] : [];
  let support = [htmlNoMatch.support], defaultCode;
  if (defaultCodeLanguage instanceof LanguageSupport) {
    support.push(defaultCodeLanguage.support);
    defaultCode = defaultCodeLanguage.language;
  } else if (defaultCodeLanguage) {
    defaultCode = defaultCodeLanguage;
  }
  let codeParser = codeLanguages || defaultCode ? getCodeParser(codeLanguages, defaultCode) : void 0;
  extensions.push(parseCode({ codeParser, htmlParser: htmlNoMatch.language.parser }));
  if (addKeymap)
    support.push(Prec.high(keymap.of(markdownKeymap)));
  let lang = mkLang(parser9.configure(extensions));
  if (completeHTMLTags)
    support.push(lang.data.of({ autocomplete: htmlTagCompletion }));
  return new LanguageSupport(lang, support);
}
function htmlTagCompletion(context) {
  let { state, pos } = context, m = /<[:\-\.\w\u00b7-\uffff]*$/.exec(state.sliceDoc(pos - 25, pos));
  if (!m)
    return null;
  let tree = syntaxTree(state).resolveInner(pos, -1);
  while (tree && !tree.type.isTop) {
    if (tree.name == "CodeBlock" || tree.name == "FencedCode" || tree.name == "ProcessingInstructionBlock" || tree.name == "CommentBlock" || tree.name == "Link" || tree.name == "Image")
      return null;
    tree = tree.parent;
  }
  return {
    from: pos - m[0].length,
    to: pos,
    options: htmlTagCompletions(),
    validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
  };
}
var _tagCompletions = null;
function htmlTagCompletions() {
  if (_tagCompletions)
    return _tagCompletions;
  let result = htmlCompletionSource(new CompletionContext(EditorState.create({ extensions: htmlNoMatch }), 0, true));
  return _tagCompletions = result ? result.options : [];
}

// ../../node_modules/.pnpm/codemirror-lang-prolog@0.1.0/node_modules/codemirror-lang-prolog/dist/index.js
var Dot = 1;
var FullStop = 2;
var eof = -1;
var newline3 = 10;
var period2 = 46;
var space4 = 32;
var tab = 9;
var dotOrFullStop = new ExternalTokenizer((input) => {
  if (input.next !== period2) {
    return;
  }
  input.advance();
  if (input.next === eof || input.next === newline3 || input.next === space4 || input.next == tab) {
    input.acceptToken(FullStop);
  } else {
    input.acceptToken(Dot);
  }
});
var spec_Atom = { __proto__: null, discontiguous: 18, dynamic: 20, initialization: 22, meta_predicate: 24, module_transparent: 26, multifile: 28, public: 30, table: 32, thread_initialization: 34, thread_local: 36, volatile: 38, div: 104, mod: 106, rdiv: 108, rem: 110, xor: 112, as: 254, in: 256, in_set: 258, ins: 260, is: 262 };
var parser6 = LRParser.deserialize({
  version: 14,
  states: "0bQ]QTOOO&{QTO'#CsO+rQTO'#DRO0fQTO'#DgOOQS'#Fw'#FwO]QTO'#EtO5VQUO'#EvO9sQPO'#EuO9xQTO'#EyO:PQTO'#E}OOQS'#Fv'#FvO:WQTO'#DkOOQS'#Fu'#FuO>kQUO'#FsOOQS'#Ft'#FtOOQS'#Fs'#FsOCsQUO'#FqOOQS'#Fr'#FrOOQS'#Fq'#FqOGdQUO'#FoOOQS'#Fp'#FpOOQS'#Fo'#FoOKOQUO'#FnOOQS'#Fn'#FnOOQS'#Fm'#FmONZQUO'#FkOOQS'#Fl'#FlO! hQUO'#FjOOQS'#Fk'#FkO!!rQUO'#FiOOQS'#Fj'#FjOOQS'#Fi'#FiO!#yQUO'#FgOOQS'#Fh'#FhO!$zQUO'#FfOOQS'#Fg'#FgOOQS'#Ff'#FfOOQS'#Fe'#FeO!%xQUO'#FdO!&pQTO'#FcOOQS'#Fc'#FcO!'eQTO'#FbOOQS'#Fb'#FbO!(SQTO'#FaOOQS'#Fa'#FaOOQS'#F`'#F`O!(nQTO'#F_O!)VQTO'#FWO!)VQTO'#FXOOQS'#F_'#F_Q]QTOOO&{QTO'#CcO!)|QTO'#FZOOQS,59_,59_OOQS,59m,59mOOQS,5:R,5:RO!*RQPO,5;`O!*WQTO,5;gO!*_QTO,5;aOOQS,5;e,5;eO!*fQPO,5;eOOQS,5;i,5;iO!*kQPO,5;iOOQS,5:V,5:VO!*pQTO,5:UO!*pQTO,5:TO0fQTO,5;jO0fQTO,59vO0fQTO,59uO0fQTO,59pO0fQTO,59oO0fQTO,59nO+rQTO,59kO+rQTO,59iO+rQTO,59gO+rQTO,59fO+rQTO,59dO+rQTO,59bO+rQTO,59aO&{QTO,5<OO&{QTO,59^O&{QTO,59]O&{QTO,59[O!)VQTO,58|OOQS,5;r,5;rOOQS,5;s,5;sOOQS-E9X-E9XOOQS,58},58}OOQS,5;u,5;uOOQS1G0z1G0zOOQS1G1R1G1RO!*wQPO1G1ROOQS1G0{1G0{O!*|QPO1G0{OOQS1G1P1G1POOQS1G1T1G1TOOQS1G/p1G/pO!+RQUO1G/oOOQS1G1U1G1UOOQS1G/b1G/bO!/cQUO1G/aOOQS1G/[1G/[OOQS1G/Z1G/ZOOQS1G/Y1G/YOOQS1G/V1G/VO!3PQUO1G/TO!4^QUO1G/ROOQS1G/Q1G/QOOQS1G/O1G/OO!5hQUO1G.|O!6iQUO1G.{OOQS1G1j1G1jOOQS1G.x1G.xOOQS1G.w1G.wOOQS1G.v1G.vOOQS1G.h1G.hOOQS7+&m7+&mOOQS7+&g7+&g",
  stateData: "!7d~O$QOSROSSOS~OPSOWSOX!TOY!TOZ!TO[!TO]!TO^!TO_!TO`!TOa!TOb!TOc!TOhPOkSOmSOpSOrQOtSOyROzRO{SO|SO!PSO!QSO!RSO!SSO!TSO![RO!`ZO!aSO!bSO!cSO!dSO!eSO!fSO!gSO!hSO!iSO!jSO!kSO!lSO!mSO!nSO!oSO!pSO!qSO!rSO!sSO!tSO!uSO!vSO!wSO!xSO!ySO!zSO!{SO!|SO!}SO#OSO#PSO#QSO#RSO#SSO#TSO#USO#VSO#WSO#XSO#YYO#ZYO#[YO#]YO#^YO#_YO#`YO#aYO#bYO#cYO#dYO#eYO#gTO#lWO#pXO#y!PO#|!QO~OPSOWSOhPOkSOmSOpSOrQOtSOyROzRO{SO|SO!PSO!QSO!RSO!SSO!TSO![RO!`ZO!aSO!bSO!cSO!dSO!eSO!fSO!gSO!hSO!iSO!jSO!kSO!lSO!mSO!nSO!oSO!pSO!qSO!rSO!sSO!tSO!uSO!vSO!wSO!xSO!ySO!zSO!{SO!|SO!}SO#OSO#PSO#QSO#RSO#SSO#TSO#USO#VSO#WSO#XSO#YYO#ZYO#[YO#]YO#^YO#_YO#`YO#aYO#bYO#cYO#dYO#eYO#gTO#lWO#pXO~OPSOWSOkSOmSOpSOrQOtSOyROzRO{SO|SO!PSO!QSO!RSO!SSO!TSO![RO!`ZO!aSO!bSO!cSO!dSO!eSO!fSO!gSO!hSO!iSO!jSO!kSO!lSO!mSO!nSO!oSO!pSO!qSO!rSO!sSO!tSO!uSO!vSO!wSO!xSO!ySO!zSO!{SO!|SO!}SO#OSO#PSO#QSO#RSO#SSO#TSO#USO#VSO#WSO#XSO#YYO#ZYO#[YO#]YO#^YO#_YO#`YO#aYO#bYO#cYO#dYO#eYO#gTO#lWO#pXO~OPSOWSOkSOmSOpSOtSOyROzRO{SO|SO!PSO!QSO!RSO!SSO!TSO![RO!`ZO!aSO!bSO!cSO!dSO!eSO!fSO!gSO!hSO!iSO!jSO!kSO!lSO!mSO!nSO!oSO!pSO!qSO!rSO!sSO!tSO!uSO!vSO!wSO!xSO!ySO!zSO!{SO!|SO!}SO#OSO#PSO#QSO#RSO#SSO#TSO#USO#VSO#WSO#XSO#YYO#ZYO#[YO#]YO#^YO#_YO#`YO#aYO#bYO#cYO#dYO#eYO#gTO#lWO#pXO~O#p!ZOP$jXQ$jXk$jXm$jXp$jXr$jXt$jXy$jXz$jX{$jX|$jX!P$jX!Q$jX!R$jX!S$jX!T$jX!U$jX!V$jX!W$jX!X$jX!Y$jX!b$jX!c$jX!d$jX!e$jX!f$jX!g$jX!h$jX!i$jX!j$jX!l$jX!m$jX!n$jX!o$jX!p$jX!q$jX!r$jX!s$jX!t$jX!u$jX!v$jX!w$jX!x$jX!y$jX!z$jX!{$jX!|$jX!}$jX#O$jX#P$jX#Q$jX#R$jX#S$jX#T$jX#U$jX#V$jX#W$jX#X$jX#g#jX#s$jX#t$jX#u$jX#v$jX#w$jX#x$jX#y$jX#f$jX#k$jX#n$jX~O#g![O~O#k!]O~P]O#n!_O~P]OPSOWSOkSOmSOpSOtSO{SO|SO!PSO!QSO!RSO!SSO!TSO!aSO!bSO!cSO!dSO!eSO!fSO!gSO!hSO!iSO!jSO!kSO!lSO!mSO!nSO!oSO!pSO!qSO!rSO!sSO!tSO!uSO!vSO!wSO!xSO!ySO!zSO!{SO!|SO!}SO#OSO#PSO#QSO#RSO#SSO#TSO#USO#VSO#WSO#XSO#YYO#ZYO#[YO#]YO#^YO#_YO#`YO#aYO#bYO#cYO#dYO#eYO#gTO#lWO#pXO~OP!bO!i!cO#W!dOQ$gXk$gXm$gXp$gXr$gXt$gXy$gXz$gX{$gX|$gX!P$gX!Q$gX!R$gX!S$gX!T$gX!U$gX!V$gX!W$gX!X$gX!Y$gX!b$gX!c$gX!d$gX!e$gX!f$gX!g$gX!h$gX!j$gX!l$gX!m$gX!n$gX!o$gX!p$gX!q$gX!r$gX!s$gX!t$gX!u$gX!v$gX!w$gX!x$gX!y$gX!z$gX!{$gX!|$gX!}$gX#O$gX#P$gX#Q$gX#R$gX#S$gX#T$gX#U$gX#V$gX#X$gX#s$gX#t$gX#u$gX#v$gX#w$gX#x$gX#y$gX#f$gX#k$gX#n$gX~O!P!eO!Q!eO!R!eO!S!eO!T!eO!U!eO!V!eO!W!eO!X!eO!Y!eO~O!n!fOQ$eXk$eXm$eXp$eXr$eXt$eXy$eXz$eX{$eX|$eX!b$eX!c$eX!d$eX!e$eX!f$eX!g$eX!h$eX!j$eX!l$eX!m$eX!o$eX!p$eX!q$eX!r$eX!s$eX!t$eX!u$eX!v$eX!w$eX!x$eX!y$eX!z$eX!{$eX!|$eX!}$eX#O$eX#P$eX#Q$eX#R$eX#S$eX#T$eX#U$eX#V$eX#X$eX#s$eX#t$eX#u$eX#v$eX#w$eX#x$eX#y$eX#f$eX#k$eX#n$eX~PCROy!gOz!gO{!gO|!gO!o!hOQ$cXk$cXm$cXp$cXr$cXt$cX!b$cX!c$cX!d$cX!e$cX!f$cX!g$cX!h$cX!j$cX!l$cX!m$cX!p$cX!q$cX!r$cX!s$cX!t$cX!u$cX!v$cX!w$cX!x$cX!y$cX!z$cX!{$cX!|$cX!}$cX#O$cX#P$cX#Q$cX#R$cX#S$cX#T$cX#U$cX#V$cX#X$cX#s$cX#t$cX#u$cX#v$cX#w$cX#x$cX#y$cX#f$cX#k$cX#n$cX~O!b!iO!c!iO!d!iO!f!iO!g!iO!h!iO!p!iO!s!iO!t!iO!u!iO!v!iO!w!iO!x!iO!z!iO!{!iO!|!iO!}!iO#O!iO#P!iO#Q!iO#R!iO#S!iO#T!iO#U!iO#V!iO#s!iO#t!iO#u!iO#v!iO#w!iOQ$bXk$bXm$bXp$bXr$bXt$bX!e$bX!j$bX!l$bX!m$bX!q$bX!r$bX!y$bX#X$bX#x$bX#y$bX#f$bX#k$bX#n$bX~Ot!jOQ$_Xk$_Xm$_Xp$_Xr$_X!e$_X!j$_X!l$_X!m$_X!q$_X!r$_X!y$_X#X$_X#x$_X#y$_X#f$_X#k$_X#n$_X~Or!kOQ$^Xk$^Xm$^Xp$^X!e$^X!j$^X!l$^X!m$^X!q$^X!r$^X!y$^X#X$^X#x$^X#y$^X#f$^X#k$^X#n$^X~Op!lO!e!mOQ$]Xk$]Xm$]X!j$]X!l$]X!m$]X!q$]X!r$]X!y$]X#X$]X#x$]X#y$]X#f$]X#k$]X#n$]X~Om!nOQ$ZXk$ZX!j$ZX!l$ZX!m$ZX!q$ZX!r$ZX!y$ZX#X$ZX#x$ZX#y$ZX#f$ZX#k$ZX#n$ZX~Ok!oO!q!pOQ$YX!j$YX!l$YX!m$YX!r$YX!y$YX#X$YX#x$YX#y$YX#f$YX#k$YX#n$YX~O#x!qOQ$WX!j$WX!l$WX!m$WX!r$WX!y$WX#X$WX#y$WX#f$WX#k$WX#n$WX~O!j!rO!m!rOQ$VX!l$VX!r$VX!y$VX#X$VX#y$VX#f$VX#k$VX#n$VX~O!r!sOQ$UX!l$UX!y$UX#X$UX#y$UX#f$UX#k$UX#n$UX~O#X!tOQ$TX!l$TX!y$TX#y$TX#f$TX#k$TX#n$TX~O!l!uO!y!uO#y!uOQ$RX#f$RX#k$RX#n$RX~OX!TOY!TOZ!TO[!TO]!TO^!TO_!TO`!TOa!TOb!TOc!TO~P&{OQ!zO~O#f!{O~O#n!|O~P]O#f#OO~P]O#k#QO~O#n#RO~O!`ZO~P:WO#n#hO~O#f#iO~OP!bOQ!]ik!]im!]ip!]ir!]it!]iy!]iz!]i{!]i|!]i!P!]i!Q!]i!R!]i!S!]i!T!]i!U!]i!V!]i!W!]i!X!]i!Y!]i!b!]i!c!]i!d!]i!e!]i!f!]i!g!]i!h!]i!j!]i!l!]i!m!]i!n!]i!o!]i!p!]i!q!]i!r!]i!s!]i!t!]i!u!]i!v!]i!w!]i!x!]i!y!]i!z!]i!{!]i!|!]i!}!]i#O!]i#P!]i#Q!]i#R!]i#S!]i#T!]i#U!]i#V!]i#X!]i#s!]i#t!]i#u!]i#v!]i#w!]i#x!]i#y!]i#f!]i#k!]i#n!]i~OQ}ik}im}ip}ir}it}iy}iz}i{}i|}i!b}i!c}i!d}i!e}i!f}i!g}i!h}i!j}i!l}i!m}i!o}i!p}i!q}i!r}i!s}i!t}i!u}i!v}i!w}i!x}i!y}i!z}i!{}i!|}i!}}i#O}i#P}i#Q}i#R}i#S}i#T}i#U}i#V}i#X}i#s}i#t}i#u}i#v}i#w}i#x}i#y}i#f}i#k}i#n}i~PCROt!jOQqikqimqipqirqi!eqi!jqi!lqi!mqi!qqi!rqi!yqi#Xqi#xqi#yqi#fqi#kqi#nqi~Or!kOQoikoimoipoi!eoi!joi!loi!moi!qoi!roi!yoi#Xoi#xoi#yoi#foi#koi#noi~Om!nOQjikji!jji!lji!mji!qji!rji!yji#Xji#xji#yji#fji#kji#nji~Ok!oOQii!jii!lii!mii!rii!yii#Xii#xii#yii#fii#kii#nii~O",
  goto: ">f$lPPPPPP$m$vPPPPPPPPPPPP%S%b%q&RP&e&wP'[P'p(WP(nP)VP)o*Z*u+cPPPP,P,nPPPPPPPPPP-^P-^.P.sPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP/h/h0^PP/hP/hP/h-^PPPPPPP$m$mP1SPPP1Y1m2P2c2t3W3k&R4P4f4|5h6O6i7T)o7s8e9R9r:d;]<R<x=p_!ROTWX!S!Z![e}OTWX!P!Q!S!Z![!ui|OTWX!P!Q!S!T!Z![!t!ukzOTWX!P!Q!S!T!Z![!s!t!umxOTWX!P!Q!S!T!Z![!r!s!t!uquOPTWX!P!Q!S!T!Z![!q!r!s!t!uqtOPTWX!P!Q!S!T!Z![!q!r!s!t!ussOPTWX!P!Q!S!T!Z![!p!q!r!s!t!uuqOPTWX!P!Q!S!T!Z![!o!p!q!r!s!t!uyoOPTWX!P!Q!S!T!Z![!m!n!o!p!q!r!s!t!uynOPTWX!P!Q!S!T!Z![!m!n!o!p!q!r!s!t!u{lOPTWX!P!Q!S!T!Z![!l!m!n!o!p!q!r!s!t!u}jOPTWX!P!Q!S!T!Z![!k!l!m!n!o!p!q!r!s!t!u!RhOPQTWX!P!Q!S!T!Z![!j!k!l!m!n!o!p!q!r!s!t!u!RgOPQTWX!P!Q!S!T!Z![!j!k!l!m!n!o!p!q!r!s!t!u!VeOPQTWX!P!Q!S!T!Z![!h!i!j!k!l!m!n!o!p!q!r!s!t!u!VdOPQTWX!P!Q!S!T!Z![!h!i!j!k!l!m!n!o!p!q!r!s!t!u!XbOPQTWX!P!Q!S!T!Z![!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u!ZaOPQTWX!P!Q!S!T!Z![!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u!a_OPQRTWX!P!Q!S!T!Z![!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u!c^OPQRTWX!P!Q!S!T!Z![!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u!e[OPQRTWX!P!Q!S!T!Z![!b!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u!gYOPQRTWXZ!P!Q!S!T!Z![!b!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u!gVOPQRTWXZ!P!Q!S!T!Z![!b!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!uQ!SOR!x!SS!UO!SQ!YTQ!^WQ!`XQ!}!ZR#P![^!OOTWX!S!Z![Q!v!PQ!w!QR#g!ud}OTWX!P!Q!S!Z![!uQ!y!TR#f!th{OTWX!P!Q!S!T!Z![!t!uR#e!sjyOTWX!P!Q!S!T!Z![!s!t!uR#d!rlwOTWX!P!Q!S!T!Z![!r!s!t!uR#c!qnvOTWX!P!Q!S!T!Z![!q!r!s!t!uR!VPprOPTWX!P!Q!S!T!Z![!q!r!s!t!uR#b!prpOPTWX!P!Q!S!T!Z![!p!q!r!s!t!uR#a!otqOPTWX!P!Q!S!T!Z![!o!p!q!r!s!t!uQ#_!mR#`!nymOPTWX!P!Q!S!T!Z![!m!n!o!p!q!r!s!t!uxkOPTWX!P!Q!S!T!Z![!m!n!o!p!q!r!s!t!uR#^!lziOPTWX!P!Q!S!T!Z![!l!m!n!o!p!q!r!s!t!uR#]!k|jOPTWX!P!Q!S!T!Z![!k!l!m!n!o!p!q!r!s!t!uQ!WQR#[!j!QfOPQTWX!P!Q!S!T!Z![!j!k!l!m!n!o!p!q!r!s!t!uQ#Y!hR#Z!i!VcOPQTWX!P!Q!S!T!Z![!h!i!j!k!l!m!n!o!p!q!r!s!t!u!UdOPQTWX!P!Q!S!T!Z![!h!i!j!k!l!m!n!o!p!q!r!s!t!uR#X!g!W`OPQTWX!P!Q!S!T!Z![!g!h!i!j!k!l!m!n!o!p!q!r!s!t!uR#W!f!YaOPQTWX!P!Q!S!T!Z![!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!uQ!XRQ#U!dR#V!e!`]OPQRTWX!P!Q!S!T!Z![!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!uR#T!c!b^OPQRTWX!P!Q!S!T!Z![!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!uR#S!b!d[OPQRTWX!P!Q!S!T!Z![!b!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!uR!aZ!gUOPQRTWXZ!P!Q!S!T!Z![!b!c!d!e!f!g!h!i!j!k!l!m!n!o!p!q!r!s!t!u",
  nodeNames: "\u26A0 Dot FullStop LineComment BlockComment Program Rule UnaryOperation Atom discontiguous dynamic initialization meta_predicate module_transparent multifile public table thread_initialization thread_local volatile BinaryOperation BinaryOperation BinaryOperation UnaryOperation \\+ BinaryOperation BinaryOperation #<==> BinaryOperation #<== BinaryOperation BinaryOperation #\\/ BinaryOperation #\\ BinaryOperation #/\\ UnaryOperation BinaryOperation BinaryOperation BinaryOperation + - /\\ \\/ BinaryOperation BinaryOperation * / // << >> div mod rdiv rem xor UnaryOperation \\ BinaryOperation BinaryOperation UnaryOperation $ QuotedAtom #< #= #=< #==> #> #>= #\\= ** *-> , --> -> .. : :< := ; < = =.. =:= =< == => =@= =\\= > >:< >= @< @=< @> @>= \\= \\== \\=@= ^ | Variable String String2 String3 BackQuoteString Number Float HexNumber OctalNumber BinaryNumber Rational ! ) ( Parentheses Application Functor ] [ List } Dict { CodeBlock BinaryOperation as in in_set ins is Comma :- Command Query ?-",
  maxTerm: 165,
  nodeProps: [
    ["openedBy", 114, "(", 119, "[", 122, "{"],
    ["closedBy", 115, ")", 120, "]", 124, "}"]
  ],
  skippedNodes: [0, 3, 4],
  repeatNodeCount: 1,
  tokenData: "9c~RvXY#iYZ#i]^#ipq#iqr#zrs$Pst$ntu'Xuv'^wx'ixy(Wyz(]z{(b{|(}|})S}!O)Z!O!P)v!P!Q*R!Q!R+`!R![/v![!]1h!]!^2V!^!_2[!_!`2i!`!a4b!a!b5V!b!c5b!c!}6]!}#O6n#O#P6s#P#Q7x#Q#R7}#R#S6]#S#T8S#T#o8q#o#p9S#p#q9X#q#r9^~#nS$Q~XY#iYZ#i]^#ipq#i~$PO#e~~$STOr$Prs$cs#O$P#O#P$h#P~$P~$hO#Z~~$kPO~$P~$qT!P!Q%Q!^!_%]!_!`%x!`!a&e#O#P&r~%TP#O#P%W~%]Ot~~%bP!b~!_!`%e~%hP!_!`%k~%pPm~!`!a%s~%xOk~~%}Q!c~!^!_&T!_!`&Y~&YO!d~~&]P!`!a&`~&eO!e~~&jP!f~!_!`&m~&rO!g~~&wQr~!P!Q&}!_!`'S~'SOp~~'XO!h~~'^O!`~~'cQR~OY'^Z~'^~'lTOw'iwx'{x#O'i#O#P(Q#P~'i~(QO!a~~(TPO~'i~(]O#g~~(bO#f~~(gQ!P~z{(m}!O(r~(rO!i~~(uP!`!a(x~(}O!j~~)SOy~R)ZO!kP#xQ~)`Qz~}!O)f!`!a)q~)iP!`!a)l~)qO!l~~)vO!m~~)yP!O!P)|~*RO!n~~*WR!Q~z{*a!P!Q+U#O#P+Z~*dROz*az{*m{~*a~*pTOz*az{*m{!P*a!P!Q+P!Q~*a~+UOS~~+ZO!R~~+`O{~~+eY#_~pq,Twx,z!O!P-V!Q![.P#R#S,T#U#V.h#X#Y-h#c#d.|#f#g,f#l#m/[~,YS#_~pq,T!Q![,T#R#S,T#f#g,f~,iP!Q![,l~,qR#d~pq,l!Q![,l#R#S,l~,}PO~-Q~-VO#]~~-YP!Q![-]~-bQ#`~!Q![-]#X#Y-h~-kQ}!O-q!Q![-w~-tP!Q![-w~-|P#`~!Q![-w~.UU#_~pq,T!O!P-V!Q![.P#R#S,T#X#Y-h#f#g,f~.kQ!Q!R.q!R!S.q~.vQ#c~!Q!R.q!R!S.q~/PP!Q!Y/S~/XP#b~!Q!Y/S~/_R!Q![/h!c!}/h#T#o/h~/mR#a~!Q![/h!c!}/h#T#o/h~/{V#_~pq,Twx0b!O!P-V!Q![0|#R#S,T#X#Y-h#f#g,f~0eR!Q![0n!c!}0n#T#o0n~0sR#[~!Q![0n!c!}0n#T#o0n~1RV#_~pq,Twx0b!O!P-V!Q![.P#R#S,T#X#Y-h#f#g,f~1mR!o~}!O1v!^!_1{!_!`2Q~1{O#y~~2QO!p~~2VO!q~~2[O!r~~2aP!s~!^!_2d~2iO!S~~2nV!t~!O!P3T![!]3`!^!_3k!_!`3p!`!a3u!b!c3z#O#P4V~3WP!O!P3Z~3`O!u~~3cP!_!`3f~3kO!v~~3pO!w~~3uO!x~~3zO!y~~3}P!_!`4Q~4VO!z~~4YP!_!`4]~4bO!{~~4gR!|~![!]4p!_!`4{!`!a5Q~4sP!^!_4v~4{O!}~~5QO#O~~5VO!T~~5YP}!O5]~5bO#|~~5eR!^!_5n!_!`5s!`!a6O~5sO#P~~5vP!^!_5y~6OO#Q~~6TP#R~!_!`6W~6]O#S~~6bS#Y~!Q![6]!c!}6]#R#S6]#T#o6]~6sO#l~~6xR![~{|7R!P!Q7W!_!`7]~7WOh~~7]O|~~7bQ#T~!_!`7h!b!c7m~7mO#U~~7pP!_!`7s~7xO#V~~7}O#k~~8SO#W~~8VTO#O8S#O#P8f#P#S8S#S#T8l#T~8S~8iPO~8S~8qO#^~~8vSW~!Q![8q!c!}8q#R#S8q#T#o8q~9XO#p~~9^O#X~~9cO#n~",
  tokenizers: [0, 1, dotOrFullStop],
  topRules: { "Program": [0, 5] },
  specialized: [{ term: 8, get: (value) => spec_Atom[value] || -1 }],
  tokenPrec: 0
});
var prologLanguage = LRLanguage.define({
  parser: parser6.configure({
    props: [
      styleTags({
        "Comma FullStop": tags.separator,
        "( )": tags.paren,
        "[ ]": tags.squareBracket,
        "{ }": tags.bracket,
        '"!"': tags.operator,
        // Line generated by helper.py:
        '"#/\\\\" "#\\\\/" "*" "**" "*->" "/" "//" "/\\\\" "\\\\/" #< #<== #<==> #= #=< #==> #> #>= #\\ #\\= $ + , - --> -> .. : :- :< := ; < << = =.. =:= =< == => =@= =\\= > >:< >= >> ?- @< @=< @> @>= Dot \\ \\+ \\= \\== \\=@= ^ as discontiguous div dynamic in in_set initialization ins is meta_predicate mod module_transparent multifile public rdiv rem table thread_initialization thread_local volatile xor |': tags.operator,
        "Functor/Atom": tags.function(tags.variableName),
        Atom: tags.constant(tags.name),
        BackQuoteString: tags.string,
        BinaryNumber: tags.number,
        BlockComment: tags.blockComment,
        Float: tags.number,
        HexNumber: tags.number,
        LineComment: tags.lineComment,
        Number: tags.number,
        OctalNumber: tags.number,
        QuotedAtom: tags.constant(tags.name),
        Rational: tags.number,
        String: tags.string,
        String2: tags.string,
        String3: tags.string,
        Variable: tags.variableName
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "%" }
  }
});
function prolog() {
  return new LanguageSupport(prologLanguage);
}

// ../../node_modules/.pnpm/@lezer+python@1.1.11/node_modules/@lezer/python/dist/index.js
var printKeyword = 1;
var indent = 206;
var dedent = 207;
var newline$1 = 208;
var blankLineStart = 209;
var newlineBracketed = 210;
var eof2 = 211;
var formatString1Content = 212;
var formatString1Brace = 2;
var formatString1End = 213;
var formatString2Content = 214;
var formatString2Brace = 3;
var formatString2End = 215;
var formatString1lContent = 216;
var formatString1lBrace = 4;
var formatString1lEnd = 217;
var formatString2lContent = 218;
var formatString2lBrace = 5;
var formatString2lEnd = 219;
var ParenL = 26;
var ParenthesizedExpression = 27;
var TupleExpression = 51;
var ComprehensionExpression = 52;
var BracketL = 57;
var ArrayExpression = 58;
var ArrayComprehensionExpression = 59;
var BraceL = 61;
var DictionaryExpression = 62;
var DictionaryComprehensionExpression = 63;
var SetExpression = 64;
var SetComprehensionExpression = 65;
var ArgList = 67;
var subscript = 256;
var FormatString = 74;
var importList = 275;
var TypeParamList = 120;
var ParamList = 138;
var SequencePattern = 159;
var MappingPattern = 160;
var PatternArgList = 163;
var newline4 = 10;
var carriageReturn = 13;
var space5 = 32;
var tab2 = 9;
var hash2 = 35;
var parenOpen = 40;
var dot = 46;
var braceOpen = 123;
var singleQuote = 39;
var doubleQuote = 34;
var backslash2 = 92;
var bracketed = /* @__PURE__ */ new Set([
  ParenthesizedExpression,
  TupleExpression,
  ComprehensionExpression,
  importList,
  ArgList,
  ParamList,
  ArrayExpression,
  ArrayComprehensionExpression,
  subscript,
  SetExpression,
  SetComprehensionExpression,
  FormatString,
  DictionaryExpression,
  DictionaryComprehensionExpression,
  SequencePattern,
  MappingPattern,
  PatternArgList,
  TypeParamList
]);
function isLineBreak(ch) {
  return ch == newline4 || ch == carriageReturn;
}
var newlines = new ExternalTokenizer((input, stack) => {
  let prev;
  if (input.next < 0) {
    input.acceptToken(eof2);
  } else if (stack.context.depth < 0) {
    if (isLineBreak(input.next))
      input.acceptToken(newlineBracketed, 1);
  } else if (((prev = input.peek(-1)) < 0 || isLineBreak(prev)) && stack.canShift(blankLineStart)) {
    let spaces2 = 0;
    while (input.next == space5 || input.next == tab2) {
      input.advance();
      spaces2++;
    }
    if (input.next == newline4 || input.next == carriageReturn || input.next == hash2)
      input.acceptToken(blankLineStart, -spaces2);
  } else if (isLineBreak(input.next)) {
    input.acceptToken(newline$1, 1);
  }
}, { contextual: true });
var indentation = new ExternalTokenizer((input, stack) => {
  let cDepth = stack.context.depth;
  if (cDepth < 0)
    return;
  let prev = input.peek(-1);
  if (prev == newline4 || prev == carriageReturn) {
    let depth = 0, chars = 0;
    for (; ; ) {
      if (input.next == space5)
        depth++;
      else if (input.next == tab2)
        depth += 8 - depth % 8;
      else
        break;
      input.advance();
      chars++;
    }
    if (depth != cDepth && input.next != newline4 && input.next != carriageReturn && input.next != hash2) {
      if (depth < cDepth)
        input.acceptToken(dedent, -chars);
      else
        input.acceptToken(indent);
    }
  }
});
function IndentLevel(parent, depth) {
  this.parent = parent;
  this.depth = depth;
  this.hash = (parent ? parent.hash + parent.hash << 8 : 0) + depth + (depth << 4);
}
var topIndent = new IndentLevel(null, 0);
function countIndent(space6) {
  let depth = 0;
  for (let i = 0; i < space6.length; i++)
    depth += space6.charCodeAt(i) == tab2 ? 8 - depth % 8 : 1;
  return depth;
}
var trackIndent = new ContextTracker({
  start: topIndent,
  reduce(context, term) {
    return context.depth < 0 && bracketed.has(term) ? context.parent : context;
  },
  shift(context, term, stack, input) {
    if (term == indent)
      return new IndentLevel(context, countIndent(input.read(input.pos, stack.pos)));
    if (term == dedent)
      return context.parent;
    if (term == ParenL || term == BracketL || term == BraceL)
      return new IndentLevel(context, -1);
    return context;
  },
  hash(context) {
    return context.hash;
  }
});
var legacyPrint = new ExternalTokenizer((input) => {
  for (let i = 0; i < 5; i++) {
    if (input.next != "print".charCodeAt(i))
      return;
    input.advance();
  }
  if (/\w/.test(String.fromCharCode(input.next)))
    return;
  for (let off = 0; ; off++) {
    let next = input.peek(off);
    if (next == space5 || next == tab2)
      continue;
    if (next != parenOpen && next != dot && next != newline4 && next != carriageReturn && next != hash2)
      input.acceptToken(printKeyword);
    return;
  }
});
function formatString(quote, len, content, brace, end) {
  return new ExternalTokenizer((input) => {
    let start = input.pos;
    for (; ; ) {
      if (input.next < 0) {
        break;
      } else if (input.next == braceOpen) {
        if (input.peek(1) == braceOpen) {
          input.advance(2);
        } else {
          if (input.pos == start) {
            input.acceptToken(brace, 1);
            return;
          }
          break;
        }
      } else if (input.next == backslash2) {
        input.advance();
        if (input.next >= 0)
          input.advance();
      } else if (input.next == quote && (len == 1 || input.peek(1) == quote && input.peek(2) == quote)) {
        if (input.pos == start) {
          input.acceptToken(end, len);
          return;
        }
        break;
      } else {
        input.advance();
      }
    }
    if (input.pos > start)
      input.acceptToken(content);
  });
}
var formatString1 = formatString(singleQuote, 1, formatString1Content, formatString1Brace, formatString1End);
var formatString2 = formatString(doubleQuote, 1, formatString2Content, formatString2Brace, formatString2End);
var formatString1l = formatString(singleQuote, 3, formatString1lContent, formatString1lBrace, formatString1lEnd);
var formatString2l = formatString(doubleQuote, 3, formatString2lContent, formatString2lBrace, formatString2lEnd);
var pythonHighlighting = styleTags({
  'async "*" "**" FormatConversion FormatSpec': tags.modifier,
  "for while if elif else try except finally return raise break continue with pass assert await yield match case": tags.controlKeyword,
  "in not and or is del": tags.operatorKeyword,
  "from def class global nonlocal lambda": tags.definitionKeyword,
  import: tags.moduleKeyword,
  "with as print": tags.keyword,
  Boolean: tags.bool,
  None: tags.null,
  VariableName: tags.variableName,
  "CallExpression/VariableName": tags.function(tags.variableName),
  "FunctionDefinition/VariableName": tags.function(tags.definition(tags.variableName)),
  "ClassDefinition/VariableName": tags.definition(tags.className),
  PropertyName: tags.propertyName,
  "CallExpression/MemberExpression/PropertyName": tags.function(tags.propertyName),
  Comment: tags.lineComment,
  Number: tags.number,
  String: tags.string,
  FormatString: tags.special(tags.string),
  UpdateOp: tags.updateOperator,
  "ArithOp!": tags.arithmeticOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  AssignOp: tags.definitionOperator,
  Ellipsis: tags.punctuation,
  At: tags.meta,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace,
  ".": tags.derefOperator,
  ", ;": tags.separator
});
var spec_identifier3 = { __proto__: null, await: 48, or: 58, and: 60, in: 64, not: 66, is: 68, if: 74, else: 76, lambda: 80, yield: 98, from: 100, async: 106, for: 108, None: 178, True: 180, False: 180, del: 194, pass: 198, break: 202, continue: 206, return: 210, raise: 218, import: 222, as: 224, global: 228, nonlocal: 230, assert: 234, type: 239, elif: 252, while: 256, try: 262, except: 264, finally: 266, with: 270, def: 274, class: 284, match: 295, case: 301 };
var parser7 = LRParser.deserialize({
  version: 14,
  states: "#)WO`Q#yOOP$bOSOOO%kQ&nO'#HhOOQS'#Cq'#CqOOQS'#Cr'#CrO'ZQ#xO'#CpO(|Q&nO'#HgOOQS'#Hh'#HhOOQS'#DW'#DWOOQS'#Hg'#HgO)jQ#xO'#DaO)}Q#xO'#DhO*_Q#xO'#DlOOQS'#Dw'#DwO*rO,UO'#DwO*zO7[O'#DwO+SOWO'#DxO+_O`O'#DxO+jOpO'#DxO+uO!bO'#DxO-wQ&nO'#HXOOQS'#HX'#HXO'ZQ#xO'#HWO/ZQ&nO'#HWOOQS'#Ej'#EjO/rQ#xO'#EkOOQS'#HV'#HVO/|Q#xO'#HUOOQV'#HU'#HUO0XQ#xO'#FbOOQS'#Gj'#GjO0^Q#xO'#FaOOQV'#I_'#I_OOQV'#HT'#HTOOQV'#Fy'#FyQ`Q#yOOO'ZQ#xO'#CsO0lQ#xO'#DPO0sQ#xO'#DTO1RQ#xO'#HlO1cQ&nO'#E_O'ZQ#xO'#E`OOQS'#Eb'#EbOOQS'#Ed'#EdOOQS'#Ef'#EfO1wQ#xO'#EhO2_Q#xO'#ElO0XQ#xO'#EnO2rQ&nO'#EnO0XQ#xO'#EqO/rQ#xO'#EtO0XQ#xO'#EvO/rQ#xO'#E|O/rQ#xO'#FPO2}Q#xO'#FRO3UQ#xO'#FWO3aQ#xO'#FSO/rQ#xO'#FWO0XQ#xO'#FYO0XQ#xO'#F_O3fQ#xO'#FdP3mO#xO'#HSPOOO)CBv)CBvOOQS'#Cg'#CgOOQS'#Ch'#ChOOQS'#Ci'#CiOOQS'#Cj'#CjOOQS'#Ck'#CkOOQS'#Cl'#ClOOQS'#Cn'#CnO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO3xQ#xO'#DqOOQS,5:[,5:[O4]Q#xO'#HvOOQS,5:_,5:_O4jQMlO,5:_O4oQ&nO,59[O0lQ#xO,59dO0lQ#xO,59dO0lQ#xO,59dO7_Q#xO,59dO7dQ#xO,59dO7kQ#xO,59lO7rQ#xO'#HgO8xQ#xO'#HfOOQS'#Hf'#HfOOQS'#D^'#D^O9aQ#xO,59cO'ZQ#xO,59cO9oQ#xO,59cOOQS,59{,59{O9tQ#xO,5:TO'ZQ#xO,5:TOOQS,5:S,5:SO:SQ#xO,5:SO:XQ#xO,5:ZO'ZQ#xO,5:ZO'ZQ#xO,5:XOOQS,5:W,5:WO:jQ#xO,5:WO:oQ#xO,5:YOOOO'#GR'#GRO:tO,UO,5:cOOQS,5:c,5:cOOOO'#GS'#GSO:|O7[O,5:cO;UQ#xO'#DyOOOW'#GT'#GTO;fOWO,5:dOOQS,5:d,5:dO;UQ#xO'#EPOOO`'#GW'#GWO;qO`O,5:dO;UQ#xO'#EROOOp'#GX'#GXO;|OpO,5:dO;UQ#xO'#ETOOO!b'#GY'#GYO<XO!bO,5:dOOQS'#GZ'#GZO<dQ&nO,5:qO?UQ&nO,5=rO?oQ!LUO,5=rO@`Q&nO,5=rOOQS,5;V,5;VO@wQ#yO'#GdOBZQ#xO,5;fOOQV,5=p,5=pOBfQ&nO'#IYOB}Q#xO,5;|OOQS-E:h-E:hOOQV,5;{,5;{O3[Q#xO'#FYOOQV-E9w-E9wOCVQ&nO,59_OE^Q&nO,59kOEwQ#xO'#HiOFSQ#xO'#HiO0XQ#xO'#HiOF_Q#xO'#DVOFgQ#xO,59oOFlQ#xO'#HmO'ZQ#xO'#HmO/rQ#xO,5>WOOQS,5>W,5>WO/rQ#xO'#EZOOQS'#E['#E[OGZQ#xO'#G]OGkQ#xO,59OOGkQ#xO,59OO)pQ#xO,5:wOGyQ&nO'#HoOOQS,5:z,5:zOOQS,5;S,5;SOH^Q#xO,5;WOHoQ#xO,5;YOOQS'#G`'#G`OH}Q&nO,5;YOI]Q#xO,5;YOIbQ#xO'#I]OOQS,5;],5;]OIpQ#xO'#IXOOQS,5;`,5;`OJRQ#xO,5;bO3aQ#xO,5;hO3aQ#xO,5;kOJZQ&nO'#I`O'ZQ#xO'#I`OJeQ#xO,5;mO2}Q#xO,5;mO/rQ#xO,5;rO0XQ#xO,5;tOJjQ#yO'#E}OKvQ#{O,5;nO! [Q#xO'#IaO3aQ#xO,5;rO! gQ#xO,5;tO! oQ#xO,5;yO! zQ&nO,5<OO'ZQ#xO,5<OPOOO,5=n,5=nP!!ROSO,5=nP!!WO#xO,5=nO!${Q&nO1G.lO!%SQ&nO1G.lO!'sQ&nO1G.lO!'}Q&nO1G.lO!*hQ&nO1G.lO!*{Q&nO1G.lO!+`Q#xO'#HuO!+nQ&nO'#HXO/rQ#xO'#HuO!+xQ#xO'#HtOOQS,5:],5:]O!,QQ#xO,5:]O!,VQ#xO'#HwO!,bQ#xO'#HwO!,uQ#xO,5>bOOQS'#Du'#DuOOQS1G/y1G/yOOQS1G/O1G/OO!-uQ&nO1G/OO!-|Q&nO1G/OO0lQ#xO1G/OO!.iQ#xO1G/WOOQS'#D]'#D]O/rQ#xO,59vOOQS1G.}1G.}O!.pQ#xO1G/gO!/QQ#xO1G/gO!/YQ#xO1G/hO'ZQ#xO'#HnO!/_Q#xO'#HnO!/dQ&nO1G.}O!/tQ#xO,59kO!0zQ#xO,5>^O!1[Q#xO,5>^O!1dQ#xO1G/oO!1iQ&nO1G/oOOQS1G/n1G/nO!1yQ#xO,5>XO!2pQ#xO,5>XO/rQ#xO1G/sO!3_Q#xO1G/uO!3dQ&nO1G/uO!3tQ&nO1G/sOOQS1G/r1G/rOOQS1G/t1G/tOOOO-E:P-E:POOQS1G/}1G/}OOOO-E:Q-E:QO!4UQ#xO'#IRO/rQ#xO'#IRO!4gQ#xO,5:eOOOW-E:R-E:ROOQS1G0O1G0OO!4uQ#xO,5:kOOO`-E:U-E:UO!5TQ#xO,5:mOOOp-E:V-E:VO!5cQ#xO,5:oOOO!b-E:W-E:WOOQS-E:X-E:XO!5qQ!LUO1G3^O!6bQ&nO1G3^O'ZQ#xO,5<vOOQS,5<v,5<vOOQS-E:Y-E:YOOQS,5=O,5=OOOQS-E:b-E:bOOQV1G1Q1G1QO0XQ#xO'#G_O!6yQ&nO,5>tOOQS1G1h1G1hO!7bQ#xO1G1hOOQS'#DX'#DXO/rQ#xO,5>TOOQS,5>T,5>TO!7gQ#xO'#FzO!7rQ#xO,59qO!7zQ#xO1G/ZO!8UQ&nO,5>XOOQS1G3r1G3rOOQS,5:u,5:uO!8uQ#xO'#HWOOQS,5<w,5<wOOQS-E:Z-E:ZO!9WQ#xO1G.jOOQS1G0c1G0cO!9fQ#xO,5>ZO!9vQ#xO,5>ZO/rQ#xO1G0rO/rQ#xO1G0rO0XQ#xO1G0tOOQS-E:^-E:^O!:XQ#xO1G0tO!:dQ#xO1G0tO!:iQ#xO,5>wO!:wQ#xO,5>wO!;VQ#xO,5>sO!;mQ#xO,5>sO!<OQ#xO'#ExO/rQ#xO1G0|O!<ZQ#xO1G0|O!<`Q#{O1G1SO!?qQ#{O1G1VO!CPQ#xO,5>zO!CZQ#xO,5>zO!CcQ&nO,5>zO/rQ#xO1G1XO!CmQ#xO1G1XO3aQ#xO1G1^O! gQ#xO1G1`OOQV,5;i,5;iO!CrQ#zO,5;iO!CwQ#{O1G1YO!G]Q#xO'#GgO3aQ#xO1G1YO3aQ#xO1G1YO!GmQ#xO,5>{O!GzQ#xO,5>{O0XQ#xO,5>{OOQV1G1^1G1^O!HSQ#xO'#F[O!HeQMlO1G1`O!HmQ#xO1G1`OOQV1G1e1G1eO3aQ#xO1G1eO!HrQ#xO1G1eO!HzQ#xO'#FfOOQV1G1j1G1jO! zQ&nO1G1jPOOO1G3Y1G3YP!IPOSO1G3YOOQS,5>a,5>aOOQS'#Dr'#DrO/rQ#xO,5>aO!IUQ#xO,5>`O!IiQ#xO,5>`OOQS1G/w1G/wO!IqQ#xO,5>cO!JRQ#xO,5>cO!JZQ#xO,5>cO!JnQ#xO,5>cO!KOQ#xO,5>cOOQS1G3|1G3|OOQS7+$j7+$jO!7zQ#xO7+$rO!LqQ#xO1G/OO!LxQ#xO1G/OOOQS1G/b1G/bOOQS,5<h,5<hO'ZQ#xO,5<hOOQS7+%R7+%RO!MPQ#xO7+%ROOQS-E9z-E9zOOQS7+%S7+%SO!MaQ#xO,5>YO'ZQ#xO,5>YOOQS7+$i7+$iO!MfQ#xO7+%RO!MnQ#xO7+%SO!MsQ#xO1G3xOOQS7+%Z7+%ZO!NTQ#xO1G3xO!N]Q#xO7+%ZOOQS,5<g,5<gO'ZQ#xO,5<gO!NbQ#xO1G3sOOQS-E9y-E9yO# XQ#xO7+%_OOQS7+%a7+%aO# gQ#xO1G3sO#!UQ#xO7+%aO#!ZQ#xO1G3yO#!kQ#xO1G3yO#!sQ#xO7+%_O#!xQ#xO,5>mO##cQ#xO,5>mO##cQ#xO,5>mOOQS'#Dz'#DzO##tO$ISO'#D|O#$PO#tO'#ISOOOW1G0P1G0PO#$UQ#xO1G0PO#$^Q#xO1G0POOQS'#EQ'#EQOOO`1G0V1G0VO#$iQ#xO1G0VO#$qQ#xO1G0VOOQS'#ES'#ESOOOp1G0X1G0XO#$|Q#xO1G0XO#%UQ#xO1G0XOOQS'#EU'#EUOOO!b1G0Z1G0ZO#%aQ#xO1G0ZO#%iQ#xO1G0ZO#%tQ!LUO7+(xO#&eQ&nO1G2bP#'OQ#xO'#G[OOQS,5<y,5<yOOQS-E:]-E:]OOQS7+'S7+'SOOQS1G3o1G3oOOQS,5<f,5<fOOQS-E9x-E9xOOQS7+$u7+$uO#']Q#xO,5=rO#'vQ#xO,5=rO#(XQ&nO,5<iO#(lQ#xO1G3uOOQS-E9{-E9{OOQS7+&^7+&^O#(|Q#xO7+&^OOQS7+&`7+&`O#)[Q#xO'#I[O0XQ#xO'#IZO#)pQ#xO7+&`OOQS,5<|,5<|O#){Q#xO1G4cOOQS-E:`-E:`OOQS,5<x,5<xO#*ZQ#xO1G4_OOQS-E:[-E:[O0XQ#xO'#EyO#*qQ#xO'#EyO#*|Q#xO'#I^O#+UQ#xO,5;dOOQS7+&h7+&hO/rQ#xO7+&hO#+ZQ#{O7+&nO!G`Q#xO'#GeO3aQ#xO7+&nO3aQ#xO7+&qO#.lQ&nO,5=QO'ZQ#xO,5=QO#.vQ#xO1G4fOOQS-E:d-E:dO#/QQ#xO1G4fO3aQ#xO7+&sO/rQ#xO7+&sOOQV7+&x7+&xO!HeQMlO7+&zO!HmQ#xO7+&zO`Q#yO1G1TOOQV-E:e-E:eO3aQ#xO7+&tO3aQ#xO7+&tOOQV,5=R,5=RO#/YQ#xO,5=RO!G`Q#xO,5=ROOQV7+&t7+&tO#/eQ#{O7+&tO#2sQ#xO,5=SO#3OQ#xO1G4gOOQS-E:f-E:fO#3]Q#xO1G4gO#3eQ#xO'#IcO#3sQ#xO'#IcO0XQ#xO'#IcOOQS'#Ic'#IcO#4OQ#xO'#IbOOQS,5;v,5;vO#4WQ#xO,5;vO/rQ#xO'#F^OOQV7+&z7+&zO3aQ#xO7+&zOOQV7+'P7+'PO3aQ#xO7+'PO#4]Q#zO,5<QOOQV7+'U7+'UPOOO7+(t7+(tO#4bQ#xO1G3{OOQS,5<k,5<kO#4pQ#xO1G3zOOQS-E9}-E9}O#5TQ#xO,5<lO#5`Q#xO,5<lO#5sQ#xO1G3}OOQS-E:O-E:OO#6TQ#xO1G3}O#6]Q#xO1G3}O#6mQ#xO1G3}O#6TQ#xO1G3}OOQS<<H^<<H^O#6xQ&nO1G2SOOQS<<Hm<<HmP#7VQ#xO'#F|O7kQ#xO1G3tO#7dQ#xO1G3tO#7iQ#xO<<HmOOQS<<Hn<<HnO#7yQ#xO7+)dOOQS<<Hu<<HuO#8ZQ&nO1G2RP#8zQ#xO'#F{O#9XQ#xO7+)eO#9iQ#xO7+)eO#9qQ#xO<<HyO#9vQ#xO7+)_OOQS<<H{<<H{O#:mQ#xO,5<jO'ZQ#xO,5<jOOQS-E9|-E9|OOQS<<Hy<<HyOOQS,5<p,5<pO/rQ#xO,5<pO#:rQ#xO1G4XOOQS-E:S-E:SO#;]Q#xO1G4XO;UQ#xO'#D}OOOO'#GV'#GVO#;nO$ISO,5:hOOO#l,5>n,5>nOOOW7+%k7+%kO#;yQ#xO7+%kOOO`7+%q7+%qO#<RQ#xO7+%qOOOp7+%s7+%sO#<ZQ#xO7+%sOOO!b7+%u7+%uO#<cQ#xO7+%uO#<kQ#xO1G3^O#=UQ#xO1G3^P'ZQ#xO'#F}O/rQ#xO<<IxO#=gQ#xO,5>vO#=xQ#xO,5>vO0XQ#xO,5>vO#>ZQ#xO,5>uOOQS<<Iz<<IzP0XQ#xO'#GbP/rQ#xO'#G^OOQS,5;e,5;eO#>`Q#xO,5>xO#>nQ#xO,5>xOOQS1G1O1G1OOOQS<<JS<<JSOOQV-E:c-E:cO3aQ#xO<<JYOOQV,5=P,5=PO3aQ#xO,5=POOQV<<JY<<JYOOQV<<J]<<J]O#>vQ&nO1G2lP#?QQ#xO'#GfO#?XQ#xO7+*QO#?cQ#{O<<J_O3aQ#xO<<J_OOQV<<Jf<<JfO3aQ#xO<<JfO!HeQMlO<<JfO#BqQ#{O7+&oOOQV<<J`<<J`O#B{Q#{O<<J`OOQV1G2m1G2mO0XQ#xO1G2mO#FZQ#xO1G2mO3aQ#xO<<J`O0XQ#xO1G2nP/rQ#xO'#GhO#FfQ#xO7+*RO#FsQ#xO7+*ROOQS'#F]'#F]O/rQ#xO,5>}O#F{Q#xO,5>}OOQS,5>},5>}O#GWQ#xO,5>|O#GiQ#xO,5>|OOQS1G1b1G1bOOQS,5;x,5;xOOQV<<Jk<<JkO#GqQ#xO1G1lOOQS7+)g7+)gP#GvQ#xO'#GPO#HWQ#xO1G2WO#HkQ#xO1G2WO#H{Q#xO1G2WP#IWQ#xO'#GQO#IeQ#xO7+)iO#IuQ#xO7+)iO#IuQ#xO7+)iO#I}Q#xO7+)iO#J_Q#xO7+)`O7kQ#xO7+)`OOQSAN>XAN>XO#JxQ#xO<<MPOOQSAN>eAN>eO/rQ#xO1G2UO#KYQ&nO1G2UP#KdQ#xO'#GOOOQS1G2[1G2[P#KqQ#xO'#GUO#LOQ#xO7+)sO#LiQ#xO,5:iOOOO-E:T-E:TOOOW<<IV<<IVOOO`<<I]<<I]OOOp<<I_<<I_OOO!b<<Ia<<IaO#LwQ#xO7+(xOOQSAN?dAN?dO#MbQ#xO,5<{O#MvQ#xO1G4bOOQS-E:_-E:_O#NXQ#xO1G4bOOQS1G4a1G4aOOQS,5<},5<}O#NjQ#xO1G4dOOQS-E:a-E:aOOQVAN?tAN?tOOQV1G2k1G2kO3aQ#xOAN?yO#NxQ#{OAN?yOOQVAN@QAN@QO3aQ#xOAN@QOOQV<<JZ<<JZO3aQ#xOAN?zO3aQ#xO7+(XOOQV7+(X7+(XO0XQ#xO7+(XOOQVAN?zAN?zOOQS7+(Y7+(YO$$WQ#xO<<MmOOQS1G4i1G4iO/rQ#xO1G4iOOQS,5=T,5=TO$$eQ#xO1G4hOOQS-E:g-E:gOOQU'#Gk'#GkO$$vQ#zO7+'WO$%RQ#xO'#FgO$%yQ#xO7+'rO$&ZQ#xO7+'rOOQS7+'r7+'rO$&fQ#xO<<MTO$&vQ#xO<<MTO$&vQ#xO<<MTO$'OQ#xO'#HpOOQS<<Lz<<LzO$'YQ#xO<<LzOOQS7+'p7+'pOOQS'#EO'#EOOOOO1G0T1G0TO$'sQ#xO1G0TO$'{Q#xO1G0TO0XQ#xO1G2gP0XQ#xO'#GaO$(WQ#xO7+)|O$(iQ#xO7+)|P!<OQ#xO'#GcOOQVG25eG25eO3aQ#xOG25eOOQVG25lG25lOOQVG25fG25fOOQV<<Ks<<KsO3aQ#xO<<KsOOQS7+*T7+*TP$(zQ#xO'#GiOOQU-E:i-E:iOOQV<<Jr<<JrO$)nQ&nO'#FiOOQS'#Fk'#FkO$*OQ#xO'#FjO$*pQ#xO'#FjOOQS'#Fj'#FjO$*uQ#xO'#IeO$%RQ#xO'#FqO$%RQ#xO'#FqO$+^Q#xO'#FrO$%RQ#xO'#FsO$+eQ#xO'#IfOOQS'#If'#IfO$,SQ#xO,5<ROOQS<<K^<<K^O$,[Q#xO<<K^O$,lQ#xOANBoO$,|Q#xOANBoO$-UQ#xO'#HqOOQS'#Hq'#HqO0sQ#xO'#DeO$-oQ#xO,5>[OOQSANBfANBfOOOO7+%o7+%oO$.WQ#xO7+%oOOQS7+(R7+(RO$.`Q#xO<<MhOOQVLD+PLD+POOQVANA_ANA_O4jQMlO'#GmO$.qQ&nO,5<[O$%RQ#xO'#FuOOQS,5<`,5<`OOQS'#Fl'#FlO$/cQ#xO,5<UO$/hQ#xO,5<UOOQS'#Fo'#FoO$%RQ#xO'#GlO$0YQ#xO,5<YO$0tQ#xO,5?PO$1UQ#xO,5?PO0XQ#xO,5<XO$1gQ#xO,5<]O$1lQ#xO,5<]O$%RQ#xO'#IgO$1qQ#xO'#IgO$1vQ#xO,5<^OOQS,5<_,5<_O'ZQ#xO'#FxOOQU1G1m1G1mO3aQ#xO1G1mOOQSAN@xAN@xO$1{Q#xOG28ZO$2]Q#xO,5:POOQS1G3v1G3vOOOO<<IZ<<IZOOQS,5=X,5=XOOQS-E:k-E:kO$2bQ&nO'#FiO$2iQ#xO'#IhO$2wQ#xO'#IhO$3PQ#xO,5<aOOQS1G1p1G1pO$3UQ#xO1G1pO$3ZQ#xO,5=WOOQS-E:j-E:jO$3uQ#xO,5=[O$4^Q#xO1G4kOOQS-E:n-E:nOOQS1G1s1G1sOOQS1G1w1G1wO$4nQ#xO,5?RO$%RQ#xO,5?ROOQS1G1x1G1xO$4|Q&nO,5<dOOQU7+'X7+'XO$'OQ#xO1G/kO$%RQ#xO,5<bO$5TQ#xO,5?SO$5[Q#xO,5?SOOQS1G1{1G1{OOQS7+'[7+'[P$%RQ#xO'#GpO$5dQ#xO1G4mO$5nQ#xO1G4mO$5vQ#xO1G4mOOQS7+%V7+%VO$6UQ#xO1G1|O$6dQ&nO'#FiO$6kQ#xO,5=ZOOQS,5=Z,5=ZO$6yQ#xO1G4nOOQS-E:m-E:mO$%RQ#xO,5=YO$7QQ#xO,5=YO$7VQ#xO7+*XOOQS-E:l-E:lO$7aQ#xO7+*XO$%RQ#xO,5<cP$%RQ#xO'#GoO$7iQ#xO1G2tO$%RQ#xO1G2tP$7wQ#xO'#GnO$8OQ#xO<<MsO$8YQ#xO1G1}O$8hQ#xO7+(`O7kQ#xO'#DPO7kQ#xO,59dO7kQ#xO,59dO7kQ#xO,59dO$8vQ&nO,5=rO7kQ#xO1G/OO/rQ#xO1G/ZO/rQ#xO7+$rP$9ZQ#xO'#G[O'ZQ#xO'#HWO$9hQ#xO,59dO$9mQ#xO,59dO$9tQ#xO,59oO$9yQ#xO1G/WO0sQ#xO'#DTO7kQ#xO,59l",
  stateData: "$:[~O%uOS%jOSUOS%iPQ~OPiOXfOhtOjYOquOu!UOxvO!RwO!S!QO!V!XO!W!WO!ZZO!_[O!jeO!zeO!{eO!|eO#TyO#VzO#X{O#Z|O#]}O#a!OO#c!PO#f!RO#g!RO#i!SO#k!TO#t!VO#w!YO#{!ZO#}![O$S!]O$VmO$X!^O&RRO&SRO&WSO&XWO&m]O&n^O&q_O&t`O&xaO&ybO&zcO~O%i!_O~OX!fOa!fOc!gOj!nO!Z!pO!h!rO%|!aO%}!bO&O!cO&P!dO&Q!dO&R!eO&S!eO&T!fO&U!fO&V!fO~Om&[Xn&[Xo&[Xp&[Xq&[Xr&[Xu&[X|&[X}&[X#Q&[X#o&[X%h&[X%k&[X&^&[Xi&[X!V&[X!W&[X&_&[X!Y&[X!^&[X!S&[X#d&[Xv&[X!o&[X~P$gOhtOjYO!ZZO!_[O!jeO!zeO!{eO!|eO&RRO&SRO&WSO&XWO&m]O&n^O&q_O&t`O&xaO&ybO&zcO~O|&ZX}&ZX#o&ZX%h&ZX%k&ZX&^&ZX~Om!uOn!vOo!tOp!tOq!wOr!xOu!yO#Q&ZX~P(hOX#POi#ROq1`Ox1nO!RwO~P'ZOX#TOq1`Ox1nO!Y#UO~P'ZOX#XOc#YOq1`Ox1nO!^#ZO~P'ZO&o#^O&p#`O~O&r#aO&s#`O~OQ#cO%l#dO%m#fO~OR#gO%n#hO%o#fO~OS#jO%p#kO%q#fO~OT#mO%r#nO%s#fO~OX%{Xa%{Xc%{Xj%{Xm%{Xn%{Xo%{Xp%{Xq%{Xr%{Xu%{X|%{X!Z%{X!h%{X%|%{X%}%{X&O%{X&P%{X&Q%{X&R%{X&S%{X&T%{X&U%{X&V%{Xi%{X!V%{X!W%{X~O&m]O&n^O&q_O&t`O&xaO&ybO&zcO}%{X#Q%{X#o%{X%h%{X%k%{X&^%{X&_%{X!Y%{X!^%{X!S%{X#d%{Xv%{X!o%{X~P,QO|#sO}%zX#Q%zX#o%zX%h%zX%k%zX&^%zX~Oq1`Ox1nO~P'ZO#o#vO%h#xO%k#xO~O&XWO~O!V#}O#}![O$S!]O$VmO~OquO~P'ZOX$SOc$TO&XWO}yP~OX$XOq1`Ox1nO!S$YO~P'ZO}$[O#Q$aO&^$]O#o#RX%h#RX%k#RX~OX$XOq1`Ox1nO#o#[X%h#[X%k#[X~P'ZOq1`Ox1nO#o#`X%h#`X%k#`X~P'ZO!h$gO!z$gO&XWO~OX$rO~P'ZO!W$tO#{$uO#}$vO~O}$wO~OX%OO~P'ZOU%QO%h%PO%u%RO~OX%[Oc%[Oi%^Oq1`Ox1nO~P'ZOq1`Ox1nO}%aO~P'ZO&l%cO~Oc!gOj!nO!Z!pO!h!rOXdaadamdandaodapdaqdardauda|da}da#Qda#oda%hda%kda%|da%}da&Oda&Pda&Qda&Rda&Sda&Tda&Uda&Vda&^daida!Vda!Wda&_da!Yda!^da!Sda#ddavda!oda~Op%hO~Oq%hO~P'ZOq1`O~P'ZOm1bOn1cOo1aOp1aOq1jOr1kOu1oOi&ZX!V&ZX!W&ZX&_&ZX!Y&ZX!^&ZX!S&ZX#d&ZX!o&ZX~P(hO&_%jOi&YX|&YX!V&YX!W&YX!Y&YX}&YX~Oi%lO|%mO!V%qO!W%pO~Oi%lO~O|%tO!V%qO!W%pO!Y&fX~O!Y%xO~O|%yO}%{O!V%qO!W%pO!^&aX~O!^&PO~O!^&QO~O&o#^O&p&SO~O&r#aO&s&SO~OX&VOq1`Ox1nO!RwO~P'ZOQ#cO%l#dO%m&YO~OR#gO%n#hO%o&YO~OS#jO%p#kO%q&YO~OT#mO%r#nO%s&YO~OX!yaa!yac!yaj!yam!yan!yao!yap!yaq!yar!yau!ya|!ya}!ya!Z!ya!h!ya#Q!ya#o!ya%h!ya%k!ya%|!ya%}!ya&O!ya&P!ya&Q!ya&R!ya&S!ya&T!ya&U!ya&V!ya&^!yai!ya!V!ya!W!ya&_!ya!Y!ya!^!ya!S!ya#d!yav!ya!o!ya~P#yO|&bO}%za#Q%za#o%za%h%za%k%za&^%za~P$gOX&dOquOxvO}%za#Q%za#o%za%h%za%k%za&^%za~P'ZO|&bO}%za#Q%za#o%za%h%za%k%za&^%za~OPiOXfOquOxvO!RwO!S!QO#TyO#VzO#X{O#Z|O#]}O#a!OO#c!PO#f!RO#g!RO#i!SO#k!TO#o%WX%h%WX%k%WX~P'ZO#o#vO%h&iO%k&iO~O!h&jOj&|X%h&|X#d&|X#o&|X%k&|X#c&|X~Oj!nO%h&lO~Omgangaogapgaqgargauga|ga}ga#Qga#oga%hga%kga&^gaiga!Vga!Wga&_ga!Yga!^ga!Sga#dgavga!oga~P$gOusa|sa}sa#osa%hsa%ksa&^sa~Om!uOn!vOo!tOp!tOq!wOr!xO#Qsa~PDuO&^&nO|&]X}&]X~O&XWO|&]X}&]X~O|&qO}yX~O}&sO~O|%yO#o&aX%h&aX%k&aXi&aX}&aX!^&aX!o&aX&^&aX~OX1iOq1`Ox1nO!RwO~P'ZO&^$]O#oWa%hWa%kWa~O|&|O#o&cX%h&cX%k&cXp&cX~P$gO|'PO!S'OO#o#`a%h#`a%k#`a~O#d'QO#o#ba%h#ba%k#ba~O!h$gO!z$gO#c'SO&XWO~O#c'SO~O|'UO#o'PX%h'PX%k'PX~O|'WO#o&{X%h&{X%k&{X}&{X~O!Z'YO&^'ZO~O|'_Op'SX~P$gOp'bO~OPiOXfOquOxvO!RwO!S!QO#TyO#VzO#X{O#Z|O#]}O#a!OO#c!PO#f!RO#g!RO#i!SO#k!TO%h'gO~P'ZOv'kO#x'iO#y'jOP#vaX#vah#vaj#vaq#vau#vax#va!R#va!S#va!V#va!W#va!Z#va!_#va!j#va!z#va!{#va!|#va#T#va#V#va#X#va#Z#va#]#va#a#va#c#va#f#va#g#va#i#va#k#va#t#va#w#va#{#va#}#va$S#va$V#va$X#va%e#va&R#va&S#va&W#va&X#va&m#va&n#va&q#va&t#va&x#va&y#va&z#va%g#va%k#va~O|'lO#d'nO}'TX~Oj'pO!Z'YO~Oj!nO}$wO!Z'YO~O}'vO~P$gO%h'yO~OU'zO%h'yO~OX!fOa!fOc!gOj!nO!Z!pO!h!rO&O!cO&P!dO&Q!dO&R!eO&S!eO&T!fO&U!fO&V!fOmYinYioYipYiqYirYiuYi|Yi}Yi#QYi#oYi%hYi%kYi%|Yi&^YiiYi!VYi!WYi&_Yi!YYi!^Yi!SYi#dYivYi!oYi~O%}!bO~P!!`O%}Yi~P!!`OX!fOa!fOc!gOj!nO!Z!pO!h!rO&R!eO&S!eO&T!fO&U!fO&V!fOmYinYioYipYiqYirYiuYi|Yi}Yi#QYi#oYi%hYi%kYi%|Yi%}Yi&OYi&^YiiYi!VYi!WYi&_Yi!YYi!^Yi!SYi#dYivYi!oYi~O&P!dO&Q!dO~P!%ZO&PYi&QYi~P!%ZOc!gOj!nO!Z!pO!h!rOmYinYioYipYiqYirYiuYi|Yi}Yi#QYi#oYi%hYi%kYi%|Yi%}Yi&OYi&PYi&QYi&RYi&SYi&^YiiYi!VYi!WYi&_Yi!YYi!^Yi!SYi#dYivYi!oYi~OX!fOa!fO&T!fO&U!fO&V!fO~P!(XOXYiaYi&TYi&UYi&VYi~P!(XO!V%qO!W%pOi&iX|&iX~O&^'|O&_'|O~P,QO|(OOi&hX~Oi(QO~O|(RO}(TO!Y&kX~Oq1`Ox1nO|(RO}(UO!Y&kX~P'ZO!Y(WO~Oo!tOp!tOq!wOr!xOmliuli|li}li#Qli#oli%hli%kli&^li~On!vO~P!,zOnli~P!,zOm1bOn1cOo1aOp1aOq1jOr1kO~Ov(YO~P!.TOX(_Oi(`Oq1`Ox1nO~P'ZOi(`O|(aO~Oi(cO~O!W(eO~Oi(fO|(aO!V%qO!W%pO~P$gOm1bOn1cOo1aOp1aOq1jOr1kOisa!Vsa!Wsa&_sa!Ysa!^sa!Ssa#dsavsa!osa~PDuOX(_Oq1`Ox1nO!Y&fa~P'ZO|(iO!Y&fa~O!Y(jO~O|(iO!V%qO!W%pO!Y&fa~P$gOX(nOq1`Ox1nO!^&aa#o&aa%h&aa%k&aai&aa}&aa!o&aa&^&aa~P'ZO|(oO!^&aa#o&aa%h&aa%k&aai&aa}&aa!o&aa&^&aa~O!^(rO~O|(oO!V%qO!W%pO!^&aa~P$gO|(uO!V%qO!W%pO!^&ga~P$gO|(xO}&uX!^&uX!o&uX&^&uX~O}(|O!^)OO!o)PO&^({O~O}(|O!^)SO!o)TO&^)RO~O}(|O!^)WO!o)XO&^)VO~O}(|O!^)[O!o)]O&^)ZO~OX&dOquOxvO}%zi#Q%zi#o%zi%h%zi%k%zi&^%zi~P'ZO|)_O}%zi#Q%zi#o%zi%h%zi%k%zi&^%zi~O!h&jOj&|a%h&|a#d&|a#o&|a%k&|a#c&|a~O%h)dO~OX$SOc$TO&XWO~O|&qO}ya~OquOxvO~P'ZO|(oO#o&aa%h&aa%k&aai&aa}&aa!^&aa!o&aa&^&aa~P$gO|)iO#o%zX%h%zX%k%zX&^%zX~O&^$]O#oWi%hWi%kWi~O#o&ca%h&ca%k&cap&ca~P'ZO|)lO#o&ca%h&ca%k&cap&ca~OX)pOj)rO&XWO~O#c)sO~O&XWO#o'Pa%h'Pa%k'Pa~O|)uO#o'Pa%h'Pa%k'Pa~Oq1`Ox1nO#o&{a%h&{a%k&{a}&{a~P'ZO|)xO#o&{a%h&{a%k&{a}&{a~OX)zOc)zO&XWO~O&^*PO~Ov*SO#r*ROP#piX#pih#pij#piq#piu#pix#pi!R#pi!S#pi!V#pi!W#pi!Z#pi!_#pi!j#pi!z#pi!{#pi!|#pi#T#pi#V#pi#X#pi#Z#pi#]#pi#a#pi#c#pi#f#pi#g#pi#i#pi#k#pi#t#pi#w#pi#{#pi#}#pi$S#pi$V#pi$X#pi%e#pi&R#pi&S#pi&W#pi&X#pi&m#pi&n#pi&q#pi&t#pi&x#pi&y#pi&z#pi%g#pi%k#pi~Ov*TOP#siX#sih#sij#siq#siu#six#si!R#si!S#si!V#si!W#si!Z#si!_#si!j#si!z#si!{#si!|#si#T#si#V#si#X#si#Z#si#]#si#a#si#c#si#f#si#g#si#i#si#k#si#t#si#w#si#{#si#}#si$S#si$V#si$X#si%e#si&R#si&S#si&W#si&X#si&m#si&n#si&q#si&t#si&x#si&y#si&z#si%g#si%k#si~OX*VOp'Sa~P'ZO|*WOp'Sa~O|*WOp'Sa~P$gOp*[O~O%f*`O~Ov*cO#x'iO#y*bOP#viX#vih#vij#viq#viu#vix#vi!R#vi!S#vi!V#vi!W#vi!Z#vi!_#vi!j#vi!z#vi!{#vi!|#vi#T#vi#V#vi#X#vi#Z#vi#]#vi#a#vi#c#vi#f#vi#g#vi#i#vi#k#vi#t#vi#w#vi#{#vi#}#vi$S#vi$V#vi$X#vi%e#vi&R#vi&S#vi&W#vi&X#vi&m#vi&n#vi&q#vi&t#vi&x#vi&y#vi&z#vi%g#vi%k#vi~OX*fOq1`Ox1nO}$wO~P'ZOq1`Ox1nO}'Ta~P'ZO|*jO}'Ta~OX*nOc*oOi*rO&T*pO&XWO~O}$wO'W*tO~Oj'pO~Oj!nO}$wO~O%h*yO~O%h*{O~OX%[Oc%[Oq1`Ox1nOi&ha~P'ZO|+OOi&ha~Oq1`Ox1nO}+RO!Y&ka~P'ZO|+SO!Y&ka~Oq1`Ox1nO|+SO}+VO!Y&ka~P'ZOq1`Ox1nO|+SO!Y&ka~P'ZO|+SO}+VO!Y&ka~Oo1aOp1aOq1jOr1kOilimliuli|li!Vli!Wli&_li!Yli}li!^li#oli%hli%kli!Sli#dlivli!oli&^li~On1cO~P!KZOnli~P!KZOX(_Oi+[Oq1`Ox1nO~P'ZOp+^O~Oi+[O|+`O~Oi+aO~OX(_Oq1`Ox1nO!Y&fi~P'ZO|+bO!Y&fi~O!Y+cO~OX(nOq1`Ox1nO!^&ai#o&ai%h&ai%k&aii&ai}&ai!o&ai&^&ai~P'ZO|+fO!V%qO!W%pO!^&gi~O|+iO!^&ai#o&ai%h&ai%k&aii&ai}&ai!o&ai&^&ai~O!^+jO~Oc+lOq1`Ox1nO!^&gi~P'ZO|+fO!^&gi~O!^+nO~OX+pOq1`Ox1nO}&ua!^&ua!o&ua&^&ua~P'ZO|+qO}&ua!^&ua!o&ua&^&ua~O!_+tO&w+uO!^!pX~O!^+wO~O}(|O!^+xO~O}(|O!^+xO!o+yO~O}(|O!^+zO~O}(|O!^+zO!o+{O~O}(|O!^+|O~O}(|O!^+|O!o+}O~O}(|O!^,OO~O}(|O!^,OO!o,PO~OX&dOquOxvO}%zq#Q%zq#o%zq%h%zq%k%zq&^%zq~P'ZO|%Oi}%Oi#Q%Oi#o%Oi%h%Oi%k%Oi&^%Oi~P$gOX&dOquOxvO~P'ZOX&dOq1`Ox1nO#o%za%h%za%k%za&^%za~P'ZO|,QO#o%za%h%za%k%za&^%za~O|$qa#o$qa%h$qa%k$qap$qa~P$gO#o&ci%h&ci%k&cip&ci~P'ZO|,TO#o#`q%h#`q%k#`q~O|,UO#d,WO#o'OX%h'OX%k'OXi'OX~OX,YOj)rO&XWO~O&XWO#o'Pi%h'Pi%k'Pi~Oq1`Ox1nO#o&{i%h&{i%k&{i}&{i~P'ZO}$[O|#mX!Y#mX~O|,^O!Y'QX~O!Y,`O~Ov,cO#r*ROP#pqX#pqh#pqj#pqq#pqu#pqx#pq!R#pq!S#pq!V#pq!W#pq!Z#pq!_#pq!j#pq!z#pq!{#pq!|#pq#T#pq#V#pq#X#pq#Z#pq#]#pq#a#pq#c#pq#f#pq#g#pq#i#pq#k#pq#t#pq#w#pq#{#pq#}#pq$S#pq$V#pq$X#pq%e#pq&R#pq&S#pq&W#pq&X#pq&m#pq&n#pq&q#pq&t#pq&x#pq&y#pq&z#pq%g#pq%k#pq~Op%Ya|%Ya~P$gOX*VOp'Si~P'ZO|,jOp'Si~O|,tO}$wO#d,tO~O#y,vOP#vqX#vqh#vqj#vqq#vqu#vqx#vq!R#vq!S#vq!V#vq!W#vq!Z#vq!_#vq!j#vq!z#vq!{#vq!|#vq#T#vq#V#vq#X#vq#Z#vq#]#vq#a#vq#c#vq#f#vq#g#vq#i#vq#k#vq#t#vq#w#vq#{#vq#}#vq$S#vq$V#vq$X#vq%e#vq&R#vq&S#vq&W#vq&X#vq&m#vq&n#vq&q#vq&t#vq&x#vq&y#vq&z#vq%g#vq%k#vq~O#d,wO|%[a}%[a~Oq1`Ox1nO}'Ti~P'ZO|,yO}'Ti~O}$[O&^,{Oi'VX|'VX~O&XWOi'VX|'VX~O|-POi'UX~Oi-RO~O%f-UO~O!V%qO!W%pOi&ii|&ii~OX%[Oc%[Oq1`Ox1nOi&hi~P'ZO}-XO|$ta!Y$ta~Oq1`Ox1nO}-YO|$ta!Y$ta~P'ZOq1`Ox1nO}+RO!Y&ki~P'ZO|-]O!Y&ki~Oq1`Ox1nO|-]O!Y&ki~P'ZO|-]O}-`O!Y&ki~Oi$pi|$pi!Y$pi~P$gOX(_Oq1`Ox1nO~P'ZOp-bO~OX(_Oi-cOq1`Ox1nO~P'ZOX(_Oq1`Ox1nO!Y&fq~P'ZO|$oi!^$oi#o$oi%h$oi%k$oii$oi}$oi!o$oi&^$oi~P$gOX(nOq1`Ox1nO~P'ZOc+lOq1`Ox1nO!^&gq~P'ZO|-dO!^&gq~O!^-eO~OX(nOq1`Ox1nO!^&aq#o&aq%h&aq%k&aqi&aq}&aq!o&aq&^&aq~P'ZO}-fO~OX+pOq1`Ox1nO}&ui!^&ui!o&ui&^&ui~P'ZO|-kO}&ui!^&ui!o&ui&^&ui~O!_+tO&w+uO!^!pa~O}(|O!^-nO~O}(|O!^-oO~O}(|O!^-pO~O}(|O!^-qO~OX&dOq1`Ox1nO#o%zi%h%zi%k%zi&^%zi~P'ZO|-rO#o%zi%h%zi%k%zi&^%zi~O&XWO#o'Oa%h'Oa%k'Oai'Oa~O|-uO#o'Oa%h'Oa%k'Oai'Oa~Oi-xO~OX)zOc)zO&XWO!Y'Qa~O|-zO!Y'Qa~Op%Yi|%Yi~P$gOX*VO~P'ZOX*VOp'Sq~P'ZOv.OOP#uyX#uyh#uyj#uyq#uyu#uyx#uy!R#uy!S#uy!V#uy!W#uy!Z#uy!_#uy!j#uy!z#uy!{#uy!|#uy#T#uy#V#uy#X#uy#Z#uy#]#uy#a#uy#c#uy#f#uy#g#uy#i#uy#k#uy#t#uy#w#uy#{#uy#}#uy$S#uy$V#uy$X#uy%e#uy&R#uy&S#uy&W#uy&X#uy&m#uy&n#uy&q#uy&t#uy&x#uy&y#uy&z#uy%g#uy%k#uy~O%g.SO%k.SO~P`O#y.TOP#vyX#vyh#vyj#vyq#vyu#vyx#vy!R#vy!S#vy!V#vy!W#vy!Z#vy!_#vy!j#vy!z#vy!{#vy!|#vy#T#vy#V#vy#X#vy#Z#vy#]#vy#a#vy#c#vy#f#vy#g#vy#i#vy#k#vy#t#vy#w#vy#{#vy#}#vy$S#vy$V#vy$X#vy%e#vy&R#vy&S#vy&W#vy&X#vy&m#vy&n#vy&q#vy&t#vy&x#vy&y#vy&z#vy%g#vy%k#vy~O|.WO}$wO#d.WO~Oq1`Ox1nO}'Tq~P'ZO|.ZO}'Tq~O&^,{Oi'Va|'Va~OX*nOc*oO&T*pO&XWOi'Ua~O|._Oi'Ua~O$[.cO~OX%[Oc%[Oq1`Ox1nO~P'ZOq1`Ox1nO}.dO|$ti!Y$ti~P'ZOq1`Ox1nO|$ti!Y$ti~P'ZO}.dO|$ti!Y$ti~Oq1`Ox1nO}+RO~P'ZOq1`Ox1nO}+RO!Y&kq~P'ZO|.gO!Y&kq~Oq1`Ox1nO|.gO!Y&kq~P'ZOu.jO!V%qO!W%pOi&bq!Y&bq!^&bq|&bq~P!.TOc+lOq1`Ox1nO!^&gy~P'ZO|$ri!^$ri~P$gOc+lOq1`Ox1nO~P'ZOX+pOq1`Ox1nO~P'ZOX+pOq1`Ox1nO}&uq!^&uq!o&uq&^&uq~P'ZO}(|O!^.oO!o.pO&^.nO~OX&dOq1`Ox1nO#o%zq%h%zq%k%zq&^%zq~P'ZO#d.rO|%Ta#o%Ta%h%Ta%k%Tai%Ta~O&XWO#o'Oi%h'Oi%k'Oii'Oi~O|.tO#o'Oi%h'Oi%k'Oii'Oi~OX)zOc)zO&XWO!Y'Qi~Ov.xOP#u!RX#u!Rh#u!Rj#u!Rq#u!Ru#u!Rx#u!R!R#u!R!S#u!R!V#u!R!W#u!R!Z#u!R!_#u!R!j#u!R!z#u!R!{#u!R!|#u!R#T#u!R#V#u!R#X#u!R#Z#u!R#]#u!R#a#u!R#c#u!R#f#u!R#g#u!R#i#u!R#k#u!R#t#u!R#w#u!R#{#u!R#}#u!R$S#u!R$V#u!R$X#u!R%e#u!R&R#u!R&S#u!R&W#u!R&X#u!R&m#u!R&n#u!R&q#u!R&t#u!R&x#u!R&y#u!R&z#u!R%g#u!R%k#u!R~Oq1`Ox1nO}'Ty~P'ZOX*nOc*oO&T*pO&XWOi'Ui~O$[.cO%g/QO%k/QO~OX/[Oj/YO!Z/XO!_/ZO!j/TO!{/VO!|/VO&S/SO&XWO&m]O&n^O&q_O~Oq1`Ox1nO|$tq!Y$tq~P'ZO}/aO|$tq!Y$tq~Oq1`Ox1nO}+RO!Y&ky~P'ZO|/bO!Y&ky~Oq1`Ox/fO~P'ZOu.jO!V%qO!W%pOi&by!Y&by!^&by|&by~P!.TO}(|O!^/iO~O}(|O!^/iO!o/jO~O&XWO#o'Oq%h'Oq%k'Oqi'Oq~O|/lO#o'Oq%h'Oq%k'Oqi'Oq~OX*nOc*oO&T*pO&XWO~Oj/qO!h/oO|$]X#d$]X%|$]Xi$]X~Ou$]X}$]X!Y$]X!^$]X~P$)YO&R/sO&S/sOu$^X|$^X}$^X#d$^X%|$^X!Y$^Xi$^X!^$^X~O!j/uO~O|/yO#d/{O%|/vOu'XX}'XX!Y'XXi'XX~Oc0OO~P$%_Oj/qOu'YX|'YX}'YX#d'YX%|'YX!Y'YXi'YX!^'YX~Ou0SO}$wO~Oq1`Ox1nO|$ty!Y$ty~P'ZOq1`Ox1nO}+RO!Y&k!R~P'ZO|0WO!Y&k!R~Oi&eXu&eX!V&eX!W&eX!Y&eX!^&eX|&eX~P!.TOu.jO!V%qO!W%pOi&da!Y&da!^&da|&da~O}(|O!^0ZO~O&XWO#o'Oy%h'Oy%k'Oyi'Oy~O!h/oOj$dau$da|$da}$da#d$da%|$da!Y$dai$da!^$da~O!j0bO~O&R/sO&S/sOu$^a|$^a}$^a#d$^a%|$^a!Y$^ai$^a!^$^a~O%|/vOu$ba|$ba}$ba#d$ba!Y$bai$ba!^$ba~Ou'Xa}'Xa!Y'Xai'Xa~P$%RO|0gOu'Xa}'Xa!Y'Xai'Xa~O!Y0jO~Oi0jO~O}0lO~O!^0mO~Oq1`Ox1nO}+RO!Y&k!Z~P'ZO}0pO~O&^0qO~P$)YO|0rO#d/{O%|/vOi'[X~O|0rOi'[X~Oi0tO~O!j0uO~O#d/{Ou%`a|%`a}%`a%|%`a!Y%`ai%`a!^%`a~O#d/{O%|/vOu%da|%da}%da!Y%dai%da~Ou'Xi}'Xi!Y'Xii'Xi~P$%RO|0wO#d/{O%|/vO!^'Za~O}$la~P$gOi'[a~P$%RO|1POi'[a~Oc1RO!^'Zi~P$%_O|1TO!^'Zi~O|1TO#d/{O%|/vO!^'Zi~O#d/{O%|/vOi$ji|$ji~O&^1WO~P$)YO#d/{O%|/vOi%ca|%ca~Oi'[i~P$%RO}1ZO~Oc1RO!^'Zq~P$%_O|1]O!^'Zq~O#d/{O%|/vO|%bi!^%bi~Oc1RO~P$%_Oc1RO!^'Zy~P$%_O#d/{O%|/vOi$ki|$ki~O#d/{O%|/vO|%bq!^%bq~O|,QO#o%za%h%za%k%za&^%za~P$gOX&dOq1`Ox1nO~P'ZOp1eO~Oq1eO~P'ZO}1fO~Ov1gO~P!.TO&n&q&y&z&m&t&x&X&m~",
  goto: "!@f']PPPPPPPP'^P'f+R+k,U,p-]-yP.hP'f/X/X'fPPP'f2tPPPPPP2t5kPP5kP8O8X>kPP>n?`?cPP'f'fPP?{PP'f'fPP'f'f'f'f'f@P@y'fP@|PASE^H}IRPIUIlIpIsIwIzJOJRJV'fPPPJYJc'^P'^'^P'^P'^P'^P'^P'^'^'^P'^PP'^PP'^P'^PJiJuJ}PKUK[PKUPKUKUPPPKUPMjPMsM}NTMjPKUN^PKUPNeNkPNo! T! r!!]NoNo!!c!!pNoNoNoNo!#U!#[!#_!#d!#g!#q!#w!$T!$g!$m!$w!$}!%k!%q!%w!%}!&X!&_!&e!&k!&q!&w!'Z!'e!'k!'q!'w!(R!(X!(_!(e!(k!(u!({!)V!)]!)f!)l!){!*T!*_!*fPPPPPPPPPPPPPPPPP!*l!*o!*u!+O!+Y!+ePPPPPPPPPPPP!0[!1p!5s!9WPP!9`!9r!9{!:t!:k!:}!;T!;W!;Z!;^!;f!<VPPPPPPPPP!<Y!<iPPPP!=m!=y!>V!>]!>f!>i!>l!>r!>x!?O!?RP!?Z!?d!@`!@c]jOs#v$w*`,p(TeOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1o}!hQ#r$P$b$q$}%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!P!iQ#r$P$b$q$}%S%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!R!jQ#r$P$b$q$}%S%T%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!T!kQ#r$P$b$q$}%S%T%U%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!V!lQ#r$P$b$q$}%S%T%U%V%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!X!mQ#r$P$b$q$}%S%T%U%V%W%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!]!mQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d(TTOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1o&iVOYZ[isuw}!O!S!U!V!Z!n!p!t!u!v!x!y#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%h%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)_)a)i)x*P*R*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+p+q+t,Q,T,[,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0W0p1`1a1b1c1e1f1g1h1k1o%sXOYZ[isw}!O!S!U!V!Z!n!p#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)_)a)i)x*P*R*[*`*f*j*t+O+R+S+V+]+`+b+e+f+i+p+q+t,Q,T,[,p,x,y,|-W-X-Y-[-]-`-d-f-h-j-k-r.Z.].d.g/a/b0W1f1g1hQ$VvQ0X/fR1l1n'zeOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1oW#ym!P!Q$hW$Rv&q/f1nQ$j!RQ$n!TQ${![Q$|!]W%Z!n(O+O-WS&p$S$TQ'e$vQ)b&jQ)p'QU)q'S)r)sU)t'U)u,ZW){'Y,^-z.vQ*l'nW*m'p-P._/OQ,])zS-O*n*oY-t,U-u.s.t/lQ-w,WQ.U,tQ.Y,wQ.|.Wl/R.c/X/Y/[/w/y0O0g0l0q0v1R1W1ZQ/k.rQ0P/ZQ0^/qQ0i/{U0|0r1P1XX1S0w1T1[1]R&o$R!_!|YZ!U!V!p%a%m%t(R(T(U(a(i*R+R+S+V+]+`+b-X-Y-[-]-`.d.g/a/b0WR%k!{Q#QYQ&W#cQ&Z#gQ&]#jQ&_#mQ&x$^Q&{$aR-l+tT/e.j0p![!oQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1dQ&m#zQ't$|R*x'uR'}%ZQ%d!rR0[/o(SdOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1oS#pd#q!P/V.c/X/Y/Z/[/q/w/y0O0g0l0q0r0v0w1P1R1T1W1X1Z1[1](SdOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1oT#pd#qT#d`#eR)Q&Wy(}&W&Z&]&_)P)Q)T)U)X)Y)])^+y+{+},P-l.p.q/jT+u(|+vR.q-lT#ha#iR)U&ZT#kb#lR)Y&]T#nc#oR)^&_Q$`xQ,]){R,}*mX$^x$_$`&zQ'[$nQ'r${Q'u$|R*_'eQ)|'YV-y,^-z.vZlOs$w*`,pXpOs*`,pQ$x!YQ']$oQ'^$pQ'o$zQ's$|Q*]'dQ*d'iQ*g'jQ*h'kQ*u'qS*w't'uQ,d*RQ,f*SQ,g*TQ,k*ZS,m*^*vQ,q*bQ,r*cS,s*e*fQ-T*xQ-|,cQ-},eQ.P,lS.Q,n,oQ.V,uQ.X,vQ.w.OQ.y.RQ.z.TQ.{.UQ/m.xQ/n.|Q0T/_R0o0UWpOs*`,pR#|oQ'q${S*^'e'rR,o*_Q,|*mR.],}Q*v'qQ,n*^R.R,oZnOos*`,pQ'w$}R*z'xT.a-U.bu/^.c/X/Y/[/q/w/y0O0g0l0q0r0v1P1R1W1X1Zt/^.c/X/Y/[/q/w/y0O0g0l0q0r0v1P1R1W1X1ZQ0P/ZX1S0w1T1[1]!P/U.c/X/Y/Z/[/q/w/y0O0g0l0q0r0v0w1P1R1T1W1X1Z1[1]Q/t/TR0c/ug/w/W/x0_0f0k0y0{0}1Y1^1_u/].c/X/Y/[/q/w/y0O0g0l0q0r0v1P1R1W1X1ZX/r/R/]0^0|R0`/qV1O0r1P1XR0U/_QsOS$Os,pR,p*`Q&r$UR)g&rS%z#W$WS(p%z(sT(s%}&tQ%n#OQ%u#SW(b%n%u(g(kQ(g%rR(k%wQ&}$bR)m&}Q(v&OQ+g(qT+m(v+gQ(P%]R+P(PS(S%`%aY+T(S+U-^.h/cU+U(T(U(VU-^+V+W+XS.h-_-`R/c.iQ#_^R&R#_Q#b_R&T#bQ#e`R&X#eQ(y&US+r(y+sR+s(zQ+v(|R-m+vQ#iaR&[#iQ#lbR&^#lQ#ocR&`#oQ#qdR&a#qQ#tgQ&c#rW&f#t&c)j,RQ)j&wR,R1dQ$_xS&y$_&zR&z$`Q'X$lR)y'XQ&k#yR)c&kQ$h!QR'R$hQ,V)qS-v,V.uR.u-wQ'V$jR)v'VQ,_)|R-{,_Q#wkR&h#wQ*Q']R,b*QQ'`$qS*X'`*YR*Y'aQ'h$xR*a'hQ'm$yS*k'm,zR,z*lQ-Q*qR.`-QWoOs*`,pR#{oQ.b-UR/P.bd/x/W0_0f0k0y0{0}1Y1^1_R0e/xU/p/R0^0|R0]/pQ0x0kS1U0x1VR1V0yS0s0_0`R1Q0sQ/z/WR0h/zR!`PXrOs*`,pWqOs*`,pR'f$wYkOs$w*`,pR&g#v[xOs#v$w*`,pR&x$^&hQOYZ[isuw}!O!S!U!V!Z!n!p!t!u!v!x!y#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%h%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)_)a)i)x*P*R*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+p+q+t,Q,T,[,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0W0p1`1a1b1c1e1f1g1h1k1oQ!sTQ#rfQ$PtU$by%p(eS$q!W$tQ$}!^Q%S!hQ%T!iQ%U!jQ%V!kQ%W!lQ%X!mQ%r#PQ%w#TQ%}#XQ&O#YQ&t$XQ'a$rQ'x%OQ)`&dU)k&|)l,SW*U'_*W,i,jQ+Z(_Q+d(nQ,h*VQ-g+lQ0n0SR1d1iQ#OYQ#SZQ$o!UQ$p!VQ%`!pQ(V%a^(^%m%t(a(i+]+`+b^+Q(R+S-[-].g/b0WQ+W(TQ+X(UQ,e*RQ-Z+RQ-_+VQ.e-XQ.f-YQ.i-`Q/`.dR0V/a[gOs#v$w*`,p!^!{YZ!U!V!p%a%m%t(R(T(U(a(i*R+R+S+V+]+`+b-X-Y-[-]-`.d.g/a/b0WQ#W[Q#uiS$Ww}Q$e!OW$l!S$a'b*[S$y!Z$uW%Y!n(O+O-WY&U#c#g#j#m+t`&e#s&b)_)a)i,Q-r1hQ&u$YQ&v$[Q&w$^Q'{%[Q(]%kW(m%y(o+e+iQ(q%{Q(z&VQ)e&oS)h&s1fQ)n'OQ)o'PU)w'W)x,[Q*O'ZQ*e'iY*i'l*j,x,y.ZQ*|'}S+Y(Y1gW+k(u+f-d-hW+o(x+q-j-kQ,a*PQ,u*fQ-S*tQ-i+pQ-s,TQ.[,|Q.m-fR.}.]hUOs#s#v$w&b&s(Y)_)a*`,p%Y!zYZ[iw}!O!S!U!V!Z!n!p#c#g#j#m$Y$[$^$a$u%[%a%k%m%t%y%{&V&o'O'P'W'Z'b'i'l'}(O(R(T(U(a(i(o(u(x)i)x*P*R*[*f*j*t+O+R+S+V+]+`+b+e+f+i+p+q+t,Q,T,[,x,y,|-W-X-Y-[-]-`-d-f-h-j-k-r.Z.].d.g/a/b0W1f1g1hQ$QuW%e!t!x1a1kQ%f!uQ%g!vQ%i!yQ%s1`S(X%h1eQ(Z1bQ([1cQ-a+^Q.l-bS/d.j0pR1m1oU$Uv/f1nR)f&q[hOs#v$w*`,pa!}Y#c#g#j#m$^$a+tQ#][Q$ZwR$d}Q%o#OQ%v#SQ%|#WQ'{%YQ(h%rQ(l%wQ(t%}Q(w&OQ+h(qQ-V*|Q.k-aQ/h.lR0Y/gQ$cyQ(d%pR+_(eQ/g.jR0z0pR#VZR#[[R%_!nQ%]!nV*}(O+O-W!]!qQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1dR%b!pQ&W#cQ&Z#gQ&]#jQ&_#mR-l+tQ)O&WQ)S&ZQ)W&]Q)[&_S+x)P)QS+z)T)US+|)X)YS,O)])^Q-n+yQ-o+{Q-p+}Q-q,PQ.o-lS/i.p.qR0Z/jQ$m!SQ&{$aQ*Z'bR,l*[Q#zmQ$f!PQ$i!QR'T$hQ)p'SR,Y)sQ)p'SQ,X)rR,Y)sR$k!RR)}'YXqOs*`,pQ$s!WR'c$tQ$z!ZR'd$uR*s'pQ*q'pV.^-P._/OQ/_.cQ/|/XR/}/YU/W.c/X/YQ0R/[Q0_/qQ0d/wU0f/y0g0vQ0k0OQ0y0lQ0{0qU0}0r1P1XQ1Y1RQ1^1WR1_1ZR0Q/ZR0a/q",
  nodeNames: "\u26A0 print { { { { Comment Script AssignStatement * BinaryExpression BitOp BitOp BitOp BitOp ArithOp ArithOp @ ArithOp ** UnaryExpression ArithOp BitOp AwaitExpression await ) ( ParenthesizedExpression BinaryExpression or and CompareOp in not is UnaryExpression ConditionalExpression if else LambdaExpression lambda ParamList VariableName AssignOp , : NamedExpression AssignOp YieldExpression yield from TupleExpression ComprehensionExpression async for LambdaExpression ] [ ArrayExpression ArrayComprehensionExpression } { DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression CallExpression ArgList AssignOp MemberExpression . PropertyName Number String FormatString FormatReplacement FormatSelfDoc FormatConversion FormatSpec FormatReplacement FormatSelfDoc FormatReplacement FormatSelfDoc FormatReplacement FormatSelfDoc FormatReplacement FormatSelfDoc ContinuedString Ellipsis None Boolean TypeDef AssignOp UpdateStatement UpdateOp ExpressionStatement DeleteStatement del PassStatement pass BreakStatement break ContinueStatement continue ReturnStatement return YieldStatement PrintStatement RaiseStatement raise ImportStatement import as ScopeStatement global nonlocal AssertStatement assert TypeDefinition type TypeParamList TypeParam StatementGroup ; IfStatement Body elif WhileStatement while ForStatement TryStatement try except finally WithStatement with FunctionDefinition def ParamList AssignOp TypeDef ClassDefinition class DecoratedStatement Decorator At MatchStatement match MatchBody MatchClause case CapturePattern LiteralPattern ArithOp ArithOp AsPattern OrPattern LogicOp AttributePattern SequencePattern MappingPattern StarPattern ClassPattern PatternArgList KeywordPattern KeywordPattern Guard",
  maxTerm: 288,
  context: trackIndent,
  nodeProps: [
    ["isolate", -8, 6, 73, 74, 75, 79, 81, 83, 85, ""],
    ["group", -15, 8, 93, 95, 96, 98, 100, 102, 104, 106, 107, 108, 110, 113, 116, 118, "Statement Statement", -22, 10, 20, 23, 27, 42, 51, 52, 58, 59, 62, 63, 64, 65, 66, 69, 72, 73, 74, 87, 88, 89, 90, "Expression", -10, 122, 124, 127, 129, 130, 134, 136, 141, 143, 146, "Statement", -9, 151, 152, 155, 156, 158, 159, 160, 161, 162, "Pattern"],
    ["openedBy", 25, "(", 56, "[", 60, "{"],
    ["closedBy", 26, ")", 57, "]", 61, "}"]
  ],
  propSources: [pythonHighlighting],
  skippedNodes: [0, 6],
  repeatNodeCount: 38,
  tokenData: "%-W#sR!`OX%TXY=|Y[%T[]=|]p%Tpq=|qr@_rsDOst!+|tu%Tuv!Nnvw#!|wx#$Wxy#:Uyz#;Yz{#<^{|#>x|}#@S}!O#AW!O!P#Ci!P!Q#N_!Q!R$!y!R![$&w![!]$1e!]!^$3s!^!_$4w!_!`$7c!`!a$8m!a!b%T!b!c$;U!c!d$<b!d!e$>W!e!h$<b!h!i$H[!i!t$<b!t!u%#r!u!w$<b!w!x$Fl!x!}$<b!}#O%%z#O#P?d#P#Q%'O#Q#R%(S#R#S$<b#S#T%T#T#U$<b#U#V$>W#V#Y$<b#Y#Z$H[#Z#f$<b#f#g%#r#g#i$<b#i#j$Fl#j#o$<b#o#p%)^#p#q%*S#q#r%+^#r#s%,S#s$g%T$g;'S$<b;'S;=`$>Q<%lO$<b!n%^]&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n&^]&w!b&oSOr%Trs'Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n'^]&w!b&oSOr%Trs(Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!f(^Z&w!b&oSOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!f)UZ&w!bOw(Vwx)wx#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!f)|Z&w!bOw(Vwx*ox#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!b*tT&w!bO#o*o#p#q*o#r;'S*o;'S;=`+T<%lO*o!b+WP;=`<%l*o!f+`W&w!bO#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`.d;=`<%l+x<%lO(VS+}V&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS,gVOw+xwx,|x#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS-PUOw+xx#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS-fRO;'S+x;'S;=`-o;=`O+xS-tW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l+x<%lO+xS.aP;=`<%l+x!f.iW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l(V<%lO+x!f/UP;=`<%l(V!n/`]&w!b&rWOr%Trs&Vsw%Twx0Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n0`]&w!b&rWOr%Trs&Vsw%Twx1Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!j1`Z&w!b&rWOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j2WZ&w!bOr1Xrs2ys#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j3OZ&w!bOr1Xrs*os#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j3vW&w!bO#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`6z;=`<%l4`<%lO1XW4eV&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W4}VOr4`rs5ds#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W5gUOr4`s#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W5|RO;'S4`;'S;=`6V;=`O4`W6[W&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l4`<%lO4`W6wP;=`<%l4`!j7PW&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l1X<%lO4`!j7lP;=`<%l1X!n7tW&w!bO#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=P;=`<%l8^<%lO%T[8eX&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[9VX&oSOr8^rs9rsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[9wX&oSOr8^rs+xsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[:iX&rWOr8^rs9Qsw8^wx;Ux#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[;ZX&rWOr8^rs9Qsw8^wx4`x#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[;yRO;'S8^;'S;=`<S;=`O8^[<ZY&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l8^<%lO8^[<|P;=`<%l8^!n=WY&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l%T<%lO8^!n=yP;=`<%l%T#s>Xc&w!b&oS&rW%u!TOX%TXY=|Y[%T[]=|]p%Tpq=|qr%Trs&Vsw%Twx/Xx#O%T#O#P?d#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s?i[&w!bOY%TYZ=|Z]%T]^=|^#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=P;=`<%l8^<%lO%T!q@hd&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`#O%T#O#P7o#P#T%T#T#UBz#U#f%T#f#gBz#g#hBz#h#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!qBR]oR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!qCV]!oR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#cDXa&w!b&oS&msOYE^YZ%TZ]E^]^%T^rE^rs!)|swE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cEia&w!b&oS&rW&msOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cFw]&w!b&oS&msOr%Trs'Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#cGya&w!b&rW&msOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxIOx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cIXa&w!b&rW&msOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxJ^x#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#_Jg_&w!b&rW&msOYJ^YZ1XZ]J^]^1X^rJ^rsKfs#OJ^#O#PL`#P#oJ^#o#pL}#p#qJ^#q#rL}#r;'SJ^;'S;=`!!o<%lOJ^#_KmZ&w!b&msOr1Xrs2ys#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#_LeW&w!bO#oJ^#o#pL}#p#qJ^#q#rL}#r;'SJ^;'S;=`! r;=`<%lL}<%lOJ^{MUZ&rW&msOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l<%lOL}{M|V&msOr4`rs5ds#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`{NfRO;'SL};'S;=`No;=`OL}{Nv[&rW&msOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l;=`<%lL}<%lOL}{! oP;=`<%lL}#_! y[&rW&msOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l;=`<%lJ^<%lOL}#_!!rP;=`<%lJ^#c!!zW&w!bO#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!(q;=`<%l!#d<%lOE^!P!#m]&oS&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!$mX&oS&msOr8^rs9rsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^!P!%a]&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!&Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!&a]&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwxL}x#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!']RO;'S!#d;'S;=`!'f;=`O!#d!P!'o^&oS&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k;=`<%l!#d<%lO!#d!P!(nP;=`<%l!#d#c!(z^&oS&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k;=`<%lE^<%lO!#d#c!)yP;=`<%lE^#c!*V]&w!b&oS&msOr%Trs!+Osw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c!+ZZ&sW&w!b&oS&qsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#s!,XaU!T&w!b&oS&rWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!-gaU!T&w!b&oSOY!+|YZ%TZ]!+|]^%T^r!+|rs!.lsw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!.uaU!T&w!b&oSOY!+|YZ%TZ]!+|]^%T^r!+|rs!/zsw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#k!0T_U!T&w!b&oSOY!/zYZ(VZ]!/z]^(V^w!/zwx!1Sx#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#k!1Z_U!T&w!bOY!/zYZ(VZ]!/z]^(V^w!/zwx!2Yx#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#k!2a_U!T&w!bOY!/zYZ(VZ]!/z]^(V^w!/zwx!3`x#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#g!3gZU!T&w!bOY!3`YZ*oZ]!3`]^*o^#o!3`#o#p!4Y#p#q!3`#q#r!4Y#r;'S!3`;'S;=`!4t<%lO!3`!T!4_TU!TOY!4YZ]!4Y^;'S!4Y;'S;=`!4n<%lO!4Y!T!4qP;=`<%l!4Y#g!4wP;=`<%l!3`#k!5R[U!T&w!bOY!/zYZ(VZ]!/z]^(V^#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!9s;=`<%l+x<%lO!/z!X!6OZU!T&oSOY!5wYZ+xZ]!5w]^+x^w!5wwx!6qx#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!6vZU!TOY!5wYZ+xZ]!5w]^+x^w!5wwx!7ix#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!7nZU!TOY!5wYZ+xZ]!5w]^+x^w!5wwx!4Yx#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!8fWU!TOY!5wYZ+xZ]!5w]^+x^;'S!5w;'S;=`!9O;=`<%l+x<%lO!5w!X!9TW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l!5w<%lO+x!X!9pP;=`<%l!5w#k!9xW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l!/z<%lO+x#k!:eP;=`<%l!/z#s!:qaU!T&w!b&rWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!;vx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!<PaU!T&w!b&rWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!=Ux#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#o!=__U!T&w!b&rWOY!=UYZ1XZ]!=U]^1X^r!=Urs!>^s#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!>e_U!T&w!bOY!=UYZ1XZ]!=U]^1X^r!=Urs!?ds#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!?k_U!T&w!bOY!=UYZ1XZ]!=U]^1X^r!=Urs!3`s#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!@q[U!T&w!bOY!=UYZ1XZ]!=U]^1X^#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!Ec;=`<%l4`<%lO!=U!]!AnZU!T&rWOY!AgYZ4`Z]!Ag]^4`^r!Agrs!Bas#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!BfZU!TOY!AgYZ4`Z]!Ag]^4`^r!Agrs!CXs#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!C^ZU!TOY!AgYZ4`Z]!Ag]^4`^r!Agrs!4Ys#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!DUWU!TOY!AgYZ4`Z]!Ag]^4`^;'S!Ag;'S;=`!Dn;=`<%l4`<%lO!Ag!]!DsW&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l!Ag<%lO4`!]!E`P;=`<%l!Ag#o!EhW&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l!=U<%lO4`#o!FTP;=`<%l!=U#s!F_[U!T&w!bOY!+|YZ%TZ]!+|]^%T^#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Mq;=`<%l8^<%lO!+|!a!G^]U!T&oS&rWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!H^]U!T&oSOY!GTYZ8^Z]!GT]^8^^r!GTrs!IVsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!I^]U!T&oSOY!GTYZ8^Z]!GT]^8^^r!GTrs!5wsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!J^]U!T&rWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!KVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!K^]U!T&rWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!Agx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!L[WU!TOY!GTYZ8^Z]!GT]^8^^;'S!GT;'S;=`!Lt;=`<%l8^<%lO!GT!a!L{Y&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l!GT<%lO8^!a!MnP;=`<%l!GT#s!MxY&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l!+|<%lO8^#s!NkP;=`<%l!+|#b!Ny_&UQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b#!T]#Qr&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b##X_&OQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#$aa&w!b&rW&msOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx#8Ux#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#%qa&w!b&oS&rW&msOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#'Pa&w!b&oS&msOY#%fYZ%TZ]#%f]^%T^r#%frs#(Usw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#(_a&w!b&oS&msOY#%fYZ%TZ]#%f]^%T^r#%frs#)dsw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#Z#)m_&w!b&oS&msOY#)dYZ(VZ]#)d]^(V^w#)dwx#*lx#O#)d#O#P#+f#P#o#)d#o#p#,T#p#q#)d#q#r#,T#r;'S#)d;'S;=`#/u<%lO#)d#Z#*sZ&w!b&msOw(Vwx)wx#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#Z#+kW&w!bO#o#)d#o#p#,T#p#q#)d#q#r#,T#r;'S#)d;'S;=`#.x;=`<%l#,T<%lO#)dw#,[Z&oS&msOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r<%lO#,Tw#-SV&msOw+xwx,|x#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xw#-lRO;'S#,T;'S;=`#-u;=`O#,Tw#-|[&oS&msOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r;=`<%l#,T<%lO#,Tw#.uP;=`<%l#,T#Z#/P[&oS&msOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r;=`<%l#)d<%lO#,T#Z#/xP;=`<%l#)d#c#0U]&w!b&rW&msOr%Trs&Vsw%Twx0Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#1SW&w!bO#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#6y;=`<%l#1l<%lO#%f!P#1u]&oS&rW&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#2u]&oS&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#3nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#3u]&oS&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#,Tsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#4uX&rW&msOr8^rs9Qsw8^wx;Ux#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^!P#5eRO;'S#1l;'S;=`#5n;=`O#1l!P#5w^&oS&rW&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s;=`<%l#1l<%lO#1l!P#6vP;=`<%l#1l#c#7S^&oS&rW&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s;=`<%l#%f<%lO#1l#c#8RP;=`<%l#%f#c#8_]&w!b&rW&msOr%Trs&Vsw%Twx#9Wx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#9cZ&pS&w!b&rW&nsOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#c#:a]js&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q#;e]iR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#<iaXs&w!b&oS&rWOr%Trs&Vsw%Twx/Xxz%Tz{#=n{!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#=y_cR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#?T_&Rs&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q#@_]|R&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s#Ac`&Ss&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`!a#Be!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#O#Bp]'W`&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#Cta!hQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P#Dy!P!Q%T!Q![#GV![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#ES_&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P#FR!P#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#F^]!zs&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Gbi!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#GV![!g%T!g!h#IP!h!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S#GV#S#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#IYc&w!b&oS&rWOr%Trs&Vsw%Twx/Xx{%T{|#Je|}%T}!O#Je!O!Q%T!Q![#Km![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Jn_&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#Km![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Kxe!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#Km![!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S#Km#S#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Mf]!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#Nja&TR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!P%T!P!Q$ o!Q!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$ z_&VQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$#Uw!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P$%o!P!Q%T!Q![$&w![!d%T!d!e$(w!e!g%T!g!h#IP!h!l%T!l!m#MZ!m!q%T!q!r$+m!r!z%T!z!{$.]!{#O%T#O#P7o#P#R%T#R#S$&w#S#U%T#U#V$(w#V#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#c%T#c#d$+m#d#l%T#l#m$.]#m#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$%x_&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#GV![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$'Sk!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P$%o!P!Q%T!Q![$&w![!g%T!g!h#IP!h!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S$&w#S#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$)Qb&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!R$*Y!R!S$*Y!S#O%T#O#P7o#P#R%T#R#S$*Y#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$*eb!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!R$*Y!R!S$*Y!S#O%T#O#P7o#P#R%T#R#S$*Y#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$+va&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!Y$,{!Y#O%T#O#P7o#P#R%T#R#S$,{#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$-Wa!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!Y$,{!Y#O%T#O#P7o#P#R%T#R#S$,{#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$.fe&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![$/w![!c%T!c!i$/w!i#O%T#O#P7o#P#R%T#R#S$/w#S#T%T#T#Z$/w#Z#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$0Se!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![$/w![!c%T!c!i$/w!i#O%T#O#P7o#P#R%T#R#S$/w#S#T%T#T#Z$/w#Z#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s$1p_}!T&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`$2o!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q$2z]&_R&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$4O]#os&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$5SaoR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!^%T!^!_$6X!_!`Av!`!aAv!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$6d_&PQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$7n_&^s&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$8x`oR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`!a$9z!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$:V_&QQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$;c_aQ$VP&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s$<oe&w!b&oS&rW&l`&XsOr%Trs&Vsw%Twx/Xx!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s$>TP;=`<%l$<b#s$>ei&w!b&oS&rW&l`&XsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!t$<b!t!u$Fl!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#f$<b#f#g$Fl#g#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c$@]a&w!b&oS&msOYE^YZ%TZ]E^]^%T^rE^rs$AbswE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#c$Ak]&w!b&oS&msOr%Trs$Bdsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#Z$BmZ&w!b&oS&qsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#c$Cia&w!b&rW&msOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx$Dnx#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c$Dw]&w!b&rW&msOr%Trs&Vsw%Twx$Epx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#_$EyZ&w!b&rW&nsOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#s$Fye&w!b&oS&rW&l`&XsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s$Hii&w!b&oS&rW&l`&XsOr%Trs$JWsw%Twx$MUx!Q%T!Q![$<b![!c%T!c!t$<b!t!u%!S!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#f$<b#f#g%!S#g#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c$Ja]&w!b&oS&xsOr%Trs$KYsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$Ka]&w!b&oSOr%Trs$LYsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#Z$LcZ&w!b&oS&zsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#c$M_]&w!b&rW&tsOr%Trs&Vsw%Twx$NWx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$N_]&w!b&rWOr%Trs&Vsw%Twx% Wx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#_% aZ&w!b&rW&ysOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#s%!ae&w!b&oS&rW&l`&XsOr%Trs$JWsw%Twx$MUx!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s%$Pm&w!b&oS&rW&l`&XsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!h$<b!h!i%!S!i!t$<b!t!u$Fl!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#U$<b#U#V$Fl#V#Y$<b#Y#Z%!S#Z#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c%&V]!Zs&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q%'Z]!YR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b%(__%}Q&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a%)gX!_#T&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^#c%*__%|R&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q%+gX!^!e&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^#a%,_]&Wq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T",
  tokenizers: [legacyPrint, indentation, newlines, formatString1, formatString2, formatString1l, formatString2l, 0, 1, 2, 3, 4, 5, 6],
  topRules: { "Script": [0, 7] },
  specialized: [{ term: 239, get: (value) => spec_identifier3[value] || -1 }],
  tokenPrec: 7500
});

// ../../node_modules/.pnpm/@codemirror+lang-python@6.1.3_@codemirror+state@6.4.0_@codemirror+view@6.23.1_@lezer+common@1.2.1/node_modules/@codemirror/lang-python/dist/index.js
var cache2 = /* @__PURE__ */ new NodeWeakMap();
var ScopeNodes2 = /* @__PURE__ */ new Set([
  "Script",
  "Body",
  "FunctionDefinition",
  "ClassDefinition",
  "LambdaExpression",
  "ForStatement",
  "MatchClause"
]);
function defID2(type) {
  return (node, def, outer) => {
    if (outer)
      return false;
    let id2 = node.node.getChild("VariableName");
    if (id2)
      def(id2, type);
    return true;
  };
}
var gatherCompletions2 = {
  FunctionDefinition: /* @__PURE__ */ defID2("function"),
  ClassDefinition: /* @__PURE__ */ defID2("class"),
  ForStatement(node, def, outer) {
    if (outer)
      for (let child = node.node.firstChild; child; child = child.nextSibling) {
        if (child.name == "VariableName")
          def(child, "variable");
        else if (child.name == "in")
          break;
      }
  },
  ImportStatement(_node, def) {
    var _a, _b;
    let { node } = _node;
    let isFrom = ((_a = node.firstChild) === null || _a === void 0 ? void 0 : _a.name) == "from";
    for (let ch = node.getChild("import"); ch; ch = ch.nextSibling) {
      if (ch.name == "VariableName" && ((_b = ch.nextSibling) === null || _b === void 0 ? void 0 : _b.name) != "as")
        def(ch, isFrom ? "variable" : "namespace");
    }
  },
  AssignStatement(node, def) {
    for (let child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == "VariableName")
        def(child, "variable");
      else if (child.name == ":" || child.name == "AssignOp")
        break;
    }
  },
  ParamList(node, def) {
    for (let prev = null, child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == "VariableName" && (!prev || !/\*|AssignOp/.test(prev.name)))
        def(child, "variable");
      prev = child;
    }
  },
  CapturePattern: /* @__PURE__ */ defID2("variable"),
  AsPattern: /* @__PURE__ */ defID2("variable"),
  __proto__: null
};
function getScope2(doc, node) {
  let cached = cache2.get(node);
  if (cached)
    return cached;
  let completions = [], top = true;
  function def(node2, type) {
    let name = doc.sliceString(node2.from, node2.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
    if (node2.name) {
      let gather = gatherCompletions2[node2.name];
      if (gather && gather(node2, def, top) || !top && ScopeNodes2.has(node2.name))
        return false;
      top = false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope2(doc, node2.node))
        completions.push(c);
      return false;
    }
  });
  cache2.set(node, completions);
  return completions;
}
var Identifier2 = /^[\w\xa1-\uffff][\w\d\xa1-\uffff]*$/;
var dontComplete2 = ["String", "FormatString", "Comment", "PropertyName"];
function localCompletionSource2(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete2.indexOf(inner.name) > -1)
    return null;
  let isWord = inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier2.test(context.state.sliceDoc(inner.from, inner.to));
  if (!isWord && !context.explicit)
    return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes2.has(pos.name))
      options = options.concat(getScope2(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier2
  };
}
var globals = /* @__PURE__ */ [
  "__annotations__",
  "__builtins__",
  "__debug__",
  "__doc__",
  "__import__",
  "__name__",
  "__loader__",
  "__package__",
  "__spec__",
  "False",
  "None",
  "True"
].map((n) => ({ label: n, type: "constant" })).concat(/* @__PURE__ */ [
  "ArithmeticError",
  "AssertionError",
  "AttributeError",
  "BaseException",
  "BlockingIOError",
  "BrokenPipeError",
  "BufferError",
  "BytesWarning",
  "ChildProcessError",
  "ConnectionAbortedError",
  "ConnectionError",
  "ConnectionRefusedError",
  "ConnectionResetError",
  "DeprecationWarning",
  "EOFError",
  "Ellipsis",
  "EncodingWarning",
  "EnvironmentError",
  "Exception",
  "FileExistsError",
  "FileNotFoundError",
  "FloatingPointError",
  "FutureWarning",
  "GeneratorExit",
  "IOError",
  "ImportError",
  "ImportWarning",
  "IndentationError",
  "IndexError",
  "InterruptedError",
  "IsADirectoryError",
  "KeyError",
  "KeyboardInterrupt",
  "LookupError",
  "MemoryError",
  "ModuleNotFoundError",
  "NameError",
  "NotADirectoryError",
  "NotImplemented",
  "NotImplementedError",
  "OSError",
  "OverflowError",
  "PendingDeprecationWarning",
  "PermissionError",
  "ProcessLookupError",
  "RecursionError",
  "ReferenceError",
  "ResourceWarning",
  "RuntimeError",
  "RuntimeWarning",
  "StopAsyncIteration",
  "StopIteration",
  "SyntaxError",
  "SyntaxWarning",
  "SystemError",
  "SystemExit",
  "TabError",
  "TimeoutError",
  "TypeError",
  "UnboundLocalError",
  "UnicodeDecodeError",
  "UnicodeEncodeError",
  "UnicodeError",
  "UnicodeTranslateError",
  "UnicodeWarning",
  "UserWarning",
  "ValueError",
  "Warning",
  "ZeroDivisionError"
].map((n) => ({ label: n, type: "type" }))).concat(/* @__PURE__ */ [
  "bool",
  "bytearray",
  "bytes",
  "classmethod",
  "complex",
  "float",
  "frozenset",
  "int",
  "list",
  "map",
  "memoryview",
  "object",
  "range",
  "set",
  "staticmethod",
  "str",
  "super",
  "tuple",
  "type"
].map((n) => ({ label: n, type: "class" }))).concat(/* @__PURE__ */ [
  "abs",
  "aiter",
  "all",
  "anext",
  "any",
  "ascii",
  "bin",
  "breakpoint",
  "callable",
  "chr",
  "compile",
  "delattr",
  "dict",
  "dir",
  "divmod",
  "enumerate",
  "eval",
  "exec",
  "exit",
  "filter",
  "format",
  "getattr",
  "globals",
  "hasattr",
  "hash",
  "help",
  "hex",
  "id",
  "input",
  "isinstance",
  "issubclass",
  "iter",
  "len",
  "license",
  "locals",
  "max",
  "min",
  "next",
  "oct",
  "open",
  "ord",
  "pow",
  "print",
  "property",
  "quit",
  "repr",
  "reversed",
  "round",
  "setattr",
  "slice",
  "sorted",
  "sum",
  "vars",
  "zip"
].map((n) => ({ label: n, type: "function" })));
var snippets2 = [
  /* @__PURE__ */ snippetCompletion("def ${name}(${params}):\n	${}", {
    label: "def",
    detail: "function",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("for ${name} in ${collection}:\n	${}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("while ${}:\n	${}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("try:\n	${}\nexcept ${error}:\n	${}", {
    label: "try",
    detail: "/ except block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if ${}:\n	\n", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if ${}:\n	${}\nelse:\n	${}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("class ${name}:\n	def __init__(self, ${params}):\n			${}", {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("import ${module}", {
    label: "import",
    detail: "statement",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("from ${module} import ${names}", {
    label: "from",
    detail: "import",
    type: "keyword"
  })
];
var globalCompletion = /* @__PURE__ */ ifNotIn(dontComplete2, /* @__PURE__ */ completeFromList(/* @__PURE__ */ globals.concat(snippets2)));
function indentBody(context, node) {
  let base = context.baseIndentFor(node);
  let line = context.lineAt(context.pos, -1), to = line.from + line.text.length;
  if (/^\s*($|#)/.test(line.text) && context.node.to < to + 100 && !/\S/.test(context.state.sliceDoc(to, context.node.to)) && context.lineIndent(context.pos, -1) <= base)
    return null;
  if (/^\s*(else:|elif |except |finally:)/.test(context.textAfter) && context.lineIndent(context.pos, -1) > base)
    return null;
  return base + context.unit;
}
var pythonLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "python",
  parser: /* @__PURE__ */ parser7.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Body: (context) => {
          var _a;
          return (_a = indentBody(context, context.node)) !== null && _a !== void 0 ? _a : context.continue();
        },
        IfStatement: (cx) => /^\s*(else:|elif )/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
        TryStatement: (cx) => /^\s*(except |finally:|else:)/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
        "TupleExpression ComprehensionExpression ParamList ArgList ParenthesizedExpression": /* @__PURE__ */ delimitedIndent({ closing: ")" }),
        "DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression": /* @__PURE__ */ delimitedIndent({ closing: "}" }),
        "ArrayExpression ArrayComprehensionExpression": /* @__PURE__ */ delimitedIndent({ closing: "]" }),
        "String FormatString": () => null,
        Script: (context) => {
          if (context.pos + /\s*/.exec(context.textAfter)[0].length >= context.node.to) {
            let endBody = null;
            for (let cur2 = context.node, to = cur2.to; ; ) {
              cur2 = cur2.lastChild;
              if (!cur2 || cur2.to != to)
                break;
              if (cur2.type.name == "Body")
                endBody = cur2;
            }
            if (endBody) {
              let bodyIndent = indentBody(context, endBody);
              if (bodyIndent != null)
                return bodyIndent;
            }
          }
          return context.continue();
        }
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "ArrayExpression DictionaryExpression SetExpression TupleExpression": foldInside,
        Body: (node, state) => ({ from: node.from + 1, to: node.to - (node.to == state.doc.length ? 0 : 1) })
      })
    ]
  }),
  languageData: {
    closeBrackets: {
      brackets: ["(", "[", "{", "'", '"', "'''", '"""'],
      stringPrefixes: [
        "f",
        "fr",
        "rf",
        "r",
        "u",
        "b",
        "br",
        "rb",
        "F",
        "FR",
        "RF",
        "R",
        "U",
        "B",
        "BR",
        "RB"
      ]
    },
    commentTokens: { line: "#" },
    indentOnInput: /^\s*([\}\]\)]|else:|elif |except |finally:)$/
  }
});
function python() {
  return new LanguageSupport(pythonLanguage, [
    pythonLanguage.data.of({ autocomplete: localCompletionSource2 }),
    pythonLanguage.data.of({ autocomplete: globalCompletion })
  ]);
}

// ../../node_modules/.pnpm/@codemirror+lang-sql@6.5.5_@codemirror+view@6.23.1/node_modules/@codemirror/lang-sql/dist/index.js
var whitespace = 36;
var LineComment2 = 1;
var BlockComment2 = 2;
var String$1 = 3;
var Number = 4;
var Bool2 = 5;
var Null = 6;
var ParenL2 = 7;
var ParenR = 8;
var BraceL2 = 9;
var BraceR = 10;
var BracketL2 = 11;
var BracketR = 12;
var Semi = 13;
var Dot2 = 14;
var Operator = 15;
var Punctuation2 = 16;
var SpecialVar = 17;
var Identifier3 = 18;
var QuotedIdentifier = 19;
var Keyword = 20;
var Type2 = 21;
var Bits = 22;
var Bytes = 23;
var Builtin = 24;
function isAlpha2(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57;
}
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 97 && ch <= 102 || ch >= 65 && ch <= 70;
}
function readLiteral(input, endQuote, backslashEscapes) {
  for (let escaped = false; ; ) {
    if (input.next < 0)
      return;
    if (input.next == endQuote && !escaped) {
      input.advance();
      return;
    }
    escaped = backslashEscapes && !escaped && input.next == 92;
    input.advance();
  }
}
function readDoubleDollarLiteral(input) {
  for (; ; ) {
    if (input.next < 0 || input.peek(1) < 0)
      return;
    if (input.next == 36 && input.peek(1) == 36) {
      input.advance(2);
      return;
    }
    input.advance();
  }
}
function readPLSQLQuotedLiteral(input, openDelim) {
  let matchingDelim = "[{<(".indexOf(String.fromCharCode(openDelim));
  let closeDelim = matchingDelim < 0 ? openDelim : "]}>)".charCodeAt(matchingDelim);
  for (; ; ) {
    if (input.next < 0)
      return;
    if (input.next == closeDelim && input.peek(1) == 39) {
      input.advance(2);
      return;
    }
    input.advance();
  }
}
function readWord(input, result) {
  for (; ; ) {
    if (input.next != 95 && !isAlpha2(input.next))
      break;
    if (result != null)
      result += String.fromCharCode(input.next);
    input.advance();
  }
  return result;
}
function readWordOrQuoted(input) {
  if (input.next == 39 || input.next == 34 || input.next == 96) {
    let quote = input.next;
    input.advance();
    readLiteral(input, quote, false);
  } else {
    readWord(input);
  }
}
function readBits(input, endQuote) {
  while (input.next == 48 || input.next == 49)
    input.advance();
  if (endQuote && input.next == endQuote)
    input.advance();
}
function readNumber(input, sawDot) {
  for (; ; ) {
    if (input.next == 46) {
      if (sawDot)
        break;
      sawDot = true;
    } else if (input.next < 48 || input.next > 57) {
      break;
    }
    input.advance();
  }
  if (input.next == 69 || input.next == 101) {
    input.advance();
    if (input.next == 43 || input.next == 45)
      input.advance();
    while (input.next >= 48 && input.next <= 57)
      input.advance();
  }
}
function eol(input) {
  while (!(input.next < 0 || input.next == 10))
    input.advance();
}
function inString(ch, str) {
  for (let i = 0; i < str.length; i++)
    if (str.charCodeAt(i) == ch)
      return true;
  return false;
}
var Space = " 	\r\n";
function keywords2(keywords3, types, builtin) {
  let result = /* @__PURE__ */ Object.create(null);
  result["true"] = result["false"] = Bool2;
  result["null"] = result["unknown"] = Null;
  for (let kw of keywords3.split(" "))
    if (kw)
      result[kw] = Keyword;
  for (let tp of types.split(" "))
    if (tp)
      result[tp] = Type2;
  for (let kw of (builtin || "").split(" "))
    if (kw)
      result[kw] = Builtin;
  return result;
}
var SQLTypes = "array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ";
var SQLKeywords = "absolute action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded case cast catalog check close collate collation column commit condition connect connection constraint constraints constructor continue corresponding count create cross cube current current_date current_default_transform_group current_transform_group_for_type current_path current_role current_time current_timestamp current_user cursor cycle data day deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exists exit external fetch first for foreign found from free full function general get global go goto grant group grouping handle having hold hour identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local localtime localtimestamp locator loop map match method minute modifies module month names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search second section select session session_user set sets signal similar size some space specific specifictype sql sqlexception sqlstate sqlwarning start state static system_user table temporary then timezone_hour timezone_minute to trailing transaction translation treat trigger under undo union unique unnest until update usage user using value values view when whenever where while with without work write year zone ";
var defaults2 = {
  backslashEscapes: false,
  hashComments: false,
  spaceAfterDashes: false,
  slashComments: false,
  doubleQuotedStrings: false,
  doubleDollarQuotedStrings: false,
  unquotedBitLiterals: false,
  treatBitsAsBytes: false,
  charSetCasts: false,
  plsqlQuotingMechanism: false,
  operatorChars: "*+-%<>!=&|~^/",
  specialVar: "?",
  identifierQuotes: '"',
  words: /* @__PURE__ */ keywords2(SQLKeywords, SQLTypes)
};
function dialect(spec, kws, types, builtin) {
  let dialect2 = {};
  for (let prop in defaults2)
    dialect2[prop] = (spec.hasOwnProperty(prop) ? spec : defaults2)[prop];
  if (kws)
    dialect2.words = keywords2(kws, types || "", builtin);
  return dialect2;
}
function tokensFor(d) {
  return new ExternalTokenizer((input) => {
    var _a;
    let { next } = input;
    input.advance();
    if (inString(next, Space)) {
      while (inString(input.next, Space))
        input.advance();
      input.acceptToken(whitespace);
    } else if (next == 36 && input.next == 36 && d.doubleDollarQuotedStrings) {
      readDoubleDollarLiteral(input);
      input.acceptToken(String$1);
    } else if (next == 39 || next == 34 && d.doubleQuotedStrings) {
      readLiteral(input, next, d.backslashEscapes);
      input.acceptToken(String$1);
    } else if (next == 35 && d.hashComments || next == 47 && input.next == 47 && d.slashComments) {
      eol(input);
      input.acceptToken(LineComment2);
    } else if (next == 45 && input.next == 45 && (!d.spaceAfterDashes || input.peek(1) == 32)) {
      eol(input);
      input.acceptToken(LineComment2);
    } else if (next == 47 && input.next == 42) {
      input.advance();
      for (let depth = 1; ; ) {
        let cur2 = input.next;
        if (input.next < 0)
          break;
        input.advance();
        if (cur2 == 42 && input.next == 47) {
          depth--;
          input.advance();
          if (!depth)
            break;
        } else if (cur2 == 47 && input.next == 42) {
          depth++;
          input.advance();
        }
      }
      input.acceptToken(BlockComment2);
    } else if ((next == 101 || next == 69) && input.next == 39) {
      input.advance();
      readLiteral(input, 39, true);
    } else if ((next == 110 || next == 78) && input.next == 39 && d.charSetCasts) {
      input.advance();
      readLiteral(input, 39, d.backslashEscapes);
      input.acceptToken(String$1);
    } else if (next == 95 && d.charSetCasts) {
      for (let i = 0; ; i++) {
        if (input.next == 39 && i > 1) {
          input.advance();
          readLiteral(input, 39, d.backslashEscapes);
          input.acceptToken(String$1);
          break;
        }
        if (!isAlpha2(input.next))
          break;
        input.advance();
      }
    } else if (d.plsqlQuotingMechanism && (next == 113 || next == 81) && input.next == 39 && input.peek(1) > 0 && !inString(input.peek(1), Space)) {
      let openDelim = input.peek(1);
      input.advance(2);
      readPLSQLQuotedLiteral(input, openDelim);
      input.acceptToken(String$1);
    } else if (next == 40) {
      input.acceptToken(ParenL2);
    } else if (next == 41) {
      input.acceptToken(ParenR);
    } else if (next == 123) {
      input.acceptToken(BraceL2);
    } else if (next == 125) {
      input.acceptToken(BraceR);
    } else if (next == 91) {
      input.acceptToken(BracketL2);
    } else if (next == 93) {
      input.acceptToken(BracketR);
    } else if (next == 59) {
      input.acceptToken(Semi);
    } else if (d.unquotedBitLiterals && next == 48 && input.next == 98) {
      input.advance();
      readBits(input);
      input.acceptToken(Bits);
    } else if ((next == 98 || next == 66) && (input.next == 39 || input.next == 34)) {
      const quoteStyle = input.next;
      input.advance();
      if (d.treatBitsAsBytes) {
        readLiteral(input, quoteStyle, d.backslashEscapes);
        input.acceptToken(Bytes);
      } else {
        readBits(input, quoteStyle);
        input.acceptToken(Bits);
      }
    } else if (next == 48 && (input.next == 120 || input.next == 88) || (next == 120 || next == 88) && input.next == 39) {
      let quoted = input.next == 39;
      input.advance();
      while (isHexDigit(input.next))
        input.advance();
      if (quoted && input.next == 39)
        input.advance();
      input.acceptToken(Number);
    } else if (next == 46 && input.next >= 48 && input.next <= 57) {
      readNumber(input, true);
      input.acceptToken(Number);
    } else if (next == 46) {
      input.acceptToken(Dot2);
    } else if (next >= 48 && next <= 57) {
      readNumber(input, false);
      input.acceptToken(Number);
    } else if (inString(next, d.operatorChars)) {
      while (inString(input.next, d.operatorChars))
        input.advance();
      input.acceptToken(Operator);
    } else if (inString(next, d.specialVar)) {
      if (input.next == next)
        input.advance();
      readWordOrQuoted(input);
      input.acceptToken(SpecialVar);
    } else if (inString(next, d.identifierQuotes)) {
      readLiteral(input, next, false);
      input.acceptToken(QuotedIdentifier);
    } else if (next == 58 || next == 44) {
      input.acceptToken(Punctuation2);
    } else if (isAlpha2(next)) {
      let word = readWord(input, String.fromCharCode(next));
      input.acceptToken(input.next == 46 ? Identifier3 : (_a = d.words[word.toLowerCase()]) !== null && _a !== void 0 ? _a : Identifier3);
    }
  });
}
var tokens = /* @__PURE__ */ tokensFor(defaults2);
var parser$1 = /* @__PURE__ */ LRParser.deserialize({
  version: 14,
  states: "%vQ]QQOOO#wQRO'#DSO$OQQO'#CwO%eQQO'#CxO%lQQO'#CyO%sQQO'#CzOOQQ'#DS'#DSOOQQ'#C}'#C}O'UQRO'#C{OOQQ'#Cv'#CvOOQQ'#C|'#C|Q]QQOOQOQQOOO'`QQO'#DOO(xQRO,59cO)PQQO,59cO)UQQO'#DSOOQQ,59d,59dO)cQQO,59dOOQQ,59e,59eO)jQQO,59eOOQQ,59f,59fO)qQQO,59fOOQQ-E6{-E6{OOQQ,59b,59bOOQQ-E6z-E6zOOQQ,59j,59jOOQQ-E6|-E6|O+VQRO1G.}O+^QQO,59cOOQQ1G/O1G/OOOQQ1G/P1G/POOQQ1G/Q1G/QP+kQQO'#C}O+rQQO1G.}O)PQQO,59cO,PQQO'#Cw",
  stateData: ",[~OtOSPOSQOS~ORUOSUOTUOUUOVROXSOZTO]XO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O^]ORvXSvXTvXUvXVvXXvXZvX]vX_vX`vXavXbvXcvXdvXevXfvXgvXhvX~OsvX~P!jOa_Ob_Oc_O~ORUOSUOTUOUUOVROXSOZTO^tO_UO`UOa`Ob`Oc`OdUOeUOfUOgUOhUO~OWaO~P$ZOYcO~P$ZO[eO~P$ZORUOSUOTUOUUOVROXSOZTO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O]hOsoX~P%zOajObjOcjO~O^]ORkaSkaTkaUkaVkaXkaZka]ka_ka`kaakabkackadkaekafkagkahka~Oska~P'kO^]O~OWvXYvX[vX~P!jOWnO~P$ZOYoO~P$ZO[pO~P$ZO^]ORkiSkiTkiUkiVkiXkiZki]ki_ki`kiakibkickidkiekifkigkihki~Oski~P)xOWkaYka[ka~P'kO]hO~P$ZOWkiYki[ki~P)xOasObsOcsO~O",
  goto: "#hwPPPPPPPPPPPPPPPPPPPPPPPPPPx||||!Y!^!d!xPPP#[TYOZeUORSTWZbdfqT[OZQZORiZSWOZQbRQdSQfTZgWbdfqQ^PWk^lmrQl_Qm`RrseVORSTWZbdfq",
  nodeNames: "\u26A0 LineComment BlockComment String Number Bool Null ( ) { } [ ] ; . Operator Punctuation SpecialVar Identifier QuotedIdentifier Keyword Type Bits Bytes Builtin Script Statement CompositeIdentifier Parens Braces Brackets Statement",
  maxTerm: 38,
  nodeProps: [
    ["isolate", -4, 1, 2, 3, 19, ""]
  ],
  skippedNodes: [0, 1, 2],
  repeatNodeCount: 3,
  tokenData: "RORO",
  tokenizers: [0, tokens],
  topRules: { "Script": [0, 25] },
  tokenPrec: 0
});
function tokenBefore(tree) {
  let cursor = tree.cursor().moveTo(tree.from, -1);
  while (/Comment/.test(cursor.name))
    cursor.moveTo(cursor.from, -1);
  return cursor.node;
}
function idName(doc, node) {
  let text = doc.sliceString(node.from, node.to);
  let quoted = /^([`'"])(.*)\1$/.exec(text);
  return quoted ? quoted[2] : text;
}
function plainID(node) {
  return node && (node.name == "Identifier" || node.name == "QuotedIdentifier");
}
function pathFor(doc, id2) {
  if (id2.name == "CompositeIdentifier") {
    let path = [];
    for (let ch = id2.firstChild; ch; ch = ch.nextSibling)
      if (plainID(ch))
        path.push(idName(doc, ch));
    return path;
  }
  return [idName(doc, id2)];
}
function parentsFor(doc, node) {
  for (let path = []; ; ) {
    if (!node || node.name != ".")
      return path;
    let name = tokenBefore(node);
    if (!plainID(name))
      return path;
    path.unshift(idName(doc, name));
    node = tokenBefore(name);
  }
}
function sourceContext(state, startPos) {
  let pos = syntaxTree(state).resolveInner(startPos, -1);
  let aliases = getAliases(state.doc, pos);
  if (pos.name == "Identifier" || pos.name == "QuotedIdentifier" || pos.name == "Keyword") {
    return {
      from: pos.from,
      quoted: pos.name == "QuotedIdentifier" ? state.doc.sliceString(pos.from, pos.from + 1) : null,
      parents: parentsFor(state.doc, tokenBefore(pos)),
      aliases
    };
  }
  if (pos.name == ".") {
    return { from: startPos, quoted: null, parents: parentsFor(state.doc, pos), aliases };
  } else {
    return { from: startPos, quoted: null, parents: [], empty: true, aliases };
  }
}
var EndFrom = /* @__PURE__ */ new Set(/* @__PURE__ */ "where group having order union intersect except all distinct limit offset fetch for".split(" "));
function getAliases(doc, at) {
  let statement;
  for (let parent = at; !statement; parent = parent.parent) {
    if (!parent)
      return null;
    if (parent.name == "Statement")
      statement = parent;
  }
  let aliases = null;
  for (let scan = statement.firstChild, sawFrom = false, prevID = null; scan; scan = scan.nextSibling) {
    let kw = scan.name == "Keyword" ? doc.sliceString(scan.from, scan.to).toLowerCase() : null;
    let alias = null;
    if (!sawFrom) {
      sawFrom = kw == "from";
    } else if (kw == "as" && prevID && plainID(scan.nextSibling)) {
      alias = idName(doc, scan.nextSibling);
    } else if (kw && EndFrom.has(kw)) {
      break;
    } else if (prevID && plainID(scan)) {
      alias = idName(doc, scan);
    }
    if (alias) {
      if (!aliases)
        aliases = /* @__PURE__ */ Object.create(null);
      aliases[alias] = pathFor(doc, prevID);
    }
    prevID = /Identifier$/.test(scan.name) ? scan : null;
  }
  return aliases;
}
function maybeQuoteCompletions(quote, completions) {
  if (!quote)
    return completions;
  return completions.map((c) => Object.assign(Object.assign({}, c), { label: c.label[0] == quote ? c.label : quote + c.label + quote, apply: void 0 }));
}
var Span = /^\w*$/;
var QuotedSpan = /^[`'"]?\w*[`'"]?$/;
var CompletionLevel = class _CompletionLevel {
  constructor() {
    this.list = [];
    this.children = void 0;
  }
  child(name, idQuote) {
    let children = this.children || (this.children = /* @__PURE__ */ Object.create(null));
    let found = children[name];
    if (found)
      return found;
    if (name)
      this.list.push(nameCompletion(name, "type", idQuote));
    return children[name] = new _CompletionLevel();
  }
  addCompletions(list) {
    for (let option of list) {
      let found = this.list.findIndex((o) => o.label == option.label);
      if (found > -1)
        this.list[found] = option;
      else
        this.list.push(option);
    }
  }
};
function nameCompletion(label, type, idQuote) {
  if (/^[a-z_][a-z_\d]*$/.test(label))
    return { label, type };
  return { label, type, apply: idQuote + label + idQuote };
}
function completeFromSchema(schema, tables, schemas, defaultTableName, defaultSchemaName, dialect2) {
  var _a;
  let top = new CompletionLevel();
  let idQuote = ((_a = dialect2 === null || dialect2 === void 0 ? void 0 : dialect2.spec.identifierQuotes) === null || _a === void 0 ? void 0 : _a[0]) || '"';
  let defaultSchema = top.child(defaultSchemaName || "", idQuote);
  for (let table in schema) {
    let parts = table.replace(/\\?\./g, (p) => p == "." ? "\0" : p).split("\0");
    let base = parts.length == 1 ? defaultSchema : top;
    for (let part of parts)
      base = base.child(part.replace(/\\\./g, "."), idQuote);
    for (let option of schema[table])
      if (option)
        base.list.push(typeof option == "string" ? nameCompletion(option, "property", idQuote) : option);
  }
  if (tables)
    defaultSchema.addCompletions(tables);
  if (schemas)
    top.addCompletions(schemas);
  top.addCompletions(defaultSchema.list);
  if (defaultTableName)
    top.addCompletions(defaultSchema.child(defaultTableName, idQuote).list);
  return (context) => {
    let { parents, from, quoted, empty, aliases } = sourceContext(context.state, context.pos);
    if (empty && !context.explicit)
      return null;
    if (aliases && parents.length == 1)
      parents = aliases[parents[0]] || parents;
    let level = top;
    for (let name of parents) {
      while (!level.children || !level.children[name]) {
        if (level == top)
          level = defaultSchema;
        else if (level == defaultSchema && defaultTableName)
          level = level.child(defaultTableName, idQuote);
        else
          return null;
      }
      level = level.child(name, idQuote);
    }
    let quoteAfter = quoted && context.state.sliceDoc(context.pos, context.pos + 1) == quoted;
    let options = level.list;
    if (level == top && aliases)
      options = options.concat(Object.keys(aliases).map((name) => ({ label: name, type: "constant" })));
    return {
      from,
      to: quoteAfter ? context.pos + 1 : void 0,
      options: maybeQuoteCompletions(quoted, options),
      validFor: quoted ? QuotedSpan : Span
    };
  };
}
function completeKeywords(keywords3, upperCase) {
  let completions = Object.keys(keywords3).map((keyword) => ({
    label: upperCase ? keyword.toUpperCase() : keyword,
    type: keywords3[keyword] == Type2 ? "type" : keywords3[keyword] == Keyword ? "keyword" : "variable",
    boost: -1
  }));
  return ifNotIn(["QuotedIdentifier", "SpecialVar", "String", "LineComment", "BlockComment", "."], completeFromList(completions));
}
var parser8 = /* @__PURE__ */ parser$1.configure({
  props: [
    /* @__PURE__ */ indentNodeProp.add({
      Statement: /* @__PURE__ */ continuedIndent()
    }),
    /* @__PURE__ */ foldNodeProp.add({
      Statement(tree) {
        return { from: tree.firstChild.to, to: tree.to };
      },
      BlockComment(tree) {
        return { from: tree.from + 2, to: tree.to - 2 };
      }
    }),
    /* @__PURE__ */ styleTags({
      Keyword: tags.keyword,
      Type: tags.typeName,
      Builtin: /* @__PURE__ */ tags.standard(tags.name),
      Bits: tags.number,
      Bytes: tags.string,
      Bool: tags.bool,
      Null: tags.null,
      Number: tags.number,
      String: tags.string,
      Identifier: tags.name,
      QuotedIdentifier: /* @__PURE__ */ tags.special(tags.string),
      SpecialVar: /* @__PURE__ */ tags.special(tags.name),
      LineComment: tags.lineComment,
      BlockComment: tags.blockComment,
      Operator: tags.operator,
      "Semi Punctuation": tags.punctuation,
      "( )": tags.paren,
      "{ }": tags.brace,
      "[ ]": tags.squareBracket
    })
  ]
});
var SQLDialect = class _SQLDialect {
  constructor(dialect2, language, spec) {
    this.dialect = dialect2;
    this.language = language;
    this.spec = spec;
  }
  /**
  Returns the language for this dialect as an extension.
  */
  get extension() {
    return this.language.extension;
  }
  /**
  Define a new dialect.
  */
  static define(spec) {
    let d = dialect(spec, spec.keywords, spec.types, spec.builtin);
    let language = LRLanguage.define({
      name: "sql",
      parser: parser8.configure({
        tokenizers: [{ from: tokens, to: tokensFor(d) }]
      }),
      languageData: {
        commentTokens: { line: "--", block: { open: "/*", close: "*/" } },
        closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] }
      }
    });
    return new _SQLDialect(d, language, spec);
  }
};
function keywordCompletionSource(dialect2, upperCase = false) {
  return completeKeywords(dialect2.dialect.words, upperCase);
}
function keywordCompletion(dialect2, upperCase = false) {
  return dialect2.language.data.of({
    autocomplete: keywordCompletionSource(dialect2, upperCase)
  });
}
function schemaCompletionSource(config2) {
  return config2.schema ? completeFromSchema(config2.schema, config2.tables, config2.schemas, config2.defaultTable, config2.defaultSchema, config2.dialect || StandardSQL) : () => null;
}
function schemaCompletion(config2) {
  return config2.schema ? (config2.dialect || StandardSQL).language.data.of({
    autocomplete: schemaCompletionSource(config2)
  }) : [];
}
function sql(config2 = {}) {
  let lang = config2.dialect || StandardSQL;
  return new LanguageSupport(lang.language, [schemaCompletion(config2), keywordCompletion(lang, !!config2.upperCaseKeywords)]);
}
var StandardSQL = /* @__PURE__ */ SQLDialect.define({});
var PostgreSQL = /* @__PURE__ */ SQLDialect.define({
  charSetCasts: true,
  doubleDollarQuotedStrings: true,
  operatorChars: "+-*/<>=~!@#%^&|`?",
  specialVar: "",
  keywords: SQLKeywords + "a abort abs absent access according ada admin aggregate alias also always analyse analyze array_agg array_max_cardinality asensitive assert assignment asymmetric atomic attach attribute attributes avg backward base64 begin_frame begin_partition bernoulli bit_length blocked bom c cache called cardinality catalog_name ceil ceiling chain char_length character_length character_set_catalog character_set_name character_set_schema characteristics characters checkpoint class class_origin cluster coalesce cobol collation_catalog collation_name collation_schema collect column_name columns command_function command_function_code comment comments committed concurrently condition_number configuration conflict connection_name constant constraint_catalog constraint_name constraint_schema contains content control conversion convert copy corr cost covar_pop covar_samp csv cume_dist current_catalog current_row current_schema cursor_name database datalink datatype datetime_interval_code datetime_interval_precision db debug defaults defined definer degree delimiter delimiters dense_rank depends derived detach detail dictionary disable discard dispatch dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue document dump dynamic_function dynamic_function_code element elsif empty enable encoding encrypted end_frame end_partition endexec enforced enum errcode error event every exclude excluding exclusive exp explain expression extension extract family file filter final first_value flag floor following force foreach fortran forward frame_row freeze fs functions fusion g generated granted greatest groups handler header hex hierarchy hint id ignore ilike immediately immutable implementation implicit import include including increment indent index indexes info inherit inherits inline insensitive instance instantiable instead integrity intersection invoker isnull k key_member key_type label lag last_value lead leakproof least length library like_regex link listen ln load location lock locked log logged lower m mapping matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text min minvalue mod mode more move multiset mumps name namespace nfc nfd nfkc nfkd nil normalize normalized nothing notice notify notnull nowait nth_value ntile nullable nullif nulls number occurrences_regex octet_length octets off offset oids operator options ordering others over overlay overriding owned owner p parallel parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partition pascal passing passthrough password percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding prepared print_strict_params procedural procedures program publication query quote raise range rank reassign recheck recovery refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex rename repeatable replace replica requiring reset respect restart restore result_oid returned_cardinality returned_length returned_octet_length returned_sqlstate returning reverse routine_catalog routine_name routine_schema routines row_count row_number rowtype rule scale schema_name schemas scope scope_catalog scope_name scope_schema security selective self sensitive sequence sequences serializable server server_name setof share show simple skip slice snapshot source specific_name sqlcode sqlerror sqrt stable stacked standalone statement statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time t table_name tables tablesample tablespace temp template ties token top_level_count transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex trigger_catalog trigger_name trigger_schema trim trim_array truncate trusted type types uescape unbounded uncommitted unencrypted unlink unlisten unlogged unnamed untyped upper uri use_column use_variable user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema vacuum valid validate validator value_of var_pop var_samp varbinary variable_conflict variadic verbose version versioning views volatile warning whitespace width_bucket window within wrapper xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate yes",
  types: SQLTypes + "bigint int8 bigserial serial8 varbit bool box bytea cidr circle precision float8 inet int4 json jsonb line lseg macaddr macaddr8 money numeric pg_lsn point polygon float4 int2 smallserial serial2 serial serial4 text timetz timestamptz tsquery tsvector txid_snapshot uuid xml"
});
var MySQLKeywords = "accessible algorithm analyze asensitive authors auto_increment autocommit avg avg_row_length binlog btree cache catalog_name chain change changed checkpoint checksum class_origin client_statistics coalesce code collations columns comment committed completion concurrent consistent contains contributors convert database databases day_hour day_microsecond day_minute day_second delay_key_write delayed delimiter des_key_file dev_pop dev_samp deviance directory disable discard distinctrow div dual dumpfile enable enclosed ends engine engines enum errors escaped even event events every explain extended fast field fields flush force found_rows fulltext grants handler hash high_priority hosts hour_microsecond hour_minute hour_second ignore ignore_server_ids import index index_statistics infile innodb insensitive insert_method install invoker iterate keys kill linear lines list load lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modify mutex mysql_errno no_write_to_binlog offline offset one online optimize optionally outfile pack_keys parser partition partitions password phase plugin plugins prev processlist profile profiles purge query quick range read_write rebuild recover regexp relaylog remove rename reorganize repair repeatable replace require resume rlike row_format rtree schedule schema_name schemas second_microsecond security sensitive separator serializable server share show slave slow snapshot soname spatial sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result ssl starting starts std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace terminated triggers truncate uncommitted uninstall unlock upgrade use use_frm user_resources user_statistics utc_date utc_time utc_timestamp variables views warnings xa xor year_month zerofill";
var MySQLTypes = SQLTypes + "bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int1 int2 int3 int4 int8 float4 float8 varbinary varcharacter precision datetime unsigned signed";
var MySQLBuiltin = "charset clear edit ego help nopager notee nowarning pager print prompt quit rehash source status system tee";
var MySQL = /* @__PURE__ */ SQLDialect.define({
  operatorChars: "*+-%<>!=&|^",
  charSetCasts: true,
  doubleQuotedStrings: true,
  unquotedBitLiterals: true,
  hashComments: true,
  spaceAfterDashes: true,
  specialVar: "@?",
  identifierQuotes: "`",
  keywords: SQLKeywords + "group_concat " + MySQLKeywords,
  types: MySQLTypes,
  builtin: MySQLBuiltin
});
var MariaSQL = /* @__PURE__ */ SQLDialect.define({
  operatorChars: "*+-%<>!=&|^",
  charSetCasts: true,
  doubleQuotedStrings: true,
  unquotedBitLiterals: true,
  hashComments: true,
  spaceAfterDashes: true,
  specialVar: "@?",
  identifierQuotes: "`",
  keywords: SQLKeywords + "always generated groupby_concat hard persistent shutdown soft virtual " + MySQLKeywords,
  types: MySQLTypes,
  builtin: MySQLBuiltin
});
var MSSQL = /* @__PURE__ */ SQLDialect.define({
  keywords: SQLKeywords + "trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock pivot readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx unpivot updlock with",
  types: SQLTypes + "bigint smallint smallmoney tinyint money real text nvarchar ntext varbinary image hierarchyid uniqueidentifier sql_variant xml",
  builtin: "binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id",
  operatorChars: "*+-%<>!=^&|/",
  specialVar: "@"
});
var SQLite = /* @__PURE__ */ SQLDialect.define({
  keywords: SQLKeywords + "abort analyze attach autoincrement conflict database detach exclusive fail glob ignore index indexed instead isnull notnull offset plan pragma query raise regexp reindex rename replace temp vacuum virtual",
  types: SQLTypes + "bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int2 int8 unsigned signed real",
  builtin: "auth backup bail changes clone databases dbinfo dump echo eqp explain fullschema headers help import imposter indexes iotrace lint load log mode nullvalue once print prompt quit restore save scanstats separator shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width",
  operatorChars: "*+-%<>!=&|/~",
  identifierQuotes: '`"',
  specialVar: "@:?$"
});
var Cassandra = /* @__PURE__ */ SQLDialect.define({
  keywords: "add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime infinity NaN",
  types: SQLTypes + "ascii bigint blob counter frozen inet list map static text timeuuid tuple uuid varint",
  slashComments: true
});
var PLSQL = /* @__PURE__ */ SQLDialect.define({
  keywords: SQLKeywords + "abort accept access add all alter and any arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body by case cast char_base check close cluster clusters colauth column comment commit compress connected constant constraint crash create current currval cursor data_base database dba deallocate debugoff debugon declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry exception exception_init exchange exclusive exists external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base of off offline on online only option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw rebuild record ref references refresh rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work",
  builtin: "appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define echo editfile embedded feedback flagger flush heading headsep instance linesize lno loboffset logsource longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar repfooter repheader serveroutput shiftinout show showmode spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout timing trimout trimspool ttitle underline verify version wrap",
  types: SQLTypes + "ascii bfile bfilename bigserial bit blob dec long number nvarchar nvarchar2 serial smallint string text uid varchar2 xml",
  operatorChars: "*/+-%<>!=~",
  doubleQuotedStrings: true,
  charSetCasts: true,
  plsqlQuotingMechanism: true
});

// src/elements/code/languages/languages.ts
var languages = {
  asciidoc: {
    name: "asciidoc",
    cm: StreamLanguage.define(asciidoc),
    logo: `${icons["language-asciidoctor"]}`,
    extension: "adoc",
    mime: "text/asciidoc",
    helpUrl: "https://docs.asciidoctor.org/asciidoc/latest/syntax-quick-reference/"
  },
  css: {
    name: "css",
    cm: css(),
    logo: `${icons["mdi-language-css3"]}`,
    extension: "css",
    mime: "text/css",
    helpUrl: "https://developer.mozilla.org/fr/docs/Web/CSS/Reference"
  },
  html: {
    name: "html",
    cm: html(),
    logo: `${icons["mdi-language-html5"]}`,
    extension: "html",
    mime: "text/html",
    helpUrl: "https://developer.mozilla.org/fr/docs/Web/HTML/Reference"
  },
  javascript: {
    name: "javascript",
    cm: javascript(),
    logo: `${icons["mdi-language-javascript"]}`,
    extension: "js",
    mime: "text/javascript",
    helpUrl: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference"
  },
  json: {
    name: "json",
    cm: json(),
    logo: `${icons["mdi-code-json"]}`,
    extension: "json",
    mime: "application/json",
    helpUrl: "https://www.json.org/json-fr.html"
  },
  markdown: {
    name: "markdown",
    cm: markdown(),
    logo: `${icons["mdi-language-markdown"]}`,
    extension: "md",
    mime: "text/markdown",
    helpUrl: "https://www.markdownguide.org/cheat-sheet/"
  },
  prolog: {
    name: "prolog",
    cm: prolog(),
    logo: `${icons["language-prolog"]}`,
    extension: "pl",
    mime: "text/x-prolog",
    helpUrl: "http://tau-prolog.org/documentation#prolog"
  },
  python: {
    name: "python",
    cm: python(),
    logo: `${icons["mdi-language-python"]}`,
    extension: "py",
    mime: "text/x-python",
    helpUrl: "https://www.pythoncheatsheet.org/cheatsheet/dictionaries"
  },
  sql: {
    name: "sql",
    cm: sql(),
    logo: `${icons["mdi-database"]}`,
    extension: "sql",
    mime: "application/sql",
    helpUrl: "https://sql.sh"
  },
  text: {
    name: "text",
    cm: [],
    logo: `${icons["mdi-format-text"]}`,
    extension: "txt",
    mime: "text/plain",
    helpUrl: ""
  },
  typescript: {
    name: "typescript",
    cm: javascript({ typescript: true }),
    logo: `${icons["mdi-language-typescript"]}`,
    extension: "ts",
    mime: "video/mp2t",
    // !
    helpUrl: "https://www.typescriptlang.org/cheatsheets"
  }
};

export {
  closeBrackets,
  closeBracketsKeymap,
  autocompletion,
  completionKeymap,
  languages
};
