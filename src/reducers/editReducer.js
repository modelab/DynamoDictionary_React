import {
  SET_PR_STATE,
  RETRIEVE_PR,
  UPDATE_FILES,
  EDIT_IN_DEPTH,
  SET_BRANCH_NAME,
  SET_COMMIT_MESSAGE
} from "../actions/editActions";

const initialState = {
  prState: "init",
  prLink: "https://github.com/DynamoDS/DynamoDictionary",
  updatedFiles: [],
  mainEdit: false,
  editInDepth: false,
  branchName: "user-" + Date.now().toString(),
  commitMessage: "no commit message"
};

const edits = (state = initialState, action) => {
  switch (action.type) {
    case SET_PR_STATE:
      return { ...state, prState: action.data };
    case UPDATE_FILES:
      return { ...state, updatedFiles: action.data };
    case SET_BRANCH_NAME:
      return { ...state, branchName: action.data };
    case SET_COMMIT_MESSAGE:
      return { ...state, commitMessage: action.data };
    case EDIT_IN_DEPTH:
      return { ...state, ...action.data, editInDepth: !state.editInDepth };
    case RETRIEVE_PR:
      const { updatedFiles, prState } = action.data;
      return action.data.prLink
        ? { ...state, updatedFiles, prState, prLink: action.data.prLink }
        : { ...state, updatedFiles, prState };
    default:
      return state;
  }
};

export default edits;
