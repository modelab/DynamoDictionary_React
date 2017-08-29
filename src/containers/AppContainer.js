import * as hierarchyActions from "../actions/hierarchyActions";
import * as uiActions from "../actions/uiActions";
import * as activeNodeActions from "../actions/activeNodeActions";
import * as routeActions from "../actions/routeActions";
import * as editActions from "../actions/editActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "../App";

function mapStateToProps(state) {
  return {
    ...state.hierarchy,
    ...state.ui,
    ...state.activeNodes,
    ...state.edit,
    ...state.routes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...hierarchyActions,
        ...uiActions,
        ...activeNodeActions,
        ...editActions,
        ...routeActions
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
