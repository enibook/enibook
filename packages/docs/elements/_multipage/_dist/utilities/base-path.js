let basePath = '';
/** Définit le chemin de base de la bibliothèque dans le répertoire spécifié. */
export function setBasePath(path) {
    basePath = path;
}
/**
 * Obtient le chemin de base de la bibliothèque.
 *
 * Le chemin de base est utilisé pour charger des ressources telles que des icônes et des images, et doit donc être défini pour que les composants fonctionnent correctement.
 * Par défaut, ce script recherchera un script se terminant par enibook.js ou enibook-autoloader.js et définira le chemin de base vers le répertoire contenant ce fichier.
 * Pour remplacer ce comportement, vous pouvez ajouter l'attribut data-enibook à n'importe quel script de la page
 * (il est probablement plus logique de l'attacher au script de EniBook, mais il peut aussi se trouver sur un bundle).
 * La valeur peut être un dossier local ou pointer vers un point de terminaison compatible CORS tel qu'un CDN.
 *
 *   <script src="bundle.js" data-enibook="/custom/base/path"></script>
 *
 * Vous pouvez également définir le chemin de base manuellement à l'aide de la fonction exportée setBasePath().
 *
 * @param subpath - Chemin facultatif à ajouter au chemin de base.
 */
export function getBasePath(subpath = '') {
    if (!basePath) {
        const scripts = [...document.getElementsByTagName('script')];
        const configScript = scripts.find(script => script.hasAttribute('data-enibook'));
        if (configScript) {
            // Utiliser l'attribut data-enibook
            setBasePath(configScript.getAttribute('data-enibook'));
        }
        else {
            const fallbackScript = scripts.find(s => {
                return /enibook(\.min)?\.js($|\?)/.test(s.src) || /enibook-autoloader(\.min)?\.js($|\?)/.test(s.src);
            });
            let path = '';
            if (fallbackScript) {
                path = fallbackScript.getAttribute('src');
            }
            setBasePath(path.split('/').slice(0, -1).join('/'));
        }
    }
    // Retourne le chemin de base sans la barre oblique de fin. S'il existe, il ajoute le chemin secondaire séparé par une barre oblique.
    return basePath.replace(/\/$/, '') + (subpath ? `/${subpath.replace(/^\//, '')}` : ``);
}
