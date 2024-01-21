/**
 * Emission d'un évènement personnalisé avec des valeurs par défaut plus pratiques.
 *
 * @param {HTMLElement} element - l'élément émetteur
 * @param {string} name - le nom de l'évènement.
 * @param {CustomEventInit} options - les options associées à l'évènement.
 * @returns
 */
export function emit(element: HTMLElement, name: string, options?: CustomEventInit) {
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

