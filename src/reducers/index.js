import { combineReducers } from "redux";
import store from "./store.js";
import auth from "./auth";
import order from "./order";
import alert from "./alert";

export default combineReducers({
  store,
  alert,
  auth,
  order,
});
