let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _asyncMap = _interopRequireDefault(require('../ultimate/asyncMap'));

let _default = function _default(_ref) {
  let store = _ref.store,
    storage = _ref.storage,
    modules = _ref.modules;
  let promises = [];
  (typeof modules === 'string' ? [modules] : modules).map(module => {
    promises.push(
      storage.getItem(module).then(item => {
        if (item !== null && item !== 'undefined') {
          try {
            let parsed = typeof item === 'string' ? JSON.parse(item) : item;
            store.dispatch({
              type: `@@redux-persist-component/${module}`,
              result: parsed,
            });
          } catch (error) {
            console.error('Json parse failed: ', error);
          }
        }
      }),
    );
    return null;
  });
  return (0, _asyncMap.default)(promises, promise => promise);
};

exports.default = _default;
module.exports = exports.default;