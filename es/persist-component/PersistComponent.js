import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _map from 'lodash/map';

let PersistComponent =
  /* #__PURE__ */
  (function(_React$Component) {
    _inheritsLoose(PersistComponent, _React$Component);

    function PersistComponent() {
      let _this;

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call(...[this].concat(args)) || this;
      _this.lastState = {};
      _this.restored = false;
      return _this;
    }

    let _proto = PersistComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      let _this2 = this;

      let modules =
        typeof this.props.modules === 'string'
          ? [this.props.modules]
          : this.props.modules;
      this.context.store.subscribe(() => {
        let state = _this2.context.store.getState();

        if (_this2.restored === true) {
          _map(modules, (module, key) => {
            if (typeof key === 'string' && typeof module === 'function') {
              let newState = _get(state, key);

              let result = module(newState, _get(_this2.lastState, key, null));

              if (_this2.lastState[key] !== result) {
                _this2.props.storage.setItem(key, JSON.stringify(result));

                _this2.lastState[key] = JSON.parse(JSON.stringify(result));
              }
            } else if (
              typeof key === 'string' &&
              typeof module !== 'function'
            ) {
              let _newState = _get(state, key);

              if (_this2.lastState[key] !== _newState) {
                _this2.props.storage.setItem(key, JSON.stringify(_newState));

                _this2.lastState[key] = JSON.parse(JSON.stringify(_newState));
              }
            } else {
              let _newState2 = _get(state, module);

              if (_this2.lastState[module] !== _newState2) {
                _this2.props.storage.setItem(
                  module,
                  JSON.stringify(_newState2),
                );

                _this2.lastState[module] = JSON.parse(
                  JSON.stringify(_newState2),
                );
              }
            }
          });
        }
      });

      _map(modules, (module, key) => {
        let moduleName;

        if (typeof key === 'string') {
          moduleName = key;
        } else {
          moduleName = module;
        }

        let promise = [];
        promise.push(
          _this2.props.storage.getItem(moduleName).then(item => {
            if (item !== null && item !== 'undefined') {
              let parsed = typeof item === 'string' ? JSON.parse(item) : item;

              _this2.context.store.dispatch({
                type: `@@redux-persist-component/${moduleName}`,
                result: parsed,
              });
            }
          }),
        );
        Promise.all(promise).then(() => {
          _this2.restored = true;
        });
      });
    };

    _proto.render = function render() {
      return this.props.children;
    };

    return PersistComponent;
  })(React.Component);

PersistComponent.contextTypes = {
  store: PropTypes.object,
};
PersistComponent.defaultProps = {};
export default PersistComponent;
