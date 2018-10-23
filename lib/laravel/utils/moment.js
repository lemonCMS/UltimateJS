"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.setLocale = void 0;

var _moment = _interopRequireDefault(require("moment"));

var setLocale = function setLocale(locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  _moment.default.locale(locale);

  return _moment.default;
};

exports.setLocale = setLocale;
var _default = _moment.default;
exports.default = _default;