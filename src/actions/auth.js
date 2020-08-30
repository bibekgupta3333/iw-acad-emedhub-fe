import axios from "axios";
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
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILE_FAIL,
} from "./types";

export const signup = (newUser) => async (dispatch) => {
  const { username, email, password, password2, is_buyer, is_seller } = newUser;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    username,
    email,
    password,
    password2,
    is_buyer,
    is_seller,
  });
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/accounts/signup/",
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGIN_FAIL,
  });
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let body = JSON.stringify({ email, password });
  try {
    const res1 = await axios.post(
      "http://127.0.0.1:8000/api/accounts/token/",
      body,
      config
    );
    console.log(res1.data.access);

    const res2 = await axios.get(
      `http://127.0.0.1:8000/api/accounts/user/${email}/`,
      config
    );
    console.log(res2.data);

    let data = { user: res2.data, access: res1.data.access };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const reset = (user) => async (dispatch) => {
  const { email } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let body = JSON.stringify({ email });

  console.log(body);
  const res1 = await axios.post(
    "http://127.0.0.1:8000/api/accounts/reset/",
    body,
    config
  );
  console.log(res1.data);
};

export const get_token = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(token);
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/accounts/activate/${token}/`,
      config
    );
    console.log(res);
    dispatch({
      type: GET_TOKEN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
  }
};

export const reset_token = (user) => async (dispatch) => {
  const { token, password, password2 } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let body = JSON.stringify({ password, password2 });
  console.log(token, password, password2);
  try {
    console.log(body);
    const res1 = await axios.put(
      `http://127.0.0.1:8000/api/accounts/activate/${token}/`,
      body,
      config
    );
    console.log(res1.data);
    dispatch({
      type: RESET_TOKEN_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
  }
};

export const get_profile = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/accounts/users/${id}/`,
      config
    );

    console.log("backend", res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
    });
  }
};

export const update_profile = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  console.log("backend", users);

  try {
    const res1 = await axios.put(
      `http://127.0.0.1:8000/api/accounts/users/${users[0]}/`,
      users[1],
      config
    );
    console.log("data", res1.data);

    dispatch({
      type: UPDATE_PROFILE,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
  }
};
export const get_company_profile = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/accounts/company/${id}/`,
      config
    );

    console.log("backend", res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
    });
  }
};
export const update_company_profile = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  console.log("backend", users);

  try {
    const res1 = await axios.put(
      `http://127.0.0.1:8000/api/accounts/company/${users[0]}/`,
      users[1],
      config
    );
    console.log("data", res1.data);

    dispatch({
      type: UPDATE_PROFILE,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
  }
};
