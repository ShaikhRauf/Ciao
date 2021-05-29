import {  post } from "./common/common";
import Config from "./common/config";
import * as actionType from './action_utils/actionTypes';
import {requestStarted, requestCompleted} from './app';

// export const voiceToInstitute = ( requestData) => async (dispatch, getState) => {
    
//     let API_CALL = Config.BASE_URL +  "feedback"
//     console.log("feedback req data >>",requestData, API_CALL)
//     dispatch(requestStarted());
//     try {
//       const response = await post(
//         API_CALL,
//         requestData,
//         dispatch
//       );

//       console.log("resp:> ",response)
//     } catch (err) {
//         console.log('ERRR feedback',err)
//     }
//     dispatch(requestCompleted());
//     return true;
//   };


  export const voiceToInstitute = (requestData) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(requestStarted());
      const response = await post(Config.BASE_URL + "feedback",requestData,dispatch);
      console.log("feedback Resp ",requestData, response)
      dispatch(requestCompleted());
      return { response: response, error: null }
    } catch (e) {
      console.log(" feedback ", e.response.data);
      dispatch(requestCompleted());
      return { response: null, error: e.response.data.message };
    }
  };
