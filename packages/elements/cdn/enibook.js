import {
  ToolsIt
} from "./chunks/chunk.5ZOVH7DN.js";
import {
  IconIt
} from "./chunks/chunk.RXPPYSW5.js";
import {
  LoremIpsumIt
} from "./chunks/chunk.G7A4YFOA.js";
import "./chunks/chunk.I47CHKS7.js";
import {
  PlaygroundIt
} from "./chunks/chunk.77M4VIQD.js";
import {
  FrameIt
} from "./chunks/chunk.YXPZKRXP.js";
import "./chunks/chunk.52PXAZDJ.js";
import {
  ThemeIt
} from "./chunks/chunk.W5XTP3BG.js";
import {
  ToggleIt
} from "./chunks/chunk.MSPIZTJP.js";
import {
  ClockIt
} from "./chunks/chunk.GRBBORM6.js";
import "./chunks/chunk.UJCKPGYB.js";
import "./chunks/chunk.6PIW3KID.js";
import {
  ColorIt
} from "./chunks/chunk.NJH5QD5V.js";
import "./chunks/chunk.4QZYHJW2.js";
import "./chunks/chunk.PBVLZ3JP.js";
import {
  CodeIt
} from "./chunks/chunk.UPVHHU6P.js";
import "./chunks/chunk.A7AB44PI.js";
import "./chunks/chunk.LBFU4FUF.js";
import "./chunks/chunk.3IXWQSYW.js";
import "./chunks/chunk.ULMMSXWU.js";
import "./chunks/chunk.CB3AWS6T.js";
import "./chunks/chunk.WBEW6TFI.js";
import {
  ToolbarIt
} from "./chunks/chunk.2J4N3B4C.js";
import "./chunks/chunk.AHSVXL6C.js";
import "./chunks/chunk.K5OJJ7PZ.js";
import "./chunks/chunk.UIZNXVVH.js";
import "./chunks/chunk.SW5SF74Y.js";
import "./chunks/chunk.4A62MQAW.js";
import "./chunks/chunk.ALW4DVUU.js";
import "./chunks/chunk.2DSJPRN6.js";
import "./chunks/chunk.KYMJOBQ5.js";
import "./chunks/chunk.YQRSMW6G.js";
import "./chunks/chunk.EVELBXKN.js";
import "./chunks/chunk.CO4X42B5.js";
import "./chunks/chunk.JEYYOM6X.js";
import {
  __commonJS,
  __toESM
} from "./chunks/chunk.R3ZK4RPV.js";

// ../../node_modules/.pnpm/debounce@2.0.0/node_modules/debounce/index.js
var require_debounce = __commonJS({
  "../../node_modules/.pnpm/debounce@2.0.0/node_modules/debounce/index.js"(exports, module) {
    function debounce(function_, wait = 100, options = {}) {
      if (typeof function_ !== "function") {
        throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
      }
      if (wait < 0) {
        throw new RangeError("`wait` must not be negative.");
      }
      const { immediate } = typeof options === "boolean" ? { immediate: options } : options;
      let storedContext;
      let storedArguments;
      let timeoutId;
      let timestamp;
      let result;
      function later() {
        const last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
          timeoutId = setTimeout(later, wait - last);
        } else {
          timeoutId = void 0;
          if (!immediate) {
            const callContext = storedContext;
            const callArguments = storedArguments;
            storedContext = void 0;
            storedArguments = void 0;
            result = function_.apply(callContext, callArguments);
          }
        }
      }
      const debounced = function(...arguments_) {
        if (storedContext && this !== storedContext) {
          throw new Error("Debounced method called with different contexts.");
        }
        storedContext = this;
        storedArguments = arguments_;
        timestamp = Date.now();
        const callNow = immediate && !timeoutId;
        if (!timeoutId) {
          timeoutId = setTimeout(later, wait);
        }
        if (callNow) {
          const callContext = storedContext;
          const callArguments = storedArguments;
          storedContext = void 0;
          storedArguments = void 0;
          result = function_.apply(callContext, callArguments);
        }
        return result;
      };
      debounced.clear = () => {
        if (!timeoutId) {
          return;
        }
        clearTimeout(timeoutId);
        timeoutId = void 0;
      };
      debounced.flush = () => {
        if (!timeoutId) {
          return;
        }
        const callContext = storedContext;
        const callArguments = storedArguments;
        storedContext = void 0;
        storedArguments = void 0;
        result = function_.apply(callContext, callArguments);
        clearTimeout(timeoutId);
        timeoutId = void 0;
      };
      return debounced;
    }
    module.exports.debounce = debounce;
    module.exports = debounce;
  }
});

// src/enibook.ts
var import_debounce = __toESM(require_debounce(), 1);
var export_debounce = import_debounce.default;
export {
  ClockIt,
  CodeIt,
  ColorIt,
  FrameIt,
  IconIt,
  LoremIpsumIt,
  PlaygroundIt,
  ThemeIt,
  ToggleIt,
  ToolbarIt,
  ToolsIt,
  export_debounce as debounce
};
