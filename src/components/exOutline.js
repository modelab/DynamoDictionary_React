import React from 'react';
import path from 'path';

function ExampleOutline(props) {
    let node = props.node;
    return (
          <div>
            Example File:
            <br/>
            {
              node.dynFile.map((f,i) =>
                <div className = 'exSample' style = {{'display':'inline-block'}} >
                  <div className = 'exIcons' >
                    <text style = {{'opacity': '0.45','paddingRight': '20px'  }} > {f} </text>
                    <img hspace="6" height="15px" width="20px" src="images/icons/download.svg" style={{'float': 'right', 'opacity': '0.25'}} />
                  </div>
                  {console.log(node.imageFile[i])}
                  <img src={node.imageFile[i]} width="100%" align="middle" alt="''" data-jslghtbx="" data-jslghtbx-index="0" />
                </div>
                )
            }
          </div>
        )
    }

    export default ExampleOutline;
