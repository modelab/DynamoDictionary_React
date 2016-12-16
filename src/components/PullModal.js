import React, {Component} from 'react';
import NodeIcon from './nodeicon';
import ImageLoader from './ImageLoader';
import DynLoader from './DynLoader';

import CircularProgress from 'material-ui/CircularProgress';



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
                <ModalTitle>{this.props.phase !='committing' ? 'Pull Request':'Add Commit'}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <br/>
                <br/>
                <div style={{'textAlign':'center', 'verticalAlign':'middle'}}>

                {this.props.phase != 'logging' && this.props.phase != 'created'  ? <span className = "graytext">You have updated {this.props.fileCount} file{this.props.fileCount != 1 ? 's':null}. </span> : this.props.phase == 'created' ? <span className='graytext'>Linked to Repo! Click on the link in the top right to access on Github</span>:null}
                </div>
                {this.props.phase=='init'?  <div style={{'textAlign':'center', 'verticalAlign':'middle'}}>
                <br/>
                <span className = "graytext">Create or select a <a href='https://guides.github.com/introduction/flow/' target="_blank">branch</a> by typing in the name below. </span>
                <br/>
                <br/>
            <input type="text" style={{'backgroundColor':'rgb(34,34,34)', 'borderWidth':'1px','borderRadius':'4px', 'padding':'5px','textAlign':'center','width':'60%'}} onChange = {this.props.branchInput}/>
            <br/>
            <br/>
            <br/>
            <span className = "graytext">Add a git <a href='https://www.atlassian.com/git/tutorials/saving-changes/git-commit' target="_blank">commit</a> message by typing in the name below. </span>
            <br/>
            <br/>
            <input type="text" style={{'backgroundColor':'rgb(34,34,34)', 'borderWidth':'1px','borderRadius':'4px', 'padding':'5px','textAlign':'center','width':'60%'}} onChange = {this.props.commitInput}/>

            </div>: this.props.phase=='logging' ? <div style={{'textAlign':'center'}}><CircularProgress size={110} thickness={10} color = {'white'}/></div> : null}
                <br/>
                <br/>
              </ModalBody>
              {this.props.phase!='created' && this.props.phase != 'logging'?
              <ModalFooter>
                <button className='btn btn-default' onClick={this.props.hideModal}>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={this.props.submit}>
                  {this.props.phase !='committing' ? 'Submit PR':'Add Commit'}
                </button>
              </ModalFooter>
              : null}
            </Modal>
          </div>
        )
    }
}



export default ModeModal;
