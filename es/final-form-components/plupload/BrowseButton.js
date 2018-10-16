import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _omit from 'lodash/omit';
import React from 'react';

var BrowseButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BrowseButton, _React$Component);

  function BrowseButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BrowseButton.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  _proto.render = function render() {
    return React.createElement("button", _extends({
      type: "button"
    }, _omit(this.props, 'content')), this.props.content);
  };

  return BrowseButton;
}(React.Component);

export default BrowseButton;