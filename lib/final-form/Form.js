"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _finalFormArrays = _interopRequireDefault(require("final-form-arrays"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faTrash);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faChevronDown);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faChevronUp);

var onSubmit =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(values) {
    return _regenerator.default.wrap(function _callee$(_context) {
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
  (0, _inheritsLoose2.default)(ContextWrapper, _React$Component);

  function ContextWrapper(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.checkCondition = _this.checkCondition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getStatus = _this.getStatus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
      return _react.default.createElement("div", null, this.props.children, _react.default.createElement(_reactFinalForm.FormSpy, {
        subscription: {
          values: true
        }
      }, function (_ref2) {
        var values = _ref2.values;

        if (_this2.props.listen && (0, _isFunction2.default)(_this2.props.listen)) {
          _this2.props.listen(values);
        }

        return _react.default.createElement("pre", null, JSON.stringify(values, 0, 2));
      }));
    }

    return _react.default.createElement(_react.default.Fragment, null, this.props.children, this.props.listen && (0, _isFunction2.default)(this.props.listen) && _react.default.createElement(_reactFinalForm.FormSpy, {
      subscription: {
        values: true
      },
      onChange: function onChange(props) {
        _this2.props.listen(props.values);
      }
    }));
  };

  return ContextWrapper;
}(_react.default.Component);

ContextWrapper.childContextTypes = {
  checkCondition: _propTypes.default.func.isRequired,
  isStatic: _propTypes.default.bool.isRequired,
  debug: _propTypes.default.bool.isRequired,
  status: _propTypes.default.object.isRequired
};
ContextWrapper.defaultProps = {
  'static': false,
  debug: false
};

var FormObj =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inheritsLoose2.default)(FormObj, _React$Component2);

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

    return _react.default.createElement(_reactFinalForm.Form, {
      keepDirtyOnReinitialize: this.props.keepDirtyOnReinitialize,
      onSubmit: this.props.onSubmit || onSubmit,
      subscription: this.props.subscription,
      validate: this.props.validate || function () {
        return {};
      },
      initialValues: this.props.initialValues || {},
      mutators: (0, _extends2.default)({}, _finalFormArrays.default),
      render: function render(_ref3) {
        var handleSubmit = _ref3.handleSubmit,
            rest = (0, _objectWithoutPropertiesLoose2.default)(_ref3, ["handleSubmit"]);
        return _react.default.createElement(ContextWrapper, (0, _extends2.default)({}, (0, _omit2.default)(_this3.props, ['onSubmit', 'validate', 'initialValues', 'subscription', 'shouldComponentUpdate']), rest), _react.default.createElement("form", {
          onSubmit: handleSubmit,
          className: _this3.props.className
        }, _this3.props.children));
      }
    });
  };

  return FormObj;
}(_react.default.Component);

FormObj.defaultProps = {
  debug: false,
  keepDirtyOnReinitialize: false
};
var _default = FormObj;
exports.default = _default;
module.exports = exports["default"];