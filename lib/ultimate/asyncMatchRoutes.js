let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends'),
);

let _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

let _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

let _reactRouterConfig = require('react-router-config');

function getComponents(match) {
  return match.map(v => v.route.component).reduce(
    /* #__PURE__ */
    (function() {
      let _ref = (0, _asyncToGenerator2.default)(
        /* #__PURE__ */
        _regenerator.default.mark(function _callee(result, component) {
          let res, ret;
          return _regenerator.default.wrap(
            _context => {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    if (!(component && component.preload)) {
                      _context.next = 10;
                      break;
                    }

                    _context.next = 3;
                    return component.preload();

                  case 3:
                    res = _context.sent;
                    _context.next = 6;
                    return result;

                  case 6:
                    _context.t0 = [component];
                    _context.t1 = [].concat(res);
                    ret = _context.sent.concat(_context.t0, _context.t1);
                    return _context.abrupt('return', ret);

                  case 10:
                    _context.next = 12;
                    return result;

                  case 12:
                    _context.t2 = [component];
                    return _context.abrupt(
                      'return',
                      _context.sent.concat(_context.t2),
                    );

                  case 14:
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

      return function(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })(),
    [],
  );
}

function getParams(match) {
  return match.reduce((result, component) => {
    if (component.match && component.match.params) {
      return (0, _extends2.default)({}, result, component.match.params);
    }

    return result;
  }, {});
}

let asyncMatchRoutes =
  /* #__PURE__ */
  (function() {
    let _ref2 = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */
      _regenerator.default.mark(function _callee2(routes, pathname) {
        let match, params, components;
        return _regenerator.default.wrap(
          _context2 => {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  match = (0, _reactRouterConfig.matchRoutes)(routes, pathname);
                  params = getParams(match);
                  _context2.next = 4;
                  return getComponents(match);

                case 4:
                  components = _context2.sent;
                  return _context2.abrupt('return', {
                    components,
                    match,
                    params,
                  });

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          this,
        );
      }),
    );

    return function asyncMatchRoutes(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })();

let _default = asyncMatchRoutes;
exports.default = _default;
module.exports = exports.default;
