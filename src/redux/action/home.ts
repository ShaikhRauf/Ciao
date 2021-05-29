import { get, post } from "./common/common";
import Config from "./common/config";
import Constants from "./common/constant";
import {requestStarted, requestCompleted} from './app';

export const TIME_TABLE_SUCCESS = "TIME_TABLE_SUCCESS";
export const TIME_TABLE_LIST = "TIME_TABLE_LIST";

export const UPDATE_EVENT_RESPONSE_SUCCESS = "UPDATE_EVENT_RESPONSE_SUCCESS";
export const UPDATE_EVENT_RESPONSE = "UPDATE_EVENT_RESPONSE";

export const setTimetableSuccess = () => async (dispatch) => {
  dispatch({
    type: TIME_TABLE_SUCCESS,
    // payload: move,
  });
};

export const getTimetable = (startDate: any, endDate: any) => async (
  dispatch,
  getState
) => {

  dispatch(requestStarted());

  console.log(
    " getTimetable -> ",
    Config.BASE_URL +
      "timetable?startdatetime=" +
      startDate +
      "&enddatetime=" +
      endDate
  );
  const response = await get(
    Config.BASE_URL +
      "timetable?startdatetime=" +
      startDate +
      "&enddatetime=" +
      endDate
  ,null,dispatch);
  dispatch(requestCompleted());
  console.log("getTimetable response", response);
  dispatch({
    type: TIME_TABLE_LIST,
    payload: response.events,
  });
};

export const setUpdateEventSuccess = () => async (dispatch) => {
  dispatch({
    type: UPDATE_EVENT_RESPONSE_SUCCESS,
    // payload: move,
  });
};

export const postUpdateEventResponse = (requestData) => async (
  dispatch,
  getState
) => {
  
  const response = await post(Config.BASE_URL + "timetable/updateEventResponse?",requestData,dispatch);
  console.log(
     " postUpdateEventResponse -> ",
     Config.BASE_URL + " req "+requestData
   );
  console.log("updateEventResponse response", response);
  dispatch({
    type: UPDATE_EVENT_RESPONSE,
    payload: response,
  });
};

// const requestCompleted = () => (dispatch) => {
//   dispatch({
//       type: Constants.REQUEST_COMPLETED,
//   });
// };

// const requestStarted = () => (dispatch) => {
//   dispatch({
//       type: Constants.REQUEST_STARTED,
//       payload: '',
//   });
// };
