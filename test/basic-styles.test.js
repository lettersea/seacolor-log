import seacolor from "../main.js";

const ANSI = (code) => `\x1b[${code}m`;

describe("seacolor", () => {
  it("should wrap a text with style ANSI", () => {
    expect(seacolor.black("text")).toBe(ANSI(30) + "text" + ANSI(39));
    expect(seacolor.green("text")).toBe(ANSI(32) + "text" + ANSI(39));
    expect(seacolor.bgCyan("text")).toBe(ANSI(46) + "text" + ANSI(49));
    expect(seacolor.bold("text")).toBe(ANSI(1) + "text" + ANSI(22));
    expect(seacolor.reverse("text")).toBe(ANSI(7) + "text" + ANSI(27));
  });

  describe("chaining invoke", () => {
    it("should wrap a text with mutiple styles ANSI according to the order of invoke", () => {
      expect(seacolor.bold.red("text")).toBe(ANSI(1) + ANSI(31) + "text" + ANSI(39) + ANSI(22));
      expect(seacolor.bold.red.underline("text")).toBe(ANSI(1) + ANSI(31) + ANSI(4) + "text" + ANSI(24) + ANSI(39) + ANSI(22));
    });
  });
});
