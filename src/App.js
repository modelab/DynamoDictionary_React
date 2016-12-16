import React, {Component} from 'react';
import $ from 'jquery';
import JsSearch from 'js-search'
import axios from 'axios';
// import Github from 'github-api';
import Octokit from 'octokit';
import path from 'path';
import P from 'bluebird';
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
import PullModal from './components/PullModal';

import {flatten, flattenHierarchy, arraysEqual} from './components/utils/array';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



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
            route: '',
            updatedFiles: [],
            prModalOpen: false,
            prState:'init',
            branchName:'user-'+ Date.now().toString(),
            mainEdit:false,
            prLink:'https://github.com/ekatzenstein/DynamoDictionary_React',
            commitMessage:'no commit message'
        }
        this._sideBarClick = this._sideBarClick.bind(this);
        this._editInDepth = this._editInDepth.bind(this);
        this._searchBar = this._searchBar.bind(this);
        this._routeSelect = this._routeSelect.bind(this);
        this._hashCheck = this._hashCheck.bind(this);
        this._resetActives = this._resetActives.bind(this);
        this._gitHubSubmit = this._gitHubSubmit.bind(this);
        this._updateExample = this._updateExample.bind(this);
        this._showPrModal = this._showPrModal.bind(this);
        this._hidePrModal = this._hidePrModal.bind(this);
        this._writeBranchName = this._writeBranchName.bind(this);
        this._writeCommitMessage = this._writeCommitMessage.bind(this);
        this._submitPR = this._submitPR.bind(this);
        this._retrieve = this._retrieve.bind(this);
        this._toCommitting = this._toCommitting.bind(this);
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    _retrieve(url){
      if(url){
        this.setState({prState:'created', prLink:url})
      }else{
        this.setState({prState:'created'})
      }



      window.setTimeout(this._toCommitting,3000);
    }
    _toCommitting(){
      this.setState({prState:'committing'})
      this._hidePrModal()
    }
    _showPrModal() {
        this.setState({prModalOpen: true})
    }
    _hidePrModal() {
        this.setState({prModalOpen: false})
    }
    _writeBranchName(event){
      event.preventDefault();
      let bn = event.target.value.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "-")
      bn = bn ==='master' ? 'user-'+bn : bn;

      this.setState({branchName:bn});
    }
    _writeCommitMessage(event){
      event.preventDefault();
      this.setState({commitMessage:event.target.value != '' ? event.target.value :'no commit message'});
    }
    _submitPR(){
      this.setState({prState:'logging'})
      this._gitHubSubmit();
    }

    _editInDepth() {
        let editInDepth = !this.state.editInDepth;
        this.setState({editInDepth, mainEdit:true})
    }

    _updateExample(file) {
        this.setState({
            updatedFiles: [
                ...this.state.updatedFiles,
                file
            ]
        })
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
            imageFile = imageFile.map((im) => {
                return im.original || im;
            })
            dynFile = dynFile.map((dyn) => {
                return dyn.original || dyn;
            })
            return {Name, imageFile, dynFile, folderPath: Categories.concat(Group).join('/'), inDepth}
        })
        // console.log(saveJson)

        axios.get('./configuration/config.json').then((resolve, reject) => {
          console.log(this.state.branchName,'alsnfjdk')
            const token = resolve.data.GitHub_Token;
            window.runTest(token, [...this.state.updatedFiles], saveJson,this.state.branchName,this.state.commitMessage,this._retrieve)
            this.setState({updatedFiles: []});
            // console.log(token)
            // var gh = Octokit.new({token: token});
            // var repo = gh.getRepo('ekatzenstein', 'DynamoDictionary_React');
            // console.log(repo)
            // repo.getInfo()
            //   .then(function(repo) {console.log(repo)})
            // repo.getBranches()
            //   .then(function(branches) {console.log(branches)});
            // // This is a personal access token, not using oAuth.
            // // Currently this is under ramramps.  We have  to create
            // // a generic user id and add to Github collobrator.
            // // Add the token to a config file and put it in S3. Do not share the token
            // const github = new Github({token});
            // //step 1: Create the branch
            // //TO DO : Generate unique name for the branch
            // const repo = github.getRepo("ekatzenstein", "DynamoDictionary_React");
            // var pull;
            //
            //
            //
            // const branchName = 'testing_do_not_merge20';
            //
            // const list_branches = repo.listBranches(); //returns a promise
            //
            // const test_if_branch_exists = list_branches.then(function(res) {
            //     const branchArray = res.data.map(d => d.name);
            //     return new Promise((resolve, reject) => resolve(branchArray.indexOf(branchName) == -1))
            // })
            //
            // const branch_create = test_if_branch_exists.then(res => {
            //     if (res) {
            //         return repo.createBranch("master", branchName)
            //     } else {
            //         return () => {
            //             console.log('branch exists')
            //         };
            //     }
            // })
            //
            // const write_sample_json_file = branch_create.then((res) => {
            //   console.log('lasdnhjf')
            //       return repo.writeFile(branchName, 'public/data/Dynamo_Nodes_Documentation.json', JSON.stringify(saveJson, null, 4), '', {encode: true})
            //
            // })
            // // const pause = write_sample_json_file.then((res) => {
            // //   return window.setTimeout(function () {
            // //     console.log('pause')
            // //   }, 1000);
            // // })
            // const write_img_file = write_sample_json_file.then((res) => {
            //   console.log('hello',this.state.updateFiles)
            //     if (this.state.updatedFiles && this.state.updatedFiles.length > 0) {
            //       // let fs = this.state.updatedFiles;
            //       // let f = fs[0];
            //       // const file_path = path.join('public',f.og.slice(2)).replace("Examples","EXAMPLES");
            //       // console.log(file_path)
            //       //
            //       // repo.getSha('master',file_path,(test)=>{console.log(test)})
            //
            //       const promises = this.state.updatedFiles.map((f,i)=>{
            //           if (f.type === 'image') {
            //               const file_path = path.join('public',f.og.slice(2)).replace("Examples","EXAMPLES");
            //               return repo.writeFile(branchName, file_path, window.btoa(window.atob((f.data.replace(/^(.+,)/, '')))), '', {encode: false}).delay(1000)
            //           }
            //         })
            //
            //         // promises.forEach((f,i)=>{
            //         //   f.next = f[i+1];
            //         // })
            //         // console.log(promises)
            //         return Promise.all(promises)
            //         // return resolvePromise(promises)
            //
            //         // return promises.reduce((p,i)=>{
            //         //   return p.then(()=> ()=>{console.log('ran')});
            //         // },new Promise((res,rej)=>{res()}))
            //
            //
            //
            //         // function resolvePromise(p){
            //         //   console.log(p.next)
            //         //   p.then(res=>{p.next ? resolvePromise(p.next):console.log('hooray');})
            //         //     .catch(res=>{p.next ? resolvePromise(p.next):console.log('hooray');})
            //         // }
            //
            //     } else {
            //         return () => {
            //             console.log('inserted')
            //         }
            //     }
            // })
            // //
            // const pr_submit = write_img_file.then((res) => {
            //     // res();
            //     const pull = {
            //         title: branchName,
            //         body: "This pull request has been automatically generated by DynamoDictionaryUser.",
            //         base: "master",
            //         head: branchName
            //     };
            //     // return repo.createPullRequest(pull);
            //     return () => {
            //         console.log('branch exists')
            //     };
            // })
            // const pr_complete = pr_submit.then((res) => {
            //     console.log('saved')
            // })

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
                    // console.log(d)
                }
            })

            res[1].forEach((d) => {

                // if(d.dynFile.length>0){
                nodeArray.forEach((e) => {

                    if (e.Name == d.Name) {

                        // if(d.Name.indexOf('&&')!=-1){console.log('hit',d,e,d.imageFile,d.imageFile.slice())}
                        if (e.Categories.concat(e.Group).join('/') === d.folderPath) {

                            //this means json equality to xml nodeArray
                            e.imageFile = d.imageFile
                                ? d.imageFile.slice()
                                : [];
                            // if(d.Name=='IsAlmostEqualTo'){console.log(d,e, d.imageFile,e.imageFile)}
                            e.dynFile = d.dynFile
                                ? d.dynFile.slice()
                                : [];

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
            ? (
              <div className = "App"> <Header openModal={this._showPrModal} searching={this._searchBar} searchArray={this.state.searchArray} gitHubSubmit={this._gitHubSubmit} phase = {this.state.prState} link={this.state.prLink}/>
                <div className = 'col-md-3 col-sm-12 col-xs-12 clearfix' style = {{"zIndex":"999", "marginTop":"2px", "paddingLeft":"0px", "paddingRight":"0px", "clear":"right"}}>
                  <SearchBar searchArray={this.state.searchArray} searching={this._searchBar} resetActives={this._resetActives}/>
                </div>
                <div id = "wrapper" style = {{'marginTop':'60px'}}>
                  <div id = 'sidebar-wrapper' className = 'left-element' style={{"maxHeight":window.innerHeight-60+'px'}}>
                    <br/>
                    <ul className="sidebar-nav" style={{'marginTop': '45px'}}>
                        <Sidebar dictionary={this.state.mainObjects} actives={this.state.actives} handleClick={this._sideBarClick} iteration={0}/>
                    </ul>
                    <br/>
                    <br/>
                  </div>
                    <div id="page-content-wrapper" className='right-element' style={{"overflow":"auto", "maxHeight":window.innerHeight-60+'px'}}>
                      <div className='container-fluid'>
                        <div className='row'>
                          <div className = 'col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                             <Branch actives={this.state.actives}
                               updateExample = {this._updateExample}
                               handleClick={this._sideBarClick}
                               editInDepth={this.state.editInDepth}
                               editInDepthClick={this._editInDepth}
                               searching={this.state.searching}
                               searches={this.state.searchResults}
                               searchVal={this.state.searchVal}
                               routeSelect = {this._routeSelect}
                             / >
                         </div>
                       </div>
                     </div>
                 </div>
               </div>
               {this.state.prModalOpen ? <PullModal fileCount ={this.state.updatedFiles.length+this.state.mainEdit?1:0} hideModal = {this._hidePrModal} phase = {this.state.prState} branchInput = {this._writeBranchName} commitInput = {this._writeCommitMessage}  submit = {this._submitPR}/> : null}
           </div>
 ) : null)

}
}
App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };
export default App;
