const {override, addLessLoader} = require('customize-cra')
const {addReactRefresh} = require('customize-cra-react-refresh')
const jestConfig = require('./jest.config.js')

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    addReactRefresh(),
  ),
  jest: function (config) {
    Object.assign(config, jestConfig)
    return config
  },
}
