import React from 'react';

export default function FileLabel(props){
  return(
    <label>{props.label}<input type="file" accept={props.accept} style={{'display':'none'}} onChange={props.readFile}/></label>
  )
}
