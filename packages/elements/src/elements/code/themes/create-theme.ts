import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import  { type Extension } from '@codemirror/state';
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

const createTheme = ({ variant, settings, styles }: Options): Extension => {
  const theme = EditorView.theme(
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '&': {
        backgroundColor: settings.background,
        color: settings.foreground
      },
      '.cm-content': {
        caretColor: settings.caret
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: settings.caret
      },
      '&.cm-focused .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: settings.selection
      },
      '.cm-activeLine': {
        backgroundColor: settings.lineHighlight
      },
      '.cm-gutters': {
        backgroundColor: settings.gutterBackground,
        color: settings.gutterForeground
      },
      '.cm-activeLineGutter': {
        backgroundColor: settings.lineHighlight
      }
    },
    {
      dark: variant === 'dark'
    }
  );

  const highlightStyle = HighlightStyle.define(styles);
  const extension = [theme, syntaxHighlighting(highlightStyle)];

  return extension;
};

export { createTheme };
