/* eslint no-return-assign: "error" */
import _map from 'lodash/map';
import prepare from './prepare';

const asyncMap = (arr, mapper) => {
  let q = Promise.resolve();
  return Promise.all(arr.map(v => (q = q.then(() => mapper(v)))));
};

export default ({ store, storage, modules }) => {
  const preparedModules = prepare(modules);
  const promises = [];

  _map(preparedModules, (module, key) => {
    promises.push(
      storage.getItem(key).then(item => {
        if (item !== null && item !== 'undefined') {
          try {
            const result = typeof item === 'string' ? JSON.parse(item) : item;
            module.restore({
              dispatch: store.dispatch,
              result,
              key,
              currentState: {},
            });
          } catch (e) {
            console.log('Json parse failed', e);
          }
        }
      }),
    );
  });

  return asyncMap(promises, promise => promise);
};
