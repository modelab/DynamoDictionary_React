const fs = require("fs");
const root = "/Users/ekatzenstein/Documents/adsk/DynamoDictionary_React";
// this was a quick cli fix to create a file containing all of the nodes that don't have example files.
// helpful tool so Paul doesn't have to manually check the json.

fs.readFile(root + "/public/data/Dynamo_Nodes_Revit.json", "utf8", function(
  err,
  data
) {
  let i = 0;
  const arr = [];
  JSON.parse(data).map(node => {
    const f = node.dynFile[0] || null;
    if (!f) {
      node.dynFile.push(node.Name);
      node.imageFile.push(node.Name);
    }
    if (
      fs.existsSync(
        root +
          "/public/data/EXAMPLES/" +
          node.folderPath +
          "/dyn/" +
          node.dynFile[0] +
          ".dyn"
      ) ||
      fs.existsSync(
        root +
          "/public/data/EXAMPLES/" +
          node.folderPath +
          "/dyn/" +
          node.dynFile[0] +
          ".dyf"
      ) ||
      fs.existsSync(
        root +
          "/public/data/EXAMPLES/" +
          node.folderPath +
          "/dyn/" +
          node.dynFile[0]
      )
    ) {
    } else {
      i++;
      arr.push(node);
    }
  });
  // console.log(arr);

  fs.writeFile(
    root + "/public/ExampleFileBacklog.json",
    JSON.stringify(arr),
    "utf8",
    function(err, data) {
      // console.log(data);
    }
  );

  //console.log(JSON.parse(data))
});
