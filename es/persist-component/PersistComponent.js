import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _map from 'lodash/map';
import prepare from './prepare';

var PersistComponent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PersistComponent, _React$Component);

  function PersistComponent() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.lastState = {};
    _this.restored = false;
    _this.state = {
      mounted: false
    };
    _this.append = _this.append.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = PersistComponent.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.state.mounted === false) {
      this.setState({
        mounted: true
      }, function () {
        return _this2.append(_this2.props);
      });
    }
  };

  _proto.append = function append(props) {
    var _this3 = this;

    var storage = props.storage,
        modules = props.modules;
    var preparedModules = prepare(modules);
    this.context.store.subscribe(function () {
      var state = _this3.context.store.getState();

      if (_this3.restored === true) {
        _map(preparedModules, function (module, key) {
          var newState = _get(state, key);

          _this3.lastState[key] = module.save(newState, _this3.lastState[key], storage);
        });
      }
    });

    _map(preparedModules, function (module, key) {
      var promise = [];
      promise.push(_this3.props.storage.getItem(key).then(function (item) {
        if (item !== null && item !== 'undefined') {
          try {
            var result = typeof item === 'string' ? JSON.parse(item) : item;

            var state = _this3.context.store.getState();

            if (state[key] && JSON.stringify(state[key]) !== item) {
              module.restore({
                dispatch: _this3.context.store.dispatch,
                result: result,
                currentState: state[key],
                key: key
              });
            }
          } catch (e) {
            console.log('Json parse failed', e);
          }
        }
      }));
      Promise.all(promise).then(function () {
        _this3.restored = true;
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