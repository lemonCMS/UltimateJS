import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import createBrowserHistory from 'history/createBrowserHistory';
import apiClient from '../apiClient';
import ReduxAsyncConnect from '../ReduxAsyncConnect';
import Ultimate from '../Ultimate';
var _store = {};
var _providers = {};

var _wrapper = function _wrapper(component) {
  return component;
};

export var rehydrate =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_routes, _ref, wrapper) {
    var store, providers, ultimate;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, providers = _ref.providers;
            ultimate = React.createElement(Ultimate, {
              routes: _routes
            });
            hydrate(React.createElement(Provider, {
              store: store
            }, React.createElement(BrowserRouter, null, React.createElement(ReduxAsyncConnect, {
              routes: _routes,
              store: store,
              helpers: providers
            }, wrapper(ultimate, {
              store: store,
              providers: providers
            })))), document.getElementById('root'));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function rehydrate(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
export var trigger = function trigger(_routes) {
  return rehydrate(_routes, {
    store: _store,
    providers: _providers
  }, _wrapper);
};
export default function client(routes, _ref3, wrapper, awaitRender) {
  var initializeStore = _ref3.initializeStore,
      state = _ref3.state,
      providers = _ref3.providers;

  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            providers.client = apiClient();
            providers.history = createBrowserHistory();
            _store = initializeStore(state, providers);
            _providers = providers;
            _wrapper = wrapper;
            _context2.next = 7;
            return Loadable.preloadReady();

          case 7:
            if (typeof awaitRender === 'function') {
              awaitRender({
                store: _store,
                provider: _providers
              }).then(function () {
                rehydrate(routes, {
                  store: _store,
                  providers: _providers
                }, _wrapper);
              });
            } else {
              rehydrate(routes, {
                store: _store,
                providers: _providers
              }, _wrapper);
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }))();
}