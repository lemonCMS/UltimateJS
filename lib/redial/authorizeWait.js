let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _asyncMap = _interopRequireDefault(require('./asyncMap'));

let _authorize = _interopRequireDefault(require('./authorize'));

let _default = function _default(name, components, locals) {
  return (0, _asyncMap.default)(components, component =>
    (0, _authorize.default)(name, component, locals),
  );
};

exports.default = _default;
module.exports = exports.default;
