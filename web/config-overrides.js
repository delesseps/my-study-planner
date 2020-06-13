const {override, addLessLoader} = require('customize-cra')
const jestConfig = require('./jest.config.js')

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
  ),
  jest: function (config) {
    Object.assign(config, jestConfig)
    return config
  },
}
