import React from 'react';
import path from 'path';

function NodeIcon(props) {
    return ( <
        img className = "im"
        height = {props.width}
        style = {
            {
                "backgroundColor": "rgb(34,34,34)",
                "marginRight":"10px"
            }
        }
        src = {
            path.join('images', props.node.SmallIcon)
        }
        onClick={() => props.handleClick(props.node)}
        />
    )
}

export default NodeIcon;
