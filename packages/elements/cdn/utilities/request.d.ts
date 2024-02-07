interface IncludeFile {
    ok: boolean;
    status: number;
    data: string;
}
/**
 * Récupère un fichier d'inclusion à partir d'une source distante.
 * La mise en cache est activée afin que l'origine ne soit interrogée qu'une seule fois.
 */
export declare function requestIncludeFile(src: string, mode?: 'cors' | 'no-cors' | 'same-origin'): Promise<IncludeFile>;
export declare function fetchContent(src: string): Promise<string>;
export declare function fetchSrc(src: string): Promise<string>;
export {};
