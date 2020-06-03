import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";

class Checkout extends Component {
  cancelOrderHandler = () => this.props.history.goBack();
  continueOrderHandler = () =>
    this.props.history.replace("/checkout/form-data");

  render() {
    let summary = <Spinner />;
    if (this.props.ings) {
      summary = (
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
    return summary;
  }
}

const mapStateToProps = (State) => ({
  ings: State.burger.ingredients,
  totalPrice: State.burger.totalPrice,
});

export default connect(mapStateToProps)(Checkout);
