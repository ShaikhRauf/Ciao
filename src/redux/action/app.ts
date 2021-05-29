import Constants from "./common/constant"

export const requestCompleted = () => {
    return{type: Constants.REQUEST_COMPLETED,}
  };
  
export const requestStarted = () => {
    return{type: Constants.REQUEST_STARTED}    
  };

  