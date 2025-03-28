import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: false,
  errorMessage: null,
  success: false,
  successMessage: null,
};

const authReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: unknown }
) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
        success: true,
        successMessage: "User Logged In Successfully",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: false,
        errorMessage: null,
        success: false,
        successMessage: null,
      };
    default:
      return state;
  }
};

export default authReducer;
