"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { generateJobDescription } from "@/helpers/openai";
import { useAxiosPrivate } from "@/helpers/axios";
import { useAppSelector } from "@/hooks/useAppSelector";
import toast from "react-hot-toast";
import { CLEAR_ERROR } from "@/redux/jobs/actionTypes";

type JobForm = z.infer<typeof jobSchema> & { companyImg?: File | string };

const PostJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {error,errorMessage} = useAppSelector(state => state.job)
  console.log(error,errorMessage)
  const router = useRouter();
  const [loadingDescription, setLoadingDescription] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const privateInstance = useAxiosPrivate();

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
      setTimeout(() => dispatch({type:CLEAR_ERROR}), 3000);
    }
  }, [error,errorMessage,dispatch]);
  
  

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
      employementType:'',
      companyImg: undefined,
    },
  });

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
        }, 3000);
      }
    }
  };
  console.log(form.getValues())

  const onSubmit = async (data: JobForm) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof JobForm] as string);
      });


      console.log("", formData);
      
      if (file) {
        console.log(file);
        formData.append("companyImg", file);
      }
      await dispatch(createJob(form.getValues(), privateInstance));
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

          <FormField
            control={form.control}
            name="companyImg"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Company Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        console.log(e.target.files)
                        setFile(file);
                        onChange(file);
                      }
                    }}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="employementType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Employement Type</FormLabel>
                <FormControl>

                  {/* <Input
                    placeholder="e.g. Full-time, Part-time"
                    type="text"
                    {...field}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                  /> */}
                  <select
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
                       {...field}>
                      <option value='Full Time'>Full-Time</option>
                      <option value='Part Time'>Part-Time</option>
                      <option value='Contract'>Contract</option>
                    </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="jobType"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700">Job Type</FormLabel>
      <FormControl>
        <select
          {...field}
          className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-xl p-3"
        >
          <option value='Remote'>Remote</option>
          <option value='Hybrid'>Hybrid</option>
          <option value='Onsite'>Onsite</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
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

        <Button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Submit Job Posting
        </Button>
      </form>
    </Form>
  );
};

export default PostJob;
