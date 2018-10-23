"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var Pending =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Pending, _Component);

  function Pending() {
    var _this;

    _this = _Component.call(this) || this;
    _this.pending = _this.pending.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Pending.prototype;

  _proto.pending = function pending() {
    if (this.props.state.pending === true) {
      return [_react.default.createElement("div", {
        key: "1",
        className: "pendingOverlayBackground"
      }), _react.default.createElement("div", {
        key: "2",
        className: "pendingOverlayContent"
      }, _react.default.createElement("div", {
        className: "block"
      }, _react.default.createElement("div", {
        className: "centered"
      }, _react.default.createElement("i", {
        className: "fa fa-spinner fa-pulse fa-3x"
      }))))];
    }
  };

  _proto.render = function render() {
    if (this.props.state.failed === true) {
      return _react.default.createElement("div", {
        className: "error-page text-center"
      }, _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("h2", {
        className: "error-title"
      }, "404"), _react.default.createElement("h3", {
        className: "error-subtitle"
      }, "Some bits denied your request."), _react.default.createElement("p", {
        className: "error-text center-block"
      }, "De pagina die u probeerde te bezoeken bestaat niet.")));
    }

    return _react.default.createElement("div", {
      className: 'pendingWrapper'
    }, this.pending(), this.props.children);
  };

  return Pending;
}(_react.Component);

exports.default = Pending;
module.exports = exports["default"];