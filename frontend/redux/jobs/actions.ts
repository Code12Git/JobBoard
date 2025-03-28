import { Dispatch } from "redux";
import { JOB_CREATE_REQUEST,JOB_CREATE_SUCCESS,JOB_CREATE_FAIL, JOBS_FETCH_REQUEST, JOBS_FETCH_SUCCESS, JOBS_FETCH_FAIL, JOB_FETCH_REQUEST, JOB_FETCH_SUCCESS, JOB_FETCH_FAIL } from "./actionTypes";
import { jobType } from "@/types/jobType";
import { AxiosInstance } from "axios";

export const createJob = (jobData: jobType,privateInstance:AxiosInstance) => async (dispatch: Dispatch) => {
    try{
      dispatch({type:JOB_CREATE_REQUEST,payload:null})
      console.log("Job Data:",jobData)
      const res = await privateInstance.post('/jobs',jobData)
      console.log("Response:",res)
      dispatch({type:JOB_CREATE_SUCCESS,payload:{job:res.data.data}})
    }catch(err){
     const error = err as { response: { data: { code: { message: string } } } };
     dispatch({type:JOB_CREATE_FAIL,payload:error.response.data.code.message})
    }
  }
  

export const fetchJob = (privateInstance:AxiosInstance) => async(dispatch:Dispatch) => {
  try{
    dispatch({type:JOBS_FETCH_REQUEST,payload:null})
    const res = await privateInstance.get('/jobs')
    console.log(res)
    dispatch({type:JOBS_FETCH_SUCCESS,payload:res.data.data})
  }catch(err){
    const error = err as { response: { data: { code: { message: string } } } };
    dispatch({type:JOBS_FETCH_FAIL,payload:error.response.data.code.message})
  }
}  

export const fetchJobById = (privateInstance:AxiosInstance,id:string) => async(dispatch:Dispatch) => {
  try{
    dispatch({type:JOB_FETCH_REQUEST,payload:null})
    const res = await privateInstance.get(`/jobs/${id}`)
     dispatch({type:JOB_FETCH_SUCCESS,payload:res.data.data})
     return res.data.data
  }catch(err){
    const error = err as { response: { data: { code: { message: string } } } };
    dispatch({type:JOB_FETCH_FAIL,payload:error.response.data.code.message})
  }
}
 