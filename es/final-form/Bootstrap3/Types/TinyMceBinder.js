import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import TinyMceInput from './TinyMceInput';

var ContextBinder =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ContextBinder, _React$Component);

  function ContextBinder() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ContextBinder.prototype;

  _proto.render = function render() {
    if (this.context.isStatic || this.props.field.static) {
      return React.createElement("div", {
        className: 'rte-readonly',
        dangerouslySetInnerHTML: {
          __html: this.props.input.value
        }
      });
    }

    return React.createElement(TinyMceInput, _extends({
      readOnly: true
    }, this.props.input, {
      className: this.props.field.className,
      tinymceConfig: Object.assign({}, this.props.field.config)
    }));
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