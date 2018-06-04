import { combineReducers } from "redux";
import { authReducer as auth } from "./auth-reducer";
import { errorReducer as errors } from "./error-reducer";
import { profileReducer as profile } from "./profile-reducer";
import { postReducer as post } from "./post-reducer";

export const rootReducer = combineReducers({
  auth,
  errors,
  profile,
  post
});
