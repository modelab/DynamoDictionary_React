import { hierarchyIterator } from "../util/lineageRouter";
import * as JsSearch from "js-search";

export const SIDEBAR_CLICK = "SIDEBAR_CLICK";
export const sidebarClick = ob => {
  const actives = hierarchyIterator(ob).filter(el => el).reverse().concat(ob);
  return { type: SIDEBAR_CLICK, data: { actives, searching: false } };
};

export const RESET_ACTIVES = "RESET_ACTIVES";
export const resetActives = () => {
  return { type: RESET_ACTIVES };
};

export const SET_ACTIVES = "SET_ACTIVES";
export const setActives = data => {
  return { type: SET_ACTIVES, data };
};

export const SEARCH_ON = "SEARCH_ON";
export const searchOn = () => {
  return { type: SEARCH_ON };
};

export const SEARCH_OFF = "SEARCH_OFF";
export const searchOff = () => {
  return { type: SEARCH_OFF };
};

export const SEARCH_DYNAMO = "SEARCH_DYNAMO";
export const dynamoSearch = data => ({ ...data });
export const searchDynamo = val => {
  return (dispatch, getState) => {
    var search = new JsSearch.Search("Name");
    search.addIndex("Name");
    search.addIndex("CategorySearch");
    search.addIndex("inDepth");
    search.addIndex("Description");
    search.addIndex("FullCategoryName");
    search.addIndex("RouteName");
    search.addDocuments(getState().hierarchy.searchArray);
    let arr = search.search(val);
    dispatch(
      dynamoSearch({
        type: SEARCH_DYNAMO,
        data: {
          searching: true,
          searchResults: arr,
          searchVal: val
        }
      })
    );
  };
};
