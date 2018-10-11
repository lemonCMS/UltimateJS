import _regeneratorRuntime from '@babel/runtime/regenerator';
import _extends from '@babel/runtime/helpers/esm/extends';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import React from 'react';

let AfterRoot = function AfterRoot() {
  return React.createElement(
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
    _inheritsLoose(Document, _React$PureComponent);

    function Document() {
      return _React$PureComponent.apply(this, arguments) || this;
    }

    Document.getInitialProps =
      /* #__PURE__ */
      (function() {
        let _getInitialProps = _asyncToGenerator(
          /* #__PURE__ */
          _regeneratorRuntime.mark(function _callee(_ref) {
            let assets, data, renderPage, page;
            return _regeneratorRuntime.wrap(
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
                        _extends(
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
          React.createElement('script', {
            key: index,
            src: assets[key].js,
            defer: true,
          }),
        );
      /* eslint-disable jsx-a11y/html-has-lang */

      /* eslint-disable react/no-danger */

      return React.createElement(
        'html',
        htmlAttrs,
        React.createElement(
          'head',
          null,
          React.createElement('meta', {
            httpEquiv: 'X-UA-Compatible',
            content: 'IE=edge',
          }),
          React.createElement('meta', {
            charSet: 'utf-8',
          }),
          React.createElement('title', null, 'Welcome to the Afterparty'),
          React.createElement('meta', {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          }),
          assets.client.css &&
            React.createElement('link', {
              rel: 'stylesheet',
              href: assets.client.css,
            }),
          styles.map(
            (style, key) =>
              process.env.NODE_ENV === 'production'
                ? React.createElement('link', {
                    rel: 'stylesheet',
                    key,
                    href: `/${style.file}`,
                  })
                : React.createElement('link', {
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
        React.createElement(
          'body',
          bodyAttrs,
          React.createElement(AfterRoot, null),
          scripts,
          chunks.map(
            (chunk, key) =>
              process.env.NODE_ENV === 'production'
                ? React.createElement('script', {
                    key,
                    src: `/${chunk.file}`,
                  })
                : React.createElement('script', {
                    key,
                    src: `http://${process.env.HOST}:${parseInt(
                      process.env.PORT,
                      10,
                    ) + 1}/${chunk.file}`,
                  }),
          ),
          React.createElement('span', {
            dangerouslySetInnerHTML: {
              __html: `<script>window.__PRELOADED_STATE__ = ${  JSON.stringify(data)  }</script>` // prettier-ignore
            },
          }),
        ),
      );
    };

    return Document;
  })(React.PureComponent);

export default Document;
