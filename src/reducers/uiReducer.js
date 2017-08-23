import {
  TOGGLE_TREE,
  SHOW_PR_MODAL,
  HIDE_PR_MODAL
} from "../actions/uiActions";

const initialState = {
  sidebarOpen: true,
  prModalOpen: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TREE:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case SHOW_PR_MODAL:
      return { ...state, prModalOpen: true };
    case HIDE_PR_MODAL:
      return { ...state, prModalOpen: false };
    default:
      return state;
  }
};

export default ui;
