import axios from "axios";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_FAIL,
  CREATE_PRODUCT,
  GET_CATEGORY,
  GET_CATEGORY_FAIL,
  GET_SUB,
  GET_SUB_FAIL,
  GET_BRAND,
  GET_BRAND_FAIL,
  GET_USER_PRODUCT,
  DELETE_USER_PRODUCT,
} from "./types";
import { setAlert } from "./alert";

// for getting  all product with search activities
export const get_products = (page) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    if (page) {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/store/product/?q=${
          page[1] ? page[1] : ""
        }&o=-created&page=${page[0]}`,
        config
      );
      console.log("backend", res.data);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } else {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/store/product/?q=${page[1]}&o=-created&page=1`,
        config
      );

      console.log("backend", res.data);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_FAIL,
    });
  }
};

// for getting category
export const get_category = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/store/category/`,
      config
    );
    console.log("backend category", res.data);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_FAIL,
    });
  }
};

// for getting sub_category
export const get_sub = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/store/sub/`,
      config
    );
    console.log("backend category", res.data);
    dispatch({
      type: GET_SUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SUB_FAIL,
    });
  }
};

// for getting brands
export const get_brand = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/store/brand/`,
      config
    );
    console.log("backend category", res.data);
    dispatch({
      type: GET_BRAND,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BRAND_FAIL,
    });
  }
};

// for getting according to user
export const get_user_product = (page) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    page = localStorage.getItem("page");
    if (page) {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/store/product/user/?page=${page}`,
        config
      );
      console.log("backend", res.data);

      dispatch({
        type: GET_USER_PRODUCT,
        payload: res.data,
      });
    } else {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/store/product/user/?page=1`,
        config
      );

      console.log("backend", res.data);
      dispatch({
        type: GET_USER_PRODUCT,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_FAIL,
    });
  }
};

// for deleting user product
export const delete_user_product = (slug) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.delete(
      `https://bibekgupta4444.pythonanywhere.com/api/store/product/${slug}/`,
      config
    );
    console.log("backend delete", res.data);
    dispatch({
      type: DELETE_USER_PRODUCT,
      payload: slug,
    });
    dispatch(setAlert("Product Deleted Successfully", "success"));
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_FAIL,
    });
    dispatch(
      setAlert("Product was not deleted.Again delete product !", "danger")
    );
  }
};

//  for creating product
export const create_product = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res1 = await axios.post(
      `https://bibekgupta4444.pythonanywhere.com/api/store/product/create/`,
      users[0],
      config
    );
    console.log("data", res1.data);

    dispatch({
      type: CREATE_PRODUCT,
    });
    dispatch(setAlert("Product created successfully", "success"));
  } catch (err) {
    dispatch(
      setAlert("Product was not created. Again create product!", "danger")
    );
    console.log(err);
  }
};

// for getting a single product
export const get_product = (slug) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/store/product/${slug}/`,
      config
    );
    console.log("backend", res.data);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_FAIL,
    });
  }
};

// for updating single product
export const update_product = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(users);
  try {
    const res1 = await axios.put(
      `https://bibekgupta4444.pythonanywhere.com/api/store/product/${users[0]}/`,
      users[1],
      config
    );
    console.log("data", res1.data);
    dispatch(setAlert("Product updated successfully.", "success"));
  } catch (err) {
    dispatch(
      setAlert("Product was not updated. Again update the product", "danger")
    );
    console.log(err);
  }
};
