"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _asyncMap = _interopRequireDefault(require("../ultimate/asyncMap"));

var _default = function _default(_ref) {
  var store = _ref.store,
      storage = _ref.storage,
      modules = _ref.modules;
  var promises = [];
  (typeof modules === 'string' ? [modules] : modules).map(function (module) {
    promises.push(storage.getItem(module).then(function (item) {
      if (item !== null && item !== 'undefined') {
        try {
          var parsed = typeof item === 'string' ? JSON.parse(item) : item;
          store.dispatch({
            type: "@@redux-persist-component/" + module,
            result: parsed
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Json parse failed: ', error);
        }
      }
    }));
    return null;
  });
  return (0, _asyncMap.default)(promises, function (promise) {
    return promise;
  });
};

exports.default = _default;
module.exports = exports["default"];