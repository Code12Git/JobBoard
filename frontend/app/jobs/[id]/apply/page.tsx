"use client";
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import applicationSchema from "@/validation/applicationValidation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {ExperienceModal} from '@/components/modals'
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

type ApplicationForm = z.infer<typeof applicationSchema>;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const Page = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: 0,
      phone: 0,
      message: "",
      resume: "",
      coverLetter: "",
      previousStipend: 0,
      previousCompany: "",
      skill: [],
      workHistory: [],
      status: "applied",
    },
  });
  const onSubmit = (data: ApplicationForm) => {
    console.log("Submitted data:", data);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-start py-10 px-4 "
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={containerVariants}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-4"
      >
        {[
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter your name...",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email...",
          },
          {
            name: "experience",
            label: "Years of Experience",
            type: "number",
            placeholder: "e.g. 2",
          },
          {
            name: "previousStipend",
            label: "Stipend (Previous)",
            type: "text",
            placeholder: "e.g. ₹15,000/month",
          },
          {
            name: "previousCompany",
            label: "Previous Company",
            type: "text",
            placeholder: "Enter company name...",
          },
          {
            name: "skill",
            label: "Skill Sets",
            type: "text",
            placeholder: "e.g. React, Node.js, MongoDB",
          },
          { name: "resume", label: "Resume", type: "file" },
          {
            name: "coverLetter",
            label: "Cover Letter (Optional)",
            type: "file",
          },
        ].map((field, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col"
          >
            <label className="text-lg font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              {...register(field.name as keyof ApplicationForm)}
              type={field.type}
              placeholder={field.placeholder}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            {errors[field.name as keyof ApplicationForm] && (
              <span className="text-sm text-red-500">
                {errors[
                  field.name as keyof ApplicationForm
                ]?.message?.toString()}
              </span>
            )}
          </motion.div>
        ))}

        {/* Work History TextArea */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 mb-1">
            Work History
          </label>
          <ExperienceModal />
        </motion.div>

        {/* Message to recruiter */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 mb-1">
            Message to recruiter
          </label>
          <textarea
            {...register("message")}
            placeholder="Enter your message..."
            className="border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.message && (
            <span className="text-sm text-red-500">
              {errors.message.message?.toString()}
            </span>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="text-center pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-md shadow-lg"
          >
            Submit
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Page;
