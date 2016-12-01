import React from 'react';

function EditButton(props) {
    let node = props.node;
    return (
              <img height="15px" width="20px" src="images/icons/edit.svg" style={{'float': 'right', 'opacity': '0.25'}} />
        )
    }

export default EditButton;
