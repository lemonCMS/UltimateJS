"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/lib/Button"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Button =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Button, _Component);

  function Button() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children"]);
    return _react.default.createElement(_Button.default, (0, _extends2.default)({}, rest, {
      disabled: (this.context.status.submitting === true || this.context.status.valid === false || this.context.status.pristine === true) && this.context.status.dirtySinceLastSubmit === false
    }), children, this.props.type === 'submit' && this.context.status.submitting && ' ', this.props.type === 'submit' && this.context.status.submitting && _react.default.createElement("i", {
      className: "fa fa-circle-o-notch fa-spin"
    }));
  };

  return Button;
}(_react.Component);

Button.defaultProps = {};
Button.contextTypes = {
  status: _propTypes.default.object
};
var _default = Button;
exports.default = _default;
module.exports = exports["default"];