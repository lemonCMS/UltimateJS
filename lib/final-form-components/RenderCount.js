"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-style: normal;\n  text-align: center;\n  height: ", "px;\n  width: ", "px;\n  line-height: ", "px;\n  border-radius: ", "px;\n  border: 1px solid #ddd;\n  background: #eee;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var RenderCount =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RenderCount, _React$Component);

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
    return _react.default.createElement(Circle, null, ++this.renders);
  };

  return RenderCount;
}(_react.default.Component);

exports.default = RenderCount;
var size = 30;

var Circle = _styledComponents.default.i(_templateObject(), size, size, size, size / 2);

module.exports = exports["default"];