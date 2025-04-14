"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import applicationSchema from "@/validation/applicationValidation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceModal } from '@/components/modals';
import { useAxiosPrivate } from "@/helpers/axios";
import { useParams } from "next/navigation";

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
  const { id } = useParams();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: 0,
      phone: 0,
      message: "",
      coverLetter: undefined,
      previousStipend:0,
      previousCompany: "",
      skills: '',
      workHistory: [],
      status: "applied",
      jobId: Number(id),
    },
  });

  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<never>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        if (textareaRef.current) {
          textareaRef.current.value = transcript;
          const event = { target: { name: "message", value: transcript } };
          register("message").onChange(event);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [register]);


  useEffect(() => {
    console.log('Form errors:', errors);
    console.log('Is form valid?', Object.keys(errors).length === 0);
  }, [errors]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  }

  const privateRequest = useAxiosPrivate();

  const onSubmit = async (data: ApplicationForm) => {
    console.log('Triggered')
    try {
      const formData = new FormData();
      
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("experience", String(data.experience));
      formData.append("phone", String(data.phone || 0));
      formData.append("message", data.message);
      formData.append("previousStipend", String(data.previousStipend));
      formData.append("previousCompany", data.previousCompany);
      formData.append("status", data.status || "applied");
      formData.append("jobId", String(data.jobId || 0));
      formData.append("skills", data.skills);
      if(file){
        console.log("File:",file)
        formData.append("resume", file);
      }
      
      if (data.coverLetter && data.coverLetter[0]) {
        console.log(data.coverLetter)
        formData.append("coverLetter", data.coverLetter[0]);
      }

      
        
      (data?.workHistory || []).forEach((work, index) => {
        formData.append(`workHistory[${index}][companyName]`, work.company);
        formData.append(`workHistory[${index}][designation]`, work.designation);
        formData.append(`workHistory[${index}][startDate]`, work.startDate);
        formData.append(`workHistory[${index}][endDate]`, work.endDate);
        formData.append(`workHistory[${index}][description]`, work.description);
      });

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
  console.log("FormData:",formData)
      const response = await privateRequest.post(`/apply/${id}`, formData);
      console.log(response);
    } catch (err) {
      console.error('Submission error:', err);
      throw err;  
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants = {containerVariants}
      className = "min-h-screen flex flex-col items-center justify-start py-10 px-4 "
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={containerVariants}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-4"
        encType="multipart/form-data" 
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
            name: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "Enter your phone number...",
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
            name: "skills",
            label: "skills Sets",
            type: "text",
            placeholder: "e.g. React, Node.js, MongoDB",
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
                {errors[field.name as keyof ApplicationForm]?.message?.toString()}
              </span>
            )}
          </motion.div>
        ))}

        {/* File Uploads */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 mb-1">
            Cover Letter (Optional)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("coverLetter")}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.coverLetter && (
            <p className="text-sm text-red-500">{errors?.coverLetter?.message?.toString()}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col">
  <label className="text-lg font-semibold text-gray-700 mb-1">
    Resume Upload
  </label>
  <input
    type="file"
    accept=".pdf,.doc,.docx"
    ref={fileInputRef}
    onChange={(e) => e.target.files && setFile(e.target.files[0])}
    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</motion.div>

        {/* Work History */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 mb-1">
            Work History
          </label>
          <ExperienceModal />
        </motion.div>

        {/* Message to recruiter */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-gray-700 mb-1">
            Message to recruiter
          </label>
          <div className="flex justify-between items-center">
          
          {isSpeechSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
              title={isListening ? 'Stop recording' : 'Start voice input'}
            >
              {isListening ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
        </div>
        <textarea
          {...register("message")}
          ref={(e) => {
            register("message").ref(e);
            textareaRef.current = e;
          }}
          placeholder="Enter your message... or click the mic to speak"
          className="border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.message && (
          <span className="text-sm text-red-500">
            {errors.message.message?.toString()}
          </span>
        )}
        {!isSpeechSupported && (
          <span className="text-sm text-yellow-600">
            Voice input is not supported in your browser. Try Chrome or Edge.
          </span>
        )}
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="text-center pt-2">
          <motion.button
            type="submit"
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