import React from 'react';

import ExampleFile from './ExampleFile';
import InDepthSection from './InDepthSection';

function ExampleSection(props) {
  let node = props.node;
  return (
    <div>
      <InDepthSection editInDepthClick = {props.editInDepthClick} editInDepth = {props.editInDepth} editInDepthClick = {props.editInDepthClick} node = {node}

      />
      <div className = 'exampleFile'>
        <ExampleFile node = {node} />
      </div>
    </div>
  )
}

export default ExampleSection;
