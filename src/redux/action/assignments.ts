import { get, post } from "./common/common";
import Config from "./common/config";
import * as actionType from './action_utils/actionTypes';
import {requestStarted, requestCompleted} from './app';
export const loadAssignments = (query) => async (
    dispatch,
    getState
) => {
    dispatch(requestStarted());
    const response = await get(
        Config.BASE_URL + `progresscard/assignments?query=${query}`,null,dispatch
      );
    //console.log("assignments->", response.pastAssignments);
    dispatch({
      type: actionType.LOAD_ASSIGNMENTS,
      payload: response,
    });
    dispatch(requestCompleted());
};