import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Component } from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _flatten from 'lodash/flatten';
import _compact from 'lodash/compact';
import _cloneDeep from 'lodash/cloneDeep';
import _isFunction from 'lodash/isFunction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { provideHooks } from '@wicked_query/redial';
import { load, clearItem, destroyItem } from '../redux/store/actions';
import DataTable from '../components/DataTable';
import connectToFilter, { createAllParamsForFetch } from './connectToFilter';
import connectToConfirm from './connectToConfirm';
import Search from '../components/Search';
import Pending from '../components/Pending';
export default function connnectToList(properties) {
  return function (WrappedComponent) {
    var _dec, _dec2, _dec3, _dec4, _dec5, _class;

    var Connection = (_dec = provideHooks({
      fetch: function fetch(_ref) {
        var _ref$store = _ref.store,
            dispatch = _ref$store.dispatch,
            getState = _ref$store.getState,
            params = _ref.params,
            location = _ref.location;
        var promises = [];
        var state = createAllParamsForFetch(getState(), location);

        var api = function api() {
          if (_isFunction(properties.api)) {
            return properties.api(params);
          }

          return properties.api;
        };

        promises.push(dispatch(load(properties.key, api(), state)));
        return Promise.all(promises);
      }
    }), _dec2 = withRouter(), _dec3 = connectToFilter(), _dec4 = connectToConfirm(), _dec5 = connect(function (state) {
      return {
        data: state.store[properties.key],
        auth: state.auth
      };
    }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(Connection, _Component);

      function Connection() {
        var _this;

        _this = _Component.call(this) || this;
        _this.filter = _this.filter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.show = _this.show.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.edit = _this.edit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.destroy = _this.destroy.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.path = _this.path.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          forceUpdate: false,
          path: ''
        };
        return _this;
      }

      var _proto = Connection.prototype;

      _proto.path = function path() {
        var path = properties.path;

        if (_isFunction(properties.path)) {
          path = properties.path(this.props.match.params);
        }

        this.setState({
          path: path
        });
      };

      _proto.componentWillMount = function componentWillMount() {
        this.path();
      };

      _proto.componentWillReceiveProps = function componentWillReceiveProps() {
        this.path();
      };

      _proto.componentWillUpdate = function componentWillUpdate(nextProps) {
        if (_get(nextProps, ['data', 'item', 'deleted'], false) === true) {
          this.props.dispatch(clearItem(properties.key));
          this.props.pushStateAttempt();
        }
      };

      _proto.filter = function filter() {
        return React.createElement("div", {
          className: "panel panel-border-tb"
        }, React.createElement("div", {
          className: "panel-heading"
        }, React.createElement(Link, {
          to: properties.path + "/new",
          className: "pull-right"
        }, React.createElement("i", {
          className: "fa fa-plus"
        }), " nieuw item aanmaken"), React.createElement("h4", {
          className: "panel-title"
        }, "Verfijn")), React.createElement("div", {
          className: "panel-body"
        }, React.createElement(Search, {
          pushSearch: this.props.pushSearch,
          inputOnStack: this.props.inputOnStack,
          query: this.props.inputOnStack('q')
        })));
      };

      _proto.show = function show(item) {
        this.props.history.push(this.state.path + "/" + item.id);
      };

      _proto.edit = function edit(item) {
        this.props.history.push(this.state.path + "/" + item.id + "/edit");
      };

      _proto.destroy = function destroy(item) {
        this.props.dispatch(destroyItem(properties.key, "" + properties.api, item.id));
      };

      _proto.render = function render() {
        var _this2 = this;

        var dropDown = {};

        if (!properties.noDropDown) {
          dropDown.name = 'Acties';

          if (!properties.noEdit) {
            dropDown.dropdownButton = [{
              name: 'bekijken',
              onClick: this.show
            }, {
              name: 'wijzigen',
              onClick: this.edit
            }];
          }

          if (!properties.noDelete) {
            if (!dropDown.dropdownButton) {
              dropDown.dropdownButton = [];
            }

            dropDown.dropdownButton.push({
              divider: true
            });
            dropDown.dropdownButton.push({
              name: 'verwijderen',
              onClick: function onClick(item) {
                _this2.setState({
                  forceUpdate: true
                }, function () {
                  _this2.props.showModal(item, _this2.destroy);
                });
              }
            });
          }
        }

        var rows = _cloneDeep(_has(properties, 'rows') ? properties.rows : [{
          cols: properties.cols
        }]);

        if (Object.keys(dropDown).length > 0) {
          rows[0].cols = _compact(_flatten([rows[0].cols, [dropDown]]));
        }

        var getTable = function getTable() {
          if (_get(_this2.props, ['data', 'success'], false) === true) {
            return React.createElement(DataTable, {
              records: _this2.props.data.list.data,
              rows: rows,
              dispatch: _this2.props.dispatch,
              pushOnState: _this2.props.pushOnState,
              inputOnStack: _this2.props.inputOnStack,
              order: _this2.props.inputOnStack('order'),
              auth: _this2.props.auth,
              edit: _this2.edit,
              show: _this2.show,
              paginator: {
                currPage: _this2.props.data.list.current_page,
                lastPage: _this2.props.data.list.last_page,
                onChange: _this2.props.switchPage
              }
            });
          }
        };

        var state = {
          pending: _get(this.props.data, 'pending', false),
          failed: _get(this.props.data, 'failed', false)
        };

        var warning = function warning() {
          if (_has(_this2.props, ['data', 'item', 'error'])) {
            return React.createElement(Alert, {
              bsStyle: "danger"
            }, _get(_this2.props, ['data', 'item', 'error']));
          }
        };

        return React.createElement(WrappedComponent, this.props, this.filter(), process.env.NODE_ENV !== "production" ? warning() : void 0, React.createElement(Pending, {
          state: state
        }, getTable()), this.props.children);
      };

      return Connection;
    }(Component)) || _class) || _class) || _class) || _class) || _class);
    return Connection;
  };
}