"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _propName = _interopRequireDefault(require("./propName"));

var _propNameAuth = _interopRequireDefault(require("./propNameAuth"));

var _default = function _default(hooks) {
  return function (ComposedComponent) {
    if (hooks.authorized !== 'undefined') {
      var authHooks = {};
      authHooks.authorized = hooks.authorized;
      ComposedComponent[_propNameAuth.default] = authHooks;
      delete hooks.authorized;
    }

    if (Object.keys(hooks).length > 0) {
      ComposedComponent[_propName.default] = hooks;
    }

    return ComposedComponent;
  };
};

exports.default = _default;
module.exports = exports["default"];