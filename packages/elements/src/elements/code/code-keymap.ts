import * as command from '@codemirror/commands'
import * as search from '@codemirror/search'
import { foldKeymap } from "@codemirror/language"
import type { Command } from "@codemirror/view";
import { system } from "../../utilities/system";

function getHistoryKeymap(): { name: string; key: string; run: Command }[]  {
  const newHistoryKeymap: { name: string; key: string; run: Command }[] = []
  const historyKeys: { [key: string]: string } = {
    'Mod-z': 'undo',
    'Mod-y': 'redo',
    'Mod-u': 'undoSelection',
    'Alt-u': 'redoSelection',
    'Ctrl-Shift-z': 'redo',
  }
  command.historyKeymap.forEach((map) => {
    if ((map.key || map.mac) && map.run) {
      if (map.key && map.mac) {
        newHistoryKeymap.push({ name: historyKeys[map.key], key: map.mac.replace('Mod-', 'Cmd-'), run: map.run})
      } else {
        if (map.key && !map.mac) {
          const mode = system() === 'mac' ? 'Cmd-' : 'Ctrl-'
          newHistoryKeymap.push({ name: historyKeys[map.key], key: map.key.replace('Mod-', mode), run: map.run})
        }
      }
    }
  })
  return newHistoryKeymap
}

export function getKeymap(): { name: string; key: string; run: Command }[]  {
  let newKeymap: { name: string; key: string; run: Command }[] = []
  const keymap = command.defaultKeymap
    .concat(foldKeymap)
    .concat(search.searchKeymap)
    .concat([command.indentWithTab])
  keymap.forEach((map) => {
    if ((map.key || map.mac) && map.run && map.run.name) {
      if (map.mac) {
        newKeymap.push({ name: map.run.name, key: map.mac.replace('Mod-', 'Cmd-'), run: map.run })
        if (map.shift?.name) {
          newKeymap.push({ name: map.shift.name, key: `Shift-${map.mac}`.replace('Mod-', 'Cmd-'), run: map.run })
        }
      } else {
        if (map.key && !map.mac) {
          const mode = system() === 'mac' ? 'Cmd-' : 'Ctrl-'
          newKeymap.push({ name: map.run.name, key: map.key.replace('Mod-', mode), run: map.run })
          if (map.shift?.name) {
            newKeymap.push({ name: map.shift.name, key: `Shift-${map.key}`.replace('Mod-', mode), run: map.run })
          }
        }
      }
    }
  })
  newKeymap = newKeymap.concat(getHistoryKeymap())
  newKeymap.sort((a, b) => a.name < b.name ? -1 : 1)
  return newKeymap
}

console.log(getKeymap())
