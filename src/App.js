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
            actives: [],
            editInDepth: false
        }
        this._sideBarClick = this._sideBarClick.bind(this);
        this._editInDepth = this._editInDepth.bind(this);
    }

    _editInDepth() {
        let editInDepth = !this.state.editInDepth;
        this.setState({editInDepth})
    }

    _sideBarClick(ob) {
        let actives = _hierarchyIterator(ob).filter((el) => el).reverse().concat(ob);
        this.setState({actives});
    }

    componentDidMount() {
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
            this.setState({mainObjects})
        }).catch(console.error.bind(console))
    }

    render() {
        return ( < div className = "App" > <Header/> < div className = 'container' > <div className='col-md-3' style={{
            'height': window.innerHeight - 150,
            'overflow': 'auto',
            'borderRight': '1px solid rgb(84, 84, 84)'
        }}>
            <Sidebar dictionary={this.state.mainObjects} actives={this.state.actives} handleClick={this._sideBarClick} iteration={0}/>
        </div> < div className = 'col-md-9' style = {{'height':window.innerHeight-150, 'overflow':'auto'}} > {
            this.state.actives[0]
                ? <Branch actives={this.state.actives} handleClick={this._sideBarClick} editInDepth={this.state.editInDepth} editInDepthClick={this._editInDepth}/>
                : <Home/>
        } < /div>

        </div > {
            this.state.mainObjects.length > 0
                ? (
                    <p>greater than 0</p>
                )
                : <p>Please wait while the Dynamo Dictionary Loads...</p>
        } < /div>
    )
  }
}

export default App;
