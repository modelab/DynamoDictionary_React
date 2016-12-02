import React, {Component} from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class ModeModal extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: true
        }
    }
    openModal = () => {
      this.setState({
        isOpen: true
      });
    };

    hideModal = () => {
      this.setState({
        isOpen: false
      });
      this.props.turnOffModal();
    };

    render() {
        return (
          <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>{this.props.node.Name}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
                explicabo hic incidunt placeat quasi repellendus soluta,
                vero. Autem delectus est laborum minus modi molestias
                natus provident, quidem rerum sint, voluptas!</p>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Close
              </button>
              <button className='btn btn-primary'>
                Save changes
              </button>
            </ModalFooter>
          </Modal>
        )
    }
}

export default ModeModal;
