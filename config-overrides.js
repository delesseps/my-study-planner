const {override, fixBabelImports, addLessLoader} = require('customize-cra')
const jestConfig = require('./jest.config.js')

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#00ADB5',
        '@border-radius-base': '4px',
      },
    }),
  ),
  jest: function (config) {
    Object.assign(config, jestConfig)
    return config
  },
}
