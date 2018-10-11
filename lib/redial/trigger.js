let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _propName = _interopRequireDefault(require('./propName'));

let _default = function _default(name, components, locals) {
  let promises = (Array.isArray(components) ? components : [components]) // Filter out falsy components
    .filter(component => component) // Get component lifecycle hooks
    .map(component => ({
      component,
      hooks: component.default
        ? component.default[_propName.default]
        : component[_propName.default],
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
        return typeof locals === 'function'
          ? hook(locals(component))
          : hook(locals);
      } catch (err) {
        return Promise.reject(err);
      }
    });
  return Promise.all(promises);
};

exports.default = _default;
module.exports = exports.default;
