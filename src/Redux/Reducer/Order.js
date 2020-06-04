import * as actionType from "../Action/ActionType";

const initialState = {
  orders: [],
  loading: false,
  message: null,
  error: null,
};

export const order = (State = initialState, Action) => {
  switch (Action.type) {
    case actionType.PURCHASE_BURGER_START:
      return {
        ...State,
        loading: true,
      };
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...State,
        loading: false,
      };
    case actionType.LOAD_ORDER_START:
      return {
        ...State,
        message: null,
        error: null,
        loading: true,
      };
    case actionType.LOAD_ORDER_SUCCESS:
      return {
        ...State,
        orders: Action.orders,
        loading: false,
      };
    case actionType.SET_MESSAGE:
      return {
        ...State,
        message: Action.message,
        loading: false,
      };
    case actionType.LOAD_ORDER_FAIL:
      return {
        ...State,
        error: Action.error,
        loading: false,
      };
    case actionType.RESET_ORDER_LOADING:
      return {
        orders: [],
        loading: false,
        message: null,
        error: null,
      };
    default:
      return State;
  }
};
