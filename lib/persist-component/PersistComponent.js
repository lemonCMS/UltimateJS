"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var PersistComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PersistComponent, _React$Component);

  function PersistComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.lastState = {};
    _this.restored = false;
    return _this;
  }

  var _proto = PersistComponent.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var modules = typeof this.props.modules === 'string' ? [this.props.modules] : this.props.modules;
    this.context.store.subscribe(function () {
      var state = _this2.context.store.getState();

      if (_this2.restored === true) {
        (0, _map2.default)(modules, function (module, key) {
          if (typeof key === 'string' && typeof module === 'function') {
            var newState = (0, _get2.default)(state, key);
            var result = module(newState, (0, _get2.default)(_this2.lastState, key, null));

            if (_this2.lastState[key] !== result) {
              _this2.props.storage.setItem(key, JSON.stringify(result));

              _this2.lastState[key] = JSON.parse(JSON.stringify(result));
            }
          } else if (typeof key === 'string' && typeof module !== 'function') {
            var _newState = (0, _get2.default)(state, key);

            if (_this2.lastState[key] !== _newState) {
              _this2.props.storage.setItem(key, JSON.stringify(_newState));

              _this2.lastState[key] = JSON.parse(JSON.stringify(_newState));
            }
          } else {
            var _newState2 = (0, _get2.default)(state, module);

            if (_this2.lastState[module] !== _newState2) {
              _this2.props.storage.setItem(module, JSON.stringify(_newState2));

              _this2.lastState[module] = JSON.parse(JSON.stringify(_newState2));
            }
          }
        });
      }
    });
    (0, _map2.default)(modules, function (module, key) {
      var moduleName;

      if (typeof key === 'string') {
        moduleName = key;
      } else {
        moduleName = module;
      }

      var promise = [];
      promise.push(_this2.props.storage.getItem(moduleName).then(function (item) {
        if (item !== null && item !== 'undefined') {
          var parsed = typeof item === 'string' ? JSON.parse(item) : item;

          _this2.context.store.dispatch({
            type: "@@redux-persist-component/" + moduleName,
            result: parsed
          });
        }
      }));
      Promise.all(promise).then(function () {
        _this2.restored = true;
      });
    });
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return PersistComponent;
}(_react.default.Component);

PersistComponent.contextTypes = {
  store: _propTypes.default.object
};
PersistComponent.defaultProps = {};
var _default = PersistComponent;
exports.default = _default;
module.exports = exports["default"];