import React, {Component} from 'react';

// import './App.css';

import './css/font.css';
// import './css/modal.css';
import './css/style.css';
import baseData from './components/entry';
import interop from './components/utils/interop';

import Home from './components/home';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Branch from './components/branch';

import {flatten, flattenHierarchy, arraysEqual} from './components/utils/array';

class AppContainer extends Component {
    constructor() {
        super();
        this.state = {
            mainObjects: [],
            actives:[],
            editInDepth:false
        }
        this._sideBarClick=this._sideBarClick.bind(this);
        this._editInDepth=this._editInDepth.bind(this);
    }

    _editInDepth(){
      console.log('trig')
      let editInDepth = !this.state.editInDepth;
      this.setState({editInDepth})
    }

    _sideBarClick(ob){
       let actives = _hierarchyIterator(ob).filter((el)=>el).reverse().concat(ob);
      this.setState({actives});
    }

    componentDidMount() {
        baseData.then((res, rej) => {

          //convert xml element to javascript object
          let dynLib = interop.xmlToJson(res[0]);
          let mainObjects = interop.createObject(dynLib);


          let nodeArray = flatten(mainObjects.map((d)=>flattenHierarchy(d)));
          res[1].forEach((d)=>{
            // if(d.dynFile.length>0){
              nodeArray.forEach((e)=>{
                if(e.Name==d.Name){
                  if(arraysEqual(e.Categories,d.categories)){
                    //this means json equality to xml nodeArray
                    e.imageFile = d.imageFile;
                    e.dynFile = d.dynFile;
                    e.inDepth = d.inDepth;
                  }

                }
              })

            // }

          })
          this.setState({mainObjects})
        }).catch(console.error.bind(console))
    }

    render() {
        return(

        )
  }
}

export default AppContainer;
