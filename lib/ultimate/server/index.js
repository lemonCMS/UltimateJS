let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.render = exports.default = void 0;

let _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

let _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

let _react = _interopRequireDefault(require('react'));

let _express = _interopRequireDefault(require('express'));

let _reactLoadable = _interopRequireDefault(require('react-loadable'));

let _webpack = require('react-loadable/webpack');

let _createMemoryHistory = _interopRequireDefault(
  require('history/createMemoryHistory'),
);

let _server = require('react-dom/server');

let _reactRedux = require('react-redux');

let _fsExtra = _interopRequireDefault(require('fs-extra'));

let _apiClient = _interopRequireDefault(require('../apiClient'));

let _render = require('../render');

let paths = require('razzle/config/paths'); // eslint-disable-next-line

let assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

let vendorAssets = {};

if (process.env.RAZZLE_VENDOR_MANIFEST) {
  let vendorFile = `${paths.appBuild}/${process.env.RAZZLE_VENDOR_MANIFEST}`;

  if (_fsExtra.default.pathExistsSync(vendorFile)) {
    vendorAssets = _fsExtra.default.readJsonSync(vendorFile);
  }
}

let index = (0, _express.default)();
index
  .disable('x-powered-by')
  .use(_express.default.static(process.env.RAZZLE_PUBLIC_DIR));
let _default = index;
exports.default = _default;

let render = function render(_ref, stats, routes, _ref2, wrapper, awaitRender) {
  let req = _ref.req,
    res = _ref.res;
  let initializeStore = _ref2.initializeStore,
    providers = _ref2.providers;
  (0, _asyncToGenerator2.default)(
    /* #__PURE__ */
    _regenerator.default.mark(function _callee() {
      let history, store, bundles, customRenderer, html;
      return _regenerator.default.wrap(
        _context => {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0;
                history = (0, _createMemoryHistory.default)({
                  initialEntries: [req.originalUrl],
                });
                providers.client = (0, _apiClient.default)();
                providers.history = history;
                store = initializeStore({}, providers);
                bundles = [];

                customRenderer = function customRenderer(node) {
                  let modules = [];

                  let App = _react.default.createElement(
                    _reactLoadable.default.Capture,
                    {
                      report: function report(moduleName) {
                        return modules.push(moduleName);
                      },
                    },
                    _react.default.createElement(
                      _reactRedux.Provider,
                      {
                        store,
                      },
                      typeof wrapper === 'function' ? wrapper(node) : node,
                    ),
                  );

                  let Html = (0, _server.renderToString)(App);
                  bundles = (0, _webpack.getBundles)(stats, modules);
                  return {
                    html: Html,
                    bundles,
                  };
                };

                if (!(typeof awaitRender === 'function')) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return awaitRender({
                  store,
                  providers,
                  req,
                  res,
                });

              case 10:
                _context.next = 12;
                return _reactLoadable.default.preloadReady();

              case 12:
                _context.next = 14;
                return (0, _render.render)({
                  req,
                  res,
                  customRenderer,
                  routes,
                  assets: Object.assign({}, vendorAssets, assets),
                  store,
                  client: providers.client,
                });

              case 14:
                html = _context.sent;
                res.send(html);
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context.catch(0);
                res.json(_context.t0);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[0, 18]],
      );
    }),
  )();
};

exports.render = render;
