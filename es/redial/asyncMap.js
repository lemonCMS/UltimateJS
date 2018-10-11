export default (function (arr, mapper) {
  var q = Promise.resolve();
  return Promise.all(arr.map(function (v) {
    q = q.then(function () {
      return mapper(v);
    });
    return q;
  }));
});