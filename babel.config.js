module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    "babel-preset-es2015",
    // {
    //   useBuiltIns: "usage",
    //   corejs: 3,
    // },
  ],
  plugins: ["transform-runtime"],
};
