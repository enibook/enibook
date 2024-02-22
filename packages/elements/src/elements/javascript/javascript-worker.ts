// Variables globales du worker
let messages: string[] = [];

// Personnaliser l'événement onmessage
onmessage = async (e) => {
  // Tableau avec tous les résultats de console.log
  messages = [];

  // Réécriture des fonctions de la console
  const logRewrite = (msg: string, ...optionalParams: string[]) => {
    messages.push(msg + ' ' + optionalParams.join(' '));
  };
  console.log = logRewrite;
  console.info = logRewrite;
  console.warn = logRewrite;
  console.error = logRewrite;
  console.debug = logRewrite;
  console.assert = msg => {
    if (!msg) {
      messages.push("Affirmation erronée!")
    }
  }

  // Évaluer le script et envoyer le résultat :
  // - debug: affichages de console.log
  // - result: résultat final du script
  try {
    let output = Function(e.data.script)();

    // Limiter la sortie à 100000 caractères
    if (output && output.length > 100000) {
      output = output.substring(0, 100000) + "...";
    }
    postMessage({
      "debug": messages.join("\n"),
      "result": output
    });
  } catch (e) {
      postMessage({ "error": e  });
  }
}