import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
export default function connnectToConfirm(conf) {
  return function (WrappedComponent) {
    var TmpComponent =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(TmpComponent, _Component);

      function TmpComponent() {
        return _Component.apply(this, arguments) || this;
      }

      var _proto = TmpComponent.prototype;

      _proto.render = function render() {
        return React.createElement(WrappedComponent, _extends({}, this.props, conf));
      };

      return TmpComponent;
    }(Component);

    return TmpComponent;
  };
}