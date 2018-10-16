import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-style: normal;\n  text-align: center;\n  height: ", "px;\n  width: ", "px;\n  line-height: ", "px;\n  border-radius: ", "px;\n  border: 1px solid #ddd;\n  background: #eee;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import styled from 'styled-components';

var RenderCount =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RenderCount, _React$Component);

  function RenderCount() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.renders = 0;
    return _this;
  }

  var _proto = RenderCount.prototype;

  _proto.render = function render() {
    return React.createElement(Circle, null, ++this.renders);
  };

  return RenderCount;
}(React.Component);

export { RenderCount as default };
var size = 30;
var Circle = styled.i(_templateObject(), size, size, size, size / 2);