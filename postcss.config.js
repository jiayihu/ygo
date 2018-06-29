const cssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const path = require('path');

const IS_DEV = process.env.NODE_ENV !== 'production';

const devPlugins = [
  cssImport({
    path: ['css/']
  }),
  autoprefixer({
    browsers: ['last 2 versions', 'IE >= 10']
  }),
  cssnext()
];

const prodPlugins = [...devPlugins];

module.exports = {
  plugins: IS_DEV ? devPlugins : prodPlugins
};
