import * as actionType from "../Action/ActionType";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  // authRedirectPath: "/",
};

export const auth = (State = initialState, Action) => {
  switch (Action.type) {
    case actionType.AUTH_START:
      return {
        ...State,
        loading: true,
        error: null,
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...State,
        token: Action.token,
        userId: Action.userId,
        error: null,
        loading: false,
      };
    case actionType.AUTH_FAIL:
      return {
        ...State,
        error: Action.error,
        loading: false,
      };
    case actionType.LOG_OUT:
      return {
        ...State,
        token: null,
        userId: null,
      };
    case actionType.SET_AUTH_REDIRECT_PATH:
      return {
        ...State,
        authRedirectPath: Action.path,
      };
    default:
      return State;
  }
};
