import React, { Component } from "react";
import Proptypes from "prop-types";
import Classes from "./BurgerIngredient.module.css";

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={Classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingredient = (
          <div className={Classes.BreadTop}>
            <div className={Classes.Seeds1}></div>
            <div className={Classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={Classes.Meat}></div>;
        break;
      case "cheese":
        ingredient = <div className={Classes.Cheese}></div>;
        break;
      case "kabab":
        ingredient = <div className={Classes.Kabab}></div>;
        break;
      case "salad":
        ingredient = <div className={Classes.Salad}></div>;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: Proptypes.string.isRequired,
};

export default BurgerIngredient;
