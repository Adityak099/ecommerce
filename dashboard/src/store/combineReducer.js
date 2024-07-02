import { combineReducers } from "redux";
import userReducer from "./slice/userSlice";

const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
