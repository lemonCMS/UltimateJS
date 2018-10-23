"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Wrap = _interopRequireDefault(require("./Wrappers/Wrap"));

var _PluploadBinder = _interopRequireDefault(require("./Types/PluploadBinder"));

var _decorator = _interopRequireDefault(require("../utils/decorator"));

var _default = (0, _decorator.default)({
  type: 'text',
  component: _PluploadBinder.default
})(_Wrap.default);

exports.default = _default;
module.exports = exports["default"];