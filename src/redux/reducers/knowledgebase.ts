import * as actionTypes from "../action/action_utils/actionTypes";
import { ActionType } from "./types";
const initialState = {
  kbList :null,
  unitCodes:[],
  authors:null
};
const knowledgebaseReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.KB_LOADLIST: {
      return {
        ...state,
        kbList: action.payload,
      };
    }
    case actionTypes.LOAD_USER_UNITCODE:{
      return {
          ...state,
          unitCodes:action.payload
      };
    }
    case actionTypes.UPDATE_USER_UNITCODE:{
      return {
        ...state,
          unitCodes:action.payload
      };
    }
    case actionTypes.LOAD_AUTHORS:{
      return {
        ...state,
          authors:action.payload
      };
    }
    default: {
      return state;
    }
  }
};
export default knowledgebaseReducer;