import * as actionTypes from "../action/action_utils/actionTypes";
import { ActionType } from "./types";
const initialState = {
  userProfile :null,
  countryList : [],
  stateList:[],
  cityList:[]
};
const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case actionTypes.GET_COUNTRY_LIST: {
      return {
        ...state,
        countryList: action.payload,
      };
    }
    case actionTypes.GET_STATE_LIST: {
      return {
        ...state,
        stateList: action.payload,
      };
    }
    case actionTypes.GET_CITY_LIST: {
      return {
        ...state,
        cityList: action.payload,
      };
    }
    default: {
      return state;
    }
    
  }
};


export default userReducer;

