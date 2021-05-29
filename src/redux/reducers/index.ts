import { combineReducers } from "redux";
import loginReducer from "./login";
import timeTableReducer from "./home";
import attendanceReducer from "./attendance";
import appReducer from './app';
import knowledgebaseReducer from "./knowledgebase";
import progressCardReducer from "./progrssCard";
import assignmentReducer from "./assignments";
import supportTicketsReducer from "./supportTickets";
import userReducer from "./user";
import noticeBoardReducer from "./noticeBoard";
const rootReducer = combineReducers({
    login: loginReducer,
    timeTable: timeTableReducer,
    attendance:attendanceReducer, 
    app:appReducer,
    knowledgebase:knowledgebaseReducer,
    progressCard:progressCardReducer,
    assignments:assignmentReducer,
    user:userReducer,
    supportTickets:supportTicketsReducer,
    noticeBoard:noticeBoardReducer
  });
  export type RootState = ReturnType<typeof rootReducer>;
  export default rootReducer;