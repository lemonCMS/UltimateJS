"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _propName = _interopRequireDefault(require("./propName"));

var _default = function _default(name, components, locals) {
  var promises = (Array.isArray(components) ? components : [components]). // Filter out falsy components
  filter(function (component) {
    return component;
  }) // Get component lifecycle hooks
  .map(function (component) {
    return {
      component: component,
      hooks: component.default ? component.default[_propName.default] : component[_propName.default]
    };
  }) // Filter out components that haven't been decorated
  .filter(function (_ref) {
    var hooks = _ref.hooks;
    return hooks;
  }) // Calculate locals if required, execute hooks and store promises
  .map(function (_ref2) {
    var component = _ref2.component,
        hooks = _ref2.hooks;
    var hook = hooks[name];

    if (typeof hook !== 'function') {
      return null;
    }

    try {
      return typeof locals === 'function' ? hook(locals(component)) : hook(locals);
    } catch (err) {
      return Promise.reject(err);
    }
  });
  return Promise.all(promises);
};

exports.default = _default;
module.exports = exports["default"];