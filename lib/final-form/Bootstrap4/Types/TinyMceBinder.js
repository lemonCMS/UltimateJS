"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TinyMceInput = _interopRequireDefault(require("./TinyMceInput"));

var ContextBinder =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ContextBinder, _React$Component);

  function ContextBinder() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ContextBinder.prototype;

  _proto.render = function render() {
    if (this.context.isStatic || this.props.field.static) {
      return _react.default.createElement("div", {
        className: 'rte-readonly',
        dangerouslySetInnerHTML: {
          __html: this.props.input.value
        }
      });
    }

    return _react.default.createElement(_TinyMceInput.default, (0, _extends2.default)({
      readOnly: true
    }, this.props.input, {
      className: this.props.field.className,
      tinymceConfig: Object.assign({}, this.props.field.config)
    }));
  };

  return ContextBinder;
}(_react.default.Component);

ContextBinder.contextTypes = {
  checkCondition: _propTypes.default.func,
  isStatic: _propTypes.default.bool
};

var _default = function _default(_ref) {
  var input = _ref.input,
      field = _ref.field;
  return _react.default.createElement(ContextBinder, {
    input: input,
    field: field
  });
};

exports.default = _default;
module.exports = exports["default"];