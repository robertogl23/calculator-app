const path = require("path");

module.exports = {
  mainTs: path.resolve(__dirname, "..", "..", "app/main.ts"),
  indexHtml: path.resolve(__dirname, "..", "..", "app/pages/"),
  build: path.resolve(__dirname, "..", "..", "build"),
};
