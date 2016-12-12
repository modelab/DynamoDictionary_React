import React, {Component} from 'react';
import $ from 'jquery';
import JsSearch from 'js-search'
import axios from 'axios';
import Github from 'github-api';

import {browserHistory} from 'react-router';
// var Scroll  = require('react-scroll');
// import './App.css';

import './css/font.css';
// import './css/modal.css';
import './css/style.css';
import baseData from './components/entry';
import interop from './components/utils/interop';
import GH from './components/utils/GitHubApi';

import Header from './components/header';
import Sidebar from './components/sidebar';
import Branch from './components/branch';
import SearchBar from './components/SearchBar';

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
            searchVal: '',
            route: ''
        }
        this._sideBarClick = this._sideBarClick.bind(this);
        this._editInDepth = this._editInDepth.bind(this);
        this._searchBar = this._searchBar.bind(this);
        this._routeSelect = this._routeSelect.bind(this);
        this._hashCheck = this._hashCheck.bind(this);
        this._resetActives = this._resetActives.bind(this);
        this._gitHubSubmit = this._gitHubSubmit.bind(this);
    }

    _editInDepth() {
        let editInDepth = !this.state.editInDepth;
        this.setState({editInDepth})
    }

    _gitHubSubmit() {
        // console.log('logging')
        // console.log(this.state.searchArray)

        let saveJson = this.state.searchArray.map((d) => {
            let {
                Name,
                imageFile,
                dynFile,
                Categories,
                Group,
                inDepth
            } = d;
            return {
                Name,
                imageFile,
                dynFile,
                folderPath:Categories.concat(Group).join('/'),
                inDepth
            }
        })
        // console.log(saveJson)

        axios.get('./configuration/config.json').then((resolve, reject) => {
            const token = resolve.data.GitHub_Token;
            // This is a personal access token, not using oAuth.
            // Currently this is under ramramps.  We have  to create
            // a generic user id and add to Github collobrator.
            // Add the token to a config file and put it in S3. Do not share the token
            const github = new Github({token});
            //step 1: Create the branch
            //TO DO : Generate unique name for the branch
            const repo = github.getRepo("ekatzenstein", "DynamoDictionary_React");
            var pull;

            const branchName = 'testing_do_not_merge'+Math.random();

            let branch_create = new Promise((resolve,reject)=>{
              repo.createBranch("master", branchName,function(){
                resolve();
              })
            })
            //
            //
            //
            //
            branch_create.then((res)=>{
              repo.writeFile(branchName,'public/data/Dynamo_Nodes_Documentation.json',JSON.stringify(saveJson,null,4),'',{},()=>{console.log('test')})
            })



        })
    }

    _searchBar(val) {
        // browserHistory.push(`/search/${val}`)
        var search = new JsSearch.Search('Name');
        search.addIndex('Name');
        search.addIndex('CategorySearch');
        search.addIndex('inDepth');
        search.addIndex('Description');
        search.addIndex('FullCategoryName');
        search.addDocuments(this.state.searchArray);

        let arr = (search.search(val));
        this.setState({searching: true, searchResults: arr, searchVal: val})
    }
    _routeSelect(route) {
        // console.log(route)
    }

    _sideBarClick(ob) {
        let actives = _hierarchyIterator(ob).filter((el) => el).reverse().concat(ob);
        this.setState({actives, searching: false});
    }
    _resetActives() {
        this.setState({actives: []});
    }
    componentDidUpdate() {
        // console.log(this.props)
        // console.log('props',this.props.params,this.state.route)
        const routePath = this.props.location.pathname;
        // console.log('path',routePath)
        if (routePath !== this.state.route) {

            this.setState({route: this.props.location.pathname, searching: false})
            let rightdiv = document.getElementById('page-content-wrapper');
            if (rightdiv) {
                rightdiv.scrollTop = 0;
            }
            if (true) {
                const r = this.props.params;
                const allkeys = Object.keys(r).sort();
                // console.log(routePath)

                const actives = recursiveActives(this.state.mainObjects, 0) || [];

                function recursiveActives(arr, it) {
                    return arr.map(d => {
                        if (d.Name === r[allkeys[it]]) {
                            if (d.Arr && allkeys.length > it + 1) {
                                return ([d].concat(recursiveActives(d.Arr, it + 1)))
                            } else {
                                return ([d])
                            }
                        }
                    }).filter(el => el)[0];
                }
                // if (actives.length > 0) {
                this.setState({actives})
                // }
            } else {
                console.log('searching')
                this.setState({searching: false})
                // this.conductSearch(this.props.params['catB']);
            }
        }
    }
    _conductSearch(val) {
        var search = new JsSearch.Search('Name');
        search.addIndex('Name');
        search.addIndex('CategorySearch');
        search.addIndex('inDepth');
        search.addIndex('Description');
        search.addIndex('FullCategoryName');

        search.addDocuments(this.props.searchArray);

        let arr = (search.search(val));
        this.props.searching(arr, val);
    }
    _hashCheck() {}

    componentDidMount() {

        // componentDidMount(){

        // }
        // document.getElementById('rightbar').scrollTop = 0;
        baseData.then((res, rej) => {
            // console.log(res1)
            //convert xml element to javascript object
            let dynLib = interop.xmlToJson(res[0]);
            let mainObjects = interop.createObject(dynLib);

            let nodeArray = flatten(mainObjects.map((d) => flattenHierarchy(d)));
            nodeArray.forEach((e) => {
                // if(e.Name.includes('N')){console.log(e.Name)}
            })
            let searchArray = nodeArray
            searchArray.forEach((d, i) => {

                d.ogName = d.Name;
                d.inDepth = d.inDepth || `Add in-depth information about ${d.Name}...`;
                if (i > 0 && d.Name == searchArray[i - 1].Name) {
                    d.TempName = d.Name + ' (' + (d.Inputs
                        ? d.Inputs.map(e => e.Name).join(', ')
                        : '()') + ')';
                    if (!searchArray[i - 1].TempName) {
                        searchArray[i - 1].TempName = searchArray[i - 1].Name + ' (' + (searchArray[i - 1].Inputs
                            ? searchArray[i - 1].Inputs.map(e => e.Name).join(', ')
                            : '()') + ')';
                    }
                }
            })
            searchArray.forEach((d, i) => {
                if (d.TempName) {
                    d.Name = d.TempName
                }
                if (d.Name == 'NormalizeDepth (list, rank)') {
                    console.log(d)
                }
            })

            res[1].forEach((d) => {

                // if(d.dynFile.length>0){
                nodeArray.forEach((e) => {

                    if (e.Name == d.Name) {

                        if(d.Name.indexOf('&&')!=-1){console.log('hit',d,e,d.imageFile,d.imageFile.slice())}
                        if (e.Categories.concat(e.Group).join('/')===d.folderPath) {

                            //this means json equality to xml nodeArray

                            e.imageFile = d.imageFile.slice();
                            // if(d.Name=='IsAlmostEqualTo'){console.log(d,e, d.imageFile,e.imageFile)}
                            e.dynFile = d.dynFile.slice();

                            e.inDepth = d.inDepth;

                        }

                    }
                })

                // }

            })

            // searchArray.forEach((d,i)=>{
            //   d.inDepth = d.inDepth || `Add in-depth information about ${d.Name}...`;
            //   if(i>0 && d.Name==searchArray[i-1].Name){
            //     d.TempName = d.Name+' ('+(d.Inputs?d.Inputs.map(e=>(e.Name+' ' +e.Type)).join(', '):'()') +')';
            //     if(!searchArray[i-1].TempName){
            //       searchArray[i-1].TempName = searchArray[i-1].Name+' ('+(searchArray[i-1].Inputs?searchArray[i-1].Inputs.map(e=>e.Name).join(', '):'()') +')';
            //     }
            //   }
            // })
            this.setState({mainObjects, searchArray})

        }).catch(console.error.bind(console))
    }

    render() {
        return (this.state.route !== ''
            ? ( < div className = "App" > <Header searching={this._searchBar} searchArray={this.state.searchArray} gitHubSubmit={this._gitHubSubmit}/> < div className = 'col-md-3 col-sm-12 col-xs-12 clearfix' style = {{"zIndex":"999", "marginTop":"2px", "paddingLeft":"0px", "paddingRight":"0px", "clear":"right"}} > <SearchBar searchArray={this.state.searchArray} searching={this._searchBar} resetActives={this._resetActives}/> < /div>


  < div id = "wrapper" style = {{'marginTop':'60px'}} >

           < div id = 'sidebar-wrapper' className = 'left-element' style={{"maxHeight":window.innerHeight-60+'px'}} >

        <br/ > <ul className="sidebar-nav" style={{
                'marginTop': '45px'
            }}>

                <Sidebar dictionary={this.state.mainObjects} actives={this.state.actives} handleClick={this._sideBarClick} iteration={0}/>
            </ul> < br /> <br/> < /div>
        <div id="page-content-wrapper" className='right-element' style={{"overflow":"auto", "maxHeight":window.innerHeight-60+'px'}}>
          <div className='container-fluid'>
            <div className='row'>
              <div className = 'col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                {
               <Branch actives={this.state.actives}
                 handleClick={this._sideBarClick}
                 editInDepth={this.state.editInDepth}
                 editInDepthClick={this._editInDepth}
                 searching={this.state.searching}
                 searches={this.state.searchResults}
                 searchVal={this.state.searchVal}
                 routeSelect = {this._routeSelect}
               / >
    } < /div>
             </div > </div> < /div>
       </div > </div >) : null)

}
}

export default App;
