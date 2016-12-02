import React from 'react';
import path from 'path';

import DownloadButton from './DownloadButton';
import EditButton_Files from './EditButton_Files';
import ExampleImage from './ExampleImage';
import ModeModal from './ModeModal';
import ExampleFile_Lightbox from './ExampleFile_Lightbox';
class ExampleOutline extends React.Component {
    constructor() {
        super();
        this.state = {
            modalOpen:false,
            lightboxOpen : false,
            imgPaths:[],
            dynPaths:[],
            nodeName:''
        }
        this._turnOnModal = this._turnOnModal.bind(this);
        this._turnOffModal = this._turnOffModal.bind(this);
        this._openLightbox = this._openLightbox.bind(this);
        this._closeLightbox = this._closeLightbox.bind(this);

        this._getExamplePaths = this._getExamplePaths.bind(this);
    }
    _openLightbox(){
      this.setState({lightboxOpen: true})
    }
    _closeLightbox(){
      this.setState({lightboxOpen: false})
    }

    _turnOnModal(){
      this.setState({modalOpen:true})
    }
    _turnOffModal(){
      this.setState({modalOpen:false})
    }
    _getExamplePaths(){
      let node = this.props.node;
      let images = [];
      let dyns = [];
      this.props.node.dynFile.forEach((f, i) =>{
        images.push(_img(node,i));
        dyns.push(_dyn(node,i));
      })
      this.setState({imgPaths:images, dynPaths:dyns, nodeName:node.Name})
      function _img(node,i) {
        let imagePath = `./${path.join('data', 'Examples', node.Categories.join('/'), node.Group, 'img', `${node.imageFile[i]}.jpg`)}`
        return imagePath;
      }

      function _dyn(node, i) {
        let dynPath = `./${path.join('data', 'Examples', node.Categories.join('/'), node.Group, 'dyn', `${node.dynFile[i]}.dyn`)}`
        return dynPath.toString();
      }
    }
    componentDidMount(){
      this._getExamplePaths();
    }
    componentDidUpdate(){
      let node = this.props.node;
      if(node.Name!=this.state.nodeName){
        this._getExamplePaths();
      }

    }


    render(){
        let node = this.props.node;
          return (
              (node.dynFile && node.dynFile.length) > 0
                  ? (
                      <div>
                          Example File{node.dynFile.length > 1
                              ? 's'
                              : null}:
                          <br/>
                          <br/> {node.dynFile.map((f, i) => <div className='exSample' style={{
                              'display': 'inline-block'
                          }} key={i}>
                              <div className='exIcons'>
                                  <text style={{
                                      'opacity': '0.45',
                                      'paddingRight': '20px'
                                  }}>
                                      {f}
                                  </text>
                                  <DownloadButton node={node} dynPath={this.state.dynPaths[i]}/>
                                  <EditButton_Files node={node} turnOnModal = {this._turnOnModal}/>
                              </div>
                              <ExampleImage imageSrc = {this.state.imgPaths[i]} index={i} handleClick = {this._openLightbox}/>

                          </div>
                        )
                      }
                      {this.state.modalOpen ? <ModeModal turnOffModal={this._turnOffModal} node = {node}/> : null}
                      {this.state.lightboxOpen ? <ExampleFile_Lightbox imgPaths = {this.state.imgPaths} isOpen = {true} closeHandle = {this._closeLightbox}/> : null}
                      </div>
                  )
                  : <div/>
          )
        }
}

export default ExampleOutline;
