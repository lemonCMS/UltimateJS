"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _prepare = _interopRequireDefault(require("./prepare"));

var PersistComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PersistComponent, _React$Component);

  function PersistComponent() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.lastState = {};
    _this.restored = false;
    _this.state = {
      mounted: false
    };
    _this.append = _this.append.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    var preparedModules = (0, _prepare.default)(modules);
    this.context.store.subscribe(function () {
      var state = _this3.context.store.getState();

      if (_this3.restored === true) {
        (0, _map2.default)(preparedModules, function (module, key) {
          var newState = (0, _get2.default)(state, key);
          _this3.lastState[key] = module.save(newState, _this3.lastState[key], storage);
        });
      }
    });
    (0, _map2.default)(preparedModules, function (module, key) {
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
}(_react.default.Component);

PersistComponent.contextTypes = {
  store: _propTypes.default.object
};
PersistComponent.defaultProps = {};
var _default = PersistComponent;
exports.default = _default;
module.exports = exports["default"];