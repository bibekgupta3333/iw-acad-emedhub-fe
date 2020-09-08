import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_FAIL,
  CREATE_PRODUCT,
  GET_CATEGORY_FAIL,
  GET_CATEGORY,
  GET_BRAND,
  GET_SUB,
  GET_BRAND_FAIL,
  GET_SUB_FAIL,
  GET_USER_PRODUCT,
  DELETE_USER_PRODUCT,
} from "../actions/types";

const initalState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  category: [],
  sub_category: [],
  brand: [],
  product: {}, //for one item
  products: {}, //for home page
  user_product: {}, //for home page
};

export default function (state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT: //for one item
      return {
        ...state,
        product: payload,
      };
    case GET_PRODUCTS: //for home page
      return {
        ...state,
        count: payload.count,
        next: payload.next,
        previous: payload.previous,
        results: payload.results,
      };
    case GET_USER_PRODUCT: //for user page products
      return {
        ...state,
        user_product: payload,
      };
    case DELETE_USER_PRODUCT: //for delete user page products
      return {
        ...state,
        user_product: state.user_product.results.filter(
          (item) => payload !== item.slug
        ),
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        count: 0,
        next: null,
        previous: null,
        results: [],
        product: {},
        products: {},
      };

    case CREATE_PRODUCT:
      return {
        ...state,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        category: [],
      };
    case GET_SUB:
      return {
        ...state,
        sub_category: payload,
      };
    case GET_SUB_FAIL:
      return {
        ...state,
        sub_category: [],
      };
    case GET_BRAND:
      return {
        ...state,
        brand: payload,
      };
    case GET_BRAND_FAIL:
      return {
        ...state,
        brand: [],
      };
    default:
      return {
        ...state,
      };
  }
}
