/** Crée une copie d'un script et remplace l'original par la copie pour que le navigateur l'exécute. */
export function runScript(script: HTMLScriptElement) {
  const newScript = document.createElement('script')
  const attrs = [...script.attributes]
  attrs.forEach(attr => newScript.setAttribute(attr.name, attr.value))
  newScript.textContent = script.textContent
  script.parentNode?.replaceChild(newScript, script)
}
