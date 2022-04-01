const { webpack } = require("webpack");
const configFactory = require("../compiler/webpack.config.js");
const paths = require("../compiler/paths");
const WebpackDevServer = require("webpack-dev-server");

const args = process.argv.slice(2);

const DEFAULT_PORT = 3000;
const devServerConfig = {
  // open: true,
  hot: true,
  port: DEFAULT_PORT,
  // Enable gzip compression of generated files.
  compress: true,
  static: {
    directory: paths.indexHtml,
  },
};

function build(compiler) {
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
  });
}

function devServer(compiler) {
  const server = new WebpackDevServer(devServerConfig, compiler);
  server.start(() => {
    console.log(`Listening on port ${DEFAULT_PORT}`);
  });
}

function run() {
  const env = args[0] === "dev" ? "development" : "production";
  const config = configFactory(env);
  const compiler = webpack(config);
  if (env === "development") {
    devServer(compiler);
    return;
  }
  build(compiler);
}

run();
