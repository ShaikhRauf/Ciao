import * as actionTypes from "../action";
import { ActionType } from "./types";
const initialState = {
  markAttendanceResponse :null
};
const attendanceReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.MARK_ATTENDANCE_RESPONSE: {
      return {
        ...state,
        markAttendanceResponse: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default attendanceReducer;