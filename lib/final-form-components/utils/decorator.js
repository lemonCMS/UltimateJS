"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = connnectToConfirm;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

function connnectToConfirm(conf) {
  return function (WrappedComponent) {
    var TmpComponent =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(TmpComponent, _Component);

      function TmpComponent() {
        return _Component.apply(this, arguments) || this;
      }

      var _proto = TmpComponent.prototype;

      _proto.render = function render() {
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.props, conf));
      };

      return TmpComponent;
    }(_react.Component);

    return TmpComponent;
  };
}

module.exports = exports["default"];