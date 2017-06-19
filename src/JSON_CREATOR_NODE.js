const fs = require('fs');
const  root = '/Users/ekatzenstein/Documents/adsk/DynamoDictionary_React';

//get empty files from array
fs.readFile(root+'/public/data/Dynamo_Nodes_Revit.json', 'utf8', function (err, data) {
    let i =0
    const arr = [];
    JSON.parse(data).map(node=>{
        const f = node.dynFile[0] || '';
        if(!f){node.dynFile.push(node.Name); node.imageFile.push(node.Name)}
        if(node.Name == "Scale1D"){
            console.log(root+'/public/data/EXAMPLES/'+node.folderPath+'/dyn/'+node.dynFile[0]+'.dyn')
        }
        if(
        (fs.existsSync(root+'/public/data/EXAMPLES/'+node.folderPath+'/dyn/'+node.dynFile[0]+'.dyn') ||
        fs.existsSync(root+'/public/data/EXAMPLES/'+node.folderPath+'/dyn/'+node.dynFile[0]+'.dyf') ||
        fs.existsSync(root+'/public/data/EXAMPLES/'+node.folderPath+'/dyn/'+node.dynFile[0]))

        ){
        }
        else{
            i++;
            arr.push(node)
        }
    })
    // console.log(arr);

    fs.writeFile(root+'/public/ExampleFileBacklog.json', JSON.stringify(arr), 'utf8', function(err,data){
        // console.log(data);
    })

    //console.log(JSON.parse(data))
})