import {
  createTheme
} from "./chunk.CXXCSZJF.js";
import {
  tags
} from "./chunk.TR6FF63A.js";

// src/elements/code/themes/dark.ts
var darkTheme = createTheme({
  variant: "dark",
  settings: {
    background: "#00254b",
    foreground: "#FFFFFF",
    caret: "#FFFFFF",
    selection: "#B36539BF",
    gutterBackground: "#00254b",
    gutterForeground: "#FFFFFF70",
    lineHighlight: "#00000059"
  },
  styles: [
    {
      tag: tags.comment,
      color: "#0088FF"
    },
    {
      tag: tags.string,
      color: "#3AD900"
    },
    {
      tag: tags.regexp,
      color: "#80FFC2"
    },
    {
      tag: [tags.number, tags.bool, tags.null],
      color: "#FF628C"
    },
    {
      tag: [tags.definitionKeyword, tags.modifier],
      color: "#FFEE80"
    },
    {
      tag: tags.variableName,
      color: "#CCCCCC"
    },
    {
      tag: tags.self,
      color: "#FF80E1"
    },
    {
      tag: [
        tags.className,
        tags.definition(tags.propertyName),
        tags.function(tags.variableName),
        tags.definition(tags.typeName),
        tags.labelName
      ],
      color: "#FFDD00"
    },
    {
      tag: [tags.keyword, tags.operator],
      color: "#FF9D00"
    },
    {
      tag: [tags.propertyName, tags.typeName],
      color: "#80FFBB"
    },
    {
      tag: tags.special(tags.brace),
      color: "#EDEF7D"
    },
    {
      tag: tags.attributeName,
      color: "#9EFFFF"
    },
    {
      tag: tags.derefOperator,
      color: "#fff"
    }
  ]
});

export {
  darkTheme
};
