"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

function _default(initModules) {
  var modules = typeof initModules === 'string' ? [initModules] : initModules;
  var prepared = {};

  var saveRestore = function saveRestore(key, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$save = _ref.save,
        _save = _ref$save === void 0 ? null : _ref$save,
        _ref$restore = _ref.restore,
        _restore = _ref$restore === void 0 ? null : _ref$restore;

    return {
      save: function save(state, lastState, storage) {
        var saveState = _save ? _save(state, key, storage) : state;

        if (typeof saveState !== 'undefined') {
          var stringed = JSON.stringify(saveState);

          if (stringed !== lastState) {
            storage.setItem(key, stringed);
          }
        }

        return true;
      },
      restore: function restore(_ref2) {
        var result = _ref2.result,
            dispatch = _ref2.dispatch,
            rest = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["result", "dispatch"]);

        if (_restore) {
          _restore((0, _extends2.default)({
            result: result,
            dispatch: dispatch
          }, rest));
        } else {
          dispatch({
            type: "@@redux-persist-component/" + key,
            result: result
          });
        }

        return true;
      }
    };
  };

  var moduleMapper = function moduleMapper(module, key) {
    if (typeof module === 'string') {
      prepared[module] = saveRestore(module);
    } else if (typeof module === 'function') {
      prepared[key] = saveRestore(key, {
        save: module
      });
    } else if (typeof module === 'object') {
      if (typeof module.save !== 'undefined' || typeof module.restore !== 'undefined') {
        prepared[key] = saveRestore(key, module);
      } else {
        Object.keys(module).map(function (nestedKey) {
          return moduleMapper(module[nestedKey], nestedKey);
        });
      }
    }
  };

  modules.map(function (module, key) {
    return moduleMapper(module, key);
  });
  return prepared;
}

module.exports = exports["default"];