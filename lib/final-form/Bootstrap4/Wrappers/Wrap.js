"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _Row = _interopRequireDefault(require("react-bootstrap/lib/Row"));

var _Col = _interopRequireDefault(require("react-bootstrap/lib/Col"));

var _FormGroup = _interopRequireDefault(require("react-bootstrap/lib/FormGroup"));

var _FormLabel = _interopRequireDefault(require("react-bootstrap/lib/FormLabel"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/lib/FormControl"));

var _InputGroup = _interopRequireDefault(require("react-bootstrap/lib/InputGroup"));

var _FormText = _interopRequireDefault(require("react-bootstrap/lib/FormText"));

var _DropdownItem = _interopRequireDefault(require("react-bootstrap/lib/DropdownItem"));

var _DropdownButton = _interopRequireDefault(require("react-bootstrap/lib/DropdownButton"));

var _reactFinalForm = require("react-final-form");

// import FormText from 'react-bootstrap/lib/FormText';
// import FormCheck from 'react-bootstrap/lib/FormCheck';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
var Wrap =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Wrap, _React$Component);

  function Wrap() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.input = {};
    _this.custom = {};
    _this.dropdownButton = _this.dropdownButton.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.dropDown = _this.dropDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderField = _this.renderField.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.options = _this.options.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Wrap.prototype;

  _proto.options = function options(props) {
    if (props.type === 'select') {
      return this.props.children;
    }
  };

  _proto.dropDown = function dropDown(props) {
    var _this2 = this;

    var menuItem = [];
    var dropDownTitle = (0, _get2.default)(props.field, 'title', null);
    (0, _map2.default)(props.field.children, function (item, key) {
      var select = function select() {
        _this2.input.onBlur();

        _this2.input.onChange(item.props.value);
      };

      if (item.props.selected && !props.input.value) {
        dropDownTitle = item.props.children;
        menuItem.push(_react.default.createElement(_DropdownItem.default, {
          key: key,
          onSelect: select
        }, item.props.children));
      } else {
        if (String(_this2.input.value) === String(item.props.value)) {
          dropDownTitle = item.props.children;
        }

        menuItem.push(_react.default.createElement(_DropdownItem.default, {
          key: key,
          onSelect: select
        }, item.props.children));
      }

      if (item.props.selected) {
        menuItem.push(_react.default.createElement(_DropdownItem.default, {
          key: key + '_div',
          divider: true
        }));
      }
    });
    return {
      dropDownTitle: dropDownTitle,
      menuItem: menuItem
    };
  };

  _proto.dropdownButton = function dropdownButton(props, isStatic) {
    var _this$dropDown = this.dropDown(props),
        dropDownTitle = _this$dropDown.dropDownTitle,
        menuItem = _this$dropDown.menuItem;

    var size = (0, _get2.default)(props.field, 'size', this.props.size);

    var thisSize = function thisSize() {
      if (size !== 'medium') {
        return {
          size: size
        };
      }
    };

    var disabled = false;

    if (props.field && props.field.disabled && (0, _isFunction2.default)(props.field.disabled)) {
      disabled = this.context.checkCondition(props.field.disabled());
    }

    if (isStatic === true || disabled === true) {
      return _react.default.createElement(_FormControl.default, {
        plaintext: true,
        readOnly: true,
        defaultValue: dropDownTitle || (0, _get2.default)(props.field, 'placeholder')
      });
    }

    return _react.default.createElement(_DropdownButton.default, (0, _extends2.default)({
      key: this.input.name,
      onClick: function onClick(event) {
        event.preventDefault();
      }
    }, thisSize(), {
      title: dropDownTitle || (0, _get2.default)(props.field, 'placeholder'),
      id: 'input-dropdown-addon' + this.input.name
    }), menuItem);
  };

  _proto.renderField = function renderField(props) {
    var _this3 = this;

    var input = props.input,
        help = props.help,
        _props$meta = props.meta,
        touched = _props$meta.touched,
        error = _props$meta.error,
        submitError = _props$meta.submitError,
        submitFailed = _props$meta.submitFailed,
        valid = _props$meta.valid,
        custom = (0, _objectWithoutPropertiesLoose2.default)(props, ["input", "help", "meta"]);
    this.input = input;
    var size = (0, _get2.default)(props.field, 'size', this.props.size);

    if (props.field && props.field.hidden && (0, _isFunction2.default)(props.field.hidden)) {
      if (this.context.checkCondition(props.field.hidden, (0, _get2.default)(props, 'parent')) === true) {
        return null;
      }
    } else if (props.field && props.field.show && (0, _isFunction2.default)(props.field.show)) {
      if (this.context.checkCondition(props.field.show, (0, _get2.default)(props, 'parent')) !== true) {
        return null;
      }
    }

    var thisSize = function thisSize() {
      if (size !== 'medium') {
        return {
          size: size
        };
      }
    };

    var labelSize = function labelSize() {
      if ((0, _has2.default)(props.field, 'labelSize')) {
        return props.field.labelSize;
      }
    };

    var fieldSize = function fieldSize() {
      if ((0, _has2.default)(props.field, 'fieldSize')) {
        return props.field.fieldSize;
      }
    };

    var add = (0, _pick2.default)(custom, ['type', 'placeholder', 'rows', 'cols', 'bsClass']);

    if (add.type === 'select') {
      add.as = 'select';
    }

    if (custom.field.disabled && (0, _isFunction2.default)(custom.field.disabled)) {
      add.disabled = this.context.checkCondition(custom.field.disabled, (0, _get2.default)(props, 'parent'));
    }

    if (props.field.placeholder) {
      add.placeholder = props.field.placeholder;
    }

    if (props.field.cols) {
      add.cols = props.field.cols;
    }

    if (props.field.rows) {
      add.rows = props.field.rows;
    }

    if (props.field.bsClass) {
      add.bsClass = props.field.bsClass;
    }

    var component = function component() {
      // Render custom component
      if (_this3.props.component) {
        var Comp = _this3.props.component;
        return _react.default.createElement(Comp, props);
      }

      if (_this3.context.isStatic === true || (0, _get2.default)(props.field, 'static', false) === true) {
        var value = function value() {
          if (props.field.type === 'select') {
            return (0, _map2.default)((0, _filter2.default)(props.field.options, {
              value: _this3.input.value
            }), function (item, key) {
              return _react.default.createElement("span", {
                key: key
              }, item.desc);
            });
          }

          return _this3.input.value;
        };

        switch (props.type) {
          case 'dropdown':
            return _this3.dropdownButton(props, true);

          default:
            {
              return _react.default.createElement(_FormControl.default, {
                plaintext: true,
                readOnly: true,
                defaultValue: value()
              });
            }
        }
      }

      switch (props.field.type) {
        case 'dropdown':
          return _this3.dropdownButton(props, false);

        case 'textarea':
          return _react.default.createElement(_FormControl.default, (0, _extends2.default)({
            as: "textarea"
          }, input, add));

        case 'select':
          return _react.default.createElement(_FormControl.default, (0, _extends2.default)({
            as: "select"
          }, input, add), _this3.options(props));

        default:
          return _react.default.createElement(_FormControl.default, (0, _extends2.default)({}, input, add));
      }
    };

    var validationState = function validationState() {
      if (touched && error || submitFailed && submitError) {
        return 'error';
      }

      if (touched && valid) {
        return 'success';
      }
    };

    var buttonBefore = function buttonBefore() {
      if ((0, _has2.default)(props.field, 'buttonBefore')) {
        return _react.default.createElement(_InputGroup.default.Prepand, null, props.field.buttonBefore());
      }
    };

    var buttonAfter = function buttonAfter() {
      if ((0, _has2.default)(props.field, 'buttonAfter')) {
        return _react.default.createElement(_InputGroup.default.Append, null, props.field.buttonAfter());
      }
    };

    var addonBefore = function addonBefore() {
      if ((0, _has2.default)(props.field, 'addonBefore')) {
        return _react.default.createElement(_InputGroup.default.Prepend, null, (0, _get2.default)(props.field, 'addonBefore'));
      }
    };

    var addonAfter = function addonAfter() {
      if ((0, _has2.default)(props.field, 'addonAfter')) {
        return _react.default.createElement(_InputGroup.default.Append, null, (0, _get2.default)(props.field, 'addonAfter'));
      }
    };

    var getField = function getField() {
      if ((0, _has2.default)(props.field, 'addonBefore') || (0, _has2.default)(props.field, 'addonAfter') || (0, _has2.default)(props.field, 'buttonBefore') || (0, _has2.default)(props.field, 'buttonAfter')) {
        return _react.default.createElement(_InputGroup.default, {
          isInvalid: validationState()
        }, buttonBefore(), addonBefore(), component(), addonAfter(), buttonAfter());
      }

      return component();
    };

    if (props.type === 'dropdown' && !(0, _has2.default)(props.field, 'label')) {
      return getField();
    }

    var getLabel = function getLabel() {
      if (props.field.label) {
        return _react.default.createElement(_FormLabel.default, (0, _extends2.default)({
          column: true
        }, labelSize()), props.field.label);
      }
    };

    var rendered = _react.default.createElement(_FormGroup.default, (0, _extends2.default)({
      as: _Row.default
    }, thisSize()), getLabel(), _react.default.createElement(_Col.default, fieldSize(), getField(), (touched && error || submitFailed && submitError) && _react.default.createElement(_FormControl.default.Feedback, null), props.field.help && (!touched || !submitError && !error) && _react.default.createElement(_FormText.default, null, props.field.help), (touched && error || submitFailed && submitError) && _react.default.createElement(_FormText.default, null, submitError || error)));

    if (this.context.debug) {
      return _react.default.createElement("div", {
        style: {
          position: 'relative'
        }
      }, rendered);
    }

    return rendered;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        name = _this$props.name,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["name"]);
    return _react.default.createElement(_reactFinalForm.Field, {
      component: this.renderField,
      type: this.props.type,
      name: name,
      field: rest
    });
  };

  return Wrap;
}(_react.default.Component);

Wrap.contextTypes = {
  debug: _propTypes.default.bool.isRequired,
  checkCondition: _propTypes.default.func.isRequired,
  isStatic: _propTypes.default.bool.isRequired
};
Wrap.defaultProps = {};
var _default = Wrap;
exports.default = _default;
module.exports = exports["default"];