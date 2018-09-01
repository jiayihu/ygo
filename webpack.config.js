const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

const devPlugins = [
  new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^https?:\/\/yugiohprices\.com\/api\/.+/,
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
      }
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
