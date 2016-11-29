import React from 'react';
import path from 'path';
import ExampleOutline from './exOutline';

function ExampleFile(props) {
  let node = props.node;
    return (
      <div>
        <div className = 'inDepth'>
          <b>In Depth:</b> &nbsp;&nbsp;&nbsp;
          <img height="15px" width="20px" src="images/icons/edit.svg" id="editButton" className="edB" style={{"opacity":" 0.25"}} />
          <br/>
          <br/>
          <pre id="inDepthDescription" style={{"color": "gray"}}>{node.inDepth}</pre>
          <br/>
          <hr/>
        </div>
        <div className = 'exampleFile'>
        <ExampleOutline node = {node}/>
        </div>
      </div>
    )
}

export default ExampleFile;
