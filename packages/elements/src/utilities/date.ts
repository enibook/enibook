
/**
 * La langue courante.
 * @examples
 * `fr` , `en` , `es` ...
 */
export const language = new Intl.DateTimeFormat().resolvedOptions().locale;

/**
 * La date courante sous la forme `jour quantième mois annéee` dans un ordre qui dépend de la langue courante.
 *
 * @examples
 * `jeudi 20 décembre 2012` en français (`fr-FR`)
 *
 * `Donnerstag, 20. Dezember 2012` en allemend (`de-DE`)
 */
export function getDate(lang:string=language): string {
  const date = new Date();
  return date.toLocaleDateString(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Le jour de la semaine en toutes lettres.
 *
 * @examples
 * `jeudi` en français (`fr-FR`)
 *
 * `Donnerstag`en allemand (`de-DE`)
 */
export function getDay(lang:string=language): string {
  const date = new Date();
  return date.toLocaleDateString(lang, { weekday: "long" });
}


/**
 * L'heure courante sous la forme `hh:mm:ss`.
 *
 * @examples
 * `08:12:54` , `13:02:05`
 */
export function getTime(lang:string=language): string {
  const date = new Date();
  return date.toLocaleTimeString(lang, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

