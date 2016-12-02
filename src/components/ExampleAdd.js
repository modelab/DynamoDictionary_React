import React from 'react';

export default function ExampleAdd(props){
    return(
      <div style={{"paddingBottom": "25px", "color":"gray"}}
      onClick = {()=>console.log('clicky')}
      >
      <img width="50px" height="40px" src="images/icons/add.svg" style={{"opacity": "0.25"}}/>
      Add Example File
      </div>
    )
}
