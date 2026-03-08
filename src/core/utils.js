/**
 * create style function
 * @param {string} name style name
 * @param {[styleCode, resetCode]} ansi style ansi code
 * @returns
 */
export function factory(name, ansi) {
  return function (content) {
    return `\x1b[${ansi[0]}m${content}\x1b[${ansi[1]}m`;
  };
}

export function factory_test(name, ansi) {
  return function (content) {
    return `\\x1b[${ansi[0]}m${content}\\x1b[${ansi[1]}m`;
  };
}

export function isColorEnabled() {
  if(typeof process !== "undefined") {
    const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env || {};
    const isTTY = process.stdout?.isTTY;

    return isTTY && TERM !== "dumb" && FORCE_COLOR !== "0" && NODE_DISABLE_COLORS !== "1";
  }
  return false;
}
