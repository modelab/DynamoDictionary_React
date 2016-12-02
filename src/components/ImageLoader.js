import React from 'react';
import FileLabel from './FileLabel';

export default function ImageLoader(props){
  return(
    <FileLabel accept ={"image/*"} label = {"Update Image File"} readFile = {props.readFile}/>
  )
}
