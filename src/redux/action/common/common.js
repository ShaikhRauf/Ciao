import axios from "axios";
import Config,{oktaConfig} from "./config";
import AsyncStorage from "@react-native-community/async-storage";
// import jwt_decode from "jwt-decode";

// import { getGraphAccessToken } from "../login";
// import { ON_LOADING_FINISHED } from "./sessionActions";
// import { SET_ERROR } from "./appError";
import {logoutUser} from '../login';
import { requestStarted, requestCompleted } from "../app";

import { Platform } from "react-native";

const instance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 15000,
});

const instanceCapri = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 15000,
});

const fileUploadInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 100000,
});

const instanceWithNoAuth = axios.create({
  timeout: 60000,
});



export const getGraphAccessToken = async () => {
  
};


// Add a response interceptor
instanceCapri.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error-----", error.response);
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      // gotoLogin();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

fileUploadInstance.interceptors.request.use(
  async (config) => {
    // const tokenData = await getAccessToken();
    // if (tokenData) {
    //   config.headers["Authorization"] = `Okta ${tokenData.access_token}`;
    // }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
fileUploadInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //console.log('error-----',error.response)
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      // gotoLogin();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const get = (url, config = null,dispatch=null) => {
  console.log("url in get  ", url);
  return new Promise((resolve, reject) => {
    instance
      .get(url, config)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if(error=='token-expired'){
          alert("Session Expired");
          dispatch(logoutUser());
        }
        dispatch(requestCompleted());
        reject(error);
      });
  });
};

export const post = (url, data, dispatch = null) => {
  // console.log("url ",url);
  // console.log("data in Post ",data);
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          console.log("error in Post111", result.data);
          reject(result.data);
        }
      })
      .catch((error) => {
        console.log("error in Post", error);
        if(error=='token-expired'){
          alert("Session Expired");
          dispatch(logoutUser());
        }
        dispatch(requestCompleted());
        reject(error);
      });
  });
};
export const postFormData = (url, data, dispatch = null) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        console.log("Errr>>> ",error)
        if(error=='token-expired'){
          alert("Session Expired");
          dispatch(logoutUser());
        }
        dispatch(requestCompleted());
        reject(error);
      });
  });
};

export const postForCapri = (url, data, dispatch = null) => {
  console.log("url ", url);
  console.log("data in Post ", data);
  return new Promise((resolve, reject) => {
    instanceCapri
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          console.log("error in Post111", result.data);
          reject(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if(error=='token-expired'){
          alert("Session Expired");
          dispatch(logoutUser());
        }
        dispatch(requestCompleted());
        reject(error);
      });
  });
};

const getParsedErrorMessage = (error) => {
  let errorMessage = "";
  if (error.response) {
    console.log("Error error.response::::", error.response.data[0]);
    const responseData =
      error.response && error.response.data ? error.response.data : [];
    if (responseData && Array.isArray(responseData)) {
      let data = responseData[0];
      if (data && data.type === "unique violation") {
        console.log("Uniques Violation::");
        if (data.path === "passportNo") {
          errorMessage =
            "Your entered passport no " +
            '"' +
            data.value +
            '" is already exist, please verify your passport no.';
        }
        if (data.path === "studentEmail") {
          errorMessage =
            "Your entered email id " +
            '"' +
            data.value +
            '" is already exist in database, please verify your email id.';
        }

        if (data.path === "phone") {
          errorMessage =
            "Your entered phone number " +
            '"' +
            data.value +
            '" is already exist in database, please verify your phone number.';
        }

        if (data.path === "mobile") {
          errorMessage =
            "Your entered mobile number " +
            '"' +
            data.value +
            '" is already exist in database, please verify your mobile number.';
        }
      }
    } else {
      if (
        responseData &&
        responseData.statusCode &&
        responseData.statusCode == 401
      ) {
        errorMessage = "Invalid username or password";
      }
    }
  } else if (error.request) {
    if (error.code && error.code === "ECONNABORTED") {
      errorMessage = "The request has timed out, Please try again";
    }
  } else {
    console.log("Error error.message::::", error.message);
  }

  // if (responseData)
  if (!errorMessage) {
    errorMessage = "Something went wrong, Please try again later";
  }

  return errorMessage;
};

export const postWithoutHeader = (url, data, dispatch = null) => {
  return new Promise((resolve, reject) => {
    instanceWithNoAuth
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          console.log("Error1111::::", result.data);
          reject(result.data);
        }
      })
      .catch((error) => {
        console.log("Error:::122112:", error);
        if (dispatch) {
          dispatch({ type: SET_ERROR, payload: getParsedErrorMessage(error) });
          dispatch({ type: ON_LOADING_FINISHED });
        }
        // console.log("Error::::", JSON.stringify(error));

        reject(error);
      });
  });
};
export const postWithHeader = (url, data, header) => {
  return new Promise((resolve, reject) => {
    fileUploadInstance
      .post(url, data, header)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const put = (url, data, dispatch = null) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, data)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        if (dispatch) {
          dispatch({ type: SET_ERROR, payload: getParsedErrorMessage(error) });
          dispatch({ type: ON_LOADING_FINISHED });
        }
        reject(error);
      });
  });
};

export const putWithHeader = (url, data, header) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, data, header)
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const remove = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        data,
      })
      .then((result) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const patch = (url, data,dispatch=null) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(url, data)
      .then((result) => {
        console.log(">> patch result", result)
        if (result.status === 200) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      })
      .catch((error) => {
        console.log(">> patch error", error)
        if(error=='token-expired'){
          alert("Session Expired");
          dispatch(logoutUser());
        }
        dispatch(requestCompleted());
        reject(error);
      });
  });
};
