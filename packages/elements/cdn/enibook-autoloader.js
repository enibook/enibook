import {
  getBasePath
} from "./chunks/chunk.WVRMIH3T.js";
import "./chunks/chunk.VPCEBHZA.js";

// src/enibook-autoloader.ts
var observer = new MutationObserver((mutations) => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        discover(node);
      }
    }
  }
});
async function discover(root) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : "";
  const rootIsEniBookElement = rootTagName?.endsWith("-it");
  const tags = [...root.querySelectorAll(":not(:defined)")].map((el) => el.tagName.toLowerCase()).filter((tag) => tag.endsWith("-it"));
  if (rootIsEniBookElement && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }
  const tagsToRegister = [...new Set(tags)];
  await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));
}
function register(tagName) {
  if (customElements.get(tagName)) {
    console.log(`${tagName} already set`);
    return Promise.resolve();
  }
  const tagWithoutSuffix = tagName.replace(/-it$/i, "");
  const path = getBasePath(`elements/${tagWithoutSuffix}/${tagWithoutSuffix}.js`);
  return new Promise((resolve, reject) => {
    import(path).then(() => resolve()).catch(() => reject(new Error(`Unable to autoload <${tagName}> from ${path}`)));
  });
}
discover(document.body);
observer.observe(document.documentElement, { subtree: true, childList: true });
export {
  discover
};
