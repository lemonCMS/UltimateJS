import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import _isFunction from 'lodash/isFunction';

var Complex =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Complex, _React$Component);

  function Complex() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.renderComplex = _this.renderComplex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.push = null;
    _this.length = 0;
    _this.renderChildren = _this.renderChildren.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
          returnButtons.push(React.createElement(Button, {
            key: 2,
            onClick: function onClick() {
              return move(complexIndex, complexIndex - 1);
            },
            bsStyle: _get(_this2.props.moveBtn, 'bsStyle', 'default'),
            bsSize: _get(_this2.props.moveBtn, 'bsSize', undefined),
            disabled: disabled,
            type: "button"
          }, React.createElement("i", {
            className: "fa fa-chevron-up"
          })));
        }

        if (count > 1 && complexIndex < count - 1) {
          returnButtons.push(React.createElement(Button, {
            key: 3,
            onClick: function onClick() {
              return move(complexIndex, complexIndex + 1);
            },
            bsStyle: _get(_this2.props.moveBtn, 'bsStyle', 'default'),
            bsSize: _get(_this2.props.moveBtn, 'bsSize', undefined),
            disabled: disabled,
            type: "button"
          }, React.createElement("i", {
            className: "fa fa-chevron-down"
          })));
        }

        if (_this2.props.mandatory && count > 1 || !_this2.props.mandatory && count > 0) {
          returnButtons.push(React.createElement(Button, {
            key: 1,
            onClick: function onClick() {
              return remove(complexIndex);
            },
            bsStyle: _get(_this2.props.removeBtn, 'bsStyle', 'danger'),
            bsSize: _get(_this2.props.removeBtn, 'bsSize', undefined),
            className: _get(_this2.props.removeBtn, 'className', ''),
            title: _get(_this2.props.removeBtn, 'title', ''),
            disabled: disabled,
            type: "button"
          }, React.createElement("i", {
            className: "fa fa-trash"
          })));
        }
      }

      return returnButtons;
    };

    var _get2 = _get(this.props, 'panel', {}),
        header = _get2.header,
        footer = _get2.footer;

    var headerDiv = React.createElement("div", {
      className: "clearfix"
    }, React.createElement(ButtonToolbar, null, buttons()), header);

    var component = function component() {
      if (_this2.props.render) {
        return _this2.props.render(name);
      }

      return React.Children.map(_this2.props.children, function (child) {
        return React.cloneElement(child, {
          name: name + "." + child.props.name,
          parent: name
        });
      });
    };

    if (this.props.row) {
      return React.createElement(Row, null, React.createElement(Col, this.props.left, component()), React.createElement(Col, this.props.right, headerDiv));
    }

    return React.createElement(Panel, {
      className: "rfg-cmplx-btn-flds"
    }, React.createElement(Panel.Heading, null, headerDiv), React.createElement(Panel.Body, null, component()), footer && React.createElement(Panel.Footer, null, footer));
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
      if (_has(_this3.props, 'labelSize')) {
        return _this3.props.labelSize;
      }
    };

    var fieldSize = function fieldSize() {
      if (_has(_this3.props, 'fieldSize')) {
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
        return React.createElement(Row, {
          className: "rfg-cmplx rfg-cmplx-collapsed"
        }, React.createElement(Col, _extends({
          componentClass: ControlLabel
        }, labelSize()), React.createElement(Button, _extends({
          type: "button",
          onClick: toggle,
          bsStyle: "link"
        }, thisSize()), '+ ', this.props.label)));
      }
    }

    var disabled = false;

    if (this.props && this.props.disabled && _isFunction(this.props.disabled)) {
      disabled = this.context.checkCondition(this.props.disabled());
    }

    var renderAddButton = function renderAddButton() {
      if (_get(_this3.props, 'multiple', true) === true || fields.length === 0) {
        var bsStyle = function bsStyle() {
          if (_get(_this3.props.addBtn, 'bsStyle') && _get(_this3.props.addBtn, 'bsStyle') !== 'default') {
            return {
              bsStyle: _get(_this3.props.addBtn, 'bsStyle')
            };
          }
        };

        return React.createElement("div", {
          className: "rfg-cmplx-btn-add"
        }, staticField !== true && React.createElement(Button, _extends({
          type: "button",
          onClick: function onClick() {
            return fields.push({});
          },
          disabled: disabled
        }, thisSize(), bsStyle(), {
          className: _get(_this3.props.addBtn, 'className')
        }), _get(_this3.props.addBtn, 'label', 'toevoegen')), touched && error && React.createElement("span", null, error));
      }
    };

    return React.createElement(Row, {
      className: "rfg-cmplx rfg-cmplx-collapsed"
    }, this.props.label && React.createElement(Col, _extends({
      componentClass: ControlLabel
    }, labelSize()), React.createElement(Button, _extends({
      type: "button",
      onClick: toggle,
      bsStyle: "link"
    }, thisSize()), '- ', this.props.label)), React.createElement(Col, fieldSize(), fields.map(function (field, key) {
      return React.createElement("div", {
        key: key,
        className: "rfg-cmplx-fields"
      }, _this3.renderChildren(field, fields.length, fields.remove, fields.move, key, staticField, disabled, _this3.props.mandatory));
    }), renderAddButton()));
  };

  _proto.render = function render() {
    if (this.props && this.props.hidden && _isFunction(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden) === true) {
        return null;
      }
    } else if (this.props && this.props.show && _isFunction(this.props.show)) {
      if (this.context.checkCondition(this.props.show) !== true) {
        return null;
      }
    }

    return React.createElement(FieldArray, {
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
}(React.Component);

Complex.defaultProps = {
  row: false,
  mandatory: false,
  multiple: true
};
Complex.contextTypes = {
  checkCondition: PropTypes.func,
  isStatic: PropTypes.bool
};
export default Complex;