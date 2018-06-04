import axios from "axios";
import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  POST_LOADING
} from "./types";

export const setPostsLoading = () => ({
  type: POST_LOADING
});

export const addPost = post => async dispatch => {
  try {
    const response = await axios.post("/api/posts", post);
    dispatch({
      type: ADD_POST,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getPosts = () => async dispatch => {
  dispatch(setPostsLoading());
  try {
    const response = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

export const deletePost = postId => async dispatch => {
  dispatch(setPostsLoading());
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
  } catch (errors) {
    dispatch({
      type: GET_POSTS,
      payload: errors
    });
  }
};
