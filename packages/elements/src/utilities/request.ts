interface IncludeFile {
  ok: boolean;
  status: number;
  data: string;
}

const includeFiles = new Map<string, IncludeFile | Promise<IncludeFile>>();

/** Récupère un fichier d'inclusion à partir d'une source distante. La mise en cache est activée afin que l'origine ne soit interrogée qu'une seule fois. */
export function requestIncludeFile(src: string, mode: 'cors' | 'no-cors' | 'same-origin' = 'cors'): Promise<IncludeFile> {
  const prev = includeFiles.get(src);
  if (prev !== undefined) {
    // Promise.resolve() décompresse de manière transparente prev s'il s'agit d'une promesse.
    return Promise.resolve(prev);
  }
  const fileDataPromise = fetch(src, { mode: mode }).then(async response => {
    const res = {
      ok: response.ok,
      status: response.status,
      data: await response.text()
    };
    // Remplace la promesse mise en cache par son résultat.
    includeFiles.set(src, res);
    return res;
  });
  // Mettre en cache la promesse pour ne faire que fetch() une fois par src
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}
