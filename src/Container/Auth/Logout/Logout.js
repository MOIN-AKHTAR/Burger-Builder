import React, { Component } from "react";
import * as action from "../../../Redux/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (Dispatch) => ({
  onLogout: () => Dispatch(action.logOut()),
});

export default connect(null, mapDispatchToProps)(Logout);
