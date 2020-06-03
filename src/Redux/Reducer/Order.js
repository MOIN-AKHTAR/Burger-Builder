import * as actionType from "../Action/ActionType";

const initialState = {
  orders: [],
  loading: false,
};

export const order = (State = initialState, Action) => {
  switch (Action.type) {
    case actionType.PURCHASE_BURGER_START:
      return {
        ...State,
        loading: true,
      };
    // case actionType.PURCHASE_BURGER_SUCCESS: {
    //   const newOrder = {
    //     ...Action.orderData,
    //     id: Action.orderId,
    //   };
    //   return {
    //     ...State,
    //     loading: false,
    //     orders: State.orders.concat({
    //       newOrder,
    //     }),
    //   };
    // }
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...State,
        loading: false,
      };
    case actionType.RESET_ORDER_LOADING:
      return {
        ...State,
        loading: false,
      };
    default:
      return State;
  }
};
