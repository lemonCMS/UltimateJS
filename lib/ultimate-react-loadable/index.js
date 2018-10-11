"use strict";

var _require = require('react-loadable/webpack'),
    ReactLoadablePlugin = _require.ReactLoadablePlugin;

module.exports = function (baseConfig, _ref) {
  var target = _ref.target;
  var appConfig = Object.assign({}, baseConfig);

  if (target === 'web') {
    appConfig.plugins.push(new ReactLoadablePlugin({
      filename: './build/react-loadable.json'
    }));
  }

  appConfig.plugins = appConfig.plugins.map(function (plugin) {
    if (plugin.constructor.name === 'WatchIgnorePlugin') {
      plugin.paths.push('./build/react-loadable.json');
      plugin.paths.push('./src/index.js');
      plugin.paths.push('./src/server.js');
      plugin.paths.push('./src/client.js');
      plugin.paths.push('./src/routes.js');
    }

    return plugin;
  });
  return appConfig;
};