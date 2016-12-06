import React from 'react';

import {flatten, flattenHierarchy} from './utils/array';
import classNames from 'classnames';

import NodeIcon from './nodeicon';

function NodeInfo(props) {
    let node = props.node;
    let i = props.i;

    return (
      <div id="spanDivs">
          <NodeIcon node={node} width="30px" handleClick={props.handleClick}/>

          <div className="addedText name" style ={{
              "position": "relative",
              "top": "4px",
              "color": "white",
              "marginLeft": "15px"
          }} onClick={() => props.handleClick(props.node)}>{node.Name}</div>

          <div style ={{
              "position": "relative",
              "top": "4px",
              "color": "grey",
              "marginLeft": "15px",
              "display": "inline"
          }}>
              {props.extractHierarchy(node)}
          </div>
          <br/>
          <div className='descDiv addedText'>
              <p className={classNames('addedText', 'descAdd')} style={{
                  'paddingLeft': '60px',
                  'color': 'grey',
                  'lineHeight': '30px'
              }}>
                  {node.Description}
              </p>
          </div>
          <br/>
          <br/>
          <br/>
      </div>
    )

}

export default NodeInfo;
