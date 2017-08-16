import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import hierarchy from "./hierarchy";

const reducers = combineReducers({
  hierarchy,
  routing: routerReducer
});

export default reducers;
