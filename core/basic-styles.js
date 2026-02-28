import { factory } from "./utils.js";

const $ = {
  // modifiers
  bold: factory("bold", [1, 22]),
  dim: factory("dim", [2, 22]),
  italic: factory("italic", [3, 23]),
  underline: factory("underline", [4, 24]),
  blink: factory("blink", [5, 25]),
  reverse: factory("reverse", [7, 27]),
  hidden: factory("hidden", [8, 28]),
  strikethrough: factory("strikethrough", [9, 29]),
  // 8-16 colors
  // foreground
  black: factory("black", [30, 39]),
  red: factory("red", [31, 39]),
  green: factory("green", [32, 39]),
  yellow: factory("yellow", [33, 39]),
  blue: factory("blue", [34, 39]),
  magenta: factory("magenta", [35, 39]),
  cyan: factory("cyan", [36, 39]),
  white: factory("white", [37, 39]),
  // background
  bgBlack: factory("bgBlack", [40, 49]),
  bgRed: factory("bgRed", [41, 49]),
  bgGreen: factory("bgGreen", [42, 49]),
  bgYellow: factory("bgYellow", [43, 49]),
  bgBlue: factory("bgBlue", [44, 49]),
  bgMagenta: factory("bgMagenta", [45, 49]),
  bgCyan: factory("bgCyan", [46, 49]),
  bgWhite: factory("bgWhite", [47, 49]),
};

export default $;
