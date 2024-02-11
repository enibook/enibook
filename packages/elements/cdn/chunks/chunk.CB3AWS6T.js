import {
  createTheme
} from "./chunk.WBEW6TFI.js";
import {
  tags
} from "./chunk.JEYYOM6X.js";

// src/elements/code/themes/light.ts
var lightTheme = createTheme({
  variant: "light",
  settings: {
    background: "#faf4ed",
    foreground: "#575279",
    caret: "#575279",
    selection: "#6e6a8614",
    gutterBackground: "#faf4ed",
    gutterForeground: "#57527970",
    lineHighlight: "#6e6a860d"
  },
  styles: [
    {
      tag: tags.comment,
      color: "#9893a5"
    },
    {
      tag: [tags.bool, tags.null],
      color: "#286983"
    },
    {
      tag: tags.number,
      color: "#d7827e"
    },
    {
      tag: tags.className,
      color: "#d7827e"
    },
    {
      tag: [tags.angleBracket, tags.tagName, tags.typeName],
      color: "#56949f"
    },
    {
      tag: tags.attributeName,
      color: "#907aa9"
    },
    {
      tag: tags.punctuation,
      color: "#797593"
    },
    {
      tag: [tags.keyword, tags.modifier],
      color: "#286983"
    },
    {
      tag: [tags.string, tags.regexp],
      color: "#ea9d34"
    },
    {
      tag: tags.variableName,
      color: "#d7827e"
    }
  ]
});

export {
  lightTheme
};
