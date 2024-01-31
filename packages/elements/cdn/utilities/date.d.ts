/**
 * La langue courante.
 * @examples
 * `fr` , `en` , `es` ...
 */
export declare const language: string;
/**
 * La date courante sous la forme `jour quantième mois annéee` dans un ordre qui dépend de la langue courante.
 *
 * @examples
 * `jeudi 20 décembre 2012` en français (`fr-FR`)
 *
 * `Donnerstag, 20. Dezember 2012` en allemend (`de-DE`)
 */
export declare function getDate(lang?: string): string;
/**
 * Le jour de la semaine en toutes lettres.
 *
 * @examples
 * `jeudi` en français (`fr-FR`)
 *
 * `Donnerstag`en allemand (`de-DE`)
 */
export declare function getDay(lang?: string): string;
/**
 * L'heure courante sous la forme `hh:mm:ss`.
 *
 * @examples
 * `08:12:54` , `13:02:05`
 */
export declare function getTime(lang?: string): string;
