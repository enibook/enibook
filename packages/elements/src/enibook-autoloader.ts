import { getBasePath } from './utilities/base-path';

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        discover(node as Element);
      }
    }
  }
});

/**
 * Vérifie qu'un nœud ne contient pas d'éléments non définis et tente de les enregistrer.
 */
export async function discover(root: Element | ShadowRoot) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : '';
  const rootIsEniBookElement = rootTagName?.endsWith('-it');
  const tags = [...root.querySelectorAll(':not(:defined)')]
    .map(el => el.tagName.toLowerCase())
    .filter(tag => tag.endsWith('-it'));

  // Si l'élément racine est un composant EniBook non défini, il est ajouté à la liste.
  if (rootIsEniBookElement && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }

  // Rendre la liste sans doublons.
  const tagsToRegister = [...new Set(tags)];

  await Promise.allSettled(tagsToRegister.map(tagName => register(tagName)));
}

/**
 * Enregistrer un élément par son nom de balise.
 */
function register(tagName: string): Promise<void> {
  // Si l'élément est déjà défini, il n'y a rien à faire.
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }

  const tagWithoutSuffix = tagName.replace(/-it$/i, '');
  const path = getBasePath(`elements/${tagWithoutSuffix}/${tagWithoutSuffix}.js`);

  // L'enregistrer.
  return new Promise((resolve, reject) => {
    import(path).then(() => resolve()).catch(() => reject(new Error(`Unable to autoload <${tagName}> from ${path}`)));
  });
}

// Découverte initiale
discover(document.body);

// Écouter les nouveaux éléments non définis
observer.observe(document.documentElement, { subtree: true, childList: true });
