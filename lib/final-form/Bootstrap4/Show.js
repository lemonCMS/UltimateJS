"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var Show =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Show, _React$Component);

  function Show() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Show.prototype;

  _proto.render = function render() {
    if (this.props.hidden && (0, _isFunction2.default)(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden, (0, _get2.default)(this.props, 'parent')) === true) {
        return null;
      }
    } else if (this.props.show && (0, _isFunction2.default)(this.props.show)) {
      if (this.context.checkCondition(this.props.show, (0, _get2.default)(this.props, 'parent')) !== true) {
        return null;
      }
    }

    return this.props.children;
  };

  return Show;
}(_react.default.Component);

Show.defaultProps = {};
Show.contextTypes = {
  checkCondition: _propTypes.default.func.isRequired,
  isStatic: _propTypes.default.bool.isRequired
};
var _default = Show;
exports.default = _default;
module.exports = exports["default"];