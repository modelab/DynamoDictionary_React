import React from 'react';

function DownloadButton(props) {
    let node = props.node;
    return (
            <a href = {props.dynPath} download>
              <img height="15px" width="20px" src="images/icons/download.svg" style={{'float': 'right', 'opacity': '0.25'}}/>
            </a>
        )
    }
    
export default DownloadButton;
