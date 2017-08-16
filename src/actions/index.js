import axios from "axios";

import baseData from "../components/Entry";
import interop from "../util/interop";
import { flatten, flattenHierarchy } from "../util/array";
import { addOverload } from "../util/data";

export const HIERARCHY_TEST = "HIERARCHY_TEST";
export const hierarchyTest = () => {
  return { type: HIERARCHY_TEST };
};

export const UPDATE_HIERARCHY = "UPDATE_HIERARCHY";
export const updateHierarchy = data => {
  return { type: UPDATE_HIERARCHY, data };
};

export const loadHierarchy = () => {
  return dispatch => {
    baseData
      .then((res, rej) => {
        let dynLib = interop.xmlToJson(res[2]);
        let hierarchy = interop.createObject(dynLib);
        let searchArray = flatten(hierarchy.map(d => flattenHierarchy(d)));
        searchArray.forEach((d, i) => {
          d.ogName = d.Name;
          d.inDepth =
            d.inDepth || `Add in-depth information about ${d.Name}...`;
          if (i > 0 && d.Name === searchArray[i - 1].Name) {
            addOverload(d);
            if (!searchArray[i - 1].TempName) {
              addOverload(searchArray[i - 1]);
            }
          }
        });
        searchArray.forEach((d, i) => {
          if (d.TempName) {
            d.Name = d.TempName;
          }
        });
        const combinedArray = [...res[1], ...res[3]];
        combinedArray.forEach(d => {
          searchArray.forEach(e => {
            if (e.Name === d.Name) {
              if (e.Categories.concat(e.Group).join("/") === d.folderPath) {
                e.imageFile = d.imageFile ? d.imageFile.slice() : [];
                e.dynFile = d.dynFile ? d.dynFile.slice() : [];

                e.inDepth = d.inDepth;
              }
            }
          });
        });
        // let saveJson = searchArray.map((d) => {
        //     let {
        //         Name,
        //         imageFile,
        //         dynFile,
        //         Categories,
        //         Group,
        //         inDepth
        // } = d;
        //     imageFile = (imageFile && imageFile.length > 0 && imageFile.map((im) => {
        //         return im.original || im;
        //     })) || [];
        //     dynFile = (dynFile && dynFile.length > 0 && dynFile.map((dyn) => {
        //         return dyn.original || dyn;
        //     })) || [];
        //     if (dynFile.length === 0) { return { Name, imageFile, dynFile, folderPath: Categories.concat(Group).join('/'), inDepth } }
        //     else {
        //         return null
        //     }
        // }).filter(el => el);
        // console.log(saveJson);
        // document.write('{"data":' + JSON.stringify((saveJson)) + '}');
        dispatch(updateHierarchy({ hierarchy, searchArray }));
      })
      .catch(console.error.bind(console));
  };
};
