/**
 * style ANSI转义码
 * * reset, 重置样式，避免影响后续输出
 * * 背景色 = 前景色 + 10
 */
const STLYE_CODE = {
  reset: "\x1b[0m", // 重置样式
  bold: "\x1b[1m", // 粗体
  underline: "\x1b[4m", // 下划线
  reverse: "\x1b[7m", // 反色
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  black_bg: "\x1b[40m",
  red_bg: "\x1b[41m",
  green_bg: "\x1b[42m",
  yellow_bg: "\x1b[43m",
  blue_bg: "\x1b[44m",
  magenta_bg: "\x1b[45m",
  cyan_bg: "\0x1b[46m",
  white_bg: "\0x1b[47m",
};

export default STLYE_CODE;