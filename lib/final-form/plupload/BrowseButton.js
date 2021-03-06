"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _react = _interopRequireDefault(require("react"));

var BrowseButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(BrowseButton, _React$Component);

  function BrowseButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BrowseButton.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  _proto.render = function render() {
    return _react.default.createElement("button", (0, _extends2.default)({
      type: "button"
    }, (0, _omit2.default)(this.props, 'content')), this.props.content);
  };

  return BrowseButton;
}(_react.default.Component);

var _default = BrowseButton;
exports.default = _default;
module.exports = exports["default"];