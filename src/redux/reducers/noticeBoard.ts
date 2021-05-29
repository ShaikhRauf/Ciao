import * as actionTypes from "../action/action_utils/actionTypes";
import { ActionType } from "./types";
const initialState = {
  noticeList :[],
  noticePinUnPinResp:null,
  noticeCounts:{pinned:0,academic:0,support:0,enrollments:0,exam:0}
};
const noticeBoardReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.LOAD_NOTICES: {
      return {
        ...state,
        noticeList: action.payload.data,
        // pastNotices: action.payload.pastAssignments,
      };
    }
    case actionTypes.PIN_UNPIN_NOTICES: {
        return {
          ...state,
          noticePinUnPinResp: action.payload.data,
          // pastNotices: action.payload.pastAssignments,
        };
      }
      case actionTypes.LOAD_NOTICE_COUNTS:{
        return{
          ...state,
          noticeCounts:action.payload
        };
      }
    default: {
      return state;
    }
  }
};
export default noticeBoardReducer;