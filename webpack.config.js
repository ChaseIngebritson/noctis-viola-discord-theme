const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const StylelintPlugin = require('stylelint-webpack-plugin');

const package = require("./package.json");

module.exports = {
  entry : "./src/styles/noctis-viola.theme.scss",
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'noctis-viola.theme.css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.BannerPlugin({
      banner: `//META{"name":"${package.name}","description":"${package.description}","author":"${package.author}","version":"${package.version}","website":"${package.homepage}"}*//\n`,
      raw: true,
      include: 'noctis-viola.theme.css'
    }),
    new StylelintPlugin({
      context: 'src/styles'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
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