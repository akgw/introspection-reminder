const path = require("path");
const GasPlugin = require("gas-webpack-plugin");
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: "development",
  devtool: false,
  context: __dirname,
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
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
    new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true
    })
  ],
};
