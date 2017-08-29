export const SET_PR_STATE = "SET_PR_STATE";

export const setPRState = data => {
  return { type: SET_PR_STATE, data };
};

export const RETRIEVE_PR = "RETRIEVE_PR";
export const retrievePR = prLink => {
  return prLink
    ? { type: RETRIEVE_PR, prState: "created", updatedFiles: [], prLink }
    : { type: RETRIEVE_PR, prState: "created", updatedFiles: [] };
};

export const UPDATE_FILES = "UPDATE_FILES";
export const updateFiles = data => {
  return { type: UPDATE_FILES, data };
};

export const EDIT_IN_DEPTH = "EDIT_IN_DEPTH";
export const editInDepth = data => {
  return { type: EDIT_IN_DEPTH, ...data };
};

export const SET_BRANCH_NAME = "SET_BRANCH_NAME";
export const setBranchName = data => {
  return { type: SET_BRANCH_NAME, data };
};
export const SET_COMMIT_MESSAGE = "SET_COMMIT_MESSAGE";
export const setCommitMessage = data => {
  return { type: SET_COMMIT_MESSAGE, data };
};
