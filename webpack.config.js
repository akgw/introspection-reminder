const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  context: __dirname,
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      util: "util"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new GasPlugin(),
  ],
};
