import STLYE_CODE from "./styles.code.js";

function style_transfer(style, content) {
  return `${style}${content}${STLYE_CODE.reset}`;
}

export function red(content) {
  return style_transfer(STLYE_CODE.red, content);
}

export function green(content) {
  return style_transfer(STLYE_CODE.green, content);
}

export function yellow(content) {
  return style_transfer(STLYE_CODE.yellow, content);
}

export function blue(content) {
  return style_transfer(STLYE_CODE.blue, content);
}

export function white(content) {
  return style_transfer(STLYE_CODE.white, content);
}

export function underline(content) {
  return style_transfer(STLYE_CODE.underline, content);
}

export function bold(content) {
  return style_transfer(STLYE_CODE.bold, content);
}
