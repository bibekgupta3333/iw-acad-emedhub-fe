import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_TOKEN_SUCCESS,
  RESET_TOKEN_FAIL,
  GET_TOKEN,
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILE_FAIL,
} from "./types";
import { setAlert } from "./alert";

// signup for buyer
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
      "https://bibekgupta4444.pythonanywhere.com/api/accounts/signup/",
      body,
      config
    );
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    if (res.data.error) {
      dispatch(setAlert(res.data.error, "danger"));
    } else {
      dispatch(setAlert("Account created successfully", "success"));
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    dispatch(setAlert("Email Already exist", "danger"));
  }
};

// for logout
export const logout = () => async (dispatch) => {
  dispatch(setAlert("Logout Successful.", "success"));
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
      "https://bibekgupta4444.pythonanywhere.com/api/accounts/token/",
      body,
      config
    );

    const res2 = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/user/${email}/`,
      config
    );
    if (res2.data.detail) {
      dispatch(setAlert(res2.data.detail, "danger"));
    }

    let data = { user: res2.data, access: res1.data.access };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(setAlert("Login Successful.", "success"));
  } catch (err) {
    dispatch(setAlert("Credential Not Found", "danger"));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// for reset your password
export const reset = (user) => async (dispatch) => {
  const { email } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let body = JSON.stringify({ email });

  const res1 = await axios.post(
    "https://bibekgupta4444.pythonanywhere.com/api/accounts/reset/",
    body,
    config
  );
  if (res1.data.success) {
    dispatch(setAlert(res1.data.success, "success"));
  } else {
    dispatch(setAlert(res1.data.errors, "danger"));
  }
};

// for getting token
export const get_token = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/activate/${token}/`,
      config
    );
    dispatch({
      type: GET_TOKEN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
    dispatch(setAlert("Token Not Found", "danger"));
  }
};

// for resetting your token
export const reset_token = (user) => async (dispatch) => {
  const { token, password, password2 } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let body = JSON.stringify({ password, password2 });
  try {
    const res1 = await axios.put(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/activate/${token}/`,
      body,
      config
    );
    dispatch(setAlert("Password changed succesful", "success"));
    dispatch({
      type: RESET_TOKEN_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
    dispatch(
      setAlert("Password not changed Again reset your account", "danger")
    );
  }
};

// for getting profile
export const get_profile = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/users/${id}/`,
      config
    );

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

// for updating profile
export const update_profile = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res1 = await axios.put(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/users/${users[0]}/`,
      users[1],
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
    });
    dispatch(setAlert("Profile updated successfully", "success"));
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
    dispatch(setAlert("Profile not updated, Please update again", "danger"));
  }
};

// for getting company profile
export const get_company_profile = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res = await axios.get(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/company/${id}/`,
      config
    );

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

// for updating comany profile
export const update_company_profile = (users) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const res1 = await axios.put(
      `https://bibekgupta4444.pythonanywhere.com/api/accounts/company/${users[0]}/`,
      users[1],
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
    });
    dispatch(setAlert("Profile Update succesfully", "success"));
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
    });
    dispatch(setAlert("Profile not updated", "danger"));
  }
};
