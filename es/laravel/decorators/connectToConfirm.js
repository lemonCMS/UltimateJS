import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
export default function connnectToConfirm(conf) {
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
      _inheritsLoose(ConfirmConnection, _Component);

      function ConfirmConnection() {
        var _this;

        _this = _Component.call(this) || this;
        _this.showModal = _this.showModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.confirm = _this.confirm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.renderModal = _this.renderModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
        return React.createElement(Modal, {
          show: this.state.showModal,
          onHide: this.closeModal
        }, React.createElement(Modal.Header, {
          closeButton: true
        }, React.createElement(Modal.Title, null, thisConf.title)), React.createElement(Modal.Body, null, thisConf.message), React.createElement(Modal.Footer, null, React.createElement(Button, {
          bsStyle: "danger",
          onClick: this.confirm
        }, thisConf.confirm), React.createElement(Button, {
          onClick: this.closeModal
        }, thisConf.cancel)));
      };

      _proto.render = function render() {
        return React.createElement(WrappedComponent, _extends({}, this.props, {
          showModal: this.showModal,
          closeModal: this.closeModal
        }), this.renderModal());
      };

      return ConfirmConnection;
    }(Component);

    return ConfirmConnection;
  };
}