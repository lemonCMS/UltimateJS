"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/lib/FormControl"));

var _default = function _default(_ref) {
  var input = _ref.input,
      field = _ref.field;
  return _react.default.createElement(_FormControl.default, (0, _extends2.default)({
    type: field.type
  }, input));
};

exports.default = _default;
module.exports = exports["default"];