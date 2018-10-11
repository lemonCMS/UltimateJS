import asyncMap from '../ultimate/asyncMap';

export default ({ store, storage, modules }) => {
  const promises = [];
  (typeof modules === 'string' ? [modules] : modules).map(module => {
    promises.push(
      storage.getItem(module).then(item => {
        if (item !== null && item !== 'undefined') {
          try {
            const parsed = typeof item === 'string' ? JSON.parse(item) : item;
            store.dispatch({
              type: `@@redux-persist-component/${module}`,
              result: parsed,
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Json parse failed: ', error);
          }
        }
      }),
    );
    return null;
  });

  return asyncMap(promises, promise => promise);
};
