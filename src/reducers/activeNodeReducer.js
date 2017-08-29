import {
  SIDEBAR_CLICK,
  RESET_ACTIVES,
  SET_ACTIVES,
  SEARCH_OFF,
  SEARCH_ON,
  SEARCH_DYNAMO
} from "../actions/activeNodeActions";

const initialState = {
  actives: [],
  searching: false,
  searchResults: [],
  searchVal: ""
};

const activeNodes = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_CLICK:
      return { ...state, ...action.data };
    case RESET_ACTIVES:
      return { ...state, actives: [] };
    case SET_ACTIVES:
      return { ...state, actives: action.data };
    case SEARCH_OFF:
      return { ...state, searching: false };
    case SEARCH_ON:
      return { ...state, searching: true };
    case SEARCH_DYNAMO:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default activeNodes;
