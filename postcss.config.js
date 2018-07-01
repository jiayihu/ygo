const cssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const path = require('path');

const IS_DEV = process.env.NODE_ENV !== 'production';

const devPlugins = [
  cssImport({
    path: ['css/']
  }),
  cssnext()
];

const prodPlugins = [...devPlugins];

module.exports = {
  plugins: IS_DEV ? devPlugins : prodPlugins
};
