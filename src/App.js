import React from "react";
import Layout from "./Component/Layout/Layout";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import "./App.css";
import Checkout from "./Container/Checkout/Checkout";
import { Switch, Route } from "react-router-dom";
import Orders from "./Container/Orders/Orders";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
      </Switch>
    </Layout>
  );
}

export default App;
