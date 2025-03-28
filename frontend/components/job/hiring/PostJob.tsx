"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { jobSchema } from "@/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createJob } from "@/redux/jobs/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { usePrivateInstance } from "@/helpers/axios";
import { generateJobDescription } from "@/helpers/openai";

type JobForm = z.infer<typeof jobSchema>;

const PostJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const privateInstance = usePrivateInstance();
  const [loadingDescription, setLoadingDescription] = useState(false);

  const form = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      companyName: "",
      location: "",
      jobType: "",
      stipend: 0,
      contact: "",
      companyImg: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  console.log(form);
  console.log(form.formState.errors);

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);

    if (title.length > 3) {
      setLoadingDescription(true);
      try {
        const generatedDescription = await generateJobDescription(title);
        form.setValue("description", generatedDescription);
      } catch (error) {
        console.error("Error generating job description:", error);
      } finally {
        setTimeout(() => {
          setLoadingDescription(false);
        }, 10000);
      }
    }
  };

  console.log("Form Values:", form.getValues());
  console.log("Form Errors:", form.formState.errors);
  const onSubmit = async (data: JobForm) => {
    console.log("Form submitted!");
    console.log("Form Data:", data);
    try {
      const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "companyImg" && data.companyImg instanceof File) {
        formData.append("companyImg", data.companyImg);
      } else {
        formData.append(key, data[key]);
      }
    });

      console.log("Dispatching createJob...");
      await dispatch(createJob(formData, privateInstance));
      console.log("Job created, navigating to /jobs...");
      router.push("/jobs");
    } catch (err) {
      console.error("Error submitting job:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mb-36 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 mx-auto border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Post a Job
        </h2>

        <div className="space-y-4">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Software Engineer"
                    type="text"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTitleChange(e);
                    }}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Job Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe the role..."
                    {...field}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3 min-h-[100px]"
                  />
                </FormControl>
                {loadingDescription && (
                  <p className="text-sm text-gray-500">
                    Generating description...
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. TechCorp"
                    type="text"
                    {...field}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Remote / New York"
                    type="text"
                    {...field}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Type */}
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Job Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Full-time, Part-time"
                    type="text"
                    {...field}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Img */}
          <FormField
            control={form.control}
            name="companyImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Company Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stipend */}
          <FormField
            control={form.control}
            name="stipend"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Stipend</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                    value={field.value}
                    placeholder="e.g. $5000 / month"
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Information */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Contact Information
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. hiring@techcorp.com"
                    {...field}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:shadow-lg hover:opacity-90 transition duration-300"
        >
          Submit Job Posting
        </Button>
      </form>
    </Form>
  );
};

export default PostJob;
