const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin
} = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const path = require("path");
const darkThemeVars = require("antd/dist/dark-theme");

const newVars = Object.keys(darkThemeVars).map(key => "@" + key);

const options = {
  stylesDir: path.join(__dirname, "./src/less"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/less/vars.less"),
  mainLessFile: path.join(__dirname, "./src/less/main.less"),
  themeVariables: newVars,
  indexFileName: "index.html",
  generateOnce: false // generate color.less on each compilation
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#00ADB5",
      "@border-radius-base": "4px"
    }
  })
  //addWebpackPlugin(new AntDesignThemePlugin(options))
);
