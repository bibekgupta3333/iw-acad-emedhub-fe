// imports
import {
  GET_ORDERS,
  GET_ORDERS_FAIL,
  DELETE_ORDERED_PRODUCT,
  GET_ORDER,
  GET_CHECKOUT,
  GET_CHECKOUT_FAIL,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

// for getting order item into cart
export const get_order_product = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/orders/${id}/`,
      config
    );
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAIL,
    });
  }
};

// for updating order cart
export const update_order_product = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const { id, quantity } = users;

  try {
    const res = await axios.put(
      `https://bibekgupta4444.pythonanywhere.com/api/orders/${id}/`,
      { quantity: Number(quantity) },
      config
    );
    dispatch(setAlert("Updated cart succesfully.", "success"));
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAIL,
    });
    dispatch(setAlert("Cart was not updated. Update again!", "danger"));
  }
};

// for getting single order item
export const get_order_products = (pages) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    pages = localStorage.getItem("pages");
    if (pages) {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/orders/?page=${pages}`,
        config
      );

      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    } else {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/orders/?page=1`,
        config
      );

      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAIL,
    });
  }
};

// for deleting order item
export const delete_order_product = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.delete(
      `https://bibekgupta4444.pythonanywhere.com/api/orders/${id}/`,
      config
    );
    dispatch({
      type: DELETE_ORDERED_PRODUCT,
      payload: id,
    });
    document.location.reload();
    dispatch(setAlert("Order item deleted successfully.", "success"));
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAIL,
    });
    dispatch(setAlert("Order item was not deleted. Delete Again !", "danger"));
  }
};

// for creating order item
export const create_order_product = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const { user, quantity, product } = id;
  let data = JSON.stringify({ user, quantity, product });

  try {
    const res = await axios.post(
      "https://bibekgupta4444.pythonanywhere.com/api/orders/create/",
      data,
      config
    );
    dispatch(setAlert("Order added successfully to cart.", "success"));
  } catch (err) {
    dispatch(
      setAlert(
        "Order was not added to cart. Add again!. Login Needed!",
        "danger"
      )
    );
  }
};

// for creating checkout of cart
export const create_checkout_product = (detail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const { user, products, phone, shipping_address } = detail;
  let data = JSON.stringify({ user, products, phone, shipping_address });
  try {
    dispatch(
      setAlert("Your checkout has been created. Delivery Started", "success")
    );
    const res = await axios.post(
      "https://bibekgupta4444.pythonanywhere.com/api/orders/cart/",
      {
        user: Number(user),
        products: products,
        phone: Number(phone),
        shipping_address: shipping_address,
      },
      config
    );
  } catch (err) {
    dispatch(setAlert("Checkout Failed. Checkout Again!", "danger"));
  }
};

// for getting checkouts
export const get_checkouts = (pages) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    if (pages) {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/orders/checkouts/?page=${pages}`,
        config
      );

      dispatch({
        type: GET_CHECKOUT,
        payload: res.data,
      });
    } else {
      const res = await axios.get(
        `https://bibekgupta4444.pythonanywhere.com/api/orders/checkouts/?page=1`,
        config
      );

      dispatch({
        type: GET_CHECKOUT,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_CHECKOUT_FAIL,
    });
  }
};
