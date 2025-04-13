import { AppDispatch } from "../store";
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./actionTypes";
import { privateInstance } from "@/utils/axios";
export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST, isLoading: true });

    const res = await privateInstance.get('/users');
    console.log(res.data.data)
    dispatch({ type: FETCH_USERS_SUCCESS, payload:res.data.data });
  } catch (err) {
    const error = err as { response?: { data?: { code?: { message?: string } } } };
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.response?.data?.code?.message || "User fetching failed" });
  }
};
