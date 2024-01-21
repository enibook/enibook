function c(t) {
  return {
    name: "mscgen",
    startState: i,
    copyState: s,
    token: u(t),
    languageData: {
      commentTokens: { line: "#", block: { open: "/*", close: "*/" } }
    }
  };
}
const a = c({
  keywords: ["msc"],
  options: ["hscale", "width", "arcgradient", "wordwraparcs"],
  constants: ["true", "false", "on", "off"],
  attributes: ["label", "idurl", "id", "url", "linecolor", "linecolour", "textcolor", "textcolour", "textbgcolor", "textbgcolour", "arclinecolor", "arclinecolour", "arctextcolor", "arctextcolour", "arctextbgcolor", "arctextbgcolour", "arcskip"],
  brackets: ["\\{", "\\}"],
  // [ and  ] are brackets too, but these get handled in with lists
  arcsWords: ["note", "abox", "rbox", "box"],
  arcsOthers: ["\\|\\|\\|", "\\.\\.\\.", "---", "--", "<->", "==", "<<=>>", "<=>", "\\.\\.", "<<>>", "::", "<:>", "->", "=>>", "=>", ">>", ":>", "<-", "<<=", "<=", "<<", "<:", "x-", "-x"],
  singlecomment: ["//", "#"],
  operators: ["="]
}), l = c({
  keywords: null,
  options: ["hscale", "width", "arcgradient", "wordwraparcs", "wordwrapentities", "watermark"],
  constants: ["true", "false", "on", "off", "auto"],
  attributes: null,
  brackets: ["\\{", "\\}"],
  arcsWords: ["note", "abox", "rbox", "box", "alt", "else", "opt", "break", "par", "seq", "strict", "neg", "critical", "ignore", "consider", "assert", "loop", "ref", "exc"],
  arcsOthers: ["\\|\\|\\|", "\\.\\.\\.", "---", "--", "<->", "==", "<<=>>", "<=>", "\\.\\.", "<<>>", "::", "<:>", "->", "=>>", "=>", ">>", ":>", "<-", "<<=", "<=", "<<", "<:", "x-", "-x"],
  singlecomment: ["//", "#"],
  operators: ["="]
}), b = c({
  keywords: ["msc", "xu"],
  options: ["hscale", "width", "arcgradient", "wordwraparcs", "wordwrapentities", "watermark"],
  constants: ["true", "false", "on", "off", "auto"],
  attributes: ["label", "idurl", "id", "url", "linecolor", "linecolour", "textcolor", "textcolour", "textbgcolor", "textbgcolour", "arclinecolor", "arclinecolour", "arctextcolor", "arctextcolour", "arctextbgcolor", "arctextbgcolour", "arcskip", "title", "deactivate", "activate", "activation"],
  brackets: ["\\{", "\\}"],
  // [ and  ] are brackets too, but these get handled in with lists
  arcsWords: ["note", "abox", "rbox", "box", "alt", "else", "opt", "break", "par", "seq", "strict", "neg", "critical", "ignore", "consider", "assert", "loop", "ref", "exc"],
  arcsOthers: ["\\|\\|\\|", "\\.\\.\\.", "---", "--", "<->", "==", "<<=>>", "<=>", "\\.\\.", "<<>>", "::", "<:>", "->", "=>>", "=>", ">>", ":>", "<-", "<<=", "<=", "<<", "<:", "x-", "-x"],
  singlecomment: ["//", "#"],
  operators: ["="]
});
function n(t) {
  return new RegExp("^\\b(" + t.join("|") + ")\\b", "i");
}
function o(t) {
  return new RegExp("^(?:" + t.join("|") + ")", "i");
}
function i() {
  return {
    inComment: !1,
    inString: !1,
    inAttributeList: !1,
    inScript: !1
  };
}
function s(t) {
  return {
    inComment: t.inComment,
    inString: t.inString,
    inAttributeList: t.inAttributeList,
    inScript: t.inScript
  };
}
function u(t) {
  return function(r, e) {
    if (r.match(o(t.brackets), !0, !0))
      return "bracket";
    if (!e.inComment) {
      if (r.match(/\/\*[^\*\/]*/, !0, !0))
        return e.inComment = !0, "comment";
      if (r.match(o(t.singlecomment), !0, !0))
        return r.skipToEnd(), "comment";
    }
    if (e.inComment)
      return r.match(/[^\*\/]*\*\//, !0, !0) ? e.inComment = !1 : r.skipToEnd(), "comment";
    if (!e.inString && r.match(/\"(\\\"|[^\"])*/, !0, !0))
      return e.inString = !0, "string";
    if (e.inString)
      return r.match(/[^\"]*\"/, !0, !0) ? e.inString = !1 : r.skipToEnd(), "string";
    if (t.keywords && r.match(n(t.keywords), !0, !0) || r.match(n(t.options), !0, !0) || r.match(n(t.arcsWords), !0, !0) || r.match(o(t.arcsOthers), !0, !0))
      return "keyword";
    if (t.operators && r.match(o(t.operators), !0, !0))
      return "operator";
    if (t.constants && r.match(o(t.constants), !0, !0))
      return "variable";
    if (!t.inAttributeList && t.attributes && r.match("[", !0, !0))
      return t.inAttributeList = !0, "bracket";
    if (t.inAttributeList) {
      if (t.attributes !== null && r.match(n(t.attributes), !0, !0))
        return "attribute";
      if (r.match("]", !0, !0))
        return t.inAttributeList = !1, "bracket";
    }
    return r.next(), null;
  };
}
export {
  a as mscgen,
  l as msgenny,
  b as xu
};
