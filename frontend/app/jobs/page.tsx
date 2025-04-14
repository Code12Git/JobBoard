"use client";
import React, { useEffect, useState } from "react";
import { fetchJob } from "@/redux/jobs/actions";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { company } from "@/assets/img";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { jobType } from "@/types/jobType";
import { JOBS_FILTERED } from "@/redux/jobs/actionTypes";
import { useAxiosPrivate } from "@/helpers/axios";
import { filteredValue } from "@/types/jobType";

const Job = () => {
  useSelector((state: RootState) => state.auth);
  const { isLoading, error, jobs, filteredJobs, filters } = useSelector(
    (state: RootState) => state.job
  );
  const [filteredValue, setFilteredValue] = useState<filteredValue>({
    jobType: "",
    employementType:'',
    location: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const privateInstance = useAxiosPrivate()
  console.log("Jobs:",jobs)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
         await dispatch(fetchJob(privateInstance));
       
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, [dispatch,privateInstance]);
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilteredValue(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as filteredValue)
    );
  };

  const apply_filters = () => {
    dispatch({
      type: JOBS_FILTERED,
      payload: filteredValue,
    });
  };

  const resetFilters = () => {
    setFilteredValue({ jobType: "", location: "",employementType:'' });
    dispatch({
      type: "JOBS_FILTERED",
      payload: { jobType: "", location: "" },
    });
  };

  const jobCondition = Array.isArray(jobs) && jobs.length > 0;

  console.log("Filtered Jobs", filteredJobs, "Fitlers", filters);
  console.log(jobs)
  const jobsToDisplay = filteredJobs?.length > 0 || filters.jobType || filters.location
      ? filteredJobs
      : jobs;



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Listings</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
  <div className="space-y-6">
      {/* Employment Type Filter */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Employent Type</label>
      <select
        name="employementType"
        value={filteredValue.employementType}
        onChange={inputChangeHandler}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
        <option value="">All</option>
        <option value="Full Time">Full-time</option>
        <option value="Part Time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>
    </div>
        {/* Job Type Filter */}

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Job Type</label>
      <select
        name="jobType"
        value={filteredValue.jobType}
        onChange={inputChangeHandler}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All</option>
        <option value="Remote">Remote</option>
        <option value="Onsite">Onsite</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>

    {/* Location Filter */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Location</label>
      <input
        type="text"
        name="location"
        value={filteredValue.location}
        onChange={inputChangeHandler}
        placeholder="Enter location"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4">
      <button
        onClick={apply_filters}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Apply Filters
      </button>
      <button
        onClick={resetFilters}
        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
      >
        Reset
      </button>
    </div>
  </div>
</div>


        {/* Job Listings */}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <BarLoader color="purple" height={40} width={300} loading={true} />
          </div>
        ) :   jobCondition ? (
          <div className="w-full lg:w-3/4 mx-auto p-4">
            <div className="space-y-6">
            {jobsToDisplay && jobsToDisplay.length > 0 ? (
  jobsToDisplay.map((job: jobType) => (
    <div
      key={job.id}
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            {job.title}
          </h2>
          <div className="flex items-center space-x-2 mb-2">
            {job?.company ? (
              <p className="text-gray-600 font-medium hover:text-gray-800 transition-colors duration-300">
                {job.company}
              </p>
            ) : (
              <Image
                src={company}
                alt="default"
                height={24}
                width={24}
                className="rounded-full"
              />
            )}
          </div>
          <p className="text-gray-500 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {job.location}
          </p>
        </div>
        <div className="flex gap-2 items-center mt-4 sm:mt-0 sm:ml-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-300">
            {job.jobType}
          </span>
          <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-red-200 transition-colors duration-300">
            {job.employementType}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-medium flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0-1a2 2 0 100-4M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          ${job.stipend}
        </p>
        <p className="text-gray-500 text-sm mt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Posted {new Date(job.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-6">
        <Link href={`/jobs/${job.id}`} passHref>
          <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95">
           View Job Details
          </button>
        </Link>
      </div>
    </div>
  ))
) : (
  <div className="flex justify-center items-center h-64">
    <p className="text-gray-600 text-lg font-semibold bg-gray-100 px-6 py-4 rounded-lg shadow-md">
      No jobs found for this search. Try adjusting your filters.
    </p>
  </div>
)}

            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        ):(<h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-red-400 text-transparent bg-clip-text">No jobs found</h1>)}
      </div>
    </div>
  );
};

export default Job;
