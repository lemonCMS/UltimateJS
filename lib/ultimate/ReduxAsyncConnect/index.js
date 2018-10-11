"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _redial = require("../../redial");

var _nprogress = _interopRequireDefault(require("nprogress"));

var _asyncMap = _interopRequireDefault(require("../asyncMap"));

var _asyncMatchRoutes = _interopRequireDefault(require("../asyncMatchRoutes"));

// require('./nprogress.css');
var ReduxAsyncConnect =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ReduxAsyncConnect, _Component);

  function ReduxAsyncConnect() {
    var _this;

    _this = _Component.call(this) || this;
    _this.state = {
      previousLocation: null,
      authorized: true
    };
    _this.getAsyncData = _this.getAsyncData.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = ReduxAsyncConnect.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _nprogress.default.configure({
      trickleSpeed: 200
    });

    var _this$props = this.props,
        history = _this$props.history,
        location = _this$props.location,
        routes = _this$props.routes,
        store = _this$props.store,
        helpers = _this$props.helpers;
    this.getAsyncData(history, location, routes, store, helpers);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var history = prevProps.history,
        location = prevProps.location,
        routes = prevProps.routes,
        store = prevProps.store,
        helpers = prevProps.helpers;
    var navigated = this.props.location !== location;

    if (navigated) {
      this.getAsyncData(history, location, routes, store, helpers);
    }
  };

  _proto.getAsyncData =
  /*#__PURE__*/
  function () {
    var _getAsyncData = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(history, location, routes, store, helpers) {
      var _this2 = this;

      var _ref, components, match, params;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // save the location so we can render the old screen
              _nprogress.default.start();

              this.setState({
                previousLocation: location,
                authorized: true
              }); // load data while the old screen remains

              _context3.next = 4;
              return (0, _asyncMatchRoutes.default)(routes, this.props.location.pathname);

            case 4:
              _ref = _context3.sent;
              components = _ref.components;
              match = _ref.match;
              params = _ref.params;
              _context3.next = 10;
              return (0, _asyncMap.default)(components, function (component) {
                return (0, _redial.authorize)('authorized', component, (0, _extends2.default)({}, helpers, {
                  store: store,
                  match: match,
                  params: params,
                  history: history,
                  location: _this2.props.location
                }));
              }).then(
              /*#__PURE__*/
              (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2() {
                var fetchers;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        fetchers =
                        /*#__PURE__*/
                        function () {
                          var _ref3 = (0, _asyncToGenerator2.default)(
                          /*#__PURE__*/
                          _regenerator.default.mark(function _callee() {
                            return _regenerator.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return (0, _redial.trigger)('fetch', components, (0, _extends2.default)({}, helpers, {
                                      store: store,
                                      match: match,
                                      params: params,
                                      history: history,
                                      location: _this2.props.location
                                    }));

                                  case 2:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee, this);
                          }));

                          return function fetchers() {
                            return _ref3.apply(this, arguments);
                          };
                        }();

                        if (process.env.BUILD_TARGET === 'client') {
                          (0, _redial.trigger)('defer', components, (0, _extends2.default)({}, helpers, {
                            store: store,
                            match: match,
                            params: params,
                            history: history,
                            location: _this2.props.location
                          }));
                        }

                        _context2.next = 4;
                        return fetchers();

                      case 4:
                        _this2.setState({
                          authorized: true
                        });

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }))).catch(function () {
                _this2.setState({
                  authorized: false
                });
              });

            case 10:
              // clear previousLocation so the next screen renders
              this.setState({
                previousLocation: null
              });

              _nprogress.default.done();

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function getAsyncData(_x, _x2, _x3, _x4, _x5) {
      return _getAsyncData.apply(this, arguments);
    };
  }();

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        location = _this$props2.location;
    var previousLocation = this.state.previousLocation;

    if (this.state.authorized === false) {
      return _react.default.createElement(_reactRouter.Redirect, {
        to: "/"
      });
    } // use a controlled <Route> to trick all descendants into
    // rendering the old location


    return _react.default.createElement(_reactRouter.Route, {
      location: previousLocation || location,
      render: function render() {
        return children;
      }
    });
  };

  return ReduxAsyncConnect;
}(_react.Component);

var _default = (0, _reactRouter.withRouter)(ReduxAsyncConnect);

exports.default = _default;
module.exports = exports["default"];