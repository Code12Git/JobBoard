"use client";

import { usePrivateInstance } from "@/helpers/axios";
import { fetchJobById } from "@/redux/jobs/actions";
import type { AppDispatch } from "@/redux/store";
import { jobType } from "@/types/jobType";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const JobDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const privateInstance = usePrivateInstance();
  const { id } = useParams();
  const [job, setJob] = useState<jobType | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await dispatch(fetchJobById(privateInstance, id as string));
        setJob(res);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [dispatch, id]);

  if (!job) {
    return <div className="text-center text-gray-500 mt-10">Loading job details...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-center text-5xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        Job Details
      </h1>

      <div className="mt-10 p-6 bg-white shadow-xl rounded-lg max-w-3xl mx-auto">
        {job.companyImg && (
          <div className="flex justify-center mb-4">
            <Image src={job.companyImg} alt={job.companyName} className="w-20 h-20 object-cover rounded-full border-2 border-gray-300" />
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-800 text-center">{job.title}</h2>
        <p className="text-lg text-gray-600 text-center mt-2">{job.companyName}</p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Job Type:</span>
            <span className="text-gray-600">{job.jobType}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="text-gray-600">{job.location}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Stipend:</span>
            <span className="text-green-600 font-bold">₹{job.stipend.toLocaleString()}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Contact:</span>
            <span className="text-gray-600">{job.contact}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Posted By:</span>
            <span className="text-gray-600">User ID {job.postedBy}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Posted On:</span>
            <span className="text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Job Description</h3>
            <p className="mt-2 text-gray-600 leading-relaxed">{job.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
