import React from 'react';
import NodeIcon from './nodeicon';

function SidebarButton(props) {
    return (
        <button className={props.classes} onClick={() => props.handleClick(props.ob)} style={{
            'paddingLeft': '20px',
            'whiteSpace': 'nowrap'
        }}>
            {(!props.ob.Arr)
                ? <NodeIcon node={props.ob} width="20px"/>
                : null}
            {props.ob.Name}
        </button>
    )
}
export default SidebarButton;
