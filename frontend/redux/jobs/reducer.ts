import { jobType } from "@/types/jobType";
import {
  JOB_CREATE_REQUEST,
  JOB_CREATE_SUCCESS,
  JOB_CREATE_FAIL,
  JOBS_FETCH_REQUEST,
  JOBS_FETCH_SUCCESS,
  JOBS_FETCH_FAIL,
  JOB_FETCH_REQUEST,
  JOB_FETCH_SUCCESS,
  JOB_FETCH_FAIL,
  CLEAR_ERROR,
  JOBS_FILTERED,
} from "./actionTypes";

const initialState = {
  jobs: [],
  filteredJobs: [],
  job: null,
  isLoading: false,
  error: false,
  errorMessage: "",
  success: false,
  successMessage: "",
  filters: {
    jobType: "",
    location: "",
    employementType:''
  },
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
        jobs: [],
      };
    case JOBS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: Array.isArray(payload) ? payload : [],
        success: true,
        successMessage: "Job fetched Successfully",
      };
    case JOBS_FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: payload || "Failed to fetch jobs",
      };
    case JOB_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        job: null,
      };
    case JOB_FETCH_SUCCESS:
      console.log("JOB_FETCH_SUCCESS payload:", payload);
      return {
        ...state,
        isLoading: false,
        job: payload,
        success: true,
        successMessage: "Job fetched Successfully",
      };
    case JOB_FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: payload || "Failed to fetch job",
      };
    case JOBS_FILTERED:
      const { jobType, location,employementType } = payload as {
        jobType: string;
        location: string;
        employementType:string
      };
      console.log(payload);
      console.log("Before filtering:");
      
      const filteredJobs = state.jobs.filter((job: jobType) => {
        console.log(job);
        console.log("job.jobType:", job.jobType.replace(/-/g, " ").toLowerCase().trim());
        console.log("jobType:", jobType.replace(/-/g, "").toLowerCase().trim());
      
        const matchesJobType =
          !jobType ||
          job.jobType
            .replace(/-/g, "")
            .toLowerCase()
            .trim()
            .includes(jobType.replace(/-/g, "").toLowerCase().trim());
      
        console.log("matchesJobType:", matchesJobType);
      
        const matchesEmploymentType =
          !employementType ||
          job.employementType
            .replace(/-/g, "")
            .toLowerCase()
            .trim()
            .includes(employementType.replace(/-/g, "").toLowerCase().trim());
      
        console.log("EmploymentType:", employementType, "Job.employmentType:", job.employementType);
        console.log("MatchesEmploymentType:", matchesEmploymentType);
      
        const matchesLocation =
          !location || job.location.toLowerCase() === location.toLowerCase();
      
        console.log("Job Location:", job.location.toLowerCase(), "Location:", location.toLowerCase());
        console.log("MatchesLocation:", matchesLocation);
      
        return matchesJobType && matchesLocation && matchesEmploymentType;
      });
      
      return {
        ...state,
        filteredJobs,
        filters: {
          jobType,
          location,
          employementType,
        },
      };
      

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default jobReducer;
