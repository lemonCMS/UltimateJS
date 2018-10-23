import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
import BSButton from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';

var Button =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Button, _Component);

  function Button() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    return React.createElement(BSButton, _extends({}, rest, {
      disabled: (this.context.status.submitting === true || this.context.status.valid === false || this.context.status.pristine === true) && this.context.status.dirtySinceLastSubmit === false
    }), children, this.props.type === 'submit' && this.context.status.submitting && ' ', this.props.type === 'submit' && this.context.status.submitting && React.createElement("i", {
      className: "fa fa-circle-o-notch fa-spin"
    }));
  };

  return Button;
}(Component);

Button.defaultProps = {};
Button.contextTypes = {
  status: PropTypes.object
};
export default Button;