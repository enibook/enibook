import "../chunks/chunk.VPCEBHZA.js";

// src/utilities/run-script.ts
function runScript(script) {
  const newScript = document.createElement("script");
  const attrs = [...script.attributes];
  attrs.forEach((attr) => newScript.setAttribute(attr.name, attr.value));
  newScript.textContent = script.textContent;
  script.parentNode?.replaceChild(newScript, script);
}
export {
  runScript
};
