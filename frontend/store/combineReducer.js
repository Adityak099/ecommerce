import { combineReducers } from "redux";
import userReducer from "./slice/userSlice";
import productsSlice from "./slice/productsSlice";
const rootReducer = combineReducers({
  auth: userReducer,
  products: productsSlice,
});

export default rootReducer;
