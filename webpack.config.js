const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const outputPath = path.resolve(__dirname, "./dist/");
module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./packages/index.js",
  output: {
    path: outputPath,
    filename: "index.js",
    library: "pictureViewer",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.common.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ["babel-preset-es2015"],
          //   plugins: ["transform-runtime"],
          // },
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions:{
                plugins: [autoprefixer()],
              }
            },
          },
        ],
      },
    ],
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
  ],
};
