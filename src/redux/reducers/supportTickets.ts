import * as actionTypes from "../action/action_utils/actionTypes";
import { ActionType } from "./types";
const initialState = {
  openTickets: null,
  closedTickets: null,
  ticketDetails: null,
  createSupportTicket: null,
  ticketTypes: [],
  ticketSubTypes: [],
  addTicketResponse :null,
  docBaseURL:''
};
class ticketType {
  value: number;
  label: String;
}

const supportTicketsReducer = (state = initialState, action: ActionType) => {
  
  switch (action.type) {
    case actionTypes.LOAD_SUPPORT_TICKETS: {
      console.log("++$$++ ",action.payload.imageBaseURL)
      return {
        ...state,
        openTickets: action.payload.openTickets,
        closedTickets: action.payload.closedTickets,
        docBaseURL: action.payload.imageBaseURL
      };
    }
    case actionTypes.LOAD_SUPPORT_TICKET_DETAILS: {
      return {
        ...state,
        ticketDetails: action.payload,
      };
    }
    case actionTypes.CREATE_TICKET: {
      return {
        ...state,
        createSupportTicket: action.payload,
      };
    }
    case actionTypes.GET_TICKET_TYPES: {
      // ticketTypes: action.payload.Response

      const ticketTypeArray: any = [];
      action.payload.Response.forEach((element) => {
        let type = new ticketType();
        type.label = element.category;
        type.value = element.category;
        if (element.category) {
          ticketTypeArray.push(type);  
        }
        
      });
      console.log("ticketTypeArray >> ", ticketTypeArray);

      return {
        ...state,
        ticketTypes: ticketTypeArray,
        ticketSubTypes:[]
      };
    }
    case actionTypes.GET_TICKET_SUB_TYPES: {
      const ticketSubTypeArray: any = [];
      action.payload.Response.forEach((element) => {
        let type = new ticketType();
        type.label = element.subcat;
        type.value = element.id;
        ticketSubTypeArray.push(type);
      });
      console.log("ticketSubTypeArray >> ", ticketSubTypeArray);

      return {
        ...state,
        ticketSubTypes: ticketSubTypeArray,
      };
    }
    case actionTypes.ADD_TICKET_RESPONSE: {
      console.log("addTicketResponse >> ", action.payload);
      return {
        ...state,
        addTicketResponse: action.payload,
      };
    }
    default: {
      return state;
    }
    
  }
};
export default supportTicketsReducer;
