let _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

let _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends'),
);

let _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

let _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose'),
);

let _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized'),
);

let _react = _interopRequireWildcard(require('react'));

let _reactRouter = require('react-router');

let _redial = require('../../redial');

let _nprogress = _interopRequireDefault(require('nprogress'));

let _asyncMap = _interopRequireDefault(require('../asyncMap'));

let _asyncMatchRoutes = _interopRequireDefault(require('../asyncMatchRoutes'));

require('./nprogress.css');

let ReduxAsyncConnect =
  /* #__PURE__ */
  (function(_Component) {
    (0, _inheritsLoose2.default)(ReduxAsyncConnect, _Component);

    function ReduxAsyncConnect() {
      let _this;

      _this = _Component.call(this) || this;
      _this.state = {
        previousLocation: null,
        authorized: true,
      };
      _this.getAsyncData = _this.getAsyncData.bind(
        (0, _assertThisInitialized2.default)(
          (0, _assertThisInitialized2.default)(_this),
        ),
      );
      return _this;
    }

    let _proto = ReduxAsyncConnect.prototype;

    _proto.componentDidMount = function componentDidMount() {
      _nprogress.default.configure({
        trickleSpeed: 200,
      });

      let _this$props = this.props,
        history = _this$props.history,
        location = _this$props.location,
        routes = _this$props.routes,
        store = _this$props.store,
        helpers = _this$props.helpers;
      this.getAsyncData(history, location, routes, store, helpers);
    };

    _proto.componentDidUpdate = function componentDidUpdate(
      prevProps,
      prevState,
    ) {
      let history = prevProps.history,
        location = prevProps.location,
        routes = prevProps.routes,
        store = prevProps.store,
        helpers = prevProps.helpers;
      let navigated = this.props.location !== location;

      if (navigated) {
        this.getAsyncData(history, location, routes, store, helpers);
      }
    };

    _proto.getAsyncData =
      /* #__PURE__ */
      (function() {
        let _getAsyncData = (0, _asyncToGenerator2.default)(
          /* #__PURE__ */
          _regenerator.default.mark(function _callee3(
            history,
            location,
            routes,
            store,
            helpers,
          ) {
            let _this2 = this;

            let _ref, components, match, params;

            return _regenerator.default.wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      // save the location so we can render the old screen
                      _nprogress.default.start();

                      this.setState({
                        previousLocation: location,
                        authorized: true,
                      }); // load data while the old screen remains

                      _context3.next = 4;
                      return (0, _asyncMatchRoutes.default)(
                        routes,
                        this.props.location.pathname,
                      );

                    case 4:
                      _ref = _context3.sent;
                      components = _ref.components;
                      match = _ref.match;
                      params = _ref.params;
                      _context3.next = 10;
                      return (0, _asyncMap.default)(components, component =>
                        (0, _redial.authorize)(
                          'authorized',
                          component,
                          (0, _extends2.default)({}, helpers, {
                            store,
                            match,
                            params,
                            history,
                            location: _this2.props.location,
                          }),
                        ),
                      )
                        .then(
                          /* #__PURE__ */
                          (0, _asyncToGenerator2.default)(
                            /* #__PURE__ */
                            _regenerator.default.mark(function _callee2() {
                              let fetchers;
                              return _regenerator.default.wrap(
                                _context2 => {
                                  while (1) {
                                    switch ((_context2.prev = _context2.next)) {
                                      case 0:
                                        fetchers =
                                          /* #__PURE__ */
                                          (function() {
                                            let _ref3 = (0,
                                            _asyncToGenerator2.default)(
                                              /* #__PURE__ */
                                              _regenerator.default.mark(
                                                function _callee() {
                                                  return _regenerator.default.wrap(
                                                    _context => {
                                                      while (1) {
                                                        switch (
                                                          (_context.prev =
                                                            _context.next)
                                                        ) {
                                                          case 0:
                                                            _context.next = 2;
                                                            return (0,
                                                            _redial.trigger)(
                                                              'fetch',
                                                              components,
                                                              (0,
                                                              _extends2.default)(
                                                                {},
                                                                helpers,
                                                                {
                                                                  store,
                                                                  match,
                                                                  params,
                                                                  history,
                                                                  location:
                                                                    _this2.props
                                                                      .location,
                                                                },
                                                              ),
                                                            );

                                                          case 2:
                                                          case 'end':
                                                            return _context.stop();
                                                        }
                                                      }
                                                    },
                                                    _callee,
                                                    this,
                                                  );
                                                },
                                              ),
                                            );

                                            return function fetchers() {
                                              return _ref3.apply(
                                                this,
                                                arguments,
                                              );
                                            };
                                          })();

                                        if (
                                          process.env.BUILD_TARGET === 'client'
                                        ) {
                                          (0, _redial.trigger)(
                                            'defer',
                                            components,
                                            (0, _extends2.default)(
                                              {},
                                              helpers,
                                              {
                                                store,
                                                match,
                                                params,
                                                history,
                                                location: _this2.props.location,
                                              },
                                            ),
                                          );
                                        }

                                        _context2.next = 4;
                                        return fetchers();

                                      case 4:
                                        _this2.setState({
                                          authorized: true,
                                        });

                                      case 5:
                                      case 'end':
                                        return _context2.stop();
                                    }
                                  }
                                },
                                _callee2,
                                this,
                              );
                            }),
                          ),
                        )
                        .catch(() => {
                          _this2.setState({
                            authorized: false,
                          });
                        });

                    case 10:
                      // clear previousLocation so the next screen renders
                      this.setState({
                        previousLocation: null,
                      });

                      _nprogress.default.done();

                    case 12:
                    case 'end':
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this,
            );
          }),
        );

        return function getAsyncData(_x, _x2, _x3, _x4, _x5) {
          return _getAsyncData.apply(this, arguments);
        };
      })();

    _proto.render = function render() {
      let _this$props2 = this.props,
        children = _this$props2.children,
        location = _this$props2.location;
      let previousLocation = this.state.previousLocation;

      if (this.state.authorized === false) {
        return _react.default.createElement(_reactRouter.Redirect, {
          to: '/',
        });
      } // use a controlled <Route> to trick all descendants into
      // rendering the old location

      return _react.default.createElement(_reactRouter.Route, {
        location: previousLocation || location,
        render: function render() {
          return children;
        },
      });
    };

    return ReduxAsyncConnect;
  })(_react.Component);

let _default = (0, _reactRouter.withRouter)(ReduxAsyncConnect);

exports.default = _default;
module.exports = exports.default;
