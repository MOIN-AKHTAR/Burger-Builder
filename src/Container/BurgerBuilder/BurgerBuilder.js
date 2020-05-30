import React, { Component } from "react";
import Burger from "../../Component/Burger/Burger";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import BuildControls from "../../Component/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
import Axios from "../../Axios";
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  kabab: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      kabab: 0,
    },
    totalPrice: 0,
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
    this.setState({
      purchasable: sum > 0,
    });
  };

  // Add Ingredients In Burger
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchase(updatedIngredients);
  };

  // Remove Ingredients In Burger
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchase(updatedIngredients);
  };

  // Cancel Purchase
  purchaseCancelHandler = () =>
    this.setState({
      purchasing: false,
    });

  // Continue Purchase
  purchaseContinueHandler = () => {
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice.toFixed(2),
      customer: "Moin Akhter",
    };
    Axios.post("/orders.json", order)
      .then((res) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelHandler={this.purchaseCancelHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Wrapper>
        <Burger ingredients={this.state.ingredients} />
        <Modal
          show={this.state.purchasing}
          loading={this.state.loading}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Wrapper>
    );
  }
}
export default WithErrorHandler(BurgerBuilder, Axios);
