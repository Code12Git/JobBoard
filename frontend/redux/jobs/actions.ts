import { Dispatch } from "redux";
import { JOB_CREATE_REQUEST,JOB_CREATE_SUCCESS,JOB_CREATE_FAIL, JOBS_FETCH_REQUEST, JOBS_FETCH_SUCCESS, JOBS_FETCH_FAIL, JOB_FETCH_REQUEST, JOB_FETCH_SUCCESS, JOB_FETCH_FAIL } from "./actionTypes";
import { jobType } from "@/types/jobType";
import  { AxiosInstance } from "axios";

export const createJob = (jobData: jobType, axiosInstance: AxiosInstance) => async (dispatch: Dispatch) => {
    try{ 
      dispatch({type:JOB_CREATE_REQUEST,payload:null})
      console.log(jobData)
      console.log("Job Data:",jobData)
      const res = await axiosInstance.post('/jobs',jobData)
      console.log("Response:",res)
      dispatch({type:JOB_CREATE_SUCCESS,payload:{job:res.data.data}})
    }catch(err){
     const error = err as { response: { data:  { message: string }  } };
     console.log(err)
     dispatch({type:JOB_CREATE_FAIL,payload:error.response.data.message})
    }
  }
  

export const fetchJob = (axiosInstance:AxiosInstance) => async(dispatch:Dispatch) => {
  try{
    dispatch({type:JOBS_FETCH_REQUEST,payload:null})
    const res = await axiosInstance.get('/jobs')
    dispatch({type:JOBS_FETCH_SUCCESS,payload:res.data.data})
  }catch(err){
    const error = err as { response: { data: { code: { message: string } } } };
    dispatch({type:JOBS_FETCH_FAIL,payload:error.response.data.code.message})
  }
}  

export const fetchJobById = (id:string,axiosInstance:AxiosInstance) => async(dispatch:Dispatch) => {
  try{
    dispatch({type:JOB_FETCH_REQUEST,payload:null})
    const res = await axiosInstance.get(`/jobs/${id}`)
    dispatch({type:JOB_FETCH_SUCCESS,payload:res.data.data})
    return res.data.data
  }catch(err){
    const error = err as { response: { data: { code: { message: string } } } };
    dispatch({type:JOB_FETCH_FAIL,payload:error.response.data.code.message})
  }
}