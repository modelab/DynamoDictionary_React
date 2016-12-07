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
            searchArray: [],
            actives: [],
            editInDepth: false,
            searching: false,
            searchResults: [],
            searchVal: ''
        }
        this._sideBarClick = this._sideBarClick.bind(this);
        this._editInDepth = this._editInDepth.bind(this);
        this._searchBar = this._searchBar.bind(this);
        this._routeSelect = this._routeSelect.bind(this);
        this._hashCheck = this._hashCheck.bind(this);
    }

    _editInDepth() {
        let editInDepth = !this.state.editInDepth;
        this.setState({editInDepth})
    }

    _searchBar(arr, searchVal) {
        this.setState({searching: true, searchResults: arr, searchVal})
    }
    _routeSelect(route){
      console.log(route)
    }

    _sideBarClick(ob) {
        let actives = _hierarchyIterator(ob).filter((el) => el).reverse().concat(ob);
        this.setState({actives, searching: false});
    }
    componentDidUpdate() {
        // $('#rightbar').animate({scrollTop:0})
        // console.log(document.getElementById('page-content-wrapper').scrollTop)
        document.body.scrollTop = 0;
        console.log(this.props.params)

    }

    _hashCheck(){

    }



    componentDidMount() {
      // componentDidMount(){

      // }
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

        return ( < div className = "App" > <Header searching={this._searchBar} searchArray={this.state.searchArray}/> < div id = "wrapper" style = {{'marginTop':'101px'}} > < div id = 'sidebar-wrapper' className = 'left-element' > <ul className="sidebar-nav" style={{
            'paddingTop': '15px'
        }}>
            <Sidebar dictionary={this.state.mainObjects} actives={this.state.actives} handleClick={this._sideBarClick} iteration={0}/>
        </ul> < /div>
        <div id="page-content-wrapper" className='right-element'>
          <div className='container-fluid'>
            <div className='row'>
              <div className = 'col-lg-12'>
                {
               <Branch actives={this.state.actives}
                 handleClick={this._sideBarClick}
                 editInDepth={this.state.editInDepth}
                 editInDepthClick={this._editInDepth}
                 searching={this.state.searching}
                 searches={this.state.searchResults}
                 searchVal={this.state.searchVal}
                 routeSelect = {this._routeSelect}
               />
    } < /div>
             </div > </div> < /div>
       </div > </div >)
}
}

export default App;
