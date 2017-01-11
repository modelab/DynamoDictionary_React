import React from 'react';

import ExampleFiles from './ExampleFiles';
import InDepthSection from './InDepthSection';

function ExampleSection(props) {
  let node=props.node;

  return (
    <div>
      <InDepthSection editInDepthClick={props.editInDepthClick} editInDepth={props.editInDepth} node={node}
      />
      <div className='exampleFile'>
        <ExampleFiles node={node} updateExample={props.updateExample}/>
      </div>
    </div>
  )
}

export default ExampleSection;
