const nodeExternals = require("webpack-node-externals");
const paths = require("./config/paths");
const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV === "development" ? "development" : "production",
  entry: paths.appFile,
  target: "node",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  output: {
    libraryTarget: "commonjs",
    path: paths.appBuild,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false
  }
};
