import { get, post, postFormData } from "./common/common";
import Config from "./common/config";
import * as actionType from "./action_utils/actionTypes";
import { requestStarted, requestCompleted } from "./app";

export const loadSupportTickets = (query) => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(Config.BASE_URL + `hub247/tickets?query=${query}`,null,dispatch);

  dispatch({
    type: actionType.LOAD_SUPPORT_TICKETS,
    payload: response,
  });
  dispatch(requestCompleted());
};

export const loadTicketDetails = (id) => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `hub247/ticketDetails?ticketId=${id}`,null,dispatch
  );
  response.ticketDetails && response.ticketDetails.length > 0
    ? dispatch({
        type: actionType.LOAD_SUPPORT_TICKET_DETAILS,
        payload: response.ticketDetails,
      })
    : null;
  dispatch(requestCompleted());
};

export const getTicketTypes = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `hub247/ticketcategories?grouptype=Feduni`,null,dispatch
  );

  dispatch({
    type: actionType.GET_TICKET_TYPES,
    payload: response,
  });
  dispatch(requestCompleted());
};

export const getTicketSubCat = (selectedCat) => async (dispatch, getState) => {
  dispatch(requestStarted());
  const response = await get(
    Config.BASE_URL + `hub247/ticketsubcategories?category=${selectedCat}`,null,dispatch
  );

  dispatch({
    type: actionType.GET_TICKET_SUB_TYPES,
    payload: response,
  });
  dispatch(requestCompleted());
};

export const createTicket = (requestData) => async (dispatch, getState) => {
  dispatch(requestStarted());
  var FormData = require("form-data");
  var formData = new FormData();
  // formData.append("ticket_Type_Id", requestData.ticket_Type_Id);
  formData.append("message", requestData.message);
  formData.append("subject", requestData.subject);
  formData.append("group_id", requestData.group_id);

  formData.append("ticket_subcategory_Id", requestData.ticket_subcategory_Id);
  formData.append("ticket_category_name", requestData.ticket_category_name);

      
  if (requestData.files) {
    requestData.files.forEach((element) => {
      formData.append("files", element);
    });
  }

  console.log("createTicket formData ", formData);

  return new Promise((resolve, reject) => {
    postFormData(Config.BASE_URL + `hub247/createTicket`, formData, dispatch)
      .then((response) => {
        dispatch(requestCompleted());
        resolve(true);
      })
      .catch((err) => {
        dispatch(requestCompleted());
        reject();
      });
  });
};

export const addTicketResponse = (requestData) => async (
  dispatch,
  getState
) => {
  // console.log(
  //   " addTicketResponse -> ",
  //   Config.BASE_URL + " req " + JSON.stringify(requestData.files)
  // );

console.log('requestData.files ',requestData.files)


  dispatch(requestStarted());
  var FormData = require("form-data");
  var formData = new FormData();
  formData.append("ticket_Id", requestData.ticket_Id);
  formData.append("message", requestData.message);
  
  if (requestData.files) {
    requestData.files.forEach((element) => {
      formData.append("files", element);
    });
  }

  console.log("formData ", formData);
  return new Promise((resolve, reject) => {
    postFormData(Config.BASE_URL + `hub247/addTicketResponse`, formData, dispatch)
      .then((response) => {
        dispatch(requestCompleted());
        resolve(true);
      })
      .catch((err) => {
        dispatch(requestCompleted());
        reject();
      });
  });
};
