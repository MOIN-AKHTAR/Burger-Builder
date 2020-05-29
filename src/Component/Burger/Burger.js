import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import Classes from "./Burger.module.css";

const Burger = (props) => {
  // Converting Ingredient Object Into Array Of Ingredients
  let transformedIngredients = Object.keys(props.ingredients)
    .map((Key) =>
      [...Array(props.ingredients[Key])].map((_, i) => (
        <BurgerIngredient key={Key + i} type={Key} />
      ))
    )
    .reduce((prev, curr) => prev.concat(curr), []);

  // Checking Whether There Is Any Ingredients Or Not
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Add Ingredients</p>;
  }

  return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
