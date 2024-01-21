function fr(x) {
  var pr = x.statementIndent, ur = x.jsonld, br = x.json || ur, k = x.typescript, U = x.wordCharacters || /[\w$\xa1-\uffff]/, wr = function() {
    function r(y) {
      return { type: y, style: "keyword" };
    }
    var e = r("keyword a"), t = r("keyword b"), f = r("keyword c"), u = r("keyword d"), c = r("operator"), m = { type: "atom", style: "atom" };
    return {
      if: r("if"),
      while: e,
      with: e,
      else: t,
      do: t,
      try: t,
      finally: t,
      return: u,
      break: u,
      continue: u,
      new: r("new"),
      delete: f,
      void: f,
      throw: f,
      debugger: r("debugger"),
      var: r("var"),
      const: r("var"),
      let: r("var"),
      function: r("function"),
      catch: r("catch"),
      for: r("for"),
      switch: r("switch"),
      case: r("case"),
      default: r("default"),
      in: c,
      typeof: c,
      instanceof: c,
      true: m,
      false: m,
      null: m,
      undefined: m,
      NaN: m,
      Infinity: m,
      this: r("this"),
      class: r("class"),
      super: r("atom"),
      yield: f,
      export: r("export"),
      import: r("import"),
      extends: f,
      await: f
    };
  }(), hr = /[+\-*&%=<>!?|~^@]/, Or = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
  function qr(r) {
    for (var e = !1, t, f = !1; (t = r.next()) != null; ) {
      if (!e) {
        if (t == "/" && !f)
          return;
        t == "[" ? f = !0 : f && t == "]" && (f = !1);
      }
      e = !e && t == "\\";
    }
  }
  var D, G;
  function b(r, e, t) {
    return D = r, G = t, e;
  }
  function S(r, e) {
    var t = r.next();
    if (t == '"' || t == "'")
      return e.tokenize = Nr(t), e.tokenize(r, e);
    if (t == "." && r.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))
      return b("number", "number");
    if (t == "." && r.match(".."))
      return b("spread", "meta");
    if (/[\[\]{}\(\),;\:\.]/.test(t))
      return b(t);
    if (t == "=" && r.eat(">"))
      return b("=>", "operator");
    if (t == "0" && r.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))
      return b("number", "number");
    if (/\d/.test(t))
      return r.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), b("number", "number");
    if (t == "/")
      return r.eat("*") ? (e.tokenize = H, H(r, e)) : r.eat("/") ? (r.skipToEnd(), b("comment", "comment")) : ce(r, e, 1) ? (qr(r), r.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), b("regexp", "string.special")) : (r.eat("="), b("operator", "operator", r.current()));
    if (t == "`")
      return e.tokenize = L, L(r, e);
    if (t == "#" && r.peek() == "!")
      return r.skipToEnd(), b("meta", "meta");
    if (t == "#" && r.eatWhile(U))
      return b("variable", "property");
    if (t == "<" && r.match("!--") || t == "-" && r.match("->") && !/\S/.test(r.string.slice(0, r.start)))
      return r.skipToEnd(), b("comment", "comment");
    if (hr.test(t))
      return (t != ">" || !e.lexical || e.lexical.type != ">") && (r.eat("=") ? (t == "!" || t == "=") && r.eat("=") : /[<>*+\-|&?]/.test(t) && (r.eat(t), t == ">" && r.eat(t))), t == "?" && r.eat(".") ? b(".") : b("operator", "operator", r.current());
    if (U.test(t)) {
      r.eatWhile(U);
      var f = r.current();
      if (e.lastType != ".") {
        if (wr.propertyIsEnumerable(f)) {
          var u = wr[f];
          return b(u.type, u.style, f);
        }
        if (f == "async" && r.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1))
          return b("async", "keyword", f);
      }
      return b("variable", "variable", f);
    }
  }
  function Nr(r) {
    return function(e, t) {
      var f = !1, u;
      if (ur && e.peek() == "@" && e.match(Or))
        return t.tokenize = S, b("jsonld-keyword", "meta");
      for (; (u = e.next()) != null && !(u == r && !f); )
        f = !f && u == "\\";
      return f || (t.tokenize = S), b("string", "string");
    };
  }
  function H(r, e) {
    for (var t = !1, f; f = r.next(); ) {
      if (f == "/" && t) {
        e.tokenize = S;
        break;
      }
      t = f == "*";
    }
    return b("comment", "comment");
  }
  function L(r, e) {
    for (var t = !1, f; (f = r.next()) != null; ) {
      if (!t && (f == "`" || f == "$" && r.eat("{"))) {
        e.tokenize = S;
        break;
      }
      t = !t && f == "\\";
    }
    return b("quasi", "string.special", r.current());
  }
  var Br = "([{}])";
  function ar(r, e) {
    e.fatArrowAt && (e.fatArrowAt = null);
    var t = r.string.indexOf("=>", r.start);
    if (!(t < 0)) {
      if (k) {
        var f = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(r.string.slice(r.start, t));
        f && (t = f.index);
      }
      for (var u = 0, c = !1, m = t - 1; m >= 0; --m) {
        var y = r.string.charAt(m), v = Br.indexOf(y);
        if (v >= 0 && v < 3) {
          if (!u) {
            ++m;
            break;
          }
          if (--u == 0) {
            y == "(" && (c = !0);
            break;
          }
        } else if (v >= 3 && v < 6)
          ++u;
        else if (U.test(y))
          c = !0;
        else if (/["'\/`]/.test(y))
          for (; ; --m) {
            if (m == 0)
              return;
            var K = r.string.charAt(m - 1);
            if (K == y && r.string.charAt(m - 2) != "\\") {
              m--;
              break;
            }
          }
        else if (c && !u) {
          ++m;
          break;
        }
      }
      c && !u && (e.fatArrowAt = m);
    }
  }
  var Fr = {
    atom: !0,
    number: !0,
    variable: !0,
    string: !0,
    regexp: !0,
    this: !0,
    import: !0,
    "jsonld-keyword": !0
  };
  function xr(r, e, t, f, u, c) {
    this.indented = r, this.column = e, this.type = t, this.prev = u, this.info = c, f != null && (this.align = f);
  }
  function Jr(r, e) {
    for (var t = r.localVars; t; t = t.next)
      if (t.name == e)
        return !0;
    for (var f = r.context; f; f = f.prev)
      for (var t = f.vars; t; t = t.next)
        if (t.name == e)
          return !0;
  }
  function Mr(r, e, t, f, u) {
    var c = r.cc;
    for (i.state = r, i.stream = u, i.marked = null, i.cc = c, i.style = e, r.lexical.hasOwnProperty("align") || (r.lexical.align = !0); ; ) {
      var m = c.length ? c.pop() : br ? p : w;
      if (m(t, f)) {
        for (; c.length && c[c.length - 1].lex; )
          c.pop()();
        return i.marked ? i.marked : t == "variable" && Jr(r, f) ? "variableName.local" : e;
      }
    }
  }
  var i = { state: null, column: null, marked: null, cc: null };
  function o() {
    for (var r = arguments.length - 1; r >= 0; r--)
      i.cc.push(arguments[r]);
  }
  function n() {
    return o.apply(null, arguments), !0;
  }
  function or(r, e) {
    for (var t = e; t; t = t.next)
      if (t.name == r)
        return !0;
    return !1;
  }
  function q(r) {
    var e = i.state;
    if (i.marked = "def", e.context) {
      if (e.lexical.info == "var" && e.context && e.context.block) {
        var t = gr(r, e.context);
        if (t != null) {
          e.context = t;
          return;
        }
      } else if (!or(r, e.localVars)) {
        e.localVars = new Q(r, e.localVars);
        return;
      }
    }
    x.globalVars && !or(r, e.globalVars) && (e.globalVars = new Q(r, e.globalVars));
  }
  function gr(r, e) {
    if (e)
      if (e.block) {
        var t = gr(r, e.prev);
        return t ? t == e.prev ? e : new P(t, e.vars, !0) : null;
      } else
        return or(r, e.vars) ? e : new P(e.prev, new Q(r, e.vars), !1);
    else
      return null;
  }
  function X(r) {
    return r == "public" || r == "private" || r == "protected" || r == "abstract" || r == "readonly";
  }
  function P(r, e, t) {
    this.prev = r, this.vars = e, this.block = t;
  }
  function Q(r, e) {
    this.name = r, this.next = e;
  }
  var Dr = new Q("this", new Q("arguments", null));
  function E() {
    i.state.context = new P(i.state.context, i.state.localVars, !1), i.state.localVars = Dr;
  }
  function Y() {
    i.state.context = new P(i.state.context, i.state.localVars, !0), i.state.localVars = null;
  }
  E.lex = Y.lex = !0;
  function T() {
    i.state.localVars = i.state.context.vars, i.state.context = i.state.context.prev;
  }
  T.lex = !0;
  function s(r, e) {
    var t = function() {
      var f = i.state, u = f.indented;
      if (f.lexical.type == "stat")
        u = f.lexical.indented;
      else
        for (var c = f.lexical; c && c.type == ")" && c.align; c = c.prev)
          u = c.indented;
      f.lexical = new xr(u, i.stream.column(), r, null, f.lexical, e);
    };
    return t.lex = !0, t;
  }
  function a() {
    var r = i.state;
    r.lexical.prev && (r.lexical.type == ")" && (r.indented = r.lexical.indented), r.lexical = r.lexical.prev);
  }
  a.lex = !0;
  function l(r) {
    function e(t) {
      return t == r ? n() : r == ";" || t == "}" || t == ")" || t == "]" ? o() : n(e);
    }
    return e;
  }
  function w(r, e) {
    return r == "var" ? n(s("vardef", e), mr, l(";"), a) : r == "keyword a" ? n(s("form"), sr, w, a) : r == "keyword b" ? n(s("form"), w, a) : r == "keyword d" ? i.stream.match(/^\s*$/, !1) ? n() : n(s("stat"), N, l(";"), a) : r == "debugger" ? n(l(";")) : r == "{" ? n(s("}"), Y, rr, a, T) : r == ";" ? n() : r == "if" ? (i.state.lexical.info == "else" && i.state.cc[i.state.cc.length - 1] == a && i.state.cc.pop()(), n(s("form"), sr, w, a, jr)) : r == "function" ? n(_) : r == "for" ? n(s("form"), Y, zr, w, T, a) : r == "class" || k && e == "interface" ? (i.marked = "keyword", n(s("form", r == "class" ? r : e), Sr, a)) : r == "variable" ? k && e == "declare" ? (i.marked = "keyword", n(w)) : k && (e == "module" || e == "enum" || e == "type") && i.stream.match(/^\s*\w/, !1) ? (i.marked = "keyword", e == "enum" ? n($r) : e == "type" ? n(_r, l("operator"), d, l(";")) : n(s("form"), V, l("{"), s("}"), rr, a, a)) : k && e == "namespace" ? (i.marked = "keyword", n(s("form"), p, w, a)) : k && e == "abstract" ? (i.marked = "keyword", n(w)) : n(s("stat"), Kr) : r == "switch" ? n(
      s("form"),
      sr,
      l("{"),
      s("}", "switch"),
      Y,
      rr,
      a,
      a,
      T
    ) : r == "case" ? n(p, l(":")) : r == "default" ? n(l(":")) : r == "catch" ? n(s("form"), E, Lr, w, a, T) : r == "export" ? n(s("stat"), fe, a) : r == "import" ? n(s("stat"), ue, a) : r == "async" ? n(w) : e == "@" ? n(p, w) : o(s("stat"), p, l(";"), a);
  }
  function Lr(r) {
    if (r == "(")
      return n(O, l(")"));
  }
  function p(r, e) {
    return yr(r, e, !1);
  }
  function g(r, e) {
    return yr(r, e, !0);
  }
  function sr(r) {
    return r != "(" ? o() : n(s(")"), N, l(")"), a);
  }
  function yr(r, e, t) {
    if (i.state.fatArrowAt == i.stream.start) {
      var f = t ? Tr : vr;
      if (r == "(")
        return n(E, s(")"), h(O, ")"), a, l("=>"), f, T);
      if (r == "variable")
        return o(E, V, l("=>"), f, T);
    }
    var u = t ? B : I;
    return Fr.hasOwnProperty(r) ? n(u) : r == "function" ? n(_, u) : r == "class" || k && e == "interface" ? (i.marked = "keyword", n(s("form"), ie, a)) : r == "keyword c" || r == "async" ? n(t ? g : p) : r == "(" ? n(s(")"), N, l(")"), a, u) : r == "operator" || r == "spread" ? n(t ? g : p) : r == "[" ? n(s("]"), oe, a, u) : r == "{" ? R(C, "}", null, u) : r == "quasi" ? o(Z, u) : r == "new" ? n(Qr(t)) : n();
  }
  function N(r) {
    return r.match(/[;\}\)\],]/) ? o() : o(p);
  }
  function I(r, e) {
    return r == "," ? n(N) : B(r, e, !1);
  }
  function B(r, e, t) {
    var f = t == !1 ? I : B, u = t == !1 ? p : g;
    if (r == "=>")
      return n(E, t ? Tr : vr, T);
    if (r == "operator")
      return /\+\+|--/.test(e) || k && e == "!" ? n(f) : k && e == "<" && i.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1) ? n(s(">"), h(d, ">"), a, f) : e == "?" ? n(p, l(":"), u) : n(u);
    if (r == "quasi")
      return o(Z, f);
    if (r != ";") {
      if (r == "(")
        return R(g, ")", "call", f);
      if (r == ".")
        return n(Ur, f);
      if (r == "[")
        return n(s("]"), N, l("]"), a, f);
      if (k && e == "as")
        return i.marked = "keyword", n(d, f);
      if (r == "regexp")
        return i.state.lastType = i.marked = "operator", i.stream.backUp(i.stream.pos - i.stream.start - 1), n(u);
    }
  }
  function Z(r, e) {
    return r != "quasi" ? o() : e.slice(e.length - 2) != "${" ? n(Z) : n(N, Pr);
  }
  function Pr(r) {
    if (r == "}")
      return i.marked = "string.special", i.state.tokenize = L, n(Z);
  }
  function vr(r) {
    return ar(i.stream, i.state), o(r == "{" ? w : p);
  }
  function Tr(r) {
    return ar(i.stream, i.state), o(r == "{" ? w : g);
  }
  function Qr(r) {
    return function(e) {
      return e == "." ? n(r ? Wr : Rr) : e == "variable" && k ? n(Cr, r ? B : I) : o(r ? g : p);
    };
  }
  function Rr(r, e) {
    if (e == "target")
      return i.marked = "keyword", n(I);
  }
  function Wr(r, e) {
    if (e == "target")
      return i.marked = "keyword", n(B);
  }
  function Kr(r) {
    return r == ":" ? n(a, w) : o(I, l(";"), a);
  }
  function Ur(r) {
    if (r == "variable")
      return i.marked = "property", n();
  }
  function C(r, e) {
    if (r == "async")
      return i.marked = "property", n(C);
    if (r == "variable" || i.style == "keyword") {
      if (i.marked = "property", e == "get" || e == "set")
        return n(Gr);
      var t;
      return k && i.state.fatArrowAt == i.stream.start && (t = i.stream.match(/^\s*:\s*/, !1)) && (i.state.fatArrowAt = i.stream.pos + t[0].length), n($);
    } else {
      if (r == "number" || r == "string")
        return i.marked = ur ? "property" : i.style + " property", n($);
      if (r == "jsonld-keyword")
        return n($);
      if (k && X(e))
        return i.marked = "keyword", n(C);
      if (r == "[")
        return n(p, F, l("]"), $);
      if (r == "spread")
        return n(g, $);
      if (e == "*")
        return i.marked = "keyword", n(C);
      if (r == ":")
        return o($);
    }
  }
  function Gr(r) {
    return r != "variable" ? o($) : (i.marked = "property", n(_));
  }
  function $(r) {
    if (r == ":")
      return n(g);
    if (r == "(")
      return o(_);
  }
  function h(r, e, t) {
    function f(u, c) {
      if (t ? t.indexOf(u) > -1 : u == ",") {
        var m = i.state.lexical;
        return m.info == "call" && (m.pos = (m.pos || 0) + 1), n(function(y, v) {
          return y == e || v == e ? o() : o(r);
        }, f);
      }
      return u == e || c == e ? n() : t && t.indexOf(";") > -1 ? o(r) : n(l(e));
    }
    return function(u, c) {
      return u == e || c == e ? n() : o(r, f);
    };
  }
  function R(r, e, t) {
    for (var f = 3; f < arguments.length; f++)
      i.cc.push(arguments[f]);
    return n(s(e, t), h(r, e), a);
  }
  function rr(r) {
    return r == "}" ? n() : o(w, rr);
  }
  function F(r, e) {
    if (k) {
      if (r == ":")
        return n(d);
      if (e == "?")
        return n(F);
    }
  }
  function Hr(r, e) {
    if (k && (r == ":" || e == "in"))
      return n(d);
  }
  function Vr(r) {
    if (k && r == ":")
      return i.stream.match(/^\s*\w+\s+is\b/, !1) ? n(p, Xr, d) : n(d);
  }
  function Xr(r, e) {
    if (e == "is")
      return i.marked = "keyword", n();
  }
  function d(r, e) {
    if (e == "keyof" || e == "typeof" || e == "infer" || e == "readonly")
      return i.marked = "keyword", n(e == "typeof" ? g : d);
    if (r == "variable" || e == "void")
      return i.marked = "type", n(A);
    if (e == "|" || e == "&")
      return n(d);
    if (r == "string" || r == "number" || r == "atom")
      return n(A);
    if (r == "[")
      return n(s("]"), h(d, "]", ","), a, A);
    if (r == "{")
      return n(s("}"), lr, a, A);
    if (r == "(")
      return n(h(dr, ")"), Yr, A);
    if (r == "<")
      return n(h(d, ">"), d);
    if (r == "quasi")
      return o(cr, A);
  }
  function Yr(r) {
    if (r == "=>")
      return n(d);
  }
  function lr(r) {
    return r.match(/[\}\)\]]/) ? n() : r == "," || r == ";" ? n(lr) : o(W, lr);
  }
  function W(r, e) {
    if (r == "variable" || i.style == "keyword")
      return i.marked = "property", n(W);
    if (e == "?" || r == "number" || r == "string")
      return n(W);
    if (r == ":")
      return n(d);
    if (r == "[")
      return n(l("variable"), Hr, l("]"), W);
    if (r == "(")
      return o(M, W);
    if (!r.match(/[;\}\)\],]/))
      return n();
  }
  function cr(r, e) {
    return r != "quasi" ? o() : e.slice(e.length - 2) != "${" ? n(cr) : n(d, Zr);
  }
  function Zr(r) {
    if (r == "}")
      return i.marked = "string.special", i.state.tokenize = L, n(cr);
  }
  function dr(r, e) {
    return r == "variable" && i.stream.match(/^\s*[?:]/, !1) || e == "?" ? n(dr) : r == ":" ? n(d) : r == "spread" ? n(dr) : o(d);
  }
  function A(r, e) {
    if (e == "<")
      return n(s(">"), h(d, ">"), a, A);
    if (e == "|" || r == "." || e == "&")
      return n(d);
    if (r == "[")
      return n(d, l("]"), A);
    if (e == "extends" || e == "implements")
      return i.marked = "keyword", n(d);
    if (e == "?")
      return n(d, l(":"), d);
  }
  function Cr(r, e) {
    if (e == "<")
      return n(s(">"), h(d, ">"), a, A);
  }
  function er() {
    return o(d, re);
  }
  function re(r, e) {
    if (e == "=")
      return n(d);
  }
  function mr(r, e) {
    return e == "enum" ? (i.marked = "keyword", n($r)) : o(V, F, z, ne);
  }
  function V(r, e) {
    if (k && X(e))
      return i.marked = "keyword", n(V);
    if (r == "variable")
      return q(e), n();
    if (r == "spread")
      return n(V);
    if (r == "[")
      return R(ee, "]");
    if (r == "{")
      return R(Ar, "}");
  }
  function Ar(r, e) {
    return r == "variable" && !i.stream.match(/^\s*:/, !1) ? (q(e), n(z)) : (r == "variable" && (i.marked = "property"), r == "spread" ? n(V) : r == "}" ? o() : r == "[" ? n(p, l("]"), l(":"), Ar) : n(l(":"), V, z));
  }
  function ee() {
    return o(V, z);
  }
  function z(r, e) {
    if (e == "=")
      return n(g);
  }
  function ne(r) {
    if (r == ",")
      return n(mr);
  }
  function jr(r, e) {
    if (r == "keyword b" && e == "else")
      return n(s("form", "else"), w, a);
  }
  function zr(r, e) {
    if (e == "await")
      return n(zr);
    if (r == "(")
      return n(s(")"), te, a);
  }
  function te(r) {
    return r == "var" ? n(mr, J) : r == "variable" ? n(J) : o(J);
  }
  function J(r, e) {
    return r == ")" ? n() : r == ";" ? n(J) : e == "in" || e == "of" ? (i.marked = "keyword", n(p, J)) : o(p, J);
  }
  function _(r, e) {
    if (e == "*")
      return i.marked = "keyword", n(_);
    if (r == "variable")
      return q(e), n(_);
    if (r == "(")
      return n(E, s(")"), h(O, ")"), a, Vr, w, T);
    if (k && e == "<")
      return n(s(">"), h(er, ">"), a, _);
  }
  function M(r, e) {
    if (e == "*")
      return i.marked = "keyword", n(M);
    if (r == "variable")
      return q(e), n(M);
    if (r == "(")
      return n(E, s(")"), h(O, ")"), a, Vr, T);
    if (k && e == "<")
      return n(s(">"), h(er, ">"), a, M);
  }
  function _r(r, e) {
    if (r == "keyword" || r == "variable")
      return i.marked = "type", n(_r);
    if (e == "<")
      return n(s(">"), h(er, ">"), a);
  }
  function O(r, e) {
    return e == "@" && n(p, O), r == "spread" ? n(O) : k && X(e) ? (i.marked = "keyword", n(O)) : k && r == "this" ? n(F, z) : o(V, F, z);
  }
  function ie(r, e) {
    return r == "variable" ? Sr(r, e) : nr(r, e);
  }
  function Sr(r, e) {
    if (r == "variable")
      return q(e), n(nr);
  }
  function nr(r, e) {
    if (e == "<")
      return n(s(">"), h(er, ">"), a, nr);
    if (e == "extends" || e == "implements" || k && r == ",")
      return e == "implements" && (i.marked = "keyword"), n(k ? d : p, nr);
    if (r == "{")
      return n(s("}"), j, a);
  }
  function j(r, e) {
    if (r == "async" || r == "variable" && (e == "static" || e == "get" || e == "set" || k && X(e)) && i.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
      return i.marked = "keyword", n(j);
    if (r == "variable" || i.style == "keyword")
      return i.marked = "property", n(tr, j);
    if (r == "number" || r == "string")
      return n(tr, j);
    if (r == "[")
      return n(p, F, l("]"), tr, j);
    if (e == "*")
      return i.marked = "keyword", n(j);
    if (k && r == "(")
      return o(M, j);
    if (r == ";" || r == ",")
      return n(j);
    if (r == "}")
      return n();
    if (e == "@")
      return n(p, j);
  }
  function tr(r, e) {
    if (e == "!" || e == "?")
      return n(tr);
    if (r == ":")
      return n(d, z);
    if (e == "=")
      return n(g);
    var t = i.state.lexical.prev, f = t && t.info == "interface";
    return o(f ? M : _);
  }
  function fe(r, e) {
    return e == "*" ? (i.marked = "keyword", n(kr, l(";"))) : e == "default" ? (i.marked = "keyword", n(p, l(";"))) : r == "{" ? n(h(Er, "}"), kr, l(";")) : o(w);
  }
  function Er(r, e) {
    if (e == "as")
      return i.marked = "keyword", n(l("variable"));
    if (r == "variable")
      return o(g, Er);
  }
  function ue(r) {
    return r == "string" ? n() : r == "(" ? o(p) : r == "." ? o(I) : o(ir, Ir, kr);
  }
  function ir(r, e) {
    return r == "{" ? R(ir, "}") : (r == "variable" && q(e), e == "*" && (i.marked = "keyword"), n(ae));
  }
  function Ir(r) {
    if (r == ",")
      return n(ir, Ir);
  }
  function ae(r, e) {
    if (e == "as")
      return i.marked = "keyword", n(ir);
  }
  function kr(r, e) {
    if (e == "from")
      return i.marked = "keyword", n(p);
  }
  function oe(r) {
    return r == "]" ? n() : o(h(g, "]"));
  }
  function $r() {
    return o(s("form"), V, l("{"), s("}"), h(se, "}"), a, a);
  }
  function se() {
    return o(V, z);
  }
  function le(r, e) {
    return r.lastType == "operator" || r.lastType == "," || hr.test(e.charAt(0)) || /[,.]/.test(e.charAt(0));
  }
  function ce(r, e, t) {
    return e.tokenize == S && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(e.lastType) || e.lastType == "quasi" && /\{\s*$/.test(r.string.slice(0, r.pos - (t || 0)));
  }
  return {
    name: x.name,
    startState: function(r) {
      var e = {
        tokenize: S,
        lastType: "sof",
        cc: [],
        lexical: new xr(-r, 0, "block", !1),
        localVars: x.localVars,
        context: x.localVars && new P(null, null, !1),
        indented: 0
      };
      return x.globalVars && typeof x.globalVars == "object" && (e.globalVars = x.globalVars), e;
    },
    token: function(r, e) {
      if (r.sol() && (e.lexical.hasOwnProperty("align") || (e.lexical.align = !1), e.indented = r.indentation(), ar(r, e)), e.tokenize != H && r.eatSpace())
        return null;
      var t = e.tokenize(r, e);
      return D == "comment" ? t : (e.lastType = D == "operator" && (G == "++" || G == "--") ? "incdec" : D, Mr(e, t, D, G, r));
    },
    indent: function(r, e, t) {
      if (r.tokenize == H || r.tokenize == L)
        return null;
      if (r.tokenize != S)
        return 0;
      var f = e && e.charAt(0), u = r.lexical, c;
      if (!/^\s*else\b/.test(e))
        for (var m = r.cc.length - 1; m >= 0; --m) {
          var y = r.cc[m];
          if (y == a)
            u = u.prev;
          else if (y != jr && y != T)
            break;
        }
      for (; (u.type == "stat" || u.type == "form") && (f == "}" || (c = r.cc[r.cc.length - 1]) && (c == I || c == B) && !/^[,\.=+\-*:?[\(]/.test(e)); )
        u = u.prev;
      pr && u.type == ")" && u.prev.type == "stat" && (u = u.prev);
      var v = u.type, K = f == v;
      return v == "vardef" ? u.indented + (r.lastType == "operator" || r.lastType == "," ? u.info.length + 1 : 0) : v == "form" && f == "{" ? u.indented : v == "form" ? u.indented + t.unit : v == "stat" ? u.indented + (le(r, e) ? pr || t.unit : 0) : u.info == "switch" && !K && x.doubleIndentSwitch != !1 ? u.indented + (/^(?:case|default)\b/.test(e) ? t.unit : 2 * t.unit) : u.align ? u.column + (K ? 0 : 1) : u.indented + (K ? 0 : t.unit);
    },
    languageData: {
      indentOnInput: /^\s*(?:case .*?:|default:|\{|\})$/,
      commentTokens: br ? void 0 : { line: "//", block: { open: "/*", close: "*/" } },
      closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
      wordChars: "$"
    }
  };
}
const de = fr({ name: "javascript" }), me = fr({ name: "json", json: !0 }), ke = fr({ name: "json", jsonld: !0 }), pe = fr({ name: "typescript", typescript: !0 });
export {
  de as javascript,
  me as json,
  ke as jsonld,
  pe as typescript
};
