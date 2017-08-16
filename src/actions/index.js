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
        let dynLib = interop.xmlToJson(res[0]);
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
        const combinedArray = [...res[1], ...res[2]];
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
        dispatch(updateHierarchy({ hierarchy, searchArray }));
      })
      .catch(console.error.bind(console));
  };
};
