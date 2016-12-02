import React from 'react';
import InDepthDescription from './InDepthDescription';
import TextEditor from './TextEditor';


function InDepthSection(props) {
  let node = props.node;
  return (
      <div className = 'inDepth'>

        <b>In Depth:</b> &nbsp;&nbsp;&nbsp;
        <img height="15px" width="20px" src="images/icons/edit.svg" id="editButton" className="edB" style={{"opacity":" 0.25"}}
          onClick = {props.editInDepthClick}
          />

        <TextEditor node = {node} editInDepth={props.editInDepth}  editInDepthClick = {props.editInDepthClick}/>
          {/*}<InDepthDescription editInDepth = {props.editInDepth} editInDepthClick = {props.editInDepthClick} node = {node}/>*/}

        <hr/>

      </div>
  )
}

export default InDepthSection;
