import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _map from 'lodash/map';

var PersistComponent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PersistComponent, _React$Component);

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
        _map(modules, function (module, key) {
          if (typeof key === 'string' && typeof module === 'function') {
            var newState = _get(state, key);

            var result = module(newState, _get(_this2.lastState, key, null));

            if (_this2.lastState[key] !== result) {
              _this2.props.storage.setItem(key, JSON.stringify(result));

              _this2.lastState[key] = JSON.parse(JSON.stringify(result));
            }
          } else if (typeof key === 'string' && typeof module !== 'function') {
            var _newState = _get(state, key);

            if (_this2.lastState[key] !== _newState) {
              _this2.props.storage.setItem(key, JSON.stringify(_newState));

              _this2.lastState[key] = JSON.parse(JSON.stringify(_newState));
            }
          } else {
            var _newState2 = _get(state, module);

            if (_this2.lastState[module] !== _newState2) {
              _this2.props.storage.setItem(module, JSON.stringify(_newState2));

              _this2.lastState[module] = JSON.parse(JSON.stringify(_newState2));
            }
          }
        });
      }
    });

    _map(modules, function (module, key) {
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
}(React.Component);

PersistComponent.contextTypes = {
  store: PropTypes.object
};
PersistComponent.defaultProps = {};
export default PersistComponent;