import { type Extension } from '@codemirror/state';
import type { TagStyle } from '@codemirror/language';
interface Options {
    /**
     * Variante de thème. Détermine les styles que CodeMirror appliquera par défaut.
     */
    variant: Variant;
    /**
     * Paramètres pour personnaliser l'aspect de l'éditeur, comme l'arrière-plan, la gouttière, la sélection et autres.
     */
    settings: Settings;
    /**
     * Styles de mise en évidence syntaxique.
     */
    styles: TagStyle[];
}
type Variant = 'light' | 'dark';
interface Settings {
    /**
     * Editor background.
     */
    background: string;
    /**
     * Default text color.
     */
    foreground: string;
    /**
     * Caret color.
     */
    caret: string;
    /**
     * Selection background.
     */
    selection: string;
    /**
     * Background of highlighted lines.
     */
    lineHighlight: string;
    /**
     * Gutter background.
     */
    gutterBackground: string;
    /**
     * Text color inside gutter.
     */
    gutterForeground: string;
}
declare const createTheme: ({ variant, settings, styles }: Options) => Extension;
export { createTheme };
