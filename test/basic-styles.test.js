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

  describe("destructuring", () => {
    const { strikethrough, magenta, bgWhite } = seacolor;
    expect(strikethrough("text")).toBe(ANSI(9) + "text" + ANSI(29));
    expect(magenta("text")).toBe(ANSI(35) + "text" + ANSI(39));
    expect(bgWhite("text")).toBe(ANSI(47) + "text" + ANSI(49));
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

    it("should remain the correct cache for bound styles", () => {
      const dim = seacolor.dim;
      const foo = dim("FOO");
      const bar = dim.blue.underline("BAR");
      expect(dim("FOO")).toBe(foo);
      expect(dim.blue.underline("BAR")).toBe(bar);
      expect(dim("FOO")).toBe(foo);
      expect(dim.blue.underline("BAR")).toBe(bar);
      expect(dim("FOO")).toBe(foo);
    });
  });

  // describe("nesting invoke", () => {
  //   it("should output the content with nested styles correctly", () => {
  //     const { underline, blink, strikethrough, red, green, blue, bgMagenta, bgCyan, bgWhite } = seacolor;
  //     console.log(red(`R ${green(`G ${blue("B")} G`)} R`));
  //     console.log(bgMagenta(`bgMagenta ${bgCyan(`bgCyan`)} ${bgWhite(`bgWhite`)} bgMagenta`));
  //     console.log(underline(`underline ${blink(`blink ${strikethrough("strikethrough")} blink`)} underline`));
  //   });
  // });

  describe("enable styles", () => {
    it("should output raw content when isTTY is false", async () => {
      process.stdout.isTTY = false;
      const seacolor = (await import("../main.js?test=isTTY")).default;
      expect(seacolor.enabled).not.toBeTruthy();
      expect(seacolor.red("text")).toBe("text");
    });
  });
});
