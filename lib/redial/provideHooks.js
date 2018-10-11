let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _propName = _interopRequireDefault(require('./propName'));

let _propNameAuth = _interopRequireDefault(require('./propNameAuth'));

let _default = function _default(hooks) {
  return function(ComposedComponent) {
    if (hooks.authorized !== 'undefined') {
      let authHooks = {};
      authHooks.authorized = hooks.authorized;
      ComposedComponent[_propNameAuth.default] = authHooks;
      delete hooks.authorized;
    }

    if (Object.keys(hooks).length > 0) {
      ComposedComponent[_propName.default] = hooks;
    }

    return ComposedComponent;
  };
};

exports.default = _default;
module.exports = exports.default;
