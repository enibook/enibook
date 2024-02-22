// src/utilities/request.ts
var includeFiles = /* @__PURE__ */ new Map();
function requestIncludeFile(src, mode = "cors") {
  const prev = includeFiles.get(src);
  if (prev !== void 0) {
    return Promise.resolve(prev);
  }
  const fileDataPromise = fetch(src, { mode }).then(async (response) => {
    const res = {
      ok: response.ok,
      status: response.status,
      data: await response.text()
    };
    includeFiles.set(src, res);
    return res;
  });
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}
async function fetchContent(src) {
  return await fetchSrc(src ?? "");
}
async function fetchSrc(src) {
  const response = await fetch(src);
  return response.text();
}

export {
  requestIncludeFile,
  fetchContent,
  fetchSrc
};
