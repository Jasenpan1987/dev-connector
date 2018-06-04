import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "../actions/types";

const initState = {
  posts: [],
  post: {},
  loading: false
};

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    }

    case POST_LOADING: {
      return { ...state, loading: true };
    }

    case GET_POSTS: {
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    }

    default: {
      return state;
    }
  }
};
