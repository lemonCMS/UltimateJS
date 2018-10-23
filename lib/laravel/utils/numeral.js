"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _numeral = _interopRequireDefault(require("numeral"));

_numeral.default.register('locale', 'nl-nl', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'mln',
    billion: 'mrd',
    trillion: 'bln'
  },
  ordinal: function ordinal(number) {
    var remainder = number % 100;
    return number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20 ? 'ste' : 'de';
  },
  currency: {
    symbol: '€ '
  }
});

_numeral.default.locale('nl-nl');

var _default = _numeral.default;
exports.default = _default;
module.exports = exports["default"];