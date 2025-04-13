import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./actionTypes";

const initialState = {
  users: null,
  isLoading: false,
  successMessage: null,
  error: null,
  errorMessage: null,
};

const userReducer = (
  state = initialState,
  { type, payload }: { type: string; payload:[] }
) => {
  switch (type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: Array.isArray(payload) ? [...payload] : [],
        isLoading: false,
        successMessage: "Users fetched Successfully",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        isLoading:false
      }
    default:
      return state;
  }
};

export default userReducer;
