import { SET_CURRENT_USER } from "../actions/types";
import _ from "lodash";

const initState = {
  isAuthenticated: false,
  user: {}
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
