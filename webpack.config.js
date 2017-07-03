const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // It will look for index.tsx inside /src, and create a 'bundle.js' in /build which is a generated webpack bundle.
  context: path.resolve(__dirname, "src"),
  entry: "./index.tsx",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      react$: path.resolve("./node_modules/react")
    }
  },

  // hot means Hot module reloading, meaning it will update the browser when there is a code change without reloading
  // the entire browser; inline means reloading the entire browser and this happens when hot module reloading fails.
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        // Typescript loader which compiles TS to JS code.
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"]
      },
      {
        // Process CSS files with PostCSS plugins which is handled in 'postcss.config.js' file;
        // css-loader interprets @import and url() like requires;
        // style-loader inject CSS to the <style> tag in DOM.
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        // Url loader handles files with an url.
        test: /\.(png|jpg)$/,
        use: ["url-loader"]
      }
    ]
  },

  plugins: [
    // Creates the default HTML page using this template
    new HtmlWebpackPlugin({
      template: "public/index.template.html",
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    // This should move css files into a seperate stylesheet; this is good because CSS and JS can load in parallel,
    // reducing the time for the website to load. (SHOULD ONLY WORK IN PRODUCTION I THINK; TODO: implement this for production)
    new ExtractTextPlugin("css/styles.css")
  ]
};
