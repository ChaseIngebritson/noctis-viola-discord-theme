const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const StylelintPlugin = require('stylelint-webpack-plugin');

const package = require("./package.json");

const plugins = [
  new FixStyleOnlyEntriesPlugin(),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),
  new webpack.BannerPlugin({
    banner: `/**
  * @name        ${package.name}
  * @description ${package.description}
  * @author      ${package.author}
  * @authorId    ${package.authorId}
  * @version     ${package.version}
  * @website     ${package.repository.url}
  * @source      ${package.homepage}/noctis-viola.css
  */\n`,
    raw: true,
    include: 'noctis-viola.theme.css'
  }),
  new StylelintPlugin({
    context: 'src/styles'
  })
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  entry: {
    "noctis-viola": "./src/styles/noctis-viola.theme.scss",
    "noctis-viola.theme": "./src/import.scss"
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ],
  },
};