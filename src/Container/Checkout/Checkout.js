import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelOrderHandler = () => this.props.history.goBack();
  continueOrderHandler = () =>
    this.props.history.replace("/checkout/form-data");

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          cancelOrderHandler={this.cancelOrderHandler}
          continueOrderHandler={this.continueOrderHandler}
        />
        <Route
          path={this.props.match.url + "/form-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  ings: State.ingredients,
  totalPrice: State.totalPrice,
});

export default connect(mapStateToProps)(Checkout);
