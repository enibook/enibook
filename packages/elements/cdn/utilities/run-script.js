import "../chunks/chunk.R3ZK4RPV.js";

// src/utilities/run-script.ts
function runScript(script) {
  var _a;
  const newScript = document.createElement("script");
  const attrs = [...script.attributes];
  attrs.forEach((attr) => newScript.setAttribute(attr.name, attr.value));
  newScript.textContent = script.textContent;
  (_a = script.parentNode) == null ? void 0 : _a.replaceChild(newScript, script);
}
export {
  runScript
};
