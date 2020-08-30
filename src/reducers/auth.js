// imports
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_SUCCESS,
  RESET_FAIL,
  RESET_TOKEN_SUCCESS,
  RESET_TOKEN_FAIL,
  GET_TOKEN,
  UPDATE_PROFILE,
  GET_PROFILE,
  GET_PROFILE_FAIL,
} from "../actions/types";

// create initial state
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user_id: localStorage.getItem("token"),
  user: null,
  is_buyer: false,
  is_seller: false,
  profile: {},
  reset_token: null,
  email: null,
};

// create a function consisting state and action
export default function (state = initialState, action) {
  // destructuring type and payload from action
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
      };

    case RESET_TOKEN_FAIL:
    case LOGOUT:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("is_buyer");
      localStorage.removeItem("is_seller");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        isAuthenticated: false,
        user_id: null,
        is_buyer: false,
        is_seller: false,
        profile: {},
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.access);
      localStorage.setItem("id", payload.user.id);
      localStorage.setItem("is_buyer", payload.user.is_buyer);
      localStorage.setItem("is_seller", payload.user.is_seller);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        is_buyer: payload.user.is_buyer,
        is_seller: payload.user.is_seller,
      };

    case RESET_SUCCESS:
      return {
        ...state,
      };
    case RESET_FAIL:
      return {
        ...state,
      };
    case RESET_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        is_buyer: false,
        is_seller: false,
      };
    case GET_TOKEN:
      return {
        ...state,
        email: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile: {},
      };
    case UPDATE_PROFILE:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
