//import modules
import * as d3 from "d3";
import p from "../util/promise";
//create promises for two data files to be read
const pStatic = p.promisify(d3.xml, "data/Dynamo_Library.xml");
const pEdit = p.promisify(d3.json, "data/Dynamo_Nodes_Documentation.json");
const pRevit = p.promisify(d3.xml, "data/Revit_Library.xml");
const pBacklog = p.promisify(d3.json, "data/ExampleFileBacklog.json");

//resolve promises
export default Promise.all([pStatic, pEdit, pRevit, pBacklog]);
