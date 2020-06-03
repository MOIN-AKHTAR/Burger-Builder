import * as actionTypes from "./ActionType";
import Axios from "../../Axios";

// export const purchaseBurgerSuccess = (id, orderData) => ({
//   type: actionTypes.PURCHASE_BURGER_SUCCESS,
//   orderId: id,
//   orderData: orderData,
// });

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, History) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  Axios.post("/orders.json", orderData)
    .then((res) => {
      dispatch({
        type: actionTypes.RESET_INGREDIENTS,
      });
      dispatch({
        type: actionTypes.RESET_ORDER_LOADING,
      });
      History.replace("/");
    })
    .catch((err) => dispatch(purchaseBurgerFail(err)));
};
