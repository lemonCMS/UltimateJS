"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = function _default(arr, mapper) {
  var q = Promise.resolve();
  return Promise.all(arr.map(function (v) {
    q = q.then(function () {
      return mapper(v);
    });
    return q;
  }));
};

exports.default = _default;
module.exports = exports["default"];