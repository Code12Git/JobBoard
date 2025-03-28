import { publicInstance } from "@/utils/axios";
import { Dispatch } from "redux";
import {
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT_FAILURE,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
} from "./actionTypes";
import {persistor} from '../store'
import { Admin } from "@/types/auth";

const login = (credentials:Admin) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST, payload: null });
    const res = await publicInstance.post("/auth/admin",credentials);
    console.log(res)
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.data });
    return res;
  } catch (err) {
    const error = err as { response: { data: { code: { message: string } } } };
    dispatch({type:ADMIN_LOGIN_FAILURE,payload:error.response.data.code.message})
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGOUT_REQUEST });

    localStorage.clear();
    sessionStorage.clear();

    await persistor.purge();

    dispatch({ type: ADMIN_LOGOUT_SUCCESS });
  } catch (err) {
    const error = err as { response: { data: { code: { message: string } } } };
    dispatch({ type: ADMIN_LOGOUT_FAILURE, payload: error.response?.data?.code?.message || "Logout failed" });
  }
};



export default login;
