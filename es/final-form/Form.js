import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import _omit from 'lodash/omit';
import _isFunction from 'lodash/isFunction';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);
library.add(faChevronDown);
library.add(faChevronUp);

var onSubmit =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(values) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.warn('Implement onSubmit handler');
            console.warn(values);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var ContextWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ContextWrapper, _React$Component);

  function ContextWrapper(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.checkCondition = _this.checkCondition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getStatus = _this.getStatus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.values = {};
    return _this;
  }

  var _proto = ContextWrapper.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      checkCondition: this.checkCondition,
      isStatic: this.props.static,
      debug: this.props.debug,
      status: this.getStatus()
    };
  };

  _proto.getStatus = function getStatus() {
    var _this$props = this.props,
        dirty = _this$props.dirty,
        dirtySinceLastSubmit = _this$props.dirtySinceLastSubmit,
        error = _this$props.error,
        errors = _this$props.errors,
        invalid = _this$props.invalid,
        pristine = _this$props.pristine,
        submitError = _this$props.submitError,
        submitErrors = _this$props.submitErrors,
        submitFailed = _this$props.submitFailed,
        submitSucceeded = _this$props.submitSucceeded,
        submitting = _this$props.submitting,
        valid = _this$props.valid,
        validating = _this$props.validating;
    return {
      dirty: dirty,
      dirtySinceLastSubmit: dirtySinceLastSubmit,
      error: error,
      errors: errors,
      invalid: invalid,
      pristine: pristine,
      submitError: submitError,
      submitErrors: submitErrors,
      submitFailed: submitFailed,
      submitSucceeded: submitSucceeded,
      submitting: submitting,
      valid: valid,
      validating: validating
    };
  };

  _proto.checkCondition = function checkCondition(args) {
    return args(this.props.values);
  };

  _proto.render = function render() {
    var _this2 = this;

    if (this.props.debug) {
      return React.createElement("div", null, this.props.children, React.createElement(FormSpy, {
        subscription: {
          values: true
        }
      }, function (_ref2) {
        var values = _ref2.values;

        if (_this2.props.listen && _isFunction(_this2.props.listen)) {
          _this2.props.listen(values);
        }

        return React.createElement("pre", null, JSON.stringify(values, 0, 2));
      }));
    }

    return React.createElement(React.Fragment, null, this.props.children, this.props.listen && _isFunction(this.props.listen) && React.createElement(FormSpy, {
      subscription: {
        values: true
      },
      onChange: function onChange(props) {
        _this2.props.listen(props.values);
      }
    }));
  };

  return ContextWrapper;
}(React.Component);

ContextWrapper.childContextTypes = {
  checkCondition: PropTypes.func.isRequired,
  isStatic: PropTypes.bool.isRequired,
  debug: PropTypes.bool.isRequired,
  status: PropTypes.object.isRequired
};
ContextWrapper.defaultProps = {
  'static': false,
  debug: false
};

var FormObj =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(FormObj, _React$Component2);

  function FormObj() {
    return _React$Component2.apply(this, arguments) || this;
  }

  var _proto2 = FormObj.prototype;

  _proto2.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    switch (typeof this.props.shouldComponentUpdate) {
      case 'undefined':
        return false;

      case 'function':
        return this.props.shouldComponentUpdate();

      default:
        return this.props.shouldComponentUpdate !== nextProps.shouldComponentUpdate;
    }
  };

  _proto2.render = function render() {
    var _this3 = this;

    return React.createElement(FinalForm, {
      keepDirtyOnReinitialize: this.props.keepDirtyOnReinitialize,
      onSubmit: this.props.onSubmit || onSubmit,
      subscription: this.props.subscription,
      validate: this.props.validate || function () {
        return {};
      },
      initialValues: this.props.initialValues || {},
      mutators: _extends({}, arrayMutators),
      render: function render(_ref3) {
        var handleSubmit = _ref3.handleSubmit,
            rest = _objectWithoutPropertiesLoose(_ref3, ["handleSubmit"]);

        return React.createElement(ContextWrapper, _extends({}, _omit(_this3.props, ['onSubmit', 'validate', 'initialValues', 'subscription', 'shouldComponentUpdate']), rest), React.createElement("form", {
          onSubmit: handleSubmit,
          className: _this3.props.className
        }, _this3.props.children));
      }
    });
  };

  return FormObj;
}(React.Component);

FormObj.defaultProps = {
  debug: false,
  keepDirtyOnReinitialize: false
};
export default FormObj;