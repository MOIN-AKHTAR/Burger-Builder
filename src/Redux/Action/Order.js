import * as actionTypes from "./ActionType";
import Axios from "../../Axios";

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const loadOrderStart = () => ({
  type: actionTypes.LOAD_ORDER_START,
});

export const loadOrderSuccess = (orders) => ({
  type: actionTypes.LOAD_ORDER_SUCCESS,
  orders: orders,
});

export const loadOrderFail = (error) => ({
  type: actionTypes.LOAD_ORDER_FAIL,
  error: error,
});

export const setMessage = (message) => ({
  type: actionTypes.SET_MESSAGE,
  message: message,
});

export const purchaseBurger = (orderData, token, History) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  Axios.post(`/orders.json?auth=${token}`, orderData)
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

export const loadOrders = (token, userId) => (dispatch) => {
  dispatch(loadOrderStart());
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  Axios.get("/orders.json" + queryParams)
    .then((res) => {
      if (res) {
        if (res.data === null || Object.keys(res.data).length === 0) {
          dispatch(setMessage("No Order Found :("));
        } else {
          let fetchedData = [];
          for (const key in res.data) {
            fetchedData.push({
              ...res.data[key],
              id: key,
            });
          }
          dispatch(loadOrderSuccess(fetchedData));
        }
      } else {
        dispatch(loadOrderFail("Something Going Wrong"));
      }
    })
    .catch((err) => {
      dispatch(loadOrderFail(err));
    });
};
