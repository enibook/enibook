// inline-worker:__inline-worker
function inlineWorker(scriptText) {
  let blob = new Blob([scriptText], { type: "text/javascript" });
  let url = URL.createObjectURL(blob);
  let worker = new Worker(url);
  URL.revokeObjectURL(url);
  return worker;
}

export {
  inlineWorker
};
