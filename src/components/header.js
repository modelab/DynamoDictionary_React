import React from 'react';
import { Link } from 'react-router';



function Header(props){
  return(
    <div className="titleDiv">

        <div className = 'col-lg-12' style={{'display':'table', 'textAlign':'center', 'padding':'0px', 'height':'60px'}}>
            <span className="title" style={{'fontSize':'18px', 'marginLeft':'15px'}}>
            <a href="http://dynamobim.org/" target="_blank" style={{'display':'table-cell', 'width':'35px'}}>
            <img src="images/src/icon.png" width="100%" id='dynamologo' alt="dynamoIcon" target="_blank" style={{"verticalAlign":"middle", "marginLeft":"0px", "marginTop":"-2px"}} />
            </a>
            <Link to='/' className = 'raleway' style={{'color':'white'}}>&nbsp; Dynamo Dictionary</Link>
            </span>




            {/*
            <nav style={{"opacity":1,"display":"inline","marginLeft":"10px","fontSize":"13px","color":"white"}} className="list">list</nav>
            <span style={{"opacity":.25}}> | </span>
            <nav className="matrix" style={{"opacity":.25,"display":"inline"," fontSize":"13px","color":"white"}}>matrix</nav>
            */}
        </div>
        <div id="title" className = 'col-md-6 col-sm-6 col-xs-6' >

        </div>
        {
        //   <div id='submitPR' className = 'col-md-2 col-sm-2 col-xs-2' style={{"float":"right","marginRight":"25px","marginTop":"20px",'display':'table'}}><span style={{'top':'-15px','display':'table-cell','width':'100%'}} className='hidden-xs hidden-sm'>
        //     submit pull request &nbsp;&nbsp;&nbsp;
        //   </span>
        //   <img src="images/icons/pr_invert.png" id='prLogo' width="35" alt="prIcon" style={{'marginBottom':'30px'}} onClick={props.gitHubSubmit}/>
        // </div>
        }
        <div  className='graytext' onClick={props.openModal} style={{'position':'absolute', 'right':'0', 'top':'0','paddingRight':'10px'}}> submit pull request<img src="images/icons/pr_invert.png" id='prLogo' width= '40px' alt="prIcon" style={{'padding':'10px', 'paddingTop':'5px', 'opacity':'0.5'}}/></div>
  </div>

  )
}

export default Header;
