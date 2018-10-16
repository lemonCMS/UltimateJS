import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import _isFunction from 'lodash/isFunction';

var Message =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Message, _Component);

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

    if (this.props.hidden && _isFunction(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden) === true) {
        return;
      }
    } else if (this.props.show && _isFunction(this.props.show)) {
      if (this.context.checkCondition(this.props.show) !== true) {
        return null;
      }
    }

    if (this.props.type === 'success' && !submitting) {
      if (valid === true && submitSucceeded === true && submitting === false) {
        return React.createElement(Alert, {
          variant: "success"
        }, this.props.children);
      }
    }

    if (this.props.type === 'error' && !submitting) {
      if (valid === false && submitFailed === true) {
        return React.createElement(Alert, {
          variant: "danger"
        }, this.props.children);
      }
    }

    return React.createElement("span", null);
  };

  return Message;
}(Component);

Message.contextTypes = {
  checkCondition: PropTypes.func,
  status: PropTypes.object
};
export { Message as default };