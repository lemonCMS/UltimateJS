"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterConfig = require("react-router-config");

var Ultimate =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Ultimate, _Component);

  function Ultimate() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Ultimate.prototype;

  _proto.render = function render() {
    return _react.default.createElement("div", null, (0, _reactRouterConfig.renderRoutes)(this.props.routes));
  };

  return Ultimate;
}(_react.Component);

Ultimate.defaultProps = {};
var _default = Ultimate;
exports.default = _default;
module.exports = exports["default"];