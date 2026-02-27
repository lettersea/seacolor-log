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
      expect(seacolor.blue.bgCyan.strikethrough("text")).toBe(ANSI(34) + ANSI(46) + ANSI(9) + "text" + ANSI(29) + ANSI(49) + ANSI(39));
    });

    it("should cache the styles for chained styled", () => {
      const bold = seacolor.bold;
      expect(bold.styles).toEqual(new Set(["bold"]));
      expect(bold.red.styles).toEqual(new Set(["bold", "red"]));
      expect(bold.red.underline.styles).toEqual(new Set(["bold", "red", "underline"]));
    });
  });
});
