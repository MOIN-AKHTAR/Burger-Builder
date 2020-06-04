import React from "react";
import Layout from "./Component/Layout/Layout";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import "./App.css";
import Checkout from "./Container/Checkout/Checkout";
import { Switch, Route, Redirect } from "react-router-dom";
import Orders from "./Container/Orders/Orders";
import Auth from "./Container/Auth/Auth";
import Logout from "./Container/Auth/Logout/Logout";
import * as action from "./Redux/index";
import { connect } from "react-redux";
class App extends React.Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{route}</Layout>;
  }
}

const mapStateToProps = (State) => ({
  isAuthenticated: State.auth.token !== null,
});

const mapDispatchToProps = (Dispatch) => ({
  onAuthCheckState: () => Dispatch(action.authCheckState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
