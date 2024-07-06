import { combineReducers } from "redux";
import userReducer from "./slice/userSlice";
import productsSlice from "./slice/productsSlice";
import cartSlice from "./slice/cartSlice";
const rootReducer = combineReducers({
  auth: userReducer,
  products: productsSlice,
  cart: cartSlice,
});

export default rootReducer;
