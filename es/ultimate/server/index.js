import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import express from 'express';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import fs from 'fs-extra';
import apiClient from '../apiClient';
import { render as ultimateRender } from '../render';

var paths = require('razzle/config/paths'); // eslint-disable-next-line


var assets = require(paths.appManifest);

var vendorAssets = {};

if (process.env.RAZZLE_VENDOR_MANIFEST) {
  var vendorFile = paths.appBuild + "/" + process.env.RAZZLE_VENDOR_MANIFEST;

  if (fs.pathExistsSync(vendorFile)) {
    vendorAssets = fs.readJsonSync(vendorFile);
  }
}

var index = express();
index.disable('x-powered-by').use(express.static(paths.appPublic));
export default index;
export var render = function render(_ref, stats, routes, _ref2, wrapper, awaitRender) {
  var req = _ref.req,
      res = _ref.res;
  var initializeStore = _ref2.initializeStore,
      providers = _ref2.providers;

  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var history, store, bundles, customRenderer, html;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            history = createMemoryHistory({
              initialEntries: [req.originalUrl]
            });
            providers.client = apiClient();
            providers.history = history;
            store = initializeStore({}, providers);
            bundles = [];

            customRenderer = function customRenderer(node) {
              var modules = [];
              var App = React.createElement(Loadable.Capture, {
                report: function report(moduleName) {
                  return modules.push(moduleName);
                }
              }, React.createElement(Provider, {
                store: store
              }, typeof wrapper === 'function' ? wrapper(node) : node));
              var Html = renderToString(App);
              bundles = getBundles(stats, modules);
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
            return Loadable.preloadReady();

          case 12:
            _context.next = 14;
            return ultimateRender({
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