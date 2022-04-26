const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addPostcssPlugins,
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
        // "@primary-color": "#F90",
        // "@body-background": "#1b1b1b",
      },
    },
  }),
  addWebpackAlias({
    "@": resolve(__dirname, "src"),
  }),
  addPostcssPlugins([require("tailwindcss"), require("autoprefixer")])
);

// 蓝色按钮 '#00cdbe'
// pb黄 '#f90'
// bannerBG '#1b1b1b'
// border '#242424'
