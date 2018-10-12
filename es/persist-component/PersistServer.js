/* eslint no-return-assign: "error" */
import _map from 'lodash/map';
import prepare from './prepare';

var asyncMap = function asyncMap(arr, mapper) {
  var q = Promise.resolve();
  return Promise.all(arr.map(function (v) {
    return q = q.then(function () {
      return mapper(v);
    });
  }));
};

export default (function (_ref) {
  var store = _ref.store,
      storage = _ref.storage,
      modules = _ref.modules;
  var preparedModules = prepare(modules);
  var promises = [];

  _map(preparedModules, function (module, key) {
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
});