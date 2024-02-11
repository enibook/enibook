import {
  dedentText
} from "./chunk.2DSJPRN6.js";
import {
  fetchContent
} from "./chunk.KYMJOBQ5.js";
import {
  f,
  i,
  icons,
  s,
  u
} from "./chunk.YQRSMW6G.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.R3ZK4RPV.js";

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/custom-element.js
var t = (t3) => (e4, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t3, e4);
  }) : customElements.define(t3, e4);
};

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/property.js
var o = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r = (t3 = o, e4, r4) => {
  const { kind: n2, metadata: i2 } = r4;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r4.name, t3), "accessor" === n2) {
    const { name: o2 } = r4;
    return { set(r5) {
      const n3 = e4.get.call(this);
      e4.set.call(this, r5), this.requestUpdate(o2, n3, t3);
    }, init(e5) {
      return void 0 !== e5 && this.P(o2, void 0, t3), e5;
    } };
  }
  if ("setter" === n2) {
    const { name: o2 } = r4;
    return function(r5) {
      const n3 = this[o2];
      e4.call(this, r5), this.requestUpdate(o2, n3, t3);
    };
  }
  throw Error("Unsupported decorator location: " + n2);
};
function n(t3) {
  return (e4, o2) => "object" == typeof o2 ? r(t3, e4, o2) : ((t4, e5, o3) => {
    const r4 = e5.hasOwnProperty(o3);
    return e5.constructor.createProperty(o3, r4 ? __spreadProps(__spreadValues({}, t4), { wrapped: true }) : t4), r4 ? Object.getOwnPropertyDescriptor(e5, o3) : void 0;
  })(t3, e4, o2);
}

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/state.js
function r2(r4) {
  return n(__spreadProps(__spreadValues({}, r4), { state: true, attribute: false }));
}

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/event-options.js
function t2(t3) {
  return (n2, o2) => {
    const c = "function" == typeof n2 ? n2 : n2[o2];
    Object.assign(c, t3);
  };
}

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/base.js
var e = (e4, t3, c) => (c.configurable = true, c.enumerable = true, Reflect.decorate && "object" != typeof t3 && Object.defineProperty(e4, t3, c), c);

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/query.js
function e2(e4, r4) {
  return (n2, s2, i2) => {
    const o2 = (t3) => {
      var _a, _b;
      return (_b = (_a = t3.renderRoot) == null ? void 0 : _a.querySelector(e4)) != null ? _b : null;
    };
    if (r4) {
      const { get: e5, set: r5 } = "object" == typeof s2 ? n2 : i2 != null ? i2 : (() => {
        const t3 = Symbol();
        return { get() {
          return this[t3];
        }, set(e6) {
          this[t3] = e6;
        } };
      })();
      return e(n2, s2, { get() {
        let t3 = e5.call(this);
        return void 0 === t3 && (t3 = o2(this), (null !== t3 || this.hasUpdated) && r5.call(this, t3)), t3;
      } });
    }
    return e(n2, s2, { get() {
      return o2(this);
    } });
  };
}

// ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/query-all.js
var e3;
function r3(r4) {
  return (n2, o2) => e(n2, o2, { get() {
    var _a;
    return ((_a = this.renderRoot) != null ? _a : e3 != null ? e3 : e3 = document.createDocumentFragment()).querySelectorAll(r4);
  } });
}

