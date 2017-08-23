import { UPDATE_HIERARCHY } from "../actions/hierarchyActions";

const initialState = {
  hierarchy: [],
  searchArray: []
};

const hierarchy = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_HIERARCHY:
      const { hierarchy, searchArray } = action.data;
      return { ...state, hierarchy, searchArray };
    default:
      return state;
  }
};

export default hierarchy;
