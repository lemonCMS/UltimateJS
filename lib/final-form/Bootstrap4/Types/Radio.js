"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Col = _interopRequireDefault(require("react-bootstrap/lib/Col"));

var _Row = _interopRequireDefault(require("react-bootstrap/lib/Row"));

var _Alert = _interopRequireDefault(require("react-bootstrap/lib/Alert"));

var _FormCheck = _interopRequireDefault(require("react-bootstrap/lib/FormCheck"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/lib/FormControl"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _chunk2 = _interopRequireDefault(require("lodash/chunk"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var RadioBinder =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RadioBinder, _React$Component);

  function RadioBinder() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.searchBox = _this.searchBox.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.radioButtons = _this.radioButtons.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.radioButtonList = _this.radioButtonList.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.filtered = _this.filtered.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      value: ''
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
    var list = (0, _isArray2.default)(this.props.field.children) ? this.props.field.children : [this.props.field.children];

    if ((0, _get2.default)(this.props.field, 'static', false) === true) {
      return (0, _filter2.default)(list, {
        value: this.props.input.value
      });
    }

    var value = this.state.value;
    var strValue = String(value).toLowerCase();

    if (value !== '') {
      return (0, _filter2.default)(list, function (option) {
        return (0, _includes2.default)(String(option.children).toLowerCase(), strValue);
      });
    }

    return list;
  };

  _proto.radioButtonList = function radioButtonList(list) {
    var _this2 = this;

    var staticField = this.context.isStatic || (0, _get2.default)(this.props.field, 'static', false);
    return (0, _map2.default)(list, function (option, key) {
      if (staticField === true) {
        return _react.default.createElement(_FormControl.default, {
          plaintext: true,
          readOnly: true,
          defaultValue: option.children
        });
      }

      var disabled = false;

      if (_this2.props.field && _this2.props.field.disabled && (0, _isFunction2.default)(_this2.props.field.disabled)) {
        disabled = _this2.context.checkCondition(_this2.props.field.disabled(), (0, _get2.default)(_this2.props.field, 'parent'));
      }

      return _react.default.createElement(_FormCheck.default, {
        id: _this2.props.input.name + "-" + key,
        key: key,
        disabled: disabled,
        type: 'radio',
        name: _this2.props.input.name + "[" + key + "]",
        value: option.props.value,
        checked: String(_this2.props.input.value) === String(option.props.value),
        onChange: function onChange(event) {
          if (event.target.checked) {
            return _this2.props.input.onChange(option.props.value);
          }
        },
        label: option.props.children
      });
    });
  };

  _proto.radioButtons = function radioButtons() {
    var _this3 = this;

    var filtered = this.filtered();
    var field = (0, _get2.default)(this.props, 'field');

    if (filtered.length === 0) {
      return _react.default.createElement(_Alert.default, null, (0, _get2.default)(this.props.field, 'filter_norecords', 'No results'));
    }

    if (field.chunks) {
      var split = Math.ceil(filtered.length / field.chunks);

      var chunks = function chunks() {
        var chunkData = (0, _chunk2.default)(filtered, split);
        return (0, _map2.default)(chunkData, function (chunk, key) {
          return _react.default.createElement(_Col.default, {
            key: key,
            md: Math.round(12 / field.chunks)
          }, _this3.radioButtonList(chunk));
        });
      };

      return _react.default.createElement(_Row.default, null, chunks());
    }

    return this.radioButtonList(filtered);
  };

  _proto.searchBox = function searchBox() {
    var disabled = false;

    if (this.props.field && this.props.field.disabled && (0, _isFunction2.default)(this.props.field.disabled)) {
      disabled = this.context.checkCondition(this.props.field.disabled());
    }

    if ((this.props.field.searchable || this.props.field.filter) && !this.props.field.static && !this.context.isStatic) {
      return _react.default.createElement("input", {
        type: "text",
        disabled: disabled,
        placeholder: (0, _get2.default)(this.props.field, 'filter_placeholder', (0, _get2.default)(this.props.field.locale, 'filter.placeholder', 'Filter')),
        defaultValue: this.state.value,
        onKeyDown: this.handlePrevent,
        onKeyUp: this.handleChange,
        className: "form-control"
      });
    }
  };

  _proto.render = function render() {
    return _react.default.createElement("div", null, this.searchBox(), this.radioButtons());
  };

  return RadioBinder;
}(_react.default.Component);

RadioBinder.contextTypes = {
  checkCondition: _propTypes.default.func,
  isStatic: _propTypes.default.bool
};

var _default = function _default(_ref) {
  var input = _ref.input,
      field = _ref.field;
  return _react.default.createElement(RadioBinder, {
    input: input,
    field: field
  });
};

exports.default = _default;
module.exports = exports["default"];