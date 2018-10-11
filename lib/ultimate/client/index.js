let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = client;
exports.trigger = exports.rehydrate = void 0;

let _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

let _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

require('@babel/polyfill');

let _react = _interopRequireDefault(require('react'));

let _reactDom = require('react-dom');

let _reactRedux = require('react-redux');

let _reactRouterRedux = require('react-router-redux');

let _reactRouterDom = require('react-router-dom');

let _reactLoadable = _interopRequireDefault(require('react-loadable'));

let _createBrowserHistory = _interopRequireDefault(
  require('history/createBrowserHistory'),
);

let _apiClient = _interopRequireDefault(require('../apiClient'));

let _ReduxAsyncConnect = _interopRequireDefault(
  require('../ReduxAsyncConnect'),
);

let _Ultimate = _interopRequireDefault(require('../Ultimate'));

let _store = {};
let _providers = {};

let _wrapper = function _wrapper(component) {
  return component;
};

let rehydrate =
  /* #__PURE__ */
  (function() {
    let _ref2 = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */
      _regenerator.default.mark(function _callee(_routes, _ref, wrapper) {
        let store, providers, ultimate;
        return _regenerator.default.wrap(
          _context => {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (store = _ref.store), (providers = _ref.providers);
                  ultimate = _react.default.createElement(_Ultimate.default, {
                    routes: _routes,
                  });
                  (0, _reactDom.hydrate)(
                    _react.default.createElement(
                      _reactRedux.Provider,
                      {
                        store,
                      },
                      _react.default.createElement(
                        _reactRouterDom.BrowserRouter,
                        null,
                        _react.default.createElement(
                          _reactRouterRedux.ConnectedRouter,
                          {
                            history: providers.history,
                          },
                          _react.default.createElement(
                            _ReduxAsyncConnect.default,
                            {
                              routes: _routes,
                              store,
                              helpers: providers,
                            },
                            wrapper(ultimate, {
                              store,
                              providers,
                            }),
                          ),
                        ),
                      ),
                    ),
                    document.getElementById('root'),
                  );

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          this,
        );
      }),
    );

    return function rehydrate(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  })();

exports.rehydrate = rehydrate;

let trigger = function trigger(_routes) {
  return rehydrate(
    _routes,
    {
      store: _store,
      providers: _providers,
    },
    _wrapper,
  );
};

exports.trigger = trigger;

function client(routes, _ref3, wrapper, awaitRender) {
  let initializeStore = _ref3.initializeStore,
    state = _ref3.state,
    providers = _ref3.providers;
  (0, _asyncToGenerator2.default)(
    /* #__PURE__ */
    _regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(
        _context2 => {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                providers.client = (0, _apiClient.default)();
                providers.history = (0, _createBrowserHistory.default)();
                _store = initializeStore(state, providers);
                _providers = providers;
                _wrapper = wrapper;
                _context2.next = 7;
                return _reactLoadable.default.preloadReady();

              case 7:
                if (typeof awaitRender === 'function') {
                  awaitRender({
                    store: _store,
                    provider: _providers,
                  }).then(() => {
                    rehydrate(
                      routes,
                      {
                        store: _store,
                        providers: _providers,
                      },
                      _wrapper,
                    );
                  });
                } else {
                  rehydrate(
                    routes,
                    {
                      store: _store,
                      providers: _providers,
                    },
                    _wrapper,
                  );
                }

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this,
      );
    }),
  )();
}
