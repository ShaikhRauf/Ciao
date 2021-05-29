
import { get, post, getGraphAccessToken } from "./common/common";
import Config,{oktaConfig} from "./common/config";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
import { requestStarted, requestCompleted } from "./app";
import * as actionTypes from "./action_utils/actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";


export const setLoginSuccess = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_SUCCESS,
    // payload: move,
  });
};

export const loginwithGraph = () => async (dispatch) => {
  dispatch(requestStarted());
  let result;
  try {
    // result = await authorize(oktaConfig);
    // await AsyncStorage.setItem("graphToken", result.accessToken);
    // await AsyncStorage.setItem(
    //   "accessTokenExpirationDate",
    //   result.accessTokenExpirationDate
    // );
    // await AsyncStorage.setItem("refreshToken", result.refreshToken);

    setLoginSuccess();

    //get logged user details
    // const response = await get(Config.BASE_URL + `user/details`,null,dispatch);

    // if (response && response.data) {
    //   await AsyncStorage.setItem(
    //     "loggedUserProfilePic",
    //     response.data.profileSrc
    //   );
    //   await AsyncStorage.setItem("loggedUserName", response.data.familyName);
    //   await AsyncStorage.setItem(
    //     "loggedUserProfilePic",
    //     response.data.profileSrc
    //   );
    //   await AsyncStorage.setItem(
    //     "loggedUserId",
    //     response.data.providerStudentID
    //   );
    // }
    dispatch(requestCompleted());
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      // payload: move,
    });
  } catch (err) {
    dispatch(requestCompleted());
    alert("Login Failed");
  }

};


export const validateUserLogin = () => async (dispatch) => {
  const tokenData = await AsyncStorage.getItem("graphToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (tokenData)
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      // payload: move,
    });

  console.log(tokenData);
};
export const logoutUser = () => async (dispatch) => {
  dispatch(requestStarted());
  const loggedUserId = await AsyncStorage.getItem("loggedUserId");
  const token = await getGraphAccessToken();

  console.log("Token ** ",token)
  // const result = await revoke(config, {
  //   tokenToRevoke:refreshToken,
  //   includeBasicAuth: true,
  //   sendClientId: true,
  // });
  // console.log('logout',result);
  if(token)
  {
    try
    {
      await axios.post(
        // `https://graph.microsoft.com/beta/users/${loggedUserId}@students.atmc.edu.au/revokeSignInSessions`,
        `https://graph.microsoft.com/beta/users/${loggedUserId}@students.atmc.edu.au/invalidateAllRefreshTokens`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }catch(err){dispatch(requestCompleted());}
  }

  await AsyncStorage.removeItem("graphToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("loggedUserProfilePic");
  await AsyncStorage.removeItem("loggedUserName");
  await AsyncStorage.removeItem("loggedUserId");
  await AsyncStorage.removeItem("userVerifCode");
  dispatch(requestCompleted());
  dispatch({
    type: actionTypes.LOGOUT_USER,
    // payload: move,
  });
};
