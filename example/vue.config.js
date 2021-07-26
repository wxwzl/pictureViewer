/* eslint-disable */

const path = require("path");
function resolve(str) {
  return path.resolve(__dirname, str);
}
module.exports = {
  publicPath: "/", // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.VUE_APP_OUTPUTDIR || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "asset", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  chainWebpack(config) {
    config.devtool("cheap-source-map");
    config.plugin("copy").tap((args) => {
      args[0].push({
        ignore: [".*"],
        from: resolve("static"),
        to: resolve("dist/static"),      
      });
      return args;
    });
  },
};
