import { Dispatch } from "redux";
import { 
  UPDATE_USER_FAILURE, 
  UPDATE_USER_REQUEST, 
  UPDATE_USER_SUCCESS 
} from "./actionTypes";
import  { AxiosInstance } from "axios";

export const updateRole = (role: string, axiosInstance: AxiosInstance) => 
  async (dispatch: Dispatch) => {
  try {
    console.log("Dispatching role update request");
    dispatch({ type: UPDATE_USER_REQUEST });

    const Role = { role };

    const { data } = await axiosInstance.put("/auth", Role);
    console.log("API response:", data.data);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.data });
    return data; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("USER update error:", err);

    const errorMessage = err.response?.data?.message || 
                        err.message || 
                        "Failed to update USER";
    
    dispatch({ 
      type: UPDATE_USER_FAILURE, 
      payload: errorMessage 
    });

    throw errorMessage;
  }
};
