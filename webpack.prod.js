const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    "noctis-viola": "./src/styles/noctis-viola.theme.scss",
    "noctis-viola.theme": "./src/import.scss"
  },
});