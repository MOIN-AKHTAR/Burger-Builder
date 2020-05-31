import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: null,
  };

  componentWillMount() {
    const ingredients = {};
    let price = 0;
    const query = new URLSearchParams(this.props.location.search);
    for (const params of query.entries()) {
      // params=["salad","1"]
      if (params[0] === "price") {
        price = +params[1];
      } else {
        ingredients[params[0]] = +params[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      price: price,
    });
  }

  cancelOrderHandler = () => this.props.history.goBack();
  continueOrderHandler = () =>
    this.props.history.replace("/checkout/form-data");

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelOrderHandler={this.cancelOrderHandler}
          continueOrderHandler={this.continueOrderHandler}
        />
        <Route
          path={this.props.match.url + "/form-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
