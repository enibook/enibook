import { a as p, g as u, s as l, t, j as m, p as n, L as b, m as r, n as S } from "./enibook-uiH8CL3S.js";
const c = /* @__PURE__ */ b.deserialize({
  version: 14,
  states: "%pOVOWOOObQPOOOpOSO'#C_OOOO'#Cp'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO'#CiO#RO`O'#CiQOQPOOO#ZO#tO'#CmO#fO!bO'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO'#Cr'#CrO#{O#tO,59XOOQO,59X,59XOOOO'#Cs'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q",
  stateData: "$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~",
  goto: "!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso",
  nodeNames: "⚠ Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity",
  maxTerm: 36,
  nodeProps: [
    ["isolate", -3, 3, 13, 17, ""]
  ],
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "'y~RdXY!aYZ!a]^!apq!ars!rwx!w}!O!|!O!P#t!Q![#y![!]$s!_!`%g!b!c%l!c!}#y#R#S#y#T#j#y#j#k%q#k#o#y%W;'S#y;'S;:j$m<%lO#y~!fSj~XY!aYZ!a]^!apq!a~!wOm~~!|Oo~!b#RX`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|!b#qP;=`<%l!|~#yOl~%W$QXY#t`!b}!O!|!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y%W$pP;=`<%l#y~$zXX~`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|~%lO[~~%qOZ~%W%xXY#t`!b}!O&e!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y!b&jX`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|!b'^XW!b`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|",
  tokenizers: [6, 7, /* @__PURE__ */ new r("b~RP#q#rU~XP#q#r[~aOT~~", 17, 4), /* @__PURE__ */ new r("!k~RQvwX#o#p!_~^TU~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOU~~![P;=`<%lm~!bP#o#p!e~!jOk~~", 72, 2), /* @__PURE__ */ new r("[~RPwxU~ZOp~~", 11, 15), /* @__PURE__ */ new r("[~RPrsU~ZOn~~", 11, 14), /* @__PURE__ */ new r("!e~RQvwXwx!_~^Tc~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOc~~![P;=`<%lm~!dOt~~", 66, 35), /* @__PURE__ */ new r("!e~RQrsXvw^~^Or~~cTb~Oprq!]r!^;'Sr;'S;=`!^<%lOr~uUOprq!]r!]!^!X!^;'Sr;'S;=`!^<%lOr~!^Ob~~!aP;=`<%lr~", 66, 33)],
  topRules: { Content: [0, 1], Attribute: [1, 7] },
  tokenPrec: 157
}), P = /* @__PURE__ */ S.parser.configure({
  top: "SingleExpression"
}), s = /* @__PURE__ */ c.configure({
  props: [
    /* @__PURE__ */ l({
      Text: t.content,
      Is: t.definitionOperator,
      AttributeName: t.attributeName,
      VueAttributeName: t.keyword,
      Identifier: t.variableName,
      "AttributeValue ScriptAttributeValue": t.attributeValue,
      Entity: t.character,
      "{{ }}": t.brace,
      "@ :": t.punctuation
    })
  ]
}), o = { parser: P }, Q = /* @__PURE__ */ s.configure({
  wrap: /* @__PURE__ */ n((O, e) => O.name == "InterpolationContent" ? o : null)
}), g = /* @__PURE__ */ s.configure({
  wrap: /* @__PURE__ */ n((O, e) => O.name == "AttributeScript" ? o : null),
  top: "Attribute"
}), y = { parser: Q }, R = { parser: g }, a = /* @__PURE__ */ m();
function i(O) {
  return O.configure({
    dialect: "selfClosing",
    wrap: n(X)
  }, "vue");
}
const T = /* @__PURE__ */ i(a.language);
function X(O, e) {
  switch (O.name) {
    case "Attribute":
      return /^(@|:|v-)/.test(e.read(O.from, O.from + 2)) ? R : null;
    case "Text":
      return y;
  }
  return null;
}
function f(O = {}) {
  let e = a;
  if (O.base) {
    if (O.base.language.name != "html" || !(O.base.language instanceof p))
      throw new RangeError("The base option must be the result of calling html(...)");
    e = O.base;
  }
  return new u(e.language == a.language ? T : i(e.language), [
    e.support,
    e.language.data.of({ closeBrackets: { brackets: ["{", '"'] } })
  ]);
}
export {
  f as vue,
  T as vueLanguage
};
