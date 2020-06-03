import React, { Component } from "react";
import Burger from "../../Component/Burger/Burger";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import BuildControls from "../../Component/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
import Axios from "../../Axios";
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/index";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  // Set Purchasing As True
  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  // Update Purchaseable
  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  // Cancel Purchase
  purchaseCancelHandler = () =>
    this.setState({
      purchasing: false,
    });

  // Continue Purchase
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelHandler={this.purchaseCancelHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        price={this.props.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Wrapper>
        <Burger ingredients={this.props.ings} />
        <Modal
          show={this.state.purchasing}
          loading={this.state.loading}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <BuildControls
          ingredientAdded={this.props.onIngredientAdd}
          ingredientRemoved={this.props.onIngredientRemove}
          disabled={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.updatePurchase(this.props.ings)}
          ordered={this.purchaseHandler}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (State) => ({
  ings: State.burger.ingredients,
  totalPrice: State.burger.totalPrice,
});

const mapDispatchToProps = (Dispatch) => ({
  onIngredientAdd: (ingName) => Dispatch(actionCreator.addIngredients(ingName)),
  onIngredientRemove: (ingName) =>
    Dispatch(actionCreator.removeIngredients(ingName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, Axios));
