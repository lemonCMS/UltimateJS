import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _omit from 'lodash/omit';
import React from 'react';

var UploadButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(UploadButton, _React$Component);

  function UploadButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UploadButton.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return true;
  };

  _proto.render = function render() {
    return React.createElement('button', _omit(this.props, 'content'), this.props.content);
  };

  return UploadButton;
}(React.Component);

export default UploadButton;