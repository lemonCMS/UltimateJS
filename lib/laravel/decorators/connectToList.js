"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = connnectToList;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _compact2 = _interopRequireDefault(require("lodash/compact"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactBootstrap = require("react-bootstrap");

var _reactRouterDom = require("react-router-dom");

var _redial = require("@wicked_query/redial");

var _actions = require("../redux/store/actions");

var _DataTable = _interopRequireDefault(require("../components/DataTable"));

var _connectToFilter = _interopRequireWildcard(require("./connectToFilter"));

var _connectToConfirm = _interopRequireDefault(require("./connectToConfirm"));

var _Search = _interopRequireDefault(require("../components/Search"));

var _Pending = _interopRequireDefault(require("../components/Pending"));

function connnectToList(properties) {
  return function (WrappedComponent) {
    var _dec, _dec2, _dec3, _dec4, _class;

    var Connection = (_dec = (0, _redial.provideHooks)({
      fetch: function fetch(_ref) {
        var _ref$store = _ref.store,
            dispatch = _ref$store.dispatch,
            getState = _ref$store.getState,
            params = _ref.params,
            location = _ref.location;
        var promises = [];
        var state = (0, _connectToFilter.createAllParamsForFetch)(getState(), location);

        var api = function api() {
          if ((0, _isFunction2.default)(properties.api)) {
            return properties.api(params);
          }

          return properties.api;
        };

        promises.push(dispatch((0, _actions.load)(properties.key, api(), state)));
        return Promise.all(promises);
      }
    }), _dec2 = (0, _connectToFilter.default)(), _dec3 = (0, _connectToConfirm.default)(), _dec4 = (0, _reactRedux.connect)(function (state) {
      return {
        data: state.store[properties.key],
        auth: state.auth
      };
    }), _dec(_class = (0, _reactRouter.withRouter)(_class = _dec2(_class = _dec3(_class = _dec4(_class =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(Connection, _Component);

      function Connection() {
        var _this;

        _this = _Component.call(this) || this;
        _this.filter = _this.filter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.show = _this.show.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.edit = _this.edit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.destroy = _this.destroy.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.path = _this.path.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.state = {
          forceUpdate: false,
          path: ''
        };
        return _this;
      }

      var _proto = Connection.prototype;

      _proto.path = function path() {
        var path = properties.path;

        if ((0, _isFunction2.default)(properties.path)) {
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
        if ((0, _get2.default)(nextProps, ['data', 'item', 'deleted'], false) === true) {
          this.props.dispatch((0, _actions.clearItem)(properties.key));
          this.props.pushStateAttempt();
        }
      };

      _proto.filter = function filter() {
        return _react.default.createElement("div", {
          className: "panel panel-border-tb"
        }, _react.default.createElement("div", {
          className: "panel-heading"
        }, _react.default.createElement(_reactRouterDom.Link, {
          to: properties.path + "/new",
          className: "pull-right"
        }, _react.default.createElement("i", {
          className: "fa fa-plus"
        }), " nieuw item aanmaken"), _react.default.createElement("h4", {
          className: "panel-title"
        }, "Verfijn")), _react.default.createElement("div", {
          className: "panel-body"
        }, _react.default.createElement(_Search.default, {
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
        this.props.dispatch((0, _actions.destroyItem)(properties.key, "" + properties.api, item.id));
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

        var rows = (0, _cloneDeep2.default)((0, _has2.default)(properties, 'rows') ? properties.rows : [{
          cols: properties.cols
        }]);

        if (Object.keys(dropDown).length > 0) {
          rows[0].cols = (0, _compact2.default)((0, _flatten2.default)([rows[0].cols, [dropDown]]));
        }

        var getTable = function getTable() {
          if ((0, _get2.default)(_this2.props, ['data', 'success'], false) === true) {
            return _react.default.createElement(_DataTable.default, {
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
          pending: (0, _get2.default)(this.props.data, 'pending', false),
          failed: (0, _get2.default)(this.props.data, 'failed', false)
        };

        var warning = function warning() {
          if ((0, _has2.default)(_this2.props, ['data', 'item', 'error'])) {
            return _react.default.createElement(_reactBootstrap.Alert, {
              bsStyle: "danger"
            }, (0, _get2.default)(_this2.props, ['data', 'item', 'error']));
          }
        };

        return _react.default.createElement(WrappedComponent, this.props, this.filter(), process.env.NODE_ENV !== "production" ? warning() : void 0, _react.default.createElement(_Pending.default, {
          state: state
        }, getTable()), this.props.children);
      };

      return Connection;
    }(_react.Component)) || _class) || _class) || _class) || _class) || _class);
    return Connection;
  };
}

module.exports = exports["default"];