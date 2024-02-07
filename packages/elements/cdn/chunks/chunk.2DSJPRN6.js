// src/utilities/dedent.ts
function dedentText(text) {
  const lines = text.split("\n");
  if (lines[0] === "")
    lines.splice(0, 1);
  const initline = lines[0];
  let fwdPad = 0;
  const usingTabs = initline.startsWith("	");
  const checkChar = usingTabs ? "	" : " ";
  while (true) {
    if (initline[fwdPad] === checkChar) {
      fwdPad += 1;
    } else {
      break;
    }
  }
  const fixedLines = [];
  for (const line of lines) {
    let fixedLine = line;
    for (let i = 0; i < fwdPad; i++) {
      if (fixedLine.startsWith(checkChar)) {
        fixedLine = fixedLine.substring(1);
      } else {
        break;
      }
    }
    fixedLines.push(fixedLine);
  }
  if (fixedLines[fixedLines.length - 1] === "")
    fixedLines.splice(fixedLines.length - 1, 1);
  return fixedLines.join("\n");
}
function indentString(indentSize = 2) {
  let res = "";
  for (let i = 0; i < indentSize; i++) {
    res = res.concat(" ");
  }
  return res;
}

export {
  dedentText,
  indentString
};
