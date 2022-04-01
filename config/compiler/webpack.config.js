const paths = require("./paths");

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    entry: {
      app: paths.mainTs,
    },
    output: {
      path: paths.build,
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
  };
};
