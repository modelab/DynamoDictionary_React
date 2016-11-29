import React from 'react';

import {flatten, flattenHierarchy} from './utils/array';
import classNames from 'classnames';

import NodeIcon from './nodeicon';
import ExampleFile from './examplefile';

function Branch(props) {
    let actives = props.actives;
    let lastLeaf = actives[actives.length - 1];
    let hierarchy = props.actives.length;

    function nodeDetail(ob) {
      console.log(ob)
        return [
            detailList('nodeDesc', 'Description', ob.Description, 0),
            detailList('nodeIn', 'Inputs', ob.Inputs, 1),
            detailList('nodeDesc', 'Outputs', ob.Outputs, 2),
            <ExampleFile node={ob} key={3}/>
        ]
    }

    function detailList(cn, title, body, key) {
        return (
            <div className={cn} key={key}>
                <br/>
                <b>{title}:</b>
                <br/> {key === 1
                    ? body.map((b) => (
                        <text style={{
                            'color': 'gray'
                        }}>{b.Name}: {b.Type}<br/></text>
                    ))
                    : key === 2
                        ? body.map((b) => (
                            <text style={{
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
        <div>
            {true
                ? (
                    <div style={{
                        'paddingLeft': '30px',
                        'paddingRight': '30px'
                    }}>
                        <div className='nodeName'>
                            {((!lastLeaf.Arr)
                                ? <NodeIcon node={lastLeaf} width="30px" handleClick={props.handleClick}/>
                                : null)}

                            {lastLeaf.Name}
                        </div>
                        <hr/>
                        <div className='nodeHier'>
                            <b>Dynamo Hierarchy :&nbsp;
                            </b>
                            {extractHierarchy(lastLeaf)}
                            { lastLeaf.Arr
                                ? <span style={{
                                        'color': 'gray'
                                    }}>{lastLeaf.Name}</span>
                                : null
                            }
                            <br/>
                        </div>
                        {!lastLeaf.Arr
                            ? (nodeDetail(lastLeaf))
                            : <hr/>}

                        <br/>
                        <div className='outer'>
                            <div className='imageTiles'>
                                {lastLeaf.Arr
                                    ? flatten(flattenHierarchy(lastLeaf)).map((node, i) => {
                                        return (
                                            <div key={i} id="spanDivs">
                                                <NodeIcon node={node} width="30px" handleClick={props.handleClick}/>

                                                <div className="addedText" style ={{
                                                    "position": "relative",
                                                    "top": "4px",
                                                    "color": "white",
                                                    "marginLeft": "15px"
                                                }}>{node.Name}</div>

                                                <div style ={{
                                                    "position": "relative",
                                                    "top": "4px",
                                                    "color": "grey",
                                                    "marginLeft": "15px",
                                                    "display": "inline"
                                                }}>
                                                    {extractHierarchy(node)}
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
                                    })

                                    : null
}
                            </div>
                        </div>

                    </div>
                )
                : lastLeaf.Name
}
        </div>
    )

}

export default Branch;
