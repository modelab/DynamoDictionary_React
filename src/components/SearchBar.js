import React from 'react';
import JsSearch from 'js-search'




class SearchBar extends React.Component{

  constructor(props){
    super(props);
    this.state={
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if(event.keyCode==13){
      this.conductSearch(event.target.value);
    }
    // console.log('landsf')

  //  this.setState({value: event.target.value});


  }

  conductSearch(val){
    var search = new JsSearch.Search('Name');
    search.addIndex('Name');
    search.addIndex('CategorySearch');
    search.addIndex('inDepth');
    search.addIndex('Description');
    search.addIndex('FullCategoryName');

    search.addDocuments(this.props.searchArray);

    let arr = (search.search(val));    // [theGreatGatsby, theDaVinciCode]
    // console.log(arr)
    this.props.searching(arr,val);
    // console.log(arr)
  }

render(){
    return(
        <input type="text" id="searchBox" style={{"display":"table-cell","textAlign":"center","height":"25px", "width":"100%"}} placeholder="search..." onKeyDown = {this.handleChange}/>

    )
  }
}

export default SearchBar;
