"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = clientMiddleware;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

function clientMiddleware(helpers) {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action((0, _extends2.default)({
            dispatch: dispatch
          }, helpers));
        }

        var promise = action.promise,
            types = action.types,
            rest = (0, _objectWithoutPropertiesLoose2.default)(action, ["promise", "types"]);

        if (!promise) {
          return next(action);
        }

        var REQUEST = types[0],
            SUCCESS = types[1],
            FAILURE = types[2];
        next((0, _extends2.default)({}, rest, {
          type: REQUEST
        }));
        var actionPromise = promise(helpers, dispatch);
        actionPromise.then(function (result) {
          return next((0, _extends2.default)({}, rest, {
            result: result,
            type: SUCCESS
          }));
        }, function (error) {
          return next((0, _extends2.default)({}, rest, {
            error: error,
            type: FAILURE
          }));
        }).catch(function (error) {
          console.error('MIDDLEWARE ERROR:', error);
          next((0, _extends2.default)({}, rest, {
            error: error,
            type: FAILURE
          }));
        });
        return actionPromise;
      };
    };
  };
}

module.exports = exports["default"];