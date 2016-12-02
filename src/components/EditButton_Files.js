import React from 'react';
import ModeModal from './ModeModal';
function EditButton(props) {
    let node = props.node;

    function editExampleFile(node){
      props.turnOnModal();
    }


    return (
              <img height="15px" width="20px" src="images/icons/edit.svg" style={{'float': 'right', 'opacity': '0.25'}} onClick={()=>editExampleFile(props.node)} />
        )
    }

export default EditButton;
