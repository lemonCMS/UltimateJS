"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _omitBy2 = _interopRequireDefault(require("lodash/omitBy"));

var _reactDatetime = _interopRequireDefault(require("react-datetime"));

var _moment = _interopRequireDefault(require("moment"));

var ContextBinder =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ContextBinder, _React$Component);

  function ContextBinder() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      value: null
    };
    return _this;
  }

  var _proto = ContextBinder.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.props.input.value && this.props.input.value !== '' && this.props.field.conf && this.props.field.conf.unix) {
      this.setState({
        value: _moment.default.unix(this.props.input.value)
      }, function () {
        _this2.props.input.onChange(_this2.state.value);
      });
    } else {
      this.setState({
        value: (0, _moment.default)(this.props.input.value)
      }, function () {
        _this2.props.input.onChange(_this2.state.value);
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    if (this.context.isStatic || this.props.field.static) {
      return _react.default.createElement("div", {
        className: 'rte-readonly',
        dangerouslySetInnerHTML: {
          __html: this.state.value ? this.state.value.format() : ''
        }
      });
    }

    var inputProps = {
      disabled: false
    };

    if (this.props.field && this.props.field.disabled && (0, _isFunction2.default)(this.props.field.disabled)) {
      inputProps.disabled = this.context.checkCondition(this.props.field.disabled);
    }

    var newProps = (0, _omitBy2.default)(this.props.input, ['value', 'onChange', 'onBlur', 'onFocus']);

    newProps.onChange = function (value) {
      _this3.setState({
        value: value
      }, function () {
        _this3.props.input.onChange(value);
      });
    };

    newProps.value = this.state.value;
    return _react.default.createElement(_reactDatetime.default, (0, _extends2.default)({}, newProps, {
      inputProps: inputProps
    }, this.props.field.conf));
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