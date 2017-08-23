import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import hierarchy from "./hierarchyReducer";
import ui from "./uiReducer";
import activeNodes from "./activeNodeReducer";

const reducers = combineReducers({
  hierarchy,
  ui,
  routing: routerReducer,
  activeNodes
});

export default reducers;
