import { get, post } from "./common/common";
import Config from "./common/config";
import * as actionType from './action_utils/actionTypes';
import {requestStarted, requestCompleted} from './app';

export const loadNotices = (noticeType,isActive,query) => async (
    dispatch,
    getState
) => {
    const category = noticeType.toUpperCase()
    dispatch(requestStarted());
    const response = await get(
        Config.BASE_URL + `noticeboard/list?category=${category}&isActive=${isActive}&limit=10&offset=0&query=${query}`,
        null,dispatch
      );
      console.log('API ',Config.BASE_URL + `noticeboard/list?category=${category}&isActive=${isActive}&limit=10&offset=0&query=${query}`)
    // console.log("noticeboards->", response);
    
    dispatch({
      type: actionType.LOAD_NOTICES,
      payload: response,
    });
    dispatch(requestCompleted());
};
export const loadNoticeCount = () => async (
  dispatch,
  getState
) => {
  dispatch(requestStarted());
  try{
  const response = await get(
      Config.BASE_URL + `noticeboard/count`,
      null,dispatch
    );
  
  dispatch({
    type: actionType.LOAD_NOTICE_COUNTS,
    payload: response,
  });
  }catch(err){}
  dispatch(requestCompleted());
};

export const noticePinUnpin = (currentPinStatus, requestData) => async (dispatch, getState) => {
    
    let API_CALL =  currentPinStatus ? Config.BASE_URL +  "noticeboard/unPinANotice" : Config.BASE_URL +  "noticeboard/pinANotice"
    console.log("notice pin unpin req data >>",requestData,currentPinStatus, API_CALL)
    dispatch(requestStarted());
    try {
      const response = await post(
        API_CALL,
        requestData,
        dispatch
      );
    } catch (err) {
        console.log('ERRR notice pinunpin',err)
    }
    dispatch(requestCompleted());
    return true;
  };

  export const readNotice = (requestData) => async (dispatch, getState) => {
    
    let API_CALL =   Config.BASE_URL +  "noticeboard/readANotice";
   dispatch(requestStarted());
    try {
      const response = await post(
        API_CALL,
        requestData,
        dispatch
      );
    } catch (err) {
        console.log('ERRR notice read',err)
    }
    dispatch(requestCompleted());
    return true;
  };