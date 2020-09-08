// imports
import {
  GET_ORDERS,
  GET_ORDERS_FAIL,
  DELETE_ORDERED_PRODUCT,
  GET_ORDER,
  GET_CHECKOUT,
  GET_CHECKOUT_FAIL,
} from "../actions/types";

// create initial state
const initialState = {
  order: {},
  ord: {},
  checkouts: [],
};

// create a function consisting state and action
export default function (state = initialState, action) {
  // destructuring type and payload from action
  const { type, payload } = action;
  switch (type) {
    case GET_CHECKOUT:
      return {
        ...state,
        checkouts: payload,
      };
    case GET_CHECKOUT_FAIL:
      return {
        ...state,
        checkouts: [],
      };
    case GET_ORDER:
      return {
        ...state,
        ord: payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        order: payload,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        order: {},
      };
    case DELETE_ORDERED_PRODUCT: //for delete user page products
      return {
        ...state,
        user_product: state.order.results.filter((item) => payload !== item.id),
      };

    default:
      return {
        ...state,
      };
  }
}
