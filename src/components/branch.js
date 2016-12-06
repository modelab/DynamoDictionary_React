import React from 'react';

import {flatten, flattenHierarchy} from './utils/array';
import classNames from 'classnames';

import ExampleSection from './ExampleSection';
import NodeInfo from './NodeInfo';
import NodeTitle from './NodeTitle';
import DynamoHierarchy from './DynamoHierarchy';
import Home from './home';

function Branch(props) {

    // console.log(props.mainObjects)
    let actives = props.actives;
    let lastLeaf = actives[actives.length - 1];

    let hierarchy = props.actives.length;

    function nodeDetail(ob) {
      // console.log(ob)
        return [
            ob.Description?detailList('nodeDesc', 'Description', ob.Description, 0):null,
            ob.Inputs?detailList('nodeIn', 'Inputs', ob.Inputs, 1):null,
            ob.Outputs?detailList('nodeDesc', 'Outputs', ob.Outputs, 2):null, < ExampleSection node = {
                ob
            }
            key = {
                3
            }
            editInDepthClick = {
                props.editInDepthClick
            }
            editInDepth = {
                props.editInDepth
            }
            key = {
                3
            } />
        ]
    }

    function detailList(cn, title, body, key) {

        return (
            <div className={cn} key={key}>
                <br/>
                <b>{title}:</b>
                <br/> {key === 1
                    ? body.map((b, i) => (
                        <text style={{
                            'color': 'gray'
                        }} key={i}>{b.Name}: {b.Type}<br/></text>
                    ))
                    : key === 2
                        ? body.map((b, i) => (
                            <text key={i} style={{
                                'color': 'gray'
                            }}>Type: {b.Name}<br/><hr/></text>
                        ))

                        : <text style={{
                            'color': 'gray'
                        }}>{body}</text>
}
            </div>
        )
    }

    function extractHierarchy(ob) {
        return hierarchyIterator(ob).reverse().map((n, i) => (n.Arr
            ? (
                <a onClick={() => props.handleClick(n)} className="addedText" key={i}>{n.Lineage
                        ? n.Name
                        : null}{(n.Arr && n.Arr[0].Arr)
                        ? ','
                        : null}&nbsp;</a>
            )
            : {}))
    }
    function hierarchyIterator(ob) {
        if (ob && ob.Parent != 'Home') {
            return [ob.Parent].concat(hierarchyIterator(ob.Parent)).filter((el) => el)
        } else {
            return [];
        }
    }

    return (
      !props.searching && !props.actives[0] ? <Home/>
      :
        (<div>
            <div style={{
                'paddingLeft': '30px',
                'paddingRight': '30px'
            }}>

                {!props.searching?
                    <NodeTitle lastLeaf={lastLeaf} handleClick={props.handleClick}/>
                    :
                  <div className='nodeName'>Search: {props.searchVal}</div>

                }
                <hr/>
                {!props.searching?
                  <DynamoHierarchy lastLeaf={lastLeaf} extractHierarchy={extractHierarchy} nodeDetail={nodeDetail}/>
                  :
                  null}

                <div className='outer'>
                    <div className='imageTiles'>
                        {props.searching
                            ?
                            props.searches.map((node, i) => {

                             return (<NodeInfo handleClick={props.handleClick} node={node} i={i} key={i} extractHierarchy={extractHierarchy}/>)
                         })

                            : lastLeaf.Arr
                                ? (
                                   flatten(flattenHierarchy(lastLeaf))).map((node, i) => {
                                    return (<NodeInfo handleClick={props.handleClick} node={node} i={i} key={i} extractHierarchy={extractHierarchy}/>)
                                })
                                : null
                      }
                    </div>
                </div>
            </div>
        </div>
      )
    )

}

export default Branch;
