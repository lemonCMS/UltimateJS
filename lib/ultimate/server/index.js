"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.render = exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _express = _interopRequireDefault(require("express"));

var _reactLoadable = _interopRequireDefault(require("react-loadable"));

var _webpack = require("react-loadable/webpack");

var _createMemoryHistory = _interopRequireDefault(require("history/createMemoryHistory"));

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _apiClient = _interopRequireDefault(require("../apiClient"));

var _render = require("../render");

var paths = require('razzle/config/paths'); // eslint-disable-next-line


var assets = require(paths.appManifest);

var vendorAssets = {};

if (process.env.RAZZLE_VENDOR_MANIFEST) {
  var vendorFile = paths.appBuild + "/" + process.env.RAZZLE_VENDOR_MANIFEST;

  if (_fsExtra.default.pathExistsSync(vendorFile)) {
    vendorAssets = _fsExtra.default.readJsonSync(vendorFile);
  }
}

var index = (0, _express.default)();
index.disable('x-powered-by').use(_express.default.static(paths.appPublic));
var _default = index;
exports.default = _default;

var render = function render(_ref, stats, routes, _ref2, wrapper, awaitRender) {
  var req = _ref.req,
      res = _ref.res;
  var initializeStore = _ref2.initializeStore,
      providers = _ref2.providers;
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var history, store, bundles, customRenderer, html;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            history = (0, _createMemoryHistory.default)({
              initialEntries: [req.originalUrl]
            });
            providers.client = (0, _apiClient.default)();
            providers.history = history;
            store = initializeStore({}, providers);
            bundles = [];

            customRenderer = function customRenderer(node) {
              var modules = [];

              var App = _react.default.createElement(_reactLoadable.default.Capture, {
                report: function report(moduleName) {
                  return modules.push(moduleName);
                }
              }, _react.default.createElement(_reactRedux.Provider, {
                store: store
              }, typeof wrapper === 'function' ? wrapper(node) : node));

              var Html = (0, _server.renderToString)(App);
              bundles = (0, _webpack.getBundles)(stats, modules);
              return {
                html: Html,
                bundles: bundles
              };
            };

            if (!(typeof awaitRender === 'function')) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return awaitRender({
              store: store,
              providers: providers,
              req: req,
              res: res
            });

          case 10:
            _context.next = 12;
            return _reactLoadable.default.preloadReady();

          case 12:
            _context.next = 14;
            return (0, _render.render)({
              req: req,
              res: res,
              customRenderer: customRenderer,
              routes: routes,
              assets: Object.assign({}, vendorAssets, assets),
              store: store,
              client: providers.client
            });

          case 14:
            html = _context.sent;
            res.send(html);
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            console.log('MOUNT ERROR', _context.t0);
            res.json(_context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
  }))();
};

exports.render = render;