import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Toolbar from "../../UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../UI/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import Classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () =>
    this.setState({
      showSideDrawer: false,
    });

  sideDrawerToggleHandler = () =>
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));

  render() {
    return (
      <Wrapper>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Wrapper>
    );
  }
}

const mapStatetToProps = (State) => ({
  isAuthenticated: State.auth.token !== null,
});
export default connect(mapStatetToProps)(Layout);
