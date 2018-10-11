"use strict";

var AutoDllPlugin = require('autodll-webpack-plugin');

var AssetsPlugin = require('assets-webpack-plugin');

var paths = require('razzle/config/paths');

var webpack = require('webpack');
/**
 * Add the following in your custom.js
 *
 * let vendorAssets = {};
 *  if (process.env.RAZZLE_VENDOR_MANIFEST) {
 *   const vendorFile = paths.appBuild + '/' + process.env.RAZZLE_VENDOR_MANIFEST;
 *   if (fs.pathExistsSync(vendorFile)) {
 *     vendorAssets = fs.readJsonSync(vendorFile);
 *   }
 * }
 *
 * @param baseConfig
 * @returns {*}
 */


module.exports = function (baseConfig, _ref, vendor) {
  var dev = _ref.dev;

  if (dev && typeof vendor !== 'object' && vendor.constructor !== Array) {
    /* eslint-disable no-console */
    console.error('DllPlugin requires an Array of vendor packages as third parameter');
    console.error('Skipped ultimate-webpack-dll plugin, continuing without altering the webpack config');
    return baseConfig;
  }

  var appConfig = Object.assign({}, baseConfig);

  if (!dev) {
    return appConfig;
  }

  if (process.env.RAZZLE_VENDOR_MANIFEST) {
    var publicPath = "http://" + (process.env.HOST || 'localhost') + ":" + process.env.PORT_DEV + "/";
    appConfig.plugins.push(new AutoDllPlugin({
      filename: '[name].js',
      debug: false,
      entry: {
        vendor: vendor
      },
      inherit: true,
      config: {
        output: {
          publicPath: publicPath
        }
      },
      plugins: [new AssetsPlugin({
        includeManifest: 'manifest',
        path: paths.appBuild,
        filename: process.env.RAZZLE_VENDOR_MANIFEST
      })]
    }));
    appConfig.plugins.push(new webpack.WatchIgnorePlugin([paths.appBuild + "/" + process.env.RAZZLE_VENDOR_MANIFEST]));
  }

  return appConfig;
};