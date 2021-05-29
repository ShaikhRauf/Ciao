import * as actionTypes from "../action";
import { ActionType } from "./types";
const initialState = {
  timetableList: [],
  updateEventResponse :{}
};
const homeReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.TIME_TABLE_LIST: {
      return {
        ...state,
        timetableList: action.payload,
      };
    }
    case actionTypes.UPDATE_EVENT_RESPONSE: {
      return {
        ...state,
        updateEventResponse: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default homeReducer;