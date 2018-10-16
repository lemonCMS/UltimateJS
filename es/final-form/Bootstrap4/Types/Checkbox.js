import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import Checkbox from 'react-bootstrap/lib/FormCheck';
import FormControl from 'react-bootstrap/lib/FormControl';
import _isFunction from 'lodash/isFunction';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _chunk from 'lodash/chunk';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isArray from 'lodash/isArray';

var RadioBinder =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RadioBinder, _React$Component);

  function RadioBinder() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.searchBox = _this.searchBox.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.radioButtons = _this.radioButtons.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.radioButtonList = _this.radioButtonList.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.filtered = _this.filtered.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      value: '',
      selected: []
    };
    return _this;
  }

  var _proto = RadioBinder.prototype;

  _proto.handleChange = function handleChange(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      value: e.target.value
    });
  };

  _proto.handlePrevent = function handlePrevent(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  _proto.filtered = function filtered() {
    var list = _isArray(this.props.field.children) ? this.props.field.children : [this.props.field.children];

    if (_get(this.props.field, 'static', false) === true) {
      return _filter(list, {
        value: this.props.input.value
      });
    }

    var value = this.state.value;
    var strValue = String(value).toLowerCase();

    if (value !== '') {
      return _filter(list, function (option) {
        return _includes(String(option.children).toLowerCase(), strValue);
      });
    }

    return list;
  };

  _proto.radioButtonList = function radioButtonList(list) {
    var _this2 = this;

    var staticField = this.context.isStatic || _get(this.props.field, 'static', false);

    var multiple = _isArray(this.props.field.children);

    var clone = [];

    if (_isArray(this.props.input.value)) {
      clone = _map(this.props.input.value, function (item) {
        return String(item);
      });
    }

    return _map(list, function (option, key) {
      if (staticField === true) {
        return React.createElement(FormControl, {
          plaintext: true,
          readOnly: true,
          defaultValue: option.children
        });
      }

      var disabled = false;

      if (_this2.props.field && _this2.props.field.disabled && _isFunction(_this2.props.field.disabled)) {
        disabled = _this2.context.checkCondition(_this2.props.field.disabled(), _get(_this2.props.field, 'parent'));
      }

      var name = multiple ? _this2.props.input.name + "[" + key + "]" : _this2.props.input.name;
      var checked = multiple && clone.indexOf(option.props.value) !== -1 || !multiple && (_this2.props.input.value === true || parseInt(_this2.props.input.value, 10) === 1);
      return React.createElement(Checkbox, {
        key: key,
        id: _this2.props.input.name + "-" + key,
        type: 'checkbox',
        disabled: disabled,
        name: name,
        value: option.props.value,
        checked: checked,
        onChange: function onChange(event) {
          if (multiple) {
            var newValue = (_this2.props.input.value instanceof Array ? _this2.props.input.value : [_this2.props.input.value]).filter(Boolean);

            if (event.target.checked) {
              newValue.push(option.props.value);
            } else {
              newValue.splice(newValue.indexOf(option.props.value), 1);
            }

            return _this2.props.input.onChange(newValue);
          } else {
            return _this2.props.input.onChange(event.target.checked ? option.props.value : false);
          }
        },
        label: option.props.children
      });
    });
  };

  _proto.radioButtons = function radioButtons() {
    var _this3 = this;

    var filtered = this.filtered();

    var field = _get(this.props, 'field');

    if (filtered.length === 0) {
      return React.createElement(Alert, null, _get(this.props.field, 'filter_norecords', 'No results'));
    }

    if (field.chunks) {
      var split = Math.ceil(filtered.length / field.chunks);

      var chunks = function chunks() {
        var chunkData = _chunk(filtered, split);

        return _map(chunkData, function (chunk, key) {
          return React.createElement(Col, {
            key: key,
            md: Math.round(12 / field.chunks)
          }, _this3.radioButtonList(chunk));
        });
      };

      return React.createElement(Row, null, chunks());
    }

    return this.radioButtonList(filtered);
  };

  _proto.searchBox = function searchBox() {
    var disabled = false;

    if (this.props.field && this.props.field.disabled && _isFunction(this.props.field.disabled)) {
      disabled = this.context.checkCondition(this.props.field.disabled());
    }

    if ((this.props.field.searchable || this.props.field.filter) && !this.props.field.static && !this.context.isStatic) {
      return React.createElement("input", {
        type: "text",
        disabled: disabled,
        placeholder: _get(this.props.field, 'filter_placeholder', _get(this.props.field.locale, 'filter.placeholder', 'Filter')),
        defaultValue: this.state.value,
        onKeyDown: this.handlePrevent,
        onKeyUp: this.handleChange,
        className: "form-control"
      });
    }
  };

  _proto.render = function render() {
    return React.createElement("div", null, this.searchBox(), this.radioButtons());
  };

  return RadioBinder;
}(React.Component);

RadioBinder.contextTypes = {
  checkCondition: PropTypes.func,
  isStatic: PropTypes.bool
};
export default (function (_ref) {
  var input = _ref.input,
      field = _ref.field;
  return React.createElement(RadioBinder, {
    input: input,
    field: field
  });
});