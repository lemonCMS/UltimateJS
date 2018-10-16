import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import _isFunction from 'lodash/isFunction';
import _omitBy from 'lodash/omitBy';
import ReactDateTime from 'react-datetime';
import moment from 'moment';

var ContextBinder =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ContextBinder, _React$Component);

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

  _proto.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if (this.props.input.value && this.props.input.value !== '' && this.props.field.conf && this.props.field.conf.unix) {
      this.setState({
        value: moment.unix(this.props.input.value)
      }, function () {
        _this2.props.input.onChange(_this2.state.value);
      });
    } else {
      this.setState({
        value: moment(this.props.input.value)
      }, function () {
        _this2.props.input.onChange(_this2.state.value);
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    if (this.context.isStatic || this.props.field.static) {
      return React.createElement("div", {
        className: 'rte-readonly',
        dangerouslySetInnerHTML: {
          __html: this.state.value ? this.state.value.format() : ''
        }
      });
    }

    var inputProps = {
      disabled: false
    };

    if (this.props.field && this.props.field.disabled && _isFunction(this.props.field.disabled)) {
      inputProps.disabled = this.context.checkCondition(this.props.field.disabled);
    }

    var newProps = _omitBy(this.props.input, ['value', 'onChange', 'onBlur', 'onFocus']);

    newProps.onChange = function (value) {
      _this3.setState({
        value: value
      }, function () {
        _this3.props.input.onChange(value);
      });
    };

    newProps.value = this.state.value;
    return React.createElement(ReactDateTime, _extends({}, newProps, {
      inputProps: inputProps
    }, this.props.field.conf));
  };

  return ContextBinder;
}(React.Component);

ContextBinder.contextTypes = {
  checkCondition: PropTypes.func,
  isStatic: PropTypes.bool
};
export default (function (_ref) {
  var input = _ref.input,
      field = _ref.field;
  return React.createElement(ContextBinder, {
    input: input,
    field: field
  });
});