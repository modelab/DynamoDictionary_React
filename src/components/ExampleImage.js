import React from 'react';
import path from 'path';


function ExampleImage (props) {
    return(
      <div>
        <img src={props.imageSrc} width="100%" alt="''" data-jslghtbx="" data-jslghtbx-index="0" onClick = {props.handleClick}/>
        </div>
    )
}

export default ExampleImage;
