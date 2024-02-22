// src/utilities/emit.ts
function emit(element, name, options) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {},
    ...options
  });
  element.dispatchEvent(event);
  return event;
}

export {
  emit
};
