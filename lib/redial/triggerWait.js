"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _asyncMap = _interopRequireDefault(require("./asyncMap"));

var _trigger = _interopRequireDefault(require("./trigger"));

var _default = function _default(name, components, locals) {
  return (0, _asyncMap.default)(components, function (component) {
    return (0, _trigger.default)(name, component, locals);
  });
};

exports.default = _default;
module.exports = exports["default"];