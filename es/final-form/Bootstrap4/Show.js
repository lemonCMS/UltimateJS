import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import _isFunction from 'lodash/isFunction';
import _get from 'lodash/get';

var Show =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Show, _React$Component);

  function Show() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Show.prototype;

  _proto.render = function render() {
    if (this.props.hidden && _isFunction(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden, _get(this.props, 'parent')) === true) {
        return null;
      }
    } else if (this.props.show && _isFunction(this.props.show)) {
      if (this.context.checkCondition(this.props.show, _get(this.props, 'parent')) !== true) {
        return null;
      }
    }

    return this.props.children;
  };

  return Show;
}(React.Component);

Show.defaultProps = {};
Show.contextTypes = {
  checkCondition: PropTypes.func.isRequired,
  isStatic: PropTypes.bool.isRequired
};
export default Show;