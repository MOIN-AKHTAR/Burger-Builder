import * as actionType from "./ActionType";
import Axios from "axios";

export const authStart = () => ({
  type: actionType.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionType.AUTH_SUCCESS,
  token,
  userId,
});

export const authFail = (error) => ({
  type: actionType.AUTH_FAIL,
  error: error,
});

export const logOut = (_) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionType.LOG_OUT,
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionType.SET_AUTH_REDIRECT_PATH,
  path: path,
});

export const checkAuthTimeOut = (expirationTime) => (Dispatch) => {
  setTimeout(() => {
    Dispatch(logOut());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => (dispatch) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaiqYrDt2m0IYhUEDHmv8JK1YbUYEpPD4";
  if (!isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaiqYrDt2m0IYhUEDHmv8JK1YbUYEpPD4";
  }
  dispatch(authStart());
  Axios.post(url, authData)
    .then((res) => {
      const expirationTime = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeOut(res.data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error.message));
    });
};

export const authCheckState = () => (Dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    Dispatch(logOut());
  } else {
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    if (expirationTime > new Date()) {
      const userId = localStorage.getItem("userId");
      Dispatch(authSuccess(token, userId));
      Dispatch(
        checkAuthTimeOut(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      Dispatch(logOut());
    }
  }
};
