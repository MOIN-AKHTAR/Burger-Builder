import * as actionType from "./ActionType";

export const addIngredients = (igName) => ({
  type: actionType.ADD_INGREDIENT,
  ingredientName: igName,
});

export const removeIngredients = (igName) => ({
  type: actionType.REMOVE_INGREDIENT,
  ingredientName: igName,
});
