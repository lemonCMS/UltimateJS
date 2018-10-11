let _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = void 0;

let _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose'),
);

let _react = _interopRequireWildcard(require('react'));

let _reactRouterConfig = require('react-router-config');

let Ultimate =
  /* #__PURE__ */
  (function(_Component) {
    (0, _inheritsLoose2.default)(Ultimate, _Component);

    function Ultimate() {
      return _Component.apply(this, arguments) || this;
    }

    let _proto = Ultimate.prototype;

    _proto.render = function render() {
      return _react.default.createElement(
        'div',
        null,
        (0, _reactRouterConfig.renderRoutes)(this.props.routes),
      );
    };

    return Ultimate;
  })(_react.Component);

Ultimate.defaultProps = {};
let _default = Ultimate;
exports.default = _default;
module.exports = exports.default;
