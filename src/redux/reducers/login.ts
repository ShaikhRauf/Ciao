import * as actionTypes from "../action";
import { ActionType } from "./types";
import { LOGOUT_USER } from "../action/action_utils/actionTypes";
const initialState = {
  isUserLoggedIn: false,
  username: null,
  name: null,
  user: null,
  loading:true
};
const loginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isUserLoggedIn: true,
        loading: false
        // user: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isUserLoggedIn: false,
        loading: false
        // user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default loginReducer;