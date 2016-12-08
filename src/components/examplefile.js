import React from 'react';
import path from 'path';

import DownloadButton from './DownloadButton';
import EditButton_Files from './EditButton_Files';
import ExampleImage from './ExampleImage';
import ExampleFile_Lightbox from './ExampleFile_Lightbox';




function ExampleFile(props) {
      let node = props.node;
      let index = props.index;

      return (
            <div className='exSample' style={{
                'display': 'inline-block'
            }}>
                <div className='exIcons'>
                    <text style={{
                        'opacity': '0.45',
                        'paddingRight': '20px'
                    }}>
                        {node.dynFile[index].og ? node.dynFile[index].og.split('/').pop() : node.dynFile[index]}
                        {node.dynFile.length  > 1  ? ` - Ex ${index+1}` : null}
                    </text>
                    <DownloadButton node={node} dynPath={props.dynPaths[index]}/>
                    <EditButton_Files node={node} turnOnModal = {props.turnOnModal} index={index}/>
                </div>
                <ExampleImage imageSrc = {props.imgPaths[index]} index={index} handleClick = {props.openLightbox}/>
            </div>
          )
}

export default ExampleFile;
