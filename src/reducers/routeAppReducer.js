import { PUSH_ROUTE } from "../actions/routeActions";

const initialState = {
  route: ""
};

// this reducer doesn't really serve a purpose since react-router already adds routes to the state.
// We're still referencing in the App logic so need it in place with the current setup.

const routes = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_ROUTE:
      return { ...state, route: action.data };
    default:
      return state;
  }
};

export default routes;
