"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Complex = _interopRequireDefault(require("./Complex"));

var _decorator = _interopRequireDefault(require("../utils/decorator"));

var _default = (0, _decorator.default)({
  row: true
})(_Complex.default);

exports.default = _default;
module.exports = exports["default"];