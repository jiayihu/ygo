const path = require('path');
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

const devPlugins = [
  new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    include: [], // Do not cache any static asset for the time being
    runtimeCaching: [
      createCache(/^https?:\/\/yugiohprices\.com\/api\/.+/),
      createCache(/^https?:\/\/cors-anywhere\.herokuapp\.com\/.+/)
    ],
    cacheId: 'ygo'
  })
];
const prodPlugins = [];

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  serve: {
    dev: {
      // publicPath: '/public/'
    }
  },
  devtool: 'eval',
  entry: './src/index.ts',
  output: {
    /** @TODO: use Webpack HTML plugin */
    path: path.resolve(__dirname),
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
        use: 'raw-loader'
      }
    ]
  },
  plugins: IS_DEV ? devPlugins : prodPlugins
};
