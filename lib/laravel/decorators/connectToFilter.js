"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createAllParamsForFetch = createAllParamsForFetch;
exports.default = connectToFilter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _classnames = _interopRequireDefault(require("classnames"));

var _qs = _interopRequireDefault(require("qs"));

var _actions = require("../redux/routeState/actions");

var myTimeout = null;

function createAllParamsForFetch(props) {
  var pathname = (0, _get2.default)(props, 'history.location.pathname', null);
  var params = (0, _assign2.default)((0, _get2.default)(state, ['routesState', 'routes', pathname, 'form'], {}), _qs.default.parse((0, _get2.default)(props, 'history.location.search', ''), {
    ignoreQueryPrefix: true
  }));
  return (0, _omit2.default)(params, function (value) {
    return !value;
  });
}

function connectToFilter(rest) {
  var path = null;

  if (rest !== 'undefined') {
    if (typeof rest === 'object') {
      if (rest.path !== 'undefined') {
        path = rest.path;
      }
    }
  }

  return function (WrappedComponent) {
    var _dec, _class;

    var StateConnection = (_dec = (0, _reactRedux.connect)(function (state) {
      return {
        routesState: state.routesState
      };
    }), (0, _reactRouter.withRouter)(_class = _dec(_class =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(StateConnection, _Component);

      function StateConnection() {
        var _this;

        _this = _Component.call(this) || this;
        _this.switchPage = _this.switchPage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.pushOnState = _this.pushOnState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.pushStateAttempt = _this.pushStateAttempt.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.pushSearch = _this.pushSearch.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.mergeState = _this.mergeState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.clearTimer = _this.clearTimer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.getParams = _this.getParams.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.toggleOnStack = _this.toggleOnStack.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.inputOnStack = _this.inputOnStack.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.onStack = _this.onStack.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.sortOnStack = _this.sortOnStack.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.removeFromState = _this.removeFromState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.alphabet = _this.alphabet.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.alphaFilter = _this.alphaFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.reset = _this.reset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.state = {
          form: {},
          mount: {}
        };
        return _this;
      }

      var _proto = StateConnection.prototype;

      _proto.stringifyFullState = function stringifyFullState(state) {
        return _qs.default.stringify((0, _omit2.default)(state, function (value) {
          return !value;
        }), {
          encode: false
        });
      };

      _proto.componentWillMount = function componentWillMount() {
        var params = createAllParamsForFetch(this.props);
        this.setState({
          form: (0, _clone2.default)(params),
          mount: (0, _clone2.default)(params)
        });
      };

      StateConnection.getDerivedStateFromProps = function getDerivedStateFromProps() {};

      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.match.path === prevProps.match.path) {
          if (!(0, _isEqual2.default)(this.state, prevProps.history.location.state)) {
            if ((0, _isObject2.default)(nextProps.history.location.state)) {
              this.props.dispatch((0, _actions.storeState)(nextProps.history.location.pathname, nextProps.history.location.state));
              this.setState({
                form: nextProps.history.location.state
              });
            } else if (!(0, _isEmpty2.default)(this.state.mount) && !(0, _isEqual2.default)(this.state.mount, this.state.form)) {
              this.props.dispatch((0, _actions.storeState)(this.props.history.location.pathname, this.state.mount));
              this.setState({
                form: this.state.mount
              });
            }
          }
        }
      };

      _proto.reset = function reset() {
        this.setState({
          form: {}
        }, this.pushStateAttempt);
      };

      _proto.onStack = function onStack(key, value) {
        return !!this.state.form[key] && this.state.form[key].indexOf(String(value)) > -1;
      };

      _proto.getParams = function getParams() {
        return createAllParamsForFetch(this.props);
      };

      _proto.inputOnStack = function inputOnStack(key) {
        return this.state.form[key] ? this.state.form[key] : '';
      };

      _proto.sortOnStack = function sortOnStack(field) {
        var state = Object.assign({}, this.state.form);

        if ((0, _has2.default)(state, 'sort')) {
          if ((0, _get2.default)(state, 'sort.field') === field && (0, _get2.default)(state, 'sort.order') === 'asc') {
            state.sort = {
              field: field,
              order: 'desc'
            };
          } else {
            state.sort = {
              field: field,
              order: 'asc'
            };
          }
        } else {
          state.sort = {
            field: field,
            order: 'asc'
          };
        }

        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.toggleOnStack = function toggleOnStack(key, value) {
        var state = Object.assign({}, this.state.form);

        if (!state[key]) {
          state[key] = [value];
        } else {
          var index = state[key].indexOf(String(value));

          if (index < 0) {
            state[key].push(value);
          } else {
            delete state[key][index];
          }
        }

        if (state.page) {
          state.page = null;
        }

        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.removeFromState = function removeFromState(key) {
        var state = Object.assign({}, this.state.form);
        delete state[key];
        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.mergeState = function mergeState(values) {
        var state = Object.assign({}, this.state.form, values);
        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.pushOnState = function pushOnState(key, value, clear) {
        if (clear === void 0) {
          clear = [];
        }

        var state = Object.assign({}, this.state.form);
        state[key] = value;

        if (state.page) {
          state.page = null;
        }

        if (Object.keys(clear).length > 0) {
          (0, _map2.default)(clear, function (field) {
            state[field] = undefined;
          });
        }

        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.pushStateAttempt = function pushStateAttempt() {
        if (path === null) {
          path = (0, _get2.default)(this.props.history, 'location.pathname');
        }

        this.props.dispatch((0, _actions.storeState)(path, this.state.form));
        var q = this.stringifyFullState((0, _omit2.default)(this.state.form, ['t']));

        if (q.length > 0) {
          this.props.history.push({
            pathname: path,
            search: _qs.default.stringify((0, _omit2.default)(this.state.form, ['t'])),
            state: this.state
          });
        } else {
          var d = new Date();
          this.props.history.push({
            pathname: path,
            search: _qs.default.stringify({
              t: d.getTime()
            }),
            state: this.state
          });
        }
      };

      _proto.switchPage = function switchPage(page) {
        var state = Object.assign({}, this.state.form);
        state.page = page;
        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.pushSearch = function pushSearch(value) {
        var _this2 = this;

        var form = this.state.form;
        form.q = value;
        this.setState({
          form: form
        }, function () {
          if (myTimeout) {
            clearTimeout(myTimeout);
          }

          myTimeout = setTimeout(function () {
            _this2.pushOnState('q', value);
          }, 500);
        });
      };

      _proto.clearTimer = function clearTimer() {
        if (myTimeout) {
          clearTimeout(myTimeout);
        }
      };

      _proto.alphabet = function alphabet() {
        var _this3 = this;

        var stack = this.inputOnStack('alfa');
        var name = 'alfa';
        var range = ['~', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        return _react.default.createElement("div", {
          className: "panel panel-border-tb"
        }, _react.default.createElement("div", {
          className: "panel-heading"
        }, _react.default.createElement("h4", {
          className: "panel-title"
        }, "Alfabet")), _react.default.createElement("div", {
          className: "panel-body"
        }, _react.default.createElement("div", {
          className: "filter-color-container"
        }, _react.default.createElement("div", {
          className: "row"
        }, (0, _map2.default)(range, function (val, key) {
          return _this3.alphaFilter(name, key, val, stack);
        })))));
      };

      _proto.alphaFilter = function alphaFilter(name, key, item, stack) {
        var _this4 = this;

        if (stack === item) {
          return _react.default.createElement("button", {
            key: key,
            className: (0, _classnames.default)({
              btn: true,
              'btn-link': true,
              'filter-size-box': true,
              active: stack === item
            }),
            onClick: function onClick() {
              _this4.removeFromState(name, item);
            }
          }, item);
        }

        return _react.default.createElement("button", {
          key: key,
          className: (0, _classnames.default)({
            btn: true,
            'btn-link': true,
            'filter-size-box': true,
            active: stack === item
          }),
          onClick: function onClick() {
            _this4.pushOnState(name, item);
          }
        }, item);
      };

      _proto.render = function render() {
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.props, {
          switchPage: this.switchPage,
          pushOnState: this.pushOnState,
          removeFromState: this.removeFromState,
          getParams: this.getParams,
          toggleOnStack: this.toggleOnStack,
          inputOnStack: this.inputOnStack,
          onStack: this.onStack,
          sortOnStack: this.sortOnStack,
          alphabet: this.alphabet,
          pushSearch: this.pushSearch,
          pushStateAttempt: this.pushStateAttempt,
          mergeState: this.mergeState,
          reset: this.reset
        }));
      };

      return StateConnection;
    }(_react.Component)) || _class) || _class);
    return StateConnection;
  };
}