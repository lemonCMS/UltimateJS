"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.render = render;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var React = _interopRequireWildcard(require("react"));

var ReactDOMServer = _interopRequireWildcard(require("react-dom/server"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _reactRouterDom = require("react-router-dom");

var _redial = require("../redial");

var _Document = _interopRequireDefault(require("./Document"));

var _Ultimate = _interopRequireDefault(require("./Ultimate"));

var _asyncMatchRoutes = _interopRequireDefault(require("./asyncMatchRoutes"));

var modPageFn = function modPageFn(Page) {
  return function (props) {
    return React.createElement(Page, props);
  };
};

function render(_x) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(options) {
    var req, res, routes, assets, document, customRenderer, store, client, rest, Doc, context, renderPage, _ref2, components, match, params, locals;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = options.req, res = options.res, routes = options.routes, assets = options.assets, document = options.document, customRenderer = options.customRenderer, store = options.store, client = options.client, rest = (0, _objectWithoutPropertiesLoose2.default)(options, ["req", "res", "routes", "assets", "document", "customRenderer", "store", "client"]);
            Doc = document || _Document.default;
            context = {};

            renderPage =
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(fn) {
                var defaultRenderer, renderer, renderedContent, helmet;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (fn === void 0) {
                          fn = modPageFn;
                        }

                        // By default, we keep ReactDOMServer synchronous renderToString function
                        defaultRenderer = function defaultRenderer(element) {
                          return {
                            html: ReactDOMServer.renderToString(element)
                          };
                        };

                        renderer = customRenderer || defaultRenderer;
                        renderedContent = renderer(React.createElement(_reactRouterDom.StaticRouter, {
                          location: req.url,
                          context: context
                        }, fn(_Ultimate.default)({
                          routes: routes
                        })));
                        helmet = _reactHelmet.default.renderStatic();
                        return _context.abrupt("return", (0, _extends2.default)({
                          helmet: helmet
                        }, renderedContent));

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function renderPage(_x2) {
                return _ref.apply(this, arguments);
              };
            }();

            _context3.next = 6;
            return (0, _asyncMatchRoutes.default)(routes, req._parsedUrl.pathname);

          case 6:
            _ref2 = _context3.sent;
            components = _ref2.components;
            match = _ref2.match;
            params = _ref2.params;
            locals = {
              store: store,
              match: match,
              params: params,
              client: client
            };
            _context3.next = 13;
            return (0, _redial.authorizeWait)('authorized', components, locals).then(
            /*#__PURE__*/
            (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee2() {
              var triggers, _ref4, html, docProps, doc;

              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      triggers = (0, _redial.triggerWait)('fetch', components, locals);
                      _context2.next = 3;
                      return triggers;

                    case 3:
                      if (match) {
                        _context2.next = 6;
                        break;
                      }

                      res.status(404);
                      return _context2.abrupt("return");

                    case 6:
                      if (!(match.path === '**')) {
                        _context2.next = 10;
                        break;
                      }

                      res.status(404);
                      _context2.next = 13;
                      break;

                    case 10:
                      if (!(match && match.redirectTo && match.path)) {
                        _context2.next = 13;
                        break;
                      }

                      res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
                      return _context2.abrupt("return");

                    case 13:
                      _context2.next = 15;
                      return Doc.getInitialProps((0, _extends2.default)({
                        req: req,
                        res: res,
                        assets: assets,
                        renderPage: renderPage,
                        helmet: _reactHelmet.default.renderStatic(),
                        data: store.getState(),
                        match: match
                      }, rest));

                    case 15:
                      _ref4 = _context2.sent;
                      html = _ref4.html;
                      docProps = (0, _objectWithoutPropertiesLoose2.default)(_ref4, ["html"]);
                      doc = ReactDOMServer.renderToStaticMarkup(React.createElement(Doc, docProps));
                      return _context2.abrupt("return", "<!doctype html>" + doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html));

                    case 20:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }))).catch(function () {
              res.status(401);
              return "<!doctype html><html><body>Access denied.</body></html>";
            });

          case 13:
            return _context3.abrupt("return", _context3.sent);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _render.apply(this, arguments);
}