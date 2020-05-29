import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Toolbar from "../../UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../UI/Navigation/SideDrawer/SideDrawer";
import Classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: true,
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
        <Toolbar drawToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Wrapper>
    );
  }
}
export default Layout;
