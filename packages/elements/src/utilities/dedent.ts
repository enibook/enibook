/**
 * Désindente le code en récupérant l'indentation de la première ligne,
 * puis enlève la même quantité d'indentation au reste des lignes.
 *
 * @param {string} text - le texte à désindenter
 * @returns {string} le texte désindenté
 */
export function dedentText(text: string): string {
  const lines = text.split('\n')
  if (lines[0] === '') lines.splice(0, 1)
  const initline = lines[0]
  let fwdPad = 0
  const usingTabs = initline.startsWith('\t')
  const checkChar = usingTabs ? '\t' : ' '
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (initline[fwdPad] === checkChar) {
      fwdPad += 1
    } else {
      break
    }
  }
  const fixedLines: string[] = []
  for (const line of lines) {
    let fixedLine = line
    for (let i = 0; i < fwdPad; i++) {
      if (fixedLine.startsWith(checkChar)) {
        fixedLine = fixedLine.substring(1)
      } else {
        break
      }
    }
    fixedLines.push(fixedLine)
  }
  if (fixedLines[fixedLines.length - 1] === '') fixedLines.splice(fixedLines.length - 1, 1)
  return fixedLines.join('\n')
}
