export default (function(arr, mapper) {
  let q = Promise.resolve();
  return Promise.all(
    arr.map(v => {
      q = q.then(() => mapper(v));
      return q;
    }),
  );
});
