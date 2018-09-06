const path = require('path');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

function createCache(urlPattern) {
  return {
    urlPattern,
    handler: 'cacheFirst',
    options: {
      cacheName: 'api-cache',
      expiration: {
        maxAgeSeconds: 60 * 60 * 24 // 1 day
      },
      cacheableResponse: {
        statuses: [0, 200]
      }
    }
  };
}

const swConfig = {
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    createCache(/^https?:\/\/yugiohprices\.com\/api\/.+/),
    createCache(/^https?:\/\/ygo-api\.now\.sh\/.+/)
  ],
  cacheId: 'ygo'
};
const htmlConfig = {
  template: './index.template.html',
  filename: './index.html',
  favicon: 'favicon.ico'
};
const envConfig = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
};

const devPlugins = [
  new HtmlWebpackPlugin(htmlConfig),
  new GenerateSW({
    ...swConfig,
    include: [], // Do not precache any static asset in development,
    importScripts: ['sw-dev.js']
  }),
  new webpack.DefinePlugin(envConfig)
];
const prodPlugins = [
  new HtmlWebpackPlugin(htmlConfig),
  new GenerateSW(swConfig),
  new CopyWebpackPlugin([
    { from: './favicon.ico', to: './favicon.ico' },
    { from: './assets', to: './assets' }
  ]),
  new webpack.DefinePlugin(envConfig)
];

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  serve: {
    dev: {
      // publicPath: '/public/'
    },
    add: app => {
      app.use(convert(history({})));
    }
  },
  devtool: 'eval',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, IS_DEV ? '' : 'public'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.ts', '.js']
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['raw-loader', 'postcss-loader']
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.html$/,
        use: 'raw-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  plugins: IS_DEV ? devPlugins : prodPlugins
};
