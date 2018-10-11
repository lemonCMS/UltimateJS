import _regeneratorRuntime from '@babel/runtime/regenerator';
import _extends from '@babel/runtime/helpers/esm/extends';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import React, { Component } from 'react';
import { withRouter, Route, Redirect } from 'react-router';
import NProgress from 'nprogress';
import { authorize, trigger } from '../../redial';
import asyncMap from '../asyncMap';
import asyncMatchRoutes from '../asyncMatchRoutes';

require('./nprogress.css');

let ReduxAsyncConnect =
  /* #__PURE__ */
  (function(_Component) {
    _inheritsLoose(ReduxAsyncConnect, _Component);

    function ReduxAsyncConnect() {
      let _this;

      _this = _Component.call(this) || this;
      _this.state = {
        previousLocation: null,
        authorized: true,
      };
      _this.getAsyncData = _this.getAsyncData.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      );
      return _this;
    }

    let _proto = ReduxAsyncConnect.prototype;

    _proto.componentDidMount = function componentDidMount() {
      NProgress.configure({
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
        let _getAsyncData = _asyncToGenerator(
          /* #__PURE__ */
          _regeneratorRuntime.mark(function _callee3(
            history,
            location,
            routes,
            store,
            helpers,
          ) {
            let _this2 = this;

            let _ref, components, match, params;

            return _regeneratorRuntime.wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      // save the location so we can render the old screen
                      NProgress.start();
                      this.setState({
                        previousLocation: location,
                        authorized: true,
                      }); // load data while the old screen remains

                      _context3.next = 4;
                      return asyncMatchRoutes(
                        routes,
                        this.props.location.pathname,
                      );

                    case 4:
                      _ref = _context3.sent;
                      components = _ref.components;
                      match = _ref.match;
                      params = _ref.params;
                      _context3.next = 10;
                      return asyncMap(components, component =>
                        authorize(
                          'authorized',
                          component,
                          _extends({}, helpers, {
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
                          _asyncToGenerator(
                            /* #__PURE__ */
                            _regeneratorRuntime.mark(function _callee2() {
                              let fetchers;
                              return _regeneratorRuntime.wrap(
                                _context2 => {
                                  while (1) {
                                    switch ((_context2.prev = _context2.next)) {
                                      case 0:
                                        fetchers =
                                          /* #__PURE__ */
                                          (function() {
                                            let _ref3 = _asyncToGenerator(
                                              /* #__PURE__ */
                                              _regeneratorRuntime.mark(
                                                function _callee() {
                                                  return _regeneratorRuntime.wrap(
                                                    _context => {
                                                      while (1) {
                                                        switch (
                                                          (_context.prev =
                                                            _context.next)
                                                        ) {
                                                          case 0:
                                                            _context.next = 2;
                                                            return trigger(
                                                              'fetch',
                                                              components,
                                                              _extends(
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
                                          trigger(
                                            'defer',
                                            components,
                                            _extends({}, helpers, {
                                              store,
                                              match,
                                              params,
                                              history,
                                              location: _this2.props.location,
                                            }),
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
                      NProgress.done();

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
        return React.createElement(Redirect, {
          to: '/',
        });
      } // use a controlled <Route> to trick all descendants into
      // rendering the old location

      return React.createElement(Route, {
        location: previousLocation || location,
        render: function render() {
          return children;
        },
      });
    };

    return ReduxAsyncConnect;
  })(Component);

export default withRouter(ReduxAsyncConnect);
