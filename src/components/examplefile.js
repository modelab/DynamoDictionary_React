import React from 'react';
import path from 'path';

import DownloadButton from './DownloadButton';
import EditButton from './EditButton';

function ExampleOutline(props) {
    let node = props.node;

    function dyn(node, i) {
        let dynPath = `./${path.join('data', 'Examples', node.Categories.join('/'), node.Group, 'dyn', `${node.dynFile[i]}.dyn`)}`
        return dynPath.toString();
    }

    function exampleImage(node, i) {
        let imagePath = `./${path.join('data', 'Examples', node.Categories.join('/'), node.Group, 'img', `${node.imageFile[i]}.jpg`)}`
        return (<img src={imagePath} width="100%" alt="''" data-jslghtbx="" data-jslghtbx-index="0"/>);
    }

    return (
        (node.dynFile && node.dynFile.length) > 0
            ? (
                <div>

                    Example File{node.dynFile.length > 1
                        ? 's'
                        : null}:
                    <br/>
                    <br/> {node.dynFile.map((f, i) => <div className='exSample' style={{
                        'display': 'inline-block'
                    }} key={i}>
                        <div className='exIcons'>
                            <text style={{
                                'opacity': '0.45',
                                'paddingRight': '20px'
                            }}>
                                {f}
                            </text>
                            <DownloadButton node={node} dynPath={dyn(node, i)}/>
                            <EditButton node={node}/>
                        </div>
                        {exampleImage(node, i)}

                    </div>)
                }
                </div>
            )
            : <div/>
    )
}

export default ExampleOutline;
