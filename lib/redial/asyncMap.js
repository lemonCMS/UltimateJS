exports.__esModule = true;
exports.default = void 0;

let _default = function _default(arr, mapper) {
  let q = Promise.resolve();
  return Promise.all(
    arr.map(v => {
      q = q.then(() => mapper(v));
      return q;
    }),
  );
};

exports.default = _default;
module.exports = exports.default;
