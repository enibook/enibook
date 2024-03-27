// Variables globales du worker
// let consoleOutput: string[] = [];

import * as acorn from 'acorn'

const smartDashes = '<span select-none> &#8211; </span>'

/** Préserve l'enregistrement original de la console */
const _console = console

function stringify(obj: any) {
  switch (typeof obj) {
    case "undefined":
      return "undefined";
    case "object":
      return JSON.stringify(obj);
    default:
      return obj.toString();
  }
}

const prefix = {
  assert: '<span i-mdi-alert-octagon color-red></span>',
  debug: '<span i-lets-icons-stackframe-fill color-lightblue></span>',
  error: '<span i-mdi-alert-octagon color-red></span>',
  info: '<span i-mdi-information color-blue></span>',
  log: '',
  warn: '<span i-mdi-warning color-orange></span>',
}

const suffix = {
  assert: '',
  debug: '',
  error: '',
  info: '',
  log: '',
  warn: '',
}
/** Redirige l'enregistrement de la console vers un tableau de messages tout en préservant l'enregistrement original de la console. */
function patchConsole(messages: string[]) {
  const consoleProxy = new Proxy(console, {
    get(target, prop) {
      if (prop === "log" || prop === "error" || prop === "warn" || prop === "info" || prop === "debug") {
        return (...args: any[]) => {
          const message = args.map((obj) => stringify(obj)).join(smartDashes);
          messages.push(`${prefix[prop]} ${message} ${suffix[prop]}`)
          target[prop](...args) // original
        }
      }
      if (prop === "assert") {
        return (...args: any[]) => {
          let message = args.map((obj) => !obj ? `L'assertion a échoué !` : '').join(smartDashes);
          if (message) {
            message = `${prefix[prop]} ${message} ${suffix[prop]}`
          }
          messages.push(message)
          target[prop](...args) // original
        }
      }
      if (prop === "clear") {
        return () => { messages.splice(0, messages.length) }
      }
      return
    }
  })
  console = consoleProxy
}

/** Rétablit l'enregistrement original de la console. */
function unpatchConsole() {
  console = _console;
}

// Personnaliser l'événement onmessage
onmessage = (e) => {
  console.log('worker',e)
  // Tableau avec tous les résultats de console.log
  const messages: string[] = []
  patchConsole(messages)
  _console.log('messages', messages)

  const acornOptions: typeof acorn.defaultOptions = {
    ecmaVersion: "latest",
    sourceType: "module",
    allowReserved: "never",
    locations: true
  }
  // Évaluer le script et envoyer le résultat :
  // - debug: affichages de console.log
  // - result: résultat final du script
  try {
    acorn.Parser.parse(e.data.script, acornOptions)
    let output = (0, eval)(e.data.script);
    // Limiter la sortie à 100000 caractères
    if (output && output.length > 100000) {
      output = output.substring(0, 100000) + "...";
    }
    postMessage({
      "debug": messages,
      "result": output
    });
  } catch (e) {
      postMessage({ "error": e  });
  } finally {
      unpatchConsole();
  }
}
