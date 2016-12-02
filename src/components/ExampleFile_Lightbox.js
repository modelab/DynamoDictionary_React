import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

class ExampleFile_Lightbox extends Component {
  constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: true
        };
        this.closeLightbox = this.closeLightbox.bind(this);
    }
    closeLightbox(){
      this.setState({ isOpen: false })
      this.props.closeHandle();
    }
    render(){
      const images = this.props.imgPaths;
      const {
            photoIndex,
            isOpen,
        } = this.state;

          return (
              <div>
                    props.isOpen ?
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={this.closeLightbox}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })}
                        />
                        ?
                        null
                        </div>
        )
    }
}

export default ExampleFile_Lightbox;
