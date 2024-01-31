import {
  __spreadValues
} from "./chunk.R3ZK4RPV.js";

// src/utilities/emit.ts
function emit(element, name, options) {
  const event = new CustomEvent(name, __spreadValues({
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {}
  }, options));
  element.dispatchEvent(event);
  return event;
}

export {
  emit
};
