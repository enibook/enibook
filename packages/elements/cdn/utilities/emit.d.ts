/**
 * Emission d'un évènement personnalisé avec des valeurs par défaut plus pratiques.
 *
 * @param {HTMLElement} element - l'élément émetteur
 * @param {string} name - le nom de l'évènement.
 * @param {CustomEventInit} options - les options associées à l'évènement.
 * @returns
 */
export declare function emit(element: HTMLElement, name: string, options?: CustomEventInit): CustomEvent<any>;
