const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

const devPlugins = [];
const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css'
  })
];

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  serve: {
    dev: {
      publicPath: '/public/'
    }
  },
  devtool: 'eval',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.ts', '.js']
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
        include: path.join(__dirname, 'src/css/')
      },
      {
        test: /\.css$/,
        use: ['raw-loader', 'postcss-loader'],
        include: path.join(__dirname, 'src/components/')
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: IS_DEV ? devPlugins : prodPlugins
};
