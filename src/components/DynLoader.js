import React from 'react';
import FileLabel from './FileLabel';

export default function DynLoader(props){
  return(
    <FileLabel accept ={".dyn"} label = {"Update Dynamo File"} readFile = {props.readFile}/>
  )
}
