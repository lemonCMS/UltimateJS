import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Component } from 'react';

var Pending =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Pending, _Component);

  function Pending() {
    var _this;

    _this = _Component.call(this) || this;
    _this.pending = _this.pending.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Pending.prototype;

  _proto.pending = function pending() {
    if (this.props.state.pending === true) {
      return [React.createElement("div", {
        key: "1",
        className: "pendingOverlayBackground"
      }), React.createElement("div", {
        key: "2",
        className: "pendingOverlayContent"
      }, React.createElement("div", {
        className: "block"
      }, React.createElement("div", {
        className: "centered"
      }, React.createElement("i", {
        className: "fa fa-spinner fa-pulse fa-3x"
      }))))];
    }
  };

  _proto.render = function render() {
    if (this.props.state.failed === true) {
      return React.createElement("div", {
        className: "error-page text-center"
      }, React.createElement("div", {
        className: "container"
      }, React.createElement("h2", {
        className: "error-title"
      }, "404"), React.createElement("h3", {
        className: "error-subtitle"
      }, "Some bits denied your request."), React.createElement("p", {
        className: "error-text center-block"
      }, "De pagina die u probeerde te bezoeken bestaat niet.")));
    }

    return React.createElement("div", {
      className: 'pendingWrapper'
    }, this.pending(), this.props.children);
  };

  return Pending;
}(Component);

export { Pending as default };