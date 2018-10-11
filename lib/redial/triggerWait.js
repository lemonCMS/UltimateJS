let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _asyncMap = _interopRequireDefault(require('./asyncMap'));

let _trigger = _interopRequireDefault(require('./trigger'));

let _default = function _default(name, components, locals) {
  return (0, _asyncMap.default)(components, component =>
    (0, _trigger.default)(name, component, locals),
  );
};

exports.default = _default;
module.exports = exports.default;
