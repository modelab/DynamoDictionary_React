import * as actions from "../actions";
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
