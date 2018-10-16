"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalFormArrays = require("react-final-form-arrays");

var _Panel = _interopRequireDefault(require("react-bootstrap/lib/Panel"));

var _Button = _interopRequireDefault(require("react-bootstrap/lib/Button"));

var _Row = _interopRequireDefault(require("react-bootstrap/lib/Row"));

var _Col = _interopRequireDefault(require("react-bootstrap/lib/Col"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/lib/ButtonToolbar"));

var _ControlLabel = _interopRequireDefault(require("react-bootstrap/lib/ControlLabel"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var Complex =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Complex, _React$Component);

  function Complex() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.renderComplex = _this.renderComplex.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.push = null;
    _this.length = 0;
    _this.renderChildren = _this.renderChildren.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      collapsed: null
    };
    return _this;
  }

  var _proto = Complex.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.mandatory === true && (this.length === undefined || this.length === 0)) {
      this.push({});
    }
  };

  _proto.renderChildren = function renderChildren(name, count, remove, move, complexIndex, staticField, disabled) {
    var _this2 = this;

    var buttons = function buttons() {
      var returnButtons = [];

      if (staticField !== true) {
        if (complexIndex > 0 && count > 1) {
          returnButtons.push(_react.default.createElement(_Button.default, {
            key: 2,
            onClick: function onClick() {
              return move(complexIndex, complexIndex - 1);
            },
            bsStyle: (0, _get3.default)(_this2.props.moveBtn, 'bsStyle', 'default'),
            bsSize: (0, _get3.default)(_this2.props.moveBtn, 'bsSize', undefined),
            disabled: disabled,
            type: "button"
          }, _react.default.createElement("i", {
            className: "fa fa-chevron-up"
          })));
        }

        if (count > 1 && complexIndex < count - 1) {
          returnButtons.push(_react.default.createElement(_Button.default, {
            key: 3,
            onClick: function onClick() {
              return move(complexIndex, complexIndex + 1);
            },
            bsStyle: (0, _get3.default)(_this2.props.moveBtn, 'bsStyle', 'default'),
            bsSize: (0, _get3.default)(_this2.props.moveBtn, 'bsSize', undefined),
            disabled: disabled,
            type: "button"
          }, _react.default.createElement("i", {
            className: "fa fa-chevron-down"
          })));
        }

        if (_this2.props.mandatory && count > 1 || !_this2.props.mandatory && count > 0) {
          returnButtons.push(_react.default.createElement(_Button.default, {
            key: 1,
            onClick: function onClick() {
              return remove(complexIndex);
            },
            bsStyle: (0, _get3.default)(_this2.props.removeBtn, 'bsStyle', 'danger'),
            bsSize: (0, _get3.default)(_this2.props.removeBtn, 'bsSize', undefined),
            className: (0, _get3.default)(_this2.props.removeBtn, 'className', ''),
            title: (0, _get3.default)(_this2.props.removeBtn, 'title', ''),
            disabled: disabled,
            type: "button"
          }, _react.default.createElement("i", {
            className: "fa fa-trash"
          })));
        }
      }

      return returnButtons;
    };

    var _get2 = (0, _get3.default)(this.props, 'panel', {}),
        header = _get2.header,
        footer = _get2.footer;

    var headerDiv = _react.default.createElement("div", {
      className: "clearfix"
    }, _react.default.createElement(_ButtonToolbar.default, null, buttons()), header);

    var component = function component() {
      if (_this2.props.render) {
        return _this2.props.render(name);
      }

      return _react.default.Children.map(_this2.props.children, function (child) {
        return _react.default.cloneElement(child, {
          name: name + "." + child.props.name,
          parent: name
        });
      });
    };

    if (this.props.row) {
      return _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, this.props.left, component()), _react.default.createElement(_Col.default, this.props.right, headerDiv));
    }

    return _react.default.createElement(_Panel.default, {
      className: "rfg-cmplx-btn-flds"
    }, _react.default.createElement(_Panel.default.Heading, null, headerDiv), _react.default.createElement(_Panel.default.Body, null, component()), footer && _react.default.createElement(_Panel.default.Footer, null, footer));
  };

  _proto.renderComplex = function renderComplex(props) {
    var _this3 = this;

    var fields = props.fields,
        _props$meta = props.meta,
        touched = _props$meta.touched,
        error = _props$meta.error;
    var staticField = props.static;
    this.push = props.fields.push;
    this.length = props.fields.length;

    var thisSize = function thisSize() {
      if (_this3.props.size !== 'medium') {
        return {
          bsSize: _this3.props.size
        };
      }
    };

    var labelSize = function labelSize() {
      if ((0, _has2.default)(_this3.props, 'labelSize')) {
        return _this3.props.labelSize;
      }
    };

    var fieldSize = function fieldSize() {
      if ((0, _has2.default)(_this3.props, 'fieldSize')) {
        return _this3.props.fieldSize;
      }
    };

    var toggle = function toggle() {
      var state = false;

      if (_this3.state.collapsed === null) {
        state = !(_this3.props.collapsed && _this3.props.collapsed === true);
      } else if (_this3.state.collapsed === false) {
        state = true;
      }

      _this3.setState({
        'collapsed': state
      }, function () {// this.props.formChange('itemsx', state);
      });
    };

    if (this.props.label) {
      if (this.state.collapsed === true || this.state.collapsed === null && this.props.collapsed && this.props.collapsed === true) {
        return _react.default.createElement(_Row.default, {
          className: "rfg-cmplx rfg-cmplx-collapsed"
        }, _react.default.createElement(_Col.default, (0, _extends2.default)({
          componentClass: _ControlLabel.default
        }, labelSize()), _react.default.createElement(_Button.default, (0, _extends2.default)({
          type: "button",
          onClick: toggle,
          bsStyle: "link"
        }, thisSize()), '+ ', this.props.label)));
      }
    }

    var disabled = false;

    if (this.props && this.props.disabled && (0, _isFunction2.default)(this.props.disabled)) {
      disabled = this.context.checkCondition(this.props.disabled());
    }

    var renderAddButton = function renderAddButton() {
      if ((0, _get3.default)(_this3.props, 'multiple', true) === true || fields.length === 0) {
        var bsStyle = function bsStyle() {
          if ((0, _get3.default)(_this3.props.addBtn, 'bsStyle') && (0, _get3.default)(_this3.props.addBtn, 'bsStyle') !== 'default') {
            return {
              bsStyle: (0, _get3.default)(_this3.props.addBtn, 'bsStyle')
            };
          }
        };

        return _react.default.createElement("div", {
          className: "rfg-cmplx-btn-add"
        }, staticField !== true && _react.default.createElement(_Button.default, (0, _extends2.default)({
          type: "button",
          onClick: function onClick() {
            return fields.push({});
          },
          disabled: disabled
        }, thisSize(), bsStyle(), {
          className: (0, _get3.default)(_this3.props.addBtn, 'className')
        }), (0, _get3.default)(_this3.props.addBtn, 'label', 'toevoegen')), touched && error && _react.default.createElement("span", null, error));
      }
    };

    return _react.default.createElement(_Row.default, {
      className: "rfg-cmplx rfg-cmplx-collapsed"
    }, this.props.label && _react.default.createElement(_Col.default, (0, _extends2.default)({
      componentClass: _ControlLabel.default
    }, labelSize()), _react.default.createElement(_Button.default, (0, _extends2.default)({
      type: "button",
      onClick: toggle,
      bsStyle: "link"
    }, thisSize()), '- ', this.props.label)), _react.default.createElement(_Col.default, fieldSize(), fields.map(function (field, key) {
      return _react.default.createElement("div", {
        key: key,
        className: "rfg-cmplx-fields"
      }, _this3.renderChildren(field, fields.length, fields.remove, fields.move, key, staticField, disabled, _this3.props.mandatory));
    }), renderAddButton()));
  };

  _proto.render = function render() {
    if (this.props && this.props.hidden && (0, _isFunction2.default)(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden) === true) {
        return null;
      }
    } else if (this.props && this.props.show && (0, _isFunction2.default)(this.props.show)) {
      if (this.context.checkCondition(this.props.show) !== true) {
        return null;
      }
    }

    return _react.default.createElement(_reactFinalFormArrays.FieldArray, {
      component: this.renderComplex,
      name: this.props.name,
      collapsed: this.state.collapsed,
      subscription: this.props.subscription || {
        values: true,
        valid: true,
        invalid: true,
        length: true
      }
    });
  };

  return Complex;
}(_react.default.Component);

Complex.defaultProps = {
  row: false,
  mandatory: false,
  multiple: true
};
Complex.contextTypes = {
  checkCondition: _propTypes.default.func,
  isStatic: _propTypes.default.bool
};
var _default = Complex;
exports.default = _default;
module.exports = exports["default"];