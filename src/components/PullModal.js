import React, {Component} from 'react';
import NodeIcon from './nodeicon';
import ImageLoader from './ImageLoader';
import DynLoader from './DynLoader';


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
        this._hideModal = this._hideModal.bind(this);
        this._submitModal = this._submitModal.bind(this);
    }


    _hideModal = () => {
      if((!this.props.modeDyn || !this.props.modeImg) && this.props.forceBoth){
        this.props.node.dynFile.pop();
        this.props.node.imageFile.pop();
      }
      else{
        if(this.props.modeImg){
          let im = this.props.node.imageFile[this.props.index];
          im.data = (im.data && im.og) ? im.og : im.data;
        }
        if(this.props.modeDyn){
          let dyn = this.props.node.dynFile[this.props.index];
          dyn.data = (dyn.data && dyn.og) ? dyn.og : dyn.data;
        }
      }

      this.setState({
        isOpen: false
      });

      this.props.turnOffModal();
    };

    _submitModal = (e) => {
      let ims = this.props.node.imageFile;
      if((!this.props.modeDyn || !this.props.modeImg) && this.props.forceBoth){
        alert('Error: please submit image file and dynamo file to create a new example file!')
      }
      else{
        // let isImage = (ims[ims.length-1].data && ims[ims.length-1].data.indexOf('data:image')===-1);

        this.setState({
          isOpen: false
        });
        this.props.turnOffModal();
      }
    }



    render() {
        return (
          <div>
            <Modal isOpen={this.state.isOpen} onRequestHide={this.props.hideModal}>
              <ModalHeader>

                <ModalTitle>{this.props.phase ==='init' ? 'Pull Request':'Add New Commit'}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <br/>
                <br/>
                <div style={{'textAlign':'center', 'verticalAlign':'middle'}}>
                <span className = "graytext">You have updated {this.props.fileCount} file{this.props.fileCount > 1 ? 's':null}. </span>
                <br/>
                <span className = "graytext">Create or select a <a href='https://guides.github.com/introduction/flow/' target="_blank">branch</a> by typing in the name below. </span>
                <br/>
                <br/>
                <span className='graytext' style={{'color':'white'}}>Branch Name &nbsp;&nbsp;</span>
                <input type="text" style={{'backgroundColor':'rgb(34,34,34)', 'borderWidth':'1px','borderRadius':'4px', 'padding':'5px','textAlign':'center','width':'60%'}} onChange = {this.props.branchInput}/>
                </div>
                <br/>
                <br/>
              </ModalBody>
              <ModalFooter>
                <button className='btn btn-default' onClick={this.props.hideModal}>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={this.props.submit}>
                  {this.props.phase ==='init' ? 'Submit PR':'Submit Commit'}
                </button>
              </ModalFooter>
            </Modal>
          </div>
        )
    }
}

export default ModeModal;
