import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { setAuthToken } from "../utils/set-auth-token";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", user);
    // const userData = response.data;
    history.push("/login");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const loginUser = (user, history) => async dispatch => {
  try {
    const response = await axios.post("/api/users/login", user);
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token); // add axios request header
    const decodedUser = jwt_decode(token);
    dispatch(setCurrentUser(decodedUser));
  } catch (errors) {
    dispatch({
      type: GET_ERRORS,
      payload: errors.response.data
    });
  }
};

export const setCurrentUser = decodedUser => ({
  type: SET_CURRENT_USER,
  payload: decodedUser
});

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(null); // remove axios request header
  dispatch(setCurrentUser({}));
};
