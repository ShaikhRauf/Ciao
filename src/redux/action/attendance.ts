import { postForCapri, post } from "./common/common";
import Config from "./common/config";

export const MARK_ATTENDANCE_SUCCESS = "MARK_ATTENDANCE_SUCCESS";
export const MARK_ATTENDANCE_RESPONSE = "MARK_ATTENDANCE_RESPONSE";

import { requestStarted, requestCompleted } from "./app";

export const setMarkAttendanceSuccess = () => async (dispatch) => {
  dispatch({
    type: MARK_ATTENDANCE_SUCCESS,
    // payload: move,
  });
};

// export const markAttendance = (requestData) => async (
//     dispatch,
//     getState
// ) => {

//   try{
//     const response = await postForCapri(Config.CAPRI_BASE_URL + "events/mark-attendance",requestData,dispatch);
//     console.log(
//         " markAttendance -> ",
//         Config.CAPRI_BASE_URL + " req "+requestData
//     );

//     dispatch({
//       type: MARK_ATTENDANCE_RESPONSE,
//       payload: response,
//     });
//     return {response, error:null}
//     // console.log("markAttendance response", response);

//   } catch (e) {
//     console.log("EEEEE", e.response)
//     return {response:null, error:e.response.data.message}
//   }
// };


export const markAttendance = (requestData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(requestStarted());
    const response = await post(Config.BASE_URL + "user/markAttendance",requestData,dispatch);
    console.log("Mark Attendance Resp ",requestData, response)
    dispatch(requestCompleted());
    return { response: response, error: null }
  } catch (e) {
    console.log(" mark attendance ", e.response.data);
    dispatch(requestCompleted());
    return { response: null, error: e.response.data.message };
  }
};
