"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _prepare = _interopRequireDefault(require("./prepare"));

/* eslint no-return-assign: "error" */
var asyncMap = function asyncMap(arr, mapper) {
  var q = Promise.resolve();
  return Promise.all(arr.map(function (v) {
    return q = q.then(function () {
      return mapper(v);
    });
  }));
};

var _default = function _default(_ref) {
  var store = _ref.store,
      storage = _ref.storage,
      modules = _ref.modules;
  var preparedModules = (0, _prepare.default)(modules);
  var promises = [];
  (0, _map2.default)(preparedModules, function (module, key) {
    promises.push(storage.getItem(key).then(function (item) {
      if (item !== null && item !== 'undefined') {
        try {
          var result = typeof item === 'string' ? JSON.parse(item) : item;
          module.restore({
            dispatch: store.dispatch,
            result: result,
            key: key,
            currentState: {}
          });
        } catch (e) {
          console.log('Json parse failed', e);
        }
      }
    }));
  });
  return asyncMap(promises, function (promise) {
    return promise;
  });
};

exports.default = _default;
module.exports = exports["default"];