import { get, patch, post, postFormData } from "./common/common";
import Config from "./common/config";
import * as actionType from "./action_utils/actionTypes";
import { logoutUser } from "./login";
import { requestStarted, requestCompleted } from "./app";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { useLinkProps, useNavigation } from "@react-navigation/native";

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(Config.BASE_URL + `user/details`, null, dispatch);
  console.log("userProfile->", response);
  dispatch({
    type: actionType.LOAD_USER_PROFILE,
    payload: response.data,
  });
  dispatch(requestCompleted());
};

export const loadUserCountryStateCityList = (countryName, stateName) => async (
  dispatch,
  getState
) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `masterdata/countryList`,
    null,
    dispatch
  );
  console.log("countryList->", response);
  dispatch({
    type: actionType.GET_COUNTRY_LIST,
    payload: response,
  });

  let countryCode;
  await response.forEach((countryItem) => {
    if (countryItem.name == countryName) {
      countryCode = countryItem.isoCode;
    }
  });

  //load state list for country code
  const stateResponse = await get(
    Config.BASE_URL + `masterdata/stateList/${countryCode}`,
    null,
    dispatch
  );
  dispatch({
    type: actionType.GET_STATE_LIST,
    payload: stateResponse,
  });

  let stateCode;
  await stateResponse.forEach((stateItem) => {
    if (stateItem.name == stateName) {
      stateCode = stateItem.isoCode;
    }
  });

  const cityResponse = await get(
    Config.BASE_URL + `masterdata/cityList/${countryCode}/${stateCode}`,
    null,
    dispatch
  );
  dispatch({
    type: actionType.GET_CITY_LIST,
    payload: cityResponse,
  });

  dispatch(requestCompleted());
};

export const getCountryList = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `masterdata/countryList`,
    null,
    dispatch
  );
  console.log("countryList->", response);
  dispatch({
    type: actionType.GET_COUNTRY_LIST,
    payload: response,
  });
  dispatch(requestCompleted());
};

export const getStateList = (countryCode) => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `masterdata/stateList/${countryCode}`,
    null,
    dispatch
  );
  console.log("state List->", response);
  dispatch({
    type: actionType.GET_STATE_LIST,
    payload: response,
  });
  dispatch(requestCompleted());
};

export const getCityList = (countryCode, stateCode) => async (
  dispatch,
  getState
) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `masterdata/cityList/${countryCode}/${stateCode}`,
    null,
    dispatch
  );
  console.log("city List->", response);
  dispatch({
    type: actionType.GET_CITY_LIST,
    payload: response,
  });
  dispatch(requestCompleted());
};

export const updateProfilePic = (requestData) => async (dispatch, getState) => {
  dispatch(requestStarted());

  var FormData = require("form-data");
  var formData = new FormData();

  if (requestData) {
    formData.append("files", requestData);
  }

  console.log("formData ", formData);
  return new Promise((resolve, reject) => {
    postFormData(
      Config.BASE_URL + `user/updateStudentProfilePic`,
      formData,
      dispatch
    )
      .then((response) => {
        console.log("response ", response);

        dispatch(requestCompleted());
        resolve(true);
      })
      .catch((err) => {
        dispatch(requestCompleted());
        reject();
      });
  });
};

export const getUpdatedProfilePic = () => async (dispatch) => {
  try {
    const response = await get(
      Config.BASE_URL + `user/details`,
      null,
      dispatch
    );

    if (response && response.data) {
      console.warn("response > >", response.data.profileSrc);
      await AsyncStorage.setItem(
        "loggedUserProfilePic",
        response.data.profileSrc
      );
    }
    dispatch(requestCompleted());
    dispatch({
      type: actionType.LOGIN_SUCCESS,
    });
  } catch (err) {
    dispatch(requestCompleted());
    alert("Login Failed");
    dispatch(logoutUser());
  }
};

// export const updateProfileInfo = (requestData) => async (
//   dispatch,
//   getState
// ) => {
// console.log('requestData.files ',requestData.files)
//   dispatch(requestStarted());
//   console.log("requestData ", requestData);
//   return new Promise((resolve, reject) => {
//     patch(Config.BASE_URL + `user`, JSON.stringify(requestData) )
//       .then((response) => {
//         console.log('update profile info ',response)
//         if (response) {
//           Alert.alert("Profile Updated Successfully")
//         } else {
//           Alert.alert("Profile Not Updated")
//         }
//         dispatch(requestCompleted());
//         resolve(true);
//       })
//       .catch((err) => {
//         console.log("patch err",err)
//         dispatch(requestCompleted());
//         reject();
//       });
//   });
// };

export const updateProfileInfo = (requestData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(requestStarted());
    const response = await patch(
      Config.BASE_URL + `user`,
      JSON.stringify(requestData),
      dispatch
    );

    dispatch(requestCompleted());
    return { response: response, error: null };
  } catch (e) {
    console.log(" update Profile ", e.response);
    dispatch(requestCompleted());
    return { response: null, error: "Something went wrong" };
  }
};
