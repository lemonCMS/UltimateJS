import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import PropTypes from 'prop-types';
import React from 'react';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _filter from 'lodash/filter';
import _isFunction from 'lodash/isFunction';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/FormText';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import { Field } from 'react-final-form';

var Wrap =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Wrap, _React$Component);

  function Wrap() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.input = {};
    _this.custom = {};
    _this.dropdownButton = _this.dropdownButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.dropDown = _this.dropDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderField = _this.renderField.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.options = _this.options.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    var dropDownTitle = _get(props.field, 'title', null);

    _map(props.field.children, function (item, key) {
      var select = function select() {
        _this2.input.onBlur();

        _this2.input.onChange(item.props.value);
      };

      if (item.props.selected && !props.input.value) {
        dropDownTitle = item.props.children;
        menuItem.push(React.createElement(MenuItem, {
          key: key,
          onSelect: select
        }, item.props.children));
      } else {
        if (String(_this2.input.value) === String(item.props.value)) {
          dropDownTitle = item.props.children;
        }

        menuItem.push(React.createElement(MenuItem, {
          key: key,
          onSelect: select
        }, item.props.children));
      }

      if (item.props.selected) {
        menuItem.push(React.createElement(MenuItem, {
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

    var size = _get(props.field, 'bsSize', this.props.size);

    var thisSize = function thisSize() {
      if (size !== 'medium') {
        return {
          bsSize: size
        };
      }
    };

    var disabled = false;

    if (props.field && props.field.disabled && _isFunction(props.field.disabled)) {
      disabled = this.context.checkCondition(props.field.disabled());
    }

    if (isStatic === true || disabled === true) {
      return React.createElement(FormControl.Static, null, dropDownTitle || _get(props.field, 'placeholder'));
    }

    return React.createElement(DropdownButton, _extends({
      key: this.input.name,
      onClick: function onClick(event) {
        event.preventDefault();
      }
    }, thisSize(), {
      title: dropDownTitle || _get(props.field, 'placeholder'),
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
        custom = _objectWithoutPropertiesLoose(props, ["input", "help", "meta"]);

    this.input = input;

    var size = _get(props.field, 'bsSize', this.props.size);

    if (props.field && props.field.hidden && _isFunction(props.field.hidden)) {
      if (this.context.checkCondition(props.field.hidden, _get(props, 'parent')) === true) {
        return null;
      }
    } else if (props.field && props.field.show && _isFunction(props.field.show)) {
      if (this.context.checkCondition(props.field.show, _get(props, 'parent')) !== true) {
        return null;
      }
    }

    var thisSize = function thisSize() {
      if (size !== 'medium') {
        return {
          bsSize: size
        };
      }
    };

    var labelSize = function labelSize() {
      if (_has(props.field, 'labelSize')) {
        return props.field.labelSize;
      }
    };

    var fieldSize = function fieldSize() {
      if (_has(props.field, 'fieldSize')) {
        return props.field.fieldSize;
      }
    };

    var add = _pick(custom, ['type', 'placeholder', 'rows', 'cols', 'bsClass']);

    if (add.type === 'select') {
      add.componentClass = 'select';
    }

    if (custom.field.disabled && _isFunction(custom.field.disabled)) {
      add.disabled = this.context.checkCondition(custom.field.disabled, _get(props, 'parent'));
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
        return React.createElement(Comp, props);
      }

      if (_this3.context.isStatic === true || _get(props.field, 'static', false) === true) {
        var value = function value() {
          if (props.field.type === 'select') {
            return _map(_filter(props.field.options, {
              value: _this3.input.value
            }), function (item, key) {
              return React.createElement("span", {
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
              return React.createElement(FormControl.Static, null, value());
            }
        }
      }

      switch (props.field.type) {
        case 'dropdown':
          return _this3.dropdownButton(props, false);

        case 'textarea':
          return React.createElement(FormControl, _extends({
            type: "textarea"
          }, input, add));

        case 'select':
          return React.createElement(FormControl, _extends({
            type: "select"
          }, input, add), _this3.options(props));

        default:
          return React.createElement(FormControl, _extends({}, input, add));
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
      if (_has(props.field, 'buttonBefore')) {
        return React.createElement(InputGroup.Append, null, props.field.buttonBefore());
      }
    };

    var buttonAfter = function buttonAfter() {
      if (_has(props.field, 'buttonAfter')) {
        return React.createElement(InputGroup.Prepend, null, props.field.buttonAfter());
      }
    };

    var addonBefore = function addonBefore() {
      if (_has(props.field, 'addonBefore')) {
        return React.createElement(InputGroup.Prepend, null, _get(props.field, 'addonBefore'));
      }
    };

    var addonAfter = function addonAfter() {
      if (_has(props.field, 'addonAfter')) {
        return React.createElement(InputGroup.Append, null, _get(props.field, 'addonAfter'));
      }
    };

    var getField = function getField() {
      if (_has(props.field, 'addonBefore') || _has(props.field, 'addonAfter') || _has(props.field, 'buttonBefore') || _has(props.field, 'buttonAfter')) {
        return React.createElement(InputGroup, null, buttonBefore(), addonBefore(), component(), addonAfter(), buttonAfter());
      }

      return component();
    };

    if (props.type === 'dropdown' && !_has(props.field, 'label')) {
      return getField();
    }

    var getLabel = function getLabel() {
      if (props.field.label) {
        return React.createElement(Col, _extends({
          componentClass: ControlLabel
        }, labelSize()), props.field.label);
      }
    };

    var rendered = React.createElement(FormGroup, _extends({}, thisSize(), {
      validationState: validationState()
    }), getLabel(), React.createElement(Col, fieldSize(), getField(), (touched && error || submitFailed && submitError) && React.createElement(FormControl.Feedback, null), props.field.help && (!touched || !submitError && !error) && React.createElement(HelpBlock, null, props.field.help), (touched && error || submitFailed && submitError) && React.createElement(HelpBlock, null, submitError || error)));

    if (this.context.debug) {
      return React.createElement("div", {
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
        rest = _objectWithoutPropertiesLoose(_this$props, ["name"]);

    return React.createElement(Field, {
      component: this.renderField,
      type: this.props.type,
      name: name,
      field: rest
    });
  };

  return Wrap;
}(React.Component);

Wrap.contextTypes = {
  debug: PropTypes.bool.isRequired,
  checkCondition: PropTypes.func.isRequired,
  isStatic: PropTypes.bool.isRequired
};
Wrap.defaultProps = {};
export default Wrap;