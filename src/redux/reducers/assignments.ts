import * as actionTypes from "../action/action_utils/actionTypes";
import { ActionType } from "./types";
const initialState = {
  upcomingAssignments :null,
  pastAssignments:null
};
const assignmentReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.LOAD_ASSIGNMENTS: {
      return {
        ...state,
        upcomingAssignments: action.payload.upcomingAssignments,
        pastAssignments: action.payload.pastAssignments,
      };
    }
    default: {
      return state;
    }
  }
};
export default assignmentReducer;