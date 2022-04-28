const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackResolve,
} = require("customize-cra");
const { resolve } = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#8766aa",
        "@body-background": "#1b1b1b",
      },
    },
  }),
  addWebpackAlias({
    "@": resolve(__dirname, "src"),
  }),
  addWebpackResolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  })
);

// 蓝色按钮 '#00cdbe'
// pb黄 '#f90'
// bannerBG '#1b1b1b'
// border '#242424'
