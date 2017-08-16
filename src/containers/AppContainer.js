import * as hierarchyActions from "../actions/hierarchyActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "../App";

function mapStateToProps(state) {
  return {
    hierarchy: state.hierarchy.hierarchy,
    searchArray: state.hierarchy.searchArray
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(hierarchyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
