import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

let Ultimate =
  /* #__PURE__ */
  (function(_Component) {
    _inheritsLoose(Ultimate, _Component);

    function Ultimate() {
      return _Component.apply(this, arguments) || this;
    }

    let _proto = Ultimate.prototype;

    _proto.render = function render() {
      return React.createElement('div', null, renderRoutes(this.props.routes));
    };

    return Ultimate;
  })(Component);

Ultimate.defaultProps = {};
export default Ultimate;
