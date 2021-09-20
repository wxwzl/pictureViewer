import resolve from "rollup-plugin-node-resolve"; 
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json"; 
import ts from "@rollup/plugin-typescript";
const { terser } = require("rollup-plugin-terser");
import vue from "rollup-plugin-vue2"; 
import postcss from "rollup-plugin-postcss"; 
import alias from "@rollup/plugin-alias"; 
import nodePolyfills from "rollup-plugin-node-polyfills";
import packageJSON from "./package.json";
import path from "path";
import fs from "fs";
import url from "@rollup/plugin-url";
import image from "@rollup/plugin-image";
const getPath = (_path) => path.resolve(__dirname, _path);
const outPutDir = getPath("dist");

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true, force: true });
  }
}
cleanDir(outPutDir);
const customResolver = resolve({
  extensions: [".ts", ".js", ".jsx", ".json", ".less", ".vue"],
});

const libName = "pictureViewer";
export default [
  {
    input: "packages/index.js",

    output: [
      {
        file: packageJSON.main,
        format: "umd",
        globals: {
          vue: "Vue",
        },
        name: libName,
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        exports: "auto",
        sourcemap: true,
        sourcemapFile: "/dist/sourceMap",
      },
      {
        file: "dist/index.umd.js",
        format: "umd",
        globals: {
          vue: "Vue",
        },
        name: libName,
      },
      { file: "dist/index.esm.js", format: "esm" },
      { file: "dist/index.amd.js", format: "amd" },
      {
        file: "dist/index.iife.js",
        format: "iife",
        name: libName,
        globals: {
          vue: "Vue",
        },
      }, //一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    ],
    plugins: [
      alias({
        entries: [],
        customResolver,
      }),
      url(),
      image(),
      json(),
      vue({
        // Dynamically inject css as a <style> tag
        css: true,
        exposeFilename: false,
        target: "browser",
      }),
      resolve(),
      postcss({
        minimize: true,
        plugins: [],
        extensions: [".css", ".less"],
      }),
      commonjs(),
      nodePolyfills(),
      ts({}),
      terser({
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ],
    external: ["vue"],
  },
  {
    input: "packages/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
        exports: "auto",
      },
    ],
    plugins: [dts()],
  },
];
