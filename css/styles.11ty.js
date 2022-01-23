// This is a simple way to do server-side compilation of post css files.

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "index.css";

module.exports = class {
  async data() {
    const rawFilepath = path.join(
      __dirname,
      `../_includes/postcss/${fileName}`
    );
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      require("postcss-import"), // Generally needs to be first, plugin order here is sensitive
      require("postcss-nested"),
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
