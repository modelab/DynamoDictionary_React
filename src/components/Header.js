import React from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';


function Header(props){

  return(
        <div className="titleDiv">
          <div className='pull-left' style={{display:'inline', position:'absolute', left:'15px', top:'18px', color:'white'}}>
            {props.isLarge ?
              <Toggle
                  defaultToggled={true}
                  labelStyle={{color:'white', fontFamily:"'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight:100, bottom:'3px'}}
                  width='200px'
                  onToggle = {props.toggleTree}
                  trackSwitchedStyle={{backgroundColor:'lightgrey'}}
                  thumbSwitchedStyle={{backgroundColor:'white'}}
                  trackStyle={{backgroundColor:'rgb(70,70,70)'}}
                  thumbStyle={{backgroundColor:'grey'}}
              />
              :null}

          </div>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{'display':'table', 'textAlign':'center', 'padding':'0px', 'height':'60px'}}>
            <span className="title" style={{'fontSize':'18px', 'marginLeft':'15px'}}>
            <a href="http://dynamobim.org/" target="_blank" style={{'display':'table-cell', 'width':'35px'}}>
            <img src="images/src/icon.png" width="100%" id='dynamologo' alt="dynamoIcon" target="_blank" style={{"verticalAlign":"middle", "marginLeft":"0px", "marginTop":"-2px"}} />
            </a>
            <Link to='/' className='raleway' style={{'color':'white'}}>&nbsp; Dynamo Dictionary</Link>
            </span>
        </div>
        <div  className='graytext'  style={{'position':'absolute', 'right':'0', 'top':'0','paddingRight':'10px'}}>
          <IconButton tooltip={props.phase==='init'?'Submit Pull Request':'Add Commit'} touch={true} tooltipPosition="bottom-left" style={{"top":"-5px"}} onClick={props.openModal}>
            <img src="images/icons/pr_invert.png" id='prLogo' width='22px' alt="prIcon"/>
          </IconButton>
          {props.phase==='committing' ? <a href={props.link} target="_blank"><IconButton tooltip='View PR on Github' touch={true} tooltipPosition="bottom-left" style={{"top":"-5"}}>
            <img src="images/icons/octocat.png" id='prLogo' width='30px' alt="prIcon"/>
          </IconButton></a>
          :null
         }

    </div>
  </div>

  )
}

export default Header;
