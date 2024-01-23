var f = {
  addition: "inserted",
  attributes: "propertyName",
  bold: "strong",
  cite: "keyword",
  code: "monospace",
  definitionList: "list",
  deletion: "deleted",
  div: "punctuation",
  em: "emphasis",
  footnote: "variable",
  footCite: "qualifier",
  header: "heading",
  html: "comment",
  image: "atom",
  italic: "emphasis",
  link: "link",
  linkDefinition: "link",
  list1: "list",
  list2: "list.special",
  list3: "list",
  notextile: "string.special",
  pre: "operator",
  p: "content",
  quote: "bracket",
  span: "quote",
  specialChar: "character",
  strong: "strong",
  sub: "content.special",
  sup: "content.special",
  table: "variableName.special",
  tableHeading: "operator"
};
function h(i, e) {
  e.mode = r.newLayout, e.tableHeading = !1, e.layoutType === "definitionList" && e.spanningLayout && i.match(l("definitionListEnd"), !1) && (e.spanningLayout = !1);
}
function s(i, e, n) {
  if (n === "_")
    return i.eat("_") ? a(i, e, "italic", /__/, 2) : a(i, e, "em", /_/, 1);
  if (n === "*")
    return i.eat("*") ? a(i, e, "bold", /\*\*/, 2) : a(i, e, "strong", /\*/, 1);
  if (n === "[")
    return i.match(/\d+\]/) && (e.footCite = !0), u(e);
  if (n === "(") {
    var o = i.match(/^(r|tm|c)\)/);
    if (o)
      return f.specialChar;
  }
  if (n === "<" && i.match(/(\w+)[^>]+>[^<]+<\/\1>/))
    return f.html;
  if (n === "?" && i.eat("?"))
    return a(i, e, "cite", /\?\?/, 2);
  if (n === "=" && i.eat("="))
    return a(i, e, "notextile", /==/, 2);
  if (n === "-" && !i.eat("-"))
    return a(i, e, "deletion", /-/, 1);
  if (n === "+")
    return a(i, e, "addition", /\+/, 1);
  if (n === "~")
    return a(i, e, "sub", /~/, 1);
  if (n === "^")
    return a(i, e, "sup", /\^/, 1);
  if (n === "%")
    return a(i, e, "span", /%/, 1);
  if (n === "@")
    return a(i, e, "code", /@/, 1);
  if (n === "!") {
    var c = a(i, e, "image", /(?:\([^\)]+\))?!/, 1);
    return i.match(/^:\S+/), c;
  }
  return u(e);
}
function a(i, e, n, o, c) {
  var d = i.pos > c ? i.string.charAt(i.pos - c - 1) : null, p = i.peek();
  if (e[n]) {
    if ((!p || /\W/.test(p)) && d && /\S/.test(d)) {
      var y = u(e);
      return e[n] = !1, y;
    }
  } else
    (!d || /\W/.test(d)) && p && /\S/.test(p) && i.match(new RegExp("^.*\\S" + o.source + "(?:\\W|$)"), !1) && (e[n] = !0, e.mode = r.attributes);
  return u(e);
}
function u(i) {
  var e = b(i);
  if (e)
    return e;
  var n = [];
  return i.layoutType && n.push(f[i.layoutType]), n = n.concat(g(
    i,
    "addition",
    "bold",
    "cite",
    "code",
    "deletion",
    "em",
    "footCite",
    "image",
    "italic",
    "link",
    "span",
    "strong",
    "sub",
    "sup",
    "table",
    "tableHeading"
  )), i.layoutType === "header" && n.push(f.header + "-" + i.header), n.length ? n.join(" ") : null;
}
function b(i) {
  var e = i.layoutType;
  switch (e) {
    case "notextile":
    case "code":
    case "pre":
      return f[e];
    default:
      return i.notextile ? f.notextile + (e ? " " + f[e] : "") : null;
  }
}
function g(i) {
  for (var e = [], n = 1; n < arguments.length; ++n)
    i[arguments[n]] && e.push(f[arguments[n]]);
  return e;
}
function m(i) {
  var e = i.spanningLayout, n = i.layoutType;
  for (var o in i)
    i.hasOwnProperty(o) && delete i[o];
  i.mode = r.newLayout, e && (i.layoutType = n, i.spanningLayout = !0);
}
var t = {
  cache: {},
  single: {
    bc: "bc",
    bq: "bq",
    definitionList: /- .*?:=+/,
    definitionListEnd: /.*=:\s*$/,
    div: "div",
    drawTable: /\|.*\|/,
    foot: /fn\d+/,
    header: /h[1-6]/,
    html: /\s*<(?:\/)?(\w+)(?:[^>]+)?>(?:[^<]+<\/\1>)?/,
    link: /[^"]+":\S/,
    linkDefinition: /\[[^\s\]]+\]\S+/,
    list: /(?:#+|\*+)/,
    notextile: "notextile",
    para: "p",
    pre: "pre",
    table: "table",
    tableCellAttributes: /[\/\\]\d+/,
    tableHeading: /\|_\./,
    tableText: /[^"_\*\[\(\?\+~\^%@|-]+/,
    text: /[^!"_=\*\[\(<\?\+~\^%@-]+/
  },
  attributes: {
    align: /(?:<>|<|>|=)/,
    selector: /\([^\(][^\)]+\)/,
    lang: /\[[^\[\]]+\]/,
    pad: /(?:\(+|\)+){1,2}/,
    css: /\{[^\}]+\}/
  },
  createRe: function(i) {
    switch (i) {
      case "drawTable":
        return t.makeRe("^", t.single.drawTable, "$");
      case "html":
        return t.makeRe("^", t.single.html, "(?:", t.single.html, ")*", "$");
      case "linkDefinition":
        return t.makeRe("^", t.single.linkDefinition, "$");
      case "listLayout":
        return t.makeRe("^", t.single.list, l("allAttributes"), "*\\s+");
      case "tableCellAttributes":
        return t.makeRe("^", t.choiceRe(
          t.single.tableCellAttributes,
          l("allAttributes")
        ), "+\\.");
      case "type":
        return t.makeRe("^", l("allTypes"));
      case "typeLayout":
        return t.makeRe(
          "^",
          l("allTypes"),
          l("allAttributes"),
          "*\\.\\.?",
          "(\\s+|$)"
        );
      case "attributes":
        return t.makeRe("^", l("allAttributes"), "+");
      case "allTypes":
        return t.choiceRe(
          t.single.div,
          t.single.foot,
          t.single.header,
          t.single.bc,
          t.single.bq,
          t.single.notextile,
          t.single.pre,
          t.single.table,
          t.single.para
        );
      case "allAttributes":
        return t.choiceRe(
          t.attributes.selector,
          t.attributes.css,
          t.attributes.lang,
          t.attributes.align,
          t.attributes.pad
        );
      default:
        return t.makeRe("^", t.single[i]);
    }
  },
  makeRe: function() {
    for (var i = "", e = 0; e < arguments.length; ++e) {
      var n = arguments[e];
      i += typeof n == "string" ? n : n.source;
    }
    return new RegExp(i);
  },
  choiceRe: function() {
    for (var i = [arguments[0]], e = 1; e < arguments.length; ++e)
      i[e * 2 - 1] = "|", i[e * 2] = arguments[e];
    return i.unshift("(?:"), i.push(")"), t.makeRe.apply(null, i);
  }
};
function l(i) {
  return t.cache[i] || (t.cache[i] = t.createRe(i));
}
var r = {
  newLayout: function(i, e) {
    if (i.match(l("typeLayout"), !1))
      return e.spanningLayout = !1, (e.mode = r.blockType)(i, e);
    var n;
    return b(e) || (i.match(l("listLayout"), !1) ? n = r.list : i.match(l("drawTable"), !1) ? n = r.table : i.match(l("linkDefinition"), !1) ? n = r.linkDefinition : i.match(l("definitionList")) ? n = r.definitionList : i.match(l("html"), !1) && (n = r.html)), (e.mode = n || r.text)(i, e);
  },
  blockType: function(i, e) {
    var n, o;
    if (e.layoutType = null, n = i.match(l("type")))
      o = n[0];
    else
      return (e.mode = r.text)(i, e);
    return (n = o.match(l("header"))) ? (e.layoutType = "header", e.header = parseInt(n[0][1])) : o.match(l("bq")) ? e.layoutType = "quote" : o.match(l("bc")) ? e.layoutType = "code" : o.match(l("foot")) ? e.layoutType = "footnote" : o.match(l("notextile")) ? e.layoutType = "notextile" : o.match(l("pre")) ? e.layoutType = "pre" : o.match(l("div")) ? e.layoutType = "div" : o.match(l("table")) && (e.layoutType = "table"), e.mode = r.attributes, u(e);
  },
  text: function(i, e) {
    if (i.match(l("text")))
      return u(e);
    var n = i.next();
    return n === '"' ? (e.mode = r.link)(i, e) : s(i, e, n);
  },
  attributes: function(i, e) {
    return e.mode = r.layoutLength, i.match(l("attributes")) ? f.attributes : u(e);
  },
  layoutLength: function(i, e) {
    return i.eat(".") && i.eat(".") && (e.spanningLayout = !0), e.mode = r.text, u(e);
  },
  list: function(i, e) {
    var n = i.match(l("list"));
    e.listDepth = n[0].length;
    var o = (e.listDepth - 1) % 3;
    return o ? o === 1 ? e.layoutType = "list2" : e.layoutType = "list3" : e.layoutType = "list1", e.mode = r.attributes, u(e);
  },
  link: function(i, e) {
    return e.mode = r.text, i.match(l("link")) ? (i.match(/\S+/), f.link) : u(e);
  },
  linkDefinition: function(i) {
    return i.skipToEnd(), f.linkDefinition;
  },
  definitionList: function(i, e) {
    return i.match(l("definitionList")), e.layoutType = "definitionList", i.match(/\s*$/) ? e.spanningLayout = !0 : e.mode = r.attributes, u(e);
  },
  html: function(i) {
    return i.skipToEnd(), f.html;
  },
  table: function(i, e) {
    return e.layoutType = "table", (e.mode = r.tableCell)(i, e);
  },
  tableCell: function(i, e) {
    return i.match(l("tableHeading")) ? e.tableHeading = !0 : i.eat("|"), e.mode = r.tableCellAttributes, u(e);
  },
  tableCellAttributes: function(i, e) {
    return e.mode = r.tableText, i.match(l("tableCellAttributes")) ? f.attributes : u(e);
  },
  tableText: function(i, e) {
    return i.match(l("tableText")) ? u(e) : i.peek() === "|" ? (e.mode = r.tableCell, u(e)) : s(i, e, i.next());
  }
};
const k = {
  name: "textile",
  startState: function() {
    return { mode: r.newLayout };
  },
  token: function(i, e) {
    return i.sol() && h(i, e), e.mode(i, e);
  },
  blankLine: m
};
export {
  k as textile
};
