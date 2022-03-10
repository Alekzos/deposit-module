import { UserAction, userActionTypes, userState } from "../../data/types";

const initialState: userState = {
  user: [],
  loading: false,
  isUserLogged: false,
  error: null,
};

export const useReducer = (
  state = initialState,
  action: UserAction
): userState => {
  switch (action.type) {
    case userActionTypes.LOGIN:
      return { loading: true, error: null, isUserLogged: false, user: [] };
    case userActionTypes.LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isUserLogged: true,
        user: action.payload,
      };
    case userActionTypes.LOGIN_ERROR:
      return {
        loading: false,
        error: action.payload,
        isUserLogged: false,
        user: [],
      };
    default:
      return state;
  }
};
