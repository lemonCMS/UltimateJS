import _regeneratorRuntime from "@babel/runtime/regenerator";
import _extends from "@babel/runtime/helpers/esm/extends";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React from 'react';

var AfterRoot = function AfterRoot() {
  return React.createElement("div", {
    id: "root"
  }, "DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP");
};

var Document =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Document, _React$PureComponent);

  function Document() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  Document.getInitialProps =
  /*#__PURE__*/
  function () {
    var _getInitialProps = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref) {
      var assets, data, renderPage, page;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              assets = _ref.assets, data = _ref.data, renderPage = _ref.renderPage;
              _context.next = 3;
              return renderPage();

            case 3:
              page = _context.sent;
              return _context.abrupt("return", _extends({
                assets: assets,
                data: data
              }, page));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getInitialProps(_x) {
      return _getInitialProps.apply(this, arguments);
    };
  }();

  var _proto = Document.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        helmet = _this$props.helmet,
        assets = _this$props.assets,
        data = _this$props.data,
        bundles = _this$props.bundles;
    var chunks = bundles.filter(function (bundle) {
      return bundle.file.endsWith('.js');
    });
    var styles = bundles.filter(function (bundle) {
      return bundle.file.endsWith('.css');
    }); // get attributes from React Helmet

    var htmlAttrs = helmet.htmlAttributes.toComponent();
    var bodyAttrs = helmet.bodyAttributes.toComponent();
    var scripts = Object.keys(assets).filter(function (key) {
      return assets[key] && assets[key].js;
    }).map(function (key, index) {
      return React.createElement("script", {
        key: index,
        src: assets[key].js,
        defer: true
      });
    });
    /* eslint-disable jsx-a11y/html-has-lang */

    /* eslint-disable react/no-danger */

    return React.createElement("html", htmlAttrs, React.createElement("head", null, React.createElement("meta", {
      httpEquiv: "X-UA-Compatible",
      content: "IE=edge"
    }), React.createElement("meta", {
      charSet: "utf-8"
    }), React.createElement("title", null, "Welcome to the Afterparty"), React.createElement("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }), assets.client.css && React.createElement("link", {
      rel: "stylesheet",
      href: assets.client.css
    }), styles.map(function (style, key) {
      return process.env.NODE_ENV === 'production' ? React.createElement("link", {
        rel: "stylesheet",
        key: key,
        href: "/" + style.file
      }) : React.createElement("link", {
        rel: "stylesheet",
        key: key,
        href: "http://" + process.env.HOST + ":" + (parseInt(process.env.PORT, 10) + 1) + "/" + style.file
      });
    }), helmet.title.toComponent(), helmet.meta.toComponent(), helmet.link.toComponent(), helmet.style.toComponent()), React.createElement("body", bodyAttrs, React.createElement(AfterRoot, null), scripts, chunks.map(function (chunk, key) {
      return process.env.NODE_ENV === 'production' ? React.createElement("script", {
        key: key,
        src: "/" + chunk.file
      }) : React.createElement("script", {
        key: key,
        src: "http://" + process.env.HOST + ":" + (parseInt(process.env.PORT, 10) + 1) + "/" + chunk.file
      });
    }), React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: "<script>window.__PRELOADED_STATE__ = " + JSON.stringify(data) + "</script>" // prettier-ignore

      }
    })));
  };

  return Document;
}(React.PureComponent);

export default Document;