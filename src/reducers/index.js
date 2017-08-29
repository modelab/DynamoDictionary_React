import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import hierarchy from "./hierarchyReducer";
import ui from "./uiReducer";
import activeNodes from "./activeNodeReducer";
import edit from "./editReducer";
import routes from "./routeAppReducer";

const reducers = combineReducers({
  hierarchy,
  ui,
  routing: routerReducer,
  activeNodes,
  edit,
  routes
});

export default reducers;
