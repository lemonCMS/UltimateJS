"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Alert = _interopRequireDefault(require("react-bootstrap/lib/Alert"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var Message =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Message, _Component);

  function Message() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Message.prototype;

  _proto.render = function render() {
    var _this$context$status = this.context.status,
        submitting = _this$context$status.submitting,
        valid = _this$context$status.valid,
        submitFailed = _this$context$status.submitFailed,
        submitSucceeded = _this$context$status.submitSucceeded;

    if (this.props.hidden && (0, _isFunction2.default)(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden) === true) {
        return;
      }
    } else if (this.props.show && (0, _isFunction2.default)(this.props.show)) {
      if (this.context.checkCondition(this.props.show) !== true) {
        return null;
      }
    }

    if (this.props.type === 'success' && !submitting) {
      if (valid === true && submitSucceeded === true && submitting === false) {
        return _react.default.createElement(_Alert.default, {
          variant: "success"
        }, this.props.children);
      }
    }

    if (this.props.type === 'error' && !submitting) {
      if (valid === false && submitFailed === true) {
        return _react.default.createElement(_Alert.default, {
          variant: "danger"
        }, this.props.children);
      }
    }

    return _react.default.createElement("span", null);
  };

  return Message;
}(_react.Component);

exports.default = Message;
Message.contextTypes = {
  checkCondition: _propTypes.default.func,
  status: _propTypes.default.object
};
module.exports = exports["default"];