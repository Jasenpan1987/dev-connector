import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";
const initState = {
  profile: null,
  profiles: null,
  loading: false
};

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case PROFILE_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    }
    case CLEAR_CURRENT_PROFILE: {
      return { ...initState };
    }
    default: {
      return state;
    }
  }
};
