import React, { Component } from 'react';
import * as JsSearch from 'js-search';
import { hashHistory } from 'react-router';

import './css/font.css';
import './css/style.css';
import baseData from './components/Entry';
import interop from './components/utils/interop';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Branch from './components/Branch';
import SearchBar from './components/SearchBar';
import PullModal from './components/PullModal';

import { flatten, flattenHierarchy } from './components/utils/array';

import Drawer from 'material-ui/Drawer';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function _hierarchyIterator(ob) {
    if (ob && ob.Parent !== 'Home') {
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
            prState: 'init',
            branchName: 'user-' + Date.now().toString(),
            mainEdit: false,
            prLink: 'https://github.com/DynamoDS/DynamoDictionary',
            commitMessage: 'no commit message',
            treeOpen: true,
            minWidth: 600
        }
        this._sideBarClick = this._sideBarClick.bind(this);
        this._editInDepth = this._editInDepth.bind(this);
        this._searchBar = this._searchBar.bind(this);
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
        this._routePush = this._routePush.bind(this);
        this._toggleTree = this._toggleTree.bind(this);
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    _toggleTree() {
        this.setState({ treeOpen: !this.state.treeOpen })
    }
    _retrieve(url) {
        if (url) {
            this.setState({ prState: 'created', prLink: url, updatedFiles: [] })
        } else {
            this.setState({ prState: 'created', updatedFiles: [] })
        }
        window.setTimeout(this._toCommitting, 3000);
    }
    _toCommitting() {
        this.setState({ prState: 'committing' })
        this._hidePrModal()
    }
    _showPrModal() {
        this.setState({ prModalOpen: true })
    }
    _hidePrModal() {
        this.setState({ prModalOpen: false })
    }
    _writeBranchName(event) {
        event.preventDefault();
        let bn = event.target.value.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "-")
        bn = bn === 'master' ? 'user-' + bn : bn;

        this.setState({ branchName: bn });
    }
    _writeCommitMessage(event) {
        event.preventDefault();
        this.setState({ commitMessage: event.target.value !== '' ? event.target.value : 'no commit message' });
    }
    _submitPR() {
        this.setState({ prState: 'logging' })
        this._gitHubSubmit();
    }

    _editInDepth() {
        let editInDepth = !this.state.editInDepth;
        this.setState({ editInDepth, mainEdit: true })
    }

    _updateExample(file) {
        this.setState({
            updatedFiles: [
                ...this.state.updatedFiles,
                file
            ]
        })
    }
    _routePush(route, iteration) {
        if (this.state.route === route) {
            hashHistory.push(`${route.split('/').slice(0, iteration + 1).join('/')}`)
        }
        else {
            hashHistory.push(route)
        }

    }
    shouldComponentUpdate(nextProps, nextState) {

        if ((this.state.commitMessage !== nextState.commitMessage) || (this.state.branchName !== nextState.branchName)) {
            return false;
        }
        else {
            return true;
        }
    }

    _gitHubSubmit() {
        let saveJson = this.state.searchArray.map((d) => {
            let {
                Name,
                imageFile,
                dynFile,
                Categories,
                Group,
                inDepth
            } = d;
            imageFile = imageFile && imageFile.length > 0 && imageFile.map((im) => {
                return im.original || im;
            })
            dynFile = dynFile && dynFile.length > 0 && dynFile.map((dyn) => {
                return dyn.original || dyn;
            })
            return { Name, imageFile, dynFile, folderPath: Categories.concat(Group).join('/'), inDepth }
        })
        // console.log(saveJson)

        window.githubSubmitter([...this.state.updatedFiles], saveJson, this.state.branchName, this.state.commitMessage, this._retrieve)

    }

    _searchBar(val) {
        // browserHistory.push(`/search/${val}`)
        console.log('line', JsSearch)
        var search = new JsSearch.Search('Name');
        search.addIndex('Name');
        search.addIndex('CategorySearch');
        search.addIndex('inDepth');
        search.addIndex('Description');
        search.addIndex('FullCategoryName');
        search.addIndex('RouteName');
        search.addDocuments(this.state.searchArray);

        let arr = (search.search(val));
        this.setState({ searching: true, searchResults: arr, searchVal: val })
    }

    _sideBarClick(ob) {
        let actives = _hierarchyIterator(ob).filter((el) => el).reverse().concat(ob);
        this.setState({ actives, searching: false });
    }
    _resetActives() {
        this.setState({ actives: [] });
    }
    componentDidUpdate() {
        const routePath = this.props.location.pathname;
        if (routePath !== this.state.route) {

            this.setState({ route: this.props.location.pathname, searching: false })
            let rightdiv = document.getElementById('page-content-wrapper');
            if (rightdiv) {
                rightdiv.scrollTop = 0;
            }
            if (true) {
                const r = this.props.params;
                const allkeys = Object.keys(r).sort();
                const actives = recursiveActives(this.state.mainObjects, 0) || [];

                function recursiveActives(arr, it) {
                    return arr.map(d => {
                        if (d.Name === r[allkeys[it]] || (d.RouteName && d.RouteName === r[allkeys[it]])) {
                            if (d.Arr && allkeys.length > it + 1) {
                                return ([d].concat(recursiveActives(d.Arr, it + 1)))
                            } else {
                                return ([d])
                            }
                        }
                        return null;
                    }).filter(el => el)[0];
                }
                this.setState({ actives: actives.filter(el => el) })
            } else {

                this.setState({ searching: false })
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
        search.addIndex('RouteName');

        search.addDocuments(this.props.searchArray);

        let arr = (search.search(val));
        this.props.searching(arr, val);
    }
    _hashCheck() { }

    componentDidMount() {
        const _this = this;
        window.addEventListener('resize', () => {
            _this.forceUpdate();
        });

        baseData.then((res, rej) => {
            let dynLib = interop.xmlToJson(res[2]);
            let mainObjects = interop.createObject(dynLib);
            let nodeArray = flatten(mainObjects.map((d) => flattenHierarchy(d)));
            const addOverride = (node) => {
                node.RouteName = node.Name + '(' + (node.Inputs
                    ? node.Inputs.map(e => e.Name + '_' + e.Type).join('-')
                    : '()') + ')';
                node.TempName = node.Name + ' (' + (node.Inputs
                    ? node.Inputs.map(e => e.Name).join(', ')
                    : '()') + ')';
            }
            let searchArray = nodeArray
            searchArray.forEach((d, i) => {
                d.ogName = d.Name;
                d.inDepth = d.inDepth || `Add in-depth information about ${d.Name}...`;
                if (i > 0 && d.Name === searchArray[i - 1].Name) {
                    addOverride(d)
                    if (!searchArray[i - 1].TempName) {
                        addOverride(searchArray[i - 1])
                    }
                }
            })
            searchArray.forEach((d, i) => {
                if (d.TempName) {
                    d.Name = d.TempName
                }
            })
            const combinedArray = [...res[1], ...res[3]];
            combinedArray.forEach((d) => {
                nodeArray.forEach((e) => {

                    if (e.Name === d.Name) {
                        if (e.Categories.concat(e.Group).join('/') === d.folderPath) {

                            e.imageFile = d.imageFile
                                ? d.imageFile.slice()
                                : [];
                            e.dynFile = d.dynFile
                                ? d.dynFile.slice()
                                : [];

                            e.inDepth = d.inDepth;

                        }

                    }
                })
            })
            this.setState({ mainObjects, searchArray })
        }).catch(console.error.bind(console))
    }



    render() {
        const isLarge = window.innerWidth > this.state.minWidth;
        const ratio = this.state.treeOpen && isLarge ? 0.3 : 0;

        return (this.state.route !== ''
            ? (
                <div className="App"> <Header toggleTree={this._toggleTree} treeOpen={this.state.treeOpen} isLarge={isLarge} openModal={this._showPrModal} searching={this._searchBar} searchArray={this.state.searchArray} gitHubSubmit={this._gitHubSubmit} phase={this.state.prState} link={this.state.prLink} />

                    <div id="wrapper" style={{ 'marginTop': '60px' }}>
                        {isLarge ?
                            (
                                <div>
                                    <Drawer
                                        id='sidebar-wrapper'
                                        docked={true}
                                        width={window.innerWidth * ratio}
                                        open={this.state.treeOpen}
                                        containerStyle={{
                                            backgroundColor: 'rgb(34,34,34)', marginTop: '60px',
                                        }}
                                    >
                                        <div className='col-md-12 col-sm-12 col-xs-12 clearfix' style={{ "zIndex": "999", "marginTop": "2px", "paddingLeft": "0px", "paddingRight": "0px", "clear": "right" }}>
                                            <SearchBar searchArray={this.state.searchArray} searching={this._searchBar} resetActives={this._resetActives} />
                                        </div>
                                        <div className='left-element' style={{ "maxHeight": window.innerHeight - 60 + 'px' }}>
                                            <br />
                                            <ul style={{ paddingLeft: '0px' }}>
                                                <Sidebar dictionary={this.state.mainObjects} actives={this.state.actives} handleClick={this._sideBarClick} iteration={0} routePush={this._routePush} />
                                            </ul>
                                            <br />
                                            <br />
                                        </div>

                                    </Drawer>
                                    {!this.state.treeOpen ? <div className='col-md-12 col-sm-12 col-xs-12' style={{ "zIndex": "999", "marginTop": "2px", "paddingLeft": "0px", "paddingRight": "0px", "clear": "right" }}>
                                        <SearchBar searchArray={this.state.searchArray} searching={this._searchBar} resetActives={this._resetActives} />
                                    </div> : null}
                                </div>
                            ) :
                            <div style={{ "zIndex": "999", "marginTop": "2px", "paddingLeft": "0px", "paddingRight": "0px" }}>
                                <SearchBar searchArray={this.state.searchArray} searching={this._searchBar} resetActives={this._resetActives} />
                            </div>

                        }
                        <div id="page-content-wrapper" className='right-element' style={{ "overflow": "auto", "maxHeight": window.innerHeight - 60 + 'px', paddingTop: '20px', width: '100%' }}>
                            <div style={{
                                marginLeft: window.innerWidth * (ratio), width: window.innerWidth * (1 - ratio),
                                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                                transition: isLarge ? 'all 450ms' : 'all 0ms',
                            }}>
                                <div className='row'>

                                    <div >
                                        <Branch actives={this.state.actives}
                                            updateExample={this._updateExample}
                                            handleClick={this._sideBarClick}
                                            editInDepth={this.state.editInDepth}
                                            editInDepthClick={this._editInDepth}
                                            searching={this.state.searching}
                                            searches={this.state.searchResults}
                                            searchVal={this.state.searchVal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.prModalOpen ? <PullModal fileCount={this.state.updatedFiles.length + (this.state.mainEdit ? 1 : 0)} hideModal={this._hidePrModal} phase={this.state.prState} branchInput={this._writeBranchName} commitInput={this._writeCommitMessage} submit={this._submitPR} link={this.state.prLink} /> : null}
                </div>
            ) : null)

    }
}
App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
export default App;

// <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
