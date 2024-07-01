import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
