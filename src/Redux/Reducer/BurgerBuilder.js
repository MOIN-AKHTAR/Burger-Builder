import * as actionType from "../Action/ActionType";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  kabab: 0.7,
};

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    kabab: 0,
    cheese: 0,
  },
  totalPrice: 4,
  // building: false,
};

export const burgerBuiler = (State = initialState, Action) => {
  switch (Action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...State,
        ingredients: {
          ...State.ingredients,
          [Action.ingredientName]: State.ingredients[Action.ingredientName] + 1,
        },
        totalPrice: State.totalPrice + INGREDIENT_PRICES[Action.ingredientName],
        // building: true,
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...State,
        ingredients: {
          ...State.ingredients,
          [Action.ingredientName]: State.ingredients[Action.ingredientName] - 1,
        },
        totalPrice: State.totalPrice - INGREDIENT_PRICES[Action.ingredientName],
        // building: true,
      };
    case actionType.RESET_INGREDIENTS:
      return {
        ...State,
        ingredients: {
          salad: 0,
          meat: 0,
          kabab: 0,
          cheese: 0,
        },
        totalPrice: 4,
        // building: false,
      };
    default:
      return State;
  }
};
