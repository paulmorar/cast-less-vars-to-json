import castLessVarsToJson from "../src";
 
describe("cast-less-vars-to-json", () => {
  it("should return JSON with no properties if given no arguments", () => {
    return castLessVarsToJson().then((data) => expect(data).toEqual({}));
  });

  it("should return JSON with correctly mapped properties and LESS selectors removed", async () => {
    let less = "@myvar: 1234; @mycolor: #fff; .myclass { color: #000; }";
    let expectedJSON = {
      "@myvar": "1234",
      "@mycolor": "#fff",
    };

    const data = await castLessVarsToJson(less);
    expect(data).toEqual(expectedJSON);
  });

  describe("given correctly formatted LESS variables", () => {
    it("should return JSON with correctly mapped properties", async () => {
      const less = "@myvar: 1234; @mycolor: #fff;";
      const expectedJSON = {
        "@myvar": "1234",
        "@mycolor": "#fff",
      };

      const data = await castLessVarsToJson(less);
      expect(data).toEqual(expectedJSON);
    });
  });

  describe("given incorrectly formatted LESS variables", () => {
    it("should return JSON with correctly mapped properties", async () => {
      const less = "@myvar: 1234; @mycolor: #fff;";
      const expectedJSON = {
        "@myvar": "1234",
        "@mycolor": "#fff",
      };

      const data = await castLessVarsToJson(less);
      expect(data).toEqual(expectedJSON);
    });

    it("should return JSON with only valid LESS transformed and invalid LESS stripped", async () => {
      const less = "@myvar???:xsas 1234 mycolor.#fff; @validvar: 60;";
      const expectedJSON = {
        "@validvar": "60",
      };

      const data = await castLessVarsToJson(less);
      expect(data).toEqual(expectedJSON);
    });

    it("should error on malformed LESS with no terminating semicolon", async () => {
      const less = "@myvar: 1234; @mycolor: #fff";

      await expect(castLessVarsToJson(less)).rejects.toThrow();
    });

    it("should error on undefined variable", async () => {
      const less = "@myvar: 1234; .myclass { color: @mycolor }";

      await expect(castLessVarsToJson(less)).rejects.toEqual({
        filename: "input",
        index: 32,
        message: "variable @mycolor is undefined",
        type: "Name",
      });
    });
  });

  describe("given a function as options", () => {
    it("should return JSON with mutated names, as directed by the projection function", async () => {
      const less = "@myvar: 1234; @mycolor: #fff;";
      const expectedJSON = {
        MYVAR: "1234",
        MYCOLOR: "#fff",
      };
      const nameProjectionFunc = (str) => str.substr(1).toUpperCase();

      const data = await castLessVarsToJson(less, { nameProjectionFunc });
      expect(data).toEqual(expectedJSON);
    });
  });
});
