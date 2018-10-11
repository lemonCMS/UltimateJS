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

let _react = _interopRequireDefault(require('react'));

let AfterRoot = function AfterRoot() {
  return _react.default.createElement(
    'div',
    {
      id: 'root',
    },
    'DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP',
  );
};

let Document =
  /* #__PURE__ */
  (function(_React$PureComponent) {
    (0, _inheritsLoose2.default)(Document, _React$PureComponent);

    function Document() {
      return _React$PureComponent.apply(this, arguments) || this;
    }

    Document.getInitialProps =
      /* #__PURE__ */
      (function() {
        let _getInitialProps = (0, _asyncToGenerator2.default)(
          /* #__PURE__ */
          _regenerator.default.mark(function _callee(_ref) {
            let assets, data, renderPage, page;
            return _regenerator.default.wrap(
              _context => {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (assets = _ref.assets),
                        (data = _ref.data),
                        (renderPage = _ref.renderPage);
                      _context.next = 3;
                      return renderPage();

                    case 3:
                      page = _context.sent;
                      return _context.abrupt(
                        'return',
                        (0, _extends2.default)(
                          {
                            assets,
                            data,
                          },
                          page,
                        ),
                      );

                    case 5:
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

        return function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        };
      })();

    let _proto = Document.prototype;

    _proto.render = function render() {
      let _this$props = this.props,
        helmet = _this$props.helmet,
        assets = _this$props.assets,
        data = _this$props.data,
        bundles = _this$props.bundles;
      let chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
      let styles = bundles.filter(bundle => bundle.file.endsWith('.css')); // get attributes from React Helmet

      let htmlAttrs = helmet.htmlAttributes.toComponent();
      let bodyAttrs = helmet.bodyAttributes.toComponent();
      let scripts = Object.keys(assets)
        .filter(key => assets[key] && assets[key].js)
        .map((key, index) =>
          _react.default.createElement('script', {
            key: index,
            src: assets[key].js,
            defer: true,
          }),
        );
      /* eslint-disable jsx-a11y/html-has-lang */

      /* eslint-disable react/no-danger */

      return _react.default.createElement(
        'html',
        htmlAttrs,
        _react.default.createElement(
          'head',
          null,
          _react.default.createElement('meta', {
            httpEquiv: 'X-UA-Compatible',
            content: 'IE=edge',
          }),
          _react.default.createElement('meta', {
            charSet: 'utf-8',
          }),
          _react.default.createElement(
            'title',
            null,
            'Welcome to the Afterparty',
          ),
          _react.default.createElement('meta', {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          }),
          assets.client.css &&
            _react.default.createElement('link', {
              rel: 'stylesheet',
              href: assets.client.css,
            }),
          styles.map(
            (style, key) =>
              process.env.NODE_ENV === 'production'
                ? _react.default.createElement('link', {
                    rel: 'stylesheet',
                    key,
                    href: `/${style.file}`,
                  })
                : _react.default.createElement('link', {
                    rel: 'stylesheet',
                    key,
                    href: `http://${process.env.HOST}:${parseInt(
                      process.env.PORT,
                      10,
                    ) + 1}/${style.file}`,
                  }),
          ),
          helmet.title.toComponent(),
          helmet.meta.toComponent(),
          helmet.link.toComponent(),
          helmet.style.toComponent(),
        ),
        _react.default.createElement(
          'body',
          bodyAttrs,
          _react.default.createElement(AfterRoot, null),
          scripts,
          chunks.map(
            (chunk, key) =>
              process.env.NODE_ENV === 'production'
                ? _react.default.createElement('script', {
                    key,
                    src: `/${chunk.file}`,
                  })
                : _react.default.createElement('script', {
                    key,
                    src: `http://${process.env.HOST}:${parseInt(
                      process.env.PORT,
                      10,
                    ) + 1}/${chunk.file}`,
                  }),
          ),
          _react.default.createElement('span', {
            dangerouslySetInnerHTML: {
              __html: `<script>window.__PRELOADED_STATE__ = ${  JSON.stringify(data)  }</script>` // prettier-ignore
            },
          }),
        ),
      );
    };

    return Document;
  })(_react.default.PureComponent);

let _default = Document;
exports.default = _default;
module.exports = exports.default;
