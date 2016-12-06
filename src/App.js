import React, {Component} from 'react';
import $ from 'jquery';
// var Scroll  = require('react-scroll');
// import './App.css';

import './css/font.css';
// import './css/modal.css';
import './css/style.css';
import baseData from './components/entry';
import interop from './components/utils/interop';

import Header from './components/header';
import Sidebar from './components/sidebar';
import Branch from './components/branch';

import {flatten, flattenHierarchy, arraysEqual} from './components/utils/array';

function _hierarchyIterator(ob) {
    if (ob && ob.Parent != 'Home') {
        return [ob.Parent].concat(_hierarchyIterator(ob.Parent)).filter((el) => el)
    } else {
        return [];
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = {
            mainObjects: [],
            searchArray:[],
            actives: [],
            editInDepth: false,
            searching:false,
            searchResults:[],
            searchVal:''
        }
        this._sideBarClick = this._sideBarClick.bind(this);
        this._editInDepth = this._editInDepth.bind(this);
        this._searchBar = this._searchBar.bind(this);
    }

    _editInDepth() {
        let editInDepth = !this.state.editInDepth;
        this.setState({editInDepth})
    }

    _searchBar(arr,searchVal){
      this.setState({searching:true, searchResults:arr, searchVal})
    }

    _sideBarClick(ob) {
        let actives = _hierarchyIterator(ob).filter((el) => el).reverse().concat(ob);
        this.setState({actives, searching:false});

    }
    componentDidUpdate(){
      // $('#rightbar').animate({scrollTop:0})
      document.getElementById('rightbar').scrollTop = 0;

    }
    componentDidMount() {
      // document.getElementById('rightbar').scrollTop = 0;
        baseData.then((res, rej) => {

            //convert xml element to javascript object
            let dynLib = interop.xmlToJson(res[0]);
            let mainObjects = interop.createObject(dynLib);

            let nodeArray = flatten(mainObjects.map((d) => flattenHierarchy(d)));
            res[1].forEach((d) => {
                // if(d.dynFile.length>0){
                nodeArray.forEach((e) => {
                    if (e.Name == d.Name) {
                        if (arraysEqual(e.Categories, d.categories)) {
                            //this means json equality to xml nodeArray
                            e.imageFile = d.imageFile;
                            e.dynFile = d.dynFile;
                            e.inDepth = d.inDepth;
                        }

                    }
                })

                // }

            })
            let searchArray = nodeArray

            this.setState({mainObjects, searchArray})

        }).catch(console.error.bind(console))
    }

    render() {

        return ( < div className = "App" > <Header searching = {this._searchBar} searchArray = {this.state.searchArray}/> < div className = 'container' > <div className='col-md-3 col-sm-2 hidden-xs' style={{
            'height': window.innerHeight - 150,
            'overflow': 'auto',
            'borderRight': '1px solid rgb(84, 84, 84)'
        }}>
            <Sidebar dictionary={this.state.mainObjects} actives={this.state.actives} handleClick={this._sideBarClick} iteration={0}/>
        </div> < div id='rightbar' className = 'col-md-9 col-sm-10' style = {{'height':window.innerHeight-150, 'overflow':'auto'}} > {
             <Branch actives={this.state.actives} handleClick={this._sideBarClick} editInDepth={this.state.editInDepth} editInDepthClick={this._editInDepth}
                searching={this.state.searching}
                searches={this.state.searchResults}
                searchVal={this.state.searchVal}
                />
        } < /div>

        </div > {
            // this.state.mainObjects.length > 0
            //     ? (
            //         <p>greater than 0</p>
            //     )
            //     : <p>Please wait while the Dynamo Dictionary Loads...</p>
        }
        < /div>
    )
  }
}

export default App;