// ../../node_modules/.pnpm/fscreen@1.2.0/node_modules/fscreen/dist/fscreen.esm.js
var key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6
};
var webkit = [
  "webkitFullscreenEnabled",
  "webkitFullscreenElement",
  "webkitRequestFullscreen",
  "webkitExitFullscreen",
  "webkitfullscreenchange",
  "webkitfullscreenerror",
  "-webkit-full-screen"
];
var moz = [
  "mozFullScreenEnabled",
  "mozFullScreenElement",
  "mozRequestFullScreen",
  "mozCancelFullScreen",
  "mozfullscreenchange",
  "mozfullscreenerror",
  "-moz-full-screen"
];
var ms = [
  "msFullscreenEnabled",
  "msFullscreenElement",
  "msRequestFullscreen",
  "msExitFullscreen",
  "MSFullscreenChange",
  "MSFullscreenError",
  "-ms-fullscreen"
];
var document2 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document2 && Object.keys(key) || webkit[0] in document2 && webkit || moz[0] in document2 && moz || ms[0] in document2 && ms || [];
var fscreen = {
  requestFullscreen: function(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document2[vendor[key.exitFullscreen]].bind(document2);
  },
  get fullscreenPseudoClass() {
    return ":" + vendor[key.fullscreen];
  },
  addEventListener: function(type, handler, options) {
    return document2.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function(type, handler, options) {
    return document2.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document2[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {
  },
  get fullscreenElement() {
    return document2[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {
  },
  get onfullscreenchange() {
    return document2[("on" + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document2[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document2[("on" + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document2[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};
var fscreen_esm_default = fscreen;

// src/elements/base/base.css.ts
var base_css_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  .hidden,
  [hidden] {
    display: none !important;
  }

  .rtl {
    direction: rtl;
  }

  .title {
    line-height: 1.45;
    color: #7a2518;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 0.25em;
  }
`;

// src/elements/base/base.ts
var BaseIt = class extends s {
  constructor() {
    super(...arguments);
    this.fullscreen = false;
    this.lang = navigator.language;
  }
  /**
   * Emission d'un événement `CustomEvent` par l'élément.
   *
   * Par défaut, l'événement se propage dans le DOM (`bubbles: true`);
   * il traverse également la frontière du DOM fantôme (_Shadow DOM_, `composed:true`)
   * et ne peut être empêché de le faire (`cancelable: false`).
   *
   */
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
  async getCode(filename, part) {
    let code = "";
    const tag = this.tagName.toLowerCase();
    const innerScriptTag = this.querySelector(`script[type="${tag}/${part}"]`);
    if (filename) {
      await fetchContent(filename).then((response) => {
        code += response;
      });
    }
    if (innerScriptTag) {
      code += dedentText(innerScriptTag.innerHTML);
      code = code.replace(/&lt;(\/?script)(.*?)&gt;/g, "<$1$2>");
    }
    return code;
  }
  /**
   * Passe en mode plein écran ou sort du mode plein écran.
   *
   * On peut utiliser la touche <kbd>Esc</kbd> ou <kbd>F11</kbd> pour sortir du mode plein écran.
   */
  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    if (!fscreen_esm_default.fullscreenElement) {
      fscreen_esm_default.requestFullscreen(this);
    } else {
      fscreen_esm_default.exitFullscreen();
    }
  }
  /**
   * Crée une alerte qui affiche le message associé pendant une durée donnée.
   *
   * @param {string} message - le message d'alerte
   * @param {string} [variant="primary"] - apparence du message
   * @param {string} [icon="it-mdi-information-variant-circle-outline"] - icône associée au message.
   * @param {string} [duration="3000"] - durée d'affichage de l'alerte en millisecondes.
   * @returns
   * @memberof EnibookElement
   */
  notify(message, variant = "primary", icon = "mdi-information-variant-circle-outline", duration = "3000") {
    const alert = Object.assign(document.createElement("sl-alert"), {
      variant,
      closable: true,
      duration,
      innerHTML: `
          <div slot="icon">${icons[icon]}</div>
          ${this.wrap(message)}
        `
    });
    document.body.append(alert);
    return alert.toast();
  }
  wrap(message) {
    const div = document.createElement("div");
    div.textContent = message;
    return div.innerHTML;
  }
};
/** Style propre à la classe. */
BaseIt.styles = [base_css_default];
__decorateClass([
  r2()
], BaseIt.prototype, "fullscreen", 2);
__decorateClass([
  n({ type: String, reflect: true })
], BaseIt.prototype, "lang", 2);

export {
  t,
  n,
  r2 as r,
  t2,
  e2 as e,
  r3 as r2,
  BaseIt
};
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
