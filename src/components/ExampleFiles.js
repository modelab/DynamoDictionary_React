import React from 'react';
import path from 'path';

import DownloadButton from './DownloadButton';
import EditButton_Files from './EditButton_Files';
import ExampleImage from './ExampleImage';
import ModeModal from './ModeModal';
import ExampleFile_Lightbox from './ExampleFile_Lightbox';
import ExampleFile from './ExampleFile';
import ExampleAdd from './ExampleAdd';

class ExampleFiles extends React.Component {
    constructor() {
        super();
        this.state = {
            modalOpen:false,
            lightboxOpen : false,
            imgPaths:[],
            dynPaths:[],
            nodeName:'',
            index : 0
        }
        this._turnOnModal = this._turnOnModal.bind(this);
        this._turnOffModal = this._turnOffModal.bind(this);
        this._openLightbox = this._openLightbox.bind(this);
        this._closeLightbox = this._closeLightbox.bind(this);

        this._getExamplePaths = this._getExamplePaths.bind(this);
        this._readImg = this._readImg.bind(this);
        this._readDyn = this._readDyn.bind(this);
    }
    _openLightbox(){
      this.setState({lightboxOpen: true})
    }
    _closeLightbox(){
      this.setState({lightboxOpen: false})
    }

    _turnOnModal(index){
      this.setState({modalOpen:true, index})
    }
    _turnOffModal(){
      this.setState({modalOpen:false})
    }

    _readImg(e,r) {
      let reader = new window.FileReader();
      let file = e.target.files[0];

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        }
        reader.onloadend = function () {
            let im = this.props.node.imageFile[this.state.index];
            im={'name':file.name, 'data':reader.result, 'og':im.og || im };
            this.props.node.imageFile[this.state.index]=im;
            this.props.node.overrides = true;
            // this.componentDidUpdate();
        }.bind(this)

    }

    _readDyn(e,r) {
      let node = this.props.node;

      let reader = new window.FileReader();
      let file = e.target.files[0];

        if (file) {
            reader.readAsText(file); //reads the data as a URL
        }
        reader.onloadend = function () {
            let dyn = this.props.node.dynFile[this.state.index];
            dyn={'name':file.name, 'data':reader.result, 'og':dyn.og || dyn };
            this.props.node.dynFile[this.state.index]=dyn;
            this.props.node.overrides = true;
            this.setState({dynPaths :this.props.node.dynFile})
        }.bind(this)

    }

    _getExamplePaths(){
      let node = this.props.node;
      let images = [];
      let dyns = [];

      node.dynFile.forEach((f, i) =>{
        images.push(_img(node,i));
        dyns.push(_dyn(node,i));
      })
      this.setState({imgPaths:images, dynPaths:dyns, nodeName:node.Name})

      function _img(subnode,i) {
        let imagePath = subnode.imageFile[i].data || `./${path.join('data', 'Examples', subnode.Categories.join('/'), subnode.Group, 'img', `${subnode.imageFile[i]}.jpg`)}`
        return imagePath;
      }

      function _dyn(subnode, i) {
        let dynPath = subnode.dynFile[i].og || `./${path.join('data', 'Examples', subnode.Categories.join('/'), subnode.Group, 'dyn', `${subnode.dynFile[i]}.dyn`)}`
        return dynPath.toString();
      }
    }

    componentDidMount(){
      this._getExamplePaths();
    }
    componentDidUpdate(){
      let node = this.props.node;
      if(node.Name!=this.state.nodeName || node.overrides){
        node.overrides=null;
        this._getExamplePaths();
      }

    }


    render(){
        let node = this.props.node;
          return (
              (node.dynFile && node.dynFile.length > 0)
                  ? (
                      <div>
                          Example File{node.dynFile.length > 1
                              ? 's'
                              : null}:
                          <br/>
                          <br/>
                        {
                          node.dynFile.map((f, i) =>
                          <ExampleFile node={node} key = {i} index = {i} turnOnModal = {this._turnOnModal} openLightbox = {this._openLightbox} dynPaths={this.state.dynPaths} imgPaths = {this.state.imgPaths}/>
                        )
                      }
                      {this.state.modalOpen ? <ModeModal readImg = {this._readImg} readDyn = {this._readDyn} turnOffModal={this._turnOffModal} node = {node} index={this.state.index}/> : null}
                      {this.state.lightboxOpen ? <ExampleFile_Lightbox imgPaths = {this.state.imgPaths} isOpen = {true} closeHandle = {this._closeLightbox}/> : null}
                      <ExampleAdd />
                      </div>
                  )
                  : <div/>
          )
        }
}

export default ExampleFiles;
