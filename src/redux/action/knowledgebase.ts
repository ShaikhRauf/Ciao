import { get, post } from "./common/common";
import * as actionTypes from "./action_utils/actionTypes";
import Config from "./common/config";
import { requestStarted, requestCompleted } from "./app";

export const getKBList = (searchQuery: string, unitCodes: any) => async (
  dispatch,
  getState
) => {
  dispatch(requestStarted());

  let unitString = "";
  unitCodes.forEach((unit) => {
    if (unit.selected) {
      if (unitString) unitString = unitString + "," + unit.name;
      else unitString = unit.name;
    }
  });
  // if(!unitString)
  // unitString='ITECH1103';
  //console.log('ustring',unitString);

  const response = await get(
    Config.BASE_URL +
      `knowledgebase/questions?query=${searchQuery}&unitcode=${unitString}&limit=10&offset=0`
  );

  dispatch({
    type: actionTypes.KB_LOADLIST,
    payload: response,
  });

  dispatch(requestCompleted());

  let author: any = [];
  let counter = 0;
  response.forEach(async (element) => {
    const authorName = await get(
      Config.BASE_URL + `user?email_id=${element.from}`
    );

    author.push(authorName.name);
    counter++;
    if (response.length == counter) {
      dispatch({
        type: actionTypes.LOAD_AUTHORS,
        payload: author,
      });
    }
  });
};
export const getUserUnitCode = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(Config.BASE_URL + `user/enrolledunits`);
  //console.log(response);
  var unitCodes = [];
  response.unitCodes.forEach((element) => {
    unitCodes.push({ name: element, selected: true });
  });
  dispatch({
    type: actionTypes.LOAD_USER_UNITCODE,
    payload: unitCodes,
  });

  let unitString = "";
  unitCodes.forEach((unit) => {
    if (unitString) unitString = unitString + "," + unit.name;
    else unitString = unit.name;
  });
  // console.log('ustring',unitString)

  const response2 = await get(
    Config.BASE_URL +
      `knowledgebase/questions?query=&unitcode=${unitString}&limit=10&offset=0`
  );

  console.log(response2);

  dispatch({
    type: actionTypes.KB_LOADLIST,
    payload: response2,
  });

  dispatch(requestCompleted());

  let author: any = [];
  let counter = 0;
  response2.forEach(async (element) => {
    const authorName = await get(
      Config.BASE_URL + `user?email_id=${element.from}`
    );

    author.push(authorName.name);
    counter++;
    if (response2.length == counter) {
      dispatch({
        type: actionTypes.LOAD_AUTHORS,
        payload: author,
      });
    }
  });

};
export const loadAuthors = (data) => async () => {
  let author: any = [];
  data.forEach(async (element) => {
    const authorName = await get(
      Config.BASE_URL + `user?email_id=${element.from}`
    );

    author.push(authorName.name);
  });
  console.log(author);
};
export const postKBLike = (requestData) => async (dispatch, getState) => {
  dispatch(requestStarted());
  try {
    const response = await post(
      Config.BASE_URL + "knowledgebase/likequestion",
      requestData,
      dispatch
    );
  } catch (err) {}
  dispatch(requestCompleted());
  return true;
};
