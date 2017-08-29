// This is a file intended to be run in the cli ('node JSON_CLEANER_NODE').
// It checks whether example files exist in the repo and adds placeholder text if it doesn't.
// This was a quick fix for a specific task but can be modified for other purposes

const fs = require("fs");
const root = "/Users/ekatzenstein/Documents/adsk/DynamoDictionary_React";

fs.readFile(root + "/public/data/Dynamo_Nodes_Revit.json", "utf8", function(
  err,
  data
) {
  let i = 0;
  const arr = [];
  const newarr = JSON.parse(data).map(node => {
    const f = node.dynFile[0] || null;
    if (!f) {
      node.dynFile.push(node.Name);
      node.imageFile.push(node.Name);
    } // placeholder text
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
          node.dynFile[0] +
          ".zip"
      ) ||
      fs.existsSync(
        root +
          "/public/data/EXAMPLES/" +
          node.folderPath +
          "/dyn/" +
          node.dynFile[0]
      )
    ) {
      // if the dynamo files exist, bypass this step
    } else {
      node.dynFile = [];
      node.imageFile = [];
      // create empty array for no example files
    }
    return node;
  });
  fs.writeFile(
    root + "/public/data/Dynamo_Nodes_Revit.json",
    JSON.stringify(newarr),
    "utf8",
    function(err, data) {
      // console.log(data);
      // overwrite the data
    }
  );
});
