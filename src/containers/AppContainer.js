import * as hierarchyActions from "../actions/hierarchyActions";
import * as uiActions from "../actions/uiActions";
import * as activeNodeActions from "../actions/activeNodeActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "../App";

function mapStateToProps(state) {
  return {
    hierarchy: state.hierarchy.hierarchy,
    searchArray: state.hierarchy.searchArray,
    sidebarOpen: state.ui.sidebarOpen,
    prModalOpen: state.ui.prModalOpen,
    actives: state.activeNodes.actives,
    searching: state.activeNodes.searching,
    searchResults: state.activeNodes.searchResults,
    searchVal: state.activeNodes.searchVal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...hierarchyActions, ...uiActions, ...activeNodeActions },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
