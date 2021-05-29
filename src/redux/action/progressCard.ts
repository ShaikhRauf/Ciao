import { get } from "./common/common";
import * as actionTypes from "./action_utils/actionTypes";
import Config from "./common/config";
import { requestStarted, requestCompleted } from "./app";

export const PROGRESSION_CARD_SUCCESS = "PROGRESSION_CARD_SUCCESS";
export const PROGRESSION_CARD_RESPONSE = "PROGRESSION_CARD_RESPONSE";

export const ASSESSMENT_SUCCESS = "ASSESSMENT_SUCCESS";
export const ASSESSMENT_RESPONSE = "ASSESSMENT_RESPONSE";

export const UNIT_CODE_SUCCESS = "UNIT_CODE_SUCCESS";
export const GET_UNIT_CODE_RESPONSE = "GET_UNIT_CODE_RESPONSE";
import * as _ from "lodash";

export const getUnitCodes = () => async (dispatch, getState) => {
  try {
    dispatch(requestStarted());
    const response = await get(Config.BASE_URL + `user/enrolledunits`,null,dispatch);
    console.log("enrolledunits ", response);
    var unitCodes = [];
    response.unitCodes.forEach((element) => {
      unitCodes.push({ name: element });
    });

    dispatch({
      type: GET_UNIT_CODE_RESPONSE,
      payload: unitCodes,
    });

    console.log("12 # unitCodes  ", unitCodes);
    dispatch(requestCompleted());
    return { response: unitCodes, error: null };
  } catch (e) {
    console.log(" getUnitCodes EEEEE", e.response);
    dispatch(requestCompleted());
    return { response: null, error: "Something went wrong" };
  }
};

export const getProgressCardAttendance = (unitCode) => async (
  dispatch,
  getState
) => {
  try {
    const response = await get(
      Config.BASE_URL + "progresscard/attendance?unitcode=" + unitCode,null,dispatch
    );
    console.log(
      " getProgressCardAttendance -> ",
      Config.BASE_URL + "progresscard/attendance?unitcode=" + unitCode
    );
    console.log("progresscard/attendance response > ", response);

    dispatch({
      type: PROGRESSION_CARD_RESPONSE,
      payload: { unitcode: unitCode, data: response },
    });
    return { response, error: null };
  } catch (e) {
    console.log("Err", e.response);
    return { response: null, error: e.response.data.message };
  }
};

export const getAssessmentSubmission = (unitCode) => async (
  dispatch,
  getState
) => {
  try {
    const response = await get(
      Config.BASE_URL +
        "progresscard/assignmentssubmission?unitcode=" +
        unitCode,null,dispatch
    );

    dispatch({
      type: ASSESSMENT_RESPONSE,
      payload: { unitcode: unitCode, data: response },
    });
    return { response, error: null };
  } catch (e) {
    console.log("Err", e.response);
    return { response: null, error: e.response.data.message };
  }
};
export const getGrades = (unitCode) => async (dispatch, getState) => {
  try {
    const response = await get(
      Config.BASE_URL + "progresscard/grades?unitcode=" + unitCode,null,dispatch
    );

    const tasksArray = _.reject(response.tasks, {
      taskWeightage: "0",
    });
    let payload_data;
    payload_data = { unitName:response.unitName,avgGrade: response.avgGrade, tasks: tasksArray };
    dispatch({
      type: actionTypes.GRADES_RESPONSE,
      payload: { unitcode: unitCode, data: payload_data },
    });
    return { response, error: null };
  } catch (e) {
    console.log("Err", e.response);
    return { response: null, error: e.response.data.message };
  }
};
