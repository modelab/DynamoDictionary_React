import React from 'react';
import SearchBar from './SearchBar';

function Header(props){
  return(
    <div className="titleDiv">
        <div className = 'col-md-3 hidden-sm hidden-xs' style={{'display':'table'}}>
            <a href="http://dynamobim.org/" target="_blank" style={{'display':'table-cell', 'width':'20%'}}>
            <img src="images/src/icon.png" width="100%" id='dynamologo' alt="dynamoIcon" target="_blank" style={{"verticalAlign":"middle", "marginLeft":"8px"}} />
            </a>
            <SearchBar searchArray = {props.searchArray} searching = {props.searching}/>
            {/*
            <nav style={{"opacity":1,"display":"inline","marginLeft":"10px","fontSize":"13px","color":"white"}} className="list">list</nav>
            <span style={{"opacity":.25}}> | </span>
            <nav className="matrix" style={{"opacity":.25,"display":"inline"," fontSize":"13px","color":"white"}}>matrix</nav>
            */}
        </div>
        <div id="title" className = 'col-md-6 col-sm-6 col-xs-6' ><span className="title" style={{'fontSize':'2vw'}}>Dynamo Dictionary
           </span>

        </div>
        <div id='submitPR' className = 'col-md-2 col-sm-2 col-xs-2' style={{"float":"right","marginRight":"25px","marginTop":"20px",'display':'table'}}><span style={{'top':'-15px','display':'table-cell','width':'100%'}} className='hidden-xs hidden-sm'>submit pull request &nbsp;&nbsp;&nbsp;</span><img src="images/icons/pr_invert.png" id='prLogo' width="35" alt="prIcon" style={{'marginBottom':'30px'}}/></div>
    </div>
  )
}

export default Header;
