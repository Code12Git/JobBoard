import {
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT_FAILURE,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS
} from "./actionTypes";

const initialState = {
  admin: null,
  isLoading: false,
  successMessage: null,
  loginsuccess: false,
  logoutsuccess:false,
  error: null,
  errorMessage: null,
};

const authReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: unknown }
) => {
  switch (type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: payload,
        isLoading: false,
        loginsuccess: true,
        logoutsucess:false,
        successMessage: "Admin Login Successfully",
      };
    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        isLoading:false
      };
      case ADMIN_LOGOUT_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      
      case ADMIN_LOGOUT_SUCCESS:
        return {
          ...state,
          admin: null,
          logoutsuccess:true,
          loginsuccess:false,
          successMessage:'Admin Logged Out Successfully!',
          isLoading: false,
        };
      
      case ADMIN_LOGOUT_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMesage:payload 
        };
      
    default:
      return state;
  }
};

export default authReducer;
