import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import _clone from 'lodash/clone';
import _isFunction from 'lodash/isFunction';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _indexOf from 'lodash/indexOf';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';

var Resourcebinder =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Resourcebinder, _React$Component);

  function Resourcebinder() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.openResource = _this.openResource.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.closeResource = _this.closeResource.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.options = _this.options.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.callBack = _this.callBack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getList = _this.getList.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      showResource: false,
      list: []
    };
    return _this;
  }

  var _proto = Resourcebinder.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.getList(this.props);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.getList(nextProps);
  };

  _proto.getList = function getList(props) {
    var field = props.field;
    var list = [];

    if (this.state.list.length === 0) {
      if (_has(field, 'list')) {
        list = field.list;
      } else if (props.field.children) {
        list = _map(_isArray(props.field.children) ? props.field.children : [props.field.children], function (option) {
          return {
            value: option.props.value,
            desc: option.props.children
          };
        });
      }
    } else {
      list = this.state.list;
    }

    this.setState({
      list: list
    });
  };

  _proto.options = function options() {
    var _this2 = this;

    var options = [];

    if (_get(this.props.field, 'multiple', true) === true) {
      options = _map(this.state.list, function (option, key) {
        if (_indexOf(_this2.props.input.value, option.value) > -1) {
          return React.createElement("p", {
            className: "form-control-static",
            key: key
          }, _indexOf(_this2.props.input.value, option.value) > -1 ? React.createElement("i", {
            className: "fa fa-check-square-o"
          }) : React.createElement("i", {
            className: "fa fa-square-o"
          }), ' ', option.desc);
        }
      });
    } else {
      options = _map(this.state.list, function (option, key) {
        if (String(_this2.props.input.value) === String(option.value)) {
          return React.createElement("p", {
            className: "form-control-static",
            key: key
          }, React.createElement("i", {
            className: "fa fa-check-square-o"
          }), ' ', option.desc);
        }
      });
    }

    return React.createElement("div", {
      className: "checkbox"
    }, options);
  };

  _proto.callBack = function callBack(values, list) {
    var _this3 = this;

    this.setState({
      list: list
    }, function () {
      if (_get(_this3.props.field, 'multiple', true) === true) {
        _this3.props.input.onChange(_uniq(values));
      } else {
        _this3.props.input.onChange(values);
      }
    });
  };

  _proto.openResource = function openResource() {
    this.setState({
      showResource: true
    });
  };

  _proto.closeResource = function closeResource() {
    this.setState({
      showResource: false
    });
  };

  _proto.render = function render() {
    var _this4 = this;

    var disabled = false;

    if (this.props.field && this.props.field.disabled && _isFunction(this.props.field.disabled)) {
      disabled = this.context.checkCondition(this.props.field.disabled());
    }

    var button = function button() {
      if (!_this4.props.field.static && !_this4.context.isStatic) {
        return React.createElement("button", {
          type: "button",
          onClick: _this4.openResource,
          disabled: disabled
        }, _get(_this4.props, 'field.buttonResource', 'open'));
      }
    };

    var clonedValues = function clonedValues() {
      if (_get(_this4.props.field, 'multiple', true) === true) {
        if (_isEmpty(_this4.props.input.value)) {
          return [];
        }

        return _clone(_this4.props.input.value);
      } else {
        return _this4.props.input.value;
      }
    };

    var resourceProps = {
      clonedValues: clonedValues(),
      clonedList: _clone(this.state.list) || _clone(this.props.field.list) || [],
      callBack: this.callBack,
      show: this.state.showResource,
      closeResource: this.closeResource,
      multiple: _get(this.props.field, 'multiple', true),
      name: _get(this.props.field, 'name')
    };
    return React.createElement("div", null, button(), this.options(), this.props.field.resource(resourceProps));
  };

  return Resourcebinder;
}(React.Component);

Resourcebinder.contextTypes = {
  checkCondition: PropTypes.func,
  isStatic: PropTypes.bool
};
export default (function (_ref) {
  var input = _ref.input,
      field = _ref.field;
  return React.createElement(Resourcebinder, {
    input: input,
    field: field
  });
});