"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = connnectToConfirm;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

function connnectToConfirm(conf) {
  return function (WrappedComponent) {
    var thisConf = Object.assign({}, {
      title: 'Actie bevestigen',
      message: 'Weet u zeker dat u deze actie wilt uitvoeren?',
      confirm: 'bestigen',
      cancel: 'annuleren'
    }, conf);

    var ConfirmConnection =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(ConfirmConnection, _Component);

      function ConfirmConnection() {
        var _this;

        _this = _Component.call(this) || this;
        _this.showModal = _this.showModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.closeModal = _this.closeModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.confirm = _this.confirm.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.renderModal = _this.renderModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.state = {
          showModal: false
        };
        return _this;
      }

      var _proto = ConfirmConnection.prototype;

      _proto.showModal = function showModal(item, action) {
        this.setState({
          showModal: true,
          item: item,
          action: action
        });
      };

      _proto.closeModal = function closeModal() {
        this.setState({
          showModal: false,
          item: null
        });
      };

      _proto.confirm = function confirm() {
        var item = Object.assign({}, this.state.item);
        this.state.action(item);
        this.closeModal();
      };

      _proto.renderModal = function renderModal() {
        return _react.default.createElement(_reactBootstrap.Modal, {
          show: this.state.showModal,
          onHide: this.closeModal
        }, _react.default.createElement(_reactBootstrap.Modal.Header, {
          closeButton: true
        }, _react.default.createElement(_reactBootstrap.Modal.Title, null, thisConf.title)), _react.default.createElement(_reactBootstrap.Modal.Body, null, thisConf.message), _react.default.createElement(_reactBootstrap.Modal.Footer, null, _react.default.createElement(_reactBootstrap.Button, {
          bsStyle: "danger",
          onClick: this.confirm
        }, thisConf.confirm), _react.default.createElement(_reactBootstrap.Button, {
          onClick: this.closeModal
        }, thisConf.cancel)));
      };

      _proto.render = function render() {
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.props, {
          showModal: this.showModal,
          closeModal: this.closeModal
        }), this.renderModal());
      };

      return ConfirmConnection;
    }(_react.Component);

    return ConfirmConnection;
  };
}

module.exports = exports["default"];