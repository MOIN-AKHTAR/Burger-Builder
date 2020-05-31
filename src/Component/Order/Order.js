import React from "react";
import Classes from "./Order.module.css";

export default function Order(props) {
  const { ingredients, totalPrice } = props;
  let ingredient = [];
  for (const key in ingredients) {
    ingredient.push({
      name: key,
      qty: ingredients[key],
    });
  }
  const ingredientOutput = ingredient.map((ig) => (
    <span
      key={ig.name}
      style={{
        margin: "0 4px",
        textTransform: "capitalize",
        display: "inline-block",
        border: "1px solid #eee",
        padding: "8px",
      }}
    >
      {ig.name} ({ig.qty})
    </span>
  ));
  return (
    <div className={Classes.Order}>
      Ingredients: {ingredientOutput}
      <p>
        Total Price: <strong>RS: {totalPrice}</strong>
      </p>
    </div>
  );
}
