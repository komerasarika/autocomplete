const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    bundle: './index.js'
  },

  output: {
    path: outputPath,
    publicPath: '/dist/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { cacheDirectory: true },
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      }
    ],
  },

  devServer: {
    publicPath: '/dist/',
  },

  devtool: 'cheap-module-source-map',
};
