import React from 'react';

function Home(props){
  return(
    <div className = 'col-md-12'>
        <p className="graytextlg">Welcome to the Dynamo Dictionary, a searchable database for Dynamo functionality. Here you can find explanations for nodes, sample files, and links to more information on associated workflows. This site is constantly evolving as the community continues to add more information. Like the <a href="http://dynamoprimer.com/" target="_blank">Dynamo Primer</a>, this dictionary is open-source - check it out on our <a href="https://github.com/DynamoDS/DynamoDictionary" target="_blank">Github page</a> and contribute!</p>
        <hr />
        <br/>
        <p className="nodeName">Editing this Dictionary</p>
        <p className="graytext">Not only is the Dynamo Dictionary open-sourced, you can also edit the repository straight from this webpage! Click on edit icons on node pages and add your own <span style={{"color":"lightgray"}}>in-depth description</span>, update <span style={{"color":"lightgray"}}>examples files and images</span>, or <span style={{"color":"lightgray"}}>add your own!</span>
            <br/> </p><br/>
        <li className="graytext" style={{'textIndent':'-2em','marginLeft':'2em'}}>After making your updates, remember to click the <span style={{"color":"lightgray"}}>"Submit Pull Request"</span> icon in the top right of the page. This will allow you to open a pull request on Github without having to login. </li><br/>
        <li className="graytext" style={{'textIndent':'-2em','marginLeft':'2em'}}>The <span style={{"color":"lightgray"}}>Pull Request</span> will be opened on the Github repo. After we've reviewed it and are ready to accept the changes, we'll <span style={{"color":"lightgray"}}>merge</span> the new content onto the live site!</li><br/>
        <li className="graytext" style={{'textIndent':'-2em','marginLeft':'2em'}}> Because of the review period, you may have to wait a few days for the Pull request to go through. If you have any <a href="https://github.com/DynamoDS/DynamoDictionary/issues" target="_blank">issues</a>, please dont hesitate to log them <a href="https://github.com/DynamoDS/DynamoDictionary/issues" target="_blank">here.</a></li>
        <br />
        <hr />
        <div className='iconSpread'>
            <div className='imgHL'>
                <div className='imgbutton'>
                    <a href='http://dynamobim.org/' target='_blank'><img src='images/home/dynamobim.jpg' width='100%' /> </a>
                </div>
                <div className='text_over_imageL'><a href='http://dynamobim.org/' target='_blank'>Community</a></div>
            </div>
            <div className='imgHL'>
                <div className='imgbutton'>
                    <a href='http://www.autodesk.com/products/dynamo-studio/overview' target='_blank'><img src='images/home/dynamostudio.jpg' width='100%' className='imgbutton' /> </a>
                </div>
                <div className='text_over_imageR'><a href='http://www.autodesk.com/products/dynamo-studio/overview' target='_blank'>Product</a></div>
            </div>
            <div className='imgHL'>
                <div className='imgbutton'>
                    <a href='http://dynamoprimer.com/' target='_blank'><img src='images/home/dynamoprimer.jpg' width='100%' /></a>
                </div>
                <div className='text_over_imageL'> <a href='http://dynamoprimer.com/' target='_blank'>Learning</a></div>
            </div>
            <div className='imgHL'>
                <div className='imgbutton'>
                    <a href='https://github.com/DynamoDS/Dynamo' target='_blank'><img src='images/home/dynamogithub.jpg' width='100%' /></a>
                </div>
                <div className='text_over_imageR'><a href='https://github.com/DynamoDS/Dynamo' target='_blank'>Development</a></div>
            </div>
        </div>
      </div>
  );
}

export default Home;
