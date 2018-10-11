let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _propNameAuth = _interopRequireDefault(require('./propNameAuth'));

let _default = function _default(name, components, locals) {
  let promises = (Array.isArray(components) ? components : [components]) // Filter out falsy components
    .filter(component => component) // Get component lifecycle hooks
    .map(component => ({
      component,
      hooks: component.default
        ? component.default[_propNameAuth.default]
        : component[_propNameAuth.default],
    })) // Filter out components that haven't been decorated
    .filter(_ref => {
      let hooks = _ref.hooks;
      return hooks;
    }) // Calculate locals if required, execute hooks and store promises
    .map(_ref2 => {
      let component = _ref2.component,
        hooks = _ref2.hooks;
      let hook = hooks[name];

      if (typeof hook !== 'function') {
        return null;
      }

      try {
        let authorized =
          typeof locals === 'function' ? hook(locals(component)) : hook(locals);
        return authorized
          ? Promise.resolve()
          : Promise.reject(new Error('not authorized'));
      } catch (err) {
        return Promise.reject(err);
      }
    });
  return Promise.all(promises);
};

exports.default = _default;
module.exports = exports.default;
