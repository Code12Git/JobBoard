import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS  } from "./actionTypes";
import { Dispatch } from "redux";
import type { AxiosInstance } from "axios";

const login = async(formData: {role:string}, dispatch: Dispatch, privateInstance: AxiosInstance) => {
  console.log(formData)
    try{
      dispatch({type:LOGIN_REQUEST,payload:null})
      const res = await privateInstance.put('/auth',formData)
      console.log(res)
      dispatch({type:LOGIN_SUCCESS,payload:{user:res.data.data}})
    }catch(err){
     const error = err as { response: { data: { code: { message: string } } } };
     dispatch({type:LOGIN_FAILURE,payload:error.response.data.code.message})
    }
}
  

export default login;  