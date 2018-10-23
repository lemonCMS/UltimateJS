import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _clone from 'lodash/clone';
import _isEqual from 'lodash/isEqual';
import _isObject from 'lodash/isObject';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Qs from 'qs';
import { storeState } from '../redux/routeState/actions';
var myTimeout = null;
export function createAllParamsForFetch(props) {
  var pathname = _get(props, 'history.location.pathname', null);

  var params = _assign(_get(props, ['routesState', 'routes', pathname, 'form'], {}), Qs.parse(_get(props, 'history.location.search', ''), {
    ignoreQueryPrefix: true
  }));

  return _omit(params, function (value) {
    return !value;
  });
}
export default function connectToFilter(rest) {
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

    var StateConnection = (_dec = connect(function (state) {
      return {
        routesState: state.routesState
      };
    }), withRouter(_class = _dec(_class =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(StateConnection, _Component);

      function StateConnection() {
        var _this;

        _this = _Component.call(this) || this;
        _this.switchPage = _this.switchPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.pushOnState = _this.pushOnState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.pushStateAttempt = _this.pushStateAttempt.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.pushSearch = _this.pushSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.mergeState = _this.mergeState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.clearTimer = _this.clearTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.getParams = _this.getParams.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.toggleOnStack = _this.toggleOnStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.inputOnStack = _this.inputOnStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onStack = _this.onStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.sortOnStack = _this.sortOnStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.removeFromState = _this.removeFromState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.alphabet = _this.alphabet.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.alphaFilter = _this.alphaFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.reset = _this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          form: {},
          mount: {}
        };
        return _this;
      }

      var _proto = StateConnection.prototype;

      _proto.stringifyFullState = function stringifyFullState(state) {
        return Qs.stringify(_omit(state, function (value) {
          return !value;
        }), {
          encode: false
        });
      };

      _proto.componentDidMount = function componentDidMount() {
        var params = createAllParamsForFetch(this.props);
        this.setState({
          form: _clone(params),
          mount: _clone(params)
        });
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.match.path === prevProps.match.path) {
          if (!_isEqual(this.state, prevProps.history.location.state)) {
            if (_isObject(nextProps.history.location.state)) {
              this.props.dispatch(storeState(nextProps.history.location.pathname, nextProps.history.location.state));
              this.setState({
                form: nextProps.history.location.state
              });
            } else if (!_isEmpty(this.state.mount) && !_isEqual(this.state.mount, this.state.form)) {
              this.props.dispatch(storeState(this.props.history.location.pathname, this.state.mount));
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

        if (_has(state, 'sort')) {
          if (_get(state, 'sort.field') === field && _get(state, 'sort.order') === 'asc') {
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
          _map(clear, function (field) {
            state[field] = undefined;
          });
        }

        this.setState({
          form: state
        }, this.pushStateAttempt);
      };

      _proto.pushStateAttempt = function pushStateAttempt() {
        if (path === null) {
          path = _get(this.props.history, 'location.pathname');
        }

        this.props.dispatch(storeState(path, this.state.form));
        var q = this.stringifyFullState(_omit(this.state.form, ['t']));

        if (q.length > 0) {
          this.props.history.push({
            pathname: path,
            search: Qs.stringify(_omit(this.state.form, ['t'])),
            state: this.state
          });
        } else {
          var d = new Date();
          this.props.history.push({
            pathname: path,
            search: Qs.stringify({
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
        return React.createElement("div", {
          className: "panel panel-border-tb"
        }, React.createElement("div", {
          className: "panel-heading"
        }, React.createElement("h4", {
          className: "panel-title"
        }, "Alfabet")), React.createElement("div", {
          className: "panel-body"
        }, React.createElement("div", {
          className: "filter-color-container"
        }, React.createElement("div", {
          className: "row"
        }, _map(range, function (val, key) {
          return _this3.alphaFilter(name, key, val, stack);
        })))));
      };

      _proto.alphaFilter = function alphaFilter(name, key, item, stack) {
        var _this4 = this;

        if (stack === item) {
          return React.createElement("button", {
            key: key,
            className: classNames({
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

        return React.createElement("button", {
          key: key,
          className: classNames({
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
        return React.createElement(WrappedComponent, _extends({}, this.props, {
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
    }(Component)) || _class) || _class);
    return StateConnection;
  };
}