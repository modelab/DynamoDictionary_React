import React from 'react';

function Header(props){
  return(
    <div className="titleDiv">
        <div id="searchBar">
            <a href="http://dynamobim.org/" target="_blank">
            <img src="images/src/icon.png" width="45" id='dynamologo' alt="dynamoIcon" target="_blank" style={{"verticalAlign":"middle", "marginLeft":"8px"}} />
            </a>
            <input type="text" size="50" id="searchBox" style={{"textAlign":"center","height":"35px"}} placeholder="search..." />
            {/*
            <nav style={{"opacity":1,"display":"inline","marginLeft":"10px","fontSize":"13px","color":"white"}} className="list">list</nav>
            <span style={{"opacity":.25}}> | </span>
            <nav className="matrix" style={{"opacity":.25,"display":"inline"," fontSize":"13px","color":"white"}}>matrix</nav>
            */}
        </div>
        <div id="title"><span className="title">Dynamo Dictionary
           </span>
            <div id='submitPR' style={{"float":"right","marginRight":"25px","marginTop":"20px"}}><span style={{'top':'-15px'}}>submit pull request &nbsp;&nbsp;&nbsp;</span><img src="images/icons/pr_invert.png" id='prLogo' width="35" alt="prIcon" style={{'marginBottom':'30px'}}/></div>
        </div>
    </div>
  )
}

export default Header;
