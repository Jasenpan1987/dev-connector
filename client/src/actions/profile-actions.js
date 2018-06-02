import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE
} from "./types";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const result = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE,
      payload: result.data
    });
  } catch (errors) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

export const createProfile = (profile, history) => async dispatch => {
  try {
    const response = await axios.post("/api/profile", profile);
    if (response) {
      history.push("/dashboard");
    }
  } catch (error) {
    return dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
