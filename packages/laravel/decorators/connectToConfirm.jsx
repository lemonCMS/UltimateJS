import React, {Component} from 'react';

import {Modal, Button} from 'react-bootstrap';

export default function connnectToConfirm(conf) {
  return (WrappedComponent) => {

    const thisConf = Object.assign({}, {
      title: 'Actie bevestigen',
      message: 'Weet u zeker dat u deze actie wilt uitvoeren?',
      confirm: 'bestigen',
      cancel: 'annuleren'
    }, conf);

    class ConfirmConnection extends Component {

      constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.confirm = this.confirm.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.state = {
          showModal: false
        };
      }

      showModal(item, action) {
        this.setState({showModal: true, item: item, action: action});
      }

      closeModal() {
        this.setState({showModal: false, item: null});
      }

      confirm() {
        const item = Object.assign({}, this.state.item);
        this.state.action(item);
        this.closeModal();
      }

      renderModal() {
        return (
          <Modal show={this.state.showModal}
            onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{thisConf.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {thisConf.message}
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="danger"
                onClick={this.confirm}>{thisConf.confirm}</Button>
              <Button onClick={this.closeModal}>{thisConf.cancel}</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            showModal={this.showModal}
            closeModal={this.closeModal}
          >
            {this.renderModal()}
          </WrappedComponent>

        );
      }
    }

    return ConfirmConnection;
  };
}
