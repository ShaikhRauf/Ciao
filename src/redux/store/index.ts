import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
 
import monitorReducersEnhancer from "../helper/monitorReducer";
import loggerMiddleware from "../helper/logger";
import authMiddleware from "../middleware/authMiddleware";
import rootReducer from "../reducers";
 
export default function configureStore() {
 const middlewares = [loggerMiddleware, thunkMiddleware,authMiddleware];
 const middlewareEnhancer = applyMiddleware(...middlewares);
 
 const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
 const composedEnhancers :any = compose(...enhancers);
 
 const store = createStore(rootReducer,composedEnhancers);
 
 return store;
}