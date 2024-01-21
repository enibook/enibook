import { E as P, C as G, L as k } from "./index-qghppKYg.js";
import { s as E, t as i, e as _, i as U, L as z, b as j, h as $, f as A, j as F, a as I, I as C, c as N, B as D, D as S } from "./enibook-exX2ta71.js";
const L = 1, m = 206, y = 207, H = 208, c = 209, J = 210, B = 211, M = 212, K = 2, OO = 213, rO = 214, oO = 3, aO = 215, iO = 216, eO = 4, QO = 217, xO = 218, SO = 5, sO = 219, TO = 26, tO = 27, nO = 51, PO = 52, lO = 57, pO = 58, $O = 59, qO = 61, XO = 62, wO = 63, dO = 64, YO = 65, cO = 67, ZO = 256, fO = 74, bO = 275, vO = 120, mO = 138, yO = 159, RO = 160, uO = 163, T = 10, t = 13, d = 32, l = 9, Y = 35, WO = 40, VO = 46, Z = 123, R = 39, u = 34, gO = 92, hO = /* @__PURE__ */ new Set([
  tO,
  nO,
  PO,
  bO,
  cO,
  mO,
  pO,
  $O,
  ZO,
  dO,
  YO,
  fO,
  XO,
  wO,
  yO,
  RO,
  uO,
  vO
]);
function q(O) {
  return O == T || O == t;
}
const GO = new P((O, r) => {
  let o;
  if (O.next < 0)
    O.acceptToken(B);
  else if (r.context.depth < 0)
    q(O.next) && O.acceptToken(J, 1);
  else if (((o = O.peek(-1)) < 0 || q(o)) && r.canShift(c)) {
    let a = 0;
    for (; O.next == d || O.next == l; )
      O.advance(), a++;
    (O.next == T || O.next == t || O.next == Y) && O.acceptToken(c, -a);
  } else
    q(O.next) && O.acceptToken(H, 1);
}, { contextual: !0 }), kO = new P((O, r) => {
  let o = r.context.depth;
  if (o < 0)
    return;
  let a = O.peek(-1);
  if (a == T || a == t) {
    let e = 0, Q = 0;
    for (; ; ) {
      if (O.next == d)
        e++;
      else if (O.next == l)
        e += 8 - e % 8;
      else
        break;
      O.advance(), Q++;
    }
    e != o && O.next != T && O.next != t && O.next != Y && (e < o ? O.acceptToken(y, -Q) : O.acceptToken(m));
  }
});
function w(O, r) {
  this.parent = O, this.depth = r, this.hash = (O ? O.hash + O.hash << 8 : 0) + r + (r << 4);
}
const EO = new w(null, 0);
function _O(O) {
  let r = 0;
  for (let o = 0; o < O.length; o++)
    r += O.charCodeAt(o) == l ? 8 - r % 8 : 1;
  return r;
}
const UO = new G({
  start: EO,
  reduce(O, r) {
    return O.depth < 0 && hO.has(r) ? O.parent : O;
  },
  shift(O, r, o, a) {
    return r == m ? new w(O, _O(a.read(a.pos, o.pos))) : r == y ? O.parent : r == TO || r == lO || r == qO ? new w(O, -1) : O;
  },
  hash(O) {
    return O.hash;
  }
}), zO = new P((O) => {
  for (let r = 0; r < 5; r++) {
    if (O.next != "print".charCodeAt(r))
      return;
    O.advance();
  }
  if (!/\w/.test(String.fromCharCode(O.next)))
    for (let r = 0; ; r++) {
      let o = O.peek(r);
      if (!(o == d || o == l)) {
        o != WO && o != VO && o != T && o != t && o != Y && O.acceptToken(L);
        return;
      }
    }
});
function p(O, r, o, a, e) {
  return new P((Q) => {
    let x = Q.pos;
    for (; !(Q.next < 0); )
      if (Q.next == Z)
        if (Q.peek(1) == Z)
          Q.advance(2);
        else {
          if (Q.pos == x) {
            Q.acceptToken(a, 1);
            return;
          }
          break;
        }
      else if (Q.next == gO)
        Q.advance(), Q.next >= 0 && Q.advance();
      else if (Q.next == O && (r == 1 || Q.peek(1) == O && Q.peek(2) == O)) {
        if (Q.pos == x) {
          Q.acceptToken(e, r);
          return;
        }
        break;
      } else
        Q.advance();
    Q.pos > x && Q.acceptToken(o);
  });
}
const jO = p(R, 1, M, K, OO), AO = p(u, 1, rO, oO, aO), FO = p(R, 3, iO, eO, QO), IO = p(u, 3, xO, SO, sO), CO = E({
  'async "*" "**" FormatConversion FormatSpec': i.modifier,
  "for while if elif else try except finally return raise break continue with pass assert await yield match case": i.controlKeyword,
  "in not and or is del": i.operatorKeyword,
  "from def class global nonlocal lambda": i.definitionKeyword,
  import: i.moduleKeyword,
  "with as print": i.keyword,
  Boolean: i.bool,
  None: i.null,
  VariableName: i.variableName,
  "CallExpression/VariableName": i.function(i.variableName),
  "FunctionDefinition/VariableName": i.function(i.definition(i.variableName)),
  "ClassDefinition/VariableName": i.definition(i.className),
  PropertyName: i.propertyName,
  "CallExpression/MemberExpression/PropertyName": i.function(i.propertyName),
  Comment: i.lineComment,
  Number: i.number,
  String: i.string,
  FormatString: i.special(i.string),
  UpdateOp: i.updateOperator,
  "ArithOp!": i.arithmeticOperator,
  BitOp: i.bitwiseOperator,
  CompareOp: i.compareOperator,
  AssignOp: i.definitionOperator,
  Ellipsis: i.punctuation,
  At: i.meta,
  "( )": i.paren,
  "[ ]": i.squareBracket,
  "{ }": i.brace,
  ".": i.derefOperator,
  ", ;": i.separator
}), NO = { __proto__: null, await: 48, or: 58, and: 60, in: 64, not: 66, is: 68, if: 74, else: 76, lambda: 80, yield: 98, from: 100, async: 106, for: 108, None: 178, True: 180, False: 180, del: 194, pass: 198, break: 202, continue: 206, return: 210, raise: 218, import: 222, as: 224, global: 228, nonlocal: 230, assert: 234, type: 239, elif: 252, while: 256, try: 262, except: 264, finally: 266, with: 270, def: 274, class: 284, match: 295, case: 301 }, DO = k.deserialize({
  version: 14,
  states: "#)WO`Q#yOOP$bOSOOO%kQ&nO'#HhOOQS'#Cq'#CqOOQS'#Cr'#CrO'ZQ#xO'#CpO(|Q&nO'#HgOOQS'#Hh'#HhOOQS'#DW'#DWOOQS'#Hg'#HgO)jQ#xO'#DaO)}Q#xO'#DhO*_Q#xO'#DlOOQS'#Dw'#DwO*rO,UO'#DwO*zO7[O'#DwO+SOWO'#DxO+_O`O'#DxO+jOpO'#DxO+uO!bO'#DxO-wQ&nO'#HXOOQS'#HX'#HXO'ZQ#xO'#HWO/ZQ&nO'#HWOOQS'#Ej'#EjO/rQ#xO'#EkOOQS'#HV'#HVO/|Q#xO'#HUOOQV'#HU'#HUO0XQ#xO'#FbOOQS'#Gj'#GjO0^Q#xO'#FaOOQV'#I_'#I_OOQV'#HT'#HTOOQV'#Fy'#FyQ`Q#yOOO'ZQ#xO'#CsO0lQ#xO'#DPO0sQ#xO'#DTO1RQ#xO'#HlO1cQ&nO'#E_O'ZQ#xO'#E`OOQS'#Eb'#EbOOQS'#Ed'#EdOOQS'#Ef'#EfO1wQ#xO'#EhO2_Q#xO'#ElO0XQ#xO'#EnO2rQ&nO'#EnO0XQ#xO'#EqO/rQ#xO'#EtO0XQ#xO'#EvO/rQ#xO'#E|O/rQ#xO'#FPO2}Q#xO'#FRO3UQ#xO'#FWO3aQ#xO'#FSO/rQ#xO'#FWO0XQ#xO'#FYO0XQ#xO'#F_O3fQ#xO'#FdP3mO#xO'#HSPOOO)CBv)CBvOOQS'#Cg'#CgOOQS'#Ch'#ChOOQS'#Ci'#CiOOQS'#Cj'#CjOOQS'#Ck'#CkOOQS'#Cl'#ClOOQS'#Cn'#CnO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO'ZQ#xO,59QO3xQ#xO'#DqOOQS,5:[,5:[O4]Q#xO'#HvOOQS,5:_,5:_O4jQMlO,5:_O4oQ&nO,59[O0lQ#xO,59dO0lQ#xO,59dO0lQ#xO,59dO7_Q#xO,59dO7dQ#xO,59dO7kQ#xO,59lO7rQ#xO'#HgO8xQ#xO'#HfOOQS'#Hf'#HfOOQS'#D^'#D^O9aQ#xO,59cO'ZQ#xO,59cO9oQ#xO,59cOOQS,59{,59{O9tQ#xO,5:TO'ZQ#xO,5:TOOQS,5:S,5:SO:SQ#xO,5:SO:XQ#xO,5:ZO'ZQ#xO,5:ZO'ZQ#xO,5:XOOQS,5:W,5:WO:jQ#xO,5:WO:oQ#xO,5:YOOOO'#GR'#GRO:tO,UO,5:cOOQS,5:c,5:cOOOO'#GS'#GSO:|O7[O,5:cO;UQ#xO'#DyOOOW'#GT'#GTO;fOWO,5:dOOQS,5:d,5:dO;UQ#xO'#EPOOO`'#GW'#GWO;qO`O,5:dO;UQ#xO'#EROOOp'#GX'#GXO;|OpO,5:dO;UQ#xO'#ETOOO!b'#GY'#GYO<XO!bO,5:dOOQS'#GZ'#GZO<dQ&nO,5:qO?UQ&nO,5=rO?oQ!LUO,5=rO@`Q&nO,5=rOOQS,5;V,5;VO@wQ#yO'#GdOBZQ#xO,5;fOOQV,5=p,5=pOBfQ&nO'#IYOB}Q#xO,5;|OOQS-E:h-E:hOOQV,5;{,5;{O3[Q#xO'#FYOOQV-E9w-E9wOCVQ&nO,59_OE^Q&nO,59kOEwQ#xO'#HiOFSQ#xO'#HiO0XQ#xO'#HiOF_Q#xO'#DVOFgQ#xO,59oOFlQ#xO'#HmO'ZQ#xO'#HmO/rQ#xO,5>WOOQS,5>W,5>WO/rQ#xO'#EZOOQS'#E['#E[OGZQ#xO'#G]OGkQ#xO,59OOGkQ#xO,59OO)pQ#xO,5:wOGyQ&nO'#HoOOQS,5:z,5:zOOQS,5;S,5;SOH^Q#xO,5;WOHoQ#xO,5;YOOQS'#G`'#G`OH}Q&nO,5;YOI]Q#xO,5;YOIbQ#xO'#I]OOQS,5;],5;]OIpQ#xO'#IXOOQS,5;`,5;`OJRQ#xO,5;bO3aQ#xO,5;hO3aQ#xO,5;kOJZQ&nO'#I`O'ZQ#xO'#I`OJeQ#xO,5;mO2}Q#xO,5;mO/rQ#xO,5;rO0XQ#xO,5;tOJjQ#yO'#E}OKvQ#{O,5;nO! [Q#xO'#IaO3aQ#xO,5;rO! gQ#xO,5;tO! oQ#xO,5;yO! zQ&nO,5<OO'ZQ#xO,5<OPOOO,5=n,5=nP!!ROSO,5=nP!!WO#xO,5=nO!${Q&nO1G.lO!%SQ&nO1G.lO!'sQ&nO1G.lO!'}Q&nO1G.lO!*hQ&nO1G.lO!*{Q&nO1G.lO!+`Q#xO'#HuO!+nQ&nO'#HXO/rQ#xO'#HuO!+xQ#xO'#HtOOQS,5:],5:]O!,QQ#xO,5:]O!,VQ#xO'#HwO!,bQ#xO'#HwO!,uQ#xO,5>bOOQS'#Du'#DuOOQS1G/y1G/yOOQS1G/O1G/OO!-uQ&nO1G/OO!-|Q&nO1G/OO0lQ#xO1G/OO!.iQ#xO1G/WOOQS'#D]'#D]O/rQ#xO,59vOOQS1G.}1G.}O!.pQ#xO1G/gO!/QQ#xO1G/gO!/YQ#xO1G/hO'ZQ#xO'#HnO!/_Q#xO'#HnO!/dQ&nO1G.}O!/tQ#xO,59kO!0zQ#xO,5>^O!1[Q#xO,5>^O!1dQ#xO1G/oO!1iQ&nO1G/oOOQS1G/n1G/nO!1yQ#xO,5>XO!2pQ#xO,5>XO/rQ#xO1G/sO!3_Q#xO1G/uO!3dQ&nO1G/uO!3tQ&nO1G/sOOQS1G/r1G/rOOQS1G/t1G/tOOOO-E:P-E:POOQS1G/}1G/}OOOO-E:Q-E:QO!4UQ#xO'#IRO/rQ#xO'#IRO!4gQ#xO,5:eOOOW-E:R-E:ROOQS1G0O1G0OO!4uQ#xO,5:kOOO`-E:U-E:UO!5TQ#xO,5:mOOOp-E:V-E:VO!5cQ#xO,5:oOOO!b-E:W-E:WOOQS-E:X-E:XO!5qQ!LUO1G3^O!6bQ&nO1G3^O'ZQ#xO,5<vOOQS,5<v,5<vOOQS-E:Y-E:YOOQS,5=O,5=OOOQS-E:b-E:bOOQV1G1Q1G1QO0XQ#xO'#G_O!6yQ&nO,5>tOOQS1G1h1G1hO!7bQ#xO1G1hOOQS'#DX'#DXO/rQ#xO,5>TOOQS,5>T,5>TO!7gQ#xO'#FzO!7rQ#xO,59qO!7zQ#xO1G/ZO!8UQ&nO,5>XOOQS1G3r1G3rOOQS,5:u,5:uO!8uQ#xO'#HWOOQS,5<w,5<wOOQS-E:Z-E:ZO!9WQ#xO1G.jOOQS1G0c1G0cO!9fQ#xO,5>ZO!9vQ#xO,5>ZO/rQ#xO1G0rO/rQ#xO1G0rO0XQ#xO1G0tOOQS-E:^-E:^O!:XQ#xO1G0tO!:dQ#xO1G0tO!:iQ#xO,5>wO!:wQ#xO,5>wO!;VQ#xO,5>sO!;mQ#xO,5>sO!<OQ#xO'#ExO/rQ#xO1G0|O!<ZQ#xO1G0|O!<`Q#{O1G1SO!?qQ#{O1G1VO!CPQ#xO,5>zO!CZQ#xO,5>zO!CcQ&nO,5>zO/rQ#xO1G1XO!CmQ#xO1G1XO3aQ#xO1G1^O! gQ#xO1G1`OOQV,5;i,5;iO!CrQ#zO,5;iO!CwQ#{O1G1YO!G]Q#xO'#GgO3aQ#xO1G1YO3aQ#xO1G1YO!GmQ#xO,5>{O!GzQ#xO,5>{O0XQ#xO,5>{OOQV1G1^1G1^O!HSQ#xO'#F[O!HeQMlO1G1`O!HmQ#xO1G1`OOQV1G1e1G1eO3aQ#xO1G1eO!HrQ#xO1G1eO!HzQ#xO'#FfOOQV1G1j1G1jO! zQ&nO1G1jPOOO1G3Y1G3YP!IPOSO1G3YOOQS,5>a,5>aOOQS'#Dr'#DrO/rQ#xO,5>aO!IUQ#xO,5>`O!IiQ#xO,5>`OOQS1G/w1G/wO!IqQ#xO,5>cO!JRQ#xO,5>cO!JZQ#xO,5>cO!JnQ#xO,5>cO!KOQ#xO,5>cOOQS1G3|1G3|OOQS7+$j7+$jO!7zQ#xO7+$rO!LqQ#xO1G/OO!LxQ#xO1G/OOOQS1G/b1G/bOOQS,5<h,5<hO'ZQ#xO,5<hOOQS7+%R7+%RO!MPQ#xO7+%ROOQS-E9z-E9zOOQS7+%S7+%SO!MaQ#xO,5>YO'ZQ#xO,5>YOOQS7+$i7+$iO!MfQ#xO7+%RO!MnQ#xO7+%SO!MsQ#xO1G3xOOQS7+%Z7+%ZO!NTQ#xO1G3xO!N]Q#xO7+%ZOOQS,5<g,5<gO'ZQ#xO,5<gO!NbQ#xO1G3sOOQS-E9y-E9yO# XQ#xO7+%_OOQS7+%a7+%aO# gQ#xO1G3sO#!UQ#xO7+%aO#!ZQ#xO1G3yO#!kQ#xO1G3yO#!sQ#xO7+%_O#!xQ#xO,5>mO##cQ#xO,5>mO##cQ#xO,5>mOOQS'#Dz'#DzO##tO$ISO'#D|O#$PO#tO'#ISOOOW1G0P1G0PO#$UQ#xO1G0PO#$^Q#xO1G0POOQS'#EQ'#EQOOO`1G0V1G0VO#$iQ#xO1G0VO#$qQ#xO1G0VOOQS'#ES'#ESOOOp1G0X1G0XO#$|Q#xO1G0XO#%UQ#xO1G0XOOQS'#EU'#EUOOO!b1G0Z1G0ZO#%aQ#xO1G0ZO#%iQ#xO1G0ZO#%tQ!LUO7+(xO#&eQ&nO1G2bP#'OQ#xO'#G[OOQS,5<y,5<yOOQS-E:]-E:]OOQS7+'S7+'SOOQS1G3o1G3oOOQS,5<f,5<fOOQS-E9x-E9xOOQS7+$u7+$uO#']Q#xO,5=rO#'vQ#xO,5=rO#(XQ&nO,5<iO#(lQ#xO1G3uOOQS-E9{-E9{OOQS7+&^7+&^O#(|Q#xO7+&^OOQS7+&`7+&`O#)[Q#xO'#I[O0XQ#xO'#IZO#)pQ#xO7+&`OOQS,5<|,5<|O#){Q#xO1G4cOOQS-E:`-E:`OOQS,5<x,5<xO#*ZQ#xO1G4_OOQS-E:[-E:[O0XQ#xO'#EyO#*qQ#xO'#EyO#*|Q#xO'#I^O#+UQ#xO,5;dOOQS7+&h7+&hO/rQ#xO7+&hO#+ZQ#{O7+&nO!G`Q#xO'#GeO3aQ#xO7+&nO3aQ#xO7+&qO#.lQ&nO,5=QO'ZQ#xO,5=QO#.vQ#xO1G4fOOQS-E:d-E:dO#/QQ#xO1G4fO3aQ#xO7+&sO/rQ#xO7+&sOOQV7+&x7+&xO!HeQMlO7+&zO!HmQ#xO7+&zO`Q#yO1G1TOOQV-E:e-E:eO3aQ#xO7+&tO3aQ#xO7+&tOOQV,5=R,5=RO#/YQ#xO,5=RO!G`Q#xO,5=ROOQV7+&t7+&tO#/eQ#{O7+&tO#2sQ#xO,5=SO#3OQ#xO1G4gOOQS-E:f-E:fO#3]Q#xO1G4gO#3eQ#xO'#IcO#3sQ#xO'#IcO0XQ#xO'#IcOOQS'#Ic'#IcO#4OQ#xO'#IbOOQS,5;v,5;vO#4WQ#xO,5;vO/rQ#xO'#F^OOQV7+&z7+&zO3aQ#xO7+&zOOQV7+'P7+'PO3aQ#xO7+'PO#4]Q#zO,5<QOOQV7+'U7+'UPOOO7+(t7+(tO#4bQ#xO1G3{OOQS,5<k,5<kO#4pQ#xO1G3zOOQS-E9}-E9}O#5TQ#xO,5<lO#5`Q#xO,5<lO#5sQ#xO1G3}OOQS-E:O-E:OO#6TQ#xO1G3}O#6]Q#xO1G3}O#6mQ#xO1G3}O#6TQ#xO1G3}OOQS<<H^<<H^O#6xQ&nO1G2SOOQS<<Hm<<HmP#7VQ#xO'#F|O7kQ#xO1G3tO#7dQ#xO1G3tO#7iQ#xO<<HmOOQS<<Hn<<HnO#7yQ#xO7+)dOOQS<<Hu<<HuO#8ZQ&nO1G2RP#8zQ#xO'#F{O#9XQ#xO7+)eO#9iQ#xO7+)eO#9qQ#xO<<HyO#9vQ#xO7+)_OOQS<<H{<<H{O#:mQ#xO,5<jO'ZQ#xO,5<jOOQS-E9|-E9|OOQS<<Hy<<HyOOQS,5<p,5<pO/rQ#xO,5<pO#:rQ#xO1G4XOOQS-E:S-E:SO#;]Q#xO1G4XO;UQ#xO'#D}OOOO'#GV'#GVO#;nO$ISO,5:hOOO#l,5>n,5>nOOOW7+%k7+%kO#;yQ#xO7+%kOOO`7+%q7+%qO#<RQ#xO7+%qOOOp7+%s7+%sO#<ZQ#xO7+%sOOO!b7+%u7+%uO#<cQ#xO7+%uO#<kQ#xO1G3^O#=UQ#xO1G3^P'ZQ#xO'#F}O/rQ#xO<<IxO#=gQ#xO,5>vO#=xQ#xO,5>vO0XQ#xO,5>vO#>ZQ#xO,5>uOOQS<<Iz<<IzP0XQ#xO'#GbP/rQ#xO'#G^OOQS,5;e,5;eO#>`Q#xO,5>xO#>nQ#xO,5>xOOQS1G1O1G1OOOQS<<JS<<JSOOQV-E:c-E:cO3aQ#xO<<JYOOQV,5=P,5=PO3aQ#xO,5=POOQV<<JY<<JYOOQV<<J]<<J]O#>vQ&nO1G2lP#?QQ#xO'#GfO#?XQ#xO7+*QO#?cQ#{O<<J_O3aQ#xO<<J_OOQV<<Jf<<JfO3aQ#xO<<JfO!HeQMlO<<JfO#BqQ#{O7+&oOOQV<<J`<<J`O#B{Q#{O<<J`OOQV1G2m1G2mO0XQ#xO1G2mO#FZQ#xO1G2mO3aQ#xO<<J`O0XQ#xO1G2nP/rQ#xO'#GhO#FfQ#xO7+*RO#FsQ#xO7+*ROOQS'#F]'#F]O/rQ#xO,5>}O#F{Q#xO,5>}OOQS,5>},5>}O#GWQ#xO,5>|O#GiQ#xO,5>|OOQS1G1b1G1bOOQS,5;x,5;xOOQV<<Jk<<JkO#GqQ#xO1G1lOOQS7+)g7+)gP#GvQ#xO'#GPO#HWQ#xO1G2WO#HkQ#xO1G2WO#H{Q#xO1G2WP#IWQ#xO'#GQO#IeQ#xO7+)iO#IuQ#xO7+)iO#IuQ#xO7+)iO#I}Q#xO7+)iO#J_Q#xO7+)`O7kQ#xO7+)`OOQSAN>XAN>XO#JxQ#xO<<MPOOQSAN>eAN>eO/rQ#xO1G2UO#KYQ&nO1G2UP#KdQ#xO'#GOOOQS1G2[1G2[P#KqQ#xO'#GUO#LOQ#xO7+)sO#LiQ#xO,5:iOOOO-E:T-E:TOOOW<<IV<<IVOOO`<<I]<<I]OOOp<<I_<<I_OOO!b<<Ia<<IaO#LwQ#xO7+(xOOQSAN?dAN?dO#MbQ#xO,5<{O#MvQ#xO1G4bOOQS-E:_-E:_O#NXQ#xO1G4bOOQS1G4a1G4aOOQS,5<},5<}O#NjQ#xO1G4dOOQS-E:a-E:aOOQVAN?tAN?tOOQV1G2k1G2kO3aQ#xOAN?yO#NxQ#{OAN?yOOQVAN@QAN@QO3aQ#xOAN@QOOQV<<JZ<<JZO3aQ#xOAN?zO3aQ#xO7+(XOOQV7+(X7+(XO0XQ#xO7+(XOOQVAN?zAN?zOOQS7+(Y7+(YO$$WQ#xO<<MmOOQS1G4i1G4iO/rQ#xO1G4iOOQS,5=T,5=TO$$eQ#xO1G4hOOQS-E:g-E:gOOQU'#Gk'#GkO$$vQ#zO7+'WO$%RQ#xO'#FgO$%yQ#xO7+'rO$&ZQ#xO7+'rOOQS7+'r7+'rO$&fQ#xO<<MTO$&vQ#xO<<MTO$&vQ#xO<<MTO$'OQ#xO'#HpOOQS<<Lz<<LzO$'YQ#xO<<LzOOQS7+'p7+'pOOQS'#EO'#EOOOOO1G0T1G0TO$'sQ#xO1G0TO$'{Q#xO1G0TO0XQ#xO1G2gP0XQ#xO'#GaO$(WQ#xO7+)|O$(iQ#xO7+)|P!<OQ#xO'#GcOOQVG25eG25eO3aQ#xOG25eOOQVG25lG25lOOQVG25fG25fOOQV<<Ks<<KsO3aQ#xO<<KsOOQS7+*T7+*TP$(zQ#xO'#GiOOQU-E:i-E:iOOQV<<Jr<<JrO$)nQ&nO'#FiOOQS'#Fk'#FkO$*OQ#xO'#FjO$*pQ#xO'#FjOOQS'#Fj'#FjO$*uQ#xO'#IeO$%RQ#xO'#FqO$%RQ#xO'#FqO$+^Q#xO'#FrO$%RQ#xO'#FsO$+eQ#xO'#IfOOQS'#If'#IfO$,SQ#xO,5<ROOQS<<K^<<K^O$,[Q#xO<<K^O$,lQ#xOANBoO$,|Q#xOANBoO$-UQ#xO'#HqOOQS'#Hq'#HqO0sQ#xO'#DeO$-oQ#xO,5>[OOQSANBfANBfOOOO7+%o7+%oO$.WQ#xO7+%oOOQS7+(R7+(RO$.`Q#xO<<MhOOQVLD+PLD+POOQVANA_ANA_O4jQMlO'#GmO$.qQ&nO,5<[O$%RQ#xO'#FuOOQS,5<`,5<`OOQS'#Fl'#FlO$/cQ#xO,5<UO$/hQ#xO,5<UOOQS'#Fo'#FoO$%RQ#xO'#GlO$0YQ#xO,5<YO$0tQ#xO,5?PO$1UQ#xO,5?PO0XQ#xO,5<XO$1gQ#xO,5<]O$1lQ#xO,5<]O$%RQ#xO'#IgO$1qQ#xO'#IgO$1vQ#xO,5<^OOQS,5<_,5<_O'ZQ#xO'#FxOOQU1G1m1G1mO3aQ#xO1G1mOOQSAN@xAN@xO$1{Q#xOG28ZO$2]Q#xO,5:POOQS1G3v1G3vOOOO<<IZ<<IZOOQS,5=X,5=XOOQS-E:k-E:kO$2bQ&nO'#FiO$2iQ#xO'#IhO$2wQ#xO'#IhO$3PQ#xO,5<aOOQS1G1p1G1pO$3UQ#xO1G1pO$3ZQ#xO,5=WOOQS-E:j-E:jO$3uQ#xO,5=[O$4^Q#xO1G4kOOQS-E:n-E:nOOQS1G1s1G1sOOQS1G1w1G1wO$4nQ#xO,5?RO$%RQ#xO,5?ROOQS1G1x1G1xO$4|Q&nO,5<dOOQU7+'X7+'XO$'OQ#xO1G/kO$%RQ#xO,5<bO$5TQ#xO,5?SO$5[Q#xO,5?SOOQS1G1{1G1{OOQS7+'[7+'[P$%RQ#xO'#GpO$5dQ#xO1G4mO$5nQ#xO1G4mO$5vQ#xO1G4mOOQS7+%V7+%VO$6UQ#xO1G1|O$6dQ&nO'#FiO$6kQ#xO,5=ZOOQS,5=Z,5=ZO$6yQ#xO1G4nOOQS-E:m-E:mO$%RQ#xO,5=YO$7QQ#xO,5=YO$7VQ#xO7+*XOOQS-E:l-E:lO$7aQ#xO7+*XO$%RQ#xO,5<cP$%RQ#xO'#GoO$7iQ#xO1G2tO$%RQ#xO1G2tP$7wQ#xO'#GnO$8OQ#xO<<MsO$8YQ#xO1G1}O$8hQ#xO7+(`O7kQ#xO'#DPO7kQ#xO,59dO7kQ#xO,59dO7kQ#xO,59dO$8vQ&nO,5=rO7kQ#xO1G/OO/rQ#xO1G/ZO/rQ#xO7+$rP$9ZQ#xO'#G[O'ZQ#xO'#HWO$9hQ#xO,59dO$9mQ#xO,59dO$9tQ#xO,59oO$9yQ#xO1G/WO0sQ#xO'#DTO7kQ#xO,59l",
  stateData: "$:[~O%uOS%jOSUOS%iPQ~OPiOXfOhtOjYOquOu!UOxvO!RwO!S!QO!V!XO!W!WO!ZZO!_[O!jeO!zeO!{eO!|eO#TyO#VzO#X{O#Z|O#]}O#a!OO#c!PO#f!RO#g!RO#i!SO#k!TO#t!VO#w!YO#{!ZO#}![O$S!]O$VmO$X!^O&RRO&SRO&WSO&XWO&m]O&n^O&q_O&t`O&xaO&ybO&zcO~O%i!_O~OX!fOa!fOc!gOj!nO!Z!pO!h!rO%|!aO%}!bO&O!cO&P!dO&Q!dO&R!eO&S!eO&T!fO&U!fO&V!fO~Om&[Xn&[Xo&[Xp&[Xq&[Xr&[Xu&[X|&[X}&[X#Q&[X#o&[X%h&[X%k&[X&^&[Xi&[X!V&[X!W&[X&_&[X!Y&[X!^&[X!S&[X#d&[Xv&[X!o&[X~P$gOhtOjYO!ZZO!_[O!jeO!zeO!{eO!|eO&RRO&SRO&WSO&XWO&m]O&n^O&q_O&t`O&xaO&ybO&zcO~O|&ZX}&ZX#o&ZX%h&ZX%k&ZX&^&ZX~Om!uOn!vOo!tOp!tOq!wOr!xOu!yO#Q&ZX~P(hOX#POi#ROq1`Ox1nO!RwO~P'ZOX#TOq1`Ox1nO!Y#UO~P'ZOX#XOc#YOq1`Ox1nO!^#ZO~P'ZO&o#^O&p#`O~O&r#aO&s#`O~OQ#cO%l#dO%m#fO~OR#gO%n#hO%o#fO~OS#jO%p#kO%q#fO~OT#mO%r#nO%s#fO~OX%{Xa%{Xc%{Xj%{Xm%{Xn%{Xo%{Xp%{Xq%{Xr%{Xu%{X|%{X!Z%{X!h%{X%|%{X%}%{X&O%{X&P%{X&Q%{X&R%{X&S%{X&T%{X&U%{X&V%{Xi%{X!V%{X!W%{X~O&m]O&n^O&q_O&t`O&xaO&ybO&zcO}%{X#Q%{X#o%{X%h%{X%k%{X&^%{X&_%{X!Y%{X!^%{X!S%{X#d%{Xv%{X!o%{X~P,QO|#sO}%zX#Q%zX#o%zX%h%zX%k%zX&^%zX~Oq1`Ox1nO~P'ZO#o#vO%h#xO%k#xO~O&XWO~O!V#}O#}![O$S!]O$VmO~OquO~P'ZOX$SOc$TO&XWO}yP~OX$XOq1`Ox1nO!S$YO~P'ZO}$[O#Q$aO&^$]O#o#RX%h#RX%k#RX~OX$XOq1`Ox1nO#o#[X%h#[X%k#[X~P'ZOq1`Ox1nO#o#`X%h#`X%k#`X~P'ZO!h$gO!z$gO&XWO~OX$rO~P'ZO!W$tO#{$uO#}$vO~O}$wO~OX%OO~P'ZOU%QO%h%PO%u%RO~OX%[Oc%[Oi%^Oq1`Ox1nO~P'ZOq1`Ox1nO}%aO~P'ZO&l%cO~Oc!gOj!nO!Z!pO!h!rOXdaadamdandaodapdaqdardauda|da}da#Qda#oda%hda%kda%|da%}da&Oda&Pda&Qda&Rda&Sda&Tda&Uda&Vda&^daida!Vda!Wda&_da!Yda!^da!Sda#ddavda!oda~Op%hO~Oq%hO~P'ZOq1`O~P'ZOm1bOn1cOo1aOp1aOq1jOr1kOu1oOi&ZX!V&ZX!W&ZX&_&ZX!Y&ZX!^&ZX!S&ZX#d&ZX!o&ZX~P(hO&_%jOi&YX|&YX!V&YX!W&YX!Y&YX}&YX~Oi%lO|%mO!V%qO!W%pO~Oi%lO~O|%tO!V%qO!W%pO!Y&fX~O!Y%xO~O|%yO}%{O!V%qO!W%pO!^&aX~O!^&PO~O!^&QO~O&o#^O&p&SO~O&r#aO&s&SO~OX&VOq1`Ox1nO!RwO~P'ZOQ#cO%l#dO%m&YO~OR#gO%n#hO%o&YO~OS#jO%p#kO%q&YO~OT#mO%r#nO%s&YO~OX!yaa!yac!yaj!yam!yan!yao!yap!yaq!yar!yau!ya|!ya}!ya!Z!ya!h!ya#Q!ya#o!ya%h!ya%k!ya%|!ya%}!ya&O!ya&P!ya&Q!ya&R!ya&S!ya&T!ya&U!ya&V!ya&^!yai!ya!V!ya!W!ya&_!ya!Y!ya!^!ya!S!ya#d!yav!ya!o!ya~P#yO|&bO}%za#Q%za#o%za%h%za%k%za&^%za~P$gOX&dOquOxvO}%za#Q%za#o%za%h%za%k%za&^%za~P'ZO|&bO}%za#Q%za#o%za%h%za%k%za&^%za~OPiOXfOquOxvO!RwO!S!QO#TyO#VzO#X{O#Z|O#]}O#a!OO#c!PO#f!RO#g!RO#i!SO#k!TO#o%WX%h%WX%k%WX~P'ZO#o#vO%h&iO%k&iO~O!h&jOj&|X%h&|X#d&|X#o&|X%k&|X#c&|X~Oj!nO%h&lO~Omgangaogapgaqgargauga|ga}ga#Qga#oga%hga%kga&^gaiga!Vga!Wga&_ga!Yga!^ga!Sga#dgavga!oga~P$gOusa|sa}sa#osa%hsa%ksa&^sa~Om!uOn!vOo!tOp!tOq!wOr!xO#Qsa~PDuO&^&nO|&]X}&]X~O&XWO|&]X}&]X~O|&qO}yX~O}&sO~O|%yO#o&aX%h&aX%k&aXi&aX}&aX!^&aX!o&aX&^&aX~OX1iOq1`Ox1nO!RwO~P'ZO&^$]O#oWa%hWa%kWa~O|&|O#o&cX%h&cX%k&cXp&cX~P$gO|'PO!S'OO#o#`a%h#`a%k#`a~O#d'QO#o#ba%h#ba%k#ba~O!h$gO!z$gO#c'SO&XWO~O#c'SO~O|'UO#o'PX%h'PX%k'PX~O|'WO#o&{X%h&{X%k&{X}&{X~O!Z'YO&^'ZO~O|'_Op'SX~P$gOp'bO~OPiOXfOquOxvO!RwO!S!QO#TyO#VzO#X{O#Z|O#]}O#a!OO#c!PO#f!RO#g!RO#i!SO#k!TO%h'gO~P'ZOv'kO#x'iO#y'jOP#vaX#vah#vaj#vaq#vau#vax#va!R#va!S#va!V#va!W#va!Z#va!_#va!j#va!z#va!{#va!|#va#T#va#V#va#X#va#Z#va#]#va#a#va#c#va#f#va#g#va#i#va#k#va#t#va#w#va#{#va#}#va$S#va$V#va$X#va%e#va&R#va&S#va&W#va&X#va&m#va&n#va&q#va&t#va&x#va&y#va&z#va%g#va%k#va~O|'lO#d'nO}'TX~Oj'pO!Z'YO~Oj!nO}$wO!Z'YO~O}'vO~P$gO%h'yO~OU'zO%h'yO~OX!fOa!fOc!gOj!nO!Z!pO!h!rO&O!cO&P!dO&Q!dO&R!eO&S!eO&T!fO&U!fO&V!fOmYinYioYipYiqYirYiuYi|Yi}Yi#QYi#oYi%hYi%kYi%|Yi&^YiiYi!VYi!WYi&_Yi!YYi!^Yi!SYi#dYivYi!oYi~O%}!bO~P!!`O%}Yi~P!!`OX!fOa!fOc!gOj!nO!Z!pO!h!rO&R!eO&S!eO&T!fO&U!fO&V!fOmYinYioYipYiqYirYiuYi|Yi}Yi#QYi#oYi%hYi%kYi%|Yi%}Yi&OYi&^YiiYi!VYi!WYi&_Yi!YYi!^Yi!SYi#dYivYi!oYi~O&P!dO&Q!dO~P!%ZO&PYi&QYi~P!%ZOc!gOj!nO!Z!pO!h!rOmYinYioYipYiqYirYiuYi|Yi}Yi#QYi#oYi%hYi%kYi%|Yi%}Yi&OYi&PYi&QYi&RYi&SYi&^YiiYi!VYi!WYi&_Yi!YYi!^Yi!SYi#dYivYi!oYi~OX!fOa!fO&T!fO&U!fO&V!fO~P!(XOXYiaYi&TYi&UYi&VYi~P!(XO!V%qO!W%pOi&iX|&iX~O&^'|O&_'|O~P,QO|(OOi&hX~Oi(QO~O|(RO}(TO!Y&kX~Oq1`Ox1nO|(RO}(UO!Y&kX~P'ZO!Y(WO~Oo!tOp!tOq!wOr!xOmliuli|li}li#Qli#oli%hli%kli&^li~On!vO~P!,zOnli~P!,zOm1bOn1cOo1aOp1aOq1jOr1kO~Ov(YO~P!.TOX(_Oi(`Oq1`Ox1nO~P'ZOi(`O|(aO~Oi(cO~O!W(eO~Oi(fO|(aO!V%qO!W%pO~P$gOm1bOn1cOo1aOp1aOq1jOr1kOisa!Vsa!Wsa&_sa!Ysa!^sa!Ssa#dsavsa!osa~PDuOX(_Oq1`Ox1nO!Y&fa~P'ZO|(iO!Y&fa~O!Y(jO~O|(iO!V%qO!W%pO!Y&fa~P$gOX(nOq1`Ox1nO!^&aa#o&aa%h&aa%k&aai&aa}&aa!o&aa&^&aa~P'ZO|(oO!^&aa#o&aa%h&aa%k&aai&aa}&aa!o&aa&^&aa~O!^(rO~O|(oO!V%qO!W%pO!^&aa~P$gO|(uO!V%qO!W%pO!^&ga~P$gO|(xO}&uX!^&uX!o&uX&^&uX~O}(|O!^)OO!o)PO&^({O~O}(|O!^)SO!o)TO&^)RO~O}(|O!^)WO!o)XO&^)VO~O}(|O!^)[O!o)]O&^)ZO~OX&dOquOxvO}%zi#Q%zi#o%zi%h%zi%k%zi&^%zi~P'ZO|)_O}%zi#Q%zi#o%zi%h%zi%k%zi&^%zi~O!h&jOj&|a%h&|a#d&|a#o&|a%k&|a#c&|a~O%h)dO~OX$SOc$TO&XWO~O|&qO}ya~OquOxvO~P'ZO|(oO#o&aa%h&aa%k&aai&aa}&aa!^&aa!o&aa&^&aa~P$gO|)iO#o%zX%h%zX%k%zX&^%zX~O&^$]O#oWi%hWi%kWi~O#o&ca%h&ca%k&cap&ca~P'ZO|)lO#o&ca%h&ca%k&cap&ca~OX)pOj)rO&XWO~O#c)sO~O&XWO#o'Pa%h'Pa%k'Pa~O|)uO#o'Pa%h'Pa%k'Pa~Oq1`Ox1nO#o&{a%h&{a%k&{a}&{a~P'ZO|)xO#o&{a%h&{a%k&{a}&{a~OX)zOc)zO&XWO~O&^*PO~Ov*SO#r*ROP#piX#pih#pij#piq#piu#pix#pi!R#pi!S#pi!V#pi!W#pi!Z#pi!_#pi!j#pi!z#pi!{#pi!|#pi#T#pi#V#pi#X#pi#Z#pi#]#pi#a#pi#c#pi#f#pi#g#pi#i#pi#k#pi#t#pi#w#pi#{#pi#}#pi$S#pi$V#pi$X#pi%e#pi&R#pi&S#pi&W#pi&X#pi&m#pi&n#pi&q#pi&t#pi&x#pi&y#pi&z#pi%g#pi%k#pi~Ov*TOP#siX#sih#sij#siq#siu#six#si!R#si!S#si!V#si!W#si!Z#si!_#si!j#si!z#si!{#si!|#si#T#si#V#si#X#si#Z#si#]#si#a#si#c#si#f#si#g#si#i#si#k#si#t#si#w#si#{#si#}#si$S#si$V#si$X#si%e#si&R#si&S#si&W#si&X#si&m#si&n#si&q#si&t#si&x#si&y#si&z#si%g#si%k#si~OX*VOp'Sa~P'ZO|*WOp'Sa~O|*WOp'Sa~P$gOp*[O~O%f*`O~Ov*cO#x'iO#y*bOP#viX#vih#vij#viq#viu#vix#vi!R#vi!S#vi!V#vi!W#vi!Z#vi!_#vi!j#vi!z#vi!{#vi!|#vi#T#vi#V#vi#X#vi#Z#vi#]#vi#a#vi#c#vi#f#vi#g#vi#i#vi#k#vi#t#vi#w#vi#{#vi#}#vi$S#vi$V#vi$X#vi%e#vi&R#vi&S#vi&W#vi&X#vi&m#vi&n#vi&q#vi&t#vi&x#vi&y#vi&z#vi%g#vi%k#vi~OX*fOq1`Ox1nO}$wO~P'ZOq1`Ox1nO}'Ta~P'ZO|*jO}'Ta~OX*nOc*oOi*rO&T*pO&XWO~O}$wO'W*tO~Oj'pO~Oj!nO}$wO~O%h*yO~O%h*{O~OX%[Oc%[Oq1`Ox1nOi&ha~P'ZO|+OOi&ha~Oq1`Ox1nO}+RO!Y&ka~P'ZO|+SO!Y&ka~Oq1`Ox1nO|+SO}+VO!Y&ka~P'ZOq1`Ox1nO|+SO!Y&ka~P'ZO|+SO}+VO!Y&ka~Oo1aOp1aOq1jOr1kOilimliuli|li!Vli!Wli&_li!Yli}li!^li#oli%hli%kli!Sli#dlivli!oli&^li~On1cO~P!KZOnli~P!KZOX(_Oi+[Oq1`Ox1nO~P'ZOp+^O~Oi+[O|+`O~Oi+aO~OX(_Oq1`Ox1nO!Y&fi~P'ZO|+bO!Y&fi~O!Y+cO~OX(nOq1`Ox1nO!^&ai#o&ai%h&ai%k&aii&ai}&ai!o&ai&^&ai~P'ZO|+fO!V%qO!W%pO!^&gi~O|+iO!^&ai#o&ai%h&ai%k&aii&ai}&ai!o&ai&^&ai~O!^+jO~Oc+lOq1`Ox1nO!^&gi~P'ZO|+fO!^&gi~O!^+nO~OX+pOq1`Ox1nO}&ua!^&ua!o&ua&^&ua~P'ZO|+qO}&ua!^&ua!o&ua&^&ua~O!_+tO&w+uO!^!pX~O!^+wO~O}(|O!^+xO~O}(|O!^+xO!o+yO~O}(|O!^+zO~O}(|O!^+zO!o+{O~O}(|O!^+|O~O}(|O!^+|O!o+}O~O}(|O!^,OO~O}(|O!^,OO!o,PO~OX&dOquOxvO}%zq#Q%zq#o%zq%h%zq%k%zq&^%zq~P'ZO|%Oi}%Oi#Q%Oi#o%Oi%h%Oi%k%Oi&^%Oi~P$gOX&dOquOxvO~P'ZOX&dOq1`Ox1nO#o%za%h%za%k%za&^%za~P'ZO|,QO#o%za%h%za%k%za&^%za~O|$qa#o$qa%h$qa%k$qap$qa~P$gO#o&ci%h&ci%k&cip&ci~P'ZO|,TO#o#`q%h#`q%k#`q~O|,UO#d,WO#o'OX%h'OX%k'OXi'OX~OX,YOj)rO&XWO~O&XWO#o'Pi%h'Pi%k'Pi~Oq1`Ox1nO#o&{i%h&{i%k&{i}&{i~P'ZO}$[O|#mX!Y#mX~O|,^O!Y'QX~O!Y,`O~Ov,cO#r*ROP#pqX#pqh#pqj#pqq#pqu#pqx#pq!R#pq!S#pq!V#pq!W#pq!Z#pq!_#pq!j#pq!z#pq!{#pq!|#pq#T#pq#V#pq#X#pq#Z#pq#]#pq#a#pq#c#pq#f#pq#g#pq#i#pq#k#pq#t#pq#w#pq#{#pq#}#pq$S#pq$V#pq$X#pq%e#pq&R#pq&S#pq&W#pq&X#pq&m#pq&n#pq&q#pq&t#pq&x#pq&y#pq&z#pq%g#pq%k#pq~Op%Ya|%Ya~P$gOX*VOp'Si~P'ZO|,jOp'Si~O|,tO}$wO#d,tO~O#y,vOP#vqX#vqh#vqj#vqq#vqu#vqx#vq!R#vq!S#vq!V#vq!W#vq!Z#vq!_#vq!j#vq!z#vq!{#vq!|#vq#T#vq#V#vq#X#vq#Z#vq#]#vq#a#vq#c#vq#f#vq#g#vq#i#vq#k#vq#t#vq#w#vq#{#vq#}#vq$S#vq$V#vq$X#vq%e#vq&R#vq&S#vq&W#vq&X#vq&m#vq&n#vq&q#vq&t#vq&x#vq&y#vq&z#vq%g#vq%k#vq~O#d,wO|%[a}%[a~Oq1`Ox1nO}'Ti~P'ZO|,yO}'Ti~O}$[O&^,{Oi'VX|'VX~O&XWOi'VX|'VX~O|-POi'UX~Oi-RO~O%f-UO~O!V%qO!W%pOi&ii|&ii~OX%[Oc%[Oq1`Ox1nOi&hi~P'ZO}-XO|$ta!Y$ta~Oq1`Ox1nO}-YO|$ta!Y$ta~P'ZOq1`Ox1nO}+RO!Y&ki~P'ZO|-]O!Y&ki~Oq1`Ox1nO|-]O!Y&ki~P'ZO|-]O}-`O!Y&ki~Oi$pi|$pi!Y$pi~P$gOX(_Oq1`Ox1nO~P'ZOp-bO~OX(_Oi-cOq1`Ox1nO~P'ZOX(_Oq1`Ox1nO!Y&fq~P'ZO|$oi!^$oi#o$oi%h$oi%k$oii$oi}$oi!o$oi&^$oi~P$gOX(nOq1`Ox1nO~P'ZOc+lOq1`Ox1nO!^&gq~P'ZO|-dO!^&gq~O!^-eO~OX(nOq1`Ox1nO!^&aq#o&aq%h&aq%k&aqi&aq}&aq!o&aq&^&aq~P'ZO}-fO~OX+pOq1`Ox1nO}&ui!^&ui!o&ui&^&ui~P'ZO|-kO}&ui!^&ui!o&ui&^&ui~O!_+tO&w+uO!^!pa~O}(|O!^-nO~O}(|O!^-oO~O}(|O!^-pO~O}(|O!^-qO~OX&dOq1`Ox1nO#o%zi%h%zi%k%zi&^%zi~P'ZO|-rO#o%zi%h%zi%k%zi&^%zi~O&XWO#o'Oa%h'Oa%k'Oai'Oa~O|-uO#o'Oa%h'Oa%k'Oai'Oa~Oi-xO~OX)zOc)zO&XWO!Y'Qa~O|-zO!Y'Qa~Op%Yi|%Yi~P$gOX*VO~P'ZOX*VOp'Sq~P'ZOv.OOP#uyX#uyh#uyj#uyq#uyu#uyx#uy!R#uy!S#uy!V#uy!W#uy!Z#uy!_#uy!j#uy!z#uy!{#uy!|#uy#T#uy#V#uy#X#uy#Z#uy#]#uy#a#uy#c#uy#f#uy#g#uy#i#uy#k#uy#t#uy#w#uy#{#uy#}#uy$S#uy$V#uy$X#uy%e#uy&R#uy&S#uy&W#uy&X#uy&m#uy&n#uy&q#uy&t#uy&x#uy&y#uy&z#uy%g#uy%k#uy~O%g.SO%k.SO~P`O#y.TOP#vyX#vyh#vyj#vyq#vyu#vyx#vy!R#vy!S#vy!V#vy!W#vy!Z#vy!_#vy!j#vy!z#vy!{#vy!|#vy#T#vy#V#vy#X#vy#Z#vy#]#vy#a#vy#c#vy#f#vy#g#vy#i#vy#k#vy#t#vy#w#vy#{#vy#}#vy$S#vy$V#vy$X#vy%e#vy&R#vy&S#vy&W#vy&X#vy&m#vy&n#vy&q#vy&t#vy&x#vy&y#vy&z#vy%g#vy%k#vy~O|.WO}$wO#d.WO~Oq1`Ox1nO}'Tq~P'ZO|.ZO}'Tq~O&^,{Oi'Va|'Va~OX*nOc*oO&T*pO&XWOi'Ua~O|._Oi'Ua~O$[.cO~OX%[Oc%[Oq1`Ox1nO~P'ZOq1`Ox1nO}.dO|$ti!Y$ti~P'ZOq1`Ox1nO|$ti!Y$ti~P'ZO}.dO|$ti!Y$ti~Oq1`Ox1nO}+RO~P'ZOq1`Ox1nO}+RO!Y&kq~P'ZO|.gO!Y&kq~Oq1`Ox1nO|.gO!Y&kq~P'ZOu.jO!V%qO!W%pOi&bq!Y&bq!^&bq|&bq~P!.TOc+lOq1`Ox1nO!^&gy~P'ZO|$ri!^$ri~P$gOc+lOq1`Ox1nO~P'ZOX+pOq1`Ox1nO~P'ZOX+pOq1`Ox1nO}&uq!^&uq!o&uq&^&uq~P'ZO}(|O!^.oO!o.pO&^.nO~OX&dOq1`Ox1nO#o%zq%h%zq%k%zq&^%zq~P'ZO#d.rO|%Ta#o%Ta%h%Ta%k%Tai%Ta~O&XWO#o'Oi%h'Oi%k'Oii'Oi~O|.tO#o'Oi%h'Oi%k'Oii'Oi~OX)zOc)zO&XWO!Y'Qi~Ov.xOP#u!RX#u!Rh#u!Rj#u!Rq#u!Ru#u!Rx#u!R!R#u!R!S#u!R!V#u!R!W#u!R!Z#u!R!_#u!R!j#u!R!z#u!R!{#u!R!|#u!R#T#u!R#V#u!R#X#u!R#Z#u!R#]#u!R#a#u!R#c#u!R#f#u!R#g#u!R#i#u!R#k#u!R#t#u!R#w#u!R#{#u!R#}#u!R$S#u!R$V#u!R$X#u!R%e#u!R&R#u!R&S#u!R&W#u!R&X#u!R&m#u!R&n#u!R&q#u!R&t#u!R&x#u!R&y#u!R&z#u!R%g#u!R%k#u!R~Oq1`Ox1nO}'Ty~P'ZOX*nOc*oO&T*pO&XWOi'Ui~O$[.cO%g/QO%k/QO~OX/[Oj/YO!Z/XO!_/ZO!j/TO!{/VO!|/VO&S/SO&XWO&m]O&n^O&q_O~Oq1`Ox1nO|$tq!Y$tq~P'ZO}/aO|$tq!Y$tq~Oq1`Ox1nO}+RO!Y&ky~P'ZO|/bO!Y&ky~Oq1`Ox/fO~P'ZOu.jO!V%qO!W%pOi&by!Y&by!^&by|&by~P!.TO}(|O!^/iO~O}(|O!^/iO!o/jO~O&XWO#o'Oq%h'Oq%k'Oqi'Oq~O|/lO#o'Oq%h'Oq%k'Oqi'Oq~OX*nOc*oO&T*pO&XWO~Oj/qO!h/oO|$]X#d$]X%|$]Xi$]X~Ou$]X}$]X!Y$]X!^$]X~P$)YO&R/sO&S/sOu$^X|$^X}$^X#d$^X%|$^X!Y$^Xi$^X!^$^X~O!j/uO~O|/yO#d/{O%|/vOu'XX}'XX!Y'XXi'XX~Oc0OO~P$%_Oj/qOu'YX|'YX}'YX#d'YX%|'YX!Y'YXi'YX!^'YX~Ou0SO}$wO~Oq1`Ox1nO|$ty!Y$ty~P'ZOq1`Ox1nO}+RO!Y&k!R~P'ZO|0WO!Y&k!R~Oi&eXu&eX!V&eX!W&eX!Y&eX!^&eX|&eX~P!.TOu.jO!V%qO!W%pOi&da!Y&da!^&da|&da~O}(|O!^0ZO~O&XWO#o'Oy%h'Oy%k'Oyi'Oy~O!h/oOj$dau$da|$da}$da#d$da%|$da!Y$dai$da!^$da~O!j0bO~O&R/sO&S/sOu$^a|$^a}$^a#d$^a%|$^a!Y$^ai$^a!^$^a~O%|/vOu$ba|$ba}$ba#d$ba!Y$bai$ba!^$ba~Ou'Xa}'Xa!Y'Xai'Xa~P$%RO|0gOu'Xa}'Xa!Y'Xai'Xa~O!Y0jO~Oi0jO~O}0lO~O!^0mO~Oq1`Ox1nO}+RO!Y&k!Z~P'ZO}0pO~O&^0qO~P$)YO|0rO#d/{O%|/vOi'[X~O|0rOi'[X~Oi0tO~O!j0uO~O#d/{Ou%`a|%`a}%`a%|%`a!Y%`ai%`a!^%`a~O#d/{O%|/vOu%da|%da}%da!Y%dai%da~Ou'Xi}'Xi!Y'Xii'Xi~P$%RO|0wO#d/{O%|/vO!^'Za~O}$la~P$gOi'[a~P$%RO|1POi'[a~Oc1RO!^'Zi~P$%_O|1TO!^'Zi~O|1TO#d/{O%|/vO!^'Zi~O#d/{O%|/vOi$ji|$ji~O&^1WO~P$)YO#d/{O%|/vOi%ca|%ca~Oi'[i~P$%RO}1ZO~Oc1RO!^'Zq~P$%_O|1]O!^'Zq~O#d/{O%|/vO|%bi!^%bi~Oc1RO~P$%_Oc1RO!^'Zy~P$%_O#d/{O%|/vOi$ki|$ki~O#d/{O%|/vO|%bq!^%bq~O|,QO#o%za%h%za%k%za&^%za~P$gOX&dOq1`Ox1nO~P'ZOp1eO~Oq1eO~P'ZO}1fO~Ov1gO~P!.TO&n&q&y&z&m&t&x&X&m~",
  goto: "!@f']PPPPPPPP'^P'f+R+k,U,p-]-yP.hP'f/X/X'fPPP'f2tPPPPPP2t5kPP5kP8O8X>kPP>n?`?cPP'f'fPP?{PP'f'fPP'f'f'f'f'f@P@y'fP@|PASE^H}IRPIUIlIpIsIwIzJOJRJV'fPPPJYJc'^P'^'^P'^P'^P'^P'^P'^'^'^P'^PP'^PP'^P'^PJiJuJ}PKUK[PKUPKUKUPPPKUPMjPMsM}NTMjPKUN^PKUPNeNkPNo! T! r!!]NoNo!!c!!pNoNoNoNo!#U!#[!#_!#d!#g!#q!#w!$T!$g!$m!$w!$}!%k!%q!%w!%}!&X!&_!&e!&k!&q!&w!'Z!'e!'k!'q!'w!(R!(X!(_!(e!(k!(u!({!)V!)]!)f!)l!){!*T!*_!*fPPPPPPPPPPPPPPPPP!*l!*o!*u!+O!+Y!+ePPPPPPPPPPPP!0[!1p!5s!9WPP!9`!9r!9{!:t!:k!:}!;T!;W!;Z!;^!;f!<VPPPPPPPPP!<Y!<iPPPP!=m!=y!>V!>]!>f!>i!>l!>r!>x!?O!?RP!?Z!?d!@`!@c]jOs#v$w*`,p(TeOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1o}!hQ#r$P$b$q$}%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!P!iQ#r$P$b$q$}%S%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!R!jQ#r$P$b$q$}%S%T%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!T!kQ#r$P$b$q$}%S%T%U%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!V!lQ#r$P$b$q$}%S%T%U%V%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!X!mQ#r$P$b$q$}%S%T%U%V%W%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d!]!mQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1d(TTOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1o&iVOYZ[isuw}!O!S!U!V!Z!n!p!t!u!v!x!y#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%h%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)_)a)i)x*P*R*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+p+q+t,Q,T,[,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0W0p1`1a1b1c1e1f1g1h1k1o%sXOYZ[isw}!O!S!U!V!Z!n!p#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)_)a)i)x*P*R*[*`*f*j*t+O+R+S+V+]+`+b+e+f+i+p+q+t,Q,T,[,p,x,y,|-W-X-Y-[-]-`-d-f-h-j-k-r.Z.].d.g/a/b0W1f1g1hQ$VvQ0X/fR1l1n'zeOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1oW#ym!P!Q$hW$Rv&q/f1nQ$j!RQ$n!TQ${![Q$|!]W%Z!n(O+O-WS&p$S$TQ'e$vQ)b&jQ)p'QU)q'S)r)sU)t'U)u,ZW){'Y,^-z.vQ*l'nW*m'p-P._/OQ,])zS-O*n*oY-t,U-u.s.t/lQ-w,WQ.U,tQ.Y,wQ.|.Wl/R.c/X/Y/[/w/y0O0g0l0q0v1R1W1ZQ/k.rQ0P/ZQ0^/qQ0i/{U0|0r1P1XX1S0w1T1[1]R&o$R!_!|YZ!U!V!p%a%m%t(R(T(U(a(i*R+R+S+V+]+`+b-X-Y-[-]-`.d.g/a/b0WR%k!{Q#QYQ&W#cQ&Z#gQ&]#jQ&_#mQ&x$^Q&{$aR-l+tT/e.j0p![!oQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1dQ&m#zQ't$|R*x'uR'}%ZQ%d!rR0[/o(SdOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1oS#pd#q!P/V.c/X/Y/Z/[/q/w/y0O0g0l0q0r0v0w1P1R1T1W1X1Z1[1](SdOTYZ[fistuwy}!O!S!U!V!W!Z!^!h!i!j!k!l!m!n!p!t!u!v!x!y#P#T#X#Y#c#g#j#m#s#v$X$Y$[$^$a$r$t$u$w%O%[%a%h%k%m%p%t%y%{&V&b&d&o&s&|'O'P'W'Z'_'b'i'l'}(O(R(T(U(Y(_(a(e(i(n(o(u(x)_)a)i)l)x*P*R*V*W*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+l+p+q+t,Q,S,T,[,i,j,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0S0W0p1`1a1b1c1e1f1g1h1i1k1oT#pd#qT#d`#eR)Q&Wy(}&W&Z&]&_)P)Q)T)U)X)Y)])^+y+{+},P-l.p.q/jT+u(|+vR.q-lT#ha#iR)U&ZT#kb#lR)Y&]T#nc#oR)^&_Q$`xQ,]){R,}*mX$^x$_$`&zQ'[$nQ'r${Q'u$|R*_'eQ)|'YV-y,^-z.vZlOs$w*`,pXpOs*`,pQ$x!YQ']$oQ'^$pQ'o$zQ's$|Q*]'dQ*d'iQ*g'jQ*h'kQ*u'qS*w't'uQ,d*RQ,f*SQ,g*TQ,k*ZS,m*^*vQ,q*bQ,r*cS,s*e*fQ-T*xQ-|,cQ-},eQ.P,lS.Q,n,oQ.V,uQ.X,vQ.w.OQ.y.RQ.z.TQ.{.UQ/m.xQ/n.|Q0T/_R0o0UWpOs*`,pR#|oQ'q${S*^'e'rR,o*_Q,|*mR.],}Q*v'qQ,n*^R.R,oZnOos*`,pQ'w$}R*z'xT.a-U.bu/^.c/X/Y/[/q/w/y0O0g0l0q0r0v1P1R1W1X1Zt/^.c/X/Y/[/q/w/y0O0g0l0q0r0v1P1R1W1X1ZQ0P/ZX1S0w1T1[1]!P/U.c/X/Y/Z/[/q/w/y0O0g0l0q0r0v0w1P1R1T1W1X1Z1[1]Q/t/TR0c/ug/w/W/x0_0f0k0y0{0}1Y1^1_u/].c/X/Y/[/q/w/y0O0g0l0q0r0v1P1R1W1X1ZX/r/R/]0^0|R0`/qV1O0r1P1XR0U/_QsOS$Os,pR,p*`Q&r$UR)g&rS%z#W$WS(p%z(sT(s%}&tQ%n#OQ%u#SW(b%n%u(g(kQ(g%rR(k%wQ&}$bR)m&}Q(v&OQ+g(qT+m(v+gQ(P%]R+P(PS(S%`%aY+T(S+U-^.h/cU+U(T(U(VU-^+V+W+XS.h-_-`R/c.iQ#_^R&R#_Q#b_R&T#bQ#e`R&X#eQ(y&US+r(y+sR+s(zQ+v(|R-m+vQ#iaR&[#iQ#lbR&^#lQ#ocR&`#oQ#qdR&a#qQ#tgQ&c#rW&f#t&c)j,RQ)j&wR,R1dQ$_xS&y$_&zR&z$`Q'X$lR)y'XQ&k#yR)c&kQ$h!QR'R$hQ,V)qS-v,V.uR.u-wQ'V$jR)v'VQ,_)|R-{,_Q#wkR&h#wQ*Q']R,b*QQ'`$qS*X'`*YR*Y'aQ'h$xR*a'hQ'm$yS*k'm,zR,z*lQ-Q*qR.`-QWoOs*`,pR#{oQ.b-UR/P.bd/x/W0_0f0k0y0{0}1Y1^1_R0e/xU/p/R0^0|R0]/pQ0x0kS1U0x1VR1V0yS0s0_0`R1Q0sQ/z/WR0h/zR!`PXrOs*`,pWqOs*`,pR'f$wYkOs$w*`,pR&g#v[xOs#v$w*`,pR&x$^&hQOYZ[isuw}!O!S!U!V!Z!n!p!t!u!v!x!y#c#g#j#m#s#v$Y$[$^$a$u$w%[%a%h%k%m%t%y%{&V&b&o&s'O'P'W'Z'b'i'l'}(O(R(T(U(Y(a(i(o(u(x)_)a)i)x*P*R*[*`*f*j*t+O+R+S+V+]+^+`+b+e+f+i+p+q+t,Q,T,[,p,x,y,|-W-X-Y-[-]-`-b-d-f-h-j-k-r.Z.].d.g.j/a/b0W0p1`1a1b1c1e1f1g1h1k1oQ!sTQ#rfQ$PtU$by%p(eS$q!W$tQ$}!^Q%S!hQ%T!iQ%U!jQ%V!kQ%W!lQ%X!mQ%r#PQ%w#TQ%}#XQ&O#YQ&t$XQ'a$rQ'x%OQ)`&dU)k&|)l,SW*U'_*W,i,jQ+Z(_Q+d(nQ,h*VQ-g+lQ0n0SR1d1iQ#OYQ#SZQ$o!UQ$p!VQ%`!pQ(V%a^(^%m%t(a(i+]+`+b^+Q(R+S-[-].g/b0WQ+W(TQ+X(UQ,e*RQ-Z+RQ-_+VQ.e-XQ.f-YQ.i-`Q/`.dR0V/a[gOs#v$w*`,p!^!{YZ!U!V!p%a%m%t(R(T(U(a(i*R+R+S+V+]+`+b-X-Y-[-]-`.d.g/a/b0WQ#W[Q#uiS$Ww}Q$e!OW$l!S$a'b*[S$y!Z$uW%Y!n(O+O-WY&U#c#g#j#m+t`&e#s&b)_)a)i,Q-r1hQ&u$YQ&v$[Q&w$^Q'{%[Q(]%kW(m%y(o+e+iQ(q%{Q(z&VQ)e&oS)h&s1fQ)n'OQ)o'PU)w'W)x,[Q*O'ZQ*e'iY*i'l*j,x,y.ZQ*|'}S+Y(Y1gW+k(u+f-d-hW+o(x+q-j-kQ,a*PQ,u*fQ-S*tQ-i+pQ-s,TQ.[,|Q.m-fR.}.]hUOs#s#v$w&b&s(Y)_)a*`,p%Y!zYZ[iw}!O!S!U!V!Z!n!p#c#g#j#m$Y$[$^$a$u%[%a%k%m%t%y%{&V&o'O'P'W'Z'b'i'l'}(O(R(T(U(a(i(o(u(x)i)x*P*R*[*f*j*t+O+R+S+V+]+`+b+e+f+i+p+q+t,Q,T,[,x,y,|-W-X-Y-[-]-`-d-f-h-j-k-r.Z.].d.g/a/b0W1f1g1hQ$QuW%e!t!x1a1kQ%f!uQ%g!vQ%i!yQ%s1`S(X%h1eQ(Z1bQ([1cQ-a+^Q.l-bS/d.j0pR1m1oU$Uv/f1nR)f&q[hOs#v$w*`,pa!}Y#c#g#j#m$^$a+tQ#][Q$ZwR$d}Q%o#OQ%v#SQ%|#WQ'{%YQ(h%rQ(l%wQ(t%}Q(w&OQ+h(qQ-V*|Q.k-aQ/h.lR0Y/gQ$cyQ(d%pR+_(eQ/g.jR0z0pR#VZR#[[R%_!nQ%]!nV*}(O+O-W!]!qQ!s#r$P$b$q$}%S%T%U%V%W%X%r%w%}&O&t'a'x)`)k*U+Z+d,h-g0n1dR%b!pQ&W#cQ&Z#gQ&]#jQ&_#mR-l+tQ)O&WQ)S&ZQ)W&]Q)[&_S+x)P)QS+z)T)US+|)X)YS,O)])^Q-n+yQ-o+{Q-p+}Q-q,PQ.o-lS/i.p.qR0Z/jQ$m!SQ&{$aQ*Z'bR,l*[Q#zmQ$f!PQ$i!QR'T$hQ)p'SR,Y)sQ)p'SQ,X)rR,Y)sR$k!RR)}'YXqOs*`,pQ$s!WR'c$tQ$z!ZR'd$uR*s'pQ*q'pV.^-P._/OQ/_.cQ/|/XR/}/YU/W.c/X/YQ0R/[Q0_/qQ0d/wU0f/y0g0vQ0k0OQ0y0lQ0{0qU0}0r1P1XQ1Y1RQ1^1WR1_1ZR0Q/ZR0a/q",
  nodeNames: "⚠ print { { { { Comment Script AssignStatement * BinaryExpression BitOp BitOp BitOp BitOp ArithOp ArithOp @ ArithOp ** UnaryExpression ArithOp BitOp AwaitExpression await ) ( ParenthesizedExpression BinaryExpression or and CompareOp in not is UnaryExpression ConditionalExpression if else LambdaExpression lambda ParamList VariableName AssignOp , : NamedExpression AssignOp YieldExpression yield from TupleExpression ComprehensionExpression async for LambdaExpression ] [ ArrayExpression ArrayComprehensionExpression } { DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression CallExpression ArgList AssignOp MemberExpression . PropertyName Number String FormatString FormatReplacement FormatSelfDoc FormatConversion FormatSpec FormatReplacement FormatSelfDoc FormatReplacement FormatSelfDoc FormatReplacement FormatSelfDoc FormatReplacement FormatSelfDoc ContinuedString Ellipsis None Boolean TypeDef AssignOp UpdateStatement UpdateOp ExpressionStatement DeleteStatement del PassStatement pass BreakStatement break ContinueStatement continue ReturnStatement return YieldStatement PrintStatement RaiseStatement raise ImportStatement import as ScopeStatement global nonlocal AssertStatement assert TypeDefinition type TypeParamList TypeParam StatementGroup ; IfStatement Body elif WhileStatement while ForStatement TryStatement try except finally WithStatement with FunctionDefinition def ParamList AssignOp TypeDef ClassDefinition class DecoratedStatement Decorator At MatchStatement match MatchBody MatchClause case CapturePattern LiteralPattern ArithOp ArithOp AsPattern OrPattern LogicOp AttributePattern SequencePattern MappingPattern StarPattern ClassPattern PatternArgList KeywordPattern KeywordPattern Guard",
  maxTerm: 288,
  context: UO,
  nodeProps: [
    ["isolate", -8, 6, 73, 74, 75, 79, 81, 83, 85, ""],
    ["group", -15, 8, 93, 95, 96, 98, 100, 102, 104, 106, 107, 108, 110, 113, 116, 118, "Statement Statement", -22, 10, 20, 23, 27, 42, 51, 52, 58, 59, 62, 63, 64, 65, 66, 69, 72, 73, 74, 87, 88, 89, 90, "Expression", -10, 122, 124, 127, 129, 130, 134, 136, 141, 143, 146, "Statement", -9, 151, 152, 155, 156, 158, 159, 160, 161, 162, "Pattern"],
    ["openedBy", 25, "(", 56, "[", 60, "{"],
    ["closedBy", 26, ")", 57, "]", 61, "}"]
  ],
  propSources: [CO],
  skippedNodes: [0, 6],
  repeatNodeCount: 38,
  tokenData: "%-W#sR!`OX%TXY=|Y[%T[]=|]p%Tpq=|qr@_rsDOst!+|tu%Tuv!Nnvw#!|wx#$Wxy#:Uyz#;Yz{#<^{|#>x|}#@S}!O#AW!O!P#Ci!P!Q#N_!Q!R$!y!R![$&w![!]$1e!]!^$3s!^!_$4w!_!`$7c!`!a$8m!a!b%T!b!c$;U!c!d$<b!d!e$>W!e!h$<b!h!i$H[!i!t$<b!t!u%#r!u!w$<b!w!x$Fl!x!}$<b!}#O%%z#O#P?d#P#Q%'O#Q#R%(S#R#S$<b#S#T%T#T#U$<b#U#V$>W#V#Y$<b#Y#Z$H[#Z#f$<b#f#g%#r#g#i$<b#i#j$Fl#j#o$<b#o#p%)^#p#q%*S#q#r%+^#r#s%,S#s$g%T$g;'S$<b;'S;=`$>Q<%lO$<b!n%^]&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n&^]&w!b&oSOr%Trs'Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n'^]&w!b&oSOr%Trs(Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!f(^Z&w!b&oSOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!f)UZ&w!bOw(Vwx)wx#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!f)|Z&w!bOw(Vwx*ox#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V!b*tT&w!bO#o*o#p#q*o#r;'S*o;'S;=`+T<%lO*o!b+WP;=`<%l*o!f+`W&w!bO#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`.d;=`<%l+x<%lO(VS+}V&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS,gVOw+xwx,|x#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS-PUOw+xx#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xS-fRO;'S+x;'S;=`-o;=`O+xS-tW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l+x<%lO+xS.aP;=`<%l+x!f.iW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l(V<%lO+x!f/UP;=`<%l(V!n/`]&w!b&rWOr%Trs&Vsw%Twx0Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!n0`]&w!b&rWOr%Trs&Vsw%Twx1Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!j1`Z&w!b&rWOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j2WZ&w!bOr1Xrs2ys#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j3OZ&w!bOr1Xrs*os#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X!j3vW&w!bO#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`6z;=`<%l4`<%lO1XW4eV&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W4}VOr4`rs5ds#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W5gUOr4`s#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`W5|RO;'S4`;'S;=`6V;=`O4`W6[W&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l4`<%lO4`W6wP;=`<%l4`!j7PW&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l1X<%lO4`!j7lP;=`<%l1X!n7tW&w!bO#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=P;=`<%l8^<%lO%T[8eX&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[9VX&oSOr8^rs9rsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[9wX&oSOr8^rs+xsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[:iX&rWOr8^rs9Qsw8^wx;Ux#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[;ZX&rWOr8^rs9Qsw8^wx4`x#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^[;yRO;'S8^;'S;=`<S;=`O8^[<ZY&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l8^<%lO8^[<|P;=`<%l8^!n=WY&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l%T<%lO8^!n=yP;=`<%l%T#s>Xc&w!b&oS&rW%u!TOX%TXY=|Y[%T[]=|]p%Tpq=|qr%Trs&Vsw%Twx/Xx#O%T#O#P?d#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s?i[&w!bOY%TYZ=|Z]%T]^=|^#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=P;=`<%l8^<%lO%T!q@hd&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`#O%T#O#P7o#P#T%T#T#UBz#U#f%T#f#gBz#g#hBz#h#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!qBR]oR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!qCV]!oR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#cDXa&w!b&oS&msOYE^YZ%TZ]E^]^%T^rE^rs!)|swE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cEia&w!b&oS&rW&msOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cFw]&w!b&oS&msOr%Trs'Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#cGya&w!b&rW&msOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxIOx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#cIXa&w!b&rW&msOYE^YZ%TZ]E^]^%T^rE^rsFnswE^wxJ^x#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#_Jg_&w!b&rW&msOYJ^YZ1XZ]J^]^1X^rJ^rsKfs#OJ^#O#PL`#P#oJ^#o#pL}#p#qJ^#q#rL}#r;'SJ^;'S;=`!!o<%lOJ^#_KmZ&w!b&msOr1Xrs2ys#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#_LeW&w!bO#oJ^#o#pL}#p#qJ^#q#rL}#r;'SJ^;'S;=`! r;=`<%lL}<%lOJ^{MUZ&rW&msOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l<%lOL}{M|V&msOr4`rs5ds#O4`#O#P5y#P;'S4`;'S;=`6t<%lO4`{NfRO;'SL};'S;=`No;=`OL}{Nv[&rW&msOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l;=`<%lL}<%lOL}{! oP;=`<%lL}#_! y[&rW&msOYL}YZ4`Z]L}]^4`^rL}rsMws#OL}#O#PNc#P;'SL};'S;=`! l;=`<%lJ^<%lOL}#_!!rP;=`<%lJ^#c!!zW&w!bO#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!(q;=`<%l!#d<%lOE^!P!#m]&oS&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!$mX&oS&msOr8^rs9rsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^!P!%a]&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!&Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!&a]&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwxL}x#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k<%lO!#d!P!']RO;'S!#d;'S;=`!'f;=`O!#d!P!'o^&oS&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k;=`<%l!#d<%lO!#d!P!(nP;=`<%l!#d#c!(z^&oS&rW&msOY!#dYZ8^Z]!#d]^8^^r!#drs!$fsw!#dwx!%Yx#O!#d#O#P!'Y#P;'S!#d;'S;=`!(k;=`<%lE^<%lO!#d#c!)yP;=`<%lE^#c!*V]&w!b&oS&msOr%Trs!+Osw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c!+ZZ&sW&w!b&oS&qsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#s!,XaU!T&w!b&oS&rWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!-gaU!T&w!b&oSOY!+|YZ%TZ]!+|]^%T^r!+|rs!.lsw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!.uaU!T&w!b&oSOY!+|YZ%TZ]!+|]^%T^r!+|rs!/zsw!+|wx!:hx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#k!0T_U!T&w!b&oSOY!/zYZ(VZ]!/z]^(V^w!/zwx!1Sx#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#k!1Z_U!T&w!bOY!/zYZ(VZ]!/z]^(V^w!/zwx!2Yx#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#k!2a_U!T&w!bOY!/zYZ(VZ]!/z]^(V^w!/zwx!3`x#O!/z#O#P!4z#P#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!:b<%lO!/z#g!3gZU!T&w!bOY!3`YZ*oZ]!3`]^*o^#o!3`#o#p!4Y#p#q!3`#q#r!4Y#r;'S!3`;'S;=`!4t<%lO!3`!T!4_TU!TOY!4YZ]!4Y^;'S!4Y;'S;=`!4n<%lO!4Y!T!4qP;=`<%l!4Y#g!4wP;=`<%l!3`#k!5R[U!T&w!bOY!/zYZ(VZ]!/z]^(V^#o!/z#o#p!5w#p#q!/z#q#r!5w#r;'S!/z;'S;=`!9s;=`<%l+x<%lO!/z!X!6OZU!T&oSOY!5wYZ+xZ]!5w]^+x^w!5wwx!6qx#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!6vZU!TOY!5wYZ+xZ]!5w]^+x^w!5wwx!7ix#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!7nZU!TOY!5wYZ+xZ]!5w]^+x^w!5wwx!4Yx#O!5w#O#P!8a#P;'S!5w;'S;=`!9m<%lO!5w!X!8fWU!TOY!5wYZ+xZ]!5w]^+x^;'S!5w;'S;=`!9O;=`<%l+x<%lO!5w!X!9TW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l!5w<%lO+x!X!9pP;=`<%l!5w#k!9xW&oSOw+xwx,dx#O+x#O#P-c#P;'S+x;'S;=`.^;=`<%l!/z<%lO+x#k!:eP;=`<%l!/z#s!:qaU!T&w!b&rWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!;vx#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#s!<PaU!T&w!b&rWOY!+|YZ%TZ]!+|]^%T^r!+|rs!-^sw!+|wx!=Ux#O!+|#O#P!FW#P#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Nh<%lO!+|#o!=__U!T&w!b&rWOY!=UYZ1XZ]!=U]^1X^r!=Urs!>^s#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!>e_U!T&w!bOY!=UYZ1XZ]!=U]^1X^r!=Urs!?ds#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!?k_U!T&w!bOY!=UYZ1XZ]!=U]^1X^r!=Urs!3`s#O!=U#O#P!@j#P#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!FQ<%lO!=U#o!@q[U!T&w!bOY!=UYZ1XZ]!=U]^1X^#o!=U#o#p!Ag#p#q!=U#q#r!Ag#r;'S!=U;'S;=`!Ec;=`<%l4`<%lO!=U!]!AnZU!T&rWOY!AgYZ4`Z]!Ag]^4`^r!Agrs!Bas#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!BfZU!TOY!AgYZ4`Z]!Ag]^4`^r!Agrs!CXs#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!C^ZU!TOY!AgYZ4`Z]!Ag]^4`^r!Agrs!4Ys#O!Ag#O#P!DP#P;'S!Ag;'S;=`!E]<%lO!Ag!]!DUWU!TOY!AgYZ4`Z]!Ag]^4`^;'S!Ag;'S;=`!Dn;=`<%l4`<%lO!Ag!]!DsW&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l!Ag<%lO4`!]!E`P;=`<%l!Ag#o!EhW&rWOr4`rs4zs#O4`#O#P5y#P;'S4`;'S;=`6t;=`<%l!=U<%lO4`#o!FTP;=`<%l!=U#s!F_[U!T&w!bOY!+|YZ%TZ]!+|]^%T^#o!+|#o#p!GT#p#q!+|#q#r!GT#r;'S!+|;'S;=`!Mq;=`<%l8^<%lO!+|!a!G^]U!T&oS&rWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!H^]U!T&oSOY!GTYZ8^Z]!GT]^8^^r!GTrs!IVsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!I^]U!T&oSOY!GTYZ8^Z]!GT]^8^^r!GTrs!5wsw!GTwx!JVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!J^]U!T&rWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!KVx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!K^]U!T&rWOY!GTYZ8^Z]!GT]^8^^r!GTrs!HVsw!GTwx!Agx#O!GT#O#P!LV#P;'S!GT;'S;=`!Mk<%lO!GT!a!L[WU!TOY!GTYZ8^Z]!GT]^8^^;'S!GT;'S;=`!Lt;=`<%l8^<%lO!GT!a!L{Y&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l!GT<%lO8^!a!MnP;=`<%l!GT#s!MxY&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y;=`<%l!+|<%lO8^#s!NkP;=`<%l!+|#b!Ny_&UQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b#!T]#Qr&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b##X_&OQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#$aa&w!b&rW&msOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx#8Ux#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#%qa&w!b&oS&rW&msOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#'Pa&w!b&oS&msOY#%fYZ%TZ]#%f]^%T^r#%frs#(Usw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c#(_a&w!b&oS&msOY#%fYZ%TZ]#%f]^%T^r#%frs#)dsw#%fwx#/{x#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#Z#)m_&w!b&oS&msOY#)dYZ(VZ]#)d]^(V^w#)dwx#*lx#O#)d#O#P#+f#P#o#)d#o#p#,T#p#q#)d#q#r#,T#r;'S#)d;'S;=`#/u<%lO#)d#Z#*sZ&w!b&msOw(Vwx)wx#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#Z#+kW&w!bO#o#)d#o#p#,T#p#q#)d#q#r#,T#r;'S#)d;'S;=`#.x;=`<%l#,T<%lO#)dw#,[Z&oS&msOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r<%lO#,Tw#-SV&msOw+xwx,|x#O+x#O#P-c#P;'S+x;'S;=`.^<%lO+xw#-lRO;'S#,T;'S;=`#-u;=`O#,Tw#-|[&oS&msOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r;=`<%l#,T<%lO#,Tw#.uP;=`<%l#,T#Z#/P[&oS&msOY#,TYZ+xZ]#,T]^+x^w#,Twx#,}x#O#,T#O#P#-i#P;'S#,T;'S;=`#.r;=`<%l#)d<%lO#,T#Z#/xP;=`<%l#)d#c#0U]&w!b&rW&msOr%Trs&Vsw%Twx0Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#1SW&w!bO#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#6y;=`<%l#1l<%lO#%f!P#1u]&oS&rW&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#2u]&oS&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#3nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#3u]&oS&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#,Tsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s<%lO#1l!P#4uX&rW&msOr8^rs9Qsw8^wx;Ux#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^!P#5eRO;'S#1l;'S;=`#5n;=`O#1l!P#5w^&oS&rW&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s;=`<%l#1l<%lO#1l!P#6vP;=`<%l#1l#c#7S^&oS&rW&msOY#1lYZ8^Z]#1l]^8^^r#1lrs#2nsw#1lwx#4nx#O#1l#O#P#5b#P;'S#1l;'S;=`#6s;=`<%l#%f<%lO#1l#c#8RP;=`<%l#%f#c#8_]&w!b&rW&msOr%Trs&Vsw%Twx#9Wx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#9cZ&pS&w!b&rW&nsOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#c#:a]js&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q#;e]iR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#<iaXs&w!b&oS&rWOr%Trs&Vsw%Twx/Xxz%Tz{#=n{!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#=y_cR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#?T_&Rs&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q#@_]|R&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s#Ac`&Ss&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`!a#Be!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#O#Bp]'W`&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#Cta!hQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P#Dy!P!Q%T!Q![#GV![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#ES_&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P#FR!P#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#F^]!zs&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Gbi!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#GV![!g%T!g!h#IP!h!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S#GV#S#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#IYc&w!b&oS&rWOr%Trs&Vsw%Twx/Xx{%T{|#Je|}%T}!O#Je!O!Q%T!Q![#Km![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Jn_&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#Km![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Kxe!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#Km![!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S#Km#S#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a#Mf]!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c#Nja&TR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!P%T!P!Q$ o!Q!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$ z_&VQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$#Uw!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P$%o!P!Q%T!Q![$&w![!d%T!d!e$(w!e!g%T!g!h#IP!h!l%T!l!m#MZ!m!q%T!q!r$+m!r!z%T!z!{$.]!{#O%T#O#P7o#P#R%T#R#S$&w#S#U%T#U#V$(w#V#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#c%T#c#d$+m#d#l%T#l#m$.]#m#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$%x_&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![#GV![#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$'Sk!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!O%T!O!P$%o!P!Q%T!Q![$&w![!g%T!g!h#IP!h!l%T!l!m#MZ!m#O%T#O#P7o#P#R%T#R#S$&w#S#X%T#X#Y#IP#Y#^%T#^#_#MZ#_#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$)Qb&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!R$*Y!R!S$*Y!S#O%T#O#P7o#P#R%T#R#S$*Y#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$*eb!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!R$*Y!R!S$*Y!S#O%T#O#P7o#P#R%T#R#S$*Y#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$+va&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!Y$,{!Y#O%T#O#P7o#P#R%T#R#S$,{#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$-Wa!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q!Y$,{!Y#O%T#O#P7o#P#R%T#R#S$,{#S#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$.fe&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![$/w![!c%T!c!i$/w!i#O%T#O#P7o#P#R%T#R#S$/w#S#T%T#T#Z$/w#Z#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a$0Se!jq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!Q%T!Q![$/w![!c%T!c!i$/w!i#O%T#O#P7o#P#R%T#R#S$/w#S#T%T#T#Z$/w#Z#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s$1p_}!T&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`$2o!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q$2z]&_R&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$4O]#os&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$5SaoR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!^%T!^!_$6X!_!`Av!`!aAv!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$6d_&PQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$7n_&^s&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$8x`oR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`Av!`!a$9z!a#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b$:V_&QQ&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$;c_aQ$VP&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#s$<oe&w!b&oS&rW&l`&XsOr%Trs&Vsw%Twx/Xx!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s$>TP;=`<%l$<b#s$>ei&w!b&oS&rW&l`&XsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!t$<b!t!u$Fl!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#f$<b#f#g$Fl#g#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c$@]a&w!b&oS&msOYE^YZ%TZ]E^]^%T^rE^rs$AbswE^wxGpx#OE^#O#P!!u#P#oE^#o#p!#d#p#qE^#q#r!#d#r;'SE^;'S;=`!)v<%lOE^#c$Ak]&w!b&oS&msOr%Trs$Bdsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#Z$BmZ&w!b&oS&qsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#c$Cia&w!b&rW&msOY#%fYZ%TZ]#%f]^%T^r#%frs#&vsw#%fwx$Dnx#O#%f#O#P#0}#P#o#%f#o#p#1l#p#q#%f#q#r#1l#r;'S#%f;'S;=`#8O<%lO#%f#c$Dw]&w!b&rW&msOr%Trs&Vsw%Twx$Epx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#_$EyZ&w!b&rW&nsOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#s$Fye&w!b&oS&rW&l`&XsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s$Hii&w!b&oS&rW&l`&XsOr%Trs$JWsw%Twx$MUx!Q%T!Q![$<b![!c%T!c!t$<b!t!u%!S!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#f$<b#f#g%!S#g#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c$Ja]&w!b&oS&xsOr%Trs$KYsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$Ka]&w!b&oSOr%Trs$LYsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#Z$LcZ&w!b&oS&zsOw(Vwx)Px#O(V#O#P+Z#P#o(V#o#p+x#p#q(V#q#r+x#r;'S(V;'S;=`/R<%lO(V#c$M_]&w!b&rW&tsOr%Trs&Vsw%Twx$NWx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#c$N_]&w!b&rWOr%Trs&Vsw%Twx% Wx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#_% aZ&w!b&rW&ysOr1Xrs2Rs#O1X#O#P3q#P#o1X#o#p4`#p#q1X#q#r4`#r;'S1X;'S;=`7i<%lO1X#s%!ae&w!b&oS&rW&l`&XsOr%Trs$JWsw%Twx$MUx!Q%T!Q![$<b![!c%T!c!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#s%$Pm&w!b&oS&rW&l`&XsOr%Trs$@Ssw%Twx$C`x!Q%T!Q![$<b![!c%T!c!h$<b!h!i%!S!i!t$<b!t!u$Fl!u!}$<b!}#O%T#O#P7o#P#R%T#R#S$<b#S#T%T#T#U$<b#U#V$Fl#V#Y$<b#Y#Z%!S#Z#o$<b#o#p8^#p#q%T#q#r8^#r$g%T$g;'S$<b;'S;=`$>Q<%lO$<b#c%&V]!Zs&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q%'Z]!YR&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#b%(__%}Q&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T#a%)gX!_#T&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^#c%*__%|R&w!b&oS&rWOr%Trs&Vsw%Twx/Xx!_%T!_!`# x!`#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T!q%+gX!^!e&oS&rWOr8^rs9Qsw8^wx:dx#O8^#O#P;v#P;'S8^;'S;=`<y<%lO8^#a%,_]&Wq&w!b&oS&rWOr%Trs&Vsw%Twx/Xx#O%T#O#P7o#P#o%T#o#p8^#p#q%T#q#r8^#r;'S%T;'S;=`=v<%lO%T",
  tokenizers: [zO, kO, GO, jO, AO, FO, IO, 0, 1, 2, 3, 4, 5, 6],
  topRules: { Script: [0, 7] },
  specialized: [{ term: 239, get: (O) => NO[O] || -1 }],
  tokenPrec: 7500
}), f = /* @__PURE__ */ new D(), W = /* @__PURE__ */ new Set([
  "Script",
  "Body",
  "FunctionDefinition",
  "ClassDefinition",
  "LambdaExpression",
  "ForStatement",
  "MatchClause"
]);
function n(O) {
  return (r, o, a) => {
    if (a)
      return !1;
    let e = r.node.getChild("VariableName");
    return e && o(e, O), !0;
  };
}
const LO = {
  FunctionDefinition: /* @__PURE__ */ n("function"),
  ClassDefinition: /* @__PURE__ */ n("class"),
  ForStatement(O, r, o) {
    if (o) {
      for (let a = O.node.firstChild; a; a = a.nextSibling)
        if (a.name == "VariableName")
          r(a, "variable");
        else if (a.name == "in")
          break;
    }
  },
  ImportStatement(O, r) {
    var o, a;
    let { node: e } = O, Q = ((o = e.firstChild) === null || o === void 0 ? void 0 : o.name) == "from";
    for (let x = e.getChild("import"); x; x = x.nextSibling)
      x.name == "VariableName" && ((a = x.nextSibling) === null || a === void 0 ? void 0 : a.name) != "as" && r(x, Q ? "variable" : "namespace");
  },
  AssignStatement(O, r) {
    for (let o = O.node.firstChild; o; o = o.nextSibling)
      if (o.name == "VariableName")
        r(o, "variable");
      else if (o.name == ":" || o.name == "AssignOp")
        break;
  },
  ParamList(O, r) {
    for (let o = null, a = O.node.firstChild; a; a = a.nextSibling)
      a.name == "VariableName" && (!o || !/\*|AssignOp/.test(o.name)) && r(a, "variable"), o = a;
  },
  CapturePattern: /* @__PURE__ */ n("variable"),
  AsPattern: /* @__PURE__ */ n("variable"),
  __proto__: null
};
function V(O, r) {
  let o = f.get(r);
  if (o)
    return o;
  let a = [], e = !0;
  function Q(x, s) {
    let h = O.sliceString(x.from, x.to);
    a.push({ label: h, type: s });
  }
  return r.cursor(C.IncludeAnonymous).iterate((x) => {
    if (x.name) {
      let s = LO[x.name];
      if (s && s(x, Q, e) || !e && W.has(x.name))
        return !1;
      e = !1;
    } else if (x.to - x.from > 8192) {
      for (let s of V(O, x.node))
        a.push(s);
      return !1;
    }
  }), f.set(r, a), a;
}
const b = /^[\w\xa1-\uffff][\w\d\xa1-\uffff]*$/, g = ["String", "FormatString", "Comment", "PropertyName"];
function HO(O) {
  let r = _(O.state).resolveInner(O.pos, -1);
  if (g.indexOf(r.name) > -1)
    return null;
  let o = r.name == "VariableName" || r.to - r.from < 20 && b.test(O.state.sliceDoc(r.from, r.to));
  if (!o && !O.explicit)
    return null;
  let a = [];
  for (let e = r; e; e = e.parent)
    W.has(e.name) && (a = a.concat(V(O.state.doc, e)));
  return {
    options: a,
    from: o ? r.from : O.pos,
    validFor: b
  };
}
const JO = /* @__PURE__ */ [
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
].map((O) => ({ label: O, type: "constant" })).concat(/* @__PURE__ */ [
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
].map((O) => ({ label: O, type: "type" }))).concat(/* @__PURE__ */ [
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
].map((O) => ({ label: O, type: "class" }))).concat(/* @__PURE__ */ [
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
].map((O) => ({ label: O, type: "function" }))), BO = [
  /* @__PURE__ */ S("def ${name}(${params}):\n	${}", {
    label: "def",
    detail: "function",
    type: "keyword"
  }),
  /* @__PURE__ */ S("for ${name} in ${collection}:\n	${}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ S("while ${}:\n	${}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ S("try:\n	${}\nexcept ${error}:\n	${}", {
    label: "try",
    detail: "/ except block",
    type: "keyword"
  }),
  /* @__PURE__ */ S(`if \${}:
	
`, {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ S("if ${}:\n	${}\nelse:\n	${}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ S("class ${name}:\n	def __init__(self, ${params}):\n			${}", {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ S("import ${module}", {
    label: "import",
    detail: "statement",
    type: "keyword"
  }),
  /* @__PURE__ */ S("from ${module} import ${names}", {
    label: "from",
    detail: "import",
    type: "keyword"
  })
], MO = /* @__PURE__ */ U(g, /* @__PURE__ */ N(/* @__PURE__ */ JO.concat(BO)));
function v(O, r) {
  let o = O.baseIndentFor(r), a = O.lineAt(O.pos, -1), e = a.from + a.text.length;
  return /^\s*($|#)/.test(a.text) && O.node.to < e + 100 && !/\S/.test(O.state.sliceDoc(e, O.node.to)) && O.lineIndent(O.pos, -1) <= o || /^\s*(else:|elif |except |finally:)/.test(O.textAfter) && O.lineIndent(O.pos, -1) > o ? null : o + O.unit;
}
const X = /* @__PURE__ */ z.define({
  name: "python",
  parser: /* @__PURE__ */ DO.configure({
    props: [
      /* @__PURE__ */ j.add({
        Body: (O) => {
          var r;
          return (r = v(O, O.node)) !== null && r !== void 0 ? r : O.continue();
        },
        IfStatement: (O) => /^\s*(else:|elif )/.test(O.textAfter) ? O.baseIndent : O.continue(),
        TryStatement: (O) => /^\s*(except |finally:|else:)/.test(O.textAfter) ? O.baseIndent : O.continue(),
        "TupleExpression ComprehensionExpression ParamList ArgList ParenthesizedExpression": /* @__PURE__ */ $({ closing: ")" }),
        "DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression": /* @__PURE__ */ $({ closing: "}" }),
        "ArrayExpression ArrayComprehensionExpression": /* @__PURE__ */ $({ closing: "]" }),
        "String FormatString": () => null,
        Script: (O) => {
          if (O.pos + /\s*/.exec(O.textAfter)[0].length >= O.node.to) {
            let r = null;
            for (let o = O.node, a = o.to; o = o.lastChild, !(!o || o.to != a); )
              o.type.name == "Body" && (r = o);
            if (r) {
              let o = v(O, r);
              if (o != null)
                return o;
            }
          }
          return O.continue();
        }
      }),
      /* @__PURE__ */ A.add({
        "ArrayExpression DictionaryExpression SetExpression TupleExpression": F,
        Body: (O, r) => ({ from: O.from + 1, to: O.to - (O.to == r.doc.length ? 0 : 1) })
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
function rr() {
  return new I(X, [
    X.data.of({ autocomplete: HO }),
    X.data.of({ autocomplete: MO })
  ]);
}
export {
  MO as globalCompletion,
  HO as localCompletionSource,
  rr as python,
  X as pythonLanguage
};
