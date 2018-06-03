import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE,
  SET_CURRENT_USER
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

export const addExperience = (experience, history) => async dispatch => {
  try {
    const response = await axios.post("/api/profile/experience", experience);
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

export const deleteExperience = expId => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/experience/${expId}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (error) {
    return dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const addEducation = (education, history) => async dispatch => {
  try {
    const response = await axios.post("/api/profile/education", education);
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

export const deleteEducation = eduId => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/education/${eduId}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (error) {
    return dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This cannot undone.")) {
    try {
      const response = await axios.delete("/api/profile");
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};
