import {
    JOB_CREATE_REQUEST,
    JOB_CREATE_SUCCESS,
    JOB_CREATE_FAIL,
    JOBS_FETCH_REQUEST,
    JOBS_FETCH_SUCCESS,
    JOBS_FETCH_FAIL,
    JOB_FETCH_REQUEST,
    JOB_FETCH_SUCCESS,
    JOB_FETCH_FAIL
  } from "./actionTypes";
  
  const initialState = {
    jobs:[],
    job:null,
    isLoading: false,
    error: false,
    errorMessage: "",
    success: false,
    successMessage: "",
  };
  
  const jobReducer = (
    state = initialState,
    { type, payload }: { type: string; payload: unknown }
  ) => {
    switch (type) {
      case JOB_CREATE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case JOB_CREATE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobs: payload,
          success: true,
          successMessage: "Job created Successfully",
        };
      case JOB_CREATE_FAIL:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: payload,
        };
      case JOBS_FETCH_REQUEST:
        return {
          ...state,
          isLoading: true,
          jobs:[]
        }  
      case JOBS_FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobs: Array.isArray(payload) ? payload : [],
          success: true,
          successMessage: "Job fetched Successfully",
        }
      case JOBS_FETCH_FAIL:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: payload || "Failed to fetch jobs",
        }    
        case JOB_FETCH_REQUEST:
          return {
            ...state,
            isLoading: true,
            job:null
          }  
        case JOB_FETCH_SUCCESS:
          console.log("JOB_FETCH_SUCCESS payload:", payload); 
          return {
            ...state,
            isLoading: false,
            job: payload,
            success: true,
            successMessage: "Job fetched Successfully",
          }
        case JOB_FETCH_FAIL:
          return {
            ...state,
            isLoading: false,
            error: true,
            errorMessage: payload || "Failed to fetch job",
          }    
      default:
        return state;
    }
  };
  
  export default jobReducer;
  