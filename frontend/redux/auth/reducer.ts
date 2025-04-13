import {
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: false,
  errorMessage: null,
  success: false,
  successMessage: null,
};

console.log(initialState.user)

const authReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: unknown }
) => {
  switch (type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading:true,
      } 
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        success:true,
        successMessage:'Role Updated Successfully'
      }  
     case UPDATE_USER_FAILURE:
      return {
        ...state,
        error:true,
        errorMessage:'Error updating USER'
      } 
    default:
      return state;
  }
};

export default authReducer;





